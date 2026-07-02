"use client";

import { createContext, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { LenisContext } from "@/lib/scroll-to-section";

gsap.registerPlugin(ScrollTrigger);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const instance = new Lenis({
      lerp: 0.085,
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15,
      syncTouch: true,
    });

    setLenis(instance);
    document.documentElement.classList.add("lenis");
    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis");
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export { gsap, ScrollTrigger };
