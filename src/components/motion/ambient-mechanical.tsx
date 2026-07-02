"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/motion/animation-provider";

const MechanicalCanvas = dynamic(
  () =>
    import("@/components/motion/mechanical-scene").then((m) => m.MechanicalCanvas),
  { ssr: false }
);

export function AmbientMechanical() {
  const [show, setShow] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 480;
    setShow(!reduced && !mobile);
  }, []);

  useEffect(() => {
    if (!show || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden will-change-transform"
    >
      <MechanicalCanvas
        className="absolute -right-[5%] h-[115%] w-[min(100%,920px)] -translate-y-[4%] opacity-85 [mask-image:linear-gradient(to_left,transparent_0%,black_20%,black_80%,transparent_100%)]"
        cameraPosition={[0.5, 0, 7]}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50" />
    </div>
  );
}
