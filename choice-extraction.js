/* Conservative clause extraction, not a general-purpose language model. */
(function (root) {
  function extract(value) {
    const q = String(value || '').normalize('NFKC').trim().replace(/[?!？]+/g, ' ').replace(/\s+/g, ' ').trim();
    const unclear = { ok: false, message: '어떤 두 가지 사이에서 고민 중인가요?' };
    if (!q || q.length > 200 || /그거|저거|이거|그것|저것|어떻게|않을 수 없|안 할 수 없/.test(q)) return unclear;
    // Retain conjugated endings as evidence instead of discarding action/negation.
    const clauses = q.match(/.*?(?:을까|할까|갈까|쉴까|탈까|살까|볼까|올까|낼까|말까)/g);
    if (!clauses || clauses.length !== 2 || q.slice(clauses.join('').length).trim()) return unclear;
    const parts = clauses.map(s => s.trim().replace(/^(?:아니면|혹은|또는)\s*/, '').replace(/^그냥\s*/, ''));
    if (parts.some(s => /^(?:할까|갈까|말까)$/.test(s))) return unclear;
    const negative = s => /안|못|지\s*않|지\s*말/.test(s);
    const action = s => s.replace(/먹을까$/, '먹는다').replace(/마실까$/, '마신다')
      .replace(/쉴까$/, '쉰다').replace(/갈까$/, '간다').replace(/탈까$/, '탄다')
      .replace(/살까$/, '산다').replace(/볼까$/, '본다').replace(/할까$/, '한다')
      .replace(/올까$/, '온다').replace(/낼까$/, '낸다').replace(/을까$/, '는다');
    let [a, b] = parts.map(action);
    let category = '';
    if (parts.every(s => /먹을까$/.test(s)) && !parts.some(negative)) {
      a = parts[0].replace(/먹을까$/, '').replace(/^(?:오늘\s*)?(?:아침|점심|저녁)\s*/, '').trim();
      b = parts[1].replace(/먹을까$/, '').trim();
      category = 'food';
    } else if (parts.every(s => /(?:타고\s*퇴근할까|탈까)$/.test(s)) && !parts.some(negative)) {
      [a, b] = parts.map(s => s.replace(/(?:타고\s*퇴근할까|탈까)$/, '').trim());
      category = 'travel';
    } else if (parts.every(s => /갈까$/.test(s)) && !parts.some(negative)) {
      [a, b] = parts.map(s => s.replace(/갈까$/, '').trim());
      category = 'travel';
    } else if (/시작할까$/.test(parts[0]) && /^(?:내일부터|내일|오늘부터|오늘)\s*할까$/.test(parts[1])) {
      const when = parts[0].match(/(오늘부터|오늘|내일부터|내일)\s*시작할까$/);
      if (!when) return unclear;
      a = `${when[1]} 시작`;
      b = parts[1].replace(/할까$/, '시작');
      category = 'daily';
    } else if (parts.every(s => /^(오늘|내일|지금|나중에)\s*할까$/.test(s))) {
      category = 'daily';
    }
    a = a.trim(); b = b.trim();
    if (!a || !b || a === b || a.length > 80 || b.length > 80) return unclear;
    // Explicit alternatives do not need another category question. The existing
    // engine may identify a more specific category; otherwise keep a neutral one.
    return {ok: true, a, b, category: category || 'daily'};
  }
  const api = {extract};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.ChoiceExtraction = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
