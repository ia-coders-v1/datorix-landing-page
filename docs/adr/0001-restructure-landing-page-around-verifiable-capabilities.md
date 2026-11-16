# 0001: Restructure the landing page around verifiable capabilities

Status: accepted (2026-11-16)

## Context

The landing page was written when Datorix was a database activity monitoring product. The product now also has CDC replication v2, Linux and Windows file backup, a target catalog, native audit-trail collection and Keycloak user management. A Databricks and Spark analytics path is planned but not built.

Several public claims are not backed by the repo:

- `Stats.tsx`: 99.99% uptime SLA and 0 ms added latency.
- `Databases.tsx`: EDB Postgres and per-engine version ranges.
- `Features.tsx`: automated RMAN and database-native backup, policy-as-smart-contract, RegTech filings and auto-generated compliance reports, mining of PII/PHI/PCI, DPI of encrypted traffic, a quarantine action, and SIEM integration.

The repo contradicts the backup claim (backup is filesystem backup via restic), and replication has no SQL Server support. Native audit collection exists for PostgreSQL only.

Feature copy for the new page is in `Datorix-Website-Features.md`.

## Decision

- **Layout:** replace the tabbed product explorer and its code-window panels with stacked sections. Each has a heading, a tagline and a 6-card grid, following the Cephron features sheet.
- **Truthfulness rule:** a public claim must trace to code, a README or a doc in the workspace. Anything that cannot is removed, not softened.
- **Removed:** policy-as-smart-contract, RegTech and compliance reports, threat-intelligence mining, and every SIEM mention (alerts are Email and SMS only). The 99.99% and 0 ms stats are removed.
- **By the Numbers:** replace with verifiable facts (80+ SQL-injection rules, 3 capture paths, 4 replication engines, Linux and Windows backup).
- **Databases strip:** keep engine names, drop version ranges and EDB.
- **Roadmap:** planned work lives in one separate Roadmap section with two undated blocks: Databricks ("Connect all your data") and Spark ("Analyse at scale"). Each block heading carries an inline **Coming soon** badge, and the phrase appears nowhere else on the page. No dates are shown. The blocks are drawn as a vertical timeline with one unlabelled dot per block; their order is positional only, with no Next/Later stage labels.
- **Rewritten to match:** Hero, metadata and OG/Twitter text, Problem, UseCases, Navbar anchors, Footer and the closing call to action.
- **Left alone:** the datasheet PDFs in `public/docs`; they are flagged as possibly outdated.

## Consequences

- The page claims less than before. Marketing that wants a stronger claim must first add evidence to the repo.
- Removing the tabs loses the interactive feel and the code-style samples, which showed an invented DSL that does not exist in the product.
- No dates on the Roadmap avoids a public commitment but gives buyers less signal.
- The Databricks/Spark copy is derived from intent, not from code. It must be rechecked against the real design before the Coming soon badge is dropped.
- The datasheets may contradict the page until they are regenerated.

## Amendment (2026-11-16)

The How It Works section is removed; the Hero's secondary button now points at `#see`.

The More alert channels (Slack, PagerDuty) block is also removed from the Roadmap.
