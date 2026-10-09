# kuotivo-site

The public marketing site for **Kuotivo**, window and fenestration quoting software
for Indian fabricators. Live at [kuotivo.in](https://kuotivo.in).

One page plus `/privacy` and `/terms`. The application itself lives in a separate
repository and is served from `app.kuotivo.in`.

## Run it

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build, all routes prerender static
```

## Where things are

| Path | What |
|---|---|
| `lib/content.ts` | **Every word on the site.** Copy edits happen here and nowhere else |
| `lib/site-url.ts` | Resolves the origin per deployment. Previews describe themselves and are noindex |
| `app/globals.css` | Design tokens. The palette and the reasoning behind it |
| `app/page.tsx` | The nine sections of the landing page |
| `components/HeroDrawing.tsx` | The shop drawing in the hero, as animated inline SVG |
| `components/CardSwap.tsx` | The cycling screenshot stack |
| `public/shots/` | Product screenshots, from the `kuotivo-showcase` demo tenant |
| `public/photos/` | Workshop photography |

## Design

The direction, the palette, the component decisions and the page structure are
recorded in `Build-Document/Kuotivo-Website-Build-Document.md` in the parent
workspace. **Read it before changing the design.** Two constraints are load bearing
and easy to undo by accident:

- **No cream, no warm paper, no dark mode.** Pure white only.
- **No em-dash characters anywhere in visible copy.** Use a period, a comma or a colon.

## Deployment

Vercel, from `main`. `vercel.json` carries the security headers, the asset cache
policy and the redirects. The apex and `www` point at Vercel; `api.kuotivo.in` and
`app.kuotivo.in` are separate records and must stay DNS only.
