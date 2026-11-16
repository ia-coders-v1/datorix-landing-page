// Page copy; scripts/check-content.mjs fails when it drifts from Datorix-Website-Features.md.

export type Card = { title: string; body: string };

export type FeatureSection = {
  id: string;
  label: string;
  title: string;
  tagline: string;
  cards: Card[];
};

export type RoadmapBlock = {
  title: string;
  tagline: string;
  cards: Card[];
};

export const benefits: Card[] = [
  { title: "See everything", body: "Every query, from the app, from a DBA's laptop or from a login on the database host itself." },
  { title: "Stop the bad ones", body: "An inline firewall blocks dangerous SQL before it runs, not after the damage." },
  { title: "Move data safely", body: "Replicate databases in real time and back up files to storage you control." },
  { title: "Know your data", body: "Find sensitive columns, mask them, and see which users carry the most risk." },
];

export const featureSections: FeatureSection[] = [
  {
    id: "see",
    label: "Visibility",
    title: "See every query",
    tagline: "Complete visibility into what happens inside your databases, with nothing installed on them.",
    cards: [
      { title: "Live query stream", body: "Watch queries arrive in real time. Filter by user, source, level or time, and open any entry to read the full statement." },
      { title: "Three ways of seeing", body: "An inline proxy sees app traffic. A network sensor sees traffic that goes around the proxy. A credential-based audit collector, using a read-only database login, sees what the database itself logged, including a DBA working locally with no network traffic at all." },
      { title: "Bypass detection", body: "Know when someone connects straight to the database instead of through the approved path, and who they are." },
      { title: "Nothing on your database servers", body: "Datorix connects with a read-only login and reads the network. No agents or daemons on the database host, and no performance hit on it." },
      { title: "Query Explorer", body: "Search every captured query. See who ran it, from where, how long it took, how many rows it touched and whether it was blocked." },
      { title: "Throughput and latency", body: "Requests per second, latency percentiles (P50, P90, P99) and read/write IOPS, broken down per database." },
    ],
  },
  {
    id: "protect",
    label: "Protection",
    title: "Stop dangerous queries",
    tagline: "A database firewall that understands SQL, not just network ports.",
    cards: [
      { title: "Block, alert or log", body: "Pick the response for each rule. Block the query, let it run but alert the team, or just record it." },
      { title: "Built-in attack protection", body: "Ships with 80+ OWASP SQL-injection patterns plus obfuscation, time-based, error-based and stacked-query detection." },
      { title: "Guard your riskiest commands", body: "Stop DROP, TRUNCATE, GRANT and engine-specific dangers such as xp_cmdshell, UTL_FILE and LOAD_FILE." },
      { title: "Your own policies", body: "Write rules by user, IP, table, query pattern or time of day. Example: no bulk export from customer tables, and alert on finance logins after hours." },
      { title: "IP allow and block lists", body: "Decide exactly which addresses may connect, with rate limits against scrapers and brute force." },
      { title: "Change rules without downtime", body: "New and edited rules reach the proxy live. No restart and no dropped connections." },
    ],
  },
  {
    id: "data",
    label: "Data",
    title: "Know what your data is",
    tagline: "Find sensitive data, and show who touched it.",
    cards: [
      { title: "Automatic catalog", body: "Datorix reads each database's tables, columns, keys and indexes and keeps a browsable catalog. A failed scan never wipes the last good one." },
      { title: "Sensitive-data tagging", body: "Columns that look like PII, card data or health data are flagged for review, so protection starts with knowing where the data is." },
      { title: "Data masking", body: "Mask values fully or partially, hash them or tokenise them. Apply by role, and preview before and after." },
      { title: "User risk scores", body: "Each user gets a 0–100 risk score with the top reasons behind it and a timeline of their activity." },
      { title: "Anomaly spotting", body: "See spikes and unusual access patterns across users and objects, not just rule matches." },
      { title: "Threat monitor", body: "Injection attempts, brute force, privilege escalation and data exfiltration, with severity and detail for each." },
    ],
  },
  {
    id: "audit",
    label: "Audit",
    title: "Audit trail you can prove",
    tagline: "Evidence an auditor will accept.",
    cards: [
      { title: "Who, what, when, where", body: "Every event carries the user, source IP, full statement, object and a precise timestamp." },
      { title: "Tamper-evident storage", body: "Audit records are append-only and written to cryptographically verifiable storage, so they can't be quietly edited later." },
      { title: "Native engine audit trails", body: "Reads each engine's own audit log over a read-only SQL login. PostgreSQL is live; MySQL, SQL Server and Oracle are next." },
      { title: "Local-session visibility", body: "Events from sessions that never touch the network are marked as local. This is the DBA-on-the-server case that PCI-DSS 10.2 and SOX ask about." },
      { title: "Search and filter", body: "Slice the trail by action, user and time. Statistics follow whichever filters you set." },
      { title: "Open any record", body: "Click an event to see its full context: statement, user, source, object and the decision taken." },
    ],
  },
  {
    id: "replicate",
    label: "Replication",
    title: "Replicate in real time",
    tagline: "Data integration in real time: move changes between databases as they happen, with a record of every move.",
    cards: [
      { title: "Change data capture", body: "Reads the database's own transaction log. No triggers and no schema changes, and almost no load on the source." },
      { title: "Snapshot, live changes, or both", body: "Copy what is there now, follow what changes next, or do both in one job." },
      { title: "Engines supported today", body: "PostgreSQL, MySQL and Oracle as sources. PostgreSQL, MySQL, Oracle and ClickHouse as targets." },
      { title: "Checks that it is correct", body: "Compare source and target tables, and repair differences when you choose to." },
      { title: "Safe by design", body: "Resume from checkpoints, replay failed events from a dead-letter queue, and hold schema changes until you release them." },
      { title: "Full job control", body: "Create, validate, start, pause, resume, stop, recover and delete from the console, with alerts and health for each job. Passwords are stored by reference." },
    ],
  },
  {
    id: "backup",
    label: "Backup",
    title: "Back up your files",
    tagline: "Scheduled file backup for Linux and Windows servers, with simple restores.",
    cards: [
      { title: "Linux and Windows agents", body: "A small service on each host. Windows backups use Volume Shadow Copy, so open and locked files are still captured at one point in time." },
      { title: "Your storage, your keys", body: "Back up to an S3 bucket or a REST server you control. Repositories are encrypted." },
      { title: "Plans and schedules", body: "Pick the folders, set exclusions, then run daily, weekly, monthly or on your own cron schedule in your time zone. A run missed in the last 24 hours starts once service returns." },
      { title: "Retention you control", body: "Keep the last N snapshots plus daily, weekly and monthly ones. You see exactly what would be removed before anything is." },
      { title: "Staged restore", body: "Restore any snapshot, or part of one, into a directory you choose. Nothing on the host is overwritten." },
      { title: "Know when it fails", body: "An overview of protected hosts, failed jobs, silent agents and unscheduled plans, each linked to where you fix it." },
    ],
  },
  {
    id: "operate",
    label: "Operations",
    title: "Run your way",
    tagline: "Simple to operate, safe to share.",
    cards: [
      { title: "All in the browser", body: "Every task, from setup to investigation, in one clean console." },
      { title: "Single sign-on identity", body: "Sign-in is handled by Keycloak. Users, roles and tenants are managed in one place." },
      { title: "Roles that fit teams", body: "Super admin, admin and read-only roles. Everyone can see, and only the right people can change." },
      { title: "Create and manage console users", body: "Admins add users, edit them and reset temporary passwords from the console, scoped to their own tenant." },
      { title: "Alerts when a rule fires", body: "Email and SMS alerts the moment a policy is breached." },
      { title: "Self-hosted", body: "Run it on your own infrastructure so your data never leaves your control." },
    ],
  },
];

export const roadmapBlocks: RoadmapBlock[] = [
  {
    title: "Connect all your data",
    tagline: "Bring data from many sources together, ready for analytics.",
    cards: [
      { title: "Many sources, one pipeline", body: "Pull from relational databases and other sources into a single governed flow. Existing replication is the foundation." },
      { title: "Land it in Databricks", body: "Deliver changes continuously into your Databricks workspace, ready to query as lakehouse tables." },
      { title: "Stay current, not stale", body: "Change-based feeds keep the lakehouse close to live, instead of waiting for nightly exports." },
      { title: "Sensitive data stays protected", body: "Masking and tagging rules travel with the data, so analysts get the insight without the raw personal data." },
      { title: "Every transfer on record", body: "Each pipeline is logged with who set it up, what moves and when, so data leaving production is never a mystery." },
      { title: "One place to manage it", body: "Create, monitor and pause pipelines from the same console you already use." },
    ],
  },
  {
    title: "Analyse at scale with Spark",
    tagline: "Turn database activity and business data into answers.",
    cards: [
      { title: "Spark analytics on Databricks", body: "Run Spark jobs over everything you've collected, including years of query and audit history." },
      { title: "Security analytics", body: "Hunt through months of activity for slow-burn threats, unusual access and insider risk that a single day's view misses." },
      { title: "Usage and performance insight", body: "Find hot tables, unused objects, query trends and capacity needs across your whole estate." },
      { title: "Bring your own analysis", body: "Use notebooks and SQL on the same data, or connect your BI and ML tools." },
      { title: "Your data stays in your platform", body: "Analytics run in your own Databricks workspace under your own access controls." },
    ],
  },
];
