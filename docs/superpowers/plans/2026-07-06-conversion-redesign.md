# Conversion Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild michalex-site as a bright, industrial, conversion-first multi-page static site (spec: `docs/superpowers/specs/2026-07-06-conversion-redesign-design.md`) on branch `redesign`, previewed via Cloudflare Pages branch deployment.

**Architecture:** Next 16 static export stays. All GSAP/Lenis/preloader machinery is removed; motion is a single `Reveal` component (IntersectionObserver + CSS). Pages: `/`, four `/ypiresies/[slug]` pages from one template + data, `/epikoinonia`. All copy/data lives in `src/lib/content.ts`.

**Tech Stack:** Next 16 (App Router, `output: "export"`), Tailwind 4, IBM Plex Sans/Mono (Greek) via `next/font/google`, Cloudflare Pages.

## Global Constraints

- Palette Β "Μπλε ατσάλι" exactly as specced: ground `#edf0f2`, card `#ffffff`, ink `#20262b`, steel `#55616b`, line `#d5dbdf`, accent `#2f5d8a`, accent-deep `#24486c`, dark band `#1c2733`, accent-bright `#7fb0d9`, stars `#e0a92f`, Viber `#7360f2`.
- No dark theme. No GSAP, Lenis, preloader, scroll-scrubbed video.
- All animation respects `prefers-reduced-motion`.
- Primary CTA everywhere: `tel:+302105222541`; secondary: Viber deep link from `siteConfig`.
- Verification per task: `npm run build` passes; visual checks via Playwright at 1440×900 and 390×844 happen in Task 8 (no test framework exists in this repo).
- There is no automated test suite in this repo; "test" steps are build + visual verification.

---

### Task 1: Branch, fonts, theme tokens, Reveal primitive

**Files:**
- Modify: `src/app/layout.tsx` (swap fonts to IBM Plex Sans + IBM Plex Mono, greek subset)
- Modify: `src/app/globals.css` (light steel-blue tokens; kill dark-only utilities later used nowhere)
- Create: `src/components/motion/reveal.tsx`

**Interfaces:**
- Produces: `<Reveal as?="div" delay?={ms}>` client component adding `.reveal` → `.reveal-in` on intersect; CSS vars `--ground --card --ink --steel --line --accent --accent-deep --band --accent-bright --star`; font CSS vars `--font-sans`, `--font-mono`.

- [ ] Step 1: `git checkout -b redesign`
- [ ] Step 2: In `layout.tsx` replace current font consts with:

```tsx
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
const plexSans = IBM_Plex_Sans({ variable: "--font-sans", subsets: ["latin", "greek"], weight: ["400", "500", "600", "700"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin", "greek"], weight: ["400", "600"] });
```

Apply both variables on `<html>`, drop Noto Serif Display.
- [ ] Step 3: In `globals.css` replace the color tokens with the palette above (light only), set body `background: var(--ground); color: var(--ink)`, add `.reveal { opacity:0; translate:0 14px; transition: opacity .55s ease, translate .55s ease } .reveal-in { opacity:1; translate:0 } @media (prefers-reduced-motion: reduce){ .reveal{ opacity:1; translate:none; transition:none } }` plus `.eyebrow` (mono, uppercase, tracked, accent) and `.corner-ticks` utility.
- [ ] Step 4: Create `reveal.tsx` (client): IntersectionObserver, threshold .15, unobserve after fire.
- [ ] Step 5: `npm run build` → passes. Commit `feat: steel-blue theme, Plex fonts, Reveal primitive`.

### Task 2: Content model

**Files:**
- Modify: `src/lib/content.ts`

**Interfaces:**
- Produces: `serviceCategories: { slug; eyebrow; title; shortTitle; cardText; lead; checklist: string[]; chips?: string[]; images: [main, detail]; metaTitle; metaDescription }[]` (4 entries: granazia, tornos, freza, eidikes-kataskeves); `workSteps: {n,title,text}[]` (3); `trustedBy: {name; logo?: string}[]` (empty array for now); keep `siteConfig`, `stats`, `reviews`, `facilityBento`, `capabilities`; delete `gearStages`, `processChapters`, `statement`, `navLinks` (replaced by `pageNav: {href,label}[]` with real routes + home anchors).

- [ ] Step 1: Write the four categories with the owner's taxonomy (γρανάζια chips: Ίσια, Ελικοειδή, Κωνικά, Κορώνες, Ατέρμονες, Πολύσφηνα; checklists per mockup). Photos from `public/images/work/*` as in mockup (`gear-pile`, `spline-shaft-machine`/`turning-lathe`, `shafts-array`, `gearbox-repair`, details: `spur-gear-macro`, `brass-flange-lathe`, `helical-gear-shaft`, `ring-gear-housing`).
- [ ] Step 2: `npm run build` (page.tsx still imports removed exports → fix imports in same commit by stubbing page to render nothing yet is NOT allowed; instead keep old exports until Task 5 swaps the pages, then delete them in Task 7). So: **add** new exports now, delete old ones in Task 7.
- [ ] Step 3: Commit `feat: content model for redesigned site`.

### Task 3: Site chrome

**Files:**
- Create: `src/components/layout/utility-strip.tsx` (dark band: addresses · hours · phone link)
- Create: `src/components/layout/site-header.tsx` (logo block, nav from `pageNav`, phone button; mobile: logo + phone icon + disclosure menu)
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/mobile-call-bar.tsx` (`fixed bottom-0 inset-x-0 z-50 grid grid-cols-[1.5fr_1fr] md:hidden`; call = accent bg, Viber = `#7360f2`; body padding via `pb-16 md:pb-0` wrapper in layout)
- Modify: `src/app/layout.tsx` (render strip/header/children/footer/call-bar; remove `SiteExperience`)

**Interfaces:**
- Consumes: `siteConfig`, `pageNav` from content.
- Produces: default page shell; all pages get chrome from layout.

- [ ] Step 1: Build the four components with real markup (no placeholders).
- [ ] Step 2: `layout.tsx` body: `<UtilityStrip/><SiteHeader/><main className="pb-20 md:pb-0">{children}</main><SiteFooter/><MobileCallBar/>`.
- [ ] Step 3: `npm run build`; commit `feat: light chrome with sticky mobile call bar`.

### Task 4: Home sections

**Files:**
- Create: `src/components/home/hero.tsx` (millimeter-grid bg, eyebrow, H1 with accent em, sub, CTA row, trust chips, photo with corner ticks + caption chip)
- Create: `src/components/home/stats-band.tsx` (dark `--band`, 4 stats, accent left borders)
- Create: `src/components/home/trusted-by.tsx` (returns `null` when `trustedBy.length === 0`; CSS marquee: duplicated list, `animation: marquee 30s linear infinite`, `:hover{animation-play-state:paused}`, reduced-motion → static wrap; logos `grayscale hover:grayscale-0`)
- Create: `src/components/home/services-grid.tsx` (4 cards; gears card first w/ chips; links to `/ypiresies/[slug]`)
- Create: `src/components/home/work-steps.tsx` (3 numbered steps, accent top border)
- Create: `src/components/home/gallery.tsx` (restyle of facility bento, light cards, keep `process-live.mp4` tile muted/loop/autoplay/playsInline)
- Create: `src/components/home/reviews-section.tsx` (★4.9 heading, 6 review cards grid, link to `googleReviewsUrl`)
- Create: `src/components/home/contact-band.tsx` (info column + `<iframe src="https://www.google.com/maps?q=Καστοριάς+2,+Αθήνα+104+41&output=embed" loading="lazy">`)

**Interfaces:**
- Consumes: content exports from Task 2, `Reveal` from Task 1.

- [ ] Step 1: Implement each section per mockup (copy text verbatim from spec/mockup).
- [ ] Step 2: `npm run build`; commit `feat: home page sections`.

### Task 5: Pages

**Files:**
- Modify: `src/app/page.tsx` (compose Task 4 sections in spec order; ids: υπηρεσιες, εργαστηριο, κριτικες, επικοινωνια for anchors)
- Create: `src/app/ypiresies/[slug]/page.tsx` (`generateStaticParams` from `serviceCategories`; breadcrumb, eyebrow, H1, lead, ✓ checklist 2-col, two photos, dark CTA band with Viber + call; `generateMetadata` per category)
- Create: `src/app/epikoinonia/page.tsx` (phone hero, Viber, hours, both addresses, map embed)

- [ ] Step 1: Implement pages.
- [ ] Step 2: `npm run build` → 4 service routes + epikoinonia in output. Commit `feat: service pages and contact page`.

### Task 6: SEO

**Files:**
- Modify: `src/app/layout.tsx` (root metadata: Greek title template `%s | Μηχανουργείο Αλεξανδράκης`, description, openGraph w/ existing share image)
- Create: `src/components/seo/local-business-jsonld.tsx` (script type application/ld+json: `LocalBusiness` with name, both addresses, phone, openingHoursSpecification Mo-Fr 07:30-16:00, `aggregateRating {4.9, 21}`)
- Create: `src/app/sitemap.ts` + `src/app/robots.ts` (static export compatible: `export const dynamic = "force-static"`)

- [ ] Step 1: Implement; JSON-LD rendered in root layout.
- [ ] Step 2: `npm run build`; verify `out/sitemap.xml` exists. Commit `feat: metadata, JSON-LD, sitemap`.

### Task 7: Remove the old world

**Files:**
- Delete: `src/components/sections/*` (gear-birth-sequence, services, bento-facility, reviews, cta-banner, contact — whatever Task 4 superseded), `src/components/motion/preloader.tsx`, `src/components/motion/site-experience.tsx`, `src/components/motion/animation-provider.tsx`, custom cursor if present
- Modify: `src/lib/content.ts` (drop `gearStages`, `processChapters`, `statement`, old `services`, `navLinks`)
- Modify: `package.json` (uninstall `gsap @gsap/react lenis` and anything else now unused)
- Delete: `public/videos/gear-birth.mp4`

- [ ] Step 1: Grep for imports of each file before deleting; delete, uninstall deps.
- [ ] Step 2: `npm run build` green; `npm run lint` not worse than before. Commit `refactor: remove cinematic-era components and deps`.

### Task 8: Visual verification + branch preview

- [ ] Step 1: `npm run dev`; Playwright at 1440×900: home (hero, stats, services, steps, gallery, reviews, contact/map), one service page, epikoinonia. At 390×844: sticky call bar visible, tap targets, no horizontal scroll.
- [ ] Step 2: Fix anything visually broken; commit fixes.
- [ ] Step 3: `git push -u origin redesign` → Cloudflare Pages branch deployment; verify `https://redesign.michalex-site.pages.dev` serves the new site (Playwright pass on live preview).
- [ ] Step 4: Deliver preview URL to owner. **Do not merge to master** until owner approves.
