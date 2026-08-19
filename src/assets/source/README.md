# Source material — not shipped

Original assets kept for future re-processing. They live outside
`src/assets/media/` on purpose: the channel and case-study components glob that
folder with `import.meta.glob`, and anything matching gets emitted into the
build whether or not a component renders it. Two 3.8 MB photos were being
deployed dead weight before this split.

Keep `src/assets/media/` limited to files the site actually renders.

| Source                   | Produces                    | How                                           |
| ------------------------ | --------------------------- | --------------------------------------------- |
| `ethan_playbuttons2.jpg` | `media/playbuttons.jpg`     | cropped to the two plaques, resized to 2200px |
| `plastic-surgery.PNG`    | `media/tansavatdi-mark.png` | white background flood-filled to transparent  |
| `syfer_logo.png`         | `media/syfer-mark.png`      | white background flood-filled to transparent  |

`ethan_playbuttons.jpg` is an unused alternate frame of the play-button photo.

The knockout used a border-seeded flood fill (so interior whites — the counters
in the wordmark — survive) with a soft alpha band across the antialiased rim.
The marks are black artwork on transparent and are inverted in CSS to read on
the dark background.

## Retired

`yamikaze-talon.png` and `yamikaze-portrait.png` were knocked-out and cropped
versions of the Yamikaze illustration. The case study now uses the original
`media/yamikaze_logo_talon.jpg` as-is, on request. These are kept only in case
that decision is revisited — nothing references them.
