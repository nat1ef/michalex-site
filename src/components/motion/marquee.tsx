"use client";

import { marqueeItems } from "@/lib/sections";

function MarqueeRow({
  reverse = false,
  speed = 40,
}: {
  reverse?: boolean;
  speed?: number;
}) {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex w-max items-center ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-5 shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70 sm:mx-8 sm:text-[11px]"
          >
            {item}
            <span className="ml-5 text-foreground/20 sm:ml-8">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative border-y border-border/30 bg-background/50 backdrop-blur-md">
      <MarqueeRow speed={35} />
      <MarqueeRow reverse speed={42} />
    </div>
  );
}
