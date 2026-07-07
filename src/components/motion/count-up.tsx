"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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

const noopSubscribe = () => () => {};

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

export function CountUp({ value, computeValue, duration = 1400, className }: CountUpProps) {
  const fallback = value ?? "0";
  // computeValue (αν υπάρχει) πρέπει να τρέξει μόνο στον client — το
  // useSyncExternalStore δίνει το ίδιο "fallback" σε server + πρώτο client
  // render (χωρίς hydration mismatch) και διορθώνει αμέσως πριν το paint.
  const resolvedValue = useSyncExternalStore(
    noopSubscribe,
    () => (computeValue ? computeValue() : fallback),
    () => fallback
  );
  const { target, decimals, trailing } = parseValue(resolvedValue);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const [animatedDisplay, setAnimatedDisplay] = useState(() => format(0, decimals));
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started.current || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || started.current) continue;
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedDisplay(format(target * eased, decimals));
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
  }, [target, decimals, duration, prefersReducedMotion]);

  const display = prefersReducedMotion ? format(target, decimals) : animatedDisplay;

  return (
    <span ref={ref}>
      <span className={className}>{display}</span>
      {trailing}
    </span>
  );
}
