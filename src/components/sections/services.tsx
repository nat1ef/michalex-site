"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  Cog,
  Disc,
  Factory,
  Ruler,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";
import { SectionLabel } from "@/components/ui/section-label";
import { DrawLine, SplitText, RevealBlock } from "@/components/motion/split-text";
import { ScrubText } from "@/components/motion/scrub-text";
import { services } from "@/lib/content";
import { sectionMeta } from "@/lib/sections";

const iconMap: Record<(typeof services)[number]["icon"], LucideIcon> = {
  cog: Cog,
  wrench: Wrench,
  disc: Disc,
  settings: Settings,
  ruler: Ruler,
  factory: Factory,
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const meta = sectionMeta.services;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const pin = pinRef.current;
      const list = listRef.current;
      if (!section || !pin || !list) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${list.offsetHeight - pin.offsetHeight}`,
          pin: pin,
          pinSpacing: false,
          scrub: true,
        });
      });

      const rows = list.querySelectorAll("[data-service-row]");
      rows.forEach((row, i) => {
        gsap.from(row, {
          x: -120,
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.04,
        });

        gsap.to(row.querySelector("[data-service-title]"), {
          x: 12,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="υπηρεσιες"
      className="section-cinematic border-t border-border/30"
    >
      <div className="section-shell">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div ref={pinRef} className="lg:w-[38%] lg:shrink-0 lg:pt-8">
            <SectionLabel index={meta.index} title={meta.title} />
            <SplitText
              as="h2"
              className="mt-6 text-3xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-4xl lg:text-[3.25rem]"
            >
              Τεχνική εμπειρία σε κάθε κατεργασία
            </SplitText>
            <RevealBlock className="mt-8 hidden lg:block">
              <ScrubText className="text-lg leading-relaxed text-muted-foreground">
                Από είδη μετάδοσης κίνησης μέχρι custom μηχανολογικά εξαρτήματα —
                κάθε έργο αντιμετωπίζεται ως μοναδική μηχανολογική πρόκληση.
              </ScrubText>
            </RevealBlock>
          </div>

          <div ref={listRef} className="min-w-0 flex-1">
            <RevealBlock className="mb-10 lg:hidden">
              <p className="text-base leading-relaxed text-muted-foreground">
                Από είδη μετάδοσης κίνησης μέχρι custom μηχανολογικά εξαρτήματα —
                κάθε έργο αντιμετωπίζεται ως μοναδική μηχανολογική πρόκληση.
              </p>
            </RevealBlock>

            <DrawLine />

            <div className="divide-y divide-border/20">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon];
                return (
                  <article
                    key={service.title}
                    data-service-row
                    className="group grid gap-4 py-10 transition-colors duration-500 hover:bg-foreground/[0.04] sm:grid-cols-[4rem_1fr_1.2fr] sm:gap-8 sm:py-14"
                  >
                    <div className="flex items-start gap-3 sm:flex-col sm:gap-2">
                      <p className="font-mono text-xs text-muted-foreground/50">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <Icon className="h-4 w-4 text-copper transition-transform duration-700 group-hover:rotate-180" />
                    </div>
                    <h3
                      data-service-title
                      className="text-xl font-medium tracking-tight sm:text-2xl lg:text-[1.65rem]"
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/75 sm:text-base">
                      {service.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
