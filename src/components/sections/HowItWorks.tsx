import { SectionLabel } from "@/components/ui/section-label";

const steps = [
  {
    number: "01",
    title: "Capture",
    description:
      "An inline proxy, a network sensor and a read-only audit collector record database activity, with nothing installed on the database server.",
    detail: "Oracle, MS SQL Server, MySQL & PostgreSQL.",
  },
  {
    number: "02",
    title: "Protect",
    description:
      "The firewall checks each query against built-in and custom rules, then blocks it, alerts the team or logs it.",
    detail: "80+ SQL-injection patterns, live rule updates.",
  },
  {
    number: "03",
    title: "Record",
    description:
      "Every event is stored with who, what, when and where, in an append-only, tamper-evident audit trail.",
    detail: "Searchable by action, user and time.",
  },
  {
    number: "04",
    title: "Replicate",
    description:
      "Change data capture streams committed changes to another database, with table comparison to confirm both sides match.",
    detail: "PostgreSQL, MySQL and Oracle sources.",
  },
  {
    number: "05",
    title: "Back up",
    description:
      "Agents on Linux and Windows hosts back up chosen folders on a schedule to storage you control, and restore on demand.",
    detail: "Retention you set; restores are staged.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-secondary pt-24 pb-24 border-t border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>How It Works</SectionLabel>
        <h2 className="font-bold text-center mb-16 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          From first query to safe restore
          <br />
          <span className="text-accent-blue">in five steps.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              <div className="rounded-xl p-6 flex flex-col gap-3 h-full card-hover bg-surface-tonal">
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
