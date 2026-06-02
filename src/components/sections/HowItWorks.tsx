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
    <section
      id="how-it-works"
      style={{
        backgroundColor: "#1a1a1a",
        paddingTop: 96,
        paddingBottom: 96,
        borderTop: "1px solid #2a2a2a",
        borderBottom: "1px solid #2a2a2a",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <p
          className="font-semibold uppercase tracking-widest mb-4 text-center"
          style={{ color: "#888888", fontSize: 12, letterSpacing: "1.5px" }}
        >
          How It Works
        </p>
        <h2
          className="font-bold text-center mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 40px)", letterSpacing: "-1.5px", color: "#ffffff" }}
        >
          From packet to compliance report
          <br />
          <span style={{ color: "#faff69" }}>in five steps.</span>
        </h2>

        {/* Desktop: 5-column grid. Mobile: stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              <div
                className="rounded-xl p-6 flex flex-col gap-3 h-full"
                style={{ backgroundColor: "#242424", border: "1px solid #2a2a2a" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                  style={{ backgroundColor: "#faff69", color: "#0a0a0a", fontSize: 12, fontWeight: 700 }}
                >
                  {step.number}
                </div>

                <h3 className="font-bold" style={{ fontSize: 18, letterSpacing: "-0.3px", color: "#ffffff" }}>
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed flex-1" style={{ color: "#cccccc", fontSize: 13 }}>
                  {step.description}
                </p>

                <p
                  className="text-xs"
                  style={{ color: "#5a5a5a", fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {step.detail}
                </p>
              </div>

              {/* Arrow connector — desktop only, between cards */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:flex absolute top-10 -right-3 z-10 items-center justify-center w-6 h-6 rounded-full"
                  style={{ backgroundColor: "#0a0a0a", border: "1px solid #2a2a2a" }}
                >
                  <span style={{ color: "#faff69", fontSize: 10 }}>›</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
