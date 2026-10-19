type SectionHeadingProps = {
  title: string;
  label: string;
  id?: string;
};

export function SectionHeading({ title, label, id }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
      <h2
        id={id}
        className="scroll-mt-36 text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
      <p className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
        {label}
      </p>
    </div>
  );
}
