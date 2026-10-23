# Development of a Sales Analytics System Based on Data and Speech-to-Text Technology

VocaSales connects structured sales outcomes with evidence from recorded sales conversations. The proposed system links calls to CRM deals, transcribes authorized audio, and lets users check extracted objections and next actions before using them in analytics.

**[Open the live prototype](https://ddigreen.github.io/vocasales-demo/)** · [Documentation](docs/README.md) · [YouTrack](https://sales-analytics-stt-team.youtrack.cloud/projects/SASTT) · [Checkpoint status](planning/checkpoint_checklist.md)

## Users and scope

The intended users are salespeople, sales managers and analysts, with a limited administrator role. The expected outcome is a reproducible post-call analytics application and an evaluation of transcription quality, evidence extraction and the value of conversation features beyond structured sales data. Local demand, time savings and language performance still need validation.

The planned MVP covers CSV import, explicit call-to-deal links, asynchronous transcription, Russian/Kazakh evaluation, evidence review, role access, analytics, export and audit history. Live call assistance, automatic CRM changes, employee scoring and model training from scratch are outside the initial scope.

## Available now

- A browser prototype with synthetic data: dashboard filters, calls, evidence navigation, objection correction, review history, sample import and simulated retry.
- Research and design: a 14-page report, appendices, 15 scientific publications, comparisons, 26 requirements, editable diagrams and an evaluation plan.
- A reproducible public-data profiling script and 23 prototype logic checks.

Research and prototype changes from PRs [2](https://github.com/ddigreen/sales-analytics-stt/pull/2), [3](https://github.com/ddigreen/sales-analytics-stt/pull/3) and [4](https://github.com/ddigreen/sales-analytics-stt/pull/4) are merged into `main`. The application backend and speech worker are not implemented. Prototype changes last only until reload; its role selector and processing states are demonstrations. See the [checkpoint checklist](planning/checkpoint_checklist.md) for review records and outstanding evidence.

## Run and check

Open [prototype/index.html](prototype/index.html) in a modern browser. It needs no server, installation or credentials and makes no network requests.

Run the existing logic checks with Node.js 18 or later:

```sh
node tests/prototype_logic_checks.cjs
```

See [test coverage and limits](tests/README.md). GitHub Actions runs the same command for pull requests, pushes to `main` and manual runs; check the actual result before merging.

To reproduce the public UCI data profile with Python 3.10 or later:

```sh
python3 scripts/profile_public_data.py --output research/public_data_profile.json
```

The script uses the standard library and downloads the attributed public archive over HTTPS. Add `--archive /path/to/bank-marketing.zip` for offline input. This analysis contains no audio or legitimate call-to-deal links.

## Team and proposed technology

| Team member | GitHub | Group | Responsibility |
|---|---|---|---|
| Amangeldiev Diasbek Yernarovich | [ddigreen](https://github.com/ddigreen) | SE-2402 | Speech processing, extraction, annotation and evaluation |
| Taubasar Dameli Almabekkyzy | [daminkavitaminka](https://github.com/daminkavitaminka) | SE-2402 | Frontend, API integration, review workflow and UI tests |
| Rashiduly Bekzat | [gojosatorukz](https://github.com/gojosatorukz) | SE-2418 | Backend, CSV integration, database, API and access control |

All members share research, requirements and peer review. Responsibilities describe proposed work areas, not proof of completed individual contributions. Supervisor: **Orynbek Alibek Sarsenbekuly**; confirm official English name spellings before submission.

Proposed stack: FastAPI, PostgreSQL, private object storage, Celery with Redis, local Whisper-family inference and a web interface. The [technology comparison](docs/technology_comparison.md) explains alternatives. `src/api`, `src/web` and `src/worker` are reserved component locations; dependencies and startup commands will be added with implementation.

Use [CONTRIBUTING.md](CONTRIBUTING.md) for task-linked branches, validation and teammate review. The [documentation index](docs/README.md) maps all 11 assignment components to their evidence.
