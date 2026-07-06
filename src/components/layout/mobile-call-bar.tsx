import { ViberIcon } from "@/components/icons/viber-icon";
import { siteConfig } from "@/lib/content";

/** Μόνιμη μπάρα κλήσης στο κάτω μέρος της οθόνης — μόνο σε κινητά. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.5fr_1fr] border-t border-border md:hidden">
      <a
        href={siteConfig.phoneHref}
        className="flex items-center justify-center gap-2 bg-primary py-4 text-[15px] font-extrabold text-primary-foreground"
      >
        ☎ ΚΛΗΣΗ ΤΩΡΑ
      </a>
      <a
        href={siteConfig.viberHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-viber py-4 text-[15px] font-extrabold text-white"
      >
        <ViberIcon className="h-4 w-4" />
        Viber
      </a>
    </div>
  );
}
