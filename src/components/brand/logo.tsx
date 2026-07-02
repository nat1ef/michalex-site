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
        rx="2"
        stroke="currentColor"
        strokeOpacity="0.2"
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
        strokeOpacity="0.14"
        strokeWidth="1"
        strokeLinecap="square"
      />

      <circle
        cx="26"
        cy="10"
        r="5.25"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="0.9"
      />
      <path
        d="M26 4.75V6.5M26 13.5V15.25M20.75 10H22.5M29.5 10H31.25M22.2 6.2L23.45 7.45M28.55 12.55L29.8 13.8M29.8 6.2L28.55 7.45M23.45 12.55L22.2 13.8"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="0.65"
        strokeLinecap="square"
      />
      <circle cx="26" cy="10" r="1.35" stroke="var(--copper)" strokeWidth="0.75" />

      <path
        d="M6 24.5H14.5V27.5H9.5V30.5H6V24.5Z"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="0.9"
        strokeLinejoin="miter"
      />
      <path d="M6 27.5H9.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.65" />
      <path
        d="M15.5 24.75L18.25 23.25L17.75 25.25L16.25 27.75Z"
        fill="var(--copper)"
        fillOpacity="0.9"
      />
      <path
        d="M16.25 22.75L18.25 22"
        stroke="var(--copper)"
        strokeWidth="1.25"
        strokeLinecap="square"
      />

      <line
        x1="5"
        y1="31.5"
        x2="31"
        y2="31.5"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="0.75"
      />
      <line x1="10" y1="31" x2="10" y2="32" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
      <line x1="18" y1="31" x2="18" y2="32" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
      <line x1="26" y1="31" x2="26" y2="32" stroke="var(--copper)" strokeOpacity="0.5" strokeWidth="0.5" />

      <circle cx="7.5" cy="7.5" r="0.65" fill="currentColor" fillOpacity="0.35" />
      <circle cx="31" cy="31" r="0.65" fill="currentColor" fillOpacity="0.2" />
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
