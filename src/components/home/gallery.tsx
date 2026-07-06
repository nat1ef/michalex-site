import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { facilityBento } from "@/lib/content";

export function Gallery() {
  return (
    <section id="εργαστηριο" className="section-shell py-16 lg:py-20">
      <Reveal>
        <p className="eyebrow">Εργαστηριο</p>
        <h2 className="mt-2 text-[clamp(1.7rem,3.4vw,2.3rem)] font-bold tracking-[-0.02em]">
          Μέσα στο εργαστήριο
        </h2>
        <p className="mt-2 max-w-[60ch] text-muted-foreground">
          Πραγματικές δουλειές, φωτογραφημένες στον πάγκο — όχι φωτογραφίες
          αρχείου.
        </p>
      </Reveal>

      <div className="mt-9 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-4">
        {facilityBento.map((item, i) => (
          <Reveal key={item.id} delay={i * 60} className={item.span}>
            <figure className="relative h-full w-full overflow-hidden rounded-md border border-border">
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-band/85 to-transparent px-3 pb-2.5 pt-8">
                <span className="text-[12px] font-semibold text-band-foreground">
                  {item.label}
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-band-foreground/60">
                  {item.code}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
