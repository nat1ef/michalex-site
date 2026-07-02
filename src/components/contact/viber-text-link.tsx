"use client";

import { cn } from "@/lib/utils";
import { openViberChat } from "@/lib/viber";

type ViberTextLinkProps = {
  children: React.ReactNode;
  className?: string;
};

export function ViberTextLink({ children, className }: ViberTextLinkProps) {
  return (
    <button
      type="button"
      onClick={() => openViberChat()}
      className={cn("text-left text-[#7360F2] hover:underline", className)}
    >
      {children}
    </button>
  );
}
