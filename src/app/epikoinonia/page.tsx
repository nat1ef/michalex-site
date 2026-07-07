import type { Metadata } from "next";
import Image from "next/image";
import { ContactBand } from "@/components/home/contact-band";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Επικοινωνία — τηλέφωνο, διεύθυνση, ωράριο",
  description: `Μηχανουργείο Αλεξανδράκης: ${siteConfig.address} και Αλικαρνασσού 102. Τηλ: ${siteConfig.phone}, ${siteConfig.hours.weekdays}.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/images/backdrops/workshop-bokeh.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        </div>
        <div className="section-shell relative py-14 text-center lg:py-20">
          <p className="eyebrow">Επικοινωνια</p>
          <h1 className="display-xl mx-auto mt-4 max-w-[18ch] text-[clamp(2rem,4.6vw,3.4rem)]">
            Πείτε μας τι χρειάζεστε —{" "}
            <span className="text-primary">θα σας πούμε τιμή.</span>
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
