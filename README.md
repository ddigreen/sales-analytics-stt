# Development of a Sales Analytics System Based on Data and Speech-to-Text Technology

Research and design materials for the 24 October 2026 checkpoint. This branch is a prepared draft awaiting genuine teammate and supervisor review. The repository is private; Dameli (`daminkavitaminka`) has accepted access, and Bekzat (`gojosatorukz`) has been invited. YouTrack task links will be added after setup. The Word documents record the 23 October pre-publication status; use this repository history for later changes.

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

The current deliverables are research, design, a clickable synthetic UX mockup, a reproducible public dataset profile, evaluation instruments and a task backlog. No application backend, trained model, customer pilot, interviews, supervisor review, deployment, or integration benchmark is claimed as complete. The October brief says a complete application is not required at this stage.

MVP: CSV imports, explicit call to deal links, asynchronous file processing, timestamps, Russian and Kazakh evaluation, evidence based extraction, correction, role access, descriptive dashboard, exports and audit metadata. Speaker diarization is a Should item; manual speaker correction remains available. Out of initial scope: live call assistance, automated employee scoring, autonomous CRM changes, causal sales claims, production telephony integration and model training from scratch.

## Proposed technology

FastAPI backend, PostgreSQL metadata and search, private local or S3 compatible object storage, a Python Celery worker with Redis broker, local Whisper family inference and a small web interface. These are design choices pending team and supervisor review, not installed application dependencies. See docs/technology_comparison.md for alternatives and decision gates.

## Files

- docs/research_and_design.docx: 14-page main report covering all 11 assignment components and 15 scientific articles.
- docs/research_appendices.docx: detailed source analysis, full requirements, data rules, evaluation protocol, backlog, forms and comparison evidence.
- docs/requirements.csv: 26 prioritized requirements and verifiable acceptance criteria.
- research/literature_matrix.csv, articles.json and references.bib: 15 scientific sources and a structured critical review.
- diagrams/: editable diagram sources and SVG exports for context, use cases and components.
- prototype/index.html: self contained interactive UX mockup using synthetic data.
- research/public_data_profile.json: actual descriptive results for the public UCI dataset, not STT results.
- planning/: proposed assigned backlog, interview guide, supervisor feedback log, risk register and Git preparation checklist.
- config/.env.example and .gitignore: safe configuration placeholders and source control exclusions.
- src/ and tests/: reserved component locations with implementation notes, not completed application code.

## Open the UX mockup

Open prototype/index.html in a modern browser. It runs locally without installation, network calls or a backend. The sample import loads synthetic fixtures; it does not read customer files or transcribe audio. See prototype/README.md for scenario checks.

## Reproduce the public data analysis

Python 3.10 or later, standard library only:

```sh
python3 scripts/profile_public_data.py --output research/public_data_profile.json
```

This downloads the UCI public archive over HTTPS and profiles bank-additional-full.csv. To work offline, add `--archive /path/to/bank-marketing.zip`. Verify hashes against the supplied JSON. The source is CC BY 4.0 and attributed in the report. Raw data is not bundled.

## Execution and testing of the future application

There is no runnable backend yet. Application setup, migration, dependency installation and test commands must be added when actual components exist. See docs/verification_plan.md for planned tests and baseline comparisons. Do not present folder placeholders or the HTML mockup as an implemented product.

## Project links and workflow

YouTrack: PENDING CREATION AND TEAM ASSIGNMENT. The planning/backlog.csv file is ready for field mapping during import; its local work item labels are not real YouTrack issue IDs. Documentation is in docs/. Supervisor review and interview evidence are pending. Changes are proposed through task branches and pull requests. Main remains the reviewed baseline. Genuine team review, supervisor/committee access and the submission tag remain pending; see planning/git_preparation.md. Never fabricate past commits or attribute initial drafts to individual students.
