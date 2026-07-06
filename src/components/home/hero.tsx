import Image from "next/image";
import { ViberIcon } from "@/components/icons/viber-icon";
import { siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section className="mm-grid border-b border-border">
      <div className="section-shell grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div>
          <p className="eyebrow">Μηχανουργειο στην Αθηνα · 40+ χρονια</p>
          <h1 className="mt-4 text-balance text-[clamp(2.1rem,5.5vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.02em]">
            Γρανάζια &amp; εξαρτήματα{" "}
            <em className="not-italic text-primary">
              κατά σχέδιο ή δείγμα.
            </em>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[17px] text-muted-foreground">
            Στέλνετε σχέδιο, φωτογραφία ή δείγμα — σας λέμε τιμή και χρόνο
            παράδοσης. Τόρνος, φρέζα και κοπή οδοντώσεων στην Καστοριάς 2.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-md bg-primary px-6 py-3.5 text-[15px] font-bold text-primary-foreground shadow-[0_10px_22px_-10px_var(--accent-deep)] transition-colors hover:bg-accent-deep"
            >
              ☎ ΚΛΗΣΗ: {siteConfig.phone}
            </a>
            <a
              href={siteConfig.viberHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border-[1.5px] border-viber/60 bg-viber/5 px-5 py-3.5 text-[15px] font-bold text-viber transition-colors hover:bg-viber/10"
            >
              <ViberIcon className="h-4 w-4" />
              Μήνυμα στο Viber
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <li>
              <span className="text-star">★</span>{" "}
              <b className="text-foreground">4.9</b> στο Google (21+ κριτικές)
            </li>
            <li>
              <b className="text-foreground">40+</b> χρόνια εμπειρίας
            </li>
            <li>
              <b className="text-foreground">Αυθημερόν</b> προσφορά
            </li>
          </ul>
        </div>

        <figure className="corner-ticks relative">
          <Image
            src="/images/work/spline-shaft-machine.jpg"
            alt="Πολύσφηνος άξονας σε κατεργασία στο εργαστήριο"
            width={1200}
            height={1020}
            priority
            className="aspect-[4/3.4] w-full rounded-md object-cover"
          />
          <figcaption className="absolute bottom-3.5 left-3.5 rounded-sm bg-band/85 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-band-foreground">
            Εργαστηριο · Καστοριας 2
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
