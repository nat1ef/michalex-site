"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

export const HEADER_SCROLL_OFFSET = -76;

export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function scrollToSection(href: string, lenis: Lenis | null) {
  const id = href.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset: HEADER_SCROLL_OFFSET,
      duration: 0.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + HEADER_SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}
