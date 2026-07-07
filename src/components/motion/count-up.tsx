"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Τιμή προς εμφάνιση, π.χ. "4.9", "21+", "100%" — μετράει μόνο το αριθμητικό μέρος. */
  value: string;
  duration?: number;
  className?: string;
};

function format(n: number, decimals: number) {
  return decimals ? n.toFixed(decimals) : String(Math.round(n));
}

export function CountUp({ value, duration = 1400, className }: CountUpProps) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const trailing = match ? match[2] : value;

  const [display, setDisplay] = useState(() => format(0, decimals));
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      started.current = true;
      setDisplay(format(target, decimals));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue;
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(format(target * eased, decimals));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return (
    <span ref={ref}>
      <span className={className}>{display}</span>
      {trailing}
    </span>
  );
}
