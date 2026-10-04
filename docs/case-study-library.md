# Case-study library

## Scope

`/case-studies/` contains seven projects, in this order:

1. Tansavatdi Facial Plastic Surgery
2. Yamikaze & YamikazeXZ
3. MMA / Adam YT / Martial Arts Virtue
4. Yozu & Yozu Lux
5. MemesBreakcore
6. Syfer Music & Silver Skies Records
7. An anonymized media-client content-intelligence project

The owner explicitly excluded Centerfield and the prediction-market project from this page. The media client's name is omitted. Syfer Media is the umbrella business, not a second case study repeating its clients' results.

## Content and sources

`src/data/case-studies.ts` owns the library's copy, order, contribution lists, artwork treatment and stable destinations. `src/data/results.ts` supplies the metrics shared with the profile and consulting page. The anonymized research scope (90+ videos) comes from the corrected October résumé; it is a scope metric, not a fabricated performance result.

The existing August figures, owner's corrected October Instagram count, MemesBreakcore platform figures and 11-month growth period are retained. Yozu's reported view and revenue increases retain no invented comparison period. No metrics are summed into a new aggregate. The physician/staff training description follows the owner's approved practice wording and stays singular.

The four legacy case-study records remain separate and retain their exact rendered content, preserving the archived consulting page. The résumé PDF and preview image are not edited.

## Layout and behavior

Reuses Inter, the site's dark palette, orange accents, Layout, Nav, Footer and responsive wrap. Tansavatdi is the paper-colored featured study. The remaining studies form a two-column desktop/tablet layout and a single column on phones. The original artwork and source-avatar crops supply project visuals; screenshot chrome and older screenshot counts are not displayed.

Native details/summary controls expand each contribution list, with at least 44px targets and keyboard support. Direct links and the project index open the selected study's contribution section. Without JavaScript, the anchors and native controls remain usable. The index updates `aria-current` for the selected project. No new dependencies, tracking provider or reveal animations are introduced.

The header and final action lead into `/consulting/`. Résumé, profile and direct-conversation destinations remain available. Profile cards now use shorter registry previews rather than copying the library's detailed text.

## Files

- New: `src/pages/case-studies.astro`, `src/data/case-studies.ts`, `src/components/StudyArtwork.astro`, `src/components/StudyCard.astro`, this document.
- Updated: `src/components/Profile.astro`, `src/components/Nav.astro`, `src/pages/consulting.astro`, `src/pages/resume.astro`, `src/data/results.ts`, `src/data/consulting.ts`, `docs/profile-content.md`, `docs/consulting-offer.md`.

## Preview

From the repository, run `npm run dev -- --host 127.0.0.1 --port 4321` and open `http://127.0.0.1:4321/case-studies/`. This is a local revision; it has not been pushed or deployed.

Production validation: `npm run build`, `git diff --check`, internal route/hash checks, legacy-record comparison, and desktop/tablet/phone browser checks. Phase 3 supplied the approved offer PDF and verified the owner's updated 20-minute Calendly event; see `docs/consulting-offer.md`.

Verified on October 3, 2026: production build passes; all 71 internal links across six generated routes resolve to existing routes and hash targets; exactly seven studies appear in the library; excluded projects and the anonymized client's name are absent. The legacy four-study data compares identically to Git HEAD, and the public résumé PDF and preview image are byte-identical to their committed versions. Browser checks cover 1366px, 920px, 820px, 390px and 320px layouts, project-index jumps, direct profile/consulting links and keyboard disclosure controls. The updated profile and résumé navigation also fits at 320px.
