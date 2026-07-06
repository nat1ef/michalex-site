import { ViberIcon } from "@/components/icons/viber-icon";
import { siteConfig } from "@/lib/content";

export function ContactBand() {
  return (
    <section
      id="επικοινωνια"
      className="texture-band grid text-band-foreground lg:grid-cols-[1fr_1.05fr]"
    >
      <div className="section-shell flex flex-col gap-6 py-16 lg:mx-0 lg:max-w-none lg:py-20 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-14">
        <h2 className="display-lg">
          Ελάτε ή <span className="text-accent-bright">καλέστε μας</span>
        </h2>

        <a
          href={siteConfig.phoneHref}
          className="display-num w-fit text-[clamp(2.1rem,4.4vw,3.2rem)] text-band-foreground transition-colors hover:text-accent-bright"
        >
          {siteConfig.phone}
        </a>
        <p className="-mt-4 text-[13.5px] text-band-foreground/60">
          {siteConfig.hours.weekdays}
        </p>

        <dl className="mt-2 flex flex-col gap-4 border-t border-band-foreground/12 pt-6 text-[15px]">
          {siteConfig.locations.map((loc) => (
            <div key={loc.id} className="flex gap-4">
              <dt className="w-[118px] shrink-0 pt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-bright">
                {loc.label}
              </dt>
              <dd>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-band-foreground/85 hover:text-band-foreground hover:underline"
                >
                  {loc.address}
                </a>
              </dd>
            </div>
          ))}
          <div className="flex gap-4">
            <dt className="w-[118px] shrink-0 pt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-bright">
              Viber
            </dt>
            <dd>
              <a
                href={siteConfig.viberHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-band-foreground/85 hover:text-band-foreground hover:underline"
              >
                <ViberIcon className="h-4 w-4" />
                690 749 3500
              </a>
              <p className="text-[13px] text-band-foreground/55">
                Στείλτε φωτογραφία του κομματιού — απαντάμε με τιμή.
              </p>
            </dd>
          </div>
        </dl>
      </div>

      <div className="min-h-[340px] border-t border-band-foreground/12 lg:border-l lg:border-t-0">
        <iframe
          src={siteConfig.mapsEmbedUrl}
          title="Χάρτης — Μηχανουργείο Αλεξανδράκης, Καστοριάς 2, Αθήνα"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full min-h-[340px] w-full border-0"
        />
      </div>
    </section>
  );
}
