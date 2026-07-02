"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Scale in on enter, darken + fade on exit — cinematic scroll. */
export function ImageReveal({ children, className }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      tl.fromTo(
        ref.current,
        { scale: 0.82, opacity: 0.4, filter: "brightness(0.6)" },
        { scale: 1, opacity: 1, filter: "brightness(1)", ease: "none" },
        0
      ).to(
        ref.current,
        { scale: 1.06, opacity: 0.35, filter: "brightness(0.45)", ease: "none" },
        0.65
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
