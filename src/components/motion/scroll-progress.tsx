"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bar = barRef.current;
    if (!bar) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
      },
    });

    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-border/30">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-foreground/20 via-foreground to-foreground/20"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
