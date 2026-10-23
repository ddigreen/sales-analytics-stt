# Git and YouTrack checkpoint workflow

The research baseline and later prototype/publication changes are on `main`: PRs [2](https://github.com/ddigreen/sales-analytics-stt/pull/2), [3](https://github.com/ddigreen/sales-analytics-stt/pull/3) and [4](https://github.com/ddigreen/sales-analytics-stt/pull/4) were merged on 23 October 2026. The [checkpoint checklist](checkpoint_checklist.md) records current access, review and evidence gaps. The Word reports incorporate the merged backend design amendment; their final task acceptance and the submission tag remain pending.

Use [CONTRIBUTING.md](../CONTRIBUTING.md) for the full YouTrack → task branch → validation → PR → teammate review → merge workflow. Preserve actual author identities, checks and feedback. Keep secrets, private recordings, contact details and permission documents out of Git.

## Existing baseline trace

[SASTT-8](https://sales-analytics-stt-team.youtrack.cloud/issue/SASTT-8/Verify-repository-access-and-Git-to-YouTrack-traceability) → branch `SASTT-8-research-design-baseline` → [published baseline commit 9de4a6e](https://github.com/ddigreen/sales-analytics-stt/commit/9de4a6eb9781cb8b4694fd6339ba47d6ceb51995) → [merged PR 2](https://github.com/ddigreen/sales-analytics-stt/pull/2). GitHub records approval and merge by `daminkavitaminka`. This trace does not by itself prove independent student review or satisfy every SASTT-8 acceptance criterion.

The [live task register](youtrack_tasks.csv) contains the real issue IDs, owners, priorities and dates; the [backlog mapping](backlog.csv) preserves W01–W15. Nine dependencies were verified: SASTT-7 depends on SASTT-1, SASTT-4, SASTT-5 and SASTT-6; SASTT-9 on SASTT-8; SASTT-10 on SASTT-4; SASTT-11 on SASTT-3 and SASTT-6; SASTT-12 on SASTT-5. Check live YouTrack for subsequent changes.

## Before submitting

1. Complete the remaining items in the [checkpoint checklist](checkpoint_checklist.md), including genuine review and reviewer access.
2. Check that the submission includes the [11 required components](../docs/README.md), runnable prototype and test instructions.
3. Trace a real issue to its branch, change, feedback, correction and checked outcome. Each student must explain their actual work and the prototype's simulations.
4. Tag the exact reviewed submitted commit `pre-defense-1`. Keep it fixed; use `pre-defense-2` and `final-pre-defense` only for their actual stages.
5. Provide the repository, tag and YouTrack links, completed work, limitations and outstanding tasks. Continue development in the same repository.
