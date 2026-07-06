"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoFull } from "@/components/brand/logo";
import { pageNav, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="section-shell flex items-center gap-6 py-3">
        <Link href="/" aria-label="Αρχική" onClick={() => setOpen(false)}>
          <LogoFull />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 md:flex">
          {pageNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.phoneHref}
          className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_8px_18px_-8px_var(--accent-deep)] transition-colors hover:bg-accent-deep md:inline-flex"
        >
          ☎ {siteConfig.phone}
        </a>

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <a
            href={siteConfig.phoneHref}
            aria-label={`Κλήση ${siteConfig.phone}`}
            className="touch-target inline-flex items-center justify-center rounded-md bg-primary px-3 text-base font-bold text-primary-foreground"
          >
            ☎
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            onClick={() => setOpen((v) => !v)}
            className="touch-target inline-flex flex-col items-center justify-center gap-[5px] rounded-md border border-border bg-card px-3"
          >
            <span
              className={cn(
                "h-0.5 w-5 bg-foreground transition-transform",
                open && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn("h-0.5 w-5 bg-foreground", open && "opacity-0")}
            />
            <span
              className={cn(
                "h-0.5 w-5 bg-foreground transition-transform",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-card md:hidden">
          <ul className="section-shell flex flex-col py-2">
            {pageNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3.5 text-[15px] font-semibold last:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
