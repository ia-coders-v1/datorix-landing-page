import { Eye, AlertTriangle, Ghost } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";

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
    <section id="problem" style={{ backgroundColor: "#f8fafc", paddingTop: 96, paddingBottom: 96 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>The Problem</SectionLabel>
        <h2
          className="font-bold text-center mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px", color: "#0f2050" }}
        >
          Your database is your biggest
          <br />
          <span style={{ color: "#38bdf8" }}>unmonitored attack surface.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl p-8 flex flex-col gap-4 card-hover"
              style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#38bdf814" }}
              >
                <Icon size={20} style={{ color: "#38bdf8" }} />
              </div>
              <h3 className="font-bold" style={{ fontSize: 18, letterSpacing: "-0.3px", color: "#0f2050" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#64748b", fontSize: 15 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
