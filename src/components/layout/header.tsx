"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLink } from "@/components/ui/section-link";
import { ButtonLink } from "@/components/ui/button-link";
import { navLinks, siteConfig } from "@/lib/content";
import { LogoFull, LogoMark } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(sectionIds[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <div className="section-shell flex h-16 items-center justify-between sm:h-[4.5rem]">
        <SectionLink
          href="#αρχικη"
          className="group inline-flex items-center transition-opacity hover:opacity-90"
        >
          <LogoMark className="h-9 w-9 sm:hidden" />
          <LogoFull className="hidden sm:flex" />
        </SectionLink>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <SectionLink
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  active === id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active === id && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-copper" />
                )}
              </SectionLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ButtonLink
            href={siteConfig.phoneHref}
            variant="ghost"
            size="sm"
            className="hidden gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] sm:inline-flex"
          >
            {siteConfig.phone}
            <ArrowUpRight className="h-3 w-3" />
          </ButtonLink>

          <MobileNav open={open} onOpenChange={setOpen} active={active} />
        </div>
      </div>
    </header>
  );
}
