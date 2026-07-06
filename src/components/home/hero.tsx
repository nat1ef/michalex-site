import Image from "next/image";
import { ViberIcon } from "@/components/icons/viber-icon";
import { siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Backdrop: εργαστήριο σε bokeh, σβήνει προς το φόντο */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/backdrops/workshop-bokeh.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.38]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/78 to-background/30" />
        <div className="mm-grid absolute inset-0 opacity-70" />
      </div>

      <div className="section-shell relative grid items-center gap-12 py-16 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:py-24">
        <div>
          <p className="eyebrow hero-rise">
            Μηχανουργειο στην Αθηνα · 40+ χρονια
          </p>
          <h1 className="display-xl hero-rise mt-5 max-w-[13ch]">
            Γρανάζια &amp; εξαρτήματα{" "}
            <span className="text-primary">κατά σχέδιο ή δείγμα.</span>
          </h1>
          <p className="hero-rise-2 mt-6 max-w-[44ch] text-[17px] leading-relaxed text-muted-foreground">
            Στέλνετε σχέδιο, φωτογραφία ή δείγμα — σας λέμε τιμή και χρόνο
            παράδοσης. Τόρνος, φρέζα και κοπή οδοντώσεων στην Καστοριάς 2.
          </p>

          <div className="hero-rise-2 mt-8 flex flex-wrap items-center gap-4">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-3 rounded-md bg-primary px-7 py-4 text-[16px] font-bold text-primary-foreground shadow-[0_14px_30px_-12px_var(--accent-deep)] transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-[0_18px_34px_-12px_var(--accent-deep)]"
            >
              ☎ ΚΛΗΣΗ: {siteConfig.phone}
            </a>
            <a
              href={siteConfig.viberHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-md border-[1.5px] border-viber/50 bg-card/80 px-5 py-4 text-[15px] font-bold text-viber backdrop-blur transition-colors hover:bg-viber/10"
            >
              <ViberIcon className="h-4 w-4" />
              Μήνυμα στο Viber
            </a>
          </div>

          <ul className="hero-rise-3 mt-9 flex flex-wrap gap-x-7 gap-y-2.5 text-[13.5px] text-muted-foreground">
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

        {/* Σύνθεση φωτογραφιών με βάθος */}
        <div className="hero-rise-3 relative mx-auto w-full max-w-[560px] pb-14 pr-4 lg:pb-16">
          <figure className="corner-ticks relative">
            <Image
              src="/images/work/spline-shaft-machine.jpg"
              alt="Πολύσφηνος άξονας σε κατεργασία στο εργαστήριο"
              width={1200}
              height={980}
              priority
              className="aspect-[4/3.3] w-full rounded-md object-cover shadow-[0_30px_60px_-30px_rgb(28_39_51/0.55)]"
            />
            <figcaption className="absolute left-4 top-4 rounded-sm bg-band/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-band-foreground backdrop-blur-sm">
              Εργαστηριο · Καστοριας 2
            </figcaption>
          </figure>

          <figure className="absolute -bottom-0 left-0 hidden w-[46%] -translate-x-6 sm:block">
            <Image
              src="/images/work/gears-pair-brass.jpg"
              alt="Ατσάλινο και μπρούτζινο γρανάζι — έτοιμη δουλειά"
              width={620}
              height={430}
              className="aspect-[16/10.5] w-full rounded-md border-4 border-background object-cover shadow-[0_24px_45px_-22px_rgb(28_39_51/0.6)]"
            />
          </figure>

          <div className="absolute -right-1 top-6 rounded-md border border-border bg-card px-4 py-3 shadow-[0_18px_38px_-18px_rgb(28_39_51/0.5)]">
            <p className="display-num text-[30px] text-foreground">
              4.9<span className="text-[17px] text-star"> ★</span>
            </p>
            <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Google · 21 κριτικες
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
