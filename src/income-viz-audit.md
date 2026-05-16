---
layout: base.njk
title: Audit — Income inequality figures
description: The same data drawn without styling, with the script and published sources that produced it.
permalink: /income-viz-audit/index.html
---

<style>
  .audit-fig { max-width: 540px; width: 100%; height: auto; display: block; margin: 24px auto; }
</style>

# The same figures, stripped down

If you looked at [the income-inequality visualization](/income-viz.html) and scoffed — thinking *they must be manipulating the data* — this page is for you.

Below are the same three concepts drawn in plain matplotlib. No log-scale tricks except where the math demands one. No axis breaks. No styling flourishes. The Python script that produced them is linked at the bottom, along with the data file it generates and the published sources it reads.

If you find a mistake, that's useful. Tell us.

---

## The distribution

<img class="audit-fig" src="/income-viz-src/figures/fig1.png" alt="Household income at named percentiles, 2024 dollars, log y-axis" />

Household income at named percentiles in 2024 dollars. Log y-axis because at linear scale the median bar would be a sliver against the top-0.01% bar — the long-tail problem the polished version makes the centerpiece.

## Real income growth, 1980 = 100

<img class="audit-fig" src="/income-viz-src/figures/fig2.png" alt="Real pretax income growth by group, indexed to 1980 = 100" />

Each line is a percentile band of U.S. households indexed to 100 in 1980. A line at 200 means real income doubled. The Top 0.01% reads 709 in 2024.

## Multiples of median

<img class="audit-fig" src="/income-viz-src/figures/fig3.png" alt="Top-group income as a multiple of median household income" />

Each top group's income threshold as a multiple of the median household. Top 1% is 12×. Top 0.01% is 283×.

---

## The pipeline

The figures above are produced by [`analysis.py`](/income-viz-src/analysis.py), which reads four published source files:

- **U.S. Census Bureau, Historical Income Tables** — household income quintile thresholds (H-1) and median + mean income (H-9), 2024 dollars.
- **Federal Reserve, Survey of Consumer Finances 2022** — household wealth percentiles from the public summary extract, inflated to 2024 dollars via CPI-U.
- **Piketty-Saez-Zucman, Realtime Inequality 2025 release** — top-income thresholds (P99 and above) and the 1980-2024 growth series, adult-households unit.

The script derives every value the [polished visualization](/income-viz.html) uses and writes them to [`data.json`](/income-viz-src/data.json). The polished page fetches that file at load. Both versions read from the same underlying numbers — there's no hidden second dataset between the layers.

If you want to run it yourself, the [README](/income-viz-src/README.md) walks through setup. You'll need Python, pandas, openpyxl, and matplotlib.

---

[← Back to the visualization](/income-viz.html)
