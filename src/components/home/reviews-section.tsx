"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { reviews, siteConfig } from "@/lib/content";

// Ταχύτητα συνεχούς κύλισης, σε pixel/δευτερόλεπτο.
const SPEED_PX_PER_SEC = 55;

// Διπλασιασμένη λίστα — επιτρέπει στο carousel να κυλάει συνεχώς προς τα
// εμπρός χωρίς ποτέ να χρειάζεται ορατό άλμα πίσω στην αρχή.
const reviewsLoop = [...reviews, ...reviews];

export function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const activePointerId = useRef<number | null>(null);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  // track.scrollLeft rounds to whole pixels on every read/write, so
  // accumulating sub-pixel per-frame increments straight on it never
  // actually moves anything (each += reads back the same rounded value).
  // Keep the "true" position as a float here instead, and only ever
  // write the rounded result into scrollLeft.
  const positionRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    positionRef.current = track.scrollLeft;
    let lastTime: number | null = null;
    let rafId: number;

    const tick = (now: number) => {
      if (lastTime === null) lastTime = now;
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!pausedRef.current) {
        const oneSetWidth = track.scrollWidth / 2;
        positionRef.current += SPEED_PX_PER_SEC * dt;
        if (positionRef.current >= oneSetWidth) {
          positionRef.current -= oneSetWidth;
        }
        track.scrollLeft = positionRef.current;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const track = trackRef.current;
    if (track && activePointerId.current !== null) {
      try {
        track.releasePointerCapture(activePointerId.current);
      } catch {
        // ο δείκτης μπορεί να έχει ήδη απελευθερωθεί από τον browser
      }
      track.style.cursor = "grab";
      track.style.userSelect = "";
    }
    activePointerId.current = null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return; // η αφή έχει ήδη φυσικό swipe-scroll
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault(); // να μην ξεκινάει επιλογή κειμένου ενώ σέρνουμε
    draggingRef.current = true;
    pausedRef.current = true;
    activePointerId.current = e.pointerId;
    dragStartRef.current = { x: e.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
    track.style.cursor = "grabbing";
    track.style.userSelect = "none";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStartRef.current.x;
    const oneSetWidth = track.scrollWidth / 2;
    let next = dragStartRef.current.scrollLeft - dx;
    next = ((next % oneSetWidth) + oneSetWidth) % oneSetWidth;
    track.scrollLeft = next;
    positionRef.current = next;
  };

  return (
    <section id="κριτικες" className="border-y border-border bg-card">
      <div className="section-shell py-20 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div className="flex items-end gap-6">
              <p className="display-num text-[clamp(4rem,8vw,6rem)] leading-[0.85] text-foreground">
                {siteConfig.rating}
              </p>
              <div className="pb-1.5">
                <p
                  className="text-[19px] tracking-[3px] text-star"
                  aria-label="4.9 στα 5 αστέρια"
                >
                  ★★★★★
                </p>
                <p className="mt-1 text-[14px] text-muted-foreground">
                  {siteConfig.reviewCount}+ κριτικές πελατών στο Google
                </p>
              </div>
            </div>
            <a
              href={siteConfig.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-border bg-background px-5 py-3 text-[13.5px] font-bold transition-colors hover:border-primary hover:text-accent-deep"
            >
              Διαβάστε τις όλες στο Google →
            </a>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          onMouseEnter={pause}
          onMouseLeave={() => {
            endDrag();
            resume();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="mt-11 flex cursor-grab gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviewsLoop.map((review, i) => (
            <blockquote
              key={`${review.author}-${i}`}
              aria-hidden={i >= reviews.length}
              className="relative flex h-full w-[280px] shrink-0 flex-col rounded-lg border border-border bg-background p-6 transition-shadow duration-300 hover:border-primary/40 hover:shadow-[0_18px_38px_-22px_rgb(28_39_51/0.35)] sm:w-[320px]"
            >
              <span
                aria-hidden
                className="display-num pointer-events-none absolute -top-1 right-4 text-[64px] text-primary/12"
              >
                &rdquo;
              </span>
              <p
                className="text-[13px] tracking-[2px] text-star"
                aria-label={`${review.rating} στα 5 αστέρια`}
              >
                {"★".repeat(review.rating)}
              </p>
              <p className="mt-3 flex-1 text-[14.5px] leading-relaxed">
                «{review.text}»
              </p>
              <footer className="mt-4 text-[12.5px] text-muted-foreground">
                <b className="text-foreground">{review.author}</b> ·{" "}
                {review.source}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
