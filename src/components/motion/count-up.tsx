"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Τιμή προς εμφάνιση, π.χ. "4.9", "21+", "100%" — μετράει μόνο το αριθμητικό μέρος. */
  value?: string;
  /** Προαιρετικό: υπολογίζει την πραγματική τιμή στον browser του επισκέπτη
   * (π.χ. χρόνια εμπειρίας) αντί να τη «παγώνει» τη στιγμή του build. */
  computeValue?: () => string;
  duration?: number;
  className?: string;
};

function parseValue(raw: string) {
  const match = raw.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const trailing = match ? match[2] : raw;
  return { target, decimals, trailing };
}

function format(n: number, decimals: number) {
  return decimals ? n.toFixed(decimals) : String(Math.round(n));
}

export function CountUp({ value, computeValue, duration = 1400, className }: CountUpProps) {
  const staticParsed = parseValue(value ?? "0");
  const [display, setDisplay] = useState(() => format(0, staticParsed.decimals));
  const [trailing, setTrailing] = useState(staticParsed.trailing);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started.current) return;

    const { target, decimals, trailing: resolvedTrailing } = computeValue
      ? parseValue(computeValue())
      : staticParsed;
    if (computeValue) setTrailing(resolvedTrailing);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <span ref={ref}>
      <span className={className}>{display}</span>
      {trailing}
    </span>
  );
}
