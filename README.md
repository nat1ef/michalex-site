This is a [Next.js](https://nextjs.org) marketing site for Michalex machine shop (TypeScript, Tailwind CSS, GSAP, Three.js).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Production output is written to `out/` (static export for Cloudflare Pages).

## Deploy on Cloudflare Pages

This project uses **Next.js static export** (`output: "export"`), which is the simplest fit for Cloudflare Pages: no Node server, no Workers adapter, and full support for client-side GSAP and Three.js in the browser.

### 1. Push to GitHub

Create a repository and push this project (see root `README` workflow if you use the included scripts).

### 2. Connect Cloudflare Pages

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/) go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select the GitHub repository.
3. Configure the build:

| Setting | Value |
| --- | --- |
| **Framework preset** | `None` (or **Next.js (Static HTML Export)** if shown) |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | `/` (repository root) |

4. **Environment variables** (optional):

| Variable | Value | Notes |
| --- | --- | --- |
| `NODE_VERSION` | `20` | Matches `.nvmrc`; omit if the dashboard already uses Node 20+ |

No secrets are required for the current site; contact links and content live in `src/lib/content.ts`.

5. Save and deploy. Cloudflare runs `npm ci` / `npm install`, then `npm run build`, and serves the `out` folder on the CDN.

### Custom domain

After the first deploy, add your domain under **Pages project → Custom domains** (e.g. `michalex.gr`) and follow DNS instructions.

### Alternative: full Next.js on Workers (OpenNext)

If you later add SSR, Route Handlers, or `next/image` optimization on the edge, migrate to [@opennextjs/cloudflare](https://opennext.js.org/cloudflare/get-started) instead of static export. The legacy `@cloudflare/next-on-pages` package is deprecated in favor of OpenNext.

## Deploy on Vercel

You can still deploy on Vercel with the default Next.js preset; remove `output: "export"` from `next.config.ts` if you want Vercel image optimization and server features.
