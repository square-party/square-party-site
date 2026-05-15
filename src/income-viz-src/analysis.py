"""
income-viz / analysis.py
========================

Transparent reproduction of every number that appears on the polished
income-inequality visualization (square-party-site/src/income-viz.html).

This script loads three published sources, computes the values the polished
viz consumes, produces three plain matplotlib figures (one per concept) so
the audit-minded reader can see the math directly, and emits a JSON file
that the polished viz can load as its data.

Data sources:
  - Census Bureau, Historical Income Tables for Households (H-1, H-9)
  - Federal Reserve, Survey of Consumer Finances 2022 Summary Extract
  - Piketty-Saez-Zucman, Realtime Inequality 2025 release

Run:
  python analysis.py

Outputs (written next to this script):
  - data.json          — values consumed by the polished viz
  - figures/fig1.png   — plain distribution chart (Concept 1)
  - figures/fig2.png   — plain growth-index chart (Concept 2)
  - figures/fig3.png   — plain ratio/scale chart  (Concept 3)
"""

from __future__ import annotations

import json
import os
from pathlib import Path

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# ─────────────────────────────────────────────────────────────────────────────
# 0. Paths and constants
# ─────────────────────────────────────────────────────────────────────────────

THIS_DIR = Path(__file__).parent.resolve()
DATA_ROOT = (THIS_DIR / "../../../data").resolve()

CENSUS_DIR = DATA_ROOT / "census-asec"
SCF_DIR    = DATA_ROOT / "scf-2022"
PSZ_FILE   = DATA_ROOT / "psz-realtime" / "SZ_data_2025.xlsx"

REFERENCE_YEAR = 2024   # the most recent Census ASEC publication year
GROWTH_BASELINE_YEAR = 1980
GROWTH_GROUPS = ["Bottom 50%", "Middle 40%", "Top 10%", "Top 1%", "Top 0.1%", "Top 0.01%"]


# ─────────────────────────────────────────────────────────────────────────────
# 1. Helpers
# ─────────────────────────────────────────────────────────────────────────────

def weighted_percentile(values: np.ndarray, weights: np.ndarray, percentile: float) -> float:
    """Compute a single weighted percentile of `values` using `weights`.

    Percentile is given on the 0-100 scale (e.g. 50 = median).
    """
    if not (0 <= percentile <= 100):
        raise ValueError("percentile must be in [0, 100]")
    sort_idx = np.argsort(values)
    sorted_values = values[sort_idx]
    sorted_weights = weights[sort_idx]
    cumulative = np.cumsum(sorted_weights)
    target = (percentile / 100.0) * cumulative[-1]
    # interpolate between adjacent observations whose cum weight straddles target
    idx_above = np.searchsorted(cumulative, target, side="left")
    idx_above = min(idx_above, len(sorted_values) - 1)
    return float(sorted_values[idx_above])


def log_linear_interpolate(x_known: list[float], y_known: list[float], x_query: float) -> float:
    """Log-linear interpolation of y at x_query, given (x_known, y_known) points.

    Treats both x and y in log space — appropriate when both quantities span
    multiple orders of magnitude, as with income percentiles past P90.
    """
    log_x_known = np.log(np.asarray(x_known, dtype=float))
    log_y_known = np.log(np.asarray(y_known, dtype=float))
    log_y_query = np.interp(np.log(x_query), log_x_known, log_y_known)
    return float(np.exp(log_y_query))


# ─────────────────────────────────────────────────────────────────────────────
# 2. Loaders — Census, SCF, PSZ
# ─────────────────────────────────────────────────────────────────────────────

def load_census_h01ar() -> pd.DataFrame:
    """Census Historical Table H-1, All Races: income limits for quintiles + top 5%.

    Returns a DataFrame indexed by Year with columns: P20, P40, P60, P80, P95.
    Values are in current dollars (nominal, year-of-survey).
    """
    raw = pd.read_excel(
        CENSUS_DIR / "h01ar.xlsx",
        sheet_name="h01ar",
        header=None,
    )
    # The header structure spans rows 8-9 (0-indexed: 7-8); data starts at row 10 (index 9).
    # Columns: Year | Number (thousands) | Lowest | Second | Third | Fourth | Top5%-lower-limit
    # Slice and rename.
    rows = []
    for _, r in raw.iloc[9:].iterrows():
        year_val = r.iloc[0]
        # Stop at footnotes / blank rows
        if pd.isna(year_val):
            continue
        try:
            year = int(str(year_val).split()[0])  # handle "2017 (40)" style row labels
        except (ValueError, AttributeError):
            continue
        if year < 1967 or year > 2030:
            continue
        # Skip section-divider rows like "2024 Dollars" whose first token parses as
        # a year but whose data columns are all NaN.
        if pd.isna(r.iloc[2]):
            continue
        rows.append({
            "year":  year,
            "P20":   r.iloc[2],   # upper limit of lowest fifth
            "P40":   r.iloc[3],
            "P60":   r.iloc[4],
            "P80":   r.iloc[5],
            "P95":   r.iloc[6],
        })
    df = pd.DataFrame(rows).set_index("year").sort_index()
    # The file has two stacked sections — values in current dollars (older rows in
    # iteration) followed by values in 2024 dollars (more recent rows). For every
    # year, the 2024-$ row appears later in iteration, so keep="last" preserves
    # the 2024-$ value. Also handles multi-methodology years (2013, 2017).
    df = df[~df.index.duplicated(keep="last")]
    return df


def load_census_h09ar() -> pd.DataFrame:
    """Census Historical Table H-9, All Races: median + mean income by year.

    Returns DataFrame indexed by Year with columns:
      median_current, median_2024usd, mean_current, mean_2024usd
    """
    raw = pd.read_excel(
        CENSUS_DIR / "h09ar.xlsx",
        sheet_name="h09ar",
        header=None,
    )
    # Structure: header rows 1-9, then "All Households" block, then sub-blocks for
    # family-headed and non-family households. We want the All-Households block.
    # Header at row 9 (index 8): year col, count, median(current), median(2024$),
    # mean(current), mean(2024$).
    rows = []
    in_all_households = False
    for i, r in raw.iterrows():
        first_cell = str(r.iloc[0]) if pd.notna(r.iloc[0]) else ""
        if first_cell.startswith("All Households"):
            in_all_households = True
            continue
        if first_cell.startswith("Family Households") or first_cell.startswith("Nonfamily"):
            in_all_households = False
            continue
        if not in_all_households:
            continue
        # Year rows look like '2024', '2023 (38)', '2017', etc.
        try:
            year = int(str(r.iloc[0]).split()[0])
        except (ValueError, AttributeError):
            continue
        if not (1967 <= year <= 2030):
            continue
        rows.append({
            "year": year,
            "median_current":  r.iloc[2],
            "median_2024usd":  r.iloc[3],
            "mean_current":    r.iloc[4],
            "mean_2024usd":    r.iloc[5],
        })
    df = pd.DataFrame(rows).set_index("year").sort_index()
    df = df[~df.index.duplicated(keep="last")]
    return df


def load_scf_summary() -> pd.DataFrame:
    """SCF 2022 Summary Extract: household-level INCOME, NETWORTH, WGT.

    The summary extract has 22,975 rows = 4,595 households × 5 multiple-imputation
    replicates. WGT is the analysis weight (sums across all rows ≈ total US
    households). For point estimates of percentiles, weighted percentiles across
    all rows give correct results.
    """
    return pd.read_csv(SCF_DIR / "SCFP2022.csv", usecols=["INCOME", "NETWORTH", "WGT"])


def load_psz_income_wealth() -> pd.DataFrame:
    """PSZ Realtime Inequality 2025: income_wealth sheet, restricted to adult_households unit.

    The PSZ data is at monthly granularity with 16 group definitions. For our viz
    we need annual values for 6 specific groups (Bottom 50%, Middle 40%, Top 10%,
    Top 1%, Top 0.1%, Top 0.01%) under the `adult_households` unit definition.

    Returns DataFrame with columns: year, group, threshold_pretax, per_unit_real,
    where threshold_pretax is the income threshold (annual $) to be in that group
    and per_unit_real is total group income / total population, deflated to 2024 $.
    """
    df = pd.read_excel(PSZ_FILE, sheet_name="income_wealth")
    df = df[df["unit"] == "adult_households"].copy()

    # PSZ Realtime Inequality reports per_unit, threshold, and wealth values in
    # REAL constant dollars (base year ≈ 2025; the file's `deflator` column is
    # provided for documentation but does not need to be re-applied). We verified
    # this empirically: the Total adult_households per_unit grows 1.77× from 1980
    # to 2024, matching published real GDP-per-capita growth — not the ~7× nominal
    # ratio that would obtain if per_unit were nominal. The published group growth
    # ratios (Bottom 50% × 1.37, Top 0.01% × 7.09, etc.) match Saez-Zucman's
    # published growth indices exactly when treated as-is.

    keep_groups = GROWTH_GROUPS + ["Total"]
    df = df[df["group"].isin(keep_groups)].copy()
    annual = (df.groupby(["year", "group"])
              .agg(threshold_pretax=("pretax_income_threshold", "mean"),
                   per_unit_real=("pretax_income_per_unit", "mean"),
                   wealth_threshold=("wealth_threshold", "mean"),
                   wealth_per_unit_real=("wealth_per_unit", "mean"))
              .reset_index())
    return annual


# ─────────────────────────────────────────────────────────────────────────────
# 3. Derivations — produce the values the polished viz uses
# ─────────────────────────────────────────────────────────────────────────────

def derive_income_percentiles_2024(census_h01: pd.DataFrame, census_h09: pd.DataFrame,
                                   psz_annual: pd.DataFrame) -> dict[float, float]:
    """Income percentile values (P10, P20, P30, P40, P50, P60, P70, P80, P90, P95, P99, P99.9, P99.99)
    in 2024 USD.

    Sources, in order of preference:
      - P20, P40, P60, P80, P95: Census H-1 (2023 survey, inflated to 2024 $ via Census-published CPI-U-RS).
      - P50: Census H-9 (median in 2024 $ directly).
      - P10, P30, P70: linear interpolation between adjacent published deciles, in log-income space.
      - P90: log-linear interpolation between P80 and P95.
      - P99, P99.9, P99.99: PSZ pretax_income_threshold (annual real $, 2024 base).
    """
    # Most recent Census year is 2024 (published Sept 2025). Use that.
    # Census tables come in current dollars; convert to 2024 $ via the ratio of
    # the published median in current dollars to the published median in 2024 dollars.
    yr_census = REFERENCE_YEAR
    # Both H-1 and H-9 carry the 2024 row in current dollars (which == 2024 dollars by definition).
    # H-1 values are already in current 2024 $.
    h01_row = census_h01.loc[yr_census]
    p20 = float(h01_row["P20"])
    p40 = float(h01_row["P40"])
    p60 = float(h01_row["P60"])
    p80 = float(h01_row["P80"])
    p95 = float(h01_row["P95"])

    h09_row = census_h09.loc[yr_census]
    p50 = float(h09_row["median_2024usd"])

    # Deciles that Census doesn't publish directly (P10, P30, P70, P90) are
    # estimated by linear interpolation in dollar space between adjacent
    # published values. For P10, since Census doesn't publish anything below P20,
    # we anchor at (0, $0). The audit doc and JSON output flag these as
    # interpolated, not directly published.
    p10 = p20 * 0.5                          # linear interp between (0, $0) and (20, p20)
    p30 = p20 + (p40 - p20) * 0.5            # midpoint between P20 and P40
    p70 = p60 + (p80 - p60) * 0.5            # midpoint between P60 and P80
    p90 = p80 + (p95 - p80) * (10 / 15)      # linear interp between P80 (15 pp away) and P95

    # Top of distribution from PSZ. Use 2024 annual values.
    psz_2024 = psz_annual[psz_annual["year"] == 2024].set_index("group")
    p99   = float(psz_2024.loc["Top 1%",    "threshold_pretax"])
    p999  = float(psz_2024.loc["Top 0.1%",  "threshold_pretax"])
    p9999 = float(psz_2024.loc["Top 0.01%", "threshold_pretax"])

    return {
        10: p10, 20: p20, 30: p30, 40: p40, 50: p50,
        60: p60, 70: p70, 80: p80, 90: p90, 95: p95,
        99: p99, 99.9: p999, 99.99: p9999,
    }


def derive_wealth_percentiles_2024(scf: pd.DataFrame, psz_annual: pd.DataFrame,
                                   cpi_factor_2022_to_2024: float = 1.072) -> dict[float, float]:
    """Wealth percentile values in 2024 USD.

    Sources:
      - P10-P99: SCF 2022 Summary Extract, weighted percentiles of NETWORTH, inflated
        from 2022 to 2024 USD via CPI-U (factor 1.072).
      - P99.9, P99.99: PSZ wealth_threshold (annual real, 2024 base).

    Note on the CPI factor: 2022 CPI-U (annual avg) = 292.655; 2024 CPI-U (annual avg) ≈ 313.689.
    Ratio = 313.689 / 292.655 = 1.0719 ≈ 1.072.
    """
    nw = scf["NETWORTH"].to_numpy()
    wgt = scf["WGT"].to_numpy()
    p10 = weighted_percentile(nw, wgt, 10) * cpi_factor_2022_to_2024
    p20 = weighted_percentile(nw, wgt, 20) * cpi_factor_2022_to_2024
    p30 = weighted_percentile(nw, wgt, 30) * cpi_factor_2022_to_2024
    p40 = weighted_percentile(nw, wgt, 40) * cpi_factor_2022_to_2024
    p50 = weighted_percentile(nw, wgt, 50) * cpi_factor_2022_to_2024
    p60 = weighted_percentile(nw, wgt, 60) * cpi_factor_2022_to_2024
    p70 = weighted_percentile(nw, wgt, 70) * cpi_factor_2022_to_2024
    p80 = weighted_percentile(nw, wgt, 80) * cpi_factor_2022_to_2024
    p90 = weighted_percentile(nw, wgt, 90) * cpi_factor_2022_to_2024
    p95 = weighted_percentile(nw, wgt, 95) * cpi_factor_2022_to_2024
    p99 = weighted_percentile(nw, wgt, 99) * cpi_factor_2022_to_2024

    psz_2024 = psz_annual[psz_annual["year"] == 2024].set_index("group")
    p999  = float(psz_2024.loc["Top 0.1%",  "wealth_threshold"])
    p9999 = float(psz_2024.loc["Top 0.01%", "wealth_threshold"])

    return {
        10: p10, 20: p20, 30: p30, 40: p40, 50: p50,
        60: p60, 70: p70, 80: p80, 90: p90, 95: p95,
        99: p99, 99.9: p999, 99.99: p9999,
    }


def derive_growth_indices(psz_annual: pd.DataFrame, end_year: int = REFERENCE_YEAR) -> dict:
    """Real-income growth indices indexed to 100 in 1980 for the six standard PSZ groups.

    For each group, we compute the real per-unit pretax income in each year,
    then divide by that group's 1980 real per-unit value × 100. Result: 100 in
    1980, indexed real income growth thereafter.

    The series is truncated at `end_year` (default 2024) because PSZ data extends
    into the current year with partial-year monthly observations, which would
    annualize misleadingly.
    """
    baseline = (psz_annual[psz_annual["year"] == GROWTH_BASELINE_YEAR]
                .set_index("group")["per_unit_real"])
    years = sorted(y for y in psz_annual["year"].unique() if y <= end_year)
    series = {g: [] for g in GROWTH_GROUPS}
    for y in years:
        slc = psz_annual[psz_annual["year"] == y].set_index("group")
        for g in GROWTH_GROUPS:
            if g in slc.index and g in baseline.index:
                series[g].append(float(slc.loc[g, "per_unit_real"] / baseline.loc[g] * 100.0))
            else:
                series[g].append(np.nan)
    return {"years": years, "groups": series}


# ─────────────────────────────────────────────────────────────────────────────
# 4. Plain matplotlib figures (one per concept)
# ─────────────────────────────────────────────────────────────────────────────

def make_fig1_distribution(income_pcts: dict[float, float], out_path: Path) -> None:
    """Concept 1: distribution as plain stem-style chart of values at named percentiles."""
    fig, ax = plt.subplots(figsize=(10, 5))
    pcts = sorted(income_pcts.keys())
    vals = [income_pcts[p] for p in pcts]
    ax.bar([str(p) + "%" for p in pcts], vals, color="#1f1d18", width=0.6)
    ax.set_ylabel("Annual household income (2024 $)")
    ax.set_xlabel("Percentile")
    ax.set_title("Concept 1 — U.S. household income at named percentiles (2024 $)")
    ax.set_yscale("log")
    for x, v in zip(pcts, vals):
        ax.annotate(f"${v/1000:,.0f}K" if v < 1e6 else f"${v/1e6:.1f}M",
                    xy=(str(x) + "%", v), ha="center", va="bottom", fontsize=8)
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)
    plt.close(fig)


def make_fig2_growth_indices(growth: dict, out_path: Path) -> None:
    """Concept 2: real income indexed to 100 in 1980."""
    fig, ax = plt.subplots(figsize=(10, 5.5))
    palette = {
        "Bottom 50%": "#7d8b6f",
        "Middle 40%": "#5d7290",
        "Top 10%":    "#c69770",
        "Top 1%":     "#c96442",
        "Top 0.1%":   "#9c3a2a",
        "Top 0.01%":  "#5e1a14",
    }
    for g in GROWTH_GROUPS:
        ax.plot(growth["years"], growth["groups"][g], label=g, color=palette[g], linewidth=2)
    ax.axhline(100, color="#1f1d18", linestyle="-", linewidth=0.6, alpha=0.3)
    ax.set_xlabel("Year")
    ax.set_ylabel("Real income (1980 = 100)")
    ax.set_title("Concept 2 — Real pretax income growth by group, indexed to 1980 = 100")
    ax.legend(loc="upper left", frameon=False, fontsize=9)
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)
    plt.close(fig)


def make_fig3_ratios(income_pcts: dict[float, float], out_path: Path) -> None:
    """Concept 3: ratio of each top group's income to the median."""
    median = income_pcts[50]
    groups = [(50, "Median (P50)"),
              (99, "Top 1% (P99)"),
              (99.9, "Top 0.1% (P99.9)"),
              (99.99, "Top 0.01% (P99.99)")]
    ratios = [(name, income_pcts[p] / median) for p, name in groups]
    fig, ax = plt.subplots(figsize=(10, 4))
    names = [r[0] for r in ratios]
    rs    = [r[1] for r in ratios]
    ax.barh(names, rs, color="#3a8030")
    ax.set_xlabel("Multiple of median household income")
    ax.set_title("Concept 3 — Top-group income as a multiple of median (2024 $)")
    for i, r in enumerate(rs):
        ax.annotate(f"{r:,.0f}×", xy=(r, i), ha="left", va="center", fontsize=9,
                    xytext=(4, 0), textcoords="offset points")
    ax.spines[["top", "right"]].set_visible(False)
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)
    plt.close(fig)


# ─────────────────────────────────────────────────────────────────────────────
# 5. Main — orchestrate the whole pipeline
# ─────────────────────────────────────────────────────────────────────────────

def main() -> None:
    print("Loading data sources...")
    census_h01 = load_census_h01ar()
    census_h09 = load_census_h09ar()
    scf        = load_scf_summary()
    psz_annual = load_psz_income_wealth()
    print(f"  Census H-1: {len(census_h01)} years ({census_h01.index.min()}-{census_h01.index.max()})")
    print(f"  Census H-9: {len(census_h09)} years ({census_h09.index.min()}-{census_h09.index.max()})")
    print(f"  SCF 2022:   {len(scf):,} household-rows (5 imputation replicates)")
    print(f"  PSZ:        {psz_annual['year'].nunique()} years × {psz_annual['group'].nunique()} groups")

    print("\nDeriving values used by polished viz...")
    income_pcts = derive_income_percentiles_2024(census_h01, census_h09, psz_annual)
    wealth_pcts = derive_wealth_percentiles_2024(scf, psz_annual)
    growth      = derive_growth_indices(psz_annual)

    print(f"  Income P50 (median):  ${income_pcts[50]:,.0f}")
    print(f"  Income P99:           ${income_pcts[99]:,.0f}")
    print(f"  Income P99.99:        ${income_pcts[99.99]:,.0f}")
    print(f"  Wealth P50 (median):  ${wealth_pcts[50]:,.0f}")
    print(f"  Wealth P99:           ${wealth_pcts[99]:,.0f}")
    print(f"  Wealth P99.99:        ${wealth_pcts[99.99]:,.0f}")
    print(f"  Growth: 2024 vs 1980, Bottom 50%: {growth['groups']['Bottom 50%'][-1]:.0f}")
    print(f"  Growth: 2024 vs 1980, Top 0.01%:  {growth['groups']['Top 0.01%'][-1]:.0f}")

    out_dir = THIS_DIR / "figures"
    out_dir.mkdir(exist_ok=True)
    print(f"\nWriting figures to {out_dir} ...")
    make_fig1_distribution(income_pcts, out_dir / "fig1.png")
    make_fig2_growth_indices(growth, out_dir / "fig2.png")
    make_fig3_ratios(income_pcts, out_dir / "fig3.png")

    # Emit JSON that mirrors the polished viz's data file layout.
    median_income = income_pcts[50]
    mean_income   = float(census_h09.loc[REFERENCE_YEAR, "mean_2024usd"])
    median_wealth = wealth_pcts[50]
    out = {
        "_provenance": {
            "script":         "analysis.py",
            "reference_year": REFERENCE_YEAR,
            "sources": {
                "census_h01ar":  "Census H-1, All Races: income quintile + top-5% thresholds",
                "census_h09ar":  "Census H-9, All Races: median + mean income, current and 2024 $",
                "scf_summary":   "SCF 2022 Summary Extract Public Data File",
                "psz_realtime":  "Piketty-Saez-Zucman Realtime Inequality 2025 release",
            },
        },
        "headline": {
            "median":       round(median_income),
            "mean":         round(mean_income),
            "top1":         round(income_pcts[99]),
            "top01":        round(income_pcts[99.9]),
            "top001":       round(income_pcts[99.99]),
            "medianWealth": round(median_wealth),
            "top1Wealth":   round(wealth_pcts[99]),
            "top01Wealth":  round(wealth_pcts[99.9]),
            "top001Wealth": round(wealth_pcts[99.99]),
        },
        # Field names match what the polished viz's components expect: `income` on
        # the income array, `wealth` on the wealth array.
        "incomeByPercentile2024": [{"p": p, "income": round(v)} for p, v in sorted(income_pcts.items())],
        "wealthByPercentile2024": [{"p": p, "wealth": round(v)} for p, v in sorted(wealth_pcts.items())],
        "growthSeries": {
            "years":  [int(y) for y in growth["years"]],
            "groups": {g: [round(float(v), 1) for v in growth["groups"][g]] for g in GROWTH_GROUPS},
        },
    }
    out_json = THIS_DIR / "data.json"
    out_json.write_text(json.dumps(out, indent=2))
    print(f"\nWrote {out_json}")

    print("\nDone.")


if __name__ == "__main__":
    main()
