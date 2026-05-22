# D11 Education — Temporal-Changes Sidecar

**Domain:** D11 Education
**Sidecar type:** Temporal-Changes (Standard 18.A vector format)
**Date assembled:** 2026-05-10
**Phase:** 3 Verification (Session 1 partial)
**Methodology:** M0 v2.1 Standard 18.A schema; cumulative cross-cycle persistence record
**Status:** Session 1 partial — 4 TC entries confirmed; additional entries pending Session 2 retrieval (MC48 empirical cluster; postsecondary T-flags; IDEA/civil rights T-flags; WIOA/Perkins T-flags; EITC/OSTC trajectory)

---

## Standard 18.A Schema Reference

Each tracked vector:
```
TC-NN: {brief description}
- anchor: {claim ID or named structural claim}
- vector:
    - {date} {phase}: "{value}" {source ID(s)}
    - {date} {phase}: "{value}" {source ID(s)}
- analytical consequence: {what changes if this vector's most recent point shifts}
- subsequent-cycle accumulation note: {where the vector lives going forward}
```

---

## TC-01: PA school funding formula adequacy investment trajectory (William Penn remedy)

**TC-01: PA school funding adequacy investment and remaining gap — William Penn remedy trajectory**
- anchor: G11-SD1-02 (PA state funding formula adequacy gap — $3.8 billion remaining unconstitutional underfunding)
- vector:
    - 2023-02-07 (Phase 0 / substructure context): "Commonwealth Court finds PA school funding unconstitutionally inadequate; adequacy gap documented at $4.6–$6.2 billion" [William Penn School District v. Pennsylvania, Commonwealth Court ruling]
    - 2023-07-21 (Phase 0 / substructure context): "William Penn ruling finalized; Commonwealth obligated to remedy" [Commonwealth Court final ruling]
    - 2024-25 FY (Phase 1 retrieval): "Approximately $500 million in adequacy investment; cumulative remedy investment approaching $1 billion; remaining gap approximately $3.8 billion" [Education Law Center; PA PDE budget documents cited in Phase 1]
    - 2025-11-12 (Phase 1 retrieval): "FY2025-26 budget enacted 135 days late; $565 million in adequacy-related school funding ($526.4M adequacy formula; $32.2M tax equity supplement; $6.4M minimum-baseline provision)" [Source 3 per SD1 §2]
    - 2026-02-03 (Phase 3 verification): "Governor Shapiro FY2026-27 proposal: additional $565 million through bipartisan adequacy formula; Basic Education Funding +$50M to $8.31B; Special Education +$50M; cyber charter reform savings $75M annually (total $250M/year)" [PA.gov Governor's Office; PA PDE Education Budget; WHYY 2026-02-04]
    - 2026-05-10 (Phase 3 verification): "FY2026-27 budget NOT YET ENACTED as of verification date (June 30, 2026 deadline); remaining adequacy gap approximately $3.8 billion under current enacted law; Pennsylvania Policy Center / Education Law Center estimate gap falls to approximately $3.3 billion if Shapiro proposal enacted" [Pennsylvania Policy Center 2026-02-07 budget response; PA.gov]
- analytical consequence: Each additional year's adequacy investment narrows the remaining gap; whether PA sustains the $500-565M/year annual trajectory is the critical adequacy-closure variable. If FY2026-27 budget stalls (as FY2025-26 did, 135 days late), SDP must borrow funds and budgetary planning is disrupted. The $3.3B vs. $3.8B distinction affects whether G11-SD1-02's "remaining gap" figure should be updated to reflect the enacted or proposed state. Currently: enacted state is $3.8B; Shapiro proposal would bring to $3.3B. Subsequent cycles update as each budget year enacts.
- subsequent-cycle accumulation note: D24 (Veterans Affairs) and D6 (Environment) Phase 3 verification windows should check FY2026-27 budget enactment status. If enacted before D24 Phase 3, D24 handoff should carry the updated $3.3B figure as cross-domain context. If not enacted, $3.8B persists. Methodology lock declaration cycle should include updated final adequacy trajectory vector.

---

## TC-02: SDP school closure implementation — 17-school vote and trajectory

**TC-02: SDP school closure plan — implementation trajectory**
- anchor: SD1 §4 Sub-Area Variation (SDP institutional-set baseline); G11-SD1-03 adjacent context (fiscal constraint architecture)
- vector:
    - 2026-01-07 (Phase 3 verification context): "SDP Superintendent Watlington presents initial facilities plan to Board; 20 schools initially recommended for closure" [SDP Board of Education; Inquirer]
    - 2026-02-26 (Phase 3 verification context): "Revised facilities plan submitted; 18 closures recommended; community opposition mounts; City Council threatens to hold up education funding" [WHYY; Inquirer]
    - 2026-04-28 (Phase 3 verification context): "Final revision: 17 closures (Ludlow Elementary removed); plan cost $3 billion over 10 years; $1B from district; $2B from state/philanthropy (unsecured); Board vote postponed following City Council opposition" [Metro Philadelphia; Philadelphia Voice]
    - 2026-04-30 (Phase 3 verification): "Board of Education votes 6-3 to approve 17-school closure plan; meeting evacuated by protest; vote completed via Zoom in locked room; City Council Councilmember Thomas calls for board resignations and threatens lawsuit" [Chalkbeat Philadelphia; Philadelphia Inquirer; WHYY; CBS Philadelphia]
    - 2026-05-01 to 2026-05-10 (Phase 3 verification): "Implementation timeline: earliest closures 2027-28 school year; state-mandated hearings and future board votes required before closures finalized; Robeson and Lankenau retained as district properties per board amendment; legal challenges ongoing" [WHYY 2026-05-07; Inquirer 2026-05-01]
- vector note (school list confirmed): Closures approved: Blankenburg, Fitler, Morris (Brewerytown), Overbrook, Pennypacker, Welsh, Waring (7 elementaries); AMY Northwest, Harding (Frankford), Stetson (Kensington), Tilden (Elmwood), Wagner (West Oak Lane) (5 middles); Lankenau, Parkway Northwest, Parkway West, Penn Treaty, Robeson (5 highs). Geographic distribution: 12 in North Philadelphia and Kensington; 5 in West Philadelphia.
- analytical consequence: The 17-school closure plan directly updates SD1 §4 sub-area variation (schools closing in North/Northwest Core and West Philadelphia Core); affects the SDP institutional-set baseline for all SDs; the $3 billion 10-year modernization plan (if funded) is the accompanying investment trajectory. If the plan proceeds, the catchment geography changes in the affected sub-areas. The 2012-13 mass school closure precedent (30 closures; documented negative academic outcomes for displaced students) provides the risk baseline for this round. Legal challenges may delay or modify the plan; City Council displeasure creates a governance tension that could affect future SDP budget requests.
- subsequent-cycle accumulation note: D24 and D6 Phase 3 windows should check implementation status (state-mandated hearing completion; any legal injunctions; whether specific schools proceeded to closure or were removed from the list). D6 (environment) should check environmental hazard conditions at proposed closure sites (cross-reference D6 substructure §3 as noted in OUTPUT). D17 (Criminal Justice, planned) should note Robeson High School's continued operation (PA-3's last public high school in University City; proximity to science institutions).

---

## TC-03: HHS ACF Head Start capacity and funding trajectory under Trump administration

**TC-03: HHS ACF Head Start administrative capacity and federal funding posture**
- anchor: G11-SD3-01 (early childhood coverage gap — federal-floor trajectory); T11-SD3-01
- vector:
    - 2024 (Phase 1 baseline): "Head Start total federal budget: $12.27 billion; program serves approximately 800,000 children nationally through ACF grantees; 10 regional ACF offices operational" [HHS ACF; cited in Phase 1 sources]
    - 2025-01 (Phase 3 verification): "Trump administration funding freeze issued; all federal spending frozen including Head Start; 23-state AG lawsuit filed; federal court TRO granted; administration rescinded freeze but maintained position on future cuts; grantee payment uncertainty significant" [Coalition on Human Needs; Pennsylvania Independent]
    - 2025-03 (Phase 3 verification): "ACF staff reductions announced: 30-45% of ACF workforce to be reduced in force; Head Start oversight and grantee monitoring capacity diminished" [Center for American Progress; Coalition on Human Needs]
    - 2025-04-01 (Phase 3 verification): "5 of 10 ACF regional offices closed: Boston, Chicago, New York, San Francisco, Seattle. Philadelphia ACF regional office REMAINS OPEN. States and territories received approximately $1.67B in Head Start funding from Jan. 1 to April 15, 2025 vs. $2.55B in the same period of 2024 — a $880M (34%) decline in disbursements despite level funding of $12.27B" [Center for American Progress, August 2025]
    - 2025-03-14 (Phase 3 verification): "FY2025 continuing resolution: $750 million in cuts to Head Start programs enacted" [SPLC; NHSA]
    - 2025-07-07 (Phase 3 verification): "Pennsylvania House passes H.B. 1505: authorizes state Pre-K Counts appropriation as federal Head Start backstop if federal funding eliminated; governor signature pending" [Pennsylvania Independent]
    - 2025-05-02 (Phase 3 verification): "Trump FY2026 budget proposal: Head Start NOT eliminated; program level-funded at $12.27 billion; earlier elimination threat reversed after advocacy" [WHYY; Head Start advocacy groups]
    - 2026-05-10 (Phase 3 verification state): "Program survival: Head Start program survives FY2026 elimination threat. Operational capacity: diminished — 5 of 10 regional offices closed; Philadelphia region's grantee oversight comparatively less disrupted. Funding trajectory: uncertain; $750M CR cut reduces program capacity; DEI restrictions applied to grantee training activities per ACF guidance."
- analytical consequence: For SD3's G11-SD3-01 (federal-floor trajectory), the Head Start program has demonstrated resilience at the program-survival level — elimination advocacy was repelled in FY2026. However, the operational disruption (staff cuts, office closures, payment delays, DEI restrictions) affects grantee capacity to expand coverage and maintain quality. The Philadelphia ACF regional office remaining open is a comparative advantage for PA-3 Head Start grantees vs. regions where offices closed. The $750M CR cut likely constrains enrollment or reduces per-slot services. The state-level legislative backstop (H.B. 1505) represents a PA-state-level insurance mechanism the federal floor did not provide.
- subsequent-cycle accumulation note: D6 (Environment) and D21 (Healthcare Delivery) should check Head Start grantee status in PA-3 and ACF capacity. If the Philadelphia ACF office remains open through subsequent cycles, the comparative advantage persists. If a second round of office closures occurs, the D11 TC-03 vector should be updated. ACF grantee-monitoring quality is a background condition for D12 SD6 (child welfare and early learning intersection).

---

## TC-04: ED OCR enforcement capacity collapse and partial restoration

**TC-04: ED OCR staffing, capacity, and enforcement trajectory**
- anchor: G11-SD4-04 (ED OCR enforcement-posture variability — Standard 11 administrative vulnerability); T11-SD4-02
- vector:
    - 2024 (Phase 1 baseline): "ED OCR: approximately 575 staff; 12 regional offices; 507 resolution agreements in 2024; civil rights enforcement operational" [NPR; Education Week]
    - 2025-03-11 to 2025-03-21 (Phase 3 verification): "Trump administration RIF: approximately 240 OCR attorneys and staff placed on paid administrative leave; 7 of 12 regional offices closed, including Philadelphia, New York, Boston, Chicago, Cleveland, Dallas, San Francisco. 20-state AG lawsuit filed challenging RIF. Philadelphia regional office closed." [National Law Review; Education Week; NPR]
    - 2025-03 to 2025-09 (Phase 3 verification): "OCR operational period during RIF: received 9,269 complaints; resolved 7,072; approximately 90% (6,353) resolved by dismissal rather than on the merits. Resolution agreements: 112 full-year 2025 vs. 507 in 2024 (78% decline). OCR caseload quadrupled for remaining staff. Cost of paying idle RIF staff: $28.5-38M (GAO estimate)." [GAO-26-108320; HELP Committee Staff Report April 2026; The Arc April 2026]
    - 2025-12 to 2026-01 (Phase 3 verification): "ED recalls OCR staff; RIF rescinded in January 2026. Staff return to work. OCR backlog: approximately 25,000 pending complaints including ~7,000 open investigations. ED states it will 'bolster and refocus' enforcement. HELP Committee characterizes 2025 as a '12-year low in enforceable relief.'" [NPR December 2025; GAO-26-108320; HELP Committee April 2026]
    - 2026-05-10 (Phase 3 verification state): "Post-recall status: OCR nominally restored to full staffing; Philadelphia regional office should be operationally restored. However, backlog of 25,000 pending complaints means each complaint faces a substantially longer resolution timeline than pre-RIF baseline. Enforcement posture: data shows concentration on Title IX transgender cases and Title VI antisemitism cases per administration priorities; disability and race/national-origin discrimination complaint resolution rate remains suppressed."
- analytical consequence: G11-SD4-04's Standard 11 administrative vulnerability rating escalated from MEDIUM (anticipated variability) to HIGH-CONFIRMED (documented enforcement collapse). The Philadelphia regional office closure means PA-3 students with discrimination complaints filed in 2025 faced either dismissal or referral to another region; specific case outcomes unknown without individual case tracking. The disability discrimination collapse (83 resolution agreements vs. 390 prior year) directly affects IDEA and Section 504 enforcement for PA-3 students with disabilities — the most direct federal floor representation vulnerability for SD4's constituent population. ED OCR restoration of Philadelphia office (January 2026) partially restores capacity, but the backlog is real.
- subsequent-cycle accumulation note: D22 (Civil Rights Enforcement Architecture, planned) is the primary domain for this vector's continuation. D11's TC-04 should be transferred to D22's primary temporal-changes record when D22 cycles. D24 (Veterans Affairs) has a cross-reference to ED OCR enforcement for student-veterans (Title IX; Section 504 at postsecondary). If ED OCR issues any rulemakings affecting SD4 territory (Title IX; Section 504 K-12), subsequent cycles should add vector points. The HELP Committee report (April 2026) is the most recent primary-source quantification; annual tracking warranted.

---

## Pending TC entries (Session 2)

The following T-flags are expected to generate additional TC entries in Session 2 after retrieval:

- **TC-05 (candidate):** T11-SD1-05 / MC49 PA charter reform trajectory — Act 55 (July 2024) cyber charter special-education tuition reform; Shapiro FY2026-27 cyber charter write-off proposal ($75M additional savings, $250M total). Vector: 2024 (Act 55 enacted); 2026-02-03 (Shapiro proposal for additional cyber charter reform). Analytically consequential for MC49 structural-displacement scale.

- **TC-06 (candidate):** T11-SD2-01 FAFSA simplification implementation turbulence — 2024-25 rollout delays; PHEAA GrantUS platform transition for 2025-26. Analytically consequential for G11-SD2-01 FAFSA completion barrier dynamics.

- **TC-07 (candidate):** T11-SD4-01 Title IX rulemaking — 2024 Biden-era Final Rule status; 2020 Trump-era Rule reinstatement; 2025-26 rulemaking. Session 2 retrieval needed.

- **TC-08 (candidate):** T11-SD7-01 SDP-PPD MOU renegotiation — any 2024-2026 MOU revision affecting mandatory referral architecture. Analytically load-bearing for MC48 mechanism enumeration. Session 2 retrieval needed.

- **TC-09 (candidate):** T11-SD5-01 WIOA reauthorization — authorization lapsed; continuing appropriations; any 2025-26 redesign. Session 2 retrieval needed.

- **TC-10 (candidate):** T11-SD3-02 / T11-SD3-03 PA Pre-K Counts and PHLpreK trajectory — post-William Penn budget cycles; Beverage Tax revenue. Session 2 retrieval needed.

---

*D11 Temporal-Changes Sidecar — Session 1 partial (2026-05-10). 4 confirmed TC entries; 6 pending TC candidates for Session 2. Full sidecar to be finalized at Session 2 completion.*
