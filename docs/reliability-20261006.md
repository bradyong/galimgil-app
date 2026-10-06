# Reliability changes, 2026-10-06

No external AI calls, paid plan changes, cache clearing, or history migration.

## Choice explanation and understanding

- Old category routing weights are named categoryRoutingConfidence; they are not calibrated understanding probabilities. Scoring uses the same routing threshold as before.
- Understanding is a separate supported/low diagnostic with reason codes. Missing input, unresolved meaning, conflicting categories/actions, conditional/negative question scope, and missing grounded contrast are conservative low-confidence signals.
- Exact feature-bank matches, substring rules, inferred profiles, and category fallback have distinct provenance. Fallback has no extracted evidence. Scenario rules remain explicitly rule-derived, not user facts.
- selectedWhy now feeds the returned reason. Exact pairs retain concrete comparisons. Supported action pairs use the existing scenario evidence before generic subject-feature merging. Unverified comparisons disclose the limitation rather than claiming a confident reason.
- Winner selection, score, advice/capture line, zodiac, future comment, archive, ads, and UMP are unchanged.
- This is still bounded rule interpretation, NOT general language understanding. Supported does not guarantee correctness. Mixed-context detection is conservative and incomplete; no AI gate is enabled.

## Existing corpus audit

Reused galimgil-review/reproduce.cjs cases: 9 rows become 8 after removing the A/B-order duplicate. Two invalid inputs still request clarification. Of 6 result-producing cases, 2 are low (33.3%). This small synthetic regression corpus is NOT a production traffic estimate.

Duplicate metric: replace quoted choice names and echoed questions with placeholders, then count excess rows beyond unique explanation skeletons. Before: 3/6. After: 1/6. Reduction: 2/3 (66.7%). The remaining shared low-confidence disclaimer is intentional; cosmetic paraphrasing would not add understanding.

Run tests/understanding.test.cjs with BASELINE_APP pointing to the pre-change app.js to reproduce the comparison. The same test checks scoring and fun content against the baseline for 30 seeds per corpus entry.

## Android recovery

180-second overall budget, not renewed by retries. Each unfinished navigation gets a 25-second watchdog. Network failures, HTTP 408/425/429/5xx, and HTTP-200 non-app pages retry after 2/4/8/10 seconds (10-second cap). Permanent HTTP errors can show manual retry immediately. Readiness probing and visual-state confirmation still precede revealing the page. Success cancels callbacks; destruction cancels pending work. Startup logs contain timing/error codes, not questions or credentials.

No physical Android device was connected during verification. Automatic recovery on an actual phone and actual Render cold start remain acceptance checks, not proven results. Debug APK built locally; no release/upload action.

## Verification

- Existing choice tests: 24; bridge tests: 12.
- New understanding tests: 12 including baseline comparison.
- Python mocked server/quota/cache tests: 18.
- Android unit tests: 12 (4 new retry policy cases).
- Readiness fixtures: 10.
- Existing browser UX: 360, 390, 1280px input/result/reset flows.
- assembleDebug and lintDebug succeed. No live Upstash or paid AI requests.

## Source tracking

The existing web Git repository did not contain the Android project. android-startup/ contains only the changed Android source/test files at their project-relative paths, not a complete Android project. Apply them to galimgil-android. Signing keys, properties, build output, and user data are excluded. Web changes are normal root-level source files.
