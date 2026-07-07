"use client";

import { useSyncExternalStore } from "react";
import { yearsSinceFounding } from "@/lib/content";

// Δεν υπάρχει πραγματικό "event" να συνδρομήσουμε — η τιμή απλά διαφέρει
// μεταξύ server (build time) και client (ώρα επίσκεψης).
const noopSubscribe = () => () => {};

// Στατικό fallback ώστε server και client να ταιριάζουν στο πρώτο render
// (αποφυγή hydration mismatch)· το useSyncExternalStore διορθώνει αμέσως
// στη σωστή τιμή πριν το πρώτο paint, χωρίς να χρειάζεται νέο deploy κάθε χρόνο.
const INITIAL_YEARS = 43;

export function YearsExperience({ suffix = "+" }: { suffix?: string }) {
  const years = useSyncExternalStore(
    noopSubscribe,
    () => yearsSinceFounding(),
    () => INITIAL_YEARS
  );

  return (
    <>
      {years}
      {suffix}
    </>
  );
}
