# Review notes

Research and design review completed on 22 October 2026. These notes record checks on the current draft and corrections made before team review. They do not record supervisor approval or a customer study.

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

The local mockup was checked for distinct-deal totals, date filters, zero denominators, mapping validation, evidence navigation, correction history, viewer editing restrictions, failure/retry illustration and reset. Desktop and mobile layouts were inspected. These are software checks on synthetic fixtures, not a usability study with representative users.

The Word report was rendered and its page images checked for table overflow, split references, title styling, blank pages and diagram readability. Editable diagram sources and exports were checked for consistency with roles and requirements.

## Items for the team

Confirm the working English spellings and proposed responsibility allocation. Read the papers assigned to each member and retain notes on how they affect the design. Collect the 3–5 representative discussions or actual client agreement, obtain recording permissions, and record the supervisor's comments and resulting changes. The prepared package is now published on a draft branch in the private GitHub repository; [pull request 1](https://github.com/ddigreen/sales-analytics-stt/pull/1) is unmerged. The [live YouTrack project](https://sales-analytics-stt-team.youtrack.cloud/projects/SASTT) contains 12 Open issues with priorities, responsible-student fields and checkpoint due dates. Diasbek’s native Assignee mapping is verified for SASTT-1, SASTT-6, SASTT-8, SASTT-9 and SASTT-11 as login `admin`, displayed as `Diasbek Amangeldiev (ddigreen)`. The other seven issues remain Unassigned. Substantive student review, complete reviewer access and genuine development/review evidence remain pending. The current report remains a research and design draft until those evidence requirements are met.

## Short report revision

The main report was reduced from 25 to 14 pages, with all 11 components, 15 article analyses and references, 26 summarized requirements and three diagrams retained. Supporting detail is now in research_appendices.docx. Both documents were checked for content consistency and rendered for visual review.

## Live task traceability

The [12-row live register](../planning/youtrack_tasks.csv) records real SASTT issue IDs and URLs, native Major/Critical priorities, responsible students, Open states and due dates. The [backlog mapping](../planning/backlog.csv) preserves all W01–W15 labels and maps them to those issues. GitHub handles identify the named students. Diasbek’s native Assignee mapping is verified for his five issues; Dameli’s and Bekzat’s seven issues remain Unassigned pending real account mapping. The first nine issues are due 24 October 2026, while later implementation epics have no agreed date. Existing research and source-control drafts remain subject to genuine student and supervisor review.
