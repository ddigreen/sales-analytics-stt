# Project documentation

This index follows the 11 components of the 24 October assignment. The [main report](research_and_design.docx) contains sections 1–11 in the same order and is 14 pages; the [24-page appendices](research_appendices.docx) hold the detailed matrices, requirements and evaluation instruments. Both use APA 7 references.

The [checkpoint checklist](../planning/checkpoint_checklist.md) is the current status record. A document, planned procedure or blank form is not evidence that its activity has taken place.

| No. | Assignment component | Materials in this repository | Remaining confirmation or evidence |
|---|---|---|---|
| 1 | Project proposal | Main report §1; [project overview, scope and team](../README.md) | Team and supervisor confirmation of scope, responsibilities and official name spellings. |
| 2 | Evidence of the relevance | Main report §2; [public-data results](../research/public_data_profile.json); [profiling script](../scripts/profile_public_data.py); [discussion guide](../planning/interview_guide.md) | 3–5 representative discussions or a substantive actual-client agreement, with findings mapped to requirements. Public-data analysis does not establish local user demand; confirm the evidence route with the supervisor. |
| 3 | Literature review | Main report §3; appendices; [15-study matrix](../research/literature_matrix.csv); [article register](../research/articles.json); [source verification](../research/source_verification.json); [BibTeX](../research/references.bib) | Each member's substantive reading and review notes. L12/L13 remain limited to publisher abstracts/previews; preserve that limitation. |
| 4 | Existing system comparison | Main report §4; [four-system comparison using eight criteria](system_comparison.md); [source register](../research/comparison_sources.json) | Team review of supported claims and the resulting design decisions. |
| 5 | Technology comparison | Main report §5; [four decisions with three alternatives each](technology_comparison.md) | Confirm choices with the team/supervisor and validate them during implementation. |
| 6 | Requirements specification | Main report §6; [26 prioritized requirements and acceptance criteria](requirements.csv); [data contract](data_contract.md) | Validate requirements against actual stakeholder findings; record revisions and decisions. |
| 7 | Architecture and Diagrams | Main report §7; [system context, use-case and component diagrams](../diagrams/README.md), with editable sources and PNG/SVG exports | Team/supervisor review of alignment between roles, requirements, data and components. |
| 8 | UX / prototype | Main report §8; [live prototype](https://ddigreen.github.io/vocasales-demo/); [HTML source](../prototype/index.html); [scenarios and limits](../prototype/README.md) | Genuine teammate review and observed user feedback. Authentication, audio processing and persistence remain future implementation. |
| 9 | Verification and evaluation plan | Main report §9; [metrics, conditions and baselines](verification_plan.md); [existing checks](../tests/README.md); [technical review record](review_notes.md) | Review feasibility and data access. Model benchmarks and representative-user study results are future work, not completed findings. |
| 10 | Project management and risks | Main report §10; [YouTrack](https://sales-analytics-stt-team.youtrack.cloud/projects/SASTT); [assigned task register](../planning/youtrack_tasks.csv); [backlog and milestones](../planning/backlog.csv); [risks](../planning/risks.csv); [Git workflow](../CONTRIBUTING.md) | Verify reviewer access and invitations, preserve actual individual contributions/reviews, resolve acceptance criteria and tag the submitted commit. See the checklist. |
| 11 | Supervisor feedback | Main report §11; [supervisor review agenda and log](../planning/supervisor_review_log.md) | Actual dated comments, decisions, resulting changes and confirmation. The prepared agenda is not a completed review. |

## Reading and reproduction

- Start with the main report, then use the linked source files to inspect details in GitHub.
- Run the prototype and checks using the [root instructions](../README.md#run-and-check).
- Read [review notes](review_notes.md) for source-access limits and completed technical checks.
- Use the [contribution guide](../CONTRIBUTING.md) for new work and the [checkpoint checklist](../planning/checkpoint_checklist.md) before submission.

`src/api`, `src/web` and `src/worker` currently contain component plans. The complete application is not required at this checkpoint; claims about implementation and evidence must match what can be demonstrated.
