"use client";

import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/layout/footer";

/**
 * Footer sits fixed behind the page at all times. The content wrapper above it
 * reserves exactly the footer's measured height as bottom margin, so scrolling
 * the last stretch of the page slides the content up and off, revealing the
 * footer that was always there underneath.
 */
export function FooterReveal({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const update = () => setFooterHeight(el.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="relative z-10 bg-background"
        style={{ marginBottom: footerHeight }}
      >
        {children}
      </div>
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        <Footer />
      </div>
    </div>
  );
}
