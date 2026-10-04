# Growth Bottleneck Sprint page

## Routes and preservation

- `/consulting/` is the focused offer page.
- `/consulting-archive/` retains the previous page and every original section/component. Its only page-level change is an archive title and `noindex, follow` metadata.
- The old `/consulting/#philosophy`, `#capabilities` and `#channels` bookmarks redirect to their archived sections, preserving query parameters. Existing `#top`, `#work` and `#contact` targets remain meaningful on the offer page.
- The profile retains its four brief proof cards and `case-study-01` through `case-study-04` IDs. Its case-study previews now link into the full `/case-studies/` library. Consulting proof links use that same registry to reach the matching study; "See all case studies" opens the library.

## Existing design system

Reuses Layout, Nav, Footer, Inter, the 1280px wrap, responsive gutters, dark surfaces, warm off-white type, ember orange buttons and hairline borders. The Sprint's paper section borrows the homepage profile's cream/ink palette. Buttons retain hover/focus states. FAQ uses native details/summary and works without JavaScript. The offer page adds no dependencies, tracking provider or scroll animation.

## Offer and links

The user supplied the $2,500 fixed, two-week Sprint scope and optional separately scoped implementation. All proof figures come from `src/data/results.ts`; past audience results are not presented as Sprint client results.

Booking uses `fitCallUrl` from `src/data/consulting.ts`: `https://calendly.com/miningspartan2/1-hour-consulting`. After the owner updated the event on October 3, browser inspection confirmed "20 Minute Consulting", a 20-minute duration and available dates. Calendly retains the old URL slug. The header, hero and final Fit Call actions link directly to this verified event, skipping the general scheduling page.

The approved `growth_bottleneck_sprint_offer_v6_final.pdf` supplies the text and design of `public/growth-bottleneck-sprint.pdf`. On October 4, an invisible link annotation was added over its yellow booking button, pointing to the existing direct Fit Call event. Page content, text and rendered appearance are unchanged. The hero and final secondary actions open `/offer/` in the same tab. That page follows the résumé preview pattern, with explicit site navigation, an optimized preview of the exact PDF, Open PDF, Download PDF and a direct Fit Call action. Opening the PDF is an explicit choice. There is no offer popup or required offer step before booking. The offer PDF is a separate asset from the unchanged career résumé.

The approved v6 document is the source for the product, price, two-week timeline, four deliverables and separately scoped implementation. Existing web detail is retained where it preserves that meaning. The process wording and scope line match v6. Shared `sprintOffer` data supplies the name, CTA wording and `$2,500 · 2 weeks` line used in the profile and consulting hero.

On October 4, `/offer/` gained a mobile reading layout (700px and below): real text for the full approved offer, vertically stacked deliverables and pricing, and direct Fit Call buttons near the beginning and end. Mobile visitors do not need to open or zoom a PDF to read or book. The desktop preview remains the exact PDF image, with a separate accessible booking link positioned over the pictured bottom CTA; the rest of the preview opens the PDF. Open PDF and Download remain available at every width. The downloadable offer PDF and résumé are unchanged by this mobile revision.

## Preview and validation

The consulting page also welcomes launch and early audience/community work, scoped on the Fit Call. Its fit section explicitly describes the Growth Bottleneck Sprint rather than Ethan's overall consulting capabilities. The starting-from-zero FAQ cites the existing Yamikaze second-channel result (0 to 50K subscribers) and explains that the Sprint needs real audience/customer signal, while launch work is scoped around the client's stage. The approved Sprint PDF and its product scope are unchanged.

From this repository, run `npm run dev -- --host 127.0.0.1 --port 4321`. Open `http://127.0.0.1:4321/consulting/`; the preserved page is at `/consulting-archive/`.

Run `npm run build` and `git diff --check`. Verify desktop/mobile layouts, booking destinations, FAQ keyboard interaction, case-study landing targets and legacy bookmarks. Publishing requires the normal GitHub main push and Cloudflare Pages route checks.

The initial page revision passed the production build and whitespace checks. Browser checks covered 320px, 390px, 820px and 1366px layouts without horizontal overflow, native FAQ keyboard opening, the original Calendly destination, a proof-card landing on the matching profile article, and the archive metadata and legacy redirect. Subsequent revisions add the PDF and direct event link described above. Published October 3, 2026 through GitHub main to Cloudflare Pages, feature release `5774359`.

The subsequent case-study library revision changes proof-card destinations from profile articles to the corresponding library studies. The consulting scope, pricing and booking destination remain intact.

Phase 3 validation passes the production build and whitespace check, all 95 internal links across seven routes, exact offer PDF serving with `application/pdf`, and byte comparisons preserving the supplied offer and original résumé assets. Browser checks verify the same-tab offer journey, explicit mobile return navigation, 320px and 390px layouts and study jumps below the taller mobile header. Live checks verify all seven routes, both PDFs and the consulting booking/offer destinations.
