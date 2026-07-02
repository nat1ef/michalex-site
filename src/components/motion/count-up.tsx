"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";

export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
      if (Number.isNaN(numeric)) return;

      const obj = { val: 0 };
      const hasDecimal = value.includes(".");

      gsap.to(obj, {
        val: numeric,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          el.textContent = hasDecimal
            ? obj.val.toFixed(1)
            : Math.round(obj.val).toString();
        },
      });
    },
    { scope: ref, dependencies: [value] }
  );

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export function CountUpStat({
  value,
  suffix,
  label,
}: {
  value: string;
  suffix?: string;
  label: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cardRef.current;
    if (!el) return;

    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const displaySuffix = suffix ?? "";

  return (
    <div
      ref={cardRef}
      className="flex h-full flex-col justify-between bg-background/80 p-8 backdrop-blur-sm sm:p-10"
    >
      <p className="font-mono text-4xl font-medium tracking-tight sm:text-5xl">
        <CountUp value={value} suffix={displaySuffix} />
      </p>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
