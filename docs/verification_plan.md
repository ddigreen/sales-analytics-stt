# Verification and evaluation plan

All model accuracy, latency and user outcomes below are planned. Actual completed checks are limited to source verification, descriptive public data profiling, document rendering and local UX mockup checks. No trained model or user study has been run.

## Research questions and baselines

RQ1: How accurately can the system transcribe Russian, Kazakh and mixed sales speech under recorded call conditions? Compare a selected local Whisper configuration with a smaller or faster local configuration and, only if data transfer is approved, one managed ASR service. Record exact model revision, runtime, hardware, audio properties, language strategy, decoding and alignment configuration.

RQ2: Can evidence based extraction identify actionable objections and next actions? Compare deterministic keyword and rule extraction against a schema constrained model pipeline. Evaluate on gold transcripts and ASR transcripts from the same held out calls to isolate error propagation. Speaker identity is manually confirmed; optional diarization is evaluated separately.

RQ3: Does adding conversation information improve an outcome model beyond structured sales features? Primary MVP output is descriptive analytics. An exploratory predictive extension is allowed only with legitimate linked outcomes and adequate data. Compare constant majority baseline, structured only logistic regression, and structured plus conversation features with the same split. No positive effect is assumed. Accuracy alone is unsuitable for the imbalanced public dataset.

RQ4: Does the workflow reduce reporting effort and remain usable? Compare existing manual review with the prototype on matched tasks, counterbalance task order, record elapsed time errors corrections and user comments. A small pilot supports feasibility observations, not a population wide productivity or revenue claim.

## Sampling and annotation

Proposed feasibility corpus: 60 authorized calls, 20 primarily Russian, 20 primarily Kazakh and 20 mixed; 2 to 15 minutes per call, ideally at least 4 representatives and several products. Record noise overlap channel sample rate length and source. This is a feasibility target, not a representative sample or statistical power claim. If actual access is smaller report achieved counts and narrow conclusions.

Split whole calls into 30 development, 10 validation and 20 test calls, preserving language coverage where feasible. Keep the same customer and speaker out of multiple partitions; where group and language constraints conflict, group integrity takes precedence and unsupported strata are reported. Freeze the test manifest and hashes before tuning. A separate linked sales prediction study needs an adequately sized time ordered cohort; 60 calls do not justify a reliable conversion model. Use an earlier training period, later test period and customer grouping without future feature leakage.

Two annotators independently transcribe and label the held out material. Define rules for fillers numbers abbreviations product names code switching incomplete words overlap silence and redaction. Preserve language tags. Annotate objection category (price, timing, fit, competitor, no need or other), next action, owner and due date only if explicit, with segment evidence. Resolve disagreements after recording pre adjudication agreement. Report category counts Cohen kappa for categorical labels and span agreement or entity F1; rare classes and small sample sizes must be visible. A generic sentiment score is not a purchase intention label.

## Metrics and measurement conditions

WER is (substitutions + deletions + insertions) / reference words. Publish normalization rules and both raw and normalized values; normalize case punctuation and agreed number forms consistently without deleting difficult sales entities. Report micro WER and per call distribution separately by language and channel. Report exact match for amounts product names dates and customer entities, with redacted identifiers. Do not use BLEU or summary fluency as a substitute for factual correctness.

For extraction use macro F1 over supported classes, per class precision and recall, evidence correctness and unsupported claim rate. Evaluate empty output and missing classes explicitly. Numeric commitment errors require review even when aggregate scores pass. If diarization is enabled report DER, overlap treatment, collar and speaker mapping, then measure salesperson/customer role correction accuracy independently.

Performance metrics: queue wait, end to end latency, ASR real time factor (processing seconds / audio seconds), memory and peak VRAM; report warm up exclusion and median and p95 on at least 20 runs. Backend load tests use the NFR04 fixture and reference host. Include failure and retry behavior. For a cloud alternative report billed audio minutes and any minimum rounding under its current pricing, without extrapolating local cost estimates as vendor quotes.

Use paired call level bootstrap intervals for WER/extraction differences when sample size supports them; retain the language and customer grouping in interpretation. Report 95 percent intervals, exact test size, all failed calls and tuning decisions. Do not interpret overlapping small samples as proof of equivalence. For prediction report PR AUC as primary, ROC AUC and calibration as secondary, constant baseline prevalence and confusion counts at a threshold chosen on validation only. Prospective monitoring is needed before operational use.

## Proposed success targets and response to failure

Russian WER <=25 percent and Kazakh WER <=30 percent on held out pilot material; mixed speech is reported separately until a defensible target is agreed. Extraction macro F1 >=0.75 and evidence precision >=0.95; zero fabricated numeric commitments in the reviewed sample. These are provisional engineering targets, not guarantees or observed results. Failure leads to correction support, a narrower supported corpus or a revised model after documented review, not selective removal of hard calls.

The fixed usability tasks are import a supplied 20 row CSV and link manifest up to queued status, review one preprocessed 2 minute call and correct a planted objection, then filter the dashboard and explain its win rate. Use the same fixture for every participant. Start at the first task instruction and stop after the final correct explanation; count errors and assistance. Exclude ASR waiting from the 10 minute total and report it separately. At least 4 of 5 representative users should complete these tasks without help within 10 minutes. Compare manual task times descriptively and report the sample. No pre defense user test is claimed as completed.

## Test catalogue and requirement traceability

T01 authorization and direct object access tests; T02 CSV valid invalid duplicate and rollback fixtures; T03 missing conflicting and repeated join tests; T04 file type size length and asynchronous response tests; T05 forced worker crash retry idempotency tests; T06 gold transcription language and timestamp checks; T07 two speaker overlap and correction tests; T08 evidence integrity and annotation evaluation; T09 correction revision audit tests; T10 hand calculated dashboard fixture; T11 role scoped composed search filters; T12 filtered CSV export and formula injection fixture; T13 deletion active stores and backup expiry inspection; T14 outcome provenance test; T15 reproducible stratified evaluator; T16 optional CRM synchronization tests; T17 TLS secret and object access configuration review; T18 version and lineage completeness check; T19 documented API load test; T20 documented inference benchmark; T21 observed usability and keyboard checks; T22 teammate clean setup and module review. Each requirement in requirements.csv maps to a test ID. Implementation must add executable assertions and record actual outputs before claiming a pass.
