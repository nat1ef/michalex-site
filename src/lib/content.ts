export const siteConfig = {
  name: "Μηχανουργείο Αλεξανδράκης",
  tagline: "Μηχανουργείο — Κατασκεύες ειδών μετάδοσης κίνησης και μηχανολογικών εξαρτημάτων",
  description:
    "Εργαστήριο κατασκευής μηχανημάτων στην Αθήνα. Δεκαετίες εμπειρίας σε τόρνο, φρέζα και custom μηχανουργικές κατασκευές.",
  heroVideo: "/videos/workshop-hero.mp4",
  heroPoster: "/images/workshop-gear-hobbing.jpg",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Καστοριάς+2,+Αθήνα+104+41",
  siteUrl: "https://michalex.gr",
  phone: "210 522 2541",
  phoneHref: "tel:+302105222541",
  phoneInternational: "302105222541",
  viberHref: "https://viber.me/302105222541",
  viberDeepLink: "viber://chat?number=302105222541",
  address: "Καστοριάς 2, Αθήνα 104 41",
  mapsUrl: "https://maps.google.com/?q=Καστοριάς+2,+Αθήνα+104+41",
  hours: {
    weekdays: "Δευτέρα – Παρασκευή: 07:30 – 16:00",
    saturday: "Σάββατο: Κλειστά",
    sunday: "Κυριακή: Κλειστά",
  },
  rating: 4.9,
  reviewCount: 21,
} as const;

export const navLinks = [
  { href: "#αρχικη", label: "Αρχική" },
  { href: "#υπηρεσιες", label: "Υπηρεσίες" },
  { href: "#εργαστηριο", label: "Εργαστήριο" },
  { href: "#κριτικες", label: "Κριτικές" },
  { href: "#επικοινωνια", label: "Επικοινωνία" },
] as const;

export const services = [
  {
    icon: "cog" as const,
    title: "Είδη μετάδοσης κίνησης",
    description:
      "Κατασκευή και επισκευή γραναζιών, άξονων, συμπλεκτών και μηχανισμών μετάδοσης κίνησης με ακρίβεια μικρού.",
  },
  {
    icon: "wrench" as const,
    title: "Μηχανολογικά εξαρτήματα",
    description:
      "Custom κατασκευές εξαρτημάτων κατά σχέδιο ή δείγμα — από πρωτότυπο μέχρι σειρά.",
  },
  {
    icon: "disc" as const,
    title: "Κόψιμο & τόρνευση άξονων",
    description:
      "Ακριβής κατεργασία άξονων κάθε διαμέτρου — κόψιμο, τόρνευση και finish σύμφωνα με τις προδιαγραφές σας.",
  },
  {
    icon: "settings" as const,
    title: "Τόρνος & Φρέζα",
    description:
      "Κλασική και σύγχρονη μηχανουργική κατεργασία — κόψιμο άξονα, τόρνευση, φρεζάρισμα, τρύπημα.",
  },
  {
    icon: "ruler" as const,
    title: "Μετρήσεις & ποιοτικός έλεγχος",
    description:
      "Ακριβείς διαστάσεις, έλεγχος tolerances και παράδοση που σέβεται τις προδιαγραφές σας.",
  },
  {
    icon: "factory" as const,
    title: "Επισκευές & ανακατασκευή",
    description:
      "Αναβίωση φθαρμένων ή κατεστραμμένων εξαρτημάτων — οικονομική λύση αντί για αντικατάσταση.",
  },
] as const;

export const stats = [
  { value: "4.9", label: "Βαθμολογία Google", suffix: "/5" },
  { value: "21+", label: "Κριτικές πελατών" },
  { value: "40+", label: "Χρόνια εμπειρίας" },
  { value: "100%", label: "Custom κατασκευές" },
] as const;

export const reviews = [
  {
    author: "Michail P.",
    rating: 5,
    text: "Άνθρωποι με γνώση και εμπειρία που προσφέρουν πολύ περισσότερα από το αναμενόμενο. Δεν συναντάς εύκολα τόσα χρόνια πείρας — ευχαριστούμε.",
    source: "Google",
  },
  {
    author: "Bill Ganos",
    rating: 5,
    text: "Τέλειο μηχανουργείο με υπέροχους και πρόσχαρους τεχνικούς. Φτιάχνουν ό,τι μηχανουργική εργασία χρειαστείς.",
    source: "Google",
  },
  {
    author: "Στεργίου Χ.",
    rating: 5,
    text: "Επαγγελματική δουλειά σε κόψιμο άξονα και ακριβή κατεργασία. Γρήγορη εξυπηρέτηση και σωστή τιμολόγηση.",
    source: "Google",
  },
] as const;

export const processChapters = [
  {
    id: "torneusis",
    code: "CH.01 / ΤΟΡΝΕΥΣΗ",
    title: "Άξονες & κυλινδρική ακρίβεια",
    description:
      "Κόψιμο, τόρνευση και finish άξονων κάθε διαμέτρου — από μονάδες μέχρι σειρές, με έλεγχο διαστάσεων και tolerances.",
    image: "/images/workshop-turned-part.jpg",
    imageAlt: "Κατεργασία άξονα — τόρνευση ακριβείας",
  },
  {
    id: "freza",
    code: "CH.02 / ΦΡΕΖΑ",
    title: "Φρεζάρισμα & μηχανολογικά εξαρτήματα",
    description:
      "Custom κατασκευές κατά σχέδιο ή δείγμα — πρωτότυπο, μικρές και μεγάλες σειρές με επαναληψιμότητα.",
    image: "/images/workshop-shafts.jpg",
    imageAlt: "Κατεργασμένοι άξονες και γρανάζια στο εργαστήριο",
  },
  {
    id: "metadosi",
    code: "CH.03 / ΜΕΤΑΔΟΣΗ",
    title: "Γρανάζια & μετάδοση κίνησης",
    description:
      "Κατασκευή και επισκευή γραναζιών, συμπλεκτών και μηχανισμών μετάδοσης — η ειδικότητα του εργαστηρίου.",
    image: "/images/workshop-gear-cutting.jpg",
    imageAlt: "Κοπή γραναζιών — κατεργασία μετάδοσης κίνησης",
  },
] as const;

export const facilityBento = [
  {
    id: "video-main",
    type: "video" as const,
    src: "/videos/workshop-process.mp4",
    poster: "/images/workshop-gear-hobbing.jpg",
    code: "LIVE / FEED",
    label: "Κατεργασία σε εξέλιξη",
    span: "col-span-2 row-span-2 min-h-[320px] sm:min-h-[420px]",
  },
  {
    id: "gears",
    type: "image" as const,
    src: "/images/workshop-gear-hobbing.jpg",
    alt: "Κοπή γραναζιού στο τόρνο — λεπτομέρεια κατεργασίας",
    code: "SYS / GR",
    label: "Γρανάζια",
    span: "col-span-1 row-span-1",
  },
  {
    id: "sparks",
    type: "image" as const,
    src: "/images/workshop-turned-part.jpg",
    alt: "Κατεργασμένος άξονας — τόρνευση",
    code: "SYS / TR",
    label: "Τόρνος",
    span: "col-span-1 row-span-1",
  },
  {
    id: "tools",
    type: "image" as const,
    src: "/images/workshop-stock.jpg",
    alt: "Ακατέργαστο υλικό και εργαστήριο",
    code: "SYS / TL",
    label: "Εργαλεία",
    span: "col-span-2 row-span-1 sm:col-span-1",
  },
  {
    id: "transmission",
    type: "image" as const,
    src: "/images/workshop-transmission.jpg",
    alt: "Μηχανισμός μετάδοσης — γρανάζια και άξονες",
    code: "SYS / MT",
    label: "Μετάδοση",
    span: "col-span-2 row-span-1 sm:col-span-1",
  },
] as const;

export const capabilities = [
  "Κόψιμο & τόρνευση άξονων",
  "Κατασκευή γραναζιών",
  "Φρεζάρισμα ακριβείας",
  "Τρύπημα & επιστρώσεις",
  "Επισκευή μηχανημάτων",
  "Κατασκευή κατά σχέδιο",
  "Μικρές & μεγάλες σειρές",
  "Συμβουλευτική μηχανολογική",
] as const;
