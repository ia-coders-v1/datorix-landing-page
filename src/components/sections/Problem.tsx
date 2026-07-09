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
    <section id="problem" className="bg-background pt-24 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>The Problem</SectionLabel>
        <h2 className="font-bold text-center mb-16 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          Your database is your biggest
          <br />
          <span className="text-accent-blue">unmonitored attack surface.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl p-8 flex flex-col gap-4 card-hover bg-white border border-border"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-accent-blue/8">
                <Icon size={20} className="text-accent-blue" />
              </div>
              <h3 className="font-bold text-lg tracking-[-0.3px] text-primary">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-[15px]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
