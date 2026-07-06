import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { facilityBento } from "@/lib/content";

export function Gallery() {
  return (
    <section id="εργαστηριο" className="section-shell py-20 lg:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 border-b-2 border-foreground pb-6">
          <h2 className="display-lg">Μέσα στο εργαστήριο</h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Πραγματικές δουλειές · Καστοριας 2
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-5 sm:auto-rows-[210px] sm:grid-cols-4">
        {facilityBento.map((item, i) => (
          <Reveal key={item.id} delay={i * 60} className={item.span}>
            <figure className="img-zoom relative h-full w-full overflow-hidden rounded-lg border border-border">
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
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-band/90 to-transparent px-4 pb-3 pt-10">
                <span className="text-[12.5px] font-bold text-band-foreground">
                  {item.label}
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-band-foreground/55">
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
