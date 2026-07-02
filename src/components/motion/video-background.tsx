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
  /** Hero / above-fold: keep playing, retry autoplay on mobile */
  priority?: boolean;
  loopStart?: number;
  crossfade?: number;
};

function armInlinePlayback(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
}

async function tryPlay(video: HTMLVideoElement) {
  armInlinePlayback(video);
  try {
    await video.play();
    return true;
  } catch {
    return false;
  }
}

function canUseLoopPoint(video: HTMLVideoElement, loopStart: number, crossfade: number) {
  return Boolean(video.duration && loopStart < video.duration - crossfade - 0.5);
}

function seekToLoopStart(video: HTMLVideoElement, loopStart: number, crossfade: number) {
  if (!canUseLoopPoint(video, loopStart, crossfade)) return;
  if (Math.abs(video.currentTime - loopStart) < 0.05) return;
  video.currentTime = loopStart;
}

async function prepareAtLoopStart(
  video: HTMLVideoElement,
  loopStart: number,
  crossfade: number
) {
  if (video.readyState < 1) {
    await new Promise<void>((resolve) => {
      video.addEventListener("loadedmetadata", () => resolve(), { once: true });
    });
  }

  if (!canUseLoopPoint(video, loopStart, crossfade)) return;

  if (Math.abs(video.currentTime - loopStart) < 0.05) return;

  await new Promise<void>((resolve) => {
    video.addEventListener("seeked", () => resolve(), { once: true });
    video.currentTime = loopStart;
  });
}

export function VideoBackground({
  src,
  poster,
  className,
  parallax = true,
  priority = false,
  loopStart = 0.6,
  crossfade = 0.55,
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<0 | 1>(0);
  const swappingRef = useRef(false);
  const srcWithFragment = `${src}#t=${loopStart}`;

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const videos = [videoA, videoB];
    videos.forEach(armInlinePlayback);

    const startPlayback = async () => {
      await prepareAtLoopStart(videoA, loopStart, crossfade);
      await tryPlay(videoA);
      await prepareAtLoopStart(videoB, loopStart, crossfade);
      videoB.pause();
    };

    void startPlayback();

    const unlock = () => {
      void startPlayback();
    };
    document.addEventListener("touchstart", unlock, { once: true, passive: true });
    document.addEventListener("click", unlock, { once: true });

    let observer: IntersectionObserver | undefined;
    if (!priority) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            videos.forEach((v) => void tryPlay(v));
          } else {
            videos.forEach((v) => v.pause());
          }
        },
        { threshold: 0.08 }
      );
      observer.observe(videoA);
    }

    const swapAtLoop = (current: HTMLVideoElement, next: HTMLVideoElement) => {
      if (swappingRef.current || !current.duration) return;
      if (current.duration - current.currentTime > crossfade) return;

      swappingRef.current = true;
      seekToLoopStart(next, loopStart, crossfade);
      void tryPlay(next);

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

    return () => {
      observer?.disconnect();
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("click", unlock);
      videoA.removeEventListener("timeupdate", onTimeUpdateA);
      videoB.removeEventListener("timeupdate", onTimeUpdateB);
    };
  }, [src, loopStart, crossfade, priority]);

  useGSAP(
    () => {
      if (!parallax) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const container = containerRef.current;
      const videoWrap = videoWrapRef.current;
      if (!container || !videoWrap) return;

      const isMobile = window.innerWidth < 768;

      gsap.to(videoWrap, {
        yPercent: isMobile ? 8 : 12,
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
          muted
          playsInline
          preload="auto"
          poster={poster}
          className={cn(videoClass, "opacity-100")}
        >
          <source src={srcWithFragment} type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          poster={poster}
          className={cn(videoClass, "opacity-0")}
          aria-hidden
        >
          <source src={srcWithFragment} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-background from-10% via-background/55 via-40% to-transparent to-100%" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/35" />
    </div>
  );
}
