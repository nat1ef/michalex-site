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
  /** Skip shaky intro frames before loop segment starts */
  loopStart?: number;
  /** Crossfade duration at loop seam (seconds) */
  crossfade?: number;
};

export function VideoBackground({
  src,
  poster,
  className,
  parallax = true,
  loopStart = 0.6,
  crossfade = 0.55,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<0 | 1>(0);
  const swappingRef = useRef(false);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const videos = [videoA, videoB];

    const prime = (video: HTMLVideoElement) => {
      const applyStart = () => {
        if (video.duration && loopStart < video.duration - crossfade - 0.5) {
          video.currentTime = loopStart;
        }
      };
      if (video.readyState >= 1) applyStart();
      else video.addEventListener("loadedmetadata", applyStart, { once: true });
    };

    videos.forEach(prime);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videos.forEach((v) => v.play().catch(() => undefined));
        } else {
          videos.forEach((v) => v.pause());
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(videoA);

    const swapAtLoop = (current: HTMLVideoElement, next: HTMLVideoElement) => {
      if (swappingRef.current || !current.duration) return;
      if (current.duration - current.currentTime > crossfade) return;

      swappingRef.current = true;
      next.currentTime = loopStart;
      next.play().catch(() => undefined);

      gsap.to(current, { opacity: 0, duration: crossfade, ease: "power1.inOut" });
      gsap.to(next, {
        opacity: 1,
        duration: crossfade,
        ease: "power1.inOut",
        onComplete: () => {
          current.pause();
          swappingRef.current = false;
        },
      });

      activeRef.current = activeRef.current === 0 ? 1 : 0;
    };

    const onTimeUpdateA = () => {
      if (activeRef.current !== 0) return;
      swapAtLoop(videoA, videoB);
    };
    const onTimeUpdateB = () => {
      if (activeRef.current !== 1) return;
      swapAtLoop(videoB, videoA);
    };

    videoA.addEventListener("timeupdate", onTimeUpdateA);
    videoB.addEventListener("timeupdate", onTimeUpdateB);

    videoA.play().catch(() => undefined);

    return () => {
      observer.disconnect();
      videoA.removeEventListener("timeupdate", onTimeUpdateA);
      videoB.removeEventListener("timeupdate", onTimeUpdateB);
    };
  }, [src, loopStart, crossfade]);

  useGSAP(
    () => {
      if (!parallax) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const container = containerRef.current;
      const videoWrap = videoWrapRef.current;
      if (!container || !videoWrap) return;

      const isMobile = window.innerWidth < 768;

      gsap.to(videoWrap, {
        yPercent: isMobile ? 10 : 14,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1.6,
        },
      });
    },
    { scope: containerRef }
  );

  const videoClass =
    "absolute inset-0 h-full w-full object-cover object-center";

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <div ref={videoWrapRef} className="absolute inset-0 scale-[1.03] will-change-transform">
        <video
          ref={videoARef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={poster}
          className={cn(videoClass, "opacity-100")}
        >
          <source src={src} type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          poster={poster}
          className={cn(videoClass, "opacity-0")}
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
