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
    <section style={{ backgroundColor: "#f1f5f9", paddingTop: 64, paddingBottom: 64, borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-8">
        <SectionLabel>Works with your existing database stack</SectionLabel>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {databases.map(({ name, detail }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl card-hover"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
            >
              <span className="font-semibold text-sm" style={{ color: "#0f2050", fontSize: 14 }}>
                {name}
              </span>
              <span style={{ color: "#94a3b8", fontSize: 11, fontFamily: "var(--font-jetbrains-mono)" }}>
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
