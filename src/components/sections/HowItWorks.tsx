import { SectionLabel } from "@/components/ui/section-label";

const steps = [
  {
    number: "01",
    title: "Capture",
    description:
      "DPI captures all database traffic in real time — at the packet level, directly from the network. No agents required on the database server.",
    detail: "Supports Oracle, EDB, MS SQL, MySQL & PostgreSQL.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "Activities are parsed and enriched with full context: user identity, source IP, operation type, affected objects, and an automated risk score.",
    detail: "Sub-millisecond analysis. No latency added to queries.",
  },
  {
    number: "03",
    title: "Store",
    description:
      "Every event is written to secure, immutable, tamper-proof storage — preserving the complete audit trail for compliance and forensic investigations.",
    detail: "Immutable log format with SHA-256 integrity hashing.",
  },
  {
    number: "04",
    title: "Alert",
    description:
      "Real-time Email and SMS alerts fire the moment a policy violation or threat is detected. Integrate with your SIEM or incident management platform via webhook.",
    detail: "Configurable severity levels and alert suppression.",
  },
  {
    number: "05",
    title: "Report",
    description:
      "Comprehensive dashboards and one-click compliance reports for SOX, HIPAA, GDPR, and PCI-DSS — ready for auditors with no manual evidence collection.",
    detail: "Export as PDF, JSON, or CSV.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary pt-24 pb-24 border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>How It Works</SectionLabel>
        <h2 className="font-bold text-center mb-16 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          From packet to compliance report
          <br />
          <span className="text-accent-blue">in five steps.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              <div className="rounded-xl p-6 flex flex-col gap-3 h-full card-hover bg-white border border-border">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-accent-blue text-white">
                  {step.number}
                </div>

                <h3 className="font-bold text-lg tracking-[-0.3px] text-primary">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed flex-1 text-body text-[13px]">
                  {step.description}
                </p>

                <p className="text-xs font-mono text-muted-soft">
                  {step.detail}
                </p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-10 -right-3 z-10 items-center justify-center w-6 h-6 rounded-full bg-background border border-border">
                  <span className="text-accent-blue text-[10px]">›</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
