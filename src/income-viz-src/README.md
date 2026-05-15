# `income-viz-src` — transparent reproduction of the income visualization

This folder is the **audit layer** underneath the polished interactive figure
at `square-party-site/src/income-viz.html`. The polished viz renders a stack
of React components from a bundled artifact format that's not easy to verify
by inspection. This folder reconstructs the figure's numbers and shapes from
raw published sources in plain Python + matplotlib, so any reader can confirm
what's being depicted without trusting the React bundle.

## What's in here

| File | Purpose |
|---|---|
| `analysis.py` | The pipeline. Loads four published source files, derives every value the polished viz consumes, produces three plain matplotlib figures, and emits `data.json`. |
| `data.json` | Output of running `analysis.py`. Mirrors the data structure the polished viz reads. Includes a `_provenance` block citing sources. |
| `figures/fig1.png` | Concept 1 — bar of income at named percentiles, log y-axis. Plain matplotlib. |
| `figures/fig2.png` | Concept 2 — real income growth indexed to 100 in 1980, six PSZ groups. Plain matplotlib. |
| `figures/fig3.png` | Concept 3 — multiple of median for each top group. Plain matplotlib. |
| `README.md` | This file. |

## How to run

From this directory:

```bash
pip install pandas openpyxl matplotlib
python analysis.py
```

The script reads four files (paths relative to this folder, under `../../../data/`):

- `census-asec/h01ar.xlsx` — Census H-1, All Races, income quintile + top-5% thresholds
- `census-asec/h09ar.xlsx` — Census H-9, All Races, median + mean household income
- `scf-2022/SCFP2022.csv` — SCF 2022 Summary Extract Public Data File
- `psz-realtime/SZ_data_2025.xlsx` — Piketty-Saez-Zucman Realtime Inequality 2025 release

Outputs are written next to the script (`data.json` and `figures/*.png`).

## What gets computed, with sources

| Value | Source | How |
|---|---|---|
| Median income 2024 | Census H-9 | `median_2024usd` for year 2024 |
| Mean income 2024 | Census H-9 | `mean_2024usd` for year 2024 |
| Income P20, P40, P60, P80, P95 | Census H-1 | Published quintile thresholds, 2024 ASEC (current $ = 2024 $) |
| Income P10, P30, P70, P90 | **interpolated** | Linear in dollar space between adjacent published percentiles. P10 anchors at (0, $0). Not directly published. |
| Income P99, P99.9, P99.99 | PSZ Realtime Inequality | `pretax_income_threshold`, annual mean of monthly observations, year 2024 |
| Wealth P10–P99 | SCF 2022 Summary Extract | Weighted percentiles of `NETWORTH`, weighted by `WGT` across all 5 imputation replicates, inflated 2022→2024 USD by CPI-U factor 1.072 |
| Wealth P99.9, P99.99 | PSZ Realtime Inequality | `wealth_threshold`, annual mean, year 2024 |
| Growth indices 1980–2024 (6 groups) | PSZ Realtime Inequality | `pretax_income_per_unit` (real $), annual mean / 1980 annual mean × 100 |

## Things to know about the data

**PSZ deflator gotcha.** The PSZ file ships a `deflator` column. The values in
`per_unit`, `threshold`, and `wealth_*` columns are *already* in real (constant)
dollars — re-applying the deflator would double-deflate. Verified empirically:
the Total adult_households per_unit grows 1.77× from 1980 to 2024, matching
published real GDP per capita growth (not the ~7× that nominal would yield).
The published group ratios (Bottom 50% × 1.37, Top 0.01% × 7.09) match
Saez-Zucman's published indices exactly when treated as-is.

**Census H-1 dual section.** The Excel file stacks two tables in one sheet:
income limits in current dollars on top, income limits in 2024 dollars below.
For 2024 the two are identical by definition; for older years they differ.
The loader keeps the 2024-dollar version (via `keep="last"` after sort, since
the 2024-$ section appears later in the file). A section-divider row labeled
"2024 Dollars" appears between them and is skipped explicitly because its
first token parses as a year.

**SCF multiple imputation.** The SCF Summary Extract has 5 imputation
replicates per household (22,975 rows = 4,595 households × 5). The `WGT`
column is calibrated so the sum across all rows equals total US households.
For point estimates of percentiles, weighted percentiles across all rows give
correct results without further adjustment. (Proper standard-error estimation
requires the replicate methodology; we don't need that here since we're
producing point estimates.)

**Interpolated deciles.** The polished viz labels percentile P10, P30, P70,
P90 etc. on its histogram. Census doesn't publish these directly for
households (only quintile boundaries P20, P40, P60, P80, plus P50 and P95).
Our interpolation in dollar space is a defensible approximation but is not
*published* by Census. The audit-minded reader should treat any reported
P10/P30/P70/P90 value as derived rather than cited.

## Polished viz integration

`data.json` is now consumed directly by `../income-viz.html` (the polished
viz). The polished viz fetches `./income-viz-src/data.json` at page load,
so updating the data is: rerun `python analysis.py` → reload the page.
Both layers literally share one data source; no possibility of drift.

## Verification status

Running `analysis.py` produces these key values which can be cross-checked
against the polished viz (as of May 2026):

```
Income P50 (median):     $83,730        (matches viz)
Income P99:              $976,978       (viz shows $977K)
Income P99.99:           $23,679,568    (viz shows $24M)
Wealth P50 (median):     $206,574       (viz shows $207K)
Wealth P99.99:           $305,227,776
Growth 1980→2024:
  Bottom 50%:            137            (matches viz)
  Top 0.01%:             709            (matches viz)
```

One known small discrepancy: the polished viz currently shows `mean income
= $119,000` (derived from 2023 ASEC inflated). The Python pipeline yields
`mean income = $121,000` (from 2024 ASEC published in 2024 dollars), which
is the more directly cited number. This is on the to-fix list for the
polished viz; everything else matches.

## License / use

Same as the rest of the site. Data files in `../../../data/` carry their
own source-publisher licensing (Census = public domain, SCF = US gov't
production, PSZ = CC-BY for Realtime Inequality per their site).
