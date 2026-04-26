---
layout: empower.njk
title: PA-3 Parks & Open Space Map
description: An interactive descriptive map of every park, recreation center, pool, playground, trail, and community garden in Pennsylvania's 3rd Congressional District (plus a 2-mile buffer).
saveable: true
savedContext: "Empower · PA-3 reference"
breadcrumbExtras:
  - { label: "Reference", href: "/paul/campaign/empower/parks/" }
updated: 2026-04-26
---

# PA-3 Parks & Open Space

<p class="domain-lead">A descriptive map of every park, recreation center, pool, playground, trail, and community garden inside PA-3 — plus the 2-mile buffer around the district, since people who live near the edge cross it for these facilities all the time. Data is fetched live from <a href="https://opendataphilly.org/">OpenDataPhilly</a> each time the map opens, so what you see is what the city is publishing today. Click any marker for the facility's name, address, sub-area, acreage, PPR use type, and Friends-group status.</p>

<div class="map-frame-wrap">
<iframe src="/assets/maps/pa3-parks-map.html" title="PA-3 Parks & Open Space Map" class="map-frame" width="100%" height="600" loading="eager" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
<p class="map-frame__hint"><a href="/assets/maps/pa3-parks-map.html" target="_blank" rel="noopener">Open the map fullscreen ↗</a> · Toggle categories from the legend · First open can take a few seconds while live data loads</p>
</div>

## What's on the map

Markers are color-coded by facility type. Categories are derived from the PPR `ppr_use` field with `property_classification` as a tiebreaker:

- **Parks** — neighborhood parks, regional parks, nature areas, watershed parks
- **Recreation centers** — recreation sites and Older Adult Centers
- **Pools** — swimming pools and spraygrounds
- **Playgrounds** — anything named "...Playground" (the name overrides `ppr_use`, since PPR classifies many name-titled playgrounds as recreation sites because PPR programs them)
- **Squares & plazas**
- **Greenways** — pathways, named greenways
- **Gardens** — community gardens
- **Trails** — line segments from the PPR Trails dataset
- **Other** — anything that didn't classify cleanly

Click any legend item to toggle that category on or off.

## Sub-areas

Each facility is tagged with a rough sub-area for navigation — Northwest (East Falls / Manayunk), North/Northwest Core (Strawberry Mansion, Sharswood, North Central), South/Southwest (Kingsessing, Eastwick, South Philly portion), and West Philadelphia Core (Mantua, Powelton, Cedar Park, etc.). Sub-area assignment is approximate (lat/lng heuristic) and meant as a navigation aid, not as a measurement. A future version will do point-in-polygon against neighborhood polygons for precision.

## Inclusion zone

The map draws the PA-3 boundary as a bold navy outline. The actual inclusion zone for facilities is **PA-3 plus a 2-mile (3.2 km) buffer**. Facilities outside the district but inside the buffer are styled identically to in-district ones — the navy outline is the only visual cue distinguishing them. This is intentional. People who live near the edge of the district routinely cross the line for parks, pools, and rec centers, and a strict in-boundary cut would hide nearby options.

## Data sources

All facility data is from the City of Philadelphia via OpenDataPhilly:

- [PPR Properties](https://opendataphilly.org/datasets/ppr-properties/) — master inventory of PPR-managed properties
- [PPR Playgrounds](https://opendataphilly.org/datasets/ppr-playgrounds/)
- [PPR Swimming Pools](https://opendataphilly.org/datasets/ppr-swimming-pools/)
- [PPR Spraygrounds](https://opendataphilly.org/datasets/ppr-spraygrounds/)
- [PPR Trails](https://opendataphilly.org/datasets/parks-and-recreation-ppr-trails/)
- [PPR Friends Groups](https://opendataphilly.org/datasets/ppr-friends-group/)
- [PPR Program Sites](https://opendataphilly.org/datasets/parks-recreation-program-sites/)

PA-3 boundary: [JeffreyBLewis/congressional-district-boundaries](https://github.com/JeffreyBLewis/congressional-district-boundaries) v2.0.0 (Nov 2025), using US Census TIGER 2024 shapes for the 119th Congress (Jan 2025 – Jan 2027).

## Known limitations

- **Live fetch can be slow on first open.** The largest single dataset (PPR Properties with full polygon geometry) is ~10 MB. Most fetches finish in a few seconds; on slow connections the loading overlay may be visible for 10–20 seconds.
- **Some fields are sparse.** Hours of operation, phone numbers, and amenities aren't in the PPR Properties dataset. When a field is empty, the popup shows "Information not in source data" rather than guessing. Hours and amenity details live on individual phila.gov/parks facility pages.
- **Friends-group join is name-based.** Mismatched names (e.g. "FDR Park" vs "Franklin Delano Roosevelt Park") can miss associations.
- **Trails are line segments.** Continuous trails like the Schuylkill River Trail appear as multiple distinct popups rather than one named route.
- **Privately operated greenspace** (Bartram's Garden, Laurel Hill Cemetery, etc.) isn't included. The PPR Properties dataset is PPR-managed only. Future versions could overlay these from separate datasets.

## Why this is here

This is a reference asset for the empower project. Several domains use it directly — environment & natural resources, public health, social welfare, physical infrastructure — and contributors writing those domain analyses can pull from it. The map is also a small proof of the project's broader thesis: most of what citizens need to engage meaningfully with a domain is already public data; the missing piece is the analytical layer that turns it into something usable.

If you spot facilities that look misclassified, missing, or wrongly placed, the source data is the place to fix it — both PPR's own records and the OpenDataPhilly publications. The map updates automatically when those upstream sources do.

{% include "partials/page-meta.njk" %}
