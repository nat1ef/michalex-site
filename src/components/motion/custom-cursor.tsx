"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/motion/animation-provider";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      gsap.set(dot, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });
      gsap.set(ring, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 });
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    const onEnter = () => gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.25 });
    const onLeave = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25 });

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-foreground/40 mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 rounded-full bg-foreground mix-blend-difference"
      />
    </>
  );
}
