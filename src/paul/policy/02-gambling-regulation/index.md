---
layout: base.njk
title: The House Always Wins — Gambling Regulation Reform
description: A coherent regulatory framework for legal gambling and prediction markets. Functional equivalence drives regulatory equivalence; consumer protection follows the activity, not the legal vehicle.
state: drafting
order: 2
updated: 2026-04-26
---

# Project 2 — The House Always Wins

<p class="domain-lead">The American gambling industry generated $71.92 billion in commercial gaming revenue in 2024 — a fourth consecutive annual record (American Gaming Association, State of the States 2025). Americans legally bet $149.9 billion on sports alone. The industry paid $15.91 billion in direct gaming tax revenue to state and local governments. And that is just the regulated market. As of early 2026, prediction markets — Kalshi, Polymarket, and others — operate a parallel universe of gambling outside state regulation entirely, offering binary contracts on everything from Super Bowl outcomes to White House staff turnover. The question isn't whether Americans gamble. They do. The question is whether the regulatory framework governing gambling is coherent, and the empirical answer is that it isn't.</p>

## The argument

The system is fractured across three incompatible regimes: state-licensed gaming (casinos, sports betting), federally regulated prediction markets (CFTC-supervised designated contract markets), and a growing unregulated fringe (offshore sites, "sweepstakes casinos," skill-game machines). Each regime has different consumer protections, different tax obligations, and different accountability structures. The result is a system where the same economic activity — placing a wager on the outcome of a football game — is legal, regulated, and taxed through one channel, and legal, lightly regulated, and untaxed through another.

This is a system design problem, not a moral argument about gambling. The pro-system position is clear: if gambling is legal (and it is, in most of the country), then the regulatory architecture should be rational, consistent, and protective. It currently is none of these.

## Current legal landscape

**State gambling regulation.** Gambling has historically been regulated by states under their police powers. As of 2025, 38 states and Washington, D.C. have legalized sports betting in some form (AGA, 2025). Each state sets its own tax rates, licensing requirements, and consumer protections. Tax rates on sports betting revenue range from 6.75% (Nevada) to 51% (New York). This patchwork emerged after the Supreme Court's 2018 decision in *Murphy v. NCAA* (584 U.S. ___, 2018), which struck down the Professional and Amateur Sports Protection Act (PASPA) and allowed states to legalize sports betting.

**The Commodity Exchange Act (CEA) and prediction markets.** Prediction markets operate as "event contracts" or "swaps" under the CEA (7 U.S.C. §§ 1–27f), supervised by the CFTC. Kalshi obtained Designated Contract Market (DCM) status, which allows it to self-certify new contract types. In late 2024, a federal court held that political event contracts were permissible under the CEA (*KalshiEX LLC v. CFTC,* D.D.C. 2024). The CFTC, under the Biden administration, attempted to block political contracts but dropped its appeal in May 2025. Since January 2025, Kalshi has offered sports event contracts. The CFTC under Chairman Michael Selig has signaled a permissive posture, announcing a four-part agenda to "support the responsible development of event contract markets" (CFTC, January 29, 2026, "Project Crypto" summit).

**The federal-state collision.** This permissive federal posture has triggered a multi-front legal war:

- Nevada, New Jersey, Maryland, Massachusetts, New York, Connecticut, Arizona, Illinois, and Tennessee have all taken enforcement action against prediction market platforms, arguing that sports event contracts are gambling subject to state law.
- Federal courts are deeply split. Courts in Nevada and New Jersey initially sided with Kalshi on preemption, finding that the CEA grants exclusive federal jurisdiction over DCM-traded contracts. Maryland and Massachusetts sided with the states. The Nevada court later reversed itself, dissolving the injunction that had shielded Kalshi.
- In April 2026, the Trump administration's CFTC sued Connecticut, Arizona, and Illinois, arguing that states have no authority to regulate federally supervised financial markets.
- In March 2026, Arizona's Attorney General filed criminal charges against Kalshi — the first criminal prosecution of a prediction market platform.
- In March 2026, Senators John Curtis (R-UT) and Adam Schiff (D-CA) introduced the bipartisan "Prediction Markets Are Gambling Act," which would amend the CEA to prohibit sports and casino-style event contracts on CFTC-regulated platforms.

**The tax gap.** Prediction market platforms offering sports bets have cost state governments an estimated $620 million in lost gaming taxes since the start of 2025 (AGA Commercial Gaming Revenue Tracker, March 2026). These platforms do not pay state gaming taxes, creating a competitive distortion that undermines the regulated market.

**The consumer protection gap.** State-regulated sportsbooks operate under responsible gambling frameworks: self-exclusion lists, deposit limits, mandatory problem gambling disclosures, age verification, and dedicated responsible gambling funding. Prediction markets operate under CFTC rules designed for commodity derivatives — they have insider trading prohibitions and market integrity rules, but none of the gambling-specific consumer protections. The CFTC has already documented insider trading cases on Kalshi: a political candidate trading on his own race, and a YouTube editor trading on advance knowledge of video content (CFTC Enforcement Division Advisory, February 2026).

**Problem gambling.** The National Council on Problem Gambling estimates that approximately 2.5 million U.S. adults experienced severe gambling problems in 2024, with an additional 5–8 million at moderate risk. Among online sports bettors specifically, 17% met the problem gambling threshold, compared to 13% of in-person bettors (FDU study, 2024, cited in Gambling Insider, 2026). Mobile betting and event contracts are expanding faster than the regulatory infrastructure for harm prevention.

## The core problem: prediction markets on non-sports events

Prediction markets on non-sports events deserve particular attention because they represent the most genuinely novel regulatory challenge. Sports event contracts are, functionally, sports bets repackaged as financial instruments. But prediction markets also offer contracts on:

- **Political outcomes:** Who will win elections, which officials will be fired or resign, what policies will be enacted. These create financial incentives to influence political outcomes and raise profound questions about democratic integrity.
- **Human suffering events:** Contracts on natural disasters, terrorist attacks, war outcomes, pandemic metrics. These create profit opportunities tied to human misery and can create perverse incentives.
- **Individual behavior:** Contracts tied to whether specific individuals will take specific actions (will a CEO resign, will a celebrity have a #1 hit). Privacy and manipulation concerns.
- **Market manipulation loops:** Contracts whose outcomes can be influenced by the trading activity itself (prediction markets on stock prices or crypto values).

The information-aggregation defense of prediction markets — that they produce valuable price signals reflecting collective knowledge — is empirically supported for some categories, including election forecasting, where prediction markets have outperformed polls (Arrow et al., 2008, "The Promise of Prediction Markets," *Science*). But the information-aggregation benefit doesn't automatically extend to every possible event category, and it doesn't address the regulatory arbitrage that allows these instruments to evade gambling-specific consumer protections and tax obligations.

## Proposed regulatory framework

### The principle: functional equivalence drives regulatory equivalence

If two products serve the same economic function — allowing individuals to wager money on uncertain outcomes for profit — they should face equivalent regulation regardless of the legal vehicle used. This isn't novel; it's the basis of securities regulation (the Howey test determines what is a security based on economic substance, not legal form).

### Tier 1 — Sports and entertainment event contracts

Any contract whose outcome is determined by a sporting event, entertainment event, or competition should be regulated as gambling under state law. This includes prediction market contracts structured as swaps or event contracts when the underlying event is a game, match, race, or similar contest. The Curtis-Schiff "Prediction Markets Are Gambling Act" moves in this direction.

**Mechanism:** Amend the CEA (7 U.S.C. § 2) to explicitly exclude sports and entertainment event contracts from CFTC exclusive jurisdiction, returning them to state gambling regulation. Alternatively (and more defensibly under the Supremacy Clause), establish minimum federal standards that prediction market platforms must meet before offering these contracts — including state-equivalent responsible gambling protections, tax obligations, and licensing.

### Tier 2 — Political and democratic process contracts

Contracts on elections, government actions, policy outcomes, and official appointments present unique democratic integrity concerns. Heightened regulation:

- Position limits (e.g., maximum $1,000 per contract per individual) to preserve information-aggregation value while limiting speculative excess.
- Mandatory cooling-off periods before elections (no new political contracts within 30 days of a relevant election).
- Prohibition on trading by individuals with material non-public information about the underlying event (extending existing insider trading rules with enforcement teeth).
- Mandatory public reporting of large positions.
- Dedicated funding for research into prediction market effects on democratic participation.

**Mechanism:** Amend the CEA to create a specific "democratic event contract" category with heightened regulatory requirements, or direct the CFTC to establish these protections via rulemaking.

### Tier 3 — Economic and data contracts

Contracts on economic indicators (inflation, employment data, GDP), weather events, commodity prices, and similar measurable phenomena most closely resemble traditional derivatives and should remain under CFTC jurisdiction with existing protections. These are the strongest case for prediction markets as information-aggregation tools.

### Tier 4 — Human harm events

Contracts that create profit incentives tied to human suffering — natural disasters, terrorist attacks, war casualties, pandemic metrics, criminal activity — should be prohibited outright. The information-aggregation argument is weakest here (other mechanisms, like insurance markets, already serve this function), and the perverse incentive structure is strongest.

**Mechanism:** Amend the CEA to add human harm events to the existing list of prohibited event categories (currently: "terrorism," "assassination," and "other similar activities" under 7 U.S.C. § 7a-2(c)(5)(C)).

### Cross-cutting requirements

Regardless of tier, all platforms offering event contracts to U.S. residents should be required to:

1. Implement responsible gambling protections (self-exclusion, deposit limits, mandatory disclosures).
2. Verify age (21+ for gambling-equivalent contracts).
3. Report suspicious trading activity to both the CFTC and relevant state authorities.
4. Contribute to problem gambling treatment and research funding (modeled on state gambling fund requirements).
5. Pay applicable state taxes when offering contracts functionally equivalent to gambling.

## Economic impact

The regulated gambling industry is a significant revenue source for state governments. The $15.91 billion in direct gaming taxes in 2024 funds education, infrastructure, and public services across 38 states. The prediction market tax gap — $620 million since early 2025 — is growing rapidly.

Bringing prediction markets into a coherent regulatory framework would close the tax gap (generating hundreds of millions in additional state revenue annually), level the competitive playing field for licensed operators who bear the full cost of regulation, extend consumer protections to millions of users currently unprotected, and preserve the legitimate information-aggregation value of well-designed prediction markets on economic and policy-relevant questions.

The cost is primarily to prediction market platforms, which would face increased compliance costs. This is appropriate — the current cost advantage of prediction markets over regulated sportsbooks is a subsidy produced by regulatory arbitrage, not by superior efficiency.

## Opposition analysis (steel-manned)

**"Prediction markets are financial instruments, not gambling."** This is a legal characterization, not an economic one. A contract that pays $1 if the Eagles win and $0 if they lose is, economically, a bet on the Eagles. The legal vehicle does not change the economic substance. The Howey test in securities law already establishes the principle that economic substance determines regulatory treatment. The Nevada court's distinction between an "event" (the Kentucky Derby) and an "outcome" (who wins) is linguistically interesting but economically meaningless.

**"Federal preemption simplifies regulation."** A single federal rulebook sounds efficient, but it eliminates state-level consumer protections developed over decades of gambling regulation. States like Nevada and New Jersey have sophisticated responsible gambling frameworks that the CFTC has no expertise to replicate. The argument for preemption is an argument for weaker consumer protection in the name of regulatory convenience.

**"Prediction markets produce valuable information."** Some do. Markets on elections, economic indicators, and policy outcomes have demonstrated information-aggregation value. But this doesn't extend to every possible contract category. A market on "which White House staffer will be fired next" doesn't produce socially valuable information — it produces entertainment. Regulation can distinguish between these categories.

**"Restricting prediction markets infringes free speech."** The First Amendment protects speech, not financial transactions. Gambling regulation has never been struck down on free speech grounds. The Supreme Court in *Posadas de Puerto Rico Associates v. Tourism Co. of Puerto Rico* (478 U.S. 328, 1986) upheld gambling advertising restrictions. The financial character of prediction market transactions distinguishes them from pure expression.

## Cross-project connections

- [Capitalism Game Maintenance](/paul/process/01-game-maintenance/) — the prediction market explosion is regulatory arbitrage, the same phenomenon the game-maintenance framework identifies as a system failure. When the rules allow one class of companies to offer identical services without bearing the costs that competitors must pay, the game is broken.
- [Corporations speak for money](/paul/policy/07-campaign-finance/) — prediction markets on political events create a new channel through which money can influence democratic outcomes, intersecting with the campaign finance challenge.
- [The American Experiment](/paul/process/02-american-experiment/) — the question of who regulates gambling — states or the federal government — is a live experiment in federalism that connects to the broader democratic governance questions.

## Find the flaw

If prediction markets on sports are economically identical to sports betting, then regulating them differently is regulatory arbitrage, not policy coherence. If they are not economically identical, explain the difference in terms of what the consumer is actually doing — putting money at risk on an uncertain outcome — rather than in terms of the legal instrument used.

Find the logical distinction. Not the legal one — the legal one is currently being litigated in a dozen courts. The logical one.

## References

- American Gaming Association. (2025). *State of the States 2025.*
- American Gaming Association. (2026). Commercial Gaming Revenue Tracker, March 2026.
- Arrow, K. J., et al. (2008). "The Promise of Prediction Markets." *Science,* 320(5878), 877–878.
- CFTC. (2026). Enforcement Division Advisory, February 25, 2026. Press Release 9185-26.
- CFTC. (2026). Chairman Michael Selig remarks, "Project Crypto" Summit, January 29, 2026.
- Commodity Exchange Act, 7 U.S.C. §§ 1–27f.
- ESPN. (2025). "U.S. sports betting industry posts record $13.7B revenue for '24."
- Gambling Insider. (2026). "Gambling Statistics 2026: Market Size, Addiction Rates & Trends."
- Holland & Knight. (2026). "Prediction Markets at a Crossroads," February 20, 2026.
- *KalshiEX LLC v. CFTC,* D.D.C. (2024).
- *Murphy v. NCAA,* 584 U.S. ___ (2018).
- National Council on Problem Gambling. (2024). Problem gambling prevalence estimates.
- NPR. (2026). "Trump administration sues three states over attempts to regulate prediction markets," April 2, 2026.
- *Posadas de Puerto Rico Associates v. Tourism Co. of Puerto Rico,* 478 U.S. 328 (1986).
- Senators Curtis & Schiff. (2026). "The Prediction Markets Are Gambling Act," introduced March 23, 2026.
- Sidley Austin. (2026). "U.S. CFTC Signals Imminent Rulemaking on Prediction Markets," February 13, 2026.
- Womble Bond Dickinson. (2026). "Update on Prediction Markets," April 1, 2026.

{% include "partials/page-meta.njk" %}
