"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { SectionLabel } from "@/components/ui/section-label";
import { SplitText } from "@/components/motion/split-text";
import { facilityBento, siteConfig } from "@/lib/content";
import { sectionMeta } from "@/lib/sections";

export function BentoFacility() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const meta = sectionMeta.facility;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cells = gridRef.current?.querySelectorAll("[data-bento-cell]");
      if (!cells?.length) return;

      cells.forEach((cell, i) => {
        gsap.from(cell, {
          y: 100,
          opacity: 0,
          scale: 0.92,
          duration: 1.2,
          delay: i * 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cell,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="εργαστηριο"
      className="section-cinematic border-t border-border/30"
    >
      <div className="section-shell">
        <SectionLabel index={meta.index} title={meta.title} />
        <SplitText
          as="h2"
          className="mt-6 max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl"
        >
          Το εργαστήριο ως σύστημα ακρίβειας
        </SplitText>

        <div
          ref={gridRef}
          className="mt-10 grid auto-rows-[minmax(160px,auto)] grid-flow-dense grid-cols-2 gap-2 sm:mt-14 sm:auto-rows-[minmax(180px,auto)] sm:grid-cols-4 sm:gap-3 lg:mt-20"
        >
          {facilityBento.map((cell) => (
            <div
              key={cell.id}
              data-bento-cell
              className={`group relative min-h-[160px] overflow-hidden border border-border/40 bg-card/20 sm:min-h-[180px] ${cell.span}`}
            >
              {cell.type === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={cell.poster}
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={cell.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={cell.src}
                  alt={cell.alt}
                  fill
                  className="object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              )}

              <div className="grain-overlay absolute inset-0 z-10 opacity-30" />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

              <div className="relative z-30 flex h-full min-h-[180px] flex-col justify-end p-5 sm:p-6">
                <p className="telemetry-label text-copper/90">{cell.code}</p>
                <p className="mt-2 text-sm font-medium tracking-tight sm:text-base">
                  {cell.label}
                </p>
              </div>
            </div>
          ))}

          <div
            data-bento-cell
            className="col-span-2 row-span-1 flex flex-col justify-between border border-copper/30 bg-copper/5 p-6 sm:col-span-2 lg:col-span-2"
          >
            <p className="telemetry-label">ΚΑΣΤΟΡΙΑΣ 2</p>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {siteConfig.address}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{siteConfig.hours.weekdays}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
