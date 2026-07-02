"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";
import { capabilities } from "@/lib/content";

export function HorizontalFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const scrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-cinematic relative overflow-hidden border-t border-border/30 bg-foreground/[0.02]"
    >
      <div className="section-shell py-16 sm:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span className="text-foreground/30">(</span>
          Δυνατότητες
          <span className="text-foreground/30">)</span>
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Τι καλύπτουμε
        </h2>
      </div>

      <div className="hidden overflow-hidden pb-16 md:block sm:pb-24">
        <div
          ref={trackRef}
          className="flex w-max gap-4 px-5 sm:gap-6 sm:px-8 lg:px-12"
        >
          {capabilities.map((cap, i) => (
            <div
              key={cap}
              className="group flex w-[min(88vw,380px)] shrink-0 flex-col justify-between border border-border/40 bg-background/60 p-8 backdrop-blur-md transition-all duration-500 hover:border-copper/40 hover:bg-background/80 sm:w-[420px] sm:p-12"
            >
              <span className="font-mono text-xs text-muted-foreground/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-8 text-2xl font-medium leading-snug tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                {cap}
              </p>
              <div className="mt-8 h-px w-0 bg-foreground/40 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack fallback shown via md:hidden in track - actually track scrolls on desktop only, mobile shows grid */}
      <div className="section-shell grid gap-2 pb-16 md:hidden">
        {capabilities.map((cap) => (
          <div
            key={cap}
            className="border border-border/30 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            {cap}
          </div>
        ))}
      </div>
    </section>
  );
}
