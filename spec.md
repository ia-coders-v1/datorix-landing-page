Status: ready-for-agent

# Restructure the Datorix landing page around verifiable capabilities

Builds on [ADR 0001](docs/adr/0001-restructure-landing-page-around-verifiable-capabilities.md). Copy source: [Datorix-Website-Features.md](Datorix-Website-Features.md), which is the single source of truth for wording.

## Problem Statement

The public landing page describes Datorix as a passive database activity monitor and makes claims the product does not back: a 99.99% uptime SLA, 0 ms added latency, EDB Postgres and per-engine version ranges, RMAN/database-native backup, policy-as-smart-contract, RegTech filings, threat-intelligence mining, and SIEM integration. It also says nothing about CDC replication, Linux and Windows file backup, the data catalog, native audit-trail collection or console user management, and nothing about the planned Databricks and Spark analytics path. A buyer reads claims we cannot defend and misses the capabilities we can.

## Solution

Rebuild the page as stacked sections, each with a heading, a tagline and a 6-card grid, in the style of the Cephron features sheet. Every claim on the page traces to code or a document in the workspace. Planned work lives in one separate Roadmap section with undated blocks and inline **Coming soon** badges. Unbacked claims are removed, not softened.

## User Stories

1. As a prospective buyer, I want a hero that says what Datorix does today, so that I understand the product in a few seconds.
2. As a prospective buyer, I want four headline benefits under the hero (see everything, stop the bad ones, move data safely, keep it safe), so that I can skim the value.
3. As a security lead, I want to learn that Datorix sees app traffic, bypass traffic and native engine audit logs, so that I know there are no blind spots.
4. As a DBA, I want to know nothing is installed on my database servers, so that I can approve it without a change request.
5. As a security lead, I want the firewall described by its actual rule set (80+ injection patterns, DDL/DCL guards, custom policies, allow/block lists, live reload), so that I can judge it.
6. As a compliance officer, I want to see the audit trail described by who, what, when and where and by tamper-evident storage, so that I can judge it as evidence.
7. As a DBA, I want the catalog, sensitive-data tagging and masking described, so that I know Datorix helps find and protect sensitive columns.
8. As a data engineer, I want replication described with its real engine list (PostgreSQL, MySQL, Oracle as sources; PostgreSQL, MySQL, Oracle, ClickHouse as targets), so that I know whether it fits my estate.
9. As an infrastructure admin, I want Linux and Windows file backup described with scheduling, retention and staged restore, so that I can see how backups are managed.
10. As a platform owner, I want sign-in, roles and tenant-scoped user management described, so that I know how teams are administered.
11. As an analytics lead, I want a Roadmap that shows Databricks and Spark are planned, so that I can see where the product is going without being told it exists today.
12. As any visitor, I want every planned item marked **Coming soon**, so that I never mistake a plan for a shipped feature.
13. As any visitor, I want no uptime SLA, latency figure or unverified database version range on the page, so that I can trust what remains.
14. As a prospective buyer, I want By the Numbers to show facts I can verify (80+ rules, 3 capture paths, 4 replication engines, Linux and Windows backup), so that the numbers mean something.
15. As a DBA, I want the databases strip to list engines without version ranges, so that I do not over-assume support.
16. As a visitor, I want the navigation to jump to each section (See, Protect, Data, Audit, Replicate, Backup, Operate, Roadmap), so that I can find a topic quickly.
17. As a visitor on a phone, I want every section to lay out in one column with no horizontal scroll, so that the page is readable.
18. As a visitor in dark or light mode, I want the new sections to follow the existing theme, so that the page looks consistent.
19. As someone sharing the link, I want the page title, description and social preview to describe the whole platform, so that the shared card matches the page.
20. As a visitor, I want the datasheet links and the closing call to action to still work, so that I can request a demo or download material.
21. As a maintainer, I want a repeatable check that removed claims have not returned, so that marketing edits cannot reintroduce them.
22. As a maintainer, I want the features md to match the page, so that there is one source of truth for the copy.
23. As a search engine, I want a single h1 and a logical heading order, so that the page is indexed correctly.
24. As a keyboard or screen-reader user, I want badges and cards to have readable text and the section anchors to be focusable, so that the page is accessible.

## Implementation Decisions

- **Layout.** The tabbed product explorer and its code-window panels are removed. A new section component renders the md's sections from data: heading, tagline, six cards of title and one sentence. The cards reuse the existing Card, SectionLabel and Badge primitives. The Hero's animated SQL stream stays.
- **Section content and order.** Hero (with the four headline benefits as a row beneath it), Problem, See every query, Stop dangerous queries, Know what your data is, Audit trail you can prove, Replicate in real time, Back up your files, Run your way, Roadmap, Databases, Use Cases, By the Numbers, Built on proven open technology (tech strip), Call to Action. Section copy comes verbatim from the features md; copy changes are made in the md first, then the page. Keep the sensitive-data tagging, threat monitor and user-risk cards: they are backed (the catalog classifies columns by name as a heuristic, so the copy says "flagged for review", never "discovered").
- **Anchors.** Add ids to the new sections: `see`, `protect`, `data`, `audit`, `replicate`, `backup`, `operate`, `roadmap`; keep `use-cases`, `cta`. Remove the old `products` id and point the Footer's `#features` link (matches nothing today) at `#see`.
- **Roadmap.** One section with two undated blocks: Connect all your data (Databricks) and Analyse at scale with Spark. Each block heading carries a **Coming soon** Badge (cards inside inherit it, they are not badged individually). No dates, no buckets. The blocks sit on one vertical timeline rail in that order, with an unlabelled dot per block; order is positional only. The phrase "Coming soon" appears nowhere else: Hero must not hint at analytics, and a Badge `soon` variant is added to the existing Badge primitive.
- **Removed outright:** policy-as-smart-contract, RegTech and compliance reports, threat-intelligence mining and PII/PHI/PCI discovery claims, quarantine action, DPI of encrypted traffic, RMAN and native backup claims, every mention of SIEM, the 99.99% and 0 ms stats, EDB Postgres, and the per-engine version ranges.
- **By the Numbers.** Four verifiable stats, each traceable: 80+ SQL-injection rules, 3 capture paths (proxy, network sensor, audit collector), 4 replication target engines, and "Linux + Windows" backup agents. The counter component animates the three numeric values and renders the fourth as static text.
- **Databases strip.** Engine names only: Oracle, MS SQL Server, MySQL, PostgreSQL. No version ranges, no EDB.
- **Rewritten to match:** Hero (headline, subcopy, call-to-action buttons), Problem, Use Cases, Call to Action.
- **Navigation.** Navbar links: Protect (`#protect`), Replicate (`#replicate`), Backup (`#backup`), Use cases, Roadmap. The Footer uses the same anchors. Existing links (`#cta`, datasheet downloads, mailto) are unchanged; Footer placeholder `#` social links are left as they are.
- **Metadata.** `site.ts` title, description and tagline describe monitoring, protection, replication and backup, and no mention of Databricks, Spark, EDB or DPI. The Open Graph and Twitter images derive from `SITE_DESCRIPTION` (first sentence) and `SITE_TAGLINE`, so the description's first sentence must stand alone and the tagline is replaced. `layout.tsx` hardcodes keywords ("deep packet inspection", "DPI"); update them too.
- **Datasheet PDFs** in `public/docs` are not edited. The final summary notes they may contradict the page.
- **Content gate.** A Node script in the repo reads the built page and fails on forbidden strings and structure rules (see Testing). It is exposed as an npm script and run after `npm run build`.
- **No new runtime dependencies.** No change to routing, the static export setting or theming.

## Testing Decisions

- A good test checks what a visitor sees in the rendered page, not how components are built.
- **Single seam: the built static page.** `npm run build` exports to `out/`. A new `check:content` npm script (Node, no dependency) reads `out/index.html` and asserts:
  - none of these (case-insensitive) appear: `99.99`, `0 ms`, `0ms`, `SIEM`, `RegTech`, `smart contract`, `RMAN`, `EDB`, `quarantine`, `deep packet`, and the old version ranges (`11g`, `21c`, `2016`, `5.7`, `12 – 16`);
  - each anchor id exists: see, protect, data, audit, replicate, backup, operate, roadmap, use-cases, cta;
  - `Coming soon` appears only inside `#roadmap`, at least twice (one per block);
  - exactly one `<h1>`, and section headings are `<h2>`;
  - the two datasheet hrefs are present;
  - every card title in `Datorix-Website-Features.md` (bold lines) appears in the page, so the md and page cannot drift (story 22).
- `npm run lint` and `npm run build` must pass with no new warnings.
- Manual browser pass at about 375 px and 1280 px wide, light and dark: no horizontal scroll, anchors scroll to the right section, badges visible, social preview text correct.
- Prior art: none in this repo (no test runner today). The gate is a plain Node script and adds no dependency.

## Out of Scope

- Regenerating the datasheet PDFs.
- Building or documenting the Databricks/Spark capability, or giving it dates.
- Verifying shipped features beyond what the workspace docs already state.
- Changes to the product services or the console frontend.
- New pages, a blog, pricing, or analytics tracking.
- A component test runner.

## Further Notes

- Open items to confirm before publishing, from the features md notes: (1) Email and SMS alerts are "planned" in the June inventory, so confirm they ship today before the unmarked alert card goes live; (2) confirm immudb is the live audit store before keeping the tamper-evident claim; (3) Windows backup has been lab-tested on Windows 10 only and Windows restore is not lab-verified, so keep the copy to "Linux and Windows agents".
- The Databricks and Spark copy comes from stated intent, not code. Recheck it against the real design before removing a Coming soon badge.
- Git: the landing page has uncommitted work in a repo whose `main` is shared. Load the `git-workflow` skill before any branch or commit.
