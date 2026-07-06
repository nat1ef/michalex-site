import { ViberIcon } from "@/components/icons/viber-icon";
import { siteConfig } from "@/lib/content";

export function ContactBand() {
  return (
    <section id="επικοινωνια" className="grid bg-card lg:grid-cols-[1fr_1.1fr]">
      <div className="section-shell flex flex-col gap-5 py-14 lg:mx-0 lg:max-w-none lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pr-12">
        <div>
          <p className="eyebrow">Επικοινωνια</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.1rem)] font-bold tracking-[-0.02em]">
            Ελάτε ή καλέστε μας
          </h2>
        </div>

        <dl className="flex flex-col gap-4 text-[15px]">
          <div className="flex gap-4">
            <dt className="w-[110px] shrink-0 pt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              Τηλεφωνο
            </dt>
            <dd>
              <a
                href={siteConfig.phoneHref}
                className="text-[20px] font-bold hover:underline"
              >
                {siteConfig.phone}
              </a>
              <p className="text-[13px] text-muted-foreground">
                {siteConfig.hours.weekdays}
              </p>
            </dd>
          </div>
          {siteConfig.locations.map((loc) => (
            <div key={loc.id} className="flex gap-4">
              <dt className="w-[110px] shrink-0 pt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
                {loc.label}
              </dt>
              <dd>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {loc.address}
                </a>
              </dd>
            </div>
          ))}
          <div className="flex gap-4">
            <dt className="w-[110px] shrink-0 pt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-deep">
              Viber
            </dt>
            <dd>
              <a
                href={siteConfig.viberHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-viber hover:underline"
              >
                <ViberIcon className="h-4 w-4" />
                690 749 3500
              </a>
              <p className="text-[13px] text-muted-foreground">
                Στείλτε φωτογραφία του κομματιού — απαντάμε με τιμή.
              </p>
            </dd>
          </div>
        </dl>
      </div>

      <div className="min-h-[320px] border-t border-border lg:border-l lg:border-t-0">
        <iframe
          src={siteConfig.mapsEmbedUrl}
          title="Χάρτης — Μηχανουργείο Αλεξανδράκης, Καστοριάς 2, Αθήνα"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full min-h-[320px] w-full border-0"
        />
      </div>
    </section>
  );
}
