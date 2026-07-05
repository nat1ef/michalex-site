# Gear-Birth Scrollytelling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the top of the homepage with a Meridian-style pinned fullscreen photo sequence: raw steel → lathe → tooth cutting → inspection → finished gear, with Greek serif titles, service names, and count-up stats overlaid per stage.

**Architecture:** One new client component (`GearBirthSequence`) renders five stacked fullscreen `<img>` layers inside a GSAP ScrollTrigger pin (`+=400%` scrub). Scroll progress drives opacity crossfades + slow Ken Burns scale per stage and fades stage overlays in/out. It replaces `Hero`, `StatementScroll`, `ProcessChapters`, and `Metrics` in `page.tsx`; `Services` (real photos), `BentoFacility` (gets `id="εργαστηριο"`), `Reviews`, `CtaBanner`, `Contact` remain below.

**Tech Stack:** Next.js 16 static export (`images.unoptimized`), GSAP 3 + @gsap/react + ScrollTrigger (via existing `animation-provider`), Lenis (existing), Tailwind 4 utility classes already defined in `globals.css` (`display-hero-compact`, `display-title`, `telemetry-label`, `section-shell`, `display-number`).

## Global Constraints

- Real photos from `public/images/work/` are the stage frames (no AI imagegen available): `raw-stock.jpg`, `turning-lathe.jpg`, `hobbing-macro.jpg`, `hands-splines.jpg`, `spur-gear-macro.jpg`.
- All copy in Greek; stats verbatim from `content.ts` `stats` (40+ χρόνια, 4.9/5, 21+ κριτικές, 100% custom).
- `prefers-reduced-motion: reduce` → no pin/scrub; stages render as plain stacked full-screen sections.
- Keep nav anchors working: `#αρχικη` on the sequence, `#εργαστηριο` moves to `BentoFacility`.
- Static export must succeed: `npm run build`.

---

### Task 1: Stage content in `content.ts`

**Files:** Modify: `src/lib/content.ts` (append)

Add `gearStages` export: five objects `{ id, code, kicker, title: string[], body, image, imageAlt, overlay: "hero" | "services" | "stats" | "text" | "cta" }` mapping the five stages to the five photos above. Stage 1 title lines: `["Το σχέδιό σας,", "σε ατσάλι."]`. Stage 2 lists the six service titles (import from `services` at render time instead of duplicating). No new duplicate stats.

- [ ] Step 1: Append `gearStages` const. Run `npx tsc --noEmit` → PASS. Commit.

### Task 2: `GearBirthSequence` component

**Files:** Create: `src/components/sections/gear-birth-sequence.tsx`

**Interfaces:** Consumes `gearStages`, `services`, `stats`, `siteConfig` from `@/lib/content`; `gsap` from `@/components/motion/animation-provider`; `CountUp` from `@/components/motion/count-up`; `ButtonLink`, `ViberButton`. Produces `export function GearBirthSequence()` used by `page.tsx`, section `id="αρχικη"`.

Structure: `<section id="αρχικη">` → sticky/pinned `100svh` stage: absolutely stacked stage images (first visible, rest `opacity:0`, each `scale:1.0`), dark gradient scrims, one absolutely-positioned overlay per stage. Timeline (pin, `end: "+=400%"`, `scrub: 1`): per stage i>0 crossfade image i in over ~0.12 of timeline while scaling previous 1.0→1.08; overlay i fades/blur-slides in after image, out before next. Stage 1 overlay = H1 brand title (chars reveal like old hero) + tagline + Κλήση/Viber buttons + scroll cue; stage 3 overlay = 4 stats grid with `CountUp`; stage 5 overlay = «Ζητήστε προσφορά» CTA. Reduced-motion: bail out of GSAP, render stages stacked statically (CSS `reduced-motion:static` variant — images become sequential full-screen sections).

- [ ] Step 1: Implement component (~250 lines) following `hero.tsx`/`statement-scroll.tsx` GSAP patterns (useGSAP, matchMedia desktop `+=400%` / mobile `+=340%`).
- [ ] Step 2: `npx tsc --noEmit` + `npm run lint` → PASS. Commit.

### Task 3: Wire into `page.tsx`, retire old sections

**Files:** Modify: `src/app/page.tsx`, `src/components/sections/bento-facility.tsx`

Replace `<Hero/>`, `<StatementScroll/>`, `<ProcessChapters/>`, `<Metrics/>` with `<GearBirthSequence/>`; keep `BentoFacility`, `Services`, `Reviews`, `CtaBanner`, `Contact`. Add `id="εργαστηριο"` to BentoFacility's `<section>`. Leave retired component files in repo (unused imports removed).

- [ ] Step 1: Edit page + bento id. `npm run build` → static export succeeds. Commit.

### Task 4: Visual verification & polish

- [ ] Step 1: `npm run dev`, open with Playwright at 1440×900 and 390×844; scroll through; screenshot each stage; check crossfades, overlay timing, nav anchors, no horizontal scroll, footer sections intact.
- [ ] Step 2: Fix any timing/z-index/layout issues found; re-verify. Commit.

### Task 5: Push

- [ ] Step 1: `git push` to origin/master.
