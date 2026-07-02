"use client";

import { useEffect } from "react";
import { gsap } from "@/components/motion/animation-provider";

export function MagneticButtons() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced || window.innerWidth < 1024) return;

    const buttons = document.querySelectorAll<HTMLElement>(".magnetic-btn");

    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    buttons.forEach((el) => {
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.35,
          ease: "power2.out",
        });
      };
      const leave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      handlers.push({ el, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return null;
}
