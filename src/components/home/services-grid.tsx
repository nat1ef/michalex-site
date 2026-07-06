import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { serviceCategories } from "@/lib/content";

export function ServicesGrid() {
  return (
    <section id="υπηρεσιες" className="section-shell py-16 lg:py-20">
      <Reveal>
        <p className="eyebrow">Υπηρεσιες</p>
        <h2 className="mt-2 text-[clamp(1.7rem,3.4vw,2.3rem)] font-bold tracking-[-0.02em]">
          Τι κατασκευάζουμε
        </h2>
        <p className="mt-2 max-w-[60ch] text-muted-foreground">
          Πρώτα τα γρανάζια — η ειδικότητά μας — και δίπλα ό,τι βγαίνει από τον
          τόρνο και τη φρέζα.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-5 sm:grid-cols-2">
        {serviceCategories.map((service, i) => (
          <Reveal key={service.slug} delay={i * 70}>
            <Link
              href={`/ypiresies/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition-shadow hover:shadow-[0_18px_40px_-24px_rgb(28_39_51/0.45)]"
            >
              <Image
                src={service.images[0].src}
                alt={service.images[0].alt}
                width={900}
                height={530}
                className="aspect-[16/9.4] w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.2em] text-accent-deep">
                  {service.eyebrow}
                </p>
                <h3 className="text-[17px] font-bold">{service.title}</h3>
                <p className="text-[13.5px] text-muted-foreground">
                  {service.cardText}
                </p>
                {service.chips && (
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {service.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-border bg-background px-2.5 py-1 text-[11.5px] font-semibold text-accent-deep"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-auto pt-2 text-[13px] font-bold text-accent-deep group-hover:underline">
                  Δείτε περισσότερα →
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
