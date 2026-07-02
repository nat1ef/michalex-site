"use client";

import { SectionLabel } from "@/components/ui/section-label";
import { CountUpStat } from "@/components/motion/count-up";
import { SplitText, DrawLine } from "@/components/motion/split-text";
import { stats } from "@/lib/content";
import { sectionMeta } from "@/lib/sections";

export function Metrics() {
  const meta = sectionMeta.metrics;

  const parsed = stats.map((s) => {
    if ("suffix" in s && s.suffix === "/5") return { num: s.value, suffix: "/5", label: s.label };
    if (s.value.includes("+")) return { num: s.value.replace("+", ""), suffix: "+", label: s.label };
    if (s.value.includes("%")) return { num: s.value.replace("%", ""), suffix: "%", label: s.label };
    return { num: s.value, suffix: "", label: s.label };
  });

  return (
    <section className="section-cinematic border-t border-border/30 bg-foreground/[0.02]">
      <div className="section-shell">
        <SectionLabel index={meta.index} title={meta.title} />
        <SplitText
          as="h2"
          className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Αποτελέσματα που μιλούν από μόνα τους
        </SplitText>
        <DrawLine className="mt-10" />

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border/30 bg-border/30 sm:grid-cols-2 lg:grid-cols-4">
          {parsed.map((stat) => (
            <CountUpStat
              key={stat.label}
              value={stat.num}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
