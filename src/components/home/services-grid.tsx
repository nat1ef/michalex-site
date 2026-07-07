import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { serviceCategories } from "@/lib/content";
import { cn } from "@/lib/utils";

const bentoSpans: Record<string, string> = {
  granazia: "lg:col-span-2",
  tornos: "",
  freza: "",
  "eidikes-kataskeves": "lg:col-span-2",
};

export function ServicesGrid() {
  return (
    <section id="υπηρεσιες" className="section-shell py-20 lg:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 border-b-2 border-foreground pb-6">
          <h2 className="display-lg">Τι κατασκευάζουμε</h2>
          <p className="max-w-[42ch] text-[15px] text-muted-foreground">
            Πρώτα τα γρανάζια — η ειδικότητά μας — και δίπλα ό,τι βγαίνει από
            τον τόρνο και τη φρέζα.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCategories.map((service, i) => {
          const isLarge = bentoSpans[service.slug] !== "";
          return (
            <Reveal
              key={service.slug}
              delay={i * 70}
              className={cn("h-full", bentoSpans[service.slug])}
            >
              <Link
                href={`/ypiresies/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-28px_rgb(28_39_51/0.55)]"
              >
                <div className="img-zoom relative">
                  <Image
                    src={service.images[0].src}
                    alt={service.images[0].alt}
                    width={1100}
                    height={640}
                    className={cn(
                      "w-full object-cover",
                      isLarge ? "aspect-[16/8]" : "aspect-[16/9.5]"
                    )}
                  />
                  <span className="absolute left-4 top-4 rounded-sm bg-band/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-band-foreground backdrop-blur-sm">
                    {service.eyebrow}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-2.5 p-6">
                  <h3
                    className="text-[clamp(1.25rem,1.8vw,1.55rem)] font-extrabold uppercase leading-none tracking-[-0.005em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground">
                    {service.cardText}
                  </p>
                  {service.chips && (
                    <ul className="mt-1 flex flex-wrap gap-1.5">
                      {service.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full border border-border bg-background px-3 py-1 text-[12px] font-semibold text-accent-deep"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="flex items-center gap-1.5 pt-3 text-[13.5px] font-bold text-accent-deep">
                    Δείτε περισσότερα
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
