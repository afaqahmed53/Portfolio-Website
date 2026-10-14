export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-copper">
      <span className="text-muted">{index}</span>
      <span className="mx-2 text-line">/</span>
      {children}
    </p>
  );
}
