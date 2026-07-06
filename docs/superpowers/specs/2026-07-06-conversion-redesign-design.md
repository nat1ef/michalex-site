# Conversion-focused redesign — Μηχανουργείο Αλεξανδράκης

**Date:** 2026-07-06
**Status:** Approved by owner (palette Β "Μπλε ατσάλι", structure, and service taxonomy confirmed in conversation; interactive mockup at claude.ai artifact `341b25cf`).

## Goal

Replace the cinematic dark scroll-video site with a bright, industrial, conversion-first site whose single job is to make a prospective customer **call 210 522 2541** (secondary: send a photo of their part via Viber). The owner found the previous design "artistic, not professional" and disliked the scroll-driven video.

## Audience & primary action

Tradespeople, factory maintenance staff, and individuals holding a broken/worn part or a drawing. They need to know within seconds: (1) does this shop make/fix this, (2) can I trust them, (3) how do I reach them. Primary CTA is a phone call; Viber message is the secondary CTA (photo of the part). No contact forms.

## Visual identity

- **Palette (steel blue):** ground `#edf0f2` (cool aluminum), cards `#ffffff`, ink `#20262b`, secondary `#55616b`, hairline `#d5dbdf`, accent `#2f5d8a` (hover/deep `#24486c`), dark bands `#1c2733`, accent-bright for dark bands `#7fb0d9`, review stars `#e0a92f` (always gold), Viber purple `#7360f2` (brand, fixed).
- **Type:** IBM Plex Sans (Greek subset, weights 400/600/700) for everything; IBM Plex Mono for technical labels/eyebrows (uppercase, letter-spaced). Loaded via `next/font/google`. Replaces Noto Serif Display + current sans.
- **Industrial-light texture:** faint millimeter-grid background in hero, measurement corner ticks on the hero photo, mono eyebrows (ΤΟΡΝΟΣ, ΦΡΕΖΑ…), dark steel stat/contact bands. No dark theme, no cinematic effects.
- **Motion:** subtle CSS/IntersectionObserver fade-up reveals only; disabled under `prefers-reduced-motion`. Remove GSAP pinning, scroll-scrubbed video, Lenis smooth scroll, and the session preloader entirely.

## Information architecture

Multi-page (owner's choice), all static-exported:

- `/` — home
- `/ypiresies/granazia` — Γρανάζια παντός τύπου (ίσια/μετωπικά, ελικοειδή, κωνικά, κορώνες, ατέρμονες, πολύσφηνα; αντίγραφο από δείγμα; μεμονωμένα ή σειρές)
- `/ypiresies/tornos` — Εργασίες τόρνου (άξονες, δαχτυλίδια, σπειρώματα, πατούρες, ειδικές κατασκευές)
- `/ypiresies/freza` — Εργασίες φρέζας (φρεζαρίσματα, σφηνόδρομοι, οδοντώσεις, ειδικές κατασκευές)
- `/ypiresies/eidikes-kataskeves` — Ειδικές κατασκευές & επισκευές (αντίγραφο από φθαρμένο κομμάτι, ανακατασκευή)
- `/epikoinonia` — contact page (phone hero, Viber, both addresses, hours, embedded Google Maps)

The four service categories mirror how the owner actually describes the work (his correction replaced the earlier six marketing-speak categories). Service pages exist for local SEO ("κατασκευή γραναζιών Αθήνα") — everything is still visible from the home page.

## Home page sections (order)

1. **Utility strip** (dark): addresses · hours · phone.
2. **Header**: logo, nav (Αρχική, Υπηρεσίες, Εργαστήριο, Κριτικές, Επικοινωνία), prominent phone button.
3. **Hero**: mono eyebrow (ΜΗΧΑΝΟΥΡΓΕΙΟ ΣΤΗΝ ΑΘΗΝΑ · 40+ ΧΡΟΝΙΑ), H1 «Γρανάζια & εξαρτήματα κατά σχέδιο ή δείγμα.», subline about σχέδιο/φωτογραφία/δείγμα → τιμή & χρόνος, CTA row (call = filled accent, Viber = purple-tinted outline), trust chips (★4.9 Google 21+, 40+ χρόνια, αυθημερόν προσφορά), right-side workshop photo with corner ticks + caption chip.
4. **Stats band** (dark): 4.9/5 Google, 21+ κριτικές, 40+ χρόνια, 100% custom.
5. **Trusted-by marquee**: «Μας εμπιστεύονται» + horizontally auto-scrolling client logos (CSS marquee, pauses on hover and under reduced-motion). Data-driven from `content.ts`; section renders only when the logo list is non-empty. Logos grayscale, full opacity on hover. *Blocked on owner obtaining written permission from each client (see conversation); ships hidden until logos are provided.*
6. **Services**: 4 cards (gears card first with type chips), each linking to its service page.
7. **How we work**: 3 numbered steps (στέλνετε/φέρνετε → προσφορά → παραλαβή).
8. **Workshop gallery**: existing photo bento (reuse `facilityBento`, restyled light; keep `process-live.mp4` tile as a normal autoplay-muted tile).
9. **Reviews**: ★4.9 heading + review cards (existing `reviews` data) + link to Google.
10. **Contact band**: phone (large), hours, both addresses, Viber; embedded Google Maps iframe for Καστοριάς 2.
11. **Footer**: compact; nav, addresses, copyright.

**Mobile:** sticky bottom bar — [☎ ΚΛΗΣΗ ΤΩΡΑ] (accent, ~60% width) + [Viber] (purple). Visible on all pages below `md`; body gets bottom padding so content never hides behind it.

## Service page template

Breadcrumb, mono eyebrow, H1, lead paragraph, ✓-checklist of concrete capabilities, 2 photos, dark CTA band («Έχετε το κομμάτι μπροστά σας;» → Viber) + call button. Per-page `<title>`/description in Greek targeting the matching search phrases.

## Technical

- Keep: Next 16 static export (`output: "export"`), Tailwind 4, Cloudflare Pages via git push.
- Remove from bundle: GSAP + @gsap/react, Lenis, preloader, gear-birth sequence, blob-video loader (component files deleted; `gear-birth.mp4` stays in `public/` unused or is deleted).
- SEO: per-page metadata, `LocalBusiness` JSON-LD (name, address ×2, phone, hours, rating), `sitemap.xml` + `robots.txt` via Next conventions.
- Build the redesign on branch `redesign`; Cloudflare Pages branch deployment serves as the owner's preview link. Merge to `master` only after owner approval.

## Out of scope

Custom domain, contact forms, CMS, analytics, watermark-free hero video (parked separately).
