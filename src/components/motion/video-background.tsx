"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/components/motion/animation-provider";
import { cn } from "@/lib/utils";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
  className?: string;
  parallax?: boolean;
};

export function VideoBackground({
  src,
  poster,
  className,
  parallax = true,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!parallax) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const container = containerRef.current;
      const videoWrap = videoWrapRef.current;
      if (!container || !videoWrap) return;

      gsap.to(videoWrap, {
        yPercent: 35,
        scale: 1.35,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          className="h-[120%] w-full scale-[1.08] object-cover object-center motion-safe:animate-[ken-burns_24s_ease-in-out_infinite_alternate]"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background from-15% via-background/75 via-45% to-transparent to-100%" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-background/55" />
      <div className="grain-overlay absolute inset-0" />
    </div>
  );
}
