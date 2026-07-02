"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/motion/animation-provider";

/** Continuous CSS/SVG ambient motion — orbits, grid drift, technical marks. */
export function AmbientField() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !layerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
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
      {/* Drifting grid */}
      <div className="ambient-grid absolute -inset-[50%] opacity-[0.045]" />

      {/* Large orbit rings */}
      <div className="absolute -right-[18%] top-[8%] h-[min(90vw,720px)] w-[min(90vw,720px)] animate-orbit-slow">
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <circle
            cx="200"
            cy="200"
            r="198"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 12"
            className="text-foreground/20"
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

      <div className="absolute -left-[12%] bottom-[12%] h-[min(70vw,520px)] w-[min(70vw,520px)] animate-orbit-reverse">
        <svg viewBox="0 0 400 400" className="h-full w-full opacity-40" fill="none">
          <circle
            cx="200"
            cy="200"
            r="198"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeDasharray="8 16"
            className="text-foreground/15"
          />
        </svg>
      </div>

      {/* Crosshair marks */}
      <div className="absolute right-[12%] top-[22%] h-32 w-32 animate-drift opacity-30">
        <svg viewBox="0 0 128 128" className="h-full w-full" fill="none">
          <line x1="64" y1="0" x2="64" y2="128" stroke="currentColor" strokeWidth="0.5" className="text-foreground/30" />
          <line x1="0" y1="64" x2="128" y2="64" stroke="currentColor" strokeWidth="0.5" className="text-foreground/30" />
          <circle cx="64" cy="64" r="28" stroke="currentColor" strokeWidth="0.5" className="text-copper/40" />
        </svg>
      </div>

      <div className="absolute left-[8%] top-[38%] h-24 w-24 animate-drift-reverse opacity-25">
        <svg viewBox="0 0 96 96" className="h-full w-full animate-spin-slow" fill="none">
          <rect x="46" y="8" width="4" height="80" fill="currentColor" className="text-foreground/20" />
          <rect x="8" y="46" width="80" height="4" fill="currentColor" className="text-foreground/20" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="ambient-particles absolute inset-0 opacity-60" />
      <div className="scanlines absolute inset-0 opacity-[0.025]" />

      {/* Soft vignette so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,var(--background)_78%)]" />
    </div>
  );
}
