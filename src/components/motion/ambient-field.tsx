"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/motion/animation-provider";

function GearRing({
  teeth,
  size,
  className,
}: {
  teeth: number;
  size: number;
  className?: string;
}) {
  const r = size / 2;
  const toothW = size * 0.014;
  const toothH = size * 0.045;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} fill="none" aria-hidden>
      <circle
        cx={r}
        cy={r}
        r={r - toothH - 6}
        stroke="currentColor"
        strokeWidth="1"
        className="text-foreground/10"
      />
      <circle
        cx={r}
        cy={r}
        r={r - toothH - 28}
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="3 10"
        className="text-copper/20"
      />
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (360 / teeth) * i;
        return (
          <rect
            key={i}
            x={r - toothW / 2}
            y={2}
            width={toothW}
            height={toothH}
            fill="currentColor"
            className="text-foreground/10"
            transform={`rotate(${angle} ${r} ${r})`}
          />
        );
      })}
    </svg>
  );
}

/** Continuous CSS/SVG ambient motion — scroll-linked gears, orbits, grid drift. */
export function AmbientField() {
  const layerRef = useRef<HTMLDivElement>(null);
  const gearARef = useRef<HTMLDivElement>(null);
  const gearBRef = useRef<HTMLDivElement>(null);

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

      if (gearARef.current) {
        gsap.to(gearARef.current, {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
      if (gearBRef.current) {
        gsap.to(gearBRef.current, {
          rotate: -320,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
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

      {/* Meshed gear pair — rotate opposite directions, driven by scroll progress */}
      <div
        ref={gearARef}
        className="absolute -bottom-[12%] -left-[16%] h-[min(85vw,620px)] w-[min(85vw,620px)] opacity-60 md:opacity-80"
      >
        <GearRing teeth={22} size={620} className="h-full w-full" />
      </div>
      <div
        ref={gearBRef}
        className="absolute -bottom-[6%] left-[24%] hidden h-[min(45vw,320px)] w-[min(45vw,320px)] opacity-70 sm:block"
      >
        <GearRing teeth={16} size={320} className="h-full w-full" />
      </div>

      <div className="ambient-particles absolute inset-0 opacity-40 md:opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,var(--background)_85%)]" />
    </div>
  );
}
