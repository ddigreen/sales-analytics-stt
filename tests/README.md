# Verification materials

Run the prototype logic regressions with Node.js 18 or later. No package installation, browser, network access or credentials are needed.

```sh
node tests/prototype_logic_checks.cjs
```

The script reads the actual inline JavaScript from `prototype/index.html` and runs it in Node's `vm` with minimal document stubs. It writes no files. A failed assertion exits with an error and identifies the check. It also works when invoked by its full path from another directory.

## GitHub Actions

The [prototype-checks workflow](../.github/workflows/prototype-checks.yml) runs the same command for pull requests, pushes to `main` and manual runs. Check the run attached to the current commit; a local pass or an earlier run is not proof that a later revision passed CI. The workflow does not run browser or future backend/worker tests.

## Automated prototype coverage

The 23 checks passed on 23 October 2026. Coverage includes:

- Baseline 8 calls and 7 deals: won amount USD 7,300, open snapshot USD 10,400, win rate 2/3 and 4 completed transcripts.
- All 180 dashboard filter combinations, representative/outcome filters, language cohorts, zero closed-deal denominators, different call/close dates and the Almaty midnight boundary.
- Distinct-deal counting with repeated calls, duplicate call IDs and a CRM deal that has no recording.
- Missing joins, source-key collisions, timezone-free timestamps and missing annotation evidence.
- Objection-only review, escaped correction text, revision values, blank/unsupported review rejection and call-specific review trails. Next actions stay draft.
- Viewer handler guards, failed-job retry without CRM changes, invalid mappings, stale validation, fixture reapplication and reset.

The CSS check only confirms that the narrow-screen rule retains the illustrated role selector. Document stubs do not implement real rendering, focus behavior, native keyboard events or server access control.

## Browser regression

A fresh browser check on 23 October 2026 verified Dashboard, Calls, Call review and Import at 1280- and 390-pixel viewport widths. No page overflow was observed at 390 pixels. Source highlighting, blank validation, native keyboard review save, draft next actions, Viewer-disabled controls, the unsupported-objection case, per-call trail isolation, retry, mapping/validation invalidation and reset passed. No console warnings or errors were observed.

These checks used synthetic records and are not a representative-user study.

## Application verification still required

The backend and speech worker are not implemented. The prototype checks do not establish authentication, cross-team data security, persistence, real CSV/audio handling, model quality, deletion or deployment performance.

The [verification plan](../docs/verification_plan.md) specifies the planned T01–T22 checks, measurement conditions and baselines. The public dataset profiling script is separate research tooling. Add backend, worker, integration and observed usability evidence as those components become available.
