import { SectionLabel } from "@/components/ui/section-label";

const databases = [
  { name: "Oracle" },
  { name: "MS SQL Server" },
  { name: "MySQL" },
  { name: "PostgreSQL" },
];

export default function Databases() {
  return (
    <section className="bg-secondary pt-16 pb-16 border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-8">
        <SectionLabel>Works with your existing database stack</SectionLabel>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {databases.map(({ name }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl card-hover bg-surface-tonal"
            >
              <span className="font-semibold text-sm text-primary">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
