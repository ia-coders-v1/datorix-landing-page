import { ShieldCheck, ClipboardCheck, Wrench } from "lucide-react";

const cases = [
  {
    icon: ShieldCheck,
    persona: "Security Engineer",
    headline: "Enhanced Security",
    points: [
      "Detect suspicious activities and prevent data breaches with real-time DPI monitoring",
      "Block SQL injection, privilege escalation, and direct DB connections at the wire level",
      "Correlate database events with your SIEM for unified threat hunting",
      "Forensic investigation tools to quickly identify root cause of any incident",
    ],
  },
  {
    icon: ClipboardCheck,
    persona: "Compliance Officer",
    headline: "Compliance Made Easy",
    points: [
      "Meet SOX, HIPAA, GDPR, and PCI-DSS requirements with complete, immutable audit trails",
      "Pre-built compliance dashboards — no manual evidence collection",
      "One-click report generation for auditors and regulators",
      "Tamper-proof log storage with SHA-256 integrity hashing",
    ],
    featured: true,
  },
  {
    icon: Wrench,
    persona: "DBA",
    headline: "Operational Efficiency",
    points: [
      "Monitor and manage all database activities with full transaction visibility",
      "Identify performance issues, full-table scans, and missing indexes in real time",
      "Per-user and per-application query fingerprinting — no more guessing",
      "Zero-change deployment — no schema migrations, no server-side agents",
    ],
  },
];

export default function UseCases() {
  return (
    <section
      id="use-cases"
      style={{ backgroundColor: "#0a0a0a", paddingTop: 96, paddingBottom: 96 }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <p
          className="font-semibold uppercase tracking-widest mb-4 text-center"
          style={{ color: "#888888", fontSize: 12, letterSpacing: "1.5px" }}
        >
          Use Cases
        </p>
        <h2
          className="font-bold text-center mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px", color: "#ffffff" }}
        >
          Built for the teams who own the risk
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map(({ icon: Icon, persona, headline, points, featured }) => (
            <div
              key={persona}
              className="rounded-xl p-8 flex flex-col gap-5"
              style={{
                backgroundColor: featured ? "#faff69" : "#1a1a1a",
                border: featured ? "none" : "1px solid #2a2a2a",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: featured ? "#0a0a0a22" : "#faff6914" }}
                >
                  <Icon size={16} style={{ color: featured ? "#0a0a0a" : "#faff69" }} />
                </div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: featured ? "#0a0a0a" : "#888888", letterSpacing: "1px", fontSize: 11 }}
                >
                  {persona}
                </span>
              </div>

              <h3
                className="font-bold"
                style={{ fontSize: 20, letterSpacing: "-0.3px", color: featured ? "#0a0a0a" : "#ffffff" }}
              >
                {headline}
              </h3>

              <ul className="flex flex-col gap-3">
                {points.map((p) => (
                  <li
                    key={p}
                    className="text-sm leading-snug flex items-start gap-2"
                    style={{ color: featured ? "#1a1a1a" : "#cccccc", fontSize: 14 }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: featured ? "#0a0a0a" : "#faff69" }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
