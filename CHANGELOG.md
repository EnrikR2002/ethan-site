# Changelog

Every released version is tagged in git, so any of them can be restored at any
time. See [Versions & rollback](README.md#versions--rollback) in the README for
the commands.

| Version           | Tag    | Summary                                              |
| ----------------- | ------ | ---------------------------------------------------- |
| [2.0](#20)        | `v2.0` | Editorial redesign built around real evidence        |
| [1.0](#10)        | `v1.0` | Unified dark theme, card-based layout                |
| [pre-1.0](#pre-10) | —     | Original build                                       |

---

## 2.0

**Tag:** `v2.0` · **Status:** current

A full visual rebuild. The site keeps every metric, claim, and link from 1.0 —
what changed is how the evidence is framed.

### Layout

- Asymmetric 12-column editorial grid replacing the centered, symmetrical
  layout. Text and media occupy different column spans by section.
- New large hero: `I build / audiences / that move.` occupying most of the
  first viewport, with the proof strip visible immediately below.
- Sections separated by thin rules, spacing, and alignment instead of boxes.
  Cards now appear only where content genuinely behaves like a card
  (case studies, the hero artifact frame).
- Track record rendered as one horizontal typographic strip with hairline
  separators, replacing six rounded stat cards.
- Six service boxes replaced with a typographic capability list. All eighteen
  bullets preserved verbatim.
- Case studies restructured as **problem → system → result** so the work reads
  as repeatable systems rather than one-off production.

### Evidence

- Hero anchors on the photograph of the two physical YouTube Silver Play
  Buttons (Syfer Music, Yamikaze — 100,000+ subscribers each), cropped to the
  plaques and captioned like an exhibit. Chosen over a decorative graphic
  because it is verifiable and specific.
- Channel avatars are cropped out of the real profile screenshots, so the
  highlights strip shows the accounts without YouTube's Subscribe chrome.
  Channel names and figures are re-set in the site's own typography.
- Brand marks (Tansavatdi, Yamikaze, Syfer) had their white backgrounds
  removed with a border-seeded flood fill, so they sit on the dark palette
  instead of appearing as white rectangles. Interior whites — the armour in
  the Yamikaze art, the letter counters in the wordmark — are preserved.

### Design system

- Near-black palette (`#06070A` base, `#0C0D11` raised) with a warm off-white
  for text rather than pure white.
- Inter for structure; Instrument Serif italic reserved for three accent
  phrases. Blue (`#5B61FF`) kept scarce — accents, markers, CTA, hover states.
- "Signal line" motif recurring as section markers, hover underlines, the
  artifact tick, and the CTA edge line.

### Content architecture

- All copy, metrics, links, and channel data consolidated into
  `src/data/site.ts` as the single source of truth. Components read from it
  rather than hardcoding duplicates.
- Components rebuilt: `Hero`, `TrackRecord`, `Philosophy`, `Capabilities`,
  `CapabilityIcon`, `Channels`, `CaseStudies`, `CTA`. Superseded components
  removed (`StatsStrip`, `ServicesGrid`, `CaseCard`, `InfiniteLoopCarousel`,
  `InfiniteCanvas`, `Section`, `Stat`, `Welcome`).
- `index.astro` now renders through `Layout.astro`, which previously was
  imported but unused — its scroll handling never ran.

### Fixed

- **7.7 MB of unused images were being deployed.** `import.meta.glob` emits
  every file matching its pattern, including the pre-crop source photos no
  component rendered. Source material moved to `src/assets/source/`, leaving
  `src/assets/media/` to hold only what ships. Build output: **8.3 MB → 728 KB**.
- **The page rendered blank without JavaScript.** Scroll-reveal left every
  section at `opacity: 0`, so any JS failure hid the whole site. The hidden
  state is now gated behind a `.js` class set in `<head>`.
- Muted metadata failed WCAG AA at 3.19:1 contrast; raised to 4.87:1.
- Mobile metadata was 11px and footer tap targets 24px tall; now 12px and 44px.
- The header "Book a call" CTA was hidden below 900px, removing the primary
  conversion path on mobile. It now stays visible at every width.

### Accessibility & performance

- Skip link, `aria-label`ed landmarks, and a `1×h1 / 5×h2 / 9×h3` heading
  structure.
- All motion disabled under `prefers-reduced-motion`.
- Images served as responsive WebP through `astro:assets`; the hero photo
  went from 3.8 MB to 176 KB.
- Open Graph and Twitter card metadata added.

---

## 1.0

**Tag:** `v1.0` · **Backup branch:** `backup/v1.0`

The card-based dark layout. Kept as a working fallback — it is a clean,
credible site, just a more conventional one.

- Centered hero, "Key Results" stat grid, six service cards, infinite-loop
  highlights carousel, featured work cards.
- Fixed the Tailwind v4 `@config` directive, which was missing — the custom
  brand palette was silently failing site-wide.
- Replaced the OS-dependent light/dark split with a single committed dark
  theme. That split was the cause of the white-on-white "Key Results" cards,
  which were unreadable in light mode.
- Unified the card treatments across stats, services, case studies, and the
  carousel; added hover states.
- Filled in the previously empty footer with navigation and contact links.

---

## pre-1.0

**Commit:** `759cfe2`

The original build, before any of the above. Recoverable from git history but
not tagged — 1.0 supersedes it in every respect, including the unreadable
stat cards and the broken brand-colour configuration.
