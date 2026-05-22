# Unverified Items — D24 Veterans Affairs
## PA-3 Representation Gap Analysis Project

**Domain:** D24 — Veterans Affairs
**Verification date:** 2026-05-10
**Methodology:** M2 v1.2 / M0 v2.1 / Skills v3
**Phase 3 verification worker:** Sonnet 4.6

**Purpose:** This sidecar documents items where Phase 3 verification could not be completed within the web-search-tractable scope of M2 v1.2's "close, not perfect" discipline. Each UV entry states what was sought, what prevented resolution, what would be needed to resolve, and whether the finding-level confidence is affected. These items do not block Tier 2 publication but are tracked for future retrieval cycles.

---

## UV-01: D24-Q1 HOM — VETS-4212 Institution-Specific Figures for PA-3 Anchor Institutions

**What was sought:** VETS-4212 reports for Penn Medicine (University of Pennsylvania Health System), Temple University Health System, Jefferson Health, and Drexel University — specifically: total protected veteran employees by EEO-1 category; new hires of protected veterans in most recent reporting period (CY2024-CY2025); total employees (denominator for veteran percentage). These figures would provide the primary data source for a partial-magnitude characterization of D24-Q1 (anchor-employer veterans-targeted hiring).

**What was attempted:** Three web searches: (1) VETS-4212 public database general search; (2) Penn Medicine VETS-4212 DOL site search; (3) DOL open data portal direct fetch. Results confirmed that: (a) the DOL launched a new open data portal (data.dol.gov) in February 2026 making VETS-4212 data publicly accessible for the first time; (b) the portal requires JavaScript and API access — direct web fetch returns an empty JavaScript-dependent page; (c) institution-specific VETS-4212 data was not retrievable via standard web search.

**What prevented resolution:** The data.dol.gov portal is JavaScript-dependent and not web-search-tractable in Phase 3 verification session. Institution-specific figures require API query or portal navigation that is not available in current verification regime.

**What would resolve this:** API query to data.dol.gov using company name search for "University of Pennsylvania," "Temple University Health," "Jefferson Health," and "Drexel University" for CY2024 or CY2025 filing cycles. The data is now publicly accessible and requires only a technical retrieval step.

**Effect on D24-Q1 HOM:** D24-Q1 held-open-at-magnitude preserved. If institutional data shows anchor-institution protected-veteran employment rates at or substantially above the national VEVRAA benchmark (~5.9% as of prior retrievals), G24-SD5-02's confidence characterization would need updating. If below national benchmark, the process-orientation gap finding is strengthened. Either outcome preserves Both/And framing; neither closes the D24-Q1 HOM by analytical assertion — only partial magnitude characterization becomes possible.

**Sequel-candidate status:** PRIMARY D24-Q1 sequel candidate. The data is now accessible; retrieval is a technical step rather than an institutional-retrieval barrier. Recommended for inclusion in first follow-up retrieval cycle.

---

## UV-02: CMCVAMC Current Enrollment Figure (F24-SD1-01)

**What was sought:** Current CMCVAMC enrolled veteran count (to update the 55,000–57,500 estimate); CBOC geographic coverage within PA-3.

**What was attempted:** Two web searches and VA.gov fetch; VA mission page confirms CMCVAMC as 1b-High Complexity facility serving Philadelphia metropolitan area. One 2017 fact sheet (DLA Portals) reports "more than 55,000 veterans enrolled" with approximately 590,000 annual visits.

**What prevented resolution:** VA.gov current operational pages do not publish current enrollment figures; the most recent publicly available specific figure is the 2017 "55,000+" statistic.

**What would resolve this:** VA Health Care Network VISN 4 annual report; CMCVAMC operational briefing documents; PACT Act enrollment data at facility level.

**Effect on findings:** The 55,000–57,500 estimate is the best publicly available figure. Post-PACT Act enrollment expansion (effective March 5, 2024, added all toxic-exposure veterans to VHA eligibility) is structurally likely to have increased enrollment above the 2017 baseline, but the magnitude is not publicly confirmed. SD1 finding #1 retains [D] MEDIUM confidence label. The F-flag is documented here; no confidence revision to [SD] is warranted from the non-retrieval.

---

## UV-03: CMCVAMC PACT Act Toxic-Exposure Screening Completion Rate (F24-SD1-03)

**What was sought:** CMCVAMC-specific completion rate for PACT Act toxic-exposure screening under Oracle Cerner EHR; quantification of the VA OIG (November 2024) training-gap finding at CMCVAMC specifically.

**What prevented resolution:** The VA OIG November 2024 report on toxic-exposure screening was VHA-wide (not facility-specific); CMCVAMC-specific completion rates are institutional retrieval territory (VA internal operational data).

**Effect on findings:** SD1 finding #2 (PACT Act screening gaps) retains structural inference character. The national OIG finding applies to CMCVAMC by structural inference; CMCVAMC-specific rate remains unquantified. Note: TC-04 clarifies that CMCVAMC remains on VistA (not Oracle Cerner), which affects the specificity of the OIG finding as applied to CMCVAMC.

---

## UV-04: Philadelphia VARO Pending Claims and Throughput Data (F24-SD2-01, F24-SD6-01)

**What was sought:** Philadelphia VARO pending claims volume; backlog share (% of Philadelphia VARO inventory >125 days pending); average days to complete at Philadelphia VARO; VR&E participant counts in Philadelphia catchment.

**What prevented resolution:** VBA's Benefits Dashboard (benefits.va.gov/REPORTS/) provides national and state-level data; Philadelphia VARO-specific weekly claims data is available in downloadable spreadsheets but was not retrievable via web search in this session. The state-level Pennsylvania data was not specifically retrieved.

**Effect on findings:** National backlog trajectory applies to Philadelphia VARO by structural inference. G24-SD6-02 (VARO throughput as access delay) retains MEDIUM confidence from structural inference rather than direct documentation. Specific Philadelphia VARO performance metrics are not available.

**What would resolve this:** VBA weekly spreadsheet download from benefits.va.gov/REPORTS/ filtered for Philadelphia VARO (station 310); PA state-level data from VBA claims data public dashboard.

---

## UV-05: Post-9/11 GI Bill BAH Rate for Philadelphia Zip Codes (F24-SD3-02 — specific dollar figure)

**What was sought:** Specific dollar amount of Post-9/11 GI Bill Monthly Housing Allowance (MHA) for zip codes 19104 (University of Pennsylvania area) and 19122 (Temple University area) for AY2025-26 (August 1, 2025 – July 31, 2026).

**What was confirmed:** The MHA is calculated as the BAH for an E-5 with dependents using 2025 rates at the school's zip code; the VA.gov page confirms the methodology and links to the DOD Defense Travel Management Office BAH lookup tool. For online-only enrollment, the MHA is $1,169/month for AY2025-26. The specific in-person dollar amount for zip codes 19104 and 19122 requires the DOD BAH calculator.

**What prevented resolution:** The DOD BAH rate calculator (travel.dod.mil/Allowances/Basic-Allowance-for-Housing/BAH-Rate-Lookup/) was not directly fetched in this session; it is a JavaScript-dependent calculator.

**What would resolve this:** DOD BAH lookup at travel.dod.mil for E-5 with dependents, zip code 19104, 2025 rates. This is a simple administrative lookup; the methodology is confirmed correct.

**Effect on findings:** SD3 Section 5 profiles and illustrative calculations remain accurate as to methodology. The specific dollar figure for the Philadelphia area BAH is not confirmed; the "approximately $[X]" slot in any illustrative calculation remains F-flagged as requiring administrative confirmation.

---

## UV-06: Yellow Ribbon AY2025-26 Contribution Amounts at PA-3 Anchor Institutions (F24-SD3-01)

**What was sought:** Current AY2025-26 Yellow Ribbon contribution amounts and slots at Penn (undergraduate and graduate), Drexel, Temple, and Jefferson Thomas Jefferson University; confirmation that unlimited contributions and unlimited slots remain in effect.

**What was confirmed:** The Post-9/11 GI Bill private school tuition cap is $29,920.95 for AY2025-26 (August 1, 2025 – July 31, 2026). Yellow Ribbon supplements tuition above this cap at eligible institutions. The Yellow Ribbon program structure is confirmed operative.

**What prevented resolution:** The VA GI Bill Comparison Tool (va.gov/gi-bill-comparison-tool/) is a JavaScript-dependent interactive tool; specific AY2025-26 institution-level Yellow Ribbon amounts were not web-search-tractable in this session. AY2024-25 amounts confirmed at Phase 1 (Penn unlimited/unlimited; Drexel unlimited/unlimited; Temple unlimited/unlimited undergraduate). These have not been verified for AY2025-26.

**Effect on findings:** SD3 finding #9 (generous Yellow Ribbon participation) retains structural accuracy as to prior-year confirmed levels. If any institution reduced contributions or slots for AY2025-26, Profile 1's full-coverage scenario at SD3 Section 5 would need updating.

**What would resolve this:** VA GI Bill Comparison Tool lookup for Penn, Drexel, Temple, Jefferson TJU for AY2025-26.

---

## UV-07: Philadelphia HUD-VASH PHA Utilization Rate (F24-SD4-01 — utilization component)

**What was sought:** Philadelphia Housing Authority's HUD-VASH voucher utilization rate (leased as % of allocated); determination of whether PHA is above or below the 85% threshold that triggers mandatory community contracting under P.L. 116-315.

**What prevented resolution:** HUD HCV Dashboard (hud.gov/program_offices/public_indian_housing/programs/hcv) provides PHA-level utilization data but was not retrievable via web search in this session; requires direct portal navigation.

**Effect on findings:** SD4's MC42 Both/And (substantive partnership AND voucher-utilization gap) retains analytical validity from the structural argument. The specific PHA utilization rate is not confirmed; the finding that Philadelphia's constrained rental market limits voucher utilization remains MEDIUM confidence structural inference.

**What would resolve this:** HUD Housing Choice Voucher Dashboard lookup for Philadelphia Housing Authority (PHA code PA001); or direct contact with PHA for current HUD-VASH portfolio utilization data.

---

## UV-08: OFCCP Compliance Reviews at PA-3 Anchor Institutions Post-July 2, 2025 (T24-SD5-01)

**What was sought:** Whether OFCCP has conducted compliance reviews or enforcement actions at Penn Medicine, Temple Health, Jefferson Health, or Drexel-affiliated facilities following VEVRAA enforcement resumption on July 2, 2025.

**What prevented resolution:** OFCCP's compliance evaluation database (dol.gov/agencies/ofccp) was not directly searched in this session; the database requires web navigation and specific employer lookup.

**Effect on findings:** T24-SD5-01's characterization remains as: "VEVRAA enforcement resumed July 2, 2025 (D10 SD5 cross-reference confirmed); OFCCP compliance reviews at specific PA-3 anchor institutions have not been confirmed or ruled out as of verification date." G24-SD5-02's confidence level remains MEDIUM. If OFCCP has conducted reviews at anchor institutions, it would strengthen the enforcement-as-realized-oversight finding.

---

## UV-09: CAVC/Federal Circuit Recent Precedential Decisions (T24-SD7-01)

**What was sought:** CAVC or Federal Circuit decisions since August 2025 affecting PACT Act claim-denial appeals, effective-date rules, or pro-claimant standards (§ 5107 benefit-of-the-doubt; § 5103A duty-to-assist).

**What prevented resolution:** CAVC (uscourts.cavc.gov) and Federal Circuit (cafc.uscourts.gov) full case databases were not searched within this session; three-search budget was allocated to higher-priority flags.

**Effect on findings:** SD7's doctrinal analysis (§ 5107, § 5103A, Brown v. Gardner, Henderson v. Shinseki) rests on established settled law. If CAVC or Federal Circuit has issued precedential decisions that materially narrow the duty-to-assist or benefit-of-the-doubt standards in the PACT Act context, SD7's Section 2 authority chain analysis would require updating. The structural argument in G24-SD7-02 is robust to minor doctrinal adjustments; only a substantial CAVC or Federal Circuit reversal of established standards would require structural revision.

---

*End of D24 unverified-items sidecar. 9 UV entries. Items track institutional-retrieval territory and three-search-budget exhausted items. UV-01 (D24-Q1 VETS-4212) is the primary sequel candidate. UV-02 through UV-09 are secondary. None block Tier 2 publication per M2 §7 boundedness discipline.*
