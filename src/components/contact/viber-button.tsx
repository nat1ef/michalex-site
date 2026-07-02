"use client";

import { cn } from "@/lib/utils";
import { openViberChat } from "@/lib/viber";
import { ViberIcon } from "@/components/icons/viber-icon";
import { siteConfig } from "@/lib/content";

type ViberButtonProps = {
  className?: string;
  size?: "sm" | "default" | "lg";
  showLabel?: boolean;
  label?: string;
  fullWidth?: boolean;
};

const sizeClasses = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  default: "h-9 gap-2 px-4 text-sm",
  lg: "h-11 gap-2 px-5 text-base",
};

const iconSizes = {
  sm: "h-3.5 w-3.5",
  default: "h-4 w-4",
  lg: "h-5 w-5",
};

export function ViberButton({
  className,
  size = "default",
  showLabel = true,
  label = "Viber",
  fullWidth = false,
}: ViberButtonProps) {
  return (
    <a
      href={siteConfig.viberHref}
      onClick={(e) => {
        e.preventDefault();
        openViberChat();
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent font-medium whitespace-nowrap transition-all outline-none select-none",
        "bg-[#7360F2] text-white hover:bg-[#6654e0] active:translate-y-px",
        "focus-visible:ring-3 focus-visible:ring-[#7360F2]/40",
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      aria-label={`${label} — ${siteConfig.phone}`}
      rel="noopener noreferrer"
    >
      <ViberIcon className={iconSizes[size]} />
      {showLabel && label}
    </a>
  );
}
