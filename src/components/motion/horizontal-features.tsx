"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";
import { capabilities } from "@/lib/content";

function CapabilityCard({
  cap,
  index,
  className,
}: {
  cap: string;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={`group flex shrink-0 flex-col justify-between border border-border/40 bg-background/60 p-8 backdrop-blur-md transition-all duration-500 hover:border-copper/40 hover:bg-background/80 sm:p-12 ${className ?? ""}`}
    >
      <span className="font-mono text-xs text-muted-foreground/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="mt-8 text-2xl font-medium leading-snug tracking-[-0.02em] sm:text-3xl">
        {cap}
      </p>
      <div className="mt-8 h-px w-12 bg-foreground/25 transition-all duration-700 group-hover:w-full" />
    </div>
  );
}

export function HorizontalFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      const mobileTrack = mobileTrackRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!track) return;
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

      mm.add("(max-width: 767px)", () => {
        if (!mobileTrack) return;
        const scrollWidth = Math.max(0, mobileTrack.scrollWidth - window.innerWidth);

        gsap.to(mobileTrack, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth * 0.9}`,
            pin: true,
            scrub: 0.9,
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
            <CapabilityCard
              key={cap}
              cap={cap}
              index={i}
              className="w-[min(88vw,380px)] sm:w-[420px]"
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden pb-16 md:hidden">
        <div ref={mobileTrackRef} className="flex w-max gap-3 px-4">
          {capabilities.map((cap, i) => (
            <CapabilityCard
              key={`mobile-${cap}`}
              cap={cap}
              index={i}
              className="w-[82vw] min-w-[280px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
