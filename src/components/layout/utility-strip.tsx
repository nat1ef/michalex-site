import { siteConfig } from "@/lib/content";

export function UtilityStrip() {
  return (
    <div className="bg-band text-band-foreground/80">
      <div className="section-shell flex items-center justify-between gap-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]">
        <p className="truncate">
          <span className="hidden sm:inline">
            Καστοριάς 2 &amp; Αλικαρνασσού 102, Αθήνα
          </span>
          <span className="sm:hidden">Καστοριάς 2, Αθήνα</span>
        </p>
        <p className="flex shrink-0 items-center gap-3">
          <span className="hidden md:inline">ΔΕΥ–ΠΑΡ 07:30–16:00</span>
          <a
            href={siteConfig.phoneHref}
            className="font-semibold text-accent-bright hover:underline"
          >
            ☎ {siteConfig.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
