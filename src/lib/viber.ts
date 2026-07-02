import { siteConfig } from "@/lib/content";

/** Opens Viber chat without leaving the website tab. */
export function openViberChat() {
  const { viberDeepLink } = siteConfig;

  if (typeof window === "undefined") return;

  const link = document.createElement("a");
  link.href = viberDeepLink;
  link.style.display = "none";
  link.setAttribute("aria-hidden", "true");
  document.body.appendChild(link);
  link.click();
  link.remove();
}
