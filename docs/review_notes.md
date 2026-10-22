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

Confirm the working English spellings and proposed responsibility allocation. Read the papers assigned to each member and retain notes on how they affect the design. Collect the 3–5 representative discussions or actual client agreement, obtain recording permissions, and record the supervisor's comments and resulting changes. The private GitHub repository exists with an initial README only; publish the package, complete team access and create genuine YouTrack links and development/review history. The current report remains a research and design draft until those evidence requirements are met.

## Short report revision

The main report was reduced from 25 to 14 pages, with all 11 components, 15 article analyses and references, 26 summarized requirements and three diagrams retained. Supporting detail is now in research_appendices.docx. Both documents were checked for content consistency and rendered for visual review.
