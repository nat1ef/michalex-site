export const siteConfig = {
  name: "Μηχανουργείο Αλεξανδράκης",
  tagline: "Μηχανουργείο — Κατασκεύες ειδών μετάδοσης κίνησης και μηχανολογικών εξαρτημάτων",
  description:
    "Εργαστήριο κατασκευής μηχανημάτων στην Αθήνα. Δεκαετίες εμπειρίας σε τόρνο, φρέζα και custom μηχανουργικές κατασκευές.",
  heroVideo: "/videos/workshop-hero-loop.mp4",
  heroPoster: "/images/hero-loop-poster.jpg",
  heroLoopStart: 0,
  ogShareImage: "/images/og-share.jpg?v=3",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Καστοριάς+2,+Αθήνα+104+41",
  siteUrl: "https://michalex-site.pages.dev",
  phone: "210 522 2541",
  phoneHref: "tel:+302105222541",
  phoneInternational: "302105222541",
  viberNumber: "306907493500",
  viberMessage:
    "Καλησπέρα, θα ήθελα να ρωτήσω σχετικά με μηχανουργική εργασία.",
  viberHref:
    "https://viber.me/306907493500?text=%CE%9A%CE%B1%CE%BB%CE%B7%CF%83%CF%80%CE%AD%CF%81%CE%B1%2C%20%CE%B8%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%81%CF%89%CF%84%CE%AE%CF%83%CF%89%20%CF%83%CF%87%CE%B5%CF%84%CE%B9%CE%BA%CE%AC%20%CE%BC%CE%B5%20%CE%BC%CE%B7%CF%87%CE%B1%CE%BD%CE%BF%CF%85%CF%81%CE%B3%CE%B9%CE%BA%CE%AE%20%CE%B5%CF%81%CE%B3%CE%B1%CF%83%CE%AF%CE%B1.",
  viberDeepLink:
    "viber://chat?number=306907493500&text=%CE%9A%CE%B1%CE%BB%CE%B7%CF%83%CF%80%CE%AD%CF%81%CE%B1%2C%20%CE%B8%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%81%CF%89%CF%84%CEAE%CF%83%CF%89%20%CF%83%CF%87%CE%B5%CF%84%CE%B9%CE%BA%CE%AC%20%CE%BC%CE%B5%20%CE%BC%CE%B7%CF%87%CE%B1%CE%BD%CE%BF%CF%85%CF%81%CE%B3%CE%B9%CE%BA%CE%AE%20%CE%B5%CF%81%CE%B3%CE%B1%CF%83%CE%AF%CE%B1.",
  address: "Καστοριάς 2, Αθήνα 104 41",
  mapsUrl: "https://maps.google.com/?q=Καστοριάς+2,+Αθήνα+104+41",
  locations: [
    {
      id: "main",
      label: "Έδρα",
      address: "Καστοριάς 2, Αθήνα 104 41",
      mapsUrl: "https://maps.google.com/?q=Καστοριάς+2,+Αθήνα+104+41",
      embedQuery: "Καστοριάς+2,+Αθήνα+104+41",
    },
    {
      id: "branch",
      label: "Υποκατάστημα",
      address: "Αλικαρνασσού 102, Αθήνα 104 41",
      mapsUrl: "https://maps.google.com/?q=Αλικαρνασσού+102,+Αθήνα+104+41",
      embedQuery: "Αλικαρνασσού+102,+Αθήνα+104+41",
    },
  ] as const,
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
  {
    author: "Νίκος Κ.",
    rating: 5,
    text: "Έφτιαξαν γρανάζι που δεν βρίσκεις έτοιμο πουθενά. Άψογη ποιότητα, σωστές διαστάσεις και παράδοση στην ώρα της.",
    source: "Google",
  },
  {
    author: "Dimitris A.",
    rating: 5,
    text: "Πολύ καλή δουλειά σε φρεζάρισμα και τόρνευση. Επαγγελματίες με πείρα — τους εμπιστεύομαι χρόνια τώρα.",
    source: "Google",
  },
  {
    author: "Γιώργος Μ.",
    rating: 5,
    text: "Επισκευή άξονα σε πολύ καλή τιμή. Εξήγησαν ακριβώς τι χρειαζόταν και το αποτέλεσμα ήταν άριστο.",
    source: "Google",
  },
  {
    author: "Panagiotis V.",
    rating: 5,
    text: "Μικρό αλλά πολύ οργανωμένο εργαστήριο. Κατασκευή εξαρτήματος κατά σχέδιο χωρίς καθυστερήσεις.",
    source: "Google",
  },
  {
    author: "Ανδρέας Τ.",
    rating: 4,
    text: "Σοβαρή μηχανουργική δουλειά, σωστή συνεννόηση και καθαρό αποτέλεσμα. Το συνιστώ ανεπιφύλακτα.",
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
