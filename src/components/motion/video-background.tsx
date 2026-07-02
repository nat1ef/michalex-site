"use client";

import { useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!parallax) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.innerWidth < 768) return;
      const container = containerRef.current;
      const videoWrap = videoWrapRef.current;
      if (!container || !videoWrap) return;

      gsap.to(videoWrap, {
        yPercent: 22,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
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
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className="h-[115%] w-full scale-[1.05] object-cover object-center"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-background from-10% via-background/55 via-40% to-transparent to-100%" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/35" />
    </div>
  );
}
