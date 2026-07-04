"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import {
  Cog,
  Disc3,
  Factory,
  Ruler,
  Settings2,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { gsap } from "@/components/motion/animation-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { services, siteConfig } from "@/lib/content";

const iconMap = {
  cog: Cog,
  wrench: Wrench,
  disc: Disc3,
  settings: Settings2,
  ruler: Ruler,
  factory: Factory,
} as const;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card]", section);

      // As the next card arrives, the previous one recedes — but only in the
      // last short stretch right before handoff, so it stays readable while
      // it's still the card in focus.
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];
        gsap.to(card, {
          scale: 0.97,
          filter: "brightness(0.75)",
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 35%",
            end: "top top+=40",
            scrub: true,
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
      className="relative border-t border-border/30 py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="telemetry-label">
            <span className="text-copper/80">[</span> ΥΠΗΡΕΣΙΕΣ{" "}
            <span className="text-copper/80">]</span>
          </p>
          <h2 className="display-title mt-6">Τι κατασκευάζουμε</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Έξι βασικές κατηγορίες εργασιών — κάθε μία με τα δικά της κομμάτια,
            φωτογραφημένα στον πάγκο του εργαστηρίου.
          </p>
        </div>
      </div>

      <div className="section-shell mt-16">
        <div className="flex flex-col gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.title}
                data-deck-card
                className="sticky will-change-transform"
                style={{ top: `${96 + i * 14}px` }}
              >
                <article className="grid overflow-hidden border border-border/50 bg-card shadow-[0_-18px_50px_-30px_rgba(0,0,0,0.9)] lg:grid-cols-[1.1fr_1fr]">
                  <div className="flex flex-col justify-between p-8 sm:p-12">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-copper">
                          {service.code}
                        </span>
                        <Icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                      </div>
                      <h3 className="display-chapter mt-8 text-[clamp(1.8rem,4vw,3.4rem)]">
                        {service.title}
                      </h3>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-10">
                      <ButtonLink
                        href={siteConfig.phoneHref}
                        variant="outline"
                        className="gap-2 rounded-none px-6 font-mono text-[10px] uppercase tracking-[0.14em]"
                      >
                        Ρώτησέ μας
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </ButtonLink>
                    </div>
                  </div>

                  <div className="relative min-h-[240px] overflow-hidden border-t border-border/40 lg:min-h-[420px] lg:border-l lg:border-t-0">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-card/50" />
                    <span className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/80">
                      ΑΠΟ ΤΟΝ ΠΑΓΚΟ ΜΑΣ
                    </span>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
