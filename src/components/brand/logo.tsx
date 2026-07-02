import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "mark" | "full";
};

function LogoMarkGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="34"
        height="34"
        rx="2.5"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      <path
        d="M27.5 1.5H34.5V8.5"
        stroke="var(--copper)"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
      <path
        d="M1.5 27.5V34.5H8.5"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="1"
        strokeLinecap="square"
      />

      <line
        x1="5"
        y1="29.25"
        x2="31"
        y2="29.25"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="0.75"
      />
      <line
        x1="10"
        y1="28.75"
        x2="10"
        y2="29.75"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="0.5"
      />
      <line
        x1="18"
        y1="28.75"
        x2="18"
        y2="29.75"
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeWidth="0.5"
      />
      <line
        x1="26"
        y1="28.75"
        x2="26"
        y2="29.75"
        stroke="var(--copper)"
        strokeOpacity="0.45"
        strokeWidth="0.5"
      />

      <line
        x1="18"
        y1="7.5"
        x2="18"
        y2="29.25"
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="0.5"
        strokeDasharray="1.5 2"
      />

      <path
        d="M21.5 10.5H27.5V15H25.5V22.5H21.5V10.5Z"
        stroke="currentColor"
        strokeOpacity="0.42"
        strokeWidth="1"
        strokeLinejoin="miter"
        fill="none"
      />
      <path
        d="M21.5 15H25.5"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="0.75"
      />
      <path
        d="M21.5 18.75H24.75"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="0.5"
      />

      <path
        d="M8.25 23.25L12.75 21.25L12.25 23.25L10.75 25.75Z"
        fill="var(--copper)"
        fillOpacity="0.92"
      />
      <path
        d="M10.75 21.5L12.75 20.75"
        stroke="var(--copper)"
        strokeWidth="1.35"
        strokeLinecap="square"
      />
      <circle cx="21.5" cy="15" r="0.85" fill="var(--copper)" fillOpacity="0.85" />
    </svg>
  );
}

function LogoMonogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-sans text-[15px] font-semibold leading-none tracking-[-0.04em]",
        className
      )}
    >
      <span className="text-foreground">Α</span>
      <span className="text-copper">Λ</span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative inline-flex aspect-square h-9 w-9 items-center justify-center",
        className
      )}
    >
      <LogoMarkGraphic className="absolute inset-0 h-full w-full text-foreground" />
      <LogoMonogram className="relative z-[1] text-[13px]" />
    </div>
  );
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="truncate font-sans text-[13px] font-semibold leading-none tracking-[0.14em] text-foreground">
          ΑΛΕΞΑΝΔΡΑΚΗΣ
        </span>
        <span className="font-mono text-[8.5px] leading-none tracking-[0.28em] text-muted-foreground">
          ΜΗΧΑΝΟΥΡΓΕΙΟ
        </span>
      </div>
    </div>
  );
}

export function Logo({ className, variant = "mark" }: LogoProps) {
  if (variant === "full") {
    return <LogoFull className={className} />;
  }
  return <LogoMark className={className} />;
}
