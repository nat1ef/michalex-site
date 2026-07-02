"use client";

import { SectionLink } from "@/components/ui/section-link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { ViberButton } from "@/components/contact/viber-button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/content";
import { LogoFull } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  active: string;
};

export function MobileNav({ open, onOpenChange, active }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "border-border/60 bg-background/40 backdrop-blur-sm lg:hidden"
        )}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Μενού</span>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton
        className="w-full max-w-[min(100vw,22rem)] gap-0 border-l border-copper/25 bg-background p-0 sm:max-w-sm"
        overlayClassName="bg-black/75 backdrop-blur-md"
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-border/40 px-6 pb-5 pt-6">
            <LogoFull className="[&_span]:text-[10px]" />
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Μηχανουργείο · Αθήνα
            </p>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-copper/80">
              Πλοήγηση
            </p>
            <ul className="space-y-1">
              {navLinks.map((link, index) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;

                return (
                  <li key={link.href}>
                    <SectionLink
                      href={link.href}
                      onNavigate={() => onOpenChange(false)}
                      className={cn(
                        "group flex items-center gap-4 rounded-sm border border-transparent px-3 py-3.5 transition-colors",
                        isActive
                          ? "border-copper/30 bg-copper/10 text-foreground"
                          : "text-muted-foreground hover:border-border/50 hover:bg-foreground/[0.03] hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[10px] tabular-nums tracking-[0.2em]",
                          isActive ? "text-copper" : "text-copper/50"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium tracking-tight sm:text-base">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "ml-auto h-4 w-4 shrink-0 transition-all",
                          isActive
                            ? "text-copper"
                            : "opacity-0 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-60"
                        )}
                      />
                    </SectionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto space-y-3 border-t border-border/40 bg-foreground/[0.02] p-5">
            <div className="space-y-2 text-xs text-muted-foreground">
              {siteConfig.locations.map((location) => (
                <div key={location.id} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-copper/80" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-copper/70">
                      {location.label}
                    </p>
                    <p>{location.address}</p>
                  </div>
                </div>
              ))}
            </div>
            <ButtonLink
              href={siteConfig.phoneHref}
              className="w-full justify-center gap-2 rounded-none font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </ButtonLink>
            <ViberButton fullWidth label="Μήνυμα Viber" className="rounded-none" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
