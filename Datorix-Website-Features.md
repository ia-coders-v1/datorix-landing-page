# DATORIX — Website Features

> Feature copy for the promotional landing page, in the same shape as the Cephron features sheet: a hero, a row of four headline benefits, then sections of six plain-language feature cards, a tech strip and a closing call to action.
>
> **Status tags:** unmarked = shipped in the current build. **[Coming soon]** = planned and not built yet. Keep the tag visible on the site (badge or footnote) so the page promises nothing the product doesn't do yet.

---

## Hero

# Know every query. Protect every database. Move your data safely.

Datorix watches, protects, replicates and backs up your databases from one browser console. It works without installing anything on your database servers.

| | |
|---|---|
| **See everything** | Every query, from the app, from a DBA's laptop or from a login on the database host itself. |
| **Stop the bad ones** | An inline firewall blocks dangerous SQL before it runs, not after the damage. |
| **Move data safely** | Replicate databases in real time and back up files to storage you control. |
| **Know your data** | Find sensitive columns, mask them, and see which users carry the most risk. |

---

## See every query

Complete visibility into what happens inside your databases, with nothing installed on them.

**Live query stream**
Watch queries arrive in real time. Filter by user, source, level or time, and open any entry to read the full statement.

**Three ways of seeing**
An inline proxy sees app traffic. A network sensor sees traffic that goes around the proxy. A read-only audit collector sees what the database itself logged, including a DBA working locally with no network traffic at all.

**Bypass detection**
Know when someone connects straight to the database instead of through the approved path, and who they are.

**Nothing on your database servers**
Datorix connects with a read-only login and reads the network. No agents or daemons on the database host, and no performance hit on it.

**Query Explorer**
Search every captured query. See who ran it, from where, how long it took, how many rows it touched and whether it was blocked.

**Throughput and latency**
Requests per second, latency percentiles (P50, P90, P99) and read/write IOPS, broken down per database.

---

## Stop dangerous queries

A database firewall that understands SQL, not just network ports.

**Block, alert or log**
Pick the response for each rule. Block the query, let it run but alert the team, or just record it.

**Built-in attack protection**
Ships with 80+ OWASP SQL-injection patterns plus obfuscation, time-based, error-based and stacked-query detection.

**Guard your riskiest commands**
Stop `DROP`, `TRUNCATE`, `GRANT` and engine-specific dangers such as `xp_cmdshell`, `UTL_FILE` and `LOAD_FILE`.

**Your own policies**
Write rules by user, IP, table, query pattern or time of day. Example: no bulk export from customer tables, and alert on finance logins after hours.

**IP allow and block lists**
Decide exactly which addresses may connect, with rate limits against scrapers and brute force.

**Change rules without downtime**
New and edited rules reach the proxy live. No restart and no dropped connections.

---

## Know what your data is

Find sensitive data, and show who touched it.

**Automatic catalog**
Datorix reads each database's tables, columns, keys and indexes and keeps a browsable catalog. A failed scan never wipes the last good one.

**Sensitive-data tagging**
Columns that look like PII, card data or health data are flagged for review, so protection starts with knowing where the data is.

**Data masking**
Mask values fully or partially, hash them or tokenise them. Apply by role, and preview before and after.

**User risk scores**
Each user gets a 0–100 risk score with the top reasons behind it and a timeline of their activity.

**Anomaly spotting**
See spikes and unusual access patterns across users and objects, not just rule matches.

**Threat monitor**
Injection attempts, brute force, privilege escalation and data exfiltration, with severity and detail for each.

---

## Audit trail you can prove

Evidence an auditor will accept.

**Who, what, when, where**
Every event carries the user, source IP, full statement, object and a precise timestamp.

**Tamper-evident storage**
Audit records are append-only and written to cryptographically verifiable storage, so they can't be quietly edited later.

**Native engine audit trails**
Reads each engine's own audit log over a read-only SQL login. PostgreSQL is live; MySQL, SQL Server and Oracle are next.

**Local-session visibility**
Events from sessions that never touch the network are marked as local. This is the DBA-on-the-server case that PCI-DSS 10.2 and SOX ask about.

**Search and filter**
Slice the trail by action, user and time. Statistics follow whichever filters you set.

**Open any record**
Click an event to see its full context: statement, user, source, object and the decision taken.

---

## Replicate in real time

Move changes between databases as they happen, with a record of every move.

**Change data capture**
Reads the database's own transaction log. No triggers and no schema changes, and almost no load on the source.

**Snapshot, live changes, or both**
Copy what is there now, follow what changes next, or do both in one job.

**Engines supported today**
PostgreSQL, MySQL and Oracle as sources. PostgreSQL, MySQL, Oracle and ClickHouse as targets.

**Checks that it is correct**
Compare source and target tables, and repair differences when you choose to.

**Safe by design**
Resume from checkpoints, replay failed events from a dead-letter queue, and hold schema changes until you release them.

**Full job control**
Create, validate, start, pause, resume, stop, recover and delete from the console, with alerts and health for each job. Passwords are stored by reference.

---

## Back up your files

Scheduled file backup for Linux and Windows servers, with simple restores.

**Linux and Windows agents**
A small service on each host. Windows backups use Volume Shadow Copy, so open and locked files are still captured at one point in time.

**Your storage, your keys**
Back up to an S3 bucket or a REST server you control. Repositories are encrypted.

**Plans and schedules**
Pick the folders, set exclusions, then run daily, weekly, monthly or on your own cron schedule in your time zone. A run missed in the last 24 hours starts once service returns.

**Retention you control**
Keep the last N snapshots plus daily, weekly and monthly ones. You see exactly what would be removed before anything is.

**Staged restore**
Restore any snapshot, or part of one, into a directory you choose. Nothing on the host is overwritten.

**Know when it fails**
An overview of protected hosts, failed jobs, silent agents and unscheduled plans, each linked to where you fix it.

---

## Run your way

Simple to operate, safe to share.

**All in the browser**
Every task, from setup to investigation, in one clean console.

**Single sign-on identity**
Sign-in is handled by Keycloak. Users, roles and tenants are managed in one place.

**Roles that fit teams**
Super admin, admin and read-only roles. Everyone can see, and only the right people can change.

**Create and manage console users**
Admins add users, edit them and reset temporary passwords from the console, scoped to their own tenant.

**Alerts when a rule fires**
Email and SMS alerts the moment a policy is breached.

**Self-hosted**
Run it on your own infrastructure so your data never leaves your control.

---
## Roadmap

Planned work, in three blocks. None of this is available yet.

### Connect all your data **[Coming soon]**

Bring data from many sources together, ready for analytics.

**Many sources, one pipeline**
Pull from relational databases and other sources into a single governed flow. Existing replication is the foundation.

**Land it in Databricks**
Deliver changes continuously into your Databricks workspace, ready to query as lakehouse tables.

**Stay current, not stale**
Change-based feeds keep the lakehouse close to live, instead of waiting for nightly exports.

**Sensitive data stays protected**
Masking and tagging rules travel with the data, so analysts get the insight without the raw personal data.

**Every transfer on record**
Each pipeline is logged with who set it up, what moves and when, so data leaving production is never a mystery.

**One place to manage it**
Create, monitor and pause pipelines from the same console you already use.


### Analyse at scale with Spark **[Coming soon]**

Turn database activity and business data into answers.

**Spark analytics on Databricks**
Run Spark jobs over everything you've collected, including years of query and audit history.

**Security analytics**
Hunt through months of activity for slow-burn threats, unusual access and insider risk that a single day's view misses.

**Usage and performance insight**
Find hot tables, unused objects, query trends and capacity needs across your whole estate.


**Bring your own analysis**
Use notebooks and SQL on the same data, or connect your BI and ML tools.

**Your data stays in your platform**
Analytics run in your own Databricks workspace under your own access controls.


### More alert channels **[Coming soon]**

Meet your team where it already works.

**Slack and PagerDuty**
Send alerts to the chat and on-call tools your team already uses.

---


## Built on proven open technology

Datorix brings well-known building blocks together behind one simple interface.

Kafka · ClickHouse · PostgreSQL · Debezium · Keycloak · Kubernetes · restic · Next.js

---

## Closing call to action

# Run your databases with confidence

One console for what your databases do, who touches them, where the data goes and what it tells you.

**[Request a demo]**  **[Download the datasheet]**

---

## Notes for whoever builds the page

Facts below came from the repo (`datamon-replication-runtime`, `datamon-target-collector`, `datorix-docs/user-guide/filesystem-backup.md`, `datamon-frontend/PRODUCT.md`).

1. **Databricks and Spark are not in the codebase.** No code, config or doc mentions them, so that content comes from your stated plan and every card is tagged **[Coming soon]**. Check the wording against the real design, such as Delta tables or Unity Catalog, before publishing.
2. **The live landing page claims more than the product does today.** `Features.tsx` and `Stats.tsx` say 99.99% uptime, "0 ms added latency", EDB Postgres and MS SQL Server support, and automated RMAN backup. The repo shows:
   - Replication does not support SQL Server.
   - Backup is filesystem backup via restic, not database-native backup.
   - Native audit collection is PostgreSQL only.
   Fix these in the page code, or the new copy will contradict them.
3. **Compliance reports, RegTech, policy-as-smart-contract, threat-intelligence mining and every SIEM mention are removed** on purpose (see `docs/adr/0001-restructure-landing-page-around-verifiable-capabilities.md`).
4. **Windows restore** is implemented but not yet lab-verified, and Windows backup has been tested only on Windows 10. This copy says "Linux and Windows agents" but does not promise more.
5. **Email and SMS alerts** are listed as planned (not done) in the June inventory, as are Slack and PagerDuty. Confirm Email and SMS ship today before keeping the unmarked card.
6. **Tamper-evident (immudb) storage** comes from `PRODUCT.md`. Confirm it is the live audit store before keeping that claim.
