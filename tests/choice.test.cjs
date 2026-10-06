const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const context = vm.createContext({localStorage: {getItem: () => null}, console});
vm.runInContext(fs.readFileSync(path.join(root, 'choice-input.js'), 'utf8'), context);
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
vm.runInContext(source.slice(0, source.indexOf('document.getElementById("todayDate").textContent')), context);
function evaluate(code) { return vm.runInContext(code, context); }
let count = 0;
function test(name, fn) { fn(); count++; console.log(`PASS ${name}`); }
for (const value of ['먹지 않는다', '연락하지 않는다', '출근 안 한다', '안 간다', '구매하지 않아요', '못 간다']) {
  test(`negative: ${value}`, () => assert.equal(evaluate(`optionIntent(${JSON.stringify(value)})`), 'skip'));
}
test('double negative needs clarification', () => assert.equal(evaluate(`ChoiceInput.intent('안 할 수 없다')`), 'unclear'));
for (const [q,a,b,want] of [
  ['친구랑 저녁 뭐 먹을까?', '피자','치킨','food'],
  ['동물원에서 뭐 볼까?', '판다','호랑이','daily'],
  ['', '코인노래방','볼링','hobby'],
  ['연락할까?', '연락한다','연락하지 않는다','relationship'],
]) {
  test(`category: ${q || a}`, () => assert.equal(evaluate(`choiceProfile(${JSON.stringify(q)},${JSON.stringify(a)},${JSON.stringify(b)}).type`), want));
}
for (const [a,b] of [['','피자'],['치킨',' 치 킨 '],['그거','저거'],['안 할 수 없다','한다']]) {
  test(`invalid: ${a}/${b}`, () => assert.ok(evaluate(`ChoiceInput.inspect('',${JSON.stringify(a)},${JSON.stringify(b)}).message`)));
}
test('unknown asks for category', () => assert.equal(evaluate(`ChoiceInput.inspect('', '프룬젤', '트롤핀').needsCategory`), true));
test('clarification is accepted', () => assert.equal(evaluate(`ChoiceInput.inspect('', '프룬젤', '트롤핀', () => null, 'daily').category`), 'daily'));
test('attendance order invariance and explanation', () => {
  const result = evaluate(`['출근 안 한다', '출근한다'].map((a,i,arr) => {
    const b=arr[1-i], q='오늘 회사 출근할까?';
    return buildChoiceNarrative(q,a,b,6,signs[0],choiceProfile(q,a,b),12345);
  })`);
  assert.equal(result[0].winner.name, '출근한다');
  assert.equal(result[1].winner.name, '출근한다');
  assert.equal(result[0].winnerScore, result[1].winnerScore);
  assert.match(result[0].why, /실행하는/);
});
test('food order invariance across seeds', () => {
  for (let seed=0;seed<30;seed++) {
    const values = evaluate(`['피자','치킨'].map((a,i,arr) => buildChoiceNarrative('친구랑 저녁 뭐 먹을까?',a,arr[1-i],6,signs[0],choiceProfile('친구랑 저녁 뭐 먹을까?',a,arr[1-i]),${seed}))`);
    assert.equal(values[0].winner.name, values[1].winner.name);
    assert.equal(values[0].winnerScore, values[1].winnerScore);
    assert.doesNotMatch(values[0].why, /친구를 만날|연락 수단|사람을 만나/);
  }
});
test('animal question has no financial story', () => {
  const why = evaluate(`buildChoiceNarrative('동물원에서 뭐 볼까?','판다','호랑이',6,signs[0],choiceProfile('동물원에서 뭐 볼까?','판다','호랑이'),12345).why`);
  assert.doesNotMatch(why, /수익|변동성|투자/);
});
test('safety check preserved', () => assert.equal(evaluate(`dangerousChoiceCheck('음주운전 할까?', '한다', '안 한다').dangerous`), true));
test('hard-working is not fever', () => assert.equal(evaluate(`choiceProfile('열심히 출근할까?', '출근 안 한다', '출근한다').forced`), 'B'));
test('concrete food reason does not borrow snack template', () => assert.doesNotMatch(evaluate(`buildChoiceNarrative('친구랑 저녁 뭐 먹을까?','피자','치킨',6,signs[0],choiceProfile('친구랑 저녁 뭐 먹을까?','피자','치킨'),112).why`), /과자판|친구를 만날/));
test('render escapes saved text', () => {
  const nodes = new Map();
  context.document = {getElementById: (id) => {
    if (!nodes.has(id)) nodes.set(id, {classList:{add(){}}, addEventListener(){},scrollIntoView(){}});
    return nodes.get(id);
  }};
  evaluate(`openChoiceCard({date:'today',choiceA:'<img src=x onerror=alert(1)>',choiceB:'B',details:{winner:'<script>x</script>',loser:'B',percent:55,why:'<img src=x>',cards:['<b>card</b>']}})`);
  assert.doesNotMatch(nodes.get('choiceResult').innerHTML, /<img|<script>/);
});
console.log(`${count} tests passed`);
