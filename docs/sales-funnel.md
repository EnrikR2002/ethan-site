# Phase 3: final sales funnel

## Visitor journey

- Tech Week, LinkedIn and referrals → `/` or `/sf-tech-week/`: profile and selected proof.
- Career → `/resume` → original October résumé PDF.
- Proof → `/case-studies/`: seven detailed studies; Centerfield and prediction markets excluded.
- Consulting → `/consulting/`: Growth Bottleneck Sprint, $2,500 · 2 weeks.
- Primary consulting action → verified 20-minute Calendly event.
- Secondary consulting action → `/offer/`, a site page showing the approved v6 PDF with navigation, zoom/open, download and a Fit Call action.
- Free Fit Call → Sprint → optional separately scoped first-test implementation → next decision.

## Hierarchy and preservation

The homepage's final primary action is Explore the Growth Bottleneck Sprint, with résumé and direct conversation as quieter alternatives. Case Studies remains reachable from the header and brief proof section, without competing in the final CTA. The existing résumé prompt is retained; no offer popup is added.

Consulting keeps three compact proof previews linking to matching library studies, plus the full-library link. The complete detailed proof lives in Case Studies. The archived original consulting page remains available at `/consulting-archive/`; its original case-study records are retained.

Consulting and Case Studies share footer navigation to profile, proof, consulting and résumé. On phones, Case Studies also shows Back to profile and Résumé below the main header; consulting shows Profile, Case studies and Résumé. These paths remain visible when desktop header links collapse. Study jumps account for the taller header. The résumé keeps its career purpose and original PDF; its existing navigation reaches profile, proof and consulting.

## Shared configuration

`src/data/consulting.ts` supplies the offer name, price/timeline line, Fit Call label, verified event URL, offer page URL and actual PDF URL. `OfferActions.astro` renders the primary/secondary pair at the consulting hero and final section. Native anchor links keep offer access and booking independent of JavaScript. Project metrics and study destinations use the existing shared registries.

The exact v6 source was copied without editing. Its original PDF contains no clickable link annotations; the site's secondary actions open the actual PDF, while website booking remains the primary route.

Published October 3, 2026 through GitHub main to `https://syfer-media.pages.dev` (feature release `5774359`). All seven live routes and both exact PDF assets are verified.

## Verified checks

- Production build: seven routes pass; existing Astro content-collection deprecation warning remains.
- Internal route/hash audit: 95 destinations pass.
- Offer links from consulting: same-tab `/offer/`, verified by clicking the secondary action.
- PDF endpoint: HTTP 200, `application/pdf`, exact bytes of the owner-supplied v6 asset.
- Résumé PDF and preview: byte-identical to committed versions.
- Booking: Calendly event shows 20 minutes and available dates; no appointment submitted.
- Responsive checks: new offer and navigation fit at 320px/390px; desktop offer preview checked at 1366px.
- Case-study jump: selected contribution section opens, with the study top below the mobile sticky header.
