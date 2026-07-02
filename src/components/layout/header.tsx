"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/lib/content";
import { LogoFull, LogoMark } from "@/components/brand/logo";
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <div className="section-shell flex h-[4.5rem] items-center justify-between">
        <Link href="#αρχικη" className="group inline-flex items-center transition-opacity hover:opacity-90">
          <LogoMark className="h-9 w-9 sm:hidden" />
          <LogoFull className="hidden sm:flex" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {active === id && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-copper" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={siteConfig.phoneHref}
            variant="ghost"
            size="sm"
            className="hidden gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] sm:inline-flex"
          >
            {siteConfig.phone}
            <ArrowUpRight className="h-3 w-3" />
          </ButtonLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "lg:hidden"
              )}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Μενού</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-border/50 bg-background">
              <SheetHeader>
                <SheetTitle className="font-mono text-xs uppercase tracking-[0.2em]">
                  Μενού
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/30 py-4 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-foreground/70"
                  >
                    {link.label}
                  </Link>
                ))}
                <ButtonLink href={siteConfig.phoneHref} className="mt-6 gap-2">
                  <Phone className="h-4 w-4" />
                  Κλήση
                </ButtonLink>
                <ViberButton fullWidth label="Viber" className="mt-3" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
