# Stakeholder interview and requirements collection guide

Project: Development of a Sales Analytics System Based on Data and Speech-to-Text Technology.

Status: prepared instrument; interviews have not been conducted. All findings, participant details, measurements, and approvals remain pending. Target: complete initial stakeholder collection and requirements review before 24 October 2026, subject to participant availability. This guide does not constitute evidence that a business partner, dataset, or permission has been secured.

## 1. Recruitment and session setup

Recruit 3–5 representatives who understand the intended business process. Aim for one sales manager, one salesperson, one analyst or CRM/reporting owner, and one IT/data owner. A fifth participant may be a second salesperson with a different language or workflow. If fewer participants cover multiple roles, record this and the resulting gaps. This is a small exploratory sample; do not claim population representativeness or saturation.

Plan 25–40 minutes per interview plus an optional 15-minute prototype walkthrough. Use a language comfortable for the participant. An interviewer asks neutral questions; a second team member records anonymized notes when possible. Ask the participant to describe a recent concrete example rather than only their ideal future process.

Session record, to complete during collection:

| Field | Entry |
|---|---|
| Evidence/session ID, e.g. INT-01 | |
| Participant code, e.g. P01; do not put personal contact details here | |
| Role(s) and business context | |
| Date, time zone, duration | |
| Interviewer / note-taker | |
| Interview language(s) | |
| Consent to notes / optional recording | |
| Permitted purpose and permitted quotation form | |
| Notes location and permitted access | |
| Data-owner contact stored separately, if authorized | |

## 2. Consent and scope opening

Suggested opening, to adapt to institutional requirements: “We are students researching how sales data and call transcripts might support sales analysis. Participation is voluntary. You may skip questions or stop the session. We would like to keep anonymized notes for the project. Recording is optional and requires a separate agreement. Please avoid disclosing real customer identities, credentials, payment details, or confidential transactions during this conversation. We will confirm the allowed uses of any examples or files before using them.”

Record separate choices for participation, note-taking, recording, anonymized quotations, and later contact. If recording is declined, continue with agreed notes only. Confirm the applicable institutional or business consent process with the responsible owner before collecting customer-call audio. A stakeholder interview does not grant permission to reuse customer recordings.

## 3. Common interview questions

1. What is your role, and which sales decisions or tasks do you perform regularly?
2. Please walk us through a recent lead or sale, from the first contact to closure and reporting. Which tools, files, and people were involved?
3. Which sales data are created, who enters them, and what is the authoritative source when two records disagree?
4. Where do conversations occur: phone, meeting, voice message, or another channel? Are calls currently recorded or transcribed? Which use permissions already exist, and which need confirmation?
5. Which languages occur? Does Kazakh/Russian switching happen within a call or sentence? Which product names, abbreviations, numbers, accents, or background sounds cause misunderstanding?
6. Which step is most time-consuming or error-prone? For a recent example, approximately how long did it take? May we observe or time the task? Record estimates as self-reported rather than observed time.
7. What information is currently missed: customer need, objection, product, quoted amount, next action, deadline, or something else? Ask for a de-identified example.
8. What would make a transcript or automatic summary unreliable enough that you would stop using it? How should uncertainty or missing information appear?
9. Which decisions should require a person's confirmation? Who corrects errors, and how should a correction be recorded?
10. What is the smallest useful prototype for you, and what observable task would show that it helps?

## 4. Role-specific probes

| Representative | Questions to explore |
|---|---|
| Sales manager | Which decisions require daily/weekly information? How are sales stages defined? Which KPI is useful for coaching versus reporting? How would you verify a disputed call-derived observation? What drill-down evidence is required? |
| Salesperson | Show how you record the next action after a call. Which manual entries duplicate other work? Which customer statements need context or remain tentative? How should you correct a wrong product, amount, speaker, or commitment? |
| Analyst / CRM owner | Which identifiers can join calls, leads, customers, and transactions? What are the actual column definitions and update frequency? How are duplicate leads, cancellations, refunds, missing values, and currencies handled? How are report totals reconciled? |
| IT / data owner | Which CSV schemas and audio formats can be provided for permitted research? Who authorizes export and processing? What storage, processing-location, access, retention, deletion, logging, and incident procedures apply? Which environments or third-party services are allowed? |

## 5. KPI and data-contract confirmation

Complete one record per requested KPI. Do not choose a formula solely because a chart requires it.

| KPI contract field | Entry |
|---|---|
| KPI ID / business label / intended decision | |
| Exact definition and formula | |
| Numerator, denominator, unit, time window | |
| Inclusion and exclusion rules | |
| Event timestamp and time zone | |
| Source table, fields, and join keys | |
| Treatment of duplicates, missing data, refunds, cancellations | |
| Source of outcome truth; whether call inference is permitted | |
| Owner confirming definition and date | |
| Evidence IDs and unresolved questions | |

Discuss revenue currency and net/gross basis, conversion-stage denominator, and whether a closed deal is defined by CRM status, paid invoice, or another verified event. A quoted amount is not automatically revenue. Store exact personal details and actual business files only in the approved restricted location, separate from publishable project documentation.

## 6. Optional prototype walkthrough and observation

Use clearly labeled synthetic or authorized de-identified data. Explain that the prototype may contain deliberate errors and is being evaluated. Do not imply an automatic score is an assessment of employee performance.

| Task | Success evidence to collect | Result |
|---|---|---|
| Find a specified customer's next action and deadline | Correct field, evidence excerpt, timestamp, and source identified | |
| Inspect and correct an incorrectly transcribed product or price | Correction saved with traceable source and review state | |
| Distinguish a tentative purchase from a completed transaction | Participant explains correct status and authoritative outcome source | |
| Filter a date range and explain a conversion/revenue total | Formula and source records reconcile with the expected result | |
| Check an ambiguous speaker or mixed-language span | Participant can mark uncertainty or request review without inventing a fact | |

For each task record start/end time, completion, assistance, errors, participant comment, and observer note. State whether time was observed or estimated. Compare against the existing workflow only if an equivalent baseline task was actually performed. Report task times and usability results only after the sessions are complete.

## 7. Evidence and requirement traceability

Use `INT-xx` for interviews, `OBS-xx` for observations, `DATA-xx` for permitted schema/file inspections, `REQ-xx` for requirements, and `SUP-xx` for supervisor decisions. Example IDs describe a naming convention; no evidence item exists until recorded.

| Evidence ID | Exact anonymized quotation or observable fact | Context / source location | Classification | Interpretation | Candidate requirement | Confirmation and date |
|---|---|---|---|---|---|---|
| | | | | | | |

Classify evidence as **observed** (directly seen/heard and attributed), **self-reported** (participant's account), **assumption** (team hypothesis without supporting collection), or **validated requirement** (explicitly confirmed by the relevant owner with a source and date). A requested feature is not validated merely because the team likes it. Keep conflicting accounts and open questions visible.

After each session, remove identifying details, check that notes match the source, and summarize candidate requirements with evidence IDs. Ask the appropriate owner to confirm the interpretation when needed. Record the actual confirmation date and unresolved objections. If no interviews can be completed before the deadline, submit this instrument and a clearly labeled collection plan; report no interview findings.
