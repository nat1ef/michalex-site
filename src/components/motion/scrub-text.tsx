"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { cn } from "@/lib/utils";

type ScrubTextProps = {
  children: string;
  className?: string;
  as?: "p" | "h2" | "h3";
};

export function ScrubText({ children, className, as: Tag = "p" }: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = children.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const spans = ref.current.querySelectorAll("[data-scrub-word]");
      gsap.fromTo(
        spans,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1.2,
          },
        }
      );
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {words.map((word, i) => (
        <span key={i}>
          <span data-scrub-word className="inline-block">
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
