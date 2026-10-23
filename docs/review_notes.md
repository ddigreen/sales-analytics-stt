# Review notes

Assistant technical verification on 22–23 October 2026 covered source records, the evaluation design, descriptive public-data analysis and the synthetic prototype. These checks and corrections are not evidence of individual student authorship, teammate PR approval, supervisor feedback or a representative-user study.

## Source and interpretation checks

The final matrix contains 15 publications from peer-reviewed venues. Thirteen were published in 2022–2026; QMSum and SmartSales are retained as 2021 foundations for evidence retrieval and system architecture. Thirteen papers were reviewed through relevant full-text sections. L12 and L13 were reviewed through publisher abstracts and previews, and that limitation appears in the report and source register. Titles, authors, venues, available DOIs and primary links were cross-checked. Article PDFs are linked rather than redistributed.

The general DialogSum paper was replaced with the more directly relevant NAACL 2022 sales-call summarization system. Its ROUGE and factuality results are discussed separately. L09's engineered rejection target is distinguished from an actual sales outcome, including the risk of overlapping target/input features. KSC2 spontaneous-speech results are reported as 27.0–36.8% WER rather than inferred from the overall score. Historical hallucination findings are described as associations in their tested setting. None of these values is presented as a result from this project.

The product comparison uses four systems and eight common criteria. Gong and HubSpot already list Russian and Kazakh, which rules out a simple unsupported-language novelty argument. Product documentation is distinguished from independent accuracy evidence. Four technology decisions each have three alternatives; the proposed queue implementation is consistently Celery with Redis.

## Design corrections

- Source-scoped identifiers and explicit update/collision rules were added to the import contract.
- Upload latency is measured after upload and validation, with transfer duration reported separately.
- The role matrix includes analyst and administrator limits, including direct object access and cross-team checks.
- Deletion includes historical transcripts, text in review revisions, search indexes and application export caches.
- Usability timing uses fixed tasks and preprocessed calls; inference waiting is measured separately.
- The dataset script records the actual run timestamp rather than reusing a fixed analysis date.
- The synthetic prototype uses a separate CRM fixture and repeated call/deal link. Deal amounts are counted once; closed-deal metrics use closed_at and calls use recorded_at. Open pipeline is labelled as a current snapshot.

## Completed verification

The public UCI dataset profile was reproduced from the official archive: 41,188 records, 4,640 positive outcomes and matching input hashes. This is descriptive analysis, with no trained classifier or speech benchmark.

The initial mockup was checked for distinct-deal totals, date filters, zero denominators, mapping validation, evidence navigation, correction history, viewer editing restrictions, failure/retry illustration and reset; desktop and mobile layouts were inspected. The revised 23 October code passed both the logic checks and fresh browser verification below. These are software checks on synthetic fixtures, not a representative-user study.

The Word report was rendered and its page images checked for table overflow, split references, title styling, blank pages and diagram readability. Editable diagram sources and exports were checked for consistency with roles and requirements.

## Items for the team

Confirm the working English spellings and proposed responsibility allocation. Each member should read their assigned papers and retain notes explaining how the evidence affects the design. Collect the required representative discussions or actual-client agreement, obtain recording permissions, and record the supervisor's comments and resulting changes.

The prepared baseline and later prototype changes are merged into `main` through PRs 2, 3 and 4. GitHub records are described in the [current checkpoint checklist](../planning/checkpoint_checklist.md), including the limits of Codex-assisted approvals. Substantive student review, complete reviewer access and genuine development/review evidence remain outstanding; merging prepared materials does not complete those evidence requirements.

## Short report revision

The main report was reduced from 25 to 14 pages. After the APA 7 revision it remains 14 pages, retaining all 11 components, the 15-study overview and three diagrams. Detailed comparison matrices and all 26 complete acceptance criteria are in the 24-page research_appendices.docx. Both documents were checked for content consistency and rendered for visual review.

## Live task traceability

The [12-row register](../planning/youtrack_tasks.csv) records real SASTT issue IDs and URLs, native priorities, responsible students, states and due dates. The [backlog mapping](../planning/backlog.csv) preserves W01–W15 and their issue links. Native Assignee mappings are verified for `admin`, `taubasar.d` and `b.rashiduly`. Use [checkpoint status](../planning/checkpoint_checklist.md) for the last verified issue states, invitation status and remaining evidence; use live YouTrack for later changes.

## Technical audit on 23 October

- All 15 publications were rechecked as real and relevant; no replacement was needed. The [source-verification register](../research/source_verification.json) preserves the evidence and access limits. L12 and L13 remain preview-based reviews. Blocked publisher requests and author/repository fallbacks are disclosed rather than described as fresh full-text publisher access.
- L05 now identifies the lower factuality score specifically as automatic FactCC on DialogSum, rather than independent human verification. Sample and claim locators were corrected; L07's results locator and L08/L15 access notes were clarified. No paper's experiment was replicated, and published scores are not this project's results.
- A fresh UCI profiling run matched the recorded 41,188 rows, 4,640 positives and archive/CSV hashes. This remains descriptive analysis of a public dataset without audio or legitimate call links.
- The evaluation plan now preserves connected customer/speaker groups, reports achieved split coverage, separates six-label objection scoring from action-event matching and source-grounded evidence, defines empty-output behavior, and distinguishes raw numeric errors from human-reviewed release checks. Manual/application comparisons use common outputs and four fixed fixture/order sequences. All model and user-study outcomes remain future work.
- The revised synthetic prototype passed 23 static/Node logic checks, including all 180 dashboard filter combinations. Corrections cover CRM deals without calls, evidence-backed objection review, per-call trails, invalid import state, reset behavior and the narrow-screen role control. These passes do not establish real uploads, authentication, speech recognition or usability with representative users.

Fresh browser verification on 23 October passed at 1280 × 900 and 390 × 844: dashboard, call list, detail and import layouts were inspected, with no page-level horizontal overflow at 390 pixels and the role selector available. Evidence highlighting, empty-text rejection, keyboard saving, Viewer restrictions, missing-evidence blocking, per-call history, simulated retry, invalidated mapping validation and sample reset behaved as specified. Reviewing an objection leaves the next action explicitly draft. No browser warning or error was captured. This does not verify production uploads, authentication, inference or representative-user usability.

## APA 7 revision on 23 October

Both Word documents now use author–date citations and identical alphabetized reference lists: 15 scientific publications, one public dataset and 32 official documentation sources. Each of the 48 entries is cited in each document. Full author lists, source-specific journal/proceedings details, DOI/URL links, same-author/year suffixes, italics, double spacing and 0.5-inch hanging indents were checked. L01–L15 remain analysis IDs only; T01–T22 remain test IDs. The main report stays at 14 pages by shortening repeated summaries and placing complete comparison matrices in Appendix G. The appendices are 24 pages; all complete requirements and detailed source analyses remain available. All rendered pages were inspected. These are assistant formatting and technical checks, not student or supervisor approval.
