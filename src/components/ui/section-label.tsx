export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-4">
      <span className="inline-flex items-center font-semibold uppercase text-[11px] tracking-[1.5px] rounded-full px-3.5 py-1 bg-secondary border border-border text-primary">
        {children}
      </span>
    </div>
  );
}
