# Sales funnel audit — October 3, 2026

## Status

Published October 3, 2026 through GitHub main to `https://syfer-media.pages.dev`. Feature release: `5774359`. Local preview origin: `http://127.0.0.1:4321`.

## Page roles and visitor paths

1. **Profile (`/`, `/sf-tech-week/`) — introduction and credibility.** Selected projects and four brief proof cards link to the detailed Case Studies library. The final primary action is Explore the Growth Bottleneck Sprint, followed by `$2,500 · 2 weeks`. Career and networking remain quieter alternatives: View my résumé and Start a conversation. The existing dismissible résumé prompt is retained.
2. **Case Studies (`/case-studies/`) — detailed proof.** Seven projects: Tansavatdi, Yamikaze, MMA, Yozu, MemesBreakcore, Syfer Music/Silver Skies, and an anonymized content-intelligence project. Centerfield and prediction markets are excluded. Direct study links open the selected contribution section. The page routes into consulting and provides explicit profile/résumé navigation, including visible links at the top on phones.
3. **Consulting (`/consulting/`) — sell the Sprint.** Problem → process → focused scope → four deliverables → fit → compact proof → optional implementation → pricing → FAQ → Fit Call. Three compact examples link to their matching library studies. The primary action is Book a Free 20-Minute Fit Call. The secondary action is View the One-Page Offer.
4. **One-page offer (`/offer/`) — concise, forwardable explanation.** Opens inside the site in the same tab, using the résumé page's preview pattern. Provides Back to consulting, Profile and Case Studies navigation; the actual approved document preview; Open PDF; Download PDF; and a direct Fit Call action. Viewing it is optional before booking.
5. **Résumé (`/resume`) — career overview.** Existing October résumé preview and original PDF remain unchanged. Navigation reaches profile, Case Studies and consulting.
6. **Booking — external Calendly event.** `https://calendly.com/miningspartan2/1-hour-consulting` is the actual verified event URL. The owner changed the event to 20 minutes; its old slug remains. Browser inspection shows “20 Minute Consulting”, a 20-minute duration and available dates. The website's Fit Call actions go directly to this event.
7. **Archive (`/consulting-archive/`) — preserved historical page.** Retained with `noindex, follow`, outside the active funnel. Legacy consulting section links still route into the archive.

## Main commercial sequence

```text
Tech Week / LinkedIn / referral
             ↓
       Homepage profile
       ↙       ↓       ↘
   Résumé  Case Studies  Consulting
   career      proof       offer
                 ↘          ↓
                  Consulting
                      ↓
          Free 20-minute Fit Call
                      ↓
          $2,500 · 2-week Sprint
                      ↓
   Optional first test — scoped separately
                      ↓
              Next decision

Optional supporting path:
Consulting → One-page offer → Fit Call
                    ↘ Open / download PDF
```

The website routes visitors to booking. Sprint purchase, test execution and next-decision delivery are service steps, not automated checkout or fulfillment implemented by this site.

## Offer consistency

- Product: Growth Bottleneck Sprint.
- Price and timeline: $2,500 · 2 weeks.
- Scope: one business goal, one customer journey, relevant data + access.
- Deliverables: bottleneck diagnosis, prioritized action plan, first test brief, final walkthrough.
- Implementation: optional, scoped and priced separately after diagnosis; no ongoing engagement required.
- Approved v6 PDF copied unchanged; no new offer popup or mandatory PDF gate.
- Homepage and consulting share the offer configuration. Proof figures and destinations use shared data registries.

## Verification

- Production build: PASS, seven routes generated.
- Internal route/hash audit: PASS, 95 destinations checked.
- Offer navigation: PASS, consulting secondary actions open `/offer/` in the same tab.
- PDF delivery: PASS, HTTP 200 and `application/pdf`; exact owner-supplied bytes.
- Résumé preservation: PASS, original PDF and preview match committed files byte for byte.
- Mobile navigation: PASS, explicit return links and no horizontal overflow at 320px and 390px.
- Desktop offer: PASS, document preview loads at 1366px.
- Study anchors: PASS, selected contribution section opens below the mobile sticky header.
- Calendly: event duration and available dates verified; no appointment submitted.
- Whitespace check: PASS. Existing Astro content-collection deprecation warning remains.

## Practical limits

- Live checks pass: all seven routes return HTTP 200 with the expected new content; both PDFs return HTTP 200 as `application/pdf` and match the repository files exactly. The live consulting page uses the direct booking event and `/offer/` destinations.
- The approved original PDF has no embedded hyperlinks, including its printed booking button. Site booking buttons are linked; the PDF itself is preserved unchanged.
- Existing `data-funnel-action` attributes identify key actions, but no new analytics provider or conversion dashboard has been added. This audit verifies navigation and layout, not conversion lift.
