"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { CountUp } from "@/components/motion/count-up";
import { stats, capabilities } from "@/lib/content";

function CapabilityMarquee() {
  const items = [...capabilities, ...capabilities];
  return (
    <div className="overflow-hidden border-y border-border/30 py-4">
      <div className="animate-marquee flex w-max items-center">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 shrink-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/80 sm:mx-10 sm:text-[11px]"
          >
            {item}
            <span className="ml-6 text-copper/50 sm:ml-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const parsed = stats.map((s) => {
  if ("suffix" in s && s.suffix === "/5")
    return { num: s.value, suffix: "/5", label: s.label };
  if (s.value.includes("+"))
    return { num: s.value.replace("+", ""), suffix: "+", label: s.label };
  if (s.value.includes("%"))
    return { num: s.value.replace("%", ""), suffix: "%", label: s.label };
  return { num: s.value, suffix: "", label: s.label };
});

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cells = gsap.utils.toArray<HTMLElement>("[data-stat]", section);
      gsap.from(cells, {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative border-t border-border/30">
      <CapabilityMarquee />

      <div className="section-shell py-24 sm:py-32">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {parsed.map((stat) => (
            <div key={stat.label} data-stat className="relative">
              <p className="display-number text-[clamp(3.6rem,8vw,6.5rem)] text-foreground">
                <CountUp value={stat.num} />
                {stat.suffix ? (
                  <span className="ml-1 text-[0.35em] text-copper">
                    {stat.suffix}
                  </span>
                ) : null}
              </p>
              <div className="mt-4 h-px w-10 bg-copper/60" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
