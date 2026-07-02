"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { cn } from "@/lib/utils";

function animateWords(
  targets: gsap.TweenTarget,
  opts: { delay?: number; scrollTrigger?: object }
) {
  gsap.from(targets, {
    yPercent: 115,
    opacity: 0,
    rotateX: -30,
    transformOrigin: "50% 100%",
    duration: 1.15,
    stagger: 0.07,
    delay: opts.delay ?? 0,
    ease: "power4.out",
    scrollTrigger: opts.scrollTrigger,
  });
}

type SplitTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "load" | "scroll";
  delay?: number;
};

export function SplitText({
  children,
  as: Tag = "h1",
  className,
  mode = "scroll",
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = children.split(/(\s+)/);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets = ref.current.querySelectorAll("[data-word]");

      if (mode === "load") {
        animateWords(targets, { delay });
      } else {
        animateWords(targets, {
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: ref, dependencies: [children, mode, delay] }
  );

  return (
    <Tag ref={ref as never} className={cn(className)} style={{ perspective: "900px" }}>
      {words.map((part, i) =>
        /^\s+$/.test(part) ? (
          part
        ) : (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block will-change-transform">
              {part}
            </span>
          </span>
        )
      )}
    </Tag>
  );
}

export function LoadReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(ref.current, {
        y: 70,
        opacity: 0,
        duration: 1.2,
        delay,
        ease: "power3.out",
      });
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealBlock({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(ref.current, {
        y: 90,
        opacity: 0,
        duration: 1.25,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(ref.current, {
        scaleX: 0,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("h-px origin-left bg-border/60", className)} />
  );
}

export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const lines = [
    { text: "Ακρίβεια", accent: false },
    { text: "χωρίς", accent: true },
    { text: "συμβιβασμούς", accent: false },
  ];

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = ref.current.querySelectorAll("[data-word]");
      gsap.from(words, {
        yPercent: 120,
        opacity: 0,
        rotateX: -35,
        transformOrigin: "50% 100%",
        duration: 1.2,
        stagger: 0.09,
        delay: 0.2,
        ease: "power4.out",
      });
    },
    { scope: ref }
  );

  return (
    <h1
      ref={ref}
      className="display-hero max-w-[min(100%,52rem)] font-semibold tracking-[-0.045em]"
      style={{ perspective: "1200px" }}
    >
      {lines.map((line, li) => (
        <span key={line.text} className={li > 0 ? "block" : "block"}>
          <span className="inline-block overflow-hidden">
            <span
              data-word
              className={cn(
                "inline-block will-change-transform",
                line.accent && "text-gradient-copper"
              )}
            >
              {line.text}
            </span>
          </span>
        </span>
      ))}
    </h1>
  );
}
