# DOMAIN FRAMEWORK
## PA-3 Representation Gap Analysis Project
### Date: 2026-04-29 (revision 2)

This document is the project-level framework for the domain portfolio. It establishes what gets analyzed where: the inventory of domains, the principles by which the portfolio is decomposed, the boundaries between adjacent domains, the cross-cutting threads that recur across domains, and the conventions governing display ordering and analytical sequencing.

It sits alongside D0 (Standards) and D1 (PA-3 Orientation) as a project-level foundational document referenced by every domain analysis. D0 governs quality standards; D1 establishes the analytical frame for PA-3 specifically; this document is the domain map. Together the three establish the foundational reference architecture from which the methodology documents (D2-D4) and the domain analyses themselves operate.

---

## TABLE OF CONTENTS

1. Purpose and Position in the Framework Stack
2. Domain Inventory
3. Organizing Principles
4. Boundaries Between Domains
5. Cross-Cutting Threads
6. Display Ordering and Analytical Sequencing
7. Concluding Metadata

---

## 1. PURPOSE AND POSITION IN THE FRAMEWORK STACK

### What this document is

The Domain Framework is the project's authoritative reference for *what gets analyzed where*. It answers questions of the form: which domain owns this body of law? Where is the boundary between adjacent domains drawn? Which cross-cutting threads recur across domains, and how are they tracked without contaminating in-domain analysis? When the website displays domains to a constituent visitor, what is the conceptual organization?

### What this document is not

It is not a substantive analysis of any individual domain. It is not a methodology document — D2 (Substructure), D3 (Pass methodology), and D4 (Handoff methodology) cover those functions. It is not a quality-standards document — D0 covers that. It is not the PA-3 analytical frame — D1 covers that. When this document references domain content, it does so at the level needed to clarify boundaries and not at the analytical depth a domain document operates at.

### Position in the framework stack

| Document | Tier | Purpose |
|---|---|---|
| D0 | Foundational | Quality standards applicable across all domains |
| D1 | Foundational | PA-3 analytical frame (sub-area framework, anchor institutions, representation question) |
| **DOMAIN FRAMEWORK** | **Foundational** | **Domain inventory, boundaries, organizing principles** |
| D2 | Methodology | First-pass methodology cycle |
| D3 | Methodology | Pass 2 methodology cycle (legacy) |
| D4 | Methodology | Inter-domain handoff methodology |
| pa3-source-discipline | Skill | Confabulation prevention at draft time |
| pa3-domain-verification | Skill | Verification of polished content |
| PROJECT_RECORD | Project state | Domain status, sequencing, tools, conventions |
| cross-domain-notes | Project state | Cross-domain connection log accumulating across domains |

### Update discipline

When project conventions change in ways that affect domain organization — when domains are added, dropped, renamed, or split; when boundary calls between adjacent domains are revised; when cross-cutting threads are formalized or retired — this document gets updated. The new dated version supersedes; prior versions remain in archive. Updates to D0, D1, the methodology documents, or the skills that affect this Framework's content trigger corresponding revisions here.

### Relationship to the cross-domain notes file

The Framework draws the lines between domains; the cross-domain notes file logs where the lines get crossed during domain work. The two are complementary and operate at different tempos. The Framework is consulted when boundary calls need authoritative resolution; the notes file accumulates organically during in-domain work as cross-domain connections surface. Neither is a substitute for the other.

---

## 2. DOMAIN INVENTORY

### Conventions

**D-number.** Stable internal identifier assigned at intake. D-numbers do not change once assigned; they are the project's canonical reference IDs across documents, file names, citations, and cross-references.

**Display name.** External-facing name used on the project website and in public communications. May differ from the internal slug-derived name where the public-facing name better signals scope to a non-specialist reader (the dual-name pattern). Where dual-naming applies, the display name appears in italics under the formal entry.

**Short title.** Compact label used in the constituent-facing website index where dense visual scanning matters more than precise scope-signaling. The short title is the page's grid/navigation label; the display name remains the page heading and the canonical public-facing name. The pattern is opt-in per domain (a domain without a short title falls back to its display name in the index). Short titles are not analytical artifacts and are not used in the documentation, citations, or cross-references.

**Slug.** Kebab-case identifier used in file names and URLs (per the file naming convention in PROJECT_RECORD).

**Cluster.** The conceptual grouping the domain belongs to for display purposes (Section 6).

**Status.** Current state of analytical work under the project's current methodology (D2 first-pass cycle as of 2026-04-27). Values:
- *Verified* — D2 first-pass or D3 Pass 2 complete and pa3-domain-verification skill applied; Tier 2 publication-ready
- *First-pass complete* — D2 first-pass through Steps 4-5 produced; verification pending
- *Drafting* — current-methodology work in progress
- *Prior method* — analyzed under earlier methodology; current-methodology pass pending
- *Planned* — no current-methodology work begun

### Inventory table

| D-# | Name | Slug | Cluster | Status |
|---|---|---|---|---|
| D1 | Identity & Legal Status | `idLegStat` | A | Planned |
| D2 | Public Health | `pubHlth` | B | Prior method |
| D3 | Mental Health | `mentHlth` | B | Planned |
| D4 | Food & Medicine *(display: Food, Drug & Device Regulation)* | `foodMed` | B | **Drafting (current)** |
| D5 | Emergency Management | `emerMgmt` | G | Planned |
| D6 | Environment & Natural Resources | `envNatRes` | D | Planned |
| D7 | Land & Property | `landProp` | D | Planned |
| D8 | Commerce & Industry | `commInd` | F | Planned |
| D9 | Finance & Taxation | `finTax` | C | Verified |
| D10 | Labor & Employment | `labEmp` | C | Planned |
| D11 | Education | `educ` | E | Planned |
| D12 | Social Welfare | `socWel` | C | Prior method |
| D13 | Physical Infrastructure | `phsInf` | D | Verified |
| D14 | Digital Infrastructure | `digInf` | E | Planned |
| D15 | Energy | `energy` | D | Planned |
| D16 | Agriculture | `agri` | D | Planned |
| D17 | Public Safety, Law Enforcement & Security | `pubSafLES` | G | Planned |
| D18 | Foreign Policy & Action | `forPol` | H | Planned |
| D19 | Government Operations | `govOps` | H | Planned |
| D20 | Gambling & White-Collar Crime | `gamWCC` | F | Planned |
| D21 | Healthcare Delivery | `hlthDel` | B | Planned (new) |
| D22 | Civil Rights | `civRgts` | A | Planned (new) |
| D23 | Election Law & Democratic Process | `elecLaw` | A | Planned (new) |
| D24 | Veterans Affairs | `vetAff` | B | Planned (new) |
| D25 | Arts & Sciences | `artsSci` | E | Planned (new) |
| D26 | Historical & Public Records | `histRec` | E | Planned (new) |

### Resolved at revision 2 (2026-04-29)

Arts & Sciences and Historical & Public Records, flagged for project lead decision at revision 1, are confirmed as full domains and assigned D25 and D26 respectively. Total domain count: 26. Cluster placement (E in both cases) and the Section 4 boundary calls written assuming inclusion stand without modification. Where the original flagged-dependency notes appeared, references to "F2 if included" become unconditional.

### Brief scope per domain

Each domain's scope is articulated in its own index.md and (for completed domains) its substantive analysis files. The one-sentence scope here is for orientation, not authority.

**D1 Identity & Legal Status.** Citizenship, immigration, vital records, legal personhood, identification systems — the architecture by which government formally recognizes (or fails to recognize) people for governmental purposes.

**D2 Public Health.** Population-level health apparatus distinct from individual medical care: disease surveillance, vaccination, environmental health investigation, health emergencies, food and water safety enforcement at the local level.

**D3 Mental Health.** Mental health policy architecture as a distinct regulatory regime from Public Health and Healthcare Delivery: parity laws, the public mental health system for serious mental illness, crisis response (988 / mobile crisis), substance use disorder treatment.

**D4 Food & Medicine** *(display: Food, Drug & Device Regulation).* The FDA/USDA regulatory architecture for substances entering the body — drugs, biologics, devices, food safety, nutrition labeling, supplements, tobacco, controlled substances. Substantive-input regulation, not access.

**D5 Emergency Management.** Disaster preparedness, response, recovery, mitigation across the federal (FEMA, declared disasters), state (PEMA), and local (county and municipal emergency management) layers.

**D6 Environment & Natural Resources.** Regulatory architecture of public stewardship over commons: CAA, CWA, ESA, NEPA at federal layer; PA DEP at state; municipal environmental authorities at local.

**D7 Land & Property.** Real property law — buying, selling, taxing, zoning, regulating, taking. Housing law lives here including rent regulation, fair housing, and the public-housing apparatus.

**D8 Commerce & Industry.** Trade regulation, antitrust, business formation, sector-specific industrial policy outside the carve-outs (financial in D9, energy in D15, food/drug in D4, labor in D10).

**D9 Finance & Taxation.** Tax policy, public finance, banking regulation, the fiscal architecture across federal, state, and local layers.

**D10 Labor & Employment.** Federal (FLSA, NLRA, OSHA), state (PA wage payment laws, UI, workers' comp), and platform-mediated work regulation. The full architecture of the employer-employee relationship.

**D11 Education.** Schools pre-K through higher education; curriculum; funding formulas; accreditation; the public/private/charter mix; special education; libraries qua educational institutions.

**D12 Social Welfare.** Income support, SNAP, TANF, SSI, SSDI, housing assistance, social insurance — public support architecture for circumstances outside what the labor market alone provides.

**D13 Physical Infrastructure.** Roads, transit (SEPTA), water and sewer, bridges, ports, the built environment that everyone uses regardless of attention to it.

**D14 Digital Infrastructure.** Broadband access, telecommunications, internet governance, public digital services — the layer that increasingly mediates everything else.

**D15 Energy.** Electricity (generation, transmission, distribution, regulation), fuels, energy policy, transition planning, utility regulation.

**D16 Agriculture.** Farms, food systems at the source, agricultural labor, USDA programs (extension, conservation, crop insurance, loans, subsidies), water for irrigation, soil and land use — the field-to-loading-dock layer.

**D17 Public Safety, Law Enforcement & Security.** Policing, prosecution, corrections, courts, parole and probation, national security, intelligence — the full enforcement and adjudication apparatus.

**D18 Foreign Policy & Action.** Diplomacy, foreign aid, international agreements, military action abroad, the institutional architecture of how the U.S. interacts with the rest of the world.

**D19 Government Operations.** Civil service law, procurement law, internal transparency, the inspector general system, FOIA architecture — the meta-domain of how the rules get implemented.

**D20 Gambling & White-Collar Crime.** Gambling regulation (PA Gaming Control Board), financial crime, securities fraud, public corruption — the regulatory and enforcement architecture for harms that don't show up in violent crime statistics.

**D21 Healthcare Delivery (new).** Provider-side institutional architecture and the federal/state/local regulatory regimes governing it: hospitals (CMS Conditions of Participation; state DOH licensure; Joint Commission); FQHCs (HRSA Section 330); Medicare delivery-payment architecture (Parts A/B/C/D and conditions of payment); 340B; ACA marketplaces and individual insurance market regulation; provider licensure (state medical, nursing, allied-health boards); EMTALA; HIPAA; telehealth regulation; long-term care regulation; healthcare workforce policy. The "healthcare delivery" framing is deliberate against the folk-concept of "healthcare," which sweeps in radically different regulatory architectures under one word.

**D22 Civil Rights (new).** The cross-cutting anti-discrimination enforcement architecture: Titles VI, VII, IX of the Civil Rights Act; ADA; FHA; Section 504 of the Rehabilitation Act; the Voting Rights Act enforcement provisions (Section 2 in particular); enforcement bodies (DOJ Civil Rights Division, EEOC, HUD FHEO, ED OCR, HHS OCR). Domain-specific anti-discrimination provisions remain in the substantive domain (Title VII employment in D10; Title IX education in D11; FHA in D7); D22 owns the cross-cutting enforcement architecture and the structural questions it raises.

**D23 Election Law & Democratic Process (new).** Voting Rights Act, NVRA, HAVA, state election administration, voter registration, redistricting, campaign finance (FEC and state equivalents), ballot access, election security. The architecture of representation itself — foundational for a project whose central question is the representation gap.

**D24 Veterans Affairs (new).** Title 38 architecture: VA healthcare system (the largest integrated healthcare system in the U.S.), GI Bill / Post-9/11 education benefits, USERRA, veteran preference in employment, VBA disability and pension benefits.

**D25 Arts & Sciences (new).** Public funding and infrastructure for the arts, the sciences, and the public communication of both — NEA/NEH, NSF/NIH, public broadcasting, research universities qua research, public libraries qua repositories of public knowledge. Combined because both depend heavily on grant infrastructure and produce non-market goods that markets predictably underprovide.

**D26 Historical & Public Records (new).** FOIA, archives at every level of government, vital records as records (Identity & Legal Status owns the vital-records function; this owns the records-architecture function), the census, historical preservation, transparency law. Cross-cutting; treated as a domain because the records and transparency apparatus has its own legal architecture worth analyzing as such.

### Optional renames (flagged for project lead decision)

The dual-name pattern (internal D-number/slug stable; display name external-facing) opens space for renames where the formal name reads bureaucratically or signals scope poorly. The F&M rename is recommended; the three below are surfaced as optional.

| D-# | Current name | Proposed display name | Rationale |
|---|---|---|---|
| D4 | Food & Medicine | **Food, Drug & Device Regulation** | "Medicine" alone is folk-ambiguous between substances and care; FDCA scope is exactly the triad |
| D12 | Social Welfare | Public Benefits & Social Support | "Social welfare" reads bureaucratic; "public benefits" is more constituent-recognizable |
| D17 | Public Safety, Law Enforcement & Security | Public Safety & Justice | Current name is long; "Security" overlaps the others; "& Justice" signals the adjudication side |
| D18 | Foreign Policy & Action | Foreign Policy & International Relations | "& Action" reads awkwardly |

---

## 3. ORGANIZING PRINCIPLES

The project's domain decomposition follows six principles. They are descriptive of decisions already embedded in the portfolio, not novel constraints; consolidating them here makes the implicit explicit and gives the boundary calls in Section 4 a stable foundation.

### Principle 1: Primary regulatory architecture, not outcome or constituent need

Domains are decomposed by what regulatory regime governs them, not by what life domain or constituent experience they map to. Mental health is its own domain (rather than a sub-domain of Public Health) because the policy architecture is genuinely distinct — parity laws, the post-deinstitutionalization public mental health system, the crisis response architecture, SAMHSA-administered treatment funding all operate under their own legal logic. Food & Medicine combines food and pharmaceuticals because they share a regulator (FDA) and a regulatory logic (substances entering the body, pre-market review, FDCA enforcement architecture). Healthcare Delivery is split from Public Health because population-level surveillance and individual provider-side regulation operate under different legal regimes even when they touch the same constituents.

The principle's force is that "representation" — the project's central analytical anchor — operates through specific legal mechanisms (statute, agency rulemaking, appropriations, court enforcement). When domains are organized by legal architecture, the analysis stays answerable to: which lever, at which level, under which authority. When domains are organized by outcome (e.g., "wellbeing"), the analysis floats free of the specific mechanisms that produce or could remediate the outcome, and "representation" loses operational meaning.

### Principle 2: Combinations are deliberate, with explicit shared frame

Where two or more bodies of law are combined into a single domain, the combination is justified by a shared regulatory frame, not by topical proximity. The explicit pairings:

- **D4 Food & Medicine.** Shared FDA regulation; shared substance-entering-body regulatory logic; shared FDCA enforcement architecture.
- **D6 Environment & Natural Resources.** Shared public-stewardship-over-commons logic; shared regulatory bodies (EPA, state DEP, USACE); shared statutory architecture (CAA, CWA, ESA, NEPA).
- **D17 Public Safety, Law Enforcement & Security.** Shared enforcement-and-adjudication architecture; the combination preserves visibility of how the apparatus functions as a system.
- **D20 Gambling & White-Collar Crime.** Shared analytical logic — both turn on regulatory architecture and prosecutorial discretion more than on statutory text; both are areas where harm is widely distributed and underprosecuted relative to scale.
- **F1 Arts & Sciences (if included).** Shared public-good economics; shared grant-infrastructure dependency (NEA/NEH on the arts side, NSF/NIH on the sciences); shared "is this worth taxpayer money" challenge.

### Principle 3: Splits are deliberate, with explicit reason

Where a body of law is split out from an obvious larger home into its own domain, the split is justified by distinct regulatory architecture:

- **D3 Mental Health split from D2 Public Health.** Distinct policy architecture (parity, public MH system, crisis response).
- **D21 Healthcare Delivery split from D2 Public Health.** Distinct architecture for individual delivery (CoP, Conditions of Payment, provider licensure, ACA market regulation) vs. population-level health.
- **D15 Energy split from D6 Environment.** Distinct regulatory regime (FERC, PJM, PA PUC, utility regulation) even where climate policy overlaps.
- **D14 Digital Infrastructure split from D13 Physical Infrastructure.** FCC and state PUC architecture for telecommunications is distinct from DOT/PennDOT/SEPTA architecture for physical infrastructure.
- **D24 Veterans Affairs split from cross-cutting placement.** Title 38 is sui generis; VA healthcare, VBA benefits, USERRA, GI Bill all operate under their own legal regime distinct from civilian counterparts.

### Principle 4: Cross-cutting threads do not get their own domain unless their legal architecture is distinct

Anchor institutions appear in every domain (D0 Standard 10) but do not get their own domain — they are a structural feature engaged sub-domain by sub-domain. Bankruptcy and consumer credit affect constituents across many domains but do not get their own domain — the regulatory architecture is fragmentary (Bankruptcy Code; CFPB jurisdiction; FDCPA; FCRA; TILA) and analytically more tractable as a cross-cutting essay topic for policy development. Cumulative racial disadvantage geography surfaces across multiple domains but is a *pattern*, not a regulatory regime — it gets framework-level recognition (Section 5) without a domain home.

The test for whether a topic earns its own domain is whether it has a distinct legal architecture worth analyzing as such. Civil Rights, by contrast, has a distinct cross-cutting enforcement architecture (DOJ CRD, EEOC, HUD FHEO, ED OCR, HHS OCR) that operates with its own legal logic; it earns a domain (D22) while preserving domain-specific anti-discrimination provisions in their substantive homes.

### Principle 5: Analytical self-containment

Each domain is analyzed on its own institutional, statistical, and constituent-experience terms. Cross-domain machinery is not built into the in-domain analytical workflow. When connections to other domains surface organically during in-domain work, they are logged in the cross-domain notes file and continue accumulating across domains; they do not contaminate the domain document itself. Cross-references between domains are specific (D0 Standard 9): name the domain, sub-domain, and finding rather than gesturing at "as documented in prior domains."

This principle is operationally enforced by the cross-domain notes file's three rules of restraint (reactive only; brief 2-3 sentence Note field; default Status "noted"). It is what allows cross-cutting threads (Section 5) to be tracked without reshaping per-domain analytical structure.

### Principle 6: Power runs through legitimating processes into specific legal mechanisms

The project's analytical anchor is that authority flows from the people through legitimating processes (elections, constitutional ratification) into specific statutes and regulations, which create the obligations and authorities a representation analysis can speak to. The legal-chain organization of sub-domains within each domain (D1 Cross-Domain Organizing Principles; D0 Standard 9) is the operational expression of this principle at the sub-domain level. The Domain Framework's regulatory-architecture decomposition is the operational expression at the domain level. The two operate at different scales of the same principle.

The principle disciplines what cross-cutting work happens where. Cross-cutting analysis that ties to specific legal mechanisms (e.g., the cumulative racial disadvantage geography pattern, which expresses through specific federal-floor enforcement / compliance financing mismatches) belongs in the within-domain synthesis or in a cross-domain analytical pass triggered by the project lead. Cross-cutting analysis that floats free of specific mechanisms (e.g., "wellbeing" or "thriving" as analytical frame) does not have an operational home in this project's methodology.

---

## 4. BOUNDARIES BETWEEN DOMAINS

This section articulates draft boundary calls for the cases where the same body of law or the same constituent experience could plausibly live in more than one domain. Each call is the project's authoritative resolution unless and until revised. The calls are the basis on which substructure work proceeds for any affected domain.

### Boundary 1: Healthcare access (provider-side)

**Calls.**
- *Provider-side institutional architecture* (hospitals, FQHCs, Medicare delivery-payment, 340B, ACA marketplaces, provider licensure) → **D21 Healthcare Delivery**.
- *Population-level health apparatus* (disease surveillance, vaccination programs, environmental health investigations, public health emergencies) → **D2 Public Health**.
- *Medicaid eligibility, enrollment, redetermination, means-testing* → **D12 Social Welfare**. *Medicaid managed care arrangements, provider participation, conditions of payment, 1115 waivers shaping delivery* → **D21 Healthcare Delivery**. The split tracks Title XIX's eligibility-rules sections (SW) and provider-payment sections (HD).
- *Mental and behavioral health services, parity law, crisis response, public mental health system* → **D3 Mental Health**. Hospital-based psychiatric care delivery (psych ER, inpatient, consult-liaison) within general hospital regulation surfaces in D21 with cross-references.
- *Substance regulation* (drugs, biologics, devices) → **D4 Food & Medicine**, not D21.

**Rationale.** "Healthcare" as folk-concept sweeps in radically different regulatory architectures under one word. The split tracks the underlying legal architecture rather than the constituent's experiential category.

### Boundary 2: Pharmaceutical regulation, pricing, and access

**Calls.**
- *FDA approval, post-market surveillance, GMP, recalls, user-fee architecture* (PDUFA, GDUFA, BsUFA) → **D4 Food & Medicine**.
- *Medicare Part D pricing, PBM architecture, formulary design, drug-pricing negotiation provisions* → **D21 Healthcare Delivery**.
- *340B drug pricing program* → **D21 Healthcare Delivery**, because 340B is an HRSA-administered payment-architecture mechanism tied to provider eligibility, not a substance-regulation mechanism.
- *Medicaid drug benefit structure, drug rebates, preferred drug lists* → **D12 Social Welfare** for the eligibility/benefit-design layer; **D21** for the provider-side payment architecture.
- *State pharmacy board licensure of pharmacies and pharmacists* → **D21 Healthcare Delivery** (provider licensure).

**Rationale.** Substance regulation (D4), payment architecture for delivery (D21), and benefit-design for social insurance (D12) are three distinct legal architectures that share the same constituent-facing object (a prescription) but operate under different authorities.

### Boundary 3: Food regulation, access, and production

**Calls.**
- *FDA food safety regulation* (CFSAN, food labeling, supplement architecture under DSHEA, food contact substances) → **D4 Food & Medicine**.
- *USDA-FSIS meat, poultry, and processed-egg inspection* → **D4 Food & Medicine** (substance-regulation logic; FSIS shares the enforcement-architecture frame with FDA).
- *USDA-FNS nutrition assistance programs* (SNAP, WIC, NSLP, SBP, SFSP, CACFP, TEFAP, CSFP, senior nutrition) → **D12 Social Welfare**.
- *Farm-to-loading-dock production* (extension services, conservation programs, crop insurance, USDA loans and subsidies, farmworker labor, farmland preservation) → **D16 Agriculture**.
- *Food retail environment* (food deserts, supermarket access, corner stores) → **D7 Land & Property** for the land-use and zoning side; **D12 Social Welfare** for the food access programmatic side.

**Rationale.** USDA's dual role is the analytical knot: FSIS regulatory architecture sits with FDA in D4; FNS programmatic architecture sits with means-tested benefits in D12; production architecture sits with land-use and farm policy in D16.

### Boundary 4: Civil rights enforcement vs. domain-specific anti-discrimination provisions

**Calls.**
- *Cross-cutting enforcement architecture* (DOJ Civil Rights Division, EEOC, HUD FHEO, ED OCR, HHS OCR; how these bodies coordinate, set priorities, and enforce; structural questions about administrative vs. private-right-of-action enforcement; Section 1983 and *Sandoval* implications) → **D22 Civil Rights**.
- *Title VII employment discrimination provisions and EEOC enforcement specific to employment* → **D10 Labor & Employment**.
- *Title IX provisions and ED OCR enforcement specific to education* → **D11 Education**.
- *Fair Housing Act and HUD FHEO enforcement specific to housing* → **D7 Land & Property**.
- *ADA Title II in transit and pedestrian infrastructure* → **D13 Physical Infrastructure**. *ADA Title II in healthcare* → **D21 Healthcare Delivery**. *ADA Title I in employment* → **D10 Labor & Employment**.
- *Section 504 in federally funded programs* → cross-cuts; engaged in each domain where federal funding flows.
- *Voting Rights Act Section 2 enforcement* → **D23 Election Law & Democratic Process** for the voting-specific architecture; **D22 Civil Rights** for the cross-cutting CRD enforcement layer where structurally relevant.

**Rationale.** D22 owns the cross-cutting enforcement architecture and the structural questions about how civil rights enforcement operates as a system. Domain-specific anti-discrimination provisions remain in their substantive home so the legal-chain architecture stays coherent within each domain. The analytical balance: D22 is the place where cross-cutting questions about enforcement intensity and capacity are raised; substantive domains carry domain-specific provisions in their hierarchical authority chains.

### Boundary 5: Veterans affairs vs. domain-specific veteran provisions

**Calls.**
- *Title 38 architecture* (VA healthcare system, VBA disability and pension benefits, the structural relationships between VA and civilian counterparts) → **D24 Veterans Affairs**.
- *GI Bill / Post-9/11 education benefits* → primary in **D24**; cross-reference from **D11 Education** for higher-education program integration.
- *USERRA and veteran preference in employment* → primary in **D10 Labor & Employment**; cross-reference from **D24** for the employment-architecture interface.
- *VA healthcare as an alternative to civilian healthcare delivery* → primary in **D24**; cross-reference from **D21 Healthcare Delivery** for comparative analysis where structurally relevant.

**Rationale.** D24 owns the Title 38 system because it has its own legal architecture distinct from civilian counterparts. Domain-specific veteran provisions live in their substantive home with cross-references in both directions, because the veteran's actual experience often runs across both the VA system and civilian systems simultaneously.

### Boundary 6: Election Law vs. Government Operations

**Calls.**
- *Voting, elections, redistricting, campaign finance, ballot access, election security, voter registration* → **D23 Election Law & Democratic Process**.
- *Civil service, procurement, FOIA process and architecture, inspector general system, internal transparency mechanisms* → **D19 Government Operations**.
- *Cross-cutting questions about the integrity of self-government* (e.g., redistricting as it affects representation outcomes vs. civil service capacity as it affects program implementation) → both, with the substantive analysis in whichever domain owns the legal mechanism.

**Rationale.** Election Law is the architecture of *representation*; Government Operations is the architecture of *implementation*. The two are foundationally distinct even though both concern the integrity of government. For a project whose central question is the representation gap, separating them keeps the analysis answerable to which mechanism is at issue.

### Boundary 7: Vital records vs. archives

**Calls.**
- *Vital records as records-of-status* (births, deaths, marriages; the systems by which government recognizes and tracks individual status) → **D1 Identity & Legal Status**.
- *Archives, records preservation, FOIA architecture, the census as records system, historical preservation, transparency law* → **D26 Historical & Public Records**.
- *FOIA process specifically* → **D19 Government Operations** for the executive-branch process; cross-reference from **D26** for the records-architecture side.

**Rationale.** D1 owns the vital-records function (the records as instruments of recognition); D26 owns the records-architecture function (the records as artifacts of governance). The split tracks the underlying legal logic — vital records have their own architecture under state vital records law; archives and transparency operate under FOIA and state equivalents.

### Boundary 8: Climate policy

**Calls.**
- *Energy transition planning, RPS standards, energy-mix decarbonization, utility-scale renewables siting and procurement, electric vehicle and EV charging policy* → **D15 Energy**.
- *CAA carbon and methane regulation, NEPA climate review, EPA endangerment findings, climate adaptation regulation, Justice40-style equity overlays on federal climate spending* → **D6 Environment & Natural Resources**.
- *Climate impacts on specific sectors* (e.g., flood risk on housing, heat mortality on public health, agricultural climate adaptation) → cross-references in the substantive domain.

**Rationale.** Climate policy splits cleanly along the regulatory-architecture line: D15 owns the policy architecture for the energy system's transition; D6 owns the regulatory architecture for greenhouse-gas regulation under environmental statutes. Climate-as-context for other domains (housing, public health, agriculture) is cross-reference territory.

### Boundary 9: Anchor institutions

**Call.** Anchor institutions (Penn, Drexel, Temple, CHOP per D0 Standard 10; health anchor extension to Penn Medicine, Jefferson, Temple Health, etc.) are **cross-cutting; no home domain**. They are engaged sub-domain by sub-domain in each domain's analysis using the triple-role frame (employer / property tax-exempt / community benefit) at depth their structural role in that domain warrants.

**Rationale.** Anchor institutions cut across labor (employer), land (real estate actor and tax-exempt), finance (PILOET architecture), education (their own institutional missions), healthcare delivery (Penn Medicine, Jefferson, etc.), public health (research and clinical service), environment (campus environmental footprint), and other domains. No single domain is their home; making any single domain the home would distort that domain's analytical scope.

### Boundary 10: School nutrition programs

**Calls.**
- *USDA-FNS school meal program architecture* (NSLP, SBP, SFSP, CACFP — federal program design, eligibility, reimbursement rates, nutrition standards) → **D12 Social Welfare** as part of FNS nutrition assistance programs.
- *School-program operational integration* (how nutrition programs actually run within school operations, the relationship to SDP food service contracts, kitchen and cafeteria capacity) → **D11 Education** with cross-reference from D12.
- *School building physical infrastructure within which nutrition programs operate* (cafeteria condition, kitchen equipment, pantry storage, HVAC and refrigeration) → **D13 Physical Infrastructure** SD5 cross-reference (already documented).

**Rationale.** Three angles, three domains, deliberately separated. The constituent's experience (a child eating school lunch) integrates them; the analysis disaggregates them so the legal-chain architecture is preserved in each domain.

---

## 5. CROSS-CUTTING THREADS

Patterns and frameworks that recur across domains without earning their own domain (Principle 4). Each thread is articulated here at the level of "this is a recurring pattern; track it where it surfaces" rather than at analytical depth. Substantive analysis happens within domains; cross-cutting integration accumulates in the cross-domain notes file and triggers Mode 1 analytical passes when the project lead chooses.

### Thread 1: Anchor institution triple-role frame

Per D0 Standard 10. Penn, Drexel, Temple, CHOP — and the extended health-anchor set (Penn Medicine, Jefferson, Temple Health, Einstein, Roxborough, Chestnut Hill) — appear in every domain in some role. The triple-role frame (employer / real estate actor and tax-exempt / community benefit) governs how the engagement happens; the relevance of each role varies by domain. Sub-domain-specific relevance variation is itself a finding (Domain 13 SD2 surfaced this for PWD's enterprise-utility funding structure).

### Thread 2: Cumulative racial disadvantage geography

The same underlying demographic geography established in D1 produces differential outcomes across multiple domains. Domain 13 documented this across five of seven sub-domains (lead service line concentration, HIN concentration, dumping concentration, building condition concentration, park-quality / tree canopy / heat differentials). Subsequent domains likely have parallel expressions: food access geography, medical care access geography (in D21), pharmacy desert geography, primary care provider concentration, FQHC service area patterns. The pattern earns framework-level recognition; analytical formalization happens within each domain (the PDPH UC metric and TPL ParkScore Equity score from Domain 13 are precedents for what such formalization can look like).

### Thread 3: Federal-state-local layered architecture

Most domains in the portfolio operate under federal-state-local layered authority. The hierarchical authority chain (Constitutional → Federal Statutory → Federal Agency → State Statutory → State Agency → Local Statutory → Local Agency → Constituent) is the structural template for sub-domain analysis (D1 Cross-Domain Organizing Principles). The thread is operationalized through D0 Standard 11 (statutory stability vs. administrative vulnerability taxonomy) and the federal-floor enforcement variation framework where it applies.

### Thread 4: Federal-floor enforcement / compliance financing structural mismatch

A recurring pattern in which federal-floor enforcement obligation operates on its own terms while federal financial assistance for compliance is structurally inadequate or absent. Most acute in Domain 13 SD5 (AHERA enforcement against SDP without compensating compliance financing). Pattern extends to SDWA without federal water-affordability program; LCRR/LCRI customer-side replacement requirements; ADA Title II compliance for sidewalks. Anticipated parallels in Domain 4: FDA enforcement requirements without compliance financing for small food retailers and pharmacies. Anticipated parallels in Domain 21: Medicare/Medicaid compliance requirements (Schedule H, HIPAA, quality reporting) operating as conditions of federal payment without commensurate compliance-infrastructure financing.

### Thread 5: Layered household fiscal architecture

The federal/state/local fiscal architecture layers onto PA-3 households as compound burden — wage tax, BIRT, property tax, state income tax, federal income tax, sales tax, fees and charges, and the offsetting credits (federal EITC, state EITC as of 2025, Schedule SP refund, etc.). Documented in D9; relevant to any domain analyzing distributional impact at the household level. D4 (medical debt; prescription drug affordability; food affordability under SNAP), D7 (housing cost burden), D10 (wage incidence), D11 (education-related cost burdens), D12 (benefit-eligibility interactions with tax filing) all touch this thread.

### Thread 6: Authorization-to-disbursement gap

The gap between Congressional authorization (or appropriation) and actual disbursement to the local jurisdiction is itself a structural feature of federal funding architecture, not a temporary disruption. Surfaced in Domain 13 SD7 around IIJA implementation (FY26 spending bill rescissions; mid-cycle cancellations; Justice40 framework revocation). Anticipated parallels in Domain 4 (Farm Bill reauthorization; FDA user fee reauthorization; Health Center funding reauthorization for D21). Cross-domain pattern: federal authorization stability and federal disbursement reliability are different variables; both must be analyzed where federal funding flows to the domain.

### Thread 7: Statutory stability vs. administrative vulnerability taxonomy

Per D0 Standard 11. Programs and provisions classify on two independent dimensions: statutory stability (HIGH / MODERATE / LOW — does it require Congressional action to modify?) and administrative vulnerability (HIGH / MODERATE / LOW — can the executive branch alter delivery, funding, enforcement priority, or capacity without Congressional action?). The EITC paradigm case (HIGH statutory stability + HIGH administrative vulnerability simultaneously) carries from Domain 9 forward. Anticipated D4 parallels: SNAP (HIGH statutory + HIGH administrative through state implementation, work requirements, error rates); Medicaid (HIGH statutory + HIGH administrative through state waivers, redetermination, provider-network adequacy).

### Thread 8: Cross-district coordination and boundary-adjacent dynamics

Regulatory and operational geography frequently differs from political (congressional district) geography. PA-3 sits within the City and County of Philadelphia, but many institutional or natural geographies extend across district boundaries: PWD water service, Wissahickon watershed, SEPTA's 5-county service region, suburban hospital systems serving Philadelphia residents, regional food retail chains, environmental Superfund sites at city/county boundaries. The four-sub-area framework documents these as factual features rather than as a permanent fifth sub-area (per current practice; D0 and D1 currently still describe a five-sub-area framework with permanent Boundary-Adjacent and are due rev 3 to align with current practice).

### Reflexivity

Per D0 Reflexivity Appendix. The project itself is a system for representing PA-3 residents and their circumstances; it is produced through a human-AI workflow that carries tendencies (coherence-seeking; narrative imposition; gap-filling; deference to established framing; confabulation under register pressure). The cross-cutting threads above operate at the project's analytical surface; the reflexivity threads operate at the project's epistemic-construction surface. Both are tracked.

---

## 6. DISPLAY ORDERING AND ANALYTICAL SEQUENCING

Three orderings operate over the domain portfolio. They are independent of one another and serve different purposes.

### Display order (cluster-driven)

The website organizes domains by conceptual cluster for constituent-visitor legibility. Eight clusters, concentric rings outward from the constituent: who you are → your body and care → your work and resources → where you live → what you know and create → markets → safety and conflict → the state itself.

The cluster letters A–H are stable internal identifiers (parallel to D-numbers); the website displays each cluster's theme name as a section heading and does not surface the letters.

| Cluster | Theme | Domains |
|---|---|---|
| A | Personhood, Identity, and Citizenship Rights | D1 Identity & Legal Status; D22 Civil Rights; D23 Election Law & Democratic Process |
| B | Health and Care | D2 Public Health; D3 Mental Health; D21 Healthcare Delivery; D4 Food & Medicine; D24 Veterans Affairs |
| C | Income, Work, and Fiscal Architecture | D12 Social Welfare; D10 Labor & Employment; D9 Finance & Taxation |
| D | Land, Resources, and Built Environment | D7 Land & Property; D13 Physical Infrastructure; D15 Energy; D6 Environment & Natural Resources; D16 Agriculture |
| E | Knowledge and Culture | D11 Education; D25 Arts & Sciences; D14 Digital Infrastructure; D26 Historical & Public Records |
| F | Markets | D8 Commerce & Industry; D20 Gambling & White-Collar Crime |
| G | Safety and Adjudication | D17 Public Safety, Law Enforcement & Security; D5 Emergency Management |
| H | The State Itself | D19 Government Operations; D18 Foreign Policy & Action |

Within each cluster, the sub-ordering is by closeness to constituent experience: Cluster B leads with population health (broadest reach), narrows through mental health and healthcare delivery to substance regulation, with veterans affairs as a parallel system at the edge; Cluster D leads with land (where you live) and works outward through built environment, energy, environmental regulation, to agricultural production at the field edge.

Cluster H in particular bundles two domains (D19, D18) that are both "the state operating on its own terms" but with very different constituent contact. Within-cluster ordering puts Government Operations first as the more constituent-proximate (FOIA requests, civil service hiring, procurement contracts) and Foreign Policy second as the less constituent-proximate (in the everyday sense; the consequences when they manifest can be enormous).

### Analytical sequence (project-lead-determined)

The order in which domains receive current-methodology analytical work is independent of display order. Sequencing reflects analytical priorities (gap intensity, dollar flow, contestedness, litigation activity, opportunity cost) and project-state factors (which domains have prior-method work that needs re-passing; which carry-forward dependencies are most consequential).

Current sequence as of this revision:
- **D4 Food & Medicine** is the current domain (drafting)
- **D12 Social Welfare** is sequenced next (return to redo prior-method work under current methodology)
- Subsequent sequencing is project-lead-determined; an analytical priority order may be re-articulated in a future revision of this document or in PROJECT_RECORD

The earlier priority list (the "Priority Order for PA-3" with priorities 1-10 listed) is being revisited and is not currently active as the operational sequence. When a new analytical sequence is articulated, it gets surfaced here.

### D-numbers (stable IDs)

D-numbers do not change. They were assigned at intake and serve as the project's canonical reference. New domains receive the next available D-number (D21 Healthcare Delivery, D22 Civil Rights, D23 Election Law & Democratic Process, D24 Veterans Affairs in order of decision in the conversation that produced revision 1; D25 Arts & Sciences and D26 Historical & Public Records added at revision 2). Subsequent additions continue from D27.

The independence of D-numbers, display order, and analytical sequence is deliberate. It allows the website to be reorganized for constituent legibility without renaming any internal references; allows analytical sequencing to follow priority logic without disrupting display; allows D-numbers to remain stable across revisions of either.

---

## 7. CONCLUDING METADATA

### Update history

- **2026-04-27 (revision 1).** Initial production of the Domain Framework as a project-level foundational document. Integrates the canonical D-number list (D1-D20) with four conversation additions (D21-D24): Healthcare Delivery, Civil Rights, Election Law & Democratic Process, Veterans Affairs. Surfaces F1 (Arts & Sciences) and F2 (Historical & Public Records) for project lead decision. Articulates eight-cluster display ordering, six organizing principles, ten boundary calls, and eight cross-cutting threads.
- **2026-04-29 (revision 2).** F1 and F2 confirmed as full domains and assigned D25 (Arts & Sciences) and D26 (Historical & Public Records); inventory and Section 6 cluster table updated; Boundary 7 dependency footnote retired. Section 2 Conventions adds a "Short title" entry to formalize the dual-name pattern between page-canonical display names and the constituent-facing index labels used on the project website. Cluster H label changed from "Government Itself" to "The State Itself" to free that phrase as D19's short title without collision. Implementation note: the website's Empower index now renders domains grouped by cluster heading, in framework order, using short titles where defined and falling back to the display name otherwise.

### When this document gets updated

- When domains are added, dropped, renamed, or split
- When boundary calls between adjacent domains are revised
- When cross-cutting threads are formalized or retired
- When the cluster scheme changes
- When updates to D0, D1, the methodology documents, or the skills affect domain organization

### Companion documents

- `D0_standards_YYYY-MM-DD.md` — quality standards
- `D1_pa3-orientation_YYYY-MM-DD.md` — PA-3 analytical frame
- `PROJECT_RECORD_YYYY-MM-DD.md` — project state, sequencing, conventions, tools
- `cross-domain-notes_YYYY-MM-DD.md` — cross-domain connection log
- D2/D3/D4 methodology documents (project lead maintains)
- `D{n}_{slug}_kickoff_YYYY-MM-DD.md` — domain-specific kickoff for each domain
- `D{n}_{slug}_OUTPUT_YYYY-MM-DD.md` and `D{n}_{slug}_verified_YYYY-MM-DD.md` — domain analytical outputs

### Open items requiring project lead decision

These are the items raised within this Framework that require project lead direction before they propagate forward.

1. ~~**F1 Arts & Sciences and F2 Historical & Public Records** — include as full domains?~~ *Resolved revision 2: included as D25 and D26.*
2. **D20 Gambling & White-Collar Crime** — kept combined per the directory; confirm or split?
3. **Optional renames** for D12, D17, D18 — adopt as display names, hold, or decline? *Status note: D12 (Public Benefits & Social Support), D17 (Public Safety & Justice), and D18 (Foreign Policy & International Relations) display names are in use on the project website; the framework's formal display names remain the originals pending explicit project-lead adoption.*
4. **D-number reconciliation** — the 19 existing-domain D-numbers (other than D4, D9, D13 which are confirmed) inferred from the canonical paste's positions 1-20. Confirm the inferred assignments?
5. **Analytical sequence after D12 Social Welfare** — articulate the operational priority order as a future revision, or continue project-lead-direct sequencing call by call?
6. **D0 and D1 revision 3 schedule** — to align with current practice (four-sub-area framework; structural-not-rated federal-floor enforcement; aggregate pathways). Schedule for after current D4 work, or earlier?

---

*Domain Framework — revision 2, 2026-04-29.*
