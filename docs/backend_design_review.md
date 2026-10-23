# SASTT-4 backend design review

The proposed backend has a sound separation of imported sales facts, call evidence and human review, but the baseline left several failure and concurrency rules underspecified. This change makes team ownership, atomic imports, durable job recovery, version promotion and deletion races explicit. It is a design amendment for teammate review, not an implemented backend or a claim that backend acceptance tests passed.

Backend design review recorded on 23 October 2026. Responsible student: Bekzat (`gojosatorukz`). Task: [SASTT-4](https://sales-analytics-stt-team.youtrack.cloud/issue/SASTT-4). The task's five acceptance criteria define the review scope below. [PR 5](https://github.com/ddigreen/sales-analytics-stt/pull/5) was merged after Diasbek's review; Dameli's substantive review remains pending for task acceptance. This design amendment does not establish supervisor feedback, authorized pilot data or completed implementation.

## Baseline and material inspected

The review branch starts from `main` at `aa6d8d5` (merge of PR 3), after [PR 2](https://github.com/ddigreen/sales-analytics-stt/pull/2) and [PR 3](https://github.com/ddigreen/sales-analytics-stt/pull/3) were merged. The original handoff's unmerged-PR branch instructions are therefore superseded. Target this PR at `main`. During publication, PR 4 advanced main to `7ab5321` with the team's sidebar and GitHub Pages changes. A local merge of that revision was conflict-free and the same 23 prototype checks passed again; those team changes are preserved and are outside this design amendment.

Inspected the complete [data contract](data_contract.md), all 26 rows of [requirements.csv](requirements.csv), the [verification plan](verification_plan.md), both [system](system_comparison.md) and [technology](technology_comparison.md) comparisons, the [official-source register](../research/comparison_sources.json), all three architecture sources and SVG exports, the [diagram scope/mapping](../diagrams/README.md), [prototype instructions](../prototype/README.md), the inline dashboard/import/review logic and [23 existing regressions](../tests/prototype_logic_checks.cjs), and the API/worker/test placeholders. The [online prototype](https://ddigreen.github.io/vocasales-demo/) is the team's hosted synthetic demo; this review ran the checked-out prototype logic and does not claim a fresh browser audit of that hosted deployment. No production schema, migrations, API, worker or real data is present to test.

## Findings and decisions

| ID | Baseline evidence and failure example | Decision and changed specification |
|---|---|---|
| F01 | The contract said all grants are team scoped, but unique import keys contained only source_system and external ID, and the core fields omitted team ownership. Two teams importing CRM deal `001` could collide; a plain deal_id foreign key would not establish same-team ownership. | Add server-derived team_id, unique team/source keys and same-team relationships. Internal IDs are server owned. Source/internal deal references must agree, and representative permissions are rechecked. Clarified FR01–FR03. |
| F02 | Identical skips and explicit updates were already required, but invalid-row partial writes, concurrent imports, canonical hashes and stale preview application had no single outcome rule. | Validate privately, then apply the complete valid batch atomically. Row errors/conflicts block apply. Confirm changed metadata against expected_revision; idempotency-key payload conflicts and stale previews return 409. Identical reimports preserve review history. Changed audio is blocked pending a replacement policy. Clarified FR02/FR03 and T02/T03. |
| F03 | The component diagram directly enqueued after persisting metadata. A crash between database commit and publish could strand a queued job; a crash after results commit but before acknowledgement could duplicate output. Attempt_count alone did not define recovery. | Commit job/outbox together, dispatch/recover from PostgreSQL, use leased conditional claims and a shared three-attempt budget. Commit results/completion atomically. Duplicate delivery is a no-op and stale leases cannot publish. Clarified FR05/NFR06, component source/SVG/PNG and T05. |
| F04 | Historic transcript/evidence references and invalidation were sound principles, but a not-yet-processed call was described as already having one current version. Stale reviewer writes and worker completion after a human edit had no conflict policy. | Allow zero or one current version; edits create immutable versions. Bind evidence to team/call/version/segment and use expected review revisions. Save stale reprocessing output as a candidate; never replace a human current version implicitly. Review remains per item and next actions remain separate. Clarified FR06/FR08/FR09 and T06/T08/T09. |
| F05 | Role matrix correctly denied administrator content access, but endpoint status, job/audio/export paths and role combinations across teams were not explicit. A manager-A plus salesperson-B account could accidentally inherit manager access in B. | Apply action plus object scope on every path; 401 unauthenticated, 404 invisible object, 403 disallowed action on visible object. Keep grants tied to their team/subset and recheck stored export/audio access. Use an authenticated audio proxy. Expanded T01/T11/T12/T17. |
| F06 | Distinct-deal, closed_at/recorded_at and separate-currency rules were correct. The contract did not define language cohorts, half-open date bounds, missing-amount coverage or whether one approved objection made a whole call reviewed. | Retain the formulas, specify EXISTS-based authorized language cohorts and [start,end) timezone conversion. Deal/call representative bases stay explicit. Unknown money stays null with coverage counts. Complete objection review includes reviewed negatives; one item cannot complete a call or approve next actions. Clarified FR10 and T10/T14. |
| F07 | FR13 already included historic text/index/cache cleanup and backup expiry. It did not prevent an in-flight worker or reimport from recreating deleted material. | Mark deleting and deny reads immediately, fence worker/review writes, retain content-free tombstones, reconcile cleanup and replay deletion on backup restore. Keep active cleanup <=24h and backup expiry <=30 days. Retention duration and downloaded-copy policy still need a data owner. Clarified FR13 and T13. |
| F08 | Four-system/eight-criterion coverage was consistent, but Salesloft access conditions named AI flags without its integrated subscriptions/Team Access prerequisites; the exact Topics-dashboard wording relied on a support page not freshly retrievable. | Cite indexed official integrated-product documentation S7, specify subscription/entitlement/Team Access, and describe Topics/filter analysis plus announced cross-call trends. Preserve the distinction from the legacy Conversations language guide. Source access limits are explicit. |

These are specification corrections and proposals. None is recorded as a demonstrated production defect or stakeholder-approved policy.

## Review of all 26 requirements

All requirement IDs, MoSCoW priorities, components and test IDs are retained. Priorities support the minimum joined-record/review workflow: diarization and performance/language targets remain Should, and live CRM integration remains Could. No Must is promoted to a completed result by this review. “Retain” below means the acceptance criterion is usable as a proposed check, not that it passed.

| ID | Priority / test | Review result and verifiability |
|---|---|---|
| FR01 | Must / T01 | Clarify F01/F05: direct role/object tests, team-bound multi-role grants and 401/403/404 behavior. Enumerate the four-role matrix rather than testing only UI controls. |
| FR02 | Must / T02 | Clarify F01/F02: 100 rows, exact insert/skip counts, concurrent replay, atomic rejection and stale/update conflicts are observable assertions. |
| FR03 | Must / T03 | Clarify F01/F02: one authorized same-team Deal per accepted Call, stable server IDs, explicit cross-source resolution and no guessed links. |
| FR04 | Must / T04 | Retain 10-minute, 50 MB, 30-minute and post-validation 2-second criteria. Added spoofed-media/orphan-upload cases. Reference host and valid authorization basis remain prerequisites. |
| FR05 | Must / T05 | Clarify F03: four public states, initial plus two automatic attempts including crashes, permanent failures and lost-notification recovery. Candidate completion is distinct from current-version promotion. |
| FR06 | Must / T06 | Clarify F04: immutable editable-through-new-version transcript, provenance, segment bounds and explicit unsupported configuration. Accuracy remains a later speech evaluation. |
| FR07 | Should / T07 | Retain anonymous two-speaker labels and manual correction; new speaker-label versions follow F04. No inferred identity or salesperson/customer role is asserted as fact. |
| FR08 | Must / T08 | Clarify F04: same-version evidence integrity plus source support. Referential existence is testable in the database but cannot prove semantic truth. |
| FR09 | Must / T09 | Clarify F04: private old/new history, actor/time/evidence, stale-write conflict and independent per-item states. |
| FR10 | Must / T10 | Clarify F06: 20-deal hand calculation, no-call deals, distinct currency groups, missing-amount coverage and timezone/cohort rules. |
| FR11 | Must / T11 | Retain keyword and composed-filter checks. F05 adds nested/foreign IDs and scope-safe counts/pagination. A fixture needs explicit known matches and nonmatches. |
| FR12 | Must / T12 | Retain active-filter/provenance equality and formula-prefix neutralization. Added same revision snapshot and revocation before download. |
| FR13 | Must / T13 | Clarify F07: immediate read denial, late-write fencing, no silent resurrection, all active derivatives, backup restore and external-copy policy. |
| FR14 | Must / T14 | Retain immutable separation of CRM facts from inference. Blank import outcome requires correction; unknown display data is never counted as lost or silently made open. |
| FR15 | Should / T15 | Retain per-language/grouped evaluation, six-label objection macro F1, action-event F1 and runtime exports. Evaluation plan defines empty/unsupported strata and source-grounded scoring; no model run exists. |
| FR16 | Could / T16 | Retain deferred read-only, scoped, idempotent connector. CSV is mandatory; context/use-case diagrams correctly omit an implemented live CRM integration. |
| NFR01 | Must / T13 | Retain authorization/data minimization. F07 adds temporary content and deletion races. Actual recordings and authorization still belong to SASTT-3. |
| NFR02 | Must / T17 | Retain TLS/private objects/minimum credentials. Tracked config uses placeholders; F05 specifies the audio proxy and restricted worker identity. Deployment configuration remains untested. |
| NFR03 | Must / T18 | Retain model/config/input/revision/timing lineage and metric denominators. Added parent version, candidate/current distinction and response revision token. |
| NFR04 | Should / T19 | Retain 10,000 deals / 1,000 calls, 4 vCPU / 8 GB, 100 requests, concurrency 5 and p95<=2s. Freeze routes/query mix, warmup/cache conditions and host before measuring. No latency result claimed. |
| NFR05 | Should / T20 | Retain proposed median RTF<=1 and p95<=2. Plan requires at least 20 runs, hardware/model/warmup disclosure and queue/processing separation. Host is not yet agreed. |
| NFR06 | Must / T05 | Clarify F03/F04/F07: API/broker/worker crashes, atomic result commit, protected current versions and deletion reconciliation have explicit failure-injection scenarios. |
| NFR07 | Must / T21 | Retain 4/5 users, three fixed tasks and 10-minute total with preprocessed calls. Manual/application common outputs and counterbalanced fixtures are defined. Synthetic logic checks cannot pass this user study. |
| NFR08 | Must / T22 | Retain interface/config/migration/lint/test and teammate setup obligations before integration. Current API/worker directories are placeholders; this requirement has not passed. |
| NFR09 | Should / T06 | Retain provisional RU<=25% / KK<=30% WER, uncertainty, size and narrowed-scope fallback. Mixed speech remains separately reported; support is not assumed from vendor lists. |
| NFR10 | Must / T08 | Retain >=95% raw-item source support and zero fabricated numeric commitments after human review, with raw errors/recall separate. Empty output is unavailable, not perfect evidence precision. Actual annotated test data is pending. |

## Data and arithmetic checks

Read `renderDashboard`, `cohortCalls`, `rowsForDashboard`, `dealFor`, `validateFixture` and the review handler in the actual prototype script. Sales totals start from the separate CRM fixture; language uses a set of linked deal IDs; call counts use recorded_at, closed sales use closed_at, and open pipeline is a snapshot. No design correction to the distinct-deal formula was warranted. The Viewer/Reviewer selector and fixture reapplication remain explicitly illustrative, not production authorization or durable import semantics.

The existing regressions passed on this checkout: eight calls/seven deals yield USD 7,300 won, USD 10,400 open and 2/3 win rate (66.7% displayed). C-101 and C-108 share D-101 without multiplying amount. On 21 October the example has two calls and three closed deals, demonstrating the two date bases. A temporary synthetic won deal without calls raises won amount to USD 8,200 and win rate to 3/4 for all languages, while English-only remains USD 7,300. The suite restores the fixture in memory and writes no data files. All 180 filter combinations produce finite states, and the Almaty 19:00Z midnight boundary passes.

The following additional calculation is a manual contract walkthrough, not an executed backend fixture. In one authorized reporting period, take D-A won USD 100 with two calls, D-B lost USD 40 with one call, D-C won KZT 50,000 with no call, D-D open USD 90, and D-E won with null amount/currency. All-language sales are four distinct closed deals, three won, win rate 3/4, known won sums USD 100 and KZT 50,000, plus one won deal with missing amount. Open snapshot is USD 90. A language cohort containing only D-A's two calls has one won deal and USD 100. A join that sums D-A twice or drops D-C/D-E is incorrect. FR10/T10 now require these edge cases in the future 20-deal executable fixture.

## Four-system comparison and official evidence

Checked all 32 cells for the same eight criteria and resolvable reference labels. Capability evidence is official vendor documentation/announcements, not measured performance. [system_comparison.md](system_comparison.md) retains source URLs and the [source register](../research/comparison_sources.json) adds S7 without relabeling the older source checks as fresh reads.

| Criteria checked | Official evidence inspected on 23 October | Conclusion / limitation |
|---|---|---|
| 1 capture; 4 extracted insights; 5 coaching | Gong G1; Salesloft S1 and indexed S2/S7; HubSpot H1; Dynamics D1/D2/D3 | The stated capability categories are supported. Salesloft launch features remain announced capability; no recordings or paid accounts were tested. |
| 2 transcript review | Gong G2; indexed Salesloft S2/S5; HubSpot H1; Dynamics D2 | Transcript/evidence navigation is supported as a product pattern. Gong translated transcripts have a search limitation; transcription does not establish factual extraction accuracy. |
| 3 structured sales links | Gong G3; indexed Salesloft S3; HubSpot H1; Dynamics D1/D2 | CRM context is documented. The project's explicit one-deal-per-call rule is a deliberate MVP constraint, not a claim that vendors have identical schemas. |
| 6 aggregate analytics | Indexed Gong G4; Salesloft S1 and indexed S7; HubSpot H1; Dynamics D1/D4 | Team/report/filter capabilities are documented. Changed Salesloft wording to evidence actually available; no vendor KPI/ROI benchmark is adopted. |
| 7 relevant languages | Gong G5; indexed legacy Salesloft S5 and landing page S6; HubSpot H2; Dynamics D3 | RU/KK transcription lists remain present for Gong/HubSpot. Salesloft legacy/new-product equivalence is unverified. RU/KK absence from Microsoft's reviewed CI table is not universal unavailability. |
| 8 access/configuration | Gong G6; indexed Salesloft S2/S3/S7; HubSpot H1; Dynamics D1/D5 | Corrected Salesloft integrated subscription, entitlement and Team Access prerequisites; preserve language, seat, admin and region caveats. |

Direct Salesloft S2–S5 requests returned CSS/loading errors; official indexed text supplied S2/S3/S5 and S7. S4 was not freshly verified, so the changed matrix no longer relies on it for aggregate/access claims; its older reference remains as historical baseline evidence. Direct Gong G4 retrieval failed but official indexed text was available. Microsoft pages showed an authorization notice alongside substantive article text, which was inspected. No authenticated vendor feature test or current price comparison is claimed. Keep these limits when presenting the comparison.

## Technology decision review

Reviewed four decisions, each with three alternatives in [technology_comparison.md](technology_comparison.md). Official T1–T7 and T9–T12 pages and the Whisper project README T8 were inspected; task acknowledgements/worker loss and Redis visibility caveats were additionally checked in the official Celery guides linked from the amended contract.

| Decision | Alternatives reviewed | Decision and gate |
|---|---|---|
| API | FastAPI / Django / NestJS | Retain provisional FastAPI for Python integration and typed API contracts. It still needs database structure, authentication and object authorization. Agree examples with Dameli before implementation. |
| Database | PostgreSQL / SQLite / MongoDB | Retain PostgreSQL for explicit relational constraints and version metadata; optional JSONB does not replace evidence links. SQLite remains a legitimate offline option. No comparative database speed claim. |
| ASR | local Whisper / Azure Speech / Google Cloud STT | Retain a local adapter baseline after profiling. Hosted recognition is conditional on transfer approval, exact language/model/region availability and budget. This review did not select a model size, process audio or measure WER/RTF. |
| Processing | synchronous request / BackgroundTasks / Celery+Redis | Retain worker isolation but add the application-owned outbox/lease/recovery protocol. Celery delivery is not an exactly-once database guarantee. Pin and test acknowledgements, timeouts, retry budget and Redis visibility behavior on the actual host. |

## Diagram consistency

The [context Mermaid source](../diagrams/01_system_context.mmd) and its SVG were inspected: four actors have the documented scopes; authorized CSV/audio are inputs and no automatic CRM write exists. The [UML source](../diagrams/03_use_cases.puml) and SVG retain the same actor/capability associations, administrator content restriction, and business deletion-request note. No change was justified to either source or its exports.

The [component source](../diagrams/02_component_architecture.mmd), [SVG](../diagrams/02_component_architecture.svg) and [PNG](../diagrams/02_component_architecture.png) now include the dispatcher/recovery boundary, job/outbox/lease metadata and fenced result completion. All original API, storage, queue, ASR, extraction, deletion and offline-evaluation responsibilities remain. The PNG was rerendered from the SVG using the bundled Node runtime and sharp and visually inspected. The Mermaid source and manual SVG express matching nodes/relationships; they need not have identical layout. Inference stays asynchronous, audio stays private, and deletion remains reconciled. These are proposed components, not deployed services.

The two Word reports are unchanged baseline snapshots. This Markdown review, the updated contracts/CSV and component exports are the explicit SASTT-4 amendment; do not claim the embedded Word diagram or acceptance tables already include it. Integrate the amendment into the report after teammate decisions, with normal document visual verification.

## Verification actually completed

- Ran `node tests/prototype_logic_checks.cjs` on the checked-out source using the bundled Node runtime: **23 checks passed**, including **180 dashboard filter combinations**. This establishes only the stated synthetic logic behavior.
- Inspected all 26 priorities, acceptance criteria, component and T01–T22 mappings; changed ten acceptance criteria without changing IDs/priorities/test links.
- Read the live SASTT-4 requirements and verified its assignee, Open state and 24 October due date. Confirmed merged baseline and main target; verified own GitHub account before preparing publication.
- Checked official product/technology evidence with the access limitations above. Checked diagram source/export semantics and visually inspected the updated PNG.
- Parsed the changed CSV/JSON/SVG, checked requirement and comparison reference coverage, verified local Markdown targets, and ran `git diff --check` before publication. These are static consistency checks, not application tests.

No database authorization, real CSV/audio import, queue recovery, transcript persistence, deletion, TLS, speech accuracy, load or representative-user test has run. The expanded [backend acceptance scenarios](verification_plan.md#backend-contract-scenarios-added-in-sastt-4) define what SASTT-10 must implement and demonstrate.

## Unresolved decisions and review request

| Owner / task | Required decision or evidence |
|---|---|
| Dameli / SASTT-4 | Review the changed contract, all requirement decisions and component exports. Confirm the UI can present atomic import errors, 409 review conflicts, candidate/current versions, missing-amount coverage and separate review states. Approval and substantive feedback are pending. |
| Bekzat + Dameli / SASTT-10 | Agree versioned request/response examples, authentication/session mechanism, import size limits, schema precision, canonicalization format, error codes and migration/index strategy before implementation. |
| Diasbek + Bekzat / SASTT-10 and speech work | Agree worker input/output schema, pinned model/config identifiers, language handling, lease/heartbeat/timeouts/backoff and candidate promotion. Validate all failure boundaries with the real queue and database. |
| Data owner + team / SASTT-3 | Obtain legitimate recordings, explicit call/deal IDs, a valid authorization basis, retention duration and downloaded-export policy. Choose an audited audio replacement workflow before enabling replacements. No agreement or recording is fabricated. |
| Team + supervisor / SASTT-7 | Validate proposed business permissions, scope/quality targets and retained design decisions; record genuine feedback and resulting revisions. This review does not satisfy supervision. |
| Team / evidence follow-up | Confirm Salesloft new-product language/feature availability if used in the final comparison. Keep indexed-access and product-version caveats meanwhile. |

Open the task-linked PR against `main` and request **Dameli (`daminkavitaminka`)** as required by acceptance criterion 5. Add the PR link to SASTT-4. Keep the issue Open until review/acceptance evidence exists; do not merge, close SASTT-3/SASTT-7 or mark SASTT-10 implemented as a side effect of this contribution.
