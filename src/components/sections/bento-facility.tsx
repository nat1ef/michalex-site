"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/motion/animation-provider";
import { facilityBento } from "@/lib/content";
import { cn } from "@/lib/utils";

function VideoTile({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      loop
      preload="metadata"
      poster={poster}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function BentoFacility() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", section);

      tiles.forEach((tile, i) => {
        const media = tile.querySelector("[data-tile-media]");

        gsap.fromTo(
          tile,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            delay: (i % 3) * 0.12,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: tile,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.22 },
            {
              scale: 1,
              duration: 1.5,
              delay: (i % 3) * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: tile,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="εργαστηριο"
      className="relative border-t border-border/30 py-24 sm:py-32"
    >
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="telemetry-label">
              <span className="text-copper/80">[</span> ΤΟ ΕΡΓΑΣΤΗΡΙΟ{" "}
              <span className="text-copper/80">]</span>
            </p>
            <h2 className="display-title mt-6">Μέσα στο μηχανουργείο</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Πραγματικές δουλειές, όχι στοκ φωτογραφίες — ό,τι βλέπεις εδώ
            κατασκευάστηκε στον πάγκο μας.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {facilityBento.map((tile) => (
            <div
              key={tile.id}
              data-tile
              className={cn(
                "group relative overflow-hidden border border-border/40 bg-card",
                tile.span
              )}
            >
              {tile.type === "video" ? (
                <div data-tile-media className="absolute inset-0 will-change-transform">
                  <VideoTile src={tile.src} poster={tile.poster} />
                </div>
              ) : (
                <div
                  data-tile-media
                  className="absolute inset-0 will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/90">
                  {tile.label}
                </span>
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-[0.2em]",
                    tile.type === "video" ? "text-copper" : "text-muted-foreground"
                  )}
                >
                  {tile.type === "video" && (
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-copper align-middle" />
                  )}
                  {tile.code}
                </span>
              </div>

              {/* Aspect placeholders to give the grid its shape */}
              <div
                className={cn(
                  "invisible",
                  tile.id === "video-main" ? "aspect-[4/3]" : "aspect-[4/3]"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
