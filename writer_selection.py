"""Select reviewed Writer fields independently; no scoring or provider calls."""
FIELDS = {'reason': 'why', 'future': 'future', 'capture': 'capture'}


def select_fields(existing, draft, verdict):
    """Verdicts must come from role-specific review, not model self-approval."""
    output, sources = {}, {}
    for field, key in FIELDS.items():
        value = draft.get(field)
        accepted = verdict.get(field) is True and isinstance(value, str) and bool(value.strip())
        output[key] = value if accepted else existing[key]
        sources[key] = 'AI_WRITER' if accepted else ('SAFE_FALLBACK' if key == 'why' else 'EXISTING')
    return {'output': output, 'sources': sources}
