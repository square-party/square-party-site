---
layout: base.njk
title: Capitalism as a Game That Can Be Won
description: Rule design that keeps markets competitive — the "game maintenance" framework. Transparency, competition preservation, and dynamic balancing applied to wealth and market concentration.
state: drafting
order: 1
updated: 2026-04-26
---

# Idea 1 — Capitalism as a Game That Can Be Won

<p class="domain-lead">Capitalism is a game that can be won. Not "capitalism is unfair" — that's a moral debate. Not "capitalism is broken" — that's a systems argument. Just this: the system, as currently structured, allows a player to accumulate enough wealth, market power, and political influence to exit the competitive dynamics that make the system work. Once that happens, the engine that drives capitalism's value proposition — competition, price discovery, creative destruction — slows down. The proposal here is a framework called <strong>game maintenance</strong>: the same kind of ongoing competitive-balance design that every successful league, tournament, and market already uses, applied to the actual rules of the economy.</p>

<aside class="status-callout">
This proposal sits at the boundary between Paul-level policy work and Square Party-level framework. The substance below is the policy version. The wider movement-launch strategy lives in a separate working document and may eventually live at the Square Party level rather than under Paul's proposals. For now, treat this page as the policy-mechanism layer.
</aside>

## The premise

What happens when someone wins Monopoly? The board gets flipped. The game stops being fun. Not because of some moral injustice — because the mechanics broke. One player accumulated so much that everyone else was just going through the motions.

The same dynamic operates in real markets, with the same root cause. A player accumulates enough that the things that normally check accumulation (price competition, new entrants, regulatory pushback) stop functioning. They've exited the game. And when one player exits the game from the top, the game stops being a game.

This isn't a moral claim. It's a mechanical one. Capitalism's entire value proposition is competition: many players, price discovery, creative destruction, the constant pressure to innovate. That engine requires the game to be playable. When it isn't — when outcomes are predetermined, when new entrants can't enter, when one player controls the board — competition stops. And without competition, capitalism stops being capitalism.

The solution isn't to abolish the game. It's to maintain it.

## The framework: game maintenance

Every well-designed competitive system in history builds in mechanisms that keep competition functional. The NFL has a salary cap and revenue sharing — the league with the most aggressive competitive-balance rules is also the most profitable league in American sports. Chess uses Elo ratings and tournament seeding to keep matchups meaningful. Video games ship balance patches. Standardized testing recalibrates scoring curves. None of these mechanisms are anti-game. **They are the game.**

Game maintenance applied to capitalism is the same idea: a continuous, evidence-based process of rule adjustment to keep the market functioning as a market. Three categories of mechanism, in increasing order of friction:

### Tier 1 — Transparency (lowest friction)

Visibility doesn't restrict the game; it lets you see the score. Without it, no other intervention has a basis.

- **Full lobbying disclosure** — building on STOCK Act and Lobbying Disclosure Act precedents.
- **Beneficial ownership registries** — building on the Corporate Transparency Act (2024); piercing the shell company veil.
- **Algorithmic accountability** — disclosure of decisive algorithms in lending, hiring, pricing, and content distribution; modeled in part on the EU AI Act.
- **Game-health reporting** — concentration metrics published alongside GDP in standard economic reporting. (See "Game health metrics" below.)

These have the strongest legal and political footing of the three tiers. The *Citizens United* majority explicitly endorsed disclosure as a constitutionally-blessed counterweight, and disclosure-based reform polls 80%+ across the ideological spectrum.

### Tier 2 — Competition preservation (medium friction)

The set of policies that keep new entrants able to enter and existing competitors able to compete.

- **Platform interoperability mandates** — building on the proposed ACCESS Act and the EU Digital Markets Act. Allows new entrants to plug into network effects rather than rebuild them.
- **Data portability requirements** — building on GDPR Article 20. Reduces switching costs.
- **Strengthened acquisition scrutiny** — particularly for serial acquisitions of nascent competitors ("buying the draft class" in game-maintenance shorthand). Builds on existing FTC/DOJ merger guidelines with sharper triggers when concentration is already high.
- **Standards and protocols as public infrastructure** — recognition that some interfaces (payment rails, identity, basic interconnection) function as public goods that lose their public character when captured.

### Tier 3 — Dynamic balancing (higher friction, requires new architecture)

Mechanisms that adjust automatically as concentration rises — analogous to the salary cap that recalibrates each year based on league-wide revenue.

- **Concentration-indexed corporate tax** — pilot at the state level. Marginal rates that scale with the firm's share of its market, not just with profit.
- **Automatic antitrust review triggers** — when concentration metrics in a sector cross thresholds, scrutiny tightens without needing political will to initiate.
- **Game health reporting requirements** — composite indices of market concentration, mobility, and dynamism, published quarterly. Forces the question "is the game still playable?" into routine economic discourse.

Tier 3 is the most novel and the most politically demanding. It is also the most resilient: once the thermostat is in place, partisan oscillation matters less than the underlying metrics.

## The empirical case

<aside class="layered-section layered-section--light" aria-label="Related visualization">
<h3 style="margin-top:0">See it at scale</h3>
<p>The standard income visualizations — pie charts, quintile bars, bell curves — fail at the one thing they need to do: convey the magnitude of the gap between the median household and the top of the distribution. Three concepts that try to fix that, with the linear-vs-log axis question made explicit:</p>
<p><strong><a href="/income-viz/">What happens when one player wins? — three concepts for visualizing income at scale →</a></strong></p>
</aside>

The framework is meant to be tested against data. Some of the relevant series, with sources:

- **Wealth concentration.** ITEP's 7th-edition *Who Pays?* (January 2024) ranked Pennsylvania as the 4th most regressive state and local tax system in the country; the lowest-income 20% of households pay 15.1% of income in combined state and local taxes. The Federal Reserve's Distributional Financial Accounts (quarterly) and the World Inequality Database (Chancel et al., 2026) track the long-run trajectory.
- **Market concentration.** RBC Wealth Management (2026) reported the S&P 500 top-10 share at 40.7% — "The Great Narrowing." J.P. Morgan Global Research (2026) describes the dynamic as "winner-takes-all." ITIF (2025) provides a competing read using Economic Census C4 ratios (2002–2022) that questions some of the headline narrative.
- **Business dynamism.** U.S. Census Bureau Business Formation Statistics show ~430K applications/month in 2024 vs. ~287K in 2019 — a real uptick. Business Dynamics Statistics (1978–2023) show longer-run decline in firm entry rates that the recent uptick may or may not reverse.
- **Social mobility.** Chetty et al. (2017) found that 92% of the 1940 birth cohort exceeded their parents' income; only ~50% of the 1980s cohort did. The Great Gatsby Curve (Corak, 2013) connects intergenerational mobility to inequality across countries.
- **Sports balance as analogy.** NFL revenue sharing distributes ~$400M/team; the salary cap exceeded $300M in 2026. Larsen et al. (2006) documented the cap's measurable effect on competitive balance. Rottenberg's 1956 *Journal of Political Economy* article (the Invariance Principle) established the underlying theory.

These are starting points. The point of game-health metrics is that they should be publicly reported and routinely contested.

## Game health metrics

A composite index, modeled on existing economic indicators (GDP, unemployment, CPI), built from components that are already measured separately:

| Component | Existing source |
|---|---|
| Wealth concentration (top 1% share) | Federal Reserve, Distributional Financial Accounts |
| Market concentration (revenue-weighted HHI) | Census Economic Census; SEC filings |
| Firm entry rate | Census Business Formation Statistics |
| Firm exit rate | BLS Business Employment Dynamics |
| Intergenerational mobility | Opportunity Atlas (Chetty et al.) |
| Top-firm political spending share | OpenSecrets; FEC filings |

Weighted into a single index. Reported quarterly. Visible. Contested.

The argument for a composite index is the same as the argument for GDP: imperfect aggregate measures focus attention better than no aggregate measure. The argument against is the same as the argument against GDP: an aggregate hides distributional and qualitative information. Both arguments are correct; the composite should be reported alongside its components, never instead of them.

## Opposition analysis (steel-manned)

**"This is just disguised central planning."** It isn't, but the concern is legitimate. The game-maintenance framework is closer to *competition law* than to *industrial policy.* It doesn't pick winners or set output targets. It adjusts the rules so that markets continue to function as markets. The closest analogy is the salary cap, not five-year planning. Where the framework leans toward intervention, it does so against concentration — which is itself a form of central control, just one that emerged through accumulation rather than legislation.

**"Concentration is the natural reward for excellence."** Sometimes. Sometimes it's the natural result of network effects, regulatory capture, acquired monopolistic positions, or first-mover advantages compounded by policy. The framework doesn't argue against accumulation per se. It argues that when accumulation reaches levels that prevent the system from functioning as a system, the rules need to adjust. The NFL doesn't deny that some teams are better; it adjusts the rules so that better doesn't become permanent dominance.

**"Markets self-correct over time."** Some markets do. Others don't. Network-effect markets and resource-bound markets often don't. The history of antitrust law is the history of recognizing which markets need help to self-correct.

**"This will be captured by whichever party controls the metrics."** True risk. The mitigation is to make the metrics open, the methodology public, and the components reportable separately. The composite index can be politically captured; the underlying series (Federal Reserve data, Census data, etc.) are harder to capture without breaking the broader statistical infrastructure that everyone relies on.

## Cross-project connections

- [Corporations speak for money](/paul/policy/07-campaign-finance/) — concentrated political spending is one mechanism by which winners of the economic game capture the rule-making process. Game maintenance and campaign-finance reform reinforce each other; neither works alone.
- [Gambling Regulation](/paul/policy/02-gambling-regulation/) — illustrates the same dynamic in a more specific setting. Concentrated industry shapes the rules of its own market.
- [The American Experiment](/ideas/02-american-experiment/) — declining trust in institutions is partly downstream of the perception (often correct) that the game has been won. Restoring competitive dynamics is one route to restoring institutional credibility.

## Find the flaw

The most pro-capitalist thing you can do is keep the game playable. Not because winning is bad. Because a dead game serves no one — including the winner.

If the framework is wrong, where does it break? The candidate weak points: concentration is harder to measure than this paper assumes; political capture of the metrics is more likely than this paper credits; some of the proposed mechanisms (especially Tier 3) have no successful precedent and may behave unpredictably. The framework is meant to be argued with. Find the part of the logic that breaks.

## References

- Acemoglu, D. & Robinson, J. (2012). *Why Nations Fail.* Crown.
- Bye, B., Kvaerner, K., & Werker, E. (2026). "Magnificent, but Not Extraordinary." Working paper, Tilburg University.
- Carse, J. (1986). *Finite and Infinite Games.* Free Press.
- Chancel, L. et al. (2026). *World Inequality Report 2026.*
- Chetty, R., Grusky, D., et al. (2017). "The Fading American Dream: Trends in Absolute Income Mobility Since 1940." *Science,* 356(6336), 398–406.
- Chetty, R., Hendren, N., Kline, P., & Saez, E. (2014). "Where Is the Land of Opportunity?" *Quarterly Journal of Economics,* 129(4), 1553–1623.
- Corak, M. (2013). "Income Inequality, Equality of Opportunity, and Intergenerational Mobility." *Journal of Economic Perspectives,* 27(3), 79–102.
- Economic Innovation Group (2025). "The Year in Business Dynamism."
- ITEP (2024). *Who Pays? A Distributional Analysis of the Tax Systems in All 50 States* (7th edition).
- ITIF (2025). "Still Insignificant: An Update on Concentration in the US Economy."
- J.P. Morgan Global Research (2026). Market Outlook.
- Larsen, A., et al. (2006). "Salary caps and competitive balance in the NFL." *Journal for Economic Educators.*
- Mazumder, B. (2005). "Fortunate Sons." *Review of Economics and Statistics,* 87(2), 235–255.
- Oxfam (2026). "Resisting the Rule of the Rich." Davos Report.
- RBC Wealth Management (2026). "The Great Narrowing: S&P 500 Concentration."
- Roth, A. (2002). "The Economist as Engineer." *Econometrica,* 70(4), 1341–1378.
- Rottenberg, S. (1956). "The Baseball Players' Labor Market." *Journal of Political Economy,* 64(3), 242–258.
- U.S. Census Bureau, Business Formation Statistics (monthly).
- U.S. Census Bureau, Business Dynamics Statistics (annual, 1978–2023).

---

*This is the v1 web version of the Project 2 draft (April 2026), adapted from the comprehensive plan and core-premise documents. The launch-strategy material in those documents is not reproduced here.*

{% include "partials/page-meta.njk" %}
