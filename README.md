# ethan-site

Portfolio for Ethan Alfandary — audience growth, media systems, and creative
direction. Static site built with [Astro](https://astro.build) and Tailwind.

Current version: **2.2** · see [CHANGELOG.md](CHANGELOG.md)

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321>.

| Command           | Does                                        |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Dev server with hot reload on port 4321     |
| `npm run build`   | Production build into `dist/`               |
| `npm run preview` | Serve the built site locally                |

Requires Node 18+.

### If the dev server renders the page unstyled

Switching git branches while `npm run dev` is running can scramble Vite's
module graph — it drops some component `<style>` blocks, so the page keeps its
fonts and colours but loses every per-component rule (images render full-bleed,
grids collapse). It looks catastrophic and affects only the dev server; the
production build is unaffected.

Stop the server, then:

```bash
rm -rf node_modules/.vite .astro
```

Restart with `npm run dev`. Stopping the dev server before switching branches
avoids it entirely.

---

## Versions & rollback

Every release is tagged, so any version can be restored at any time. Nothing is
ever lost by moving forward.

| Version | Tag    | What it is                                  |
| ------- | ------ | ------------------------------------------- |
| 2.2     | `v2.2` | Auto-scrolling highlights (current)         |
| 2.1     | `v2.1` | Ember accent, serif dropped                 |
| 2.0     | `v2.0` | Editorial redesign, indigo accent + serif   |
| 1.0     | `v1.0` | Card-based dark theme — kept as a fallback  |

Version 1.0 also lives on the branch `backup/v1.0`, so it stays visible in the
GitHub branch list even if tags are ever pruned.

### Look at an old version without changing anything

```bash
git checkout v1.0
```

Run `npm run dev` to view it. When you're done, return to current with:

```bash
git checkout main
```

### Roll the live site back to an earlier version

This records the rollback as a new commit rather than erasing history, so you
can always move forward again. Nothing is destroyed.

```bash
git revert --no-commit v1.0..HEAD
```

Then commit and push:

```bash
git commit -m "Roll back to v1.0"
```

To publish the rollback:

```bash
git push origin main
```

To undo the rollback afterwards and return to 2.0, revert the revert — the same
command against the rollback commit. Because history is preserved, no version is
ever a dead end.

### Tag a new version

After making changes worth marking as a release:

```bash
git tag -a v2.1 -m "v2.1 — short description"
```

```bash
git push origin --tags
```

Add a matching entry at the top of [CHANGELOG.md](CHANGELOG.md).

---

## Editing content

**All copy, metrics, links, and channel data live in
[`src/data/site.ts`](src/data/site.ts).** Components read from it, so change a
number once there and it updates everywhere it appears.

That file holds:

| Export         | Controls                                                   |
| -------------- | ---------------------------------------------------------- |
| `meta`         | Name, page title, description, email, LinkedIn, Calendly    |
| `nav`          | Header navigation links                                     |
| `trackRecord`  | The six headline metrics under the hero                     |
| `philosophy`   | The "Taste is the Multiplier" thesis and body copy          |
| `capabilities` | The six service areas and their bullets                     |
| `channels`     | The highlights strip — names, handles, figures, avatar crop |
| `caseStudies`  | The three case studies, their problem/system/result copy    |

Every figure in that file is real and traceable to an asset in
`src/assets/media/` or to the channel it links to. Keep it that way.

### Adding a channel to the highlights strip

Channel avatars are cropped out of full profile screenshots so the strip never
shows YouTube's own interface. Add the screenshot to `src/assets/media/`, then
add an entry to `channels` describing where the avatar sits inside it:

```ts
{
  name: "Channel name",
  handle: "@handle",
  platform: "YouTube",
  stat: "58.5K subscribers",
  detail: "198 videos",
  href: "https://www.youtube.com/@handle",
  source: "screenshot.png",
  img: [1280, 720],   // the screenshot's dimensions
  crop: [47, 133, 430], // avatar square: x, y, size — in source pixels
}
```

The component converts that box into background sizing that holds at any
rendered avatar size, so you don't need to pre-crop the image.

---

## Project structure

```text
src/
├── data/site.ts        Single source of truth for all content
├── layouts/
│   └── Layout.astro    <head>, fonts, SEO, scroll-reveal script
├── components/
│   ├── Nav.astro
│   ├── Hero.astro           Headline + play-button artifact
│   ├── TrackRecord.astro    Horizontal metric strip
│   ├── Philosophy.astro
│   ├── Capabilities.astro   + CapabilityIcon.astro
│   ├── Channels.astro       Auto-scrolling highlights marquee
│   ├── CaseStudies.astro
│   ├── CTA.astro
│   └── Footer.astro
├── styles/global.css   Design tokens and shared primitives
├── assets/
│   ├── media/          Images the site renders  ← keep this folder tight
│   └── source/         Originals, not shipped   ← see its README
└── pages/index.astro
```

### A note on `assets/media` vs `assets/source`

`Channels.astro` and `CaseStudies.astro` use `import.meta.glob` to load images
by filename. **Vite emits every file matching that glob into the build, whether
or not a component renders it.** Two unused 3.8 MB photos sitting in
`assets/media/` were being deployed for exactly this reason.

So: only put files in `src/assets/media/` if the site actually renders them.
Originals and pre-processing source material go in `src/assets/source/`, which
is outside the glob. See [`src/assets/source/README.md`](src/assets/source/README.md)
for how the transparent brand marks and the cropped hero photo were produced.

---

## Design system

Tokens are defined at the top of [`src/styles/global.css`](src/styles/global.css).

- **Palette** — `#06070A` base, `#0C0D11` raised, warm off-white text, and a
  single ember accent `#FF5C39` used sparingly for markers, hover states, and
  the CTA. The site is dark-only by design; there is no light mode.
- **Type** — Inter throughout. Accent phrases are the same face and weight as
  the headline, distinguished by colour alone. Keep it that way; an italic
  serif was tried here and read as decorative at display size.
- **Layout** — 12-column grid, `1280px` max width, deliberate asymmetry.
- **Cards** — used only where content behaves like a card. Prefer thin rules,
  spacing, and alignment.
- **Motion** — reveal on scroll, hover lifts, one drawn line, and the
  highlights marquee. All of it is disabled under `prefers-reduced-motion`.

### Contrast

Checked against the base background. Muted metadata sits at 4.87:1 and accent
text at 6.6:1, both clearing WCAG AA.

**Filled accent surfaces take dark ink (`--on-accent`), not white.** White on
ember is only 3.1:1 and fails AA; the dark ink reaches 6.4:1. If you change
`--accent`, re-check both the text-on-background and ink-on-accent pairings.
