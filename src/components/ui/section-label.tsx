export function SectionLabel({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground ${className ?? ""}`}
    >
      <span className="text-foreground/30">(</span>
      {index}
      <span className="mx-2 text-foreground/20">·</span>
      {title}
      <span className="text-foreground/30">)</span>
    </p>
  );
}
