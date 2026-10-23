# Local UX mockup

Open [index.html](index.html) in a modern browser. No installation, server, credentials, network, real audio or model inference is needed. The temporary product label is VocaSales. Data and multilingual transcript snippets are synthetic. English labels on Russian/Kazakh examples are manually written annotations, not model output. All changes disappear on reload.

The fixture deliberately has 8 calls and 7 CRM deals: C-101 and C-108 share D-101. Revenue and win rate count distinct CRM deals. With All languages selected, matching CRM deals remain included even if they have no call. A specific language restricts deal metrics to deals with a matching-language call; the close-date window is still independent of call recording dates. Closed-deal KPIs use closed_at; call volumes use recorded_at; the open pipeline is explicitly a current snapshot. Outcomes and monetary values are stored in a separate CRM fixture and never inferred from words in the transcript. All amounts are demonstration USD, not actual business results. In the default fixture, won amount is 7300 USD, win rate is 2/3 and current open amount is 10400 USD.

## Scenarios checked

1. Change representative, language, outcome and date filters. Totals recalculate and a zero closed-deal denominator displays Not available. The two-call/three-closed-deal date example illustrates why call and deal counts differ.
2. Open a completed call and select an insight timestamp. The supporting transcript turn is highlighted; no recording is played.
3. Correct a supported objection and mark that objection reviewed. The next action remains a draft. Calls with no objection evidence cannot save a confirmed objection. The in-memory trail is scoped to the selected call and records actor, time, old and new interpretation while preserving the written transcript.
4. Switch to the illustrated Viewer role. Editing becomes disabled; this UI control is not real authentication or access enforcement.
5. Open a failed call and simulate a retry. Only the displayed fixture status changes to queued.
6. Open Import data, load the built-in sample, map call_id and deal_id and preview validation. Wrong mappings block application. No customer file is read or uploaded. Fixture join and CRM field validation is performed; production source-scoped IDs remain in the design contract.
7. Apply or reset the synthetic sample. State is replaced in memory by identifier; reapplying clears earlier corrections, reviews, trails and simulated job changes. Repeated application never duplicates records, but it is a demo reset rather than production import idempotency; no database exists.

## Limits

The mockup illustrates selected requirements. Actual upload/transcription, role security, CSV export, full-text search, persistent revisions, transcript editing and approval invalidation, next-action review, deletion and administration are future implementation work. Reviewer/Viewer are illustrative edit modes, not the planned production four-role permission model. The role selector is available on narrow screens too. The mockup must not be presented as a finished backend or measured AI result. Dashboard language filters describe calls linked to deals, not the language of a deal itself. Production cohorts and time windows must follow the [data contract](../docs/data_contract.md).

Automated interaction checks were run in a temporary headless browser, with desktop and 390-pixel mobile screenshots visually inspected. The checks covered duplicate-deal counting, different date bases, empty denominators, evidence highlighting, correction and revision trail, disabled Viewer edits, retry illustration, mapping validation, reset, no horizontal mobile overflow and no browser script errors. No representative user study has been conducted.

## Subsequent logic audit

On 23 October 2026, 23 Node-based logic checks passed, including all 180 dashboard filter combinations, UTC-to-Almaty date boundaries, distinct deals, a CRM deal with no calls, missing evidence, per-call review isolation, Viewer handler guards, failed-job retry, fixture validation and reapplication. Run `node tests/prototype_logic_checks.cjs` from the repository root; see [verification materials](../tests/README.md) for the scope.

A fresh assistant browser regression on the same revision checked Dashboard, Calls, Call review and Import at 1280- and 390-pixel viewport widths. The 390-pixel page had no horizontal overflow and the role selector remained visible. Checks passed for timestamp highlighting, blank review validation, keyboard review submission, draft next actions, disabled Viewer edits, blocked unsupported objections, call-specific review trails, failed-job retry, mapping changes, stale validation and reset. No console warnings or errors were observed. These were synthetic prototype checks; no representative-user study, backend security test or speech evaluation was performed.
