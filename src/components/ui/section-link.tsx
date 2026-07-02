"use client";

import type { ComponentProps } from "react";
import { useLenis, scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

type SectionLinkProps = ComponentProps<"a"> & {
  href: string;
  onNavigate?: () => void;
};

export function SectionLink({
  href,
  className,
  children,
  onNavigate,
  onClick,
  ...props
}: SectionLinkProps) {
  const lenis = useLenis();

  return (
    <a
      href={href}
      className={cn(className)}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(href, lenis);
        onNavigate?.();
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
