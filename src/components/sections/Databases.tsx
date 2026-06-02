const databases = [
  { name: "Oracle", detail: "11g – 21c" },
  { name: "EDB Postgres", detail: "Advanced Server" },
  { name: "MS SQL Server", detail: "2016 – 2022" },
  { name: "MySQL", detail: "5.7 – 8.x" },
  { name: "PostgreSQL", detail: "12 – 16" },
];

export default function Databases() {
  return (
    <section style={{ backgroundColor: "#0a0a0a", paddingTop: 64, paddingBottom: 64 }}>
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col items-center gap-8">
        <p
          className="font-semibold uppercase tracking-widest text-center"
          style={{ color: "#5a5a5a", fontSize: 12, letterSpacing: "1.5px" }}
        >
          Works with your existing database stack
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {databases.map(({ name, detail }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
            >
              <span className="font-semibold text-sm" style={{ color: "#ffffff", fontSize: 14 }}>
                {name}
              </span>
              <span style={{ color: "#5a5a5a", fontSize: 11, fontFamily: "var(--font-jetbrains-mono)" }}>
                {detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
