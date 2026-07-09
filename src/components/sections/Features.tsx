"use client";

import { useState } from "react";
import { Shield, Eye, ShieldAlert, FileCode2, Cpu, Radio, GitBranch, DatabaseBackup, ClipboardList, Pickaxe, ShieldCheck, Bell, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "replication",
    label: "Replication",
    teaser: "Stream every committed change in real time",
    icon: GitBranch,
    headline: "Change Data Capture across every database",
    description:
      "Datorix taps native transaction logs — MySQL binlog, PostgreSQL WAL, Oracle redo, SQL Server CDC — to stream every committed change in real time. Log-based capture means no triggers, no schema changes, and zero load on the source database.",
    bullets: [
      "Log-based CDC — reads MySQL binlog, Postgres WAL, Oracle redo",
      "Real-time streaming of inserts, updates, and deletes",
      "No triggers, no schema changes, no source-DB load",
      "Replicate to warehouses, lakes, or standby databases",
    ],
    code: `-- CDC replication pipeline
SOURCE prod_mysql
  CAPTURE_FROM: binlog
  POSITION:    gtid_auto
  TABLES:      orders, payments, customers

SINK analytics_warehouse
  DELIVERY:    exactly_once
  LATENCY:     < 1s
  ON_SCHEMA_CHANGE: evolve`,
  },
  {
    id: "backup",
    label: "Backup",
    teaser: "Automated backup jobs with point-in-time recovery",
    icon: DatabaseBackup,
    headline: "Automated backup jobs for every database",
    description:
      "Datorix orchestrates native backup tooling — Oracle RMAN, MySQL/Postgres physical & logical dumps, SQL Server backup — on a schedule you control. Full and incremental jobs run hands-free, with verified, recoverable snapshots.",
    bullets: [
      "Native engines — Oracle RMAN, pg_basebackup, mysqldump",
      "Full, incremental, and differential backup jobs",
      "Point-in-time recovery from archived logs",
      "Automated verification and retention policies",
    ],
    code: `-- Backup job definition
JOB nightly_prod_oracle
  ENGINE:   rman
  TYPE:     incremental_level_1
  SCHEDULE: cron(0 2 * * *)
  TARGET:   prod-oracle-01

  RETENTION: 30_days
  VERIFY:    restore_test = true
  PITR:      enabled
  ENCRYPT:   aes_256`,
  },
  {
    id: "dpi",
    label: "DPI Technology",
    teaser: "Full packet capture at wire speed, zero schema changes",
    icon: Cpu,
    headline: "Deep Packet Inspection at wire speed",
    description:
      "Datorix uses Deep Packet Inspection to capture every byte of database traffic directly from the network layer. No agents, no schema changes, no application modifications — just complete, accurate capture.",
    bullets: [
      "Network-level packet capture — nothing is missed",
      "Supports encrypted and plain-text traffic",
      "Works with any database driver or client",
      "Minimal CPU overhead — designed for production",
    ],
    code: `-- DPI capture output (real-time)
[CAPTURE] src=app-01:52344 → prod-db:5432
[PROTO]   PostgreSQL v3 — Query message
[USER]    app_user  DB: production
[STMT]    SELECT * FROM transactions
          WHERE amount > 50000
[RISK]    score=0.78  flags=full_table_candidate
[ACTION]  ALERT → security-team`,
  },
  {
    id: "agentless",
    label: "Passive & Agentless",
    teaser: "Deploy alongside your DB — nothing installed on it",
    icon: Radio,
    headline: "Zero performance overhead",
    description:
      "No software to install on your database servers. Datorix operates completely passively — monitoring traffic without interfering with queries, connections, or database performance.",
    bullets: [
      "Nothing installed on the database server",
      "Transparent to applications and users",
      "No connection pool changes required",
      "Deploy in minutes, not days",
    ],
    code: `-- No changes needed on your DB server
DEPLOYMENT passive_mode
  CAPTURE_FROM: network_tap | span_port
  TARGET: prod-db-01.internal:5432
  MODE: read_only
  AGENT_REQUIRED: false
  SCHEMA_CHANGES: none
  DOWNTIME: none`,
  },
  {
    id: "audit",
    label: "Audit Trails",
    teaser: "Tamper-proof, immutable record of every query",
    icon: ClipboardList,
    headline: "Immutable record of every transaction",
    description:
      "Datorix captures the complete story of every database activity — Who, What, When, Where, and How. Audit logs are written to tamper-proof, immutable storage the moment they are captured.",
    bullets: [
      "Who: authenticated user and source IP",
      "What: full SQL statement, object name, operation type",
      "When: microsecond-precision timestamp",
      "Where: database, schema, table",
    ],
    code: `-- Audit log entry (immutable)
{
  "ts":        "2025-06-02T09:14:32.502Z",
  "user":      "admin",
  "src_ip":    "10.0.1.44",
  "db":        "production",
  "operation": "DDL",
  "stmt":      "DROP TABLE sessions",
  "risk":      0.99,
  "action":    "BLOCKED",
  "hash":      "sha256:a3f9..."
}`,
  },
  {
    id: "alerts",
    label: "Alerts & Notifications",
    teaser: "Instant Email, SMS, and SIEM alerts on violations",
    icon: Bell,
    headline: "Real-time Email & SMS on every violation",
    description:
      "Define policy rules and Datorix fires instant alerts the moment a violation occurs — via Email, SMS, or webhook to your existing SIEM or incident management platform.",
    bullets: [
      "Real-time Email and SMS notifications",
      "Webhook integration to any SIEM",
      "Configurable alert severity levels",
      "Alert suppression and deduplication",
    ],
    code: `-- Alert rule definition
RULE block_off_hours_admin
  MATCH:   user IN ('admin', 'dba')
  WHEN:    hour NOT BETWEEN 8 AND 18
  ACTION:  BLOCK + ALERT
  NOTIFY:
    - email: security@company.com
    - sms:   +60123456789
    - slack: #db-security
  SEVERITY: CRITICAL`,
  },
  {
    id: "mining",
    label: "Threat Intelligence",
    teaser: "Surface anomalies, PII leaks, and hidden patterns",
    icon: Pickaxe,
    headline: "Mine captured traffic for hidden patterns",
    description:
      "Datorix mines the full stream of captured queries and audit history to surface query trends, anomalous access, unused schema objects, and previously undiscovered sensitive data — turning raw traffic into actionable insight.",
    bullets: [
      "Query-pattern and access-trend analysis",
      "Anomaly detection across users and objects",
      "Sensitive-data discovery (PII / PHI / PCI)",
      "Schema-usage and dead-object insights",
    ],
    code: `-- Data mining job
MINE access_patterns
  OVER:    last_30_days
  GROUP_BY: user, table, operation

DETECT anomalies
  BASELINE: per_user_rolling_avg
  FLAG:     deviation > 3_sigma

CLASSIFY sensitive_columns
  MATCH:   pii, phi, pci
  OUTPUT:  data_map + risk_score`,
  },
  {
    id: "smartcontract",
    label: "Policy as Code",
    teaser: "Auto-enforce governance rules as smart contracts",
    icon: FileCode2,
    headline: "Policy-as-smart-contract enforcement",
    description:
      "Define database access and governance policies as smart contracts that auto-execute the instant a rule is breached — blocking, alerting, or quarantining with deterministic, tamper-proof enforcement and a fully versioned policy history.",
    bullets: [
      "Codify access & governance rules as contracts",
      "Deterministic auto-execution on every violation",
      "Block, alert, or quarantine with no human delay",
      "Tamper-proof, versioned policy history",
    ],
    code: `-- Policy smart contract
CONTRACT no_bulk_export v3
  ON:   SELECT WHERE row_count > 10000
  FROM: customers, payments

  ENFORCE:
    - BLOCK    query
    - ALERT    security-team
    - QUARANTINE session

  IMMUTABLE: true
  HASH:      sha256:7b41...`,
  },
  {
    id: "regtech",
    label: "Regulatory Technology",
    teaser: "Auto-generate SOX, HIPAA, GDPR, PCI-DSS evidence",
    icon: ShieldCheck,
    headline: "Automated regulatory compliance — SOX · HIPAA · GDPR · PCI-DSS",
    description:
      "Datorix's RegTech engine continuously enforces regulatory rules and auto-generates regulator-ready evidence and filings for the major frameworks — no manual evidence collection, no audit-season scramble.",
    bullets: [
      "PCI-DSS Section 10 access logging",
      "HIPAA minimum-necessary access tracking",
      "GDPR data-subject access reports",
      "SOX privileged-user change monitoring",
    ],
    code: `-- Generate compliance evidence
REPORT hipaa_minimum_necessary
  PERIOD:  last_90_days
  FILTER:  phi_tables = true
  INCLUDE: all_access_events
           privilege_escalations
           failed_authentications
  FORMAT:  pdf, json, csv
  SIGN:    sha256_tamper_proof`,
  },
];

const products = [
  {
    id: "protection",
    label: "Protection",
    icon: Shield,
    subtitle: "Replication & Backup",
    featureIds: ["replication", "backup"],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: Eye,
    subtitle: "User Activity & DPA",
    featureIds: ["dpi", "agentless", "audit"],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    icon: ShieldAlert,
    subtitle: "Alerts & Threat Intelligence",
    featureIds: ["alerts", "mining"],
  },
  {
    id: "smartcontract",
    label: "Smart Contract",
    icon: FileCode2,
    subtitle: "Policy as Code & RegTech",
    featureIds: ["smartcontract", "regtech"],
  },
];

export default function Features() {
  const [activeProduct, setActiveProduct] = useState("protection");
  const [activeFeature, setActiveFeature] = useState("replication");

  const handleProductChange = (productId: string) => {
    setActiveProduct(productId);
    const product = products.find((p) => p.id === productId)!;
    setActiveFeature(product.featureIds[0]);
  };

  const currentProduct = products.find((p) => p.id === activeProduct)!;
  const visibleFeatures = currentProduct.featureIds.map((id) => features.find((f) => f.id === id)!);
  const tab = features.find((f) => f.id === activeFeature)!;

  return (
    <section id="products" className="bg-background pt-24 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionLabel>Products</SectionLabel>
        <h2 className="font-bold text-center mb-12 text-[clamp(28px,3.5vw,40px)] tracking-[-1.5px] text-primary">
          One platform. Four powerful products.
        </h2>

        {/* Mobile: product pills (2×2) */}
        <div className="grid grid-cols-2 gap-3 mb-6 lg:hidden">
          {products.map((product) => {
            const Icon = product.icon;
            const isActive = product.id === activeProduct;
            return (
              <button
                key={product.id}
                onClick={() => handleProductChange(product.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-xl text-left cursor-pointer transition-all duration-150 border",
                  isActive ? "bg-primary border-primary" : "bg-white border-muted-soft card-hover"
                )}
              >
                <Icon size={16} className={cn("shrink-0", isActive ? "text-accent-blue" : "text-muted-soft")} />
                <span className={cn("text-sm font-medium", isActive ? "text-white" : "text-primary")}>
                  {product.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop: sidebar + content */}
        <div className="flex gap-8">
          {/* Left sidebar — desktop only */}
          <aside className="hidden lg:flex flex-col shrink-0 rounded-xl overflow-hidden self-start w-[220px] bg-white border border-muted-soft shadow-sm">
            {products.map((product, i) => {
              const Icon = product.icon;
              const isActive = product.id === activeProduct;
              return (
                <button
                  key={product.id}
                  onClick={() => handleProductChange(product.id)}
                  className={cn(
                    "flex items-start gap-3 px-5 py-5 text-left cursor-pointer transition-all duration-150 w-full border-l-[3px]",
                    isActive ? "bg-background border-l-accent-blue" : "bg-transparent border-l-transparent",
                    i < products.length - 1 ? "border-b border-b-secondary" : "border-b-0"
                  )}
                >
                  <Icon size={18} className={cn("mt-px shrink-0", isActive ? "text-accent-blue" : "text-muted-soft")} />
                  <div>
                    <div className={cn("text-sm font-semibold", isActive ? "text-primary" : "text-body")}>
                      {product.label}
                    </div>
                    <div className="text-xs mt-0.5 text-muted-soft">
                      {product.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Right: feature cards + detail panel */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Feature cards */}
            <div className={`grid gap-4 ${visibleFeatures.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {visibleFeatures.map((feature) => {
                const Icon = feature.icon;
                const isActive = feature.id === activeFeature;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      "rounded-xl p-5 flex flex-col gap-3 text-left cursor-pointer transition-all duration-150 border",
                      isActive
                        ? "bg-indigo-50 border-[1.5px] border-primary shadow-[0_2px_12px_rgba(15,32,80,0.08)]"
                        : "bg-white border-muted-soft card-hover"
                    )}
                  >
                    <Icon size={20} className={isActive ? "text-accent-blue" : "text-muted-soft"} />
                    <div>
                      <div className="text-sm font-semibold text-primary">
                        {feature.label}
                      </div>
                      <div className="text-xs mt-1 leading-relaxed text-muted-foreground">
                        {feature.teaser}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Info card */}
              <div className="rounded-xl p-8 flex flex-col gap-5 card-hover bg-white border border-muted-soft">
                <h3 className="font-bold text-[22px] tracking-[-0.5px] text-primary">
                  {tab.headline}
                </h3>
                <p className="text-sm leading-relaxed text-body text-[15px]">
                  {tab.description}
                </p>
                <ul className="flex flex-col gap-2 mt-1">
                  {tab.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-body">
                      <ArrowRight size={14} className="text-accent-blue shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code window */}
              <div className="rounded-xl overflow-hidden border bg-slate-800 border-slate-700">
                <div className="px-4 py-3 border-b flex items-center gap-2 bg-slate-700 border-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-rose" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald" />
                  <span className="ml-2 text-xs font-mono text-slate-500">
                    {tab.id}.conf
                  </span>
                </div>
                <pre className="p-6 text-xs leading-relaxed overflow-x-auto font-mono text-slate-400 whitespace-pre-wrap break-words">
                  {tab.code}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
