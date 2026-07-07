export const siteConfig = {
  name: "Μηχανουργείο Αλεξανδράκης",
  tagline: "Γρανάζια & μηχανολογικά εξαρτήματα κατά σχέδιο ή δείγμα",
  description:
    "Μηχανουργείο στην Αθήνα με 40+ χρόνια εμπειρίας. Κατασκευή γραναζιών παντός τύπου, εργασίες τόρνου και φρέζας, ειδικές κατασκευές και επισκευές — κατά σχέδιο ή δείγμα.",
  ogShareImage: "/images/share-preview.jpg",
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
    "viber://chat?number=306907493500&text=%CE%9A%CE%B1%CE%BB%CE%B7%CF%83%CF%80%CE%AD%CF%81%CE%B1%2C%20%CE%B8%CE%B1%20%CE%AE%CE%B8%CE%B5%CE%BB%CE%B1%20%CE%BD%CE%B1%20%CF%81%CF%89%CF%84%CE%AE%CF%83%CF%89%20%CF%83%CF%87%CE%B5%CF%84%CE%B9%CE%BA%CE%AC%20%CE%BC%CE%B5%20%CE%BC%CE%B7%CF%87%CE%B1%CE%BD%CE%BF%CF%85%CF%81%CE%B3%CE%B9%CE%BA%CE%AE%20%CE%B5%CF%81%CE%B3%CE%B1%CF%83%CE%AF%CE%B1.",
  address: "Καστοριάς 2, Αθήνα 104 41",
  mapsUrl: "https://maps.google.com/?q=Καστοριάς+2,+Αθήνα+104+41",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Καστοριάς+2,+Αθήνα+104+41&output=embed",
  locations: [
    {
      id: "main",
      label: "Έδρα",
      address: "Καστοριάς 2, Αθήνα 104 41",
      mapsUrl: "https://maps.google.com/?q=Καστοριάς+2,+Αθήνα+104+41",
    },
    {
      id: "branch",
      label: "Υποκατάστημα",
      address: "Αλικαρνασσού 102, Αθήνα 104 41",
      mapsUrl: "https://maps.google.com/?q=Αλικαρνασσού+102,+Αθήνα+104+41",
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

export const FOUNDING_YEAR = 1983;
// Η ακριβής ημέρα ίδρυσης δεν είναι γνωστή — 1η Ιανουαρίου χρησιμοποιείται
// ενδεικτικά ως "επέτειος", ώστε τα χρόνια εμπειρίας να ανανεώνονται σωστά
// κάθε χρόνο. Άλλαξε month/day αν μάθεις τη συγκεκριμένη ημερομηνία.
const FOUNDING_ANNIVERSARY = { month: 1, day: 1 } as const;

export function yearsSinceFounding(today: Date = new Date()): number {
  const anniversaryPassed =
    today.getMonth() + 1 > FOUNDING_ANNIVERSARY.month ||
    (today.getMonth() + 1 === FOUNDING_ANNIVERSARY.month &&
      today.getDate() >= FOUNDING_ANNIVERSARY.day);
  return today.getFullYear() - FOUNDING_YEAR - (anniversaryPassed ? 0 : 1);
}

export const pageNav = [
  { href: "/", label: "Αρχική" },
  { href: "/#υπηρεσιες", label: "Υπηρεσίες" },
  { href: "/#εργαστηριο", label: "Εργαστήριο" },
  { href: "/#κριτικες", label: "Κριτικές" },
  { href: "/epikoinonia", label: "Επικοινωνία" },
] as const;

export type ServiceCategory = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  cardText: string;
  lead: string;
  checklist: readonly string[];
  chips?: readonly string[];
  images: readonly [
    { src: string; alt: string },
    { src: string; alt: string },
  ];
  metaTitle: string;
  metaDescription: string;
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: "granazia",
    eyebrow: "Η ΕΙΔΙΚΟΤΗΤΑ ΜΑΣ",
    title: "Γρανάζια παντός τύπου",
    shortTitle: "Γρανάζια",
    cardText:
      "Κατασκευή από σχέδιο ή από το δείγμα σας — ακόμα κι όταν δεν βρίσκεται πουθενά έτοιμο.",
    lead: "Κατασκευάζουμε γρανάζια κατά σχέδιο ή από το φθαρμένο δείγμα σας — ακόμα κι όταν δεν υπάρχει πουθενά έτοιμο ανταλλακτικό. Κοπή οδοντώσεων με έλεγχο βήματος και συναρμογής πριν την παράδοση.",
    checklist: [
      "Ίσια (μετωπικά)",
      "Ελικοειδή",
      "Κωνικά",
      "Κορώνες",
      "Ατέρμονες",
      "Πολύσφηνα",
      "Αντίγραφο από δείγμα",
      "Μεμονωμένα ή σε σειρά",
    ],
    chips: ["Ίσια", "Ελικοειδή", "Κωνικά", "Κορώνες", "Ατέρμονες", "Πολύσφηνα"],
    images: [
      {
        src: "/images/work/gear-pile.jpg",
        alt: "Γρανάζια κάθε τύπου στο εργαστήριο",
      },
      {
        src: "/images/work/spur-gear-macro.jpg",
        alt: "Μετωπικό γρανάζι — λεπτομέρεια δοντιών",
      },
    ],
    metaTitle: "Κατασκευή γραναζιών Αθήνα — ίσια, ελικοειδή, κωνικά, κορώνες",
    metaDescription:
      "Κατασκευή και επισκευή γραναζιών στην Αθήνα: ίσια, ελικοειδή, κωνικά, κορώνες, ατέρμονες, πολύσφηνα. Κατά σχέδιο ή από δείγμα. Τηλ: 210 522 2541.",
  },
  {
    slug: "tornos",
    eyebrow: "ΤΟΡΝΟΣ",
    title: "Εργασίες τόρνου",
    shortTitle: "Τόρνος",
    cardText:
      "Άξονες, δαχτυλίδια, σπειρώματα, πατούρες — τόρνευση κάθε διαμέτρου στις διαστάσεις που χρειάζεστε.",
    lead: "Τόρνευση με ακρίβεια σε κάθε διάμετρο — από ένα κομμάτι μέχρι σειρά παραγωγής, πάντα στις διαστάσεις και τις ανοχές που ζητάει το σχέδιό σας.",
    checklist: [
      "Άξονες κάθε διαμέτρου",
      "Δαχτυλίδια & αποστάτες",
      "Σπειρώματα",
      "Πατούρες & έδρες",
      "Ειδικές κατασκευές στον τόρνο",
      "Μεμονωμένα ή σε σειρά",
    ],
    images: [
      {
        src: "/images/work/turning-lathe.jpg",
        alt: "Τόρνευση άξονα με γρέζια — κατεργασία σε εξέλιξη",
      },
      {
        src: "/images/work/brass-flange-lathe.jpg",
        alt: "Μπρούτζινη φλάντζα στο τσοκ του τόρνου",
      },
    ],
    metaTitle: "Εργασίες τόρνου Αθήνα — τόρνευση αξόνων & εξαρτημάτων",
    metaDescription:
      "Τόρνευση αξόνων, δαχτυλιδιών και εξαρτημάτων κάθε διαμέτρου στην Αθήνα. Σπειρώματα, πατούρες, ειδικές κατασκευές. Τηλ: 210 522 2541.",
  },
  {
    slug: "freza",
    eyebrow: "ΦΡΕΖΑ",
    title: "Εργασίες φρέζας",
    shortTitle: "Φρέζα",
    cardText:
      "Φρεζαρίσματα, σφηνόδρομοι, οδοντώσεις — κατεργασία ακριβείας σε κάθε υλικό.",
    lead: "Φρεζάρισμα ακριβείας για κάθε μηχανολογική ανάγκη — από σφηνόδρομους και οδοντώσεις μέχρι σύνθετες ειδικές κατασκευές κατά σχέδιο.",
    checklist: [
      "Φρεζαρίσματα κάθε τύπου",
      "Σφηνόδρομοι",
      "Κοπή οδοντώσεων",
      "Τρύπημα & κατεργασία επιφανειών",
      "Ειδικές κατασκευές στη φρέζα",
      "Κάθε κατεργάσιμο υλικό",
    ],
    images: [
      {
        src: "/images/work/shafts-array.jpg",
        alt: "Σειρά κατεργασμένων πολύσφηνων αξόνων",
      },
      {
        src: "/images/work/helical-gear-shaft.jpg",
        alt: "Ελικοειδές γρανάζι σε άξονα",
      },
    ],
    metaTitle: "Εργασίες φρέζας Αθήνα — φρεζαρίσματα & σφηνόδρομοι",
    metaDescription:
      "Φρεζαρίσματα ακριβείας στην Αθήνα: σφηνόδρομοι, οδοντώσεις, ειδικές κατασκευές κατά σχέδιο ή δείγμα. Τηλ: 210 522 2541.",
  },
  {
    slug: "eidikes-kataskeves",
    eyebrow: "ΕΙΔΙΚΕΣ ΚΑΤΑΣΚΕΥΕΣ",
    title: "Ειδικές κατασκευές & επισκευές",
    shortTitle: "Ειδικές κατασκευές",
    cardText:
      "Ό,τι δεν βρίσκεται έτοιμο: αντίγραφο από φθαρμένο κομμάτι, ανακατασκευή, μεμονωμένα ή σε σειρά.",
    lead: "Όταν το ανταλλακτικό δεν υπάρχει πια στην αγορά, το φτιάχνουμε: αντίγραφο από το φθαρμένο κομμάτι, ανακατασκευή μηχανισμών, ειδικές κατασκευές κατά σχέδιο — οικονομική λύση αντί για αντικατάσταση ολόκληρου μηχανήματος.",
    checklist: [
      "Αντίγραφο από φθαρμένο δείγμα",
      "Ανακατασκευή μηχανισμών",
      "Κατασκευή κατά σχέδιο",
      "Επισκευή αξόνων & γραναζιών",
      "Πρωτότυπα & μικρές σειρές",
      "Μελέτη μαζί σας πριν την κατασκευή",
    ],
    images: [
      {
        src: "/images/work/gearbox-repair.jpg",
        alt: "Ανακατασκευή κιβωτίου μετάδοσης",
      },
      {
        src: "/images/work/ring-gear-housing.jpg",
        alt: "Πλανητική κορώνα σε κέλυφος",
      },
    ],
    metaTitle: "Ειδικές κατασκευές & επισκευές μηχανημάτων Αθήνα",
    metaDescription:
      "Ειδικές μηχανουργικές κατασκευές και επισκευές στην Αθήνα. Αντίγραφο από φθαρμένο κομμάτι, ανακατασκευή, κατασκευή κατά σχέδιο. Τηλ: 210 522 2541.",
  },
] as const;

export const workSteps = [
  {
    n: "ΒΗΜΑ 1",
    title: "Στέλνετε ή φέρνετε",
    text: "Σχέδιο, φωτογραφία στο Viber ή το ίδιο το κομμάτι στο εργαστήριο.",
  },
  {
    n: "ΒΗΜΑ 2",
    title: "Παίρνετε προσφορά",
    text: "Τιμή και χρόνος παράδοσης — καθαρά, πριν ξεκινήσει οτιδήποτε.",
  },
  {
    n: "ΒΗΜΑ 3",
    title: "Παραλαμβάνετε",
    text: "Ελεγμένο κομμάτι στις διαστάσεις που συμφωνήσαμε.",
  },
] as const;

/**
 * Λογότυπα πελατών για το «Μας εμπιστεύονται».
 * ΠΡΟΣΟΧΗ: τα παρακάτω είναι ΕΝΔΕΙΚΤΙΚΑ (φανταστικές εταιρείες) για
 * επίδειξη. Αντικαθίστανται με πραγματικά μόνο αφού ο πελάτης δώσει
 * γραπτή έγκριση. Τα αρχεία μπαίνουν σε /public/images/clients/.
 * Το `href` είναι προαιρετικό — αν λείπει, το λογότυπο δεν είναι link.
 */
export const trustedBy: readonly {
  name: string;
  logo: string;
  href?: string;
}[] = [
  {
    name: "ΤΕΧΝΟΜΕΤΑΛ Α.Ε. (ενδεικτικό)",
    logo: "/images/clients/texnometal.svg",
    href: "https://example.com",
  },
  {
    name: "ΜΥΛΟΙ ΑΤΤΙΚΗΣ (ενδεικτικό)",
    logo: "/images/clients/myloi-attikis.svg",
    href: "https://example.com",
  },
  {
    name: "NAVAL ΕΠΙΣΚΕΥΑΣΤΙΚΗ (ενδεικτικό)",
    logo: "/images/clients/naval-episkevastiki.svg",
    href: "https://example.com",
  },
];

export const stats = [
  { value: "4.9", label: "Βαθμολογία Google", suffix: "/5" },
  { value: "21+", label: "Κριτικές πελατών" },
  { value: "43+", label: "Χρόνια εμπειρίας", dynamic: true },
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
] as const;

export const facilityBento = [
  {
    id: "video-main",
    type: "video" as const,
    src: "/videos/process-live.mp4",
    poster: "/images/work/hobbing-macro.jpg",
    code: "LIVE / FEED",
    label: "Κοπή γραναζιού σε εξέλιξη",
    span: "col-span-2 row-span-2 min-h-[320px] sm:min-h-[420px]",
  },
  {
    id: "gears",
    type: "image" as const,
    src: "/images/work/spur-gear-macro.jpg",
    alt: "Μετωπικό γρανάζι — λεπτομέρεια δοντιών",
    code: "SYS / GR",
    label: "Γρανάζια",
    span: "col-span-1 row-span-1",
  },
  {
    id: "ring",
    type: "image" as const,
    src: "/images/work/ring-gear-housing.jpg",
    alt: "Πλανητική κορώνα σε κέλυφος",
    code: "SYS / RG",
    label: "Κορώνες",
    span: "col-span-1 row-span-1",
  },
  {
    id: "stock",
    type: "image" as const,
    src: "/images/work/raw-stock.jpg",
    alt: "Πρώτη ύλη — ράβδοι χάλυβα",
    code: "SYS / ST",
    label: "Πρώτη ύλη",
    span: "col-span-2 row-span-1 sm:col-span-1",
  },
  {
    id: "helical",
    type: "image" as const,
    src: "/images/work/helical-gear-shaft.jpg",
    alt: "Ελικοειδές γρανάζι σε άξονα",
    code: "SYS / HX",
    label: "Ελικοειδή",
    span: "col-span-2 row-span-1 sm:col-span-1",
  },
] as const;
