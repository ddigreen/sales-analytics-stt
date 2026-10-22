# Proposed architecture diagrams

These diagrams specify a proposed system. They do not claim that the backend, worker, storage, authentication, or integrations have been implemented. Files named `.mmd` are editable Mermaid sources; `.puml` is an editable UML use-case source for PlantUML. The corresponding SVGs are self-contained, manually laid out exports, with matching PNGs for convenient viewing. Source relationships and the exports express the same design; renderer-specific geometry may differ.

| Diagram | Editable source | Vector export | Raster export |
|---|---|---|---|
| System context | `01_system_context.mmd` | `01_system_context.svg` | `01_system_context.png` |
| Components and asynchronous processing | `02_component_architecture.mmd` | `02_component_architecture.svg` | `02_component_architecture.png` |
| UML use cases — actors, associations, ellipses, system boundary | `03_use_cases.puml` | `03_use_cases.svg` | `03_use_cases.png` |

SVG width is 1,000 units; labels are at least 22 units. At a printed width of 6.7 inches, these labels are at least 10.6 points. PNGs are exported at 2× vector dimensions. Avoid cropping off the explanatory scope text when placing a diagram in a document.

## Role scope

| Actor | Proposed access |
|---|---|
| Salesperson | Import/link and upload authorized data in assigned own-call scope; track own jobs; inspect and correct/approve own-call observations where granted; view/export own-scope analytics; request deletion through the approved workflow. |
| Sales manager | Import/link and upload authorized data for the assigned team; track team jobs; inspect, review, and analyze team calls and outcomes; request deletion through the approved workflow. No cross-team access by default. |
| Analyst | View, filter, and export explicitly authorized reports; raw-audio/transcript access or review requires a separately granted research/review subset. These extra grants are not default UML associations. |
| Administrator | Manage access rules and retention; execute authorized deletion without browsing content. Administrative status alone does not grant call-content or review access. |

All roles log in. API authorization governs every query, file access, and direct object request. The actor associations are capability permissions, not a sequence of events. There are no workflow arrows or automatic transitions in the UML use-case diagram. Deletion requests still require an authorized business/data-owner process. The specific assignment of import and approval permissions is a proposed access policy for supervisor/stakeholder validation.

## Component-to-requirement mapping

Requirements refer to `docs/requirements.csv`. Coverage below is planned coverage, not passed validation.

| Component or boundary | Functional requirements | Nonfunctional requirements and design obligation |
|---|---|---|
| Web UI | FR01, FR04–FR12, FR14 | NFR07 keyboard access, understandable errors, visible draft/review state; NFR10 evidence and numeric-commitment review. |
| FastAPI authentication and authorization | FR01, FR09, FR11–FR13 | NFR01 minimum data exposure; NFR02 TLS, least privilege, private access; NFR03 actor/time traceability. |
| CSV ingest and explicit call linking | FR02, FR03, FR14 | NFR03 input version/checksum and schema lineage; NFR06 idempotent import and no unreported partial writes. |
| PostgreSQL metadata, segments, extractions, revisions, job state, audit | FR03, FR05–FR06, FR08–FR14 | NFR03 model/configuration/input/revision provenance; NFR06 consistent current versions; NFR10 evidence foreign-key constraints and separate source outcomes. |
| Private object store | FR04, FR06, FR13 | NFR01 authorization basis and data minimization; NFR02 private objects and scoped access; NFR06 cleanup reconciliation. |
| Redis broker / Celery task queue | FR04, FR05, FR13 | NFR04 isolate dashboard requests from inference; NFR06 bounded retries, idempotent work, no false completion. Queue identifiers reference restricted database/blob records. |
| Python / Celery worker ASR and optional diarization modules | FR05–FR07, FR15 | NFR03 recorded model versions/configuration; NFR05 measured processing time; NFR09 per-language evaluation and explicit unsupported scope. |
| Python evidence-extraction module | FR08, FR09, FR14, FR15 | NFR03 source and transcript revisions; NFR10 supported evidence, uncertainty flags, numeric review. Outputs are draft observations. |
| Retention/deletion handler | FR13 | NFR01 retention and deletion policy; NFR03 content-free deletion audit; NFR06 reconcile database/blob cleanup. Active-store deletion within 24h and backup expiry within 30 days remain acceptance targets. |
| Analytics, search, review, and CSV export endpoints | FR09–FR12, FR14 | NFR03 KPI definitions, denominators, filters, data version, and correction history; NFR04 latency measurement; NFR10 inferred statements remain distinct from verified sales outcomes. |
| Offline evaluation scripts | FR15 | NFR03 versioned splits/configuration and uncertainty; NFR05 measured runtime; NFR09 language strata; NFR10 evidence precision and fabricated-number checks. |
| Future read-only CRM adapter — outside the initial diagram boundary | FR16 (Could / deferred) | NFR02 scoped credentials and NFR06 idempotent synchronization would be required before implementation. CSV remains the mandatory initial path; automatic CRM writes are outside scope. |
| Module interfaces, configuration, migrations, and test documentation | Supports FR01–FR15 | NFR08 maintainability and teammate reproduction. These are implementation obligations, not completed checks. |

## Processing and storage meaning

The browser calls the FastAPI API. Authorized CSV imports and call-link validation use explicit identifiers. The API stores authorized audio privately, persists job metadata, and enqueues identifiers through Celery using Redis as its broker. A Python / Celery worker consumes transcription/extraction or deletion jobs asynchronously. It reads audio using restricted access and persists versioned results and job state. Inference does not run in a dashboard request. Celery and Redis are proposed technology choices awaiting implementation validation.

The retention/deletion handler is an explicit worker module. It removes active audio and derivatives, reconciles partial cleanup, and records a content-free audit event. A documented backup-expiry policy is separate; active deletion must not be described as instantaneous backup erasure.

Whisper is the proposed ASR baseline; optional diarization produces anonymous speaker labels until corrected/confirmed. Every confirmed extraction needs transcript evidence and timestamps. The datastore separates imported CRM outcomes from inferred call observations. No component automatically writes a model-derived outcome back to a CRM.

## Rendering

The SVG exports contain all shapes and text and require no external images, scripts, or network resources. PNG exports were generated from the SVGs using the bundled Node runtime and `sharp`. SVG is the editable vector export; rerender it after manual changes. To use another Mermaid or PlantUML renderer, render the editable source and inspect for wrapping and label size before replacing the supplied export.

## Call review product sketch

04_call_review_wireframe.svg is an editable black and white screen sketch; 04_call_review_wireframe.png is its readable export. It illustrates the proposed next prototype, with a written mixed-language example and an intentionally incorrect draft observation for review. It is a product sketch, separate from the three required architecture diagrams. See docs/app_and_prototype_plan.docx.
