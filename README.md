# Development of a Sales Analytics System Based on Data and Speech-to-Text Technology

**[Open the live VocaSales prototype](https://vocasales-prototype.dsbkamngldv.chatgpt.site)** — opens in your browser without downloading or signing in. Synthetic demonstration data only.

Research and design materials for the 24 October 2026 checkpoint. [Pull request 2](https://github.com/ddigreen/sales-analytics-stt/pull/2) was merged into `main` on 23 October 2026; GitHub records approval and merge by `daminkavitaminka`. Earlier draft notes remain as a preparation snapshot. The private repository is accessible to Dameli (`daminkavitaminka`); Bekzat (`gojosatorukz`) has been invited. The [YouTrack project](https://sales-analytics-stt-team.youtrack.cloud/projects/SASTT) contains 12 Open tasks and epics. The Word documents include the 23 October technical audit and project-status snapshot; use GitHub and YouTrack for later changes.

## Purpose

Sales teams often keep outcomes in structured systems while call content stays in recordings. The proposed system explicitly joins call records to deals, transcribes authorized audio, lets a reviewer verify extracted objections and next actions, and presents sales metrics with clear definitions. This is a proposed workflow; demand, time savings, and language performance still need local validation.

Target users: sales managers, salespeople, analysts and a limited administrator role. Expected result: a reproducible post call analytics prototype, traceable evidence, and an evaluation of whether conversation features add value beyond structured sales data. No causal revenue uplift is claimed.

## Team and supervisor

| Team member | Group | Proposed responsibility |
|---|---|---|
| Rashiduly Bekzat | SE-2418 | Backend, CSV integration, schema, API and access control |
| Taubasar Dameli Almabekkyzy | SE-2402 | Frontend engineering, API integration, review workflow, dashboard and UI tests |
| Amangeldiev Diasbek Yernarovich | SE-2402 | Speech processing, evidence extraction, annotations and evaluation |

All three teammates share literature review, requirements validation, annotation, documentation and peer review.

GitHub accounts: Diasbek — [ddigreen](https://github.com/ddigreen); Dameli — [daminkavitaminka](https://github.com/daminkavitaminka); Bekzat — [gojosatorukz](https://github.com/gojosatorukz).

Supervisor: Orynbek Alibek Sarsenbekuly. Latin spellings are working transliterations from the supplied Kazakh application; confirm official English spellings before formal submission. Responsibilities are proposed allocations, not claims about work already performed. Personal phone numbers and email addresses have been omitted.

## Scope and current status

The current deliverables are research, design, a clickable synthetic UX mockup, a reproducible public dataset profile, evaluation instruments and a task backlog. No application backend, trained model, customer pilot, interviews, supervisor review, application deployment, or integration benchmark is claimed as complete. The October brief says a complete application is not required at this stage.

MVP: CSV imports, explicit call to deal links, asynchronous file processing, timestamps, Russian and Kazakh evaluation, evidence based extraction, correction, role access, descriptive dashboard, exports and audit metadata. Speaker diarization is a Should item; manual speaker correction remains available. Out of initial scope: live call assistance, automated employee scoring, autonomous CRM changes, causal sales claims, production telephony integration and model training from scratch.

## Proposed technology

FastAPI backend, PostgreSQL metadata and search, private local or S3 compatible object storage, a Python Celery worker with Redis broker, local Whisper family inference and a small web interface. These are design choices pending team and supervisor review, not installed application dependencies. See the [technology comparison](docs/technology_comparison.md) for alternatives and decision gates.

## Files

- [Main report](docs/research_and_design.docx): 14 pages covering all 11 assignment components and 15 scientific articles, with APA 7 citations and references.
- [Research appendices](docs/research_appendices.docx): 24 pages with detailed source analysis, full requirements, data rules, evaluation protocol, backlog, forms and complete comparison matrices. Both Word files use the same 48 APA references: 15 scientific publications, one dataset and 32 official documentation pages.
- [Requirements and acceptance criteria](docs/requirements.csv): 26 prioritized requirements and verifiable acceptance criteria.
- [Literature matrix](research/literature_matrix.csv), [article register](research/articles.json) and [BibTeX references](research/references.bib): 15 scientific sources and a structured critical review.
- [Diagrams](diagrams/): editable diagram sources and SVG exports for context, use cases and components.
- [Live clickable prototype](https://vocasales-prototype.dsbkamngldv.chatgpt.site): hosted synthetic UX mockup; [HTML source](prototype/index.html) and [scenario checks](prototype/README.md).
- [Public data profile](research/public_data_profile.json): actual descriptive results for the public UCI dataset, not STT results.
- [Planning files](planning/): [12 live YouTrack tasks](planning/youtrack_tasks.csv), [W01–W15 mapping](planning/backlog.csv), interview guide, supervisor feedback log, risk register and Git preparation checklist.
- [Configuration example](config/.env.example) and [.gitignore](.gitignore): safe configuration placeholders and source control exclusions.
- [Source component locations](src/) and [test notes](tests/): reserved component locations with implementation notes, not completed application code.

## Open the UX mockup

**[Open the live VocaSales prototype](https://vocasales-prototype.dsbkamngldv.chatgpt.site)** — no download or installation.

The hosted page contains only synthetic demonstration data. It runs entirely in the browser; changes reset on reload. The private repository and Word reports are separate from the hosted page.

Open [prototype/index.html](prototype/index.html) in a modern browser. It runs locally without installation, network calls or a backend. The sample import loads synthetic fixtures; it does not read customer files or transcribe audio. See the [prototype scenario checks](prototype/README.md).

## Reproduce the public data analysis

Python 3.10 or later, standard library only:

```sh
python3 scripts/profile_public_data.py --output research/public_data_profile.json
```

This downloads the UCI public archive over HTTPS and profiles bank-additional-full.csv. To work offline, add `--archive /path/to/bank-marketing.zip`. Verify hashes against the supplied JSON. The source is CC BY 4.0 and attributed in the report. Raw data is not bundled.

## Execution and testing of the future application

There is no runnable backend yet. Application setup, migration, dependency installation and test commands must be added when actual components exist. See the [verification plan](docs/verification_plan.md) for planned tests and baseline comparisons. Do not present folder placeholders or the HTML mockup as an implemented product.

## Project links and workflow

[YouTrack project](https://sales-analytics-stt-team.youtrack.cloud/projects/SASTT) · [Research baseline pull request](https://github.com/ddigreen/sales-analytics-stt/pull/2) · [Project documentation](docs/)

[SASTT-1–SASTT-12](planning/youtrack_tasks.csv) are real issues. The [backlog mapping](planning/backlog.csv) maps the 15 earlier W labels to those issues. The `Responsible student` field identifies Diasbek (`ddigreen`), Dameli (`daminkavitaminka`) or Bekzat (`gojosatorukz`). Native YouTrack `Assignee` is verified for all 12 issues: Diasbek’s `admin` account owns SASTT-1, SASTT-6, SASTT-8, SASTT-9 and SASTT-11; Dameli’s `taubasar.d` account owns SASTT-2, SASTT-5 and SASTT-12; Bekzat’s `b.rashiduly` account owns SASTT-3, SASTT-4, SASTT-7 and SASTT-10. Dameli’s and Bekzat’s actual Contributor accounts are provisioned and invited; both invitation acceptances remain pending. The `Responsible student` fields identify the same owners. Native priorities are Major or Critical. SASTT-1–SASTT-9 are due 24 October 2026; implementation epics SASTT-10–SASTT-12 have no agreed due date. All 12 remain Open, and prepared drafts and later changes still need substantive student review; PR 2 now records Dameli's GitHub approval and merge.

Use the real issue ID in each task branch and commit or request description, and link the change back from YouTrack. Keep `main` as the reviewed baseline by merging only after genuine teammate review. Supervisor/committee access, stakeholder evidence, recording permissions, supervisor feedback, progressive contributions by all three students and the fixed submission tag remain pending; see the [Git preparation checklist](planning/git_preparation.md). Existing publication commits do not establish earlier continuous development or authorship of every prepared draft.
