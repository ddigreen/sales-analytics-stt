# Contributing to VocaSales

Keep work in this repository throughout the diploma. Use your own GitHub account and identifiable commit author details. Record a coherent change when it is ready to review; documentation and design decisions are contributions too. Do not backdate work, share accounts or split unchanged uploads into artificial progress.

## 1. Start with a YouTrack task

Choose or create a real issue in [SASTT](https://sales-analytics-stt-team.youtrack.cloud/projects/SASTT). Record the responsible student, expected outcome, acceptance criteria, priority, deadline and dependencies. The [task register](planning/youtrack_tasks.csv) maps the existing issues and owners; YouTrack is the live record.

Use the matching issue rather than opening a duplicate. If scope changes, update the task and explain the decision. Leave it Open until its acceptance criteria have supporting evidence.

## 2. Create a branch from current main

Update your local `main`, then create a task branch. For example, when working on the existing frontend task:

```sh
git switch main
git pull --ff-only origin main
git switch -c SASTT-5-align-prototype-controls
```

Use the actual task ID in the branch name and commit or PR description. A descriptive commit might be `SASTT-5: Align navigation controls`. Use small, coherent changes that another student can understand.

## 3. Check the change

For prototype code, run:

```sh
node tests/prototype_logic_checks.cjs
```

For UI changes, also open the page on desktop and a narrow screen, inspect alignment and overflow, and exercise the changed controls with mouse and keyboard. Include screenshots using synthetic data. GitHub Actions runs the existing logic script; inspect the actual result. It does not replace browser checks, backend security tests or user research.

For research and design, verify claims against primary sources, preserve access limitations and check requirements against diagrams and data rules. When editing Word files, retain APA 7 references and the 12–15-page main-report limit; render and inspect the final documents. Record checks actually performed and any remaining limitation in the PR.

Keep secrets, private audio/transcripts, personal contacts and raw permission documents out of Git. Use [configuration placeholders](config/.env.example), synthetic examples and permitted deidentified evidence references. Do not redistribute publisher PDFs without permission.

## 4. Open a pull request and link the evidence

Push your branch and open a PR into `main`. Complete the [PR template](.github/pull_request_template.md): problem, resulting behavior, real YouTrack link, checks and limitations. Add the PR URL to the same YouTrack issue.

Request another teammate as reviewer. The author explains the change; the reviewer reads it, runs or inspects relevant checks and records a supported decision. Address comments and request another review when the correction changes the reviewed behavior. Assigning a reviewer alone is not approval.

If an assistant helps prepare code or a technical review, describe that assistance accurately. An account's approval is not proof of an independent student review. Students must understand, substantively review and explain the work attributed to them.

## 5. Merge the reviewed result

Merge after another teammate has reviewed the current changes, comments are resolved and relevant checks pass. The intended process is review before merge; the last repository inspection showed no protection on `main`. Do not assume GitHub will block an unreviewed merge.

Update the issue with the merged PR, checks and any remaining acceptance criteria. Close it only when all criteria are met. Update [checkpoint status](planning/checkpoint_checklist.md) when a milestone fact changes; historical technical audit notes retain their dates.

## 6. Prepare a submission

Verify all team, supervisor and committee access. Tag the exact reviewed submitted commit `pre-defense-1` for the first stage; use `pre-defense-2` and `final-pre-defense` for those actual stages. Keep submitted tags fixed.

Provide the repository, tag and YouTrack links, completed work, known limitations and outstanding tasks. Each student should be able to trace one real issue through their change, review, correction and verification. The [documentation index](docs/README.md) maps the 11 required components; the [checkpoint checklist](planning/checkpoint_checklist.md) records remaining evidence.
