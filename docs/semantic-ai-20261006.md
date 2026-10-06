# Low-confidence semantic fallback evaluation

Status: implementation and offline/browser evaluation complete; **not approved for deployment**.
This feature is disabled unless `CHOICE_AI_ENABLED=1`. Do not merge this branch into the
Render-connected main branch before user review.

## Scope and controls

- Only `buildChoiceMeaning` failure invokes `/api/choice-meaning`. Sufficient rule or
  user-confirmed evidence bypasses the endpoint entirely. Existing scores/winner/zodiac
  calculations are unchanged; semantic interpretation is not a new scoring model.
- Model returns semantic fields only. Three text roles consume one meaning ID. No model
  winner, numerical score, generated joke or caption is accepted in the strict schema.
- Model: `gpt-5-nano-2025-08-07`, minimal reasoning, 2,048 output tokens. Serialized UTF-8
  request must be <=12,000 bytes, a conservative input-token bound. Inputs <=400/80/80
  characters, body <=4 KiB. One HTTP attempt, 25s provider timeout, no SDK/model retries.
- Browser singleflight + saved archive semantics; Redis request marker before paid call;
  success TTL 7 days and attempted/failure TTL 24h. Simultaneous duplicate callers may get
  confirmation while the original call is pending, never a second paid call.
- Redis outage is fail-closed. It falls back to inline clarification, not a paid bypass.
  Semantic quota has its own `galimgil:choice-ai:quota:v1` namespace; palm counters untouched.
- Existing `OPENAI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` are reused
  server-side only. `CHOICE_AI_DAILY_PER_IP=30` and `CHOICE_AI_DAILY_GLOBAL=300` are separate
  conservative AI-call budget defaults, adjustable before activation.
- Browser confidence gating is not an authorization mechanism. The server validates
  allowed trigger codes and limits costs; a forged client can still claim low confidence.
- HTML rendering escapes generated values. Different inputs/mood/sign edited during the
  request invalidate the pending UI result. No external links/tools are given to the model.

## Actual evaluation

28 synthetic cases, including the original 8 plus 20 additional cases. 20 paid HTTP calls;
8 rule-sufficient cases made zero calls. No repeated paid call for failed model output.
The first sandbox network attempt failed before a response; the authorized network run
then made 20 successful provider requests. Subsequent tests only replay saved responses.

- Original 8: inline 5/8 (62.5%) -> 0/8.
- All 28: inline 20/28 (71.4%) -> 1/28 (3.6%). These are structural acceptance rates,
  **not a claim of 96.4% semantic accuracy** and not estimates of production traffic.
- Model incorrectly marked unknown coined terms as low uncertainty while admitting no
  concrete meaning. Generic-contrast validation now rejects that response without retry.
- 10,974 input tokens, 4,735 output tokens, 0 cached-input tokens reported by responses.
- At published $0.05/$0.40 per million tokens: $0.0024427 estimated list-price cost.
  Account billing/invoice settlement was not checked.
- Sources: https://developers.openai.com/api/docs/models/gpt-5-nano and
  https://developers.openai.com/api/docs/guides/structured-outputs . The model page marks
  the snapshot deprecated; availability and replacement must be reviewed before activation.

## Remaining quality limits (do not conceal)

- Semantic acceptance does not guarantee correct interpretation. For example, the rain /
  walk / phone case included an unsupported secondary axis about companionship, and the
  birthday/presentation case blurred practice timing with presentation timing. A string
  evidence check cannot prove entailment. No sample-specific dictionary patches were added.
- Some option summaries still merely paraphrase labels. Contrast is often more useful,
  but not always sufficiently specific (e.g. tea types).
- No exact duplicate output among 27 produced reports. After removing input/meaning
  content, duplicate-template excess is reason 25/27 (92.6%), future 18/27 (66.7%), caption
  18/27 (66.7%). Removing the quoted input makes repeated framing visible rather than
  claiming success based only on unique names. Rule-based writing remains the bottleneck.
- Semantic descriptions do not secretly alter weights. The body discloses the existing
  playful tilt rather than pretending AI found a factual reason for the winning score.
- No production Upstash credentials available locally. Cache/quota concurrency and
  failure paths were tested with doubles; real Redis TTL/restart persistence for this
  namespace has NOT been verified. Existing palm tests passed unchanged.
- Privacy policy / Play data safety must cover sending question and A/B text to OpenAI
  and caching interpretations in Upstash before activation; those public documents were
  intentionally not changed or deployed in this task. Avoid personal/sensitive inputs.
- Android real-device testing not performed. No AAB rebuilt and no Play/Render change.

## Reproduction

`tests/semantic-cases.json`: fixed 28 inputs. `tests/fixtures/semantic-responses.json`:
actual saved provider output and token usage, no credentials. The final validator can
reject a raw response originally labeled ready; raw fixtures are deliberately immutable.

`tests/semantic-eval.cjs` exports the same engine used by tests.
`tests/semantic.test.cjs` compares baseline scores when baseline paths are supplied.
`tests/semantic-report.cjs OUTPUT.html` produces the per-question full report and JSON
without any network calls. `tests/semantic_live.py` is an explicitly invoked, bounded
paid evaluation script, not a runtime retry path. Never rerun with a fresh output file
just to seek a better answer.

Existing 8 rule-handled cases: 240 seed comparisons unchanged. 19 accepted AI cases:
190 numeric-score comparisons against the pre-common-meaning baseline unchanged.
Functional tests and browser checks do not certify creative quality; user review remains
necessary. Next step is a quality-design decision, not immediate online activation.
