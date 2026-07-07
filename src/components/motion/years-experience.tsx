"use client";

import { useEffect, useState } from "react";
import { yearsSinceFounding } from "@/lib/content";

// Στατικό fallback ώστε server και client να ταιριάζουν στο πρώτο render
// (αποφυγή hydration mismatch) — διορθώνεται αμέσως στη σωστή τιμή μόλις
// φορτώσει η σελίδα στον επισκέπτη, χωρίς να χρειάζεται νέο deploy κάθε χρόνο.
const INITIAL_YEARS = 43;

export function YearsExperience({ suffix = "+" }: { suffix?: string }) {
  const [years, setYears] = useState(INITIAL_YEARS);

  useEffect(() => {
    setYears(yearsSinceFounding());
  }, []);

  return (
    <>
      {years}
      {suffix}
    </>
  );
}
