# LGO 2026

Static marketing site for LGO Technologies (Pvt) Ltd — the 2026 rebuild, covering the
**youShop**, **youResto** and **youQR** products plus the LGO hardware range.

No build step. Every page is a self-contained HTML file that loads a small set of shared
scripts and images directly from disk. Open any `.dc.html` file in a browser to view it.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home (site root) |
| `Solutions.dc.html` | Solutions / industries |
| `YouShop.dc.html` | youShop product page |
| `YouResto.dc.html` | youResto product page |
| `YouQR.dc.html` | youQR product page |
| `Hardware.dc.html` | Hardware range (Y10, Y1000, Y4000, Y5000, Y7000, KDS) |
| `Contact.dc.html` | Contact |
| `Terms.dc.html` | Terms of service |
| `Privacy.dc.html` | Privacy policy |
| `Senfay.dc.html` | Long-form single-file build of the site |
| `PhoneScreen.dc.html` | Standalone phone-mockup component |

### `deploy-*` variants

The `deploy-*.dc.html` files are the same pages with one difference: internal navigation
links point at absolute Vercel deployment URLs instead of sibling `.dc.html` files,
because each page is deployed as its own Vercel project.

- Editing locally or serving the whole folder together → use the plain files.
- Deploying pages individually → use the `deploy-*` files, and update the URLs inside them
  when a deployment URL changes.

Keep the two in sync: a content change made to `YouShop.dc.html` also needs to land in
`deploy-YouShop.dc.html`. `Solutions`, `Senfay` and `PhoneScreen` have no `deploy-` variant.

## Shared files

| File | Purpose |
| --- | --- |
| `senfay-common.js` | Shared header/footer behaviour, i18n strings, language switcher |
| `image-slot.js` | Image placeholder / slot helper used while laying pages out |
| `support.js` | Runtime shim loaded first by every page |
| `mobile.css` | Mobile layout layer — see below |

## Mobile layer (`mobile.css`)

Every page links `mobile.css` after its inline styles. All of it lives inside
`max-width` media queries, so desktop rendering is untouched; the breakpoints are
1024 / 860 / 560 / 400 / 359px.

Two things to know before editing it:

1. **`!important` is required.** The pages are authored with inline `style=""`
   attributes, which outrank any stylesheet.
2. **`[style*="..."]` selectors do not work.** The runtime rewrites every inline style
   attribute into normalised form — `padding:96px 40px` becomes
   `padding: 96px 40px 40px;`, colours become `rgb(...)`. Match on the `data-` hooks
   below instead.

### Data hooks

These are stamped onto the markup purely as styling handles; they have no behaviour.

| Hook | Marks |
| --- | --- |
| `data-sec` | every `<section>` — vertical rhythm |
| `data-gut` | page-level horizontal rails — the 20px gutter |
| `data-card` | rounded panels with ≥30px inner padding |
| `data-btnrow` | flex rows of pill buttons — stacked full-width on phones |
| `data-stack` | exactly-two-track text grids that collapse to one column |
| `data-row` | `space-between` flex rows that need a gap when narrow |
| `data-micro` | elements whose inline `font-size` is below 12px |
| `data-tablewrap` | the `overflow-x:auto` wrappers around comparison tables |
| `data-marquee` | the payment-rail marquee track |
| `data-phone` / `data-float` | the hero phone mock and its floating cards |
| `data-stats` / `data-herocta` | hero stat row and hero CTA row (home only) |
| `data-menu-extra` | CTA + language switcher inside the mobile menu panel |

Two hooks carry a real trap if you regenerate them:

- `data-stack` must match the track list **exactly**. `grid-template-columns:1fr 1fr`
  is a substring of `1fr 1fr 1fr`, and collapsing a 3-track grid turns the numeric
  keypad mock into a single column.
- `data-btnrow` must never be applied inside `<header>`. The header's control cluster
  is a flex row containing a pill anchor, so a naive match catches it and stacks the
  logo, hamburger and language select vertically.

### The phone mock

`[data-phone]` is a fixed 392×770 box. It is scaled as a unit with `transform`, plus
matching **negative margins** — a transform alone leaves the original box occupying the
grid track, so the hero would still overflow. `--ph` is stepped per breakpoint rather
than fluid, because a fluid ratio needs a length divided by a length, which `calc()`
does not portably support.

## Assets

- `assets/` — everything the pages actually reference: product photography, logos, hardware
  renders, payment-rail marks, partner logos, and the Saprona webfont family under
  `assets/fonts/`.
- `uploads/` — the source pool the build drew from: original screenshots, pasted images,
  raw font files, and product PDFs (feature matrices, price list). Not referenced by any
  page; kept as an archive.
- `scraps/` — design-process slices and exploration renders. **Not committed** (see
  `.gitignore`); they live only on the original machine.

## Languages

The language switcher offers English, Singlish, Sinhala (සිංහල) and Tamil (தமிழ்).
Translated strings live in `senfay-common.js` and are bound to markup through
`data-i18n="..."` attributes.

## Local preview

Some pages fetch sibling files, so open them over HTTP rather than `file://`:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Deployment

The whole folder deploys as one static Vercel project — no build command, no output
directory. `index.html` is the site root; every other page is served at its own path
(`/YouShop.dc.html`, `/Hardware.dc.html`, …) and the relative links between them resolve
as-is.