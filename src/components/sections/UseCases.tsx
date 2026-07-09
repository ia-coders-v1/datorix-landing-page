import { ShieldCheck, ClipboardCheck, Wrench } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

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
    <section id="use-cases" className="bg-background pt-24 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Use Cases</SectionLabel>
        <h2 className="font-bold text-center mb-16 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          Built for the teams who own the risk
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map(({ icon: Icon, persona, headline, points, featured }) => (
            <div
              key={persona}
              className={cn(
                "rounded-xl p-8 flex flex-col gap-5",
                featured ? "bg-primary border-none" : "bg-white border border-muted-soft card-hover"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    featured ? "bg-white/8" : "bg-accent-blue/8"
                  )}
                >
                  <Icon size={16} className="text-accent-blue" />
                </div>
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[1px]",
                    featured ? "text-muted-soft" : "text-muted-foreground"
                  )}
                >
                  {persona}
                </span>
              </div>

              <h3 className={cn("font-bold text-xl tracking-[-0.3px]", featured ? "text-white" : "text-primary")}>
                {headline}
              </h3>

              <ul className="flex flex-col gap-3">
                {points.map((p) => (
                  <li
                    key={p}
                    className={cn(
                      "text-sm leading-snug flex items-start gap-2",
                      featured ? "text-muted-soft" : "text-body"
                    )}
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-accent-blue" />
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
