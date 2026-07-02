"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/motion/animation-provider";

/** Continuous CSS/SVG ambient motion — orbits, grid drift, technical marks. */
export function AmbientField() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !layerRef.current) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
        yPercent: isMobile ? 8 : 12,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
    }, layerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[0] overflow-hidden"
    >
      <div className="ambient-grid absolute -inset-[50%] opacity-[0.035] md:opacity-[0.03]" />

      <div className="absolute -right-[18%] top-[8%] h-[min(90vw,720px)] w-[min(90vw,720px)] animate-orbit-slow opacity-70 md:opacity-100">
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <circle
            cx="200"
            cy="200"
            r="198"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 12"
            className="text-foreground/15"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="currentColor"
            strokeWidth="0.35"
            strokeDasharray="2 18"
            className="text-copper/25 animate-orbit-reverse"
          />
        </svg>
      </div>

      <div className="ambient-particles absolute inset-0 opacity-40 md:opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,var(--background)_85%)]" />
    </div>
  );
}
