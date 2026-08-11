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