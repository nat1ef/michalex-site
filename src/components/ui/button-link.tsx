import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonLinkProps = ButtonVariantProps &
  Omit<ComponentProps<typeof Link>, "className"> & {
    className?: string;
    external?: boolean;
  };

export function ButtonLink({
  className,
  variant,
  size,
  external,
  href,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (external || (typeof href === "string" && href.startsWith("http"))) {
    return (
      <a
        href={href as string}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...(props as ComponentProps<"a">)}
      >
        {children}
      </a>
    );
  }

  if (
    typeof href === "string" &&
    (href.startsWith("tel:") || href.startsWith("mailto:"))
  ) {
    return (
      <a href={href} className={classes} {...(props as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
