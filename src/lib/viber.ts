import { siteConfig } from "@/lib/content";

/** Opens Viber chat — deep link on mobile, viber.me on desktop. */
export function openViberChat() {
  const { viberDeepLink, viberHref } = siteConfig;

  if (typeof window === "undefined") return;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    const start = Date.now();
    window.location.href = viberDeepLink;

    // If Viber app didn't open within ~1.2s, fall back to viber.me
    setTimeout(() => {
      if (Date.now() - start < 1600) {
        window.location.href = viberHref;
      }
    }, 1200);
    return;
  }

  window.open(viberHref, "_blank", "noopener,noreferrer");
}
