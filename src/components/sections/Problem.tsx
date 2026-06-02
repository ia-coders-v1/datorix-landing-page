import { Eye, AlertTriangle, Ghost } from "lucide-react";

const problems = [
  {
    icon: Eye,
    title: "Unmonitored Queries",
    body:
      "Every login, query, schema change, and admin action goes unrecorded. One insider threat or compromised credential can exfiltrate your entire dataset — silently.",
  },
  {
    icon: AlertTriangle,
    title: "Compliance Gaps",
    body:
      "SOX, HIPAA, GDPR, and PCI-DSS all demand granular, immutable audit trails. Manual log reviews fail audits and expose you to severe regulatory fines.",
  },
  {
    icon: Ghost,
    title: "Bypass Blind Spots",
    body:
      "Application-level controls are powerless against direct database connections and stolen service accounts. Without wire-level visibility, attacks remain completely invisible.",
  },
];

export default function Problem() {
  return (
    <section id="problem" style={{ backgroundColor: "#121212", paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <p
          className="font-semibold uppercase tracking-widest mb-4 text-center"
          style={{ color: "#888888", fontSize: 12, letterSpacing: "1.5px" }}
        >
          The Problem
        </p>
        <h2
          className="font-bold text-center mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px", color: "#ffffff" }}
        >
          Your database is your biggest
          <br />
          <span style={{ color: "#faff69" }}>unmonitored attack surface.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl p-8 flex flex-col gap-4"
              style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#faff6914" }}
              >
                <Icon size={20} style={{ color: "#faff69" }} />
              </div>
              <h3 className="font-bold" style={{ fontSize: 18, letterSpacing: "-0.3px", color: "#ffffff" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#888888", fontSize: 15 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
