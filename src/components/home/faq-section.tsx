import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/content";

const faqs = [
  {
    q: "Χρειάζομαι τεχνικό σχέδιο για να φτιάξετε ένα κομμάτι;",
    a: "Όχι απαραίτητα. Δουλεύουμε το ίδιο καλά από σχέδιο, από φωτογραφία ή απευθείας από το φθαρμένο δείγμα — ακόμα κι όταν δεν υπάρχει πουθενά έτοιμο ανταλλακτικό.",
  },
  {
    q: "Πόσο γρήγορα θα μάθω τιμή;",
    a: "Αυθημερόν προσφορά, μόλις δούμε το κομμάτι, το σχέδιο ή μια φωτογραφία στο Viber.",
  },
  {
    q: "Αναλαμβάνετε και ένα μεμονωμένο κομμάτι, όχι μόνο σειρά παραγωγής;",
    a: "Ναι — φτιάχνουμε είτε ένα μονό ανταλλακτικό είτε μικρές και μεγάλες σειρές, ανάλογα με τη δουλειά.",
  },
  {
    q: "Τι υλικά κατεργάζεστε;",
    a: "Χάλυβα, μπρούντζο, αλουμίνιο και κάθε κατεργάσιμο υλικό, σε τόρνο, φρέζα και κοπή οδοντώσεων.",
  },
  {
    q: "Πώς σας στέλνω το κομμάτι ή το σχέδιο;",
    a: `Είτε το φέρνετε στο εργαστήριο (${siteConfig.address}), είτε στέλνετε φωτογραφία ή σχέδιο στο Viber στο ${siteConfig.viberNumber.replace(/^30/, "")}.`,
  },
  {
    q: "Έχετε δεύτερο σημείο εξυπηρέτησης;",
    a: `Ναι, εκτός από την έδρα μας έχουμε και υποκατάστημα στην ${siteConfig.locations[1].address}.`,
  },
];

export function FaqSection() {
  return (
    <section id="συχνες-ερωτησεις" className="section-shell py-20 lg:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 border-b-2 border-foreground pb-6">
          <h2 className="display-lg">Συχνές ερωτήσεις</h2>
          <p className="max-w-[42ch] text-[15px] text-muted-foreground">
            Αν κάτι δεν καλύπτεται εδώ, ένα τηλεφώνημα λύνει την απορία.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Accordion className="mt-4 max-w-[68ch]">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionPanel>{item.a}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
