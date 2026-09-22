/* Shared input interpretation for the browser and offline regression tests. */
(function (root) {
  const normalize = (value) => String(value || "").normalize("NFKC").toLowerCase().replace(/[\s.!?。？！]/g, "");
  const actions = [
    ["attendance", /출근|근무|결근/], ["career", /퇴사|이직|그만두|그만둘/],
    ["relationship", /연락|전화|통화|고백|사과|화해|답장/],
    ["hygiene", /씻|샤워|양치|목욕/], ["exercise", /운동|헬스|러닝|산책/],
    ["study", /공부|숙제|과제|복습/], ["chore", /청소|설거지|빨래|세차/],
    ["shopping", /구매|결제|교체|바꾸|바꿀|바꾼/], ["food", /먹|식사/],
  ];
  function intent(value) {
    const text = normalize(value);
    if (/않을수없|안할수없|안갈수없|안먹을수없|안하지|못하지|않지/.test(text)) return "unclear";
    if (/지않|지못|하지말|먹지말|가지말|마시지말/.test(text) || /^(안|못)(가|간|하|한|먹|마|사|산|팔|판|바|연락|출근)/.test(text)) return "skip";
    if (/(안|못)(한다|해요|해|가요|간다|먹|마신|마셔|산다|판다|바꾼|바꾸)/.test(text)) return "skip";
    if (/^(만다|말자|안해|안가)$|보류|나중|미룬|미루|쉰|쉬기|쉬어|기다|관망|보유|홀딩|버틴|버티|유지|결근/.test(text)) return "skip";
    if (/^(한다|해|해요|간다|가요|산다|판다|살래)$|하기$|가기$|먹|마신|마셔|바꾼|바꾸|교체|매수|매도|연락|고백|출근|운동|공부|청소|설거지/.test(text)) return "go";
    return "specific";
  }
  function category(question, a, b, lookup) {
    const q = normalize(question), pair = `${normalize(a)} ${normalize(b)}`;
    const ca = lookup(a), cb = lookup(b);
    // Two concrete alternatives outrank incidental context such as 'with a friend'.
    if (ca && ca === cb && intent(a) === "specific" && intent(b) === "specific") return ca;
    if (/동물원|동물|판다|호랑이/.test(q + pair) && !/매도|매수|주식|판매|팔다/.test(q)) return "daily";
    if (/코인노래방|코노|노래방/.test(pair) && !/주식|투자|매수/.test(q)) return "hobby";
    const actionCategory = actions.find(([, pattern]) => pattern.test(pair));
    if (actionCategory) return actionCategory[0];
    if (/선물|사줄|생일선물/.test(q)) return "gift";
    if (/주식|투자|매수|매도|적금|예금|비트코인/.test(q + pair)) return "money";
    const questionCategory = actions.find(([, pattern]) => pattern.test(q));
    if (questionCategory) return questionCategory[0];
    if (/여행|휴가|여행지|숙소/.test(q)) return "travel";
    if (/커피|음료|마실/.test(q)) return "beverage";
    if (/점심|저녁|아침|메뉴/.test(q)) return "food";
    if (/살까|쇼핑/.test(q)) return "shopping";
    return ca && ca === cb ? ca : null;
  }
  function inspect(question, a, b, lookup = () => null, clarifiedCategory = "") {
    const na = normalize(a), nb = normalize(b);
    if (!na || !nb) return {field: !na ? "choiceA" : "choiceB", message: "비교할 선택을 두 가지 모두 적어주세요."};
    if (na === nb) return {field: "choiceB", message: "두 선택이 같아요. B에는 다른 선택을 적어주세요."};
    if ([a, b].some((v) => /^(그거|저거|이거|그것|저것|이것|이쪽|저쪽|그쪽|a|b|ㅇㅇ|ㄴㄴ)$/.test(normalize(v)))) return {field: "choiceA", message: "무엇을 비교하는 건가요? ‘그거’ 대신 실제 이름이나 행동을 적어주세요."};
    if (intent(a) === "unclear" || intent(b) === "unclear") return {field: "choiceA", message: "행동을 하는 쪽과 하지 않는 쪽을 짧게 적어주실래요? 예: 연락한다 / 연락하지 않는다"};
    const found = category(question, a, b, lookup);
    if (!found && !clarifiedCategory) return {field: "choiceContext", message: "어떤 종류의 선택인가요? 아래에서 골라주세요.", needsCategory: true};
    const animals = found === "daily" && /동물|판다|호랑이/.test(normalize(question + a + b));
    return {category: found || clarifiedCategory, intentA: animals ? "specific" : intent(a), intentB: animals ? "specific" : intent(b), clarified: !found};
  }
  const api = {normalize, intent, inspect};
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ChoiceInput = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
