# Shared choice meaning, 2026-10-06

## Boundary

No external AI, new word dictionary, ad/UMP/native changes, paid hosting changes, history deletion or cache clearing. Snapshot before edits: galimgil-review/meaning-savepoint-20261006. This remains a limited rule-based experience, not general language understanding.

## Contract

buildChoiceMeaning produces one versioned context: situation, options (name, meaning, concise cue, source), differences, axes, uncertainties, readiness and id. Existing exact feature records or supported action/scenario evidence can populate it. Other cases request user confirmation, not three generic fallback outputs.

Inline confirmation collects each alternative's meaning and the comparison axis. Empty/identical descriptions, repeated option names and stale question/A/B binding are rejected. Main input edits clear confirmation. No result or archive entry is created while confirmation is needed. Category chips alone do not establish meaning.

User descriptions are attributed to the user, not independently verified facts. Original scoring feature arrays are carried separately as decisionEvidence in the shared context. The old scorer consumes those arrays and the same situation, leaving scoring weights and winner logic unchanged. User descriptions are NOT silently converted into numeric scoring weights. Output explains the contrast, not a fabricated causal justification for the playful score.

Three output roles share the context id: comparison, imagined-aftermath, shareable-punchline. Previously working, supported concrete/non-daily fun text is retained through adapters using the shared context. Action and daily no longer force a fixed future-self comment; action no longer forces the fixed capture sentence. Zodiac/fortune output branches remain untouched.

New archive entries retain context and content provenance. Older entries remain readable and are not regenerated. Fictional future scenes are text only, never injected into scoring evidence.

## Verification

- 8 requested pairs: zoo/amusement park, contact/no contact, bus/subway, used/new laptop, pizza/chicken, jjajang/jjamppong, two compound actions.
- 5 pairs need inline confirmation in this fixed corpus. This is not a production-traffic estimate.
- 8 x 30 = 240 comparisons against pre-change source: winner, percentages, zodiac cards, fortune and final result text unchanged after required confirmation. Both supported food cases retain old future/capture text.
- Exact repeated future sentences: 4 excess rows -> 0; capture: 2 -> 0; reasons: 0 -> 0. Same text across the three roles within a report: 0.
- Masking interpolated content reveals 3 repeated future skeletons and 3 capture skeletons. Templates still repeat; zero exact duplicates does not prove semantic novelty or humor quality. User acceptance is needed for that.
- 24 choice + 12 understanding (with baseline) + 12 meaning + 12 bridge + 10 readiness + 18 Python + 12 Android unit checks = 100 checks. Meaning tests also check invalid/stale confirmation and HTML escaping.
- Browser UX at 360/390/1280px: existing inputs, inline clarification, no premature archive, shared-context persistence, result sections/reset, no horizontal overflow, clarification visible below nav. Existing palm integration uses mocked responses only.
- Android testDebugUnitTest and lintDebug succeed; no Android code changed. Physical phone checks were not performed.

## Reproduce

Set MEANING_BASELINE_APP to the pre-change app.js, then run tests/meaning.test.cjs with Node. It emits metrics and examples. Set BASELINE_APP for tests/understanding.test.cjs. Browser tests accept APP_URL and PLAYWRIGHT_MODULE; UX_SCREENSHOT_DIR optionally saves screenshots. Use a local static server; do not call live AI endpoints.
