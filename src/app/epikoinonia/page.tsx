import type { Metadata } from "next";
import { ContactBand } from "@/components/home/contact-band";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Επικοινωνία — τηλέφωνο, διεύθυνση, ωράριο",
  description: `Μηχανουργείο Αλεξανδράκης: ${siteConfig.address} και Αλικαρνασσού 102. Τηλ: ${siteConfig.phone}, ${siteConfig.hours.weekdays}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="mm-grid border-b border-border">
        <div className="section-shell py-12 text-center lg:py-16">
          <p className="eyebrow">Επικοινωνια</p>
          <h1 className="mt-3 text-balance text-[clamp(1.9rem,4.5vw,3rem)] font-bold tracking-[-0.02em]">
            Πείτε μας τι χρειάζεστε — θα σας πούμε τιμή.
          </h1>
          <p className="mx-auto mt-3 max-w-[52ch] text-muted-foreground">
            Ένα τηλεφώνημα αρκεί. Αν έχετε το κομμάτι ή το σχέδιο μπροστά σας,
            ακόμα καλύτερα.
          </p>
          <a
            href={siteConfig.phoneHref}
            className="mt-7 inline-flex items-center gap-3 rounded-md bg-primary px-8 py-4 text-[18px] font-extrabold text-primary-foreground shadow-[0_12px_26px_-10px_var(--accent-deep)] transition-colors hover:bg-accent-deep"
          >
            ☎ {siteConfig.phone}
          </a>
          <p className="mt-3 text-[13px] text-muted-foreground">
            {siteConfig.hours.weekdays}
          </p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
