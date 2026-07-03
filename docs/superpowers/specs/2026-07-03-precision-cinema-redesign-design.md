# Precision Cinema — Redesign Μηχανουργείο Αλεξανδράκης

**Ημερομηνία:** 2026-07-03 · **Κατάσταση:** Εγκεκριμένο από τον ιδιοκτήτη

## Στόχος

Πλήρες δομικό και οπτικό redesign του one-page site με κινηματογραφικό, Apple-style
scrollytelling: συνεχές motion, pinned σκηνές, τεράστια τυπογραφία. Ίδιο χρωματικό
theme (σκούρο ατσάλι + χάλκινο accent). Αποκλειστική χρήση των πραγματικών
φωτογραφιών/videos του εργαστηρίου (φάκελος `_media_import`). Αφαίρεση κάθε
στοιχείου που «μυρίζει» AI slop (generic gradients, πανομοιότυπες glass κάρτες,
άψυχη τυπογραφία).

## Αποφάσεις

- **Δομή:** Cinematic Scrollytelling (επιλογή χρήστη έναντι Hybrid/Fluid Minimal).
- **Χρώματα:** Διατήρηση υπάρχοντος theme — background oklch(0.13 0.012 250),
  copper oklch(0.74 0.15 55), steel. Πιο πειθαρχημένη χρήση: copper μόνο ως σπίθα.
- **Τυπογραφία:** Αντικατάσταση του generic setup με διακριτό ζευγάρι με ελληνική
  υποστήριξη — condensed/display γραμματοσειρά για τίτλους + καθαρή sans για
  κείμενο + mono για τεχνικές ετικέτες. Όχι η default «AI» αισθητική.
- **Three.js:** Αφαιρείται (three, @react-three/*, ~600KB). Αντικαθίσταται από
  SVG γρανάζια δεμένα στο scroll — φθηνότερα και θεματικά ακριβέστερα.
- **Media:** Νέο hero loop από IMG_0100.MOV (4K HLG → 1080p SDR tonemap, seamless
  crossfade loop), LIVE tile από IMG_0099.MP4, 17 curated φωτογραφίες σε
  `public/images/work/`.

## Οι 9 σκηνές

1. **Preloader** — μετρητής ακριβείας «0.000→1.000 mm», άνοιγμα σαν ρολό. Μία φορά
   ανά session, ~1.2s, sessionStorage gate.
2. **Hero (pinned ~150vh)** — fullscreen video κοπής γραναζιού, τίτλος με
   char-stagger. Scroll: video συρρικνώνεται σε κάδρο με copper περίγραμμα,
   τίτλος διαλύεται.
3. **Statement (pinned scrub)** — λέξεις φωτίζονται μία-μία (opacity 0.15→1),
   copper highlights σε λέξεις-κλειδιά.
4. **Κεφάλαια CH.01-03 (pinned horizontal)** — ΤΟΡΝΕΥΣΗ/ΦΡΕΖΑ/ΜΕΤΑΔΟΣΗ, οριζόντιο
   scrub, εσωτερικό parallax, ράγα προόδου.
5. **Εργαστήριο Bento** — clip-path reveals, LIVE video tile, hover zoom.
6. **Υπηρεσίες (sticky deck)** — 6 κάρτες στοιβάζονται με scale/dim της
   προηγούμενης, εικόνα-chip από πραγματική δουλειά σε κάθε κάρτα.
7. **Metrics + Marquee** — count-up νούμερα, συνεχές marquee δυνατοτήτων.
8. **Reviews** — διπλό αντίθετο marquee, τεράστιο 4.9 count-up, Google badge.
9. **CTA + Contact + Footer reveal** — αντίστροφο zoom (κάδρο→fullbleed),
   μαγνητικά κουμπιά Viber/τηλεφώνου, footer αποκαλύπτεται πίσω από τη σελίδα
   με γιγάντιο outlined wordmark.

## Συνεχές motion

Lenis smooth scroll, custom cursor (desktop only), copper scroll progress, SVG
γρανάζι scroll-linked rotation, film grain overlay, marquees. Framer Motion για
micro-interactions, GSAP ScrollTrigger για σκηνές.

## Fallbacks

- `prefers-reduced-motion`: όλα τα pins/scrubs γίνονται απλά fades, video παύει.
- Mobile: pins με transform-only ιδιότητες, μικρότερες αποστάσεις scrub, sticky
  stack μέσω native CSS. Καμία σκηνή δεν μπλοκάρει το περιεχόμενο αν αποτύχει το JS.

## Τεχνικά

- Next.js 16 static export (αμετάβλητο), Cloudflare Pages hosting.
- Περιεχόμενο (κείμενα, τηλέφωνα, ώρες, reviews) παραμένει από `src/lib/content.ts`
  με μικρές βελτιώσεις διατύπωσης.
- SEO: διατήρηση metadata, JSON-LD, OG εικόνων.
- Deploy: push στο GitHub (`nat1ef/michalex-site`) → Cloudflare Pages
  (`michalex-site.pages.dev`).

## Κριτήρια επιτυχίας

- Καμία στατική «νεκρή» οθόνη σε όλο το scroll — πάντα κάτι κινείται διακριτικά.
- Lighthouse performance ≥ 85 σε desktop μετά το redesign (χωρίς three.js).
- Όλα τα visuals είναι πραγματικές φωτογραφίες του εργαστηρίου.
- Λειτουργεί σε κινητό χωρίς jank και χωρίς σπασμένα pins.
