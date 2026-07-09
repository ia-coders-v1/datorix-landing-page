import { SectionLabel } from "@/components/ui/section-label";

const databases = [
  { name: "Oracle", detail: "11g – 21c" },
  { name: "EDB Postgres", detail: "Advanced Server" },
  { name: "MS SQL Server", detail: "2016 – 2022" },
  { name: "MySQL", detail: "5.7 – 8.x" },
  { name: "PostgreSQL", detail: "12 – 16" },
];

export default function Databases() {
  return (
    <section className="bg-secondary pt-16 pb-16 border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-8">
        <SectionLabel>Works with your existing database stack</SectionLabel>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {databases.map(({ name, detail }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl card-hover bg-white border border-border"
            >
              <span className="font-semibold text-sm text-primary">
                {name}
              </span>
              <span className="text-[11px] font-mono text-muted-soft">
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
