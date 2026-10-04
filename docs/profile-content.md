# Profile and consulting content

## Routes

- `/`: personal introduction, conversation topics, selected projects, four case-study previews linking into the full library, then the consulting invitation.
- `/case-studies`: seven project studies with original artwork, historical metrics and expandable contribution sections. Individual links open the matching contribution section.
- `/consulting`: Growth Bottleneck Sprint offer, with compact proof linking into the full case-study library.
- `/consulting-archive`: preserved consulting portfolio, excluded from search indexing.
- `/sf-tech-week`: shared profile with event context, suitable for an event link or QR code. It does not claim attendance or a speaking role.
- `/resume`: faithful page preview of the supplied corrected October 2026 PDF, with a direct link to the same file. The one-time prompt appears when the profile footer enters view; a persistent résumé link remains next to the consulting action.
- Original homepage hashes redirect to consulting, retaining query parameters. Retired sections (`#philosophy`, `#capabilities`, `#channels`) continue to their preserved consulting archive targets; `#top`, `#work` and `#contact` remain on the current consulting page.

## Editorial source and arithmetic

The owner initially selected **Ethan Alfandary Resume Aug 2026.docx** as the primary source, then supplied **Ethan Alfandary Resume Oct 2026 corrected for website.pdf** as the default public resume. The October version corrects Tansavatdi Instagram followers to 41K and growth to 215%. The older CV supplies personal conversation topics only. Devin Nash's profile provides a structural reference, not credentials or claims.

Historical project figures live in `src/data/results.ts`. They are resume-reported results through August 2026, with the owner's October Instagram correction, not live channel counts. Projects may overlap; the 200M+ headline is the resume's own summary, not a sum of project totals.

| Metric | Published | Basis |
| --- | --- | --- |
| Tansavatdi YouTube | 8K → 62K, 675% growth, 32M+ views | August resume |
| Tansavatdi Instagram | 13K → 41K, approximately 215% growth | Corrected October resume; (41 − 13) / 13 × 100 = 215.38% |
| Yozu | 17K → 82K+, 40M+ views, $45K+ revenue | August resume |
| Yozu growth | +195% views, +73% revenue | Resume-reported increases; no comparison period supplied, so no period is invented |
| MMA | 10K → 67K, 570% growth, 120M+ views | August resume |
| Yamikaze | 63K → 360K, approximately 471% growth, 45M+ views | August resume, rounded growth |
| Breakcore | 150K → 330K, 120% growth | August resume |
| Music | 104K subscribers, 54M+ views, 100+ artists, 250+ releases, 2K Discord community | August resume |

The awards image is an existing site asset. A portrait can replace it when supplied. Personal phone numbers, document downloads and unsupported revenue/profit claims are not part of the profile.

The owner subsequently specified that Breakcore's 150K → 330K X growth took 11 months and supplied 45K+ Instagram followers, 24K Reddit subscribers, and 4,200+ Spotify playlist saves. These owner-supplied figures appear in the personal profile. The public Reddit page returned a lower count in an older indexed view; the 24K figure is owner-supplied.

The corrected October PDF is copied unchanged and its page preview is rendered from that exact file. Both use the stable public download URL `/ethan-alfandary-resume.pdf`. The August PDF is no longer the default public asset; its previous version remains available in Git history. The new PDF retains the owner-supplied phone number and Benny project, uses singular physician wording, and lists Syfer Media from August 2019 as supplied by the owner.

The owner updated current interests to boxing rather than rugby and supplied a Taekwondo black belt achievement. The personal note distinguishes current interests from being a former rugby player.

## Measurement

The shared profile prevents event and homepage content from drifting. `data-funnel-action="consulting"` identifies the main handoff for a future analytics integration. No analytics provider or tracking transmission has been added. Track profile visits, consulting clicks and completed bookings separately when measurement is connected.

The final profile CTA now leads with "Have something that should be growing faster?" and the owner's supplied bottleneck copy. Its primary action is "Explore the Growth Bottleneck Sprint" to `/consulting/`, with `$2,500 fixed · 2 weeks` directly below it. `/resume` and the existing email destination remain secondary options. This same component serves `/sf-tech-week/`.

The profile keeps four short proof cards, with previews and links from `src/data/case-studies.ts`. Its header and "View all case studies" link open `/case-studies/`. Detailed project information lives in the library, while the existing `case-study-01` through `case-study-04` profile anchors continue to work. The résumé page has a library navigation link; the PDF and preview image are unchanged.

The existing footer-triggered, once-per-session résumé prompt changes only its headline to "Want the full picture?" Its overview copy, résumé link, design, session behavior, close button and "Keep exploring" action remain intact. No offer PDF link is added to the profile.

Homepage funnel verification on October 3, 2026: the primary action reaches the Sprint page directly; `/resume` and the PDF both return HTTP 200, with `application/pdf` for the original file; the conversation action retains `mailto:Ethan.alfandary@gmail.com`. Desktop (1366px), tablet (820px), mobile (390px) and narrow phone (320px) checks found no horizontal overflow. All three final CTA links have at least 44px target height. The prompt appears at the footer on a fresh visit; Escape, the close button and "Keep exploring" dismiss it, and it remains dismissed on reload in the same session. The existing popup close and secondary button targets are smaller than 44px and intentionally retain their styling under the owner's copy-only instruction. The booking page still lists only "1 Hour Consulting"; a free 20-minute Fit Call event remains a launch dependency as documented in `consulting-offer.md`.

## Local preview

Run `npm run dev -- --host 127.0.0.1` in this repository. Production build: `npm run build`. Publication is a separate GitHub push/deployment step.
