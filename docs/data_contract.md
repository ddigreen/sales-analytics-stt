# Data contract and metric definitions

This is a proposed MVP contract. No client schema has been obtained.

CSV sales import fields: source_system (nonempty string), external_deal_id (stable within that source), deal_id (internal immutable identifier), representative_id (authorized internal ID), opened_at (ISO 8601 with offset), closed_at (nullable ISO 8601 with offset), outcome (open, won or lost), amount (nonnegative decimal or blank), currency (ISO 4217 code or blank). Require closed_at for won and lost. Invalid outcome codes, negative amounts, duplicate conflicting IDs and naive timestamps require correction. Store time in UTC and render the user's selected timezone, initially Asia/Almaty. Never aggregate amounts across currencies without a documented conversion source and date.

Call manifest fields: source_system, external_call_id (stable within source), call_id (internal immutable identifier), deal_id (foreign key), representative_id, recorded_at (ISO 8601 with offset), declared_language (ru, kk, mixed or unknown), authorization_ref (restricted reference), audio_sha256 and storage_object_id. Authorization evidence itself is stored privately. A deal can have many calls; each call belongs to exactly one deal. An unknown or conflicting link is quarantined and shown in the import review; it is never silently guessed. Reimports use unique source_system plus external_deal_id or external_call_id and a content hash for idempotency. Identical rows are skipped; changed rows require explicit update confirmation and a revision event. Source ID collisions are rejected rather than overwriting another source. Internal immutable IDs remain unchanged.

Core entities: User, TeamMembership, Deal, Call, ProcessingJob, TranscriptVersion, Segment, ExtractedItem, ReviewRevision and AuditEvent. A Call has one current TranscriptVersion and zero or more historic versions. A Segment belongs to exactly one version. An ExtractedItem references that version and its supporting segment IDs; approval is invalidated when its evidence changes. ProcessingJob stores attempt count status and error code. AuditEvent records actor action object ID and time without unnecessary transcript content.

Metrics: eligible closed deals are distinct deals whose outcome is won or lost and closed_at lies within the selected reporting period. Win rate is won / (won + lost); if the denominator is zero display Not available. Call counts use recorded_at and distinct call_id; display the different period basis clearly. Open deals are not lost. Won amount sums known won amounts separately for each currency; no amount is inferred from speech. Objection prevalence is the number of reviewed calls containing a particular reviewed objection divided by calls reviewed in the same cohort; it is not a population rate. Filters apply role permissions before aggregation. Synthetic prototype numbers illustrate interaction only.

Stable join IDs and data lineage are engineering requirements. A public telemarketing dataset without audio cannot be paired to unrelated speech recordings to create supposedly real joined observations.

## Role permission matrix

| Action | Salesperson | Manager | Analyst | Administrator |
|---|---|---|---|---|
| Import and link deals and calls | Own records | Assigned team | No | No unless separately granted a business role |
| Read audio and transcripts | Own calls | Assigned team | Only a separately granted authorized research subset | No inherent content access |
| Correct and review extracted items | Own calls | Assigned team | Only explicitly granted review subset | No inherent review right |
| View and export analytics | Own scope | Assigned team | Authorized deidentified dataset | Configuration metadata only |
| Request call deletion | Own records via approved workflow | Assigned team via approved workflow | No | Execute authorized retention and deletion job without browsing content |
| Assign roles and retention policy | No | No | No | Yes with audit |

All grants are team scoped. Default deny applies to unlisted actions and direct object access. Privileged maintenance does not silently grant a business content role. A multi role user receives only explicitly assigned content scopes; test intersections and cross team denial.
