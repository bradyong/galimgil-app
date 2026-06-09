const signs = [
  ["양자리", "♈", "불", "바로 움직일 때 빛이 나는 별"],
  ["황소자리", "♉", "땅", "천천히 쌓을수록 강해지는 별"],
  ["쌍둥이자리", "♊", "바람", "말과 연결에서 답을 찾는 별"],
  ["게자리", "♋", "물", "마음의 안전을 먼저 보는 별"],
  ["사자자리", "♌", "불", "표현할수록 선명해지는 별"],
  ["처녀자리", "♍", "땅", "작은 정리로 운을 여는 별"],
  ["천칭자리", "♎", "바람", "균형과 타이밍을 읽는 별"],
  ["전갈자리", "♏", "물", "깊은 감각으로 본질을 보는 별"],
  ["사수자리", "♐", "불", "더 넓은 선택지를 찾는 별"],
  ["염소자리", "♑", "땅", "현실적인 한 걸음에 강한 별"],
  ["물병자리", "♒", "바람", "다른 방식으로 판을 바꾸는 별"],
  ["물고기자리", "♓", "물", "직감과 분위기를 잘 읽는 별"]
];

const wordLexicon = [
  { keys: ["연락", "전화", "문자", "카톡", "메시지", "답장"], label: "연락", element: "바람", meaning: "마음을 밖으로 꺼내 확인하는 행동", advice: "말을 길게 쌓기보다 첫 문장을 가볍게 여는 쪽이 좋아요." },
  { keys: ["기다", "보류", "참을", "미룰", "나중"], label: "기다림", element: "물", meaning: "흐름이 스스로 드러날 시간을 주는 태도", advice: "기다림에 끝 시간을 붙이면 회피가 아니라 관찰이 됩니다." },
  { keys: ["아이", "자녀", "아들", "딸", "육아"], label: "아이", element: "물", meaning: "보호하고 싶은 마음과 책임감이 동시에 켜지는 단어", advice: "정답보다 안심을 먼저 만들 때 마음이 덜 흔들려요." },
  { keys: ["계곡", "바다", "강", "물놀이", "수영"], label: "물가", element: "물", meaning: "감정을 식히고 몸의 긴장을 풀어주는 장소", advice: "복잡한 대화보다 같이 숨 돌릴 장면을 만드는 쪽이 맞아요." },
  { keys: ["카페", "커피", "차", "디저트"], label: "카페", element: "바람", meaning: "무거운 결론을 부드러운 대화로 바꾸는 공간", advice: "대화의 목적을 결론이 아니라 확인으로 두면 좋아요." },
  { keys: ["여행", "이동", "놀러", "나들이"], label: "이동", element: "불", meaning: "멈춘 분위기를 새 장면으로 바꾸고 싶은 욕구", advice: "큰 계획보다 오늘 가능한 작은 이동이 운을 열 수 있어요." },
  { keys: ["돈", "구매", "살까", "계약", "투자", "가격", "매수", "매도", "관망"], label: "돈", element: "땅", meaning: "마음보다 기준과 지속성을 먼저 보라는 신호", advice: "끌림이 강할수록 조건을 숫자로 적어보면 선명해져요." },
  { keys: ["일", "회사", "이직", "퇴사", "공부", "시험", "프로젝트", "출근", "결근", "지각", "근무"], label: "일", element: "땅", meaning: "내 컨디션과 책임의 균형을 현실에서 확인하는 문제", advice: "감정의 크기보다 오늘 감당 가능한 기준을 먼저 보는 게 좋아요." },
  { keys: ["고백", "사과", "화해", "만날", "만남", "데이트"], label: "마음 표현", element: "불", meaning: "숨겨둔 진심을 장면 밖으로 꺼내는 일", advice: "세게 증명하기보다 담백하게 보여주는 쪽이 오래 갑니다." },
  { keys: ["친구", "연인", "남친", "여친", "가족", "형", "동생", "엄마", "아빠"], label: "관계", element: "바람", meaning: "나와 상대 사이의 거리와 말투를 조절하는 문제", advice: "상대의 마음을 맞히려 하기보다 내 기준을 짧게 말해보세요." },
  { keys: ["부부", "반려자", "배우자", "남편", "아내", "와이프", "신랑", "신부"], label: "반려", element: "땅", meaning: "설렘을 넘어 생활의 리듬과 신뢰를 함께 맞추는 관계", advice: "오늘은 이기는 말보다 같이 오래 갈 수 있는 말을 고르는 게 좋아요." },
  { keys: ["휴식", "쉴까", "잠", "피곤", "쉬기"], label: "휴식", element: "물", meaning: "몸이 먼저 보내는 속도 조절 신호", advice: "오늘은 더 밀어붙이는 것보다 회복 후 선택하는 편이 낫습니다." },
  { keys: ["정리", "청소", "버릴", "끊을", "끝낼"], label: "정리", element: "땅", meaning: "흐린 마음을 실제 행동으로 가볍게 만드는 과정", advice: "전부 끝내려 하지 말고 하나만 치워도 흐름이 바뀝니다." }
];

const tones = [
  "오늘은 감정보다 리듬을 믿어도 괜찮아요.",
  "이미 마음은 반쯤 알고 있고, 남은 건 표현 방식이에요.",
  "큰 결론보다 작은 실험이 더 좋은 하루예요.",
  "상대의 반응보다 내 기준을 먼저 확인해보세요.",
  "지금 필요한 건 확신보다 덜 후회할 장면이에요."
];

const aScenes = [
  "A를 고르면 오늘의 장면은 빠르게 열립니다. 머릿속에서 반복되던 생각이 현실의 반응으로 바뀌기 때문에, 답답함은 확실히 줄어들 가능성이 커요. 대신 속도가 빨라진 만큼 말의 온도를 낮추는 게 핵심입니다. 결론을 밀어붙이기보다 '나는 이렇게 느꼈어'처럼 내 상태를 설명하는 방식이 좋아요.",
  "A는 흐름을 앞으로 당기는 선택입니다. 지금 멈춰 있는 상황에 작은 파문을 만들고, 그 파문이 다음 장면을 불러올 수 있어요. 다만 상대나 상황이 바로 따라오지 않을 수도 있으니, 반응이 늦다고 해서 선택이 틀렸다고 단정하지 마세요. 오늘의 A는 정답 확인이 아니라 가능성 확인에 가깝습니다.",
  "A는 지금의 에너지를 살립니다. 오늘 안에 확인하고 싶은 마음이 크다면 좋은 실험이 될 수 있어요. 다만 기대가 높을수록 실망도 커질 수 있으니, 결과를 하나로 정해두지 않는 게 좋아요. '이 선택을 해본 나'를 관찰한다는 마음으로 가면 훨씬 편해집니다.",
  "A는 용기 쪽에 가까워요. 미뤄둔 말을 꺼내거나, 먼저 움직이거나, 분위기를 바꾸는 선택입니다. 이 선택의 장점은 후회가 줄어든다는 것이고, 단점은 마음이 잠깐 더 흔들릴 수 있다는 점이에요. 결과보다 내가 어떤 태도로 움직였는지를 기록해두면 오늘의 의미가 선명해집니다."
];

const bScenes = [
  "B를 고르면 하루가 조금 조용해집니다. 바로 부딪히지 않기 때문에 감정의 파도가 잦아들 시간을 얻을 수 있어요. 대신 머릿속에서 같은 장면을 반복하지 않게 작은 마감 시간을 정하는 게 중요합니다. 기다림이 회피로 바뀌지 않도록, 언제 다시 볼지 스스로에게 약속해두세요.",
  "B는 감정을 식히는 선택입니다. 지금의 마음이 너무 뜨겁거나, 말이 길어질 것 같거나, 상대의 반응에 크게 흔들릴 것 같다면 B가 나를 지키는 방식이 될 수 있어요. 미루는 게 아니라 정돈하는 거라면 꽤 좋은 방향입니다. 오늘은 답을 늦추는 대신 마음을 명확히 하는 날로 써보세요.",
  "B는 상황을 더 넓게 보게 합니다. 지금 보이지 않는 정보가 조금 더 들어오거나, 내 감정의 진짜 이유가 뒤늦게 드러날 수 있어요. 단, 너무 오래 기다리면 선택권이 흐려질 수 있습니다. B를 고른다면 '그냥 보류'가 아니라 '관찰 후 결정'이라는 이름을 붙여주는 게 좋아요.",
  "B는 나를 보호하는 쪽입니다. 오늘은 침묵도 하나의 메시지가 될 수 있고, 아무것도 하지 않는 시간이 오히려 관계나 상황을 덜 망가뜨릴 수도 있어요. 다만 침묵이 상대를 벌주는 방식이 되면 흐름이 탁해질 수 있습니다. 조용히 있더라도 내 안에서는 다음 행동의 기준을 정리해보세요."
];

const insightOpeners = [
  "이 고민의 중심에는 선택 자체보다, 선택 이후의 내 마음을 감당할 수 있을지에 대한 질문이 숨어 있어요.",
  "지금 중요한 건 어느 쪽이 완벽한가가 아니라, 어느 쪽을 고른 내가 덜 무너지고 더 선명해지는가예요.",
  "오늘의 갈림길은 결과 예측보다 태도 선택에 가깝습니다. 같은 선택도 어떤 말투와 속도로 하느냐에 따라 완전히 다른 장면이 됩니다.",
  "마음이 흔들리는 이유는 답이 없어서가 아니라, 두 선택 모두 나름의 진심을 갖고 있기 때문이에요."
];

const recommendedReasons = [
  "추천 선택은 오늘의 마음 온도와 별자리 키워드를 함께 보았을 때, 후회를 줄이고 다음 장면을 만들 가능성이 더 큰 쪽입니다.",
  "이 선택은 지금 당장의 불안을 모두 없애주진 않지만, 내 기준을 확인하기에는 더 좋은 길로 보여요.",
  "오늘은 완벽한 해결보다 작은 움직임이 필요합니다. 추천 선택은 상황을 망치지 않으면서도 흐름을 확인할 수 있는 쪽이에요.",
  "이 길은 정답이라기보다 오늘의 나에게 맞는 실험에 가깝습니다. 해보고 나서 마음이 어떻게 변하는지 보는 것이 핵심이에요."
];

const oneLineScripts = [
  "지금 바로 결론내리기보다, 내 마음을 먼저 확인하고 싶어.",
  "나는 이걸 피하고 싶은 게 아니라, 조금 더 정확하게 말하고 싶어.",
  "오늘은 크게 결정하지 않고 작게 확인해볼게.",
  "답을 강요하기보다, 지금 가능한 한 걸음만 해볼게."
];

const checkinQuestions = [
  "밤에 다시 물어보세요. 나는 결과 때문에 흔들렸나, 아니면 선택한 나 자신 때문에 편해졌나?",
  "오늘 끝나기 전에 적어보세요. 이 선택이 내 마음을 좁혔나, 넓혔나?",
  "잠들기 전에 확인해보세요. 내가 정말 원한 건 답이었나, 안심이었나?",
  "하루가 끝나면 기록해보세요. 오늘의 나는 기다림과 움직임 중 무엇을 더 잘 다뤘나?"
];

const loaderSteps = [
  "고민의 무게와 선택지의 온도를 맞춰보고 있어요.",
  "별자리 키워드와 마음 온도를 겹쳐보는 중이에요.",
  "A와 B의 장면을 각각 펼쳐보고 있어요.",
  "오늘 밤 체크인 질문을 고르고 있어요."
];

const missions = [
  "결정 전에 물 한 컵 마시고, 30초 동안 손바닥을 펴보기",
  "A와 B 중 하나를 고른 뒤, 반대 선택의 장점도 한 줄 적기",
  "오늘 밤에 '내가 피하고 싶었던 감정'을 한 단어로 저장하기",
  "누군가에게 바로 답하지 말고, 문장을 한 번 더 짧게 다듬기",
  "선택 이후 생긴 첫 감정을 캡처하듯 메모하기"
];

const chemistryStrengths = [
  "둘은 말이 많지 않아도 분위기를 빠르게 읽는 편이에요. 한쪽이 지쳐 있을 때 다른 한쪽이 무리하게 캐묻지 않는 배려가 강점입니다.",
  "함께 있을 때 평소보다 솔직해질 수 있는 조합이에요. 사소한 농담이 긴장을 풀어주고, 어색했던 순간도 비교적 빨리 회복하는 힘이 있습니다.",
  "서로 다른 장점을 자연스럽게 나눠 쓰는 케미예요. 한쪽이 방향을 잡으면 다른 한쪽이 현실적인 디테일을 채워줄 수 있습니다.",
  "둘 사이에는 익숙함 속에서도 작은 새로움을 만드는 힘이 있어요. 같이 무언가를 계획하거나 처음 해보는 일을 시작할 때 리듬이 잘 맞습니다."
];

const chemistryFrictions = [
  "다만 한쪽은 바로 말하고 싶을 때, 다른 한쪽은 혼자 정리할 시간이 필요할 수 있어요. 답이 늦다고 마음까지 멀어진 것은 아닐 가능성이 큽니다.",
  "서로 기대하는 배려의 모양이 조금 다를 수 있어요. 알아서 눈치채주길 기다리기보다 원하는 것을 짧고 구체적으로 말하면 훨씬 편해집니다.",
  "가까운 사이일수록 농담과 진심의 경계가 흐려질 때가 있어요. 서운한 일이 생기면 오래 쌓아두지 말고 그날의 감정만 작게 꺼내보세요.",
  "둘 다 자기 방식이 분명해서, 사소한 결정에서도 은근히 줄다리기가 생길 수 있어요. 누가 이겼는지보다 이번에는 누가 더 중요한지 정하는 게 좋습니다."
];

const chemistryMessages = [
  "오늘은 정답보다 네 생각을 먼저 듣고 싶어.",
  "내가 혼자 추측하지 않게, 네 마음을 조금만 알려줘.",
  "우리 방식이 달라도 사이가 틀린 건 아니라고 생각해.",
  "오늘은 거창한 얘기 말고 편하게 같이 웃고 싶어."
];

const chemistryMissions = [
  "서로에게 최근 고마웠던 일을 하나씩 말해보기",
  "각자 먹고 싶은 메뉴를 하나씩 말하고 동전 던지기로 정하기",
  "사진첩에서 함께 웃겼던 사진 하나를 골라 보내기",
  "10분 동안 조언 없이 상대의 얘기만 들어보기",
  "서로가 요즘 자주 듣는 노래를 한 곡씩 공유하기"
];

const chemistryOpeners = [
  "둘의 케미는 큰 사건보다 작은 반응에서 더 잘 보여요.",
  "오늘 이 조합은 서로를 맞히려 하기보다 리듬을 확인할 때 좋아요.",
  "둘 사이에는 말보다 분위기가 먼저 움직이는 구간이 있어요.",
  "지금은 누가 더 맞는지보다, 서로가 편해지는 속도를 보는 게 중요해요.",
  "이 관계는 익숙한 말투 하나에도 온도가 달라지는 타입이에요.",
  "오늘은 관계를 단정하기보다, 작은 장면 하나로 힌트를 얻는 날이에요."
];

const chemistryAdvicePieces = [
  "질문을 크게 던지기보다 하나만 물어보면 답이 더 부드럽게 나옵니다.",
  "상대의 반응이 느려도 마음이 없는 쪽으로 바로 해석하지 마세요.",
  "오늘은 농담을 섞되, 핵심 문장은 흐리지 않는 게 좋아요.",
  "같이 웃을 수 있는 장면을 먼저 만들면 진짜 대화가 뒤따라오기 쉽습니다.",
  "이미 아는 사이라고 해도 오늘의 기분은 새로 확인하는 편이 안전해요.",
  "서운함을 꺼낼 때는 과거 전체보다 오늘 생긴 감정 하나만 말해보세요.",
  "두 사람의 속도가 다르면 빠른 쪽이 한 박자만 낮춰주는 게 좋아요.",
  "결론을 요구하기보다 선택지를 둘 정도로 좁혀주면 편해집니다."
];

const chemistryMissionObjects = [
  "서로에게 오늘 좋았던 장면 하나를 사진처럼 설명하기",
  "답을 정하기 전에 각자 원하는 분위기를 한 단어로 말하기",
  "상대가 고른 메뉴나 장소에 이유를 하나만 물어보기",
  "오늘 밤 짧은 음성이나 메시지로 고마운 점 하나 남기기",
  "서운했던 말 대신 바랐던 행동을 한 문장으로 바꿔 말하기",
  "같이 할 수 있는 아주 작은 약속 하나만 정하기",
  "각자 요즘 자주 생각나는 장소를 하나씩 공유하기",
  "상대가 말할 때 바로 해결책을 주지 않고 마지막까지 듣기"
];

const archiveKey = "crossroads-choice-cards-v1";
const lastDateKey = "crossroads-last-date-v1";
const streakKey = "crossroads-streak-v1";
const productionUrl = "https://galimgil-app.onrender.com/";
let archive = loadArchive();

function hashText(text) {
  return [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function findWordInsights(...values) {
  const text = values.join(" ").toLowerCase();
  const found = wordLexicon.filter((entry) => entry.keys.some((key) => text.includes(key)));
  if (found.length) {
    return found.slice(0, 3);
  }
  return [wordLexicon[Math.abs(hashText(text || "갈림길")) % wordLexicon.length]];
}

function elementBridge(element, signElement) {
  const bridges = {
    "불-불": "불의 기운이 겹쳐져서 오늘은 생각보다 행동이 먼저 나올 수 있어요.",
    "불-물": "불은 움직이고 물은 식히려 해서, 속도와 감정 조절이 핵심이에요.",
    "불-땅": "불의 추진력에 땅의 기준이 붙으면 충동이 계획으로 바뀝니다.",
    "불-바람": "불과 바람은 말을 빠르게 키우니, 표현은 선명하되 짧게 가는 게 좋아요.",
    "물-불": "물의 감정과 불의 추진력이 만나서, 마음은 깊고 결정은 빠를 수 있어요.",
    "물-물": "물의 기운이 겹쳐 감정의 결이 섬세해지는 날이에요.",
    "물-땅": "물의 감정을 땅의 기준으로 받쳐주면 흔들림이 덜해집니다.",
    "물-바람": "물과 바람이 만나면 마음과 말 사이의 간격을 조심해야 해요.",
    "땅-불": "땅의 현실감과 불의 용기가 만나, 작지만 확실한 행동이 좋아요.",
    "땅-물": "땅은 기준을 세우고 물은 마음을 살피니, 안정감 있는 선택이 강해집니다.",
    "땅-땅": "땅의 기운이 겹쳐서 오늘은 감보다 조건과 지속성이 중요해요.",
    "땅-바람": "땅의 기준과 바람의 대화가 만나면, 말로 정리할수록 답이 보입니다.",
    "바람-불": "바람은 불을 키우니, 한마디가 흐름을 크게 바꿀 수 있어요.",
    "바람-물": "바람의 말과 물의 감정이 만나, 다정하지만 정확한 표현이 필요합니다.",
    "바람-땅": "바람의 아이디어를 땅의 현실감으로 붙잡아야 오래 갑니다.",
    "바람-바람": "바람의 기운이 겹쳐 생각과 대화가 많아지는 날이에요."
  };
  return bridges[`${element}-${signElement}`] || "오늘의 단어와 별자리 키워드가 만나, 선택의 의미를 조금 더 또렷하게 보여줍니다.";
}

function wordChipMarkup(insights) {
  return `<div class="word-chip-row">${insights.map((item) => `<span class="word-chip">${escapeHtml(item.label)} · ${escapeHtml(item.element)}</span>`).join("")}</div>`;
}

function choiceWordReading(insights, sign, recommended) {
  const main = insights[0];
  const second = insights[1] || insights[0];
  return `
    ${wordChipMarkup(insights)}
    <p><strong>${escapeHtml(main.label)}</strong>은 사전적으로 ${main.meaning}에 가까운 단어예요. 오늘 고민 안에서 이 단어는 단순한 장소나 행동이 아니라, 내가 어떤 방식으로 안심하고 싶은지를 보여줍니다.</p>
    <p>${sign[1]} ${escapeHtml(sign[0])}의 ${sign[2]} 기운과 만나면, ${elementBridge(main.element, sign[2])} 그래서 <strong>${escapeHtml(recommended)}</strong> 쪽은 ${second.advice}</p>
  `;
}

function pathStory(label, choice, baseStory, insights, seed) {
  const insight = pick(insights, seed);
  const endings = [
    `${insight.label}의 뜻으로 보면 이 선택은 '${insight.meaning}'을 현실에서 시험해보는 쪽이에요.`,
    `이 선택 안에는 ${insight.label}이라는 단어가 가진 '${insight.meaning}'의 결이 숨어 있어요.`,
    `${insight.label}의 기운을 빌리면, 이 길은 ${insight.advice}`
  ];
  return `${baseStory} ${pick(endings, seed + label.charCodeAt(0))}`;
}

function chemistryReading(relation, question, mySignData, theirSignData, insights, seed) {
  const main = pick(insights, seed + relation.length);
  const relationTone = relation.includes("부부") || relation.includes("반려자")
    ? "설렘보다 생활의 리듬과 신뢰가 더 크게 작동하는 관계"
    : relation.includes("연인")
    ? "설렘과 확인 욕구가 같이 움직이는 관계"
    : relation.includes("친구")
      ? "편함 속에서도 말투 하나에 온도가 달라지는 관계"
      : relation.includes("가족")
        ? "익숙해서 더 조심히 말해야 하는 관계"
        : "역할과 친밀감이 섞여 리듬 조절이 중요한 관계";
  return `
    ${wordChipMarkup(insights)}
    <p><strong>${escapeHtml(main.label)}</strong>은 ${main.meaning}이라는 뜻으로 읽혀요. 지금 질문인 <strong>${escapeHtml(question)}</strong> 안에서는 이 단어가 두 사람 사이에서 무엇을 확인하고 싶은지 보여줍니다.</p>
    <p>${escapeHtml(relation)}은 ${relationTone}예요. ${mySignData[1]} ${mySignData[2]}과 ${theirSignData[1]} ${theirSignData[2]}이 만나면 ${elementBridge(main.element, theirSignData[2])} 오늘은 ${main.advice}</p>
  `;
}

function showResult(element, html) {
  element.innerHTML = html;
  element.classList.add("show");
}

function getShareUrl() {
  if (location.protocol === "https:" && !location.hostname.includes("127.0.0.1") && !location.hostname.includes("localhost")) {
    return `${location.origin}${location.pathname}`;
  }
  return productionUrl;
}

function shareActionMarkup(cardId) {
  return `
    <div class="share-actions">
      <button class="secondary-button" id="${cardId}ShareButton" type="button">내 카드 공유</button>
      <button class="ghost-button" id="${cardId}InviteButton" type="button">친구에게 보내기</button>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function hasBatchim(value) {
  const chars = [...String(value).trim()];
  const last = chars[chars.length - 1];
  if (!last) return false;
  const code = last.charCodeAt(0) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function withParticle(value, batchimParticle, noBatchimParticle) {
  return `${escapeHtml(value)}${hasBatchim(value) ? batchimParticle : noBatchimParticle}`;
}

function scenarioActionText(subject, option, category, intent) {
  if (intent === "skip") return `${escapeHtml(subject)}은 ${escapeHtml(option)}`;
  if (category === "food") return `${withParticle(subject, "을", "를")} ${escapeHtml(option)}`;
  if (category === "childcare" || category === "place") return `${escapeHtml(subject)}에 ${escapeHtml(option)}`;
  return `${escapeHtml(subject)} ${escapeHtml(option)}`;
}

function featurePairText(first, second) {
  return `${escapeHtml(first)}, ${withParticle(second, "이", "가")}`;
}

function loadArchive() {
  try {
    return JSON.parse(localStorage.getItem(archiveKey)) || [];
  } catch {
    return [];
  }
}

function saveArchive() {
  try {
    localStorage.setItem(archiveKey, JSON.stringify(archive.slice(0, 30)));
  } catch {
    // Some embedded browsers can block storage on file:// pages.
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak() {
  let streak = 1;
  try {
    const lastDate = localStorage.getItem(lastDateKey);
    streak = Number(localStorage.getItem(streakKey) || "0");
    if (lastDate !== todayKey()) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      streak = lastDate === yesterday.toISOString().slice(0, 10) ? streak + 1 : 1;
      localStorage.setItem(lastDateKey, todayKey());
      localStorage.setItem(streakKey, String(streak));
    }
  } catch {
    streak = Math.max(archive.length, 1);
  }
  document.getElementById("streakCount").textContent = `${streak}일`;
}

function updateMoodLabel(value) {
  const label = value <= 3 ? "잔잔함" : value <= 6 ? "흔들림" : value <= 8 ? "고민중" : "폭풍전야";
  document.getElementById("moodLabel").textContent = label;
}

function moodReading(value) {
  if (value <= 3) {
    return "마음 온도가 낮은 편이라, 오늘은 크게 흔들리기보다 차분히 비교할 수 있는 상태예요. 이런 날에는 감정적인 결론보다 현실적인 기준이 잘 보입니다.";
  }
  if (value <= 6) {
    return "마음이 살짝 흔들리지만 아직 중심을 잡을 수 있는 온도예요. 지금은 누가 맞는지보다, 내가 어떤 장면에서 편해지는지를 보는 게 좋습니다.";
  }
  if (value <= 8) {
    return "마음 온도가 꽤 올라와 있어요. 오늘은 선택을 빨리 끝내고 싶은 마음과 실수하고 싶지 않은 마음이 동시에 움직입니다.";
  }
  return "마음 온도가 아주 높습니다. 이럴 때는 선택보다 표현 방식이 더 중요해요. 강한 감정이 지나간 뒤에도 내가 납득할 수 있는 말투를 고르는 게 좋습니다.";
}

function questionType(question) {
  const text = question.toLowerCase();
  if (text.includes("연락") || text.includes("사람") || text.includes("친구") || text.includes("상대") || text.includes("사랑")) {
    return ["관계형", "이 고민은 관계의 온도와 말의 타이밍이 함께 걸려 있어요. 그래서 선택보다 표현 방식이 결과를 더 많이 바꿀 수 있습니다."];
  }
  if (text.includes("돈") || text.includes("살까") || text.includes("구매") || text.includes("투자") || text.includes("계약")) {
    return ["현실형", "이 고민은 감정보다 손익과 지속성이 중요해 보여요. 오늘은 끌림보다 기준표를 먼저 세우는 쪽이 안전합니다."];
  }
  if (text.includes("일") || text.includes("회사") || text.includes("이직") || text.includes("공부") || text.includes("프로젝트")) {
    return ["성장형", "이 고민은 지금 편한 길과 나중에 커지는 길 사이에 놓여 있어요. 피로감과 가능성을 같이 봐야 합니다."];
  }
  return ["내면형", "이 고민은 겉으로는 선택 문제처럼 보이지만, 실제로는 내가 어떤 사람이 되고 싶은지에 가까워요."];
}

function buildMetrics(seed, mood, choiceA, choiceB) {
  const balance = 48 + ((seed + choiceA.length + choiceB.length) % 45);
  const courage = 42 + ((seed * 3 + mood * 7) % 50);
  const clarity = 45 + ((seed * 5 + Math.abs(choiceA.length - choiceB.length)) % 48);
  const timing = 44 + ((seed * 7 + mood * 3) % 49);
  return { balance, courage, clarity, timing };
}

function metricMarkup(metrics) {
  return `
    <div class="metric-grid">
      <div><span>균형감</span><strong>${metrics.balance}</strong></div>
      <div><span>용기</span><strong>${metrics.courage}</strong></div>
      <div><span>명료도</span><strong>${metrics.clarity}</strong></div>
      <div><span>타이밍</span><strong>${metrics.timing}</strong></div>
    </div>
  `;
}

function timingAdvice(metrics, mood) {
  if (mood >= 8) {
    return "오늘 바로 움직인다면 긴 문장보다 짧은 문장이 좋아요. 마음이 뜨거운 날에는 설명이 길어질수록 본뜻이 흐려질 수 있습니다.";
  }
  if (metrics.timing >= 75) {
    return "타이밍 점수가 높은 편이라, 오늘 안에 작은 신호를 보내거나 첫 단계를 시작해도 좋아요. 다만 한 번에 모든 결론을 내리려 하진 마세요.";
  }
  if (metrics.clarity < 60) {
    return "명료도가 아직 낮은 편이라, 바로 결정하기 전에 A와 B를 각각 선택했을 때 잃는 것을 하나씩 적어보면 좋아요.";
  }
  return "오늘은 완전히 멈추기보다 아주 작은 확인이 잘 맞습니다. 10분 안에 끝낼 수 있는 행동 하나만 정해보세요.";
}

function includesAny(text, words) {
  return words.some((word) => text.includes(word));
}

function choiceProfile(question, choiceA, choiceB) {
  const text = `${question} ${choiceA} ${choiceB}`.toLowerCase();
  const a = choiceA.toLowerCase();
  const b = choiceB.toLowerCase();
  const profile = { type: "general", forced: null };
  if (includesAny(text, ["출근", "결근", "지각", "근무", "회사 가", "일하러"])) {
    profile.type = "attendance";
    const healthReason = includesAny(text, ["아프", "열", "몸살", "병원", "독감", "응급", "다쳤", "쓰러", "생리통", "장염"]);
    if (healthReason) {
      profile.forced = includesAny(a, ["안", "쉬", "결근", "병원"]) ? "A" : includesAny(b, ["안", "쉬", "결근", "병원"]) ? "B" : null;
    } else {
      profile.forced = includesAny(a, ["출근", "회사", "근무", "간다", "가"]) ? "A" : includesAny(b, ["출근", "회사", "근무", "간다", "가"]) ? "B" : null;
    }
  } else if (includesAny(text, ["퇴사", "이직", "그만둘", "관둘"])) {
    profile.type = "career";
    profile.forced = includesAny(a, ["유지", "계속", "보류", "기다"]) ? "A" : includesAny(b, ["유지", "계속", "보류", "기다"]) ? "B" : null;
  } else if (includesAny(text, ["매수", "매도", "투자", "코인", "주식", "살까"])) {
    profile.type = "money";
    profile.forced = includesAny(a, ["관망", "기다", "보류"]) ? "A" : includesAny(b, ["관망", "기다", "보류"]) ? "B" : null;
  } else if (includesAny(text, ["고백", "연락", "사과", "화해"])) {
    profile.type = "relationship";
  } else if (includesAny(text, ["아이", "아기", "개월", "키즈카페", "놀이터", "어린이집", "육아"])) {
    profile.type = "childcare";
    const badOutdoor = includesAny(text, ["비", "눈", "춥", "덥", "미세먼지", "황사", "폭염", "한파"]);
    if (!badOutdoor && includesAny(a, ["놀이터", "공원", "산책"])) profile.forced = "A";
    if (!badOutdoor && includesAny(b, ["놀이터", "공원", "산책"])) profile.forced = "B";
    if (badOutdoor && includesAny(a, ["키즈카페", "실내", "카페"])) profile.forced = "A";
    if (badOutdoor && includesAny(b, ["키즈카페", "실내", "카페"])) profile.forced = "B";
  }
  return profile;
}

function decideRecommendation(seed, mood, profile) {
  if (profile.forced === "A") return true;
  if (profile.forced === "B") return false;
  return (seed + mood) % 2 === 0;
}

function reasonBullets(metrics, mood, wordInsights, recommended, profile) {
  if (profile.type === "attendance") {
    return [
      "출근 여부는 운보다 책임, 컨디션, 이후 부담을 같이 봐야 하는 현실형 선택입니다.",
      `${recommended} 쪽은 오늘 당장의 귀찮음보다 내일 생길 부담을 더 작게 만드는 방향입니다.`,
      "몸이 정말 아픈 상황이 아니라면, 짧게라도 움직이는 쪽이 후회를 줄일 가능성이 큽니다."
    ];
  }
  if (profile.type === "career") {
    return [
      "퇴사나 이직은 감정이 아니라 다음 생활비와 회복 시간을 같이 봐야 하는 선택입니다.",
      `${recommended} 쪽은 오늘의 분노보다 이후의 안정성을 더 지키는 방향입니다.`,
      "지금은 결론보다 조건표를 만드는 게 먼저입니다."
    ];
  }
  if (profile.type === "money") {
    return [
      "돈이 걸린 선택은 확신보다 손실 한도를 먼저 정해야 합니다.",
      `${recommended} 쪽은 감정적인 진입보다 리스크 관리에 더 가깝습니다.`,
      "오늘은 기회보다 원칙을 지키는지가 더 중요합니다."
    ];
  }
  if (profile.type === "relationship") {
    return [
      "관계 선택은 상대의 답보다 내가 어떤 말투로 다가가는지가 더 중요합니다.",
      `${recommended} 쪽은 마음을 숨기기보다 부담을 줄여 확인하는 방향입니다.`,
      "오늘은 크게 증명하기보다 짧고 정확하게 표현하는 편이 좋습니다."
    ];
  }
  const main = wordInsights[0];
  const bullets = [
    `지금은 ${main.label}의 뜻처럼 ${main.meaning} 쪽을 조금 더 봐야 해요.`,
    metrics.balance >= 70 ? "두 선택 중 균형감이 더 살아나는 쪽을 고르는 편이 좋습니다." : "완벽한 답보다 후회를 줄이는 기준이 더 중요합니다.",
    mood >= 8 ? "감정이 강한 날이라 결론보다 표현 방식을 조심해야 합니다." : `${recommended} 쪽이 오늘의 리스크를 조금 더 작게 관리합니다.`
  ];
  return bullets.slice(0, 3);
}

function cautionBullets(metrics, mood, profile) {
  if (profile.type === "attendance") {
    return [
      "정말 아픈 게 아니라면 단순한 피곤함만으로 결근 결정을 크게 만들지 마세요.",
      "가야 한다면 완벽하게 버티려 하지 말고, 오늘 할 최소 업무만 정하세요.",
      "쉬어야 할 정도라면 무단으로 넘기지 말고 먼저 연락과 사유 정리를 하세요."
    ];
  }
  if (profile.type === "career") {
    return [
      "화난 날 바로 퇴사 결정을 확정하지 마세요.",
      "생활비, 다음 일정, 인수인계처럼 현실 조건을 적기 전에는 말부터 꺼내지 마세요.",
      "버티는 선택을 하더라도 그냥 참지만 말고 바꿀 조건 하나를 정하세요."
    ];
  }
  if (profile.type === "money") {
    return [
      "남의 말이나 분위기만 보고 들어가지 마세요.",
      "손실 한도를 정하지 않은 선택은 하지 마세요.",
      "오늘 놓치면 끝이라는 생각이 들수록 한 번 더 멈추세요."
    ];
  }
  const bullets = [
    mood >= 8 ? "조급한 마음으로 긴 메시지를 보내지 마세요." : "너무 오래 재다가 타이밍을 놓치지 마세요.",
    metrics.clarity < 60 ? "확신이 낮다면 주변 의견보다 내 기준을 먼저 적어보세요." : "확신이 생겨도 한 번에 모든 걸 바꾸려 하지 마세요.",
    metrics.timing < 65 ? "오늘 안에 결론을 강요하지 마세요." : "좋은 타이밍이어도 상대나 상황의 속도를 무시하지 마세요."
  ];
  return bullets;
}

function oneLineAdvice(seed, metrics, mood, profile) {
  if (profile.type === "attendance") return "가기 싫은 날일수록, 오늘의 최소 기준만 지켜도 이긴다.";
  if (profile.type === "career") return "큰 결정은 감정이 지나간 뒤에도 같은 이유가 남을 때 한다.";
  if (profile.type === "money") return "돈이 걸린 선택은 기회보다 원칙이 먼저다.";
  if (profile.type === "relationship") return "마음은 크게 느껴도, 말은 작고 정확하게 건네라.";
  if (profile.type === "childcare") return "아이와의 외출은 많이 노는 것보다 무사히 웃고 돌아오는 게 이긴다.";
  const lines = [
    "조급함은 기회를 놓치게 만든다.",
    "결정은 빠르게, 행동은 신중하게.",
    "확신이 없을수록 원칙을 지켜라.",
    "오늘의 답은 큰 결론보다 작은 기준에 있다.",
    "마음이 흔들릴수록 선택은 단순해야 한다.",
    "기다림도 기준이 있으면 선택이 된다.",
    "좋은 선택은 나를 덜 흐리게 만든다.",
    "지금 필요한 건 완벽한 답보다 다음 한 걸음이다."
  ];
  if (mood >= 8) return "뜨거운 마음일수록 짧고 신중하게 움직여라.";
  if (metrics.clarity < 60) return "흐린 날에는 원칙이 방향이 된다.";
  return pick(lines, seed + metrics.timing);
}

function resultHeadline(profile, recommendA) {
  const side = recommendA ? "A" : "B";
  if (profile.type === "attendance") {
    return `오늘은 ${side} 선택이 현실적으로 더 안전합니다.`;
  }
  if (profile.type === "career") {
    return `오늘은 ${side} 선택이 후회를 줄이기 쉽습니다.`;
  }
  if (profile.type === "money") {
    return `오늘은 ${side} 선택이 리스크 관리에 더 가깝습니다.`;
  }
  if (profile.type === "relationship") {
    return `오늘은 ${side} 선택이 마음을 덜 흐리게 합니다.`;
  }
  if (profile.type === "childcare") {
    return `오늘은 ${side} 선택이 아이와 보호자 모두에게 더 편합니다.`;
  }
  return `오늘은 ${side} 선택이 조금 더 유리합니다.`;
}

function realityReading(profile, question, choiceA, choiceB, recommended, mood) {
  const safeRecommended = escapeHtml(recommended);
  if (profile.type === "childcare") {
    const text = `${choiceA} ${choiceB} ${question}`.toLowerCase();
    if (text.includes("키즈카페") && text.includes("놀이터")) {
      const childReads = [
        `형이 현실적으로 보면, 이건 "어디가 더 재밌냐"보다 <strong>36개월 아이가 안 다치고 기분 좋게 끝낼 수 있냐</strong>가 핵심이에요. 키즈카페는 실내라 편하고 장난감도 많지만, 큰 형아들이 뛰어다니면 작은 아이는 부딪히기 쉽고 소리 자극도 커요. 놀이터는 날씨랑 보호자 체력 변수가 있지만, 공간이 열려 있어서 아이 속도에 맞춰 빼기 좋습니다. 그래서 오늘은 <strong>${safeRecommended}</strong> 쪽이 더 현실적으로 보여요.`,
        `이 질문은 은근 육아 난이도 높은 갈림길이에요. 키즈카페는 부모 입장에선 편한데, 36개월 아이한테는 형아들 동선, 미끄럼틀 주변 충돌, 시끄러운 소리까지 한 번에 들어올 수 있어요. 반대로 놀이터는 계속 봐줘야 하지만 아이가 답답해지기 전에 방향을 바꾸기 쉽죠. 오늘은 <strong>${safeRecommended}</strong>으로 가는 게 아이 컨디션을 덜 흔들 가능성이 커요.`,
        `솔직히 키즈카페는 "편한데 변수 많은 실내", 놀이터는 "귀찮은데 통제하기 쉬운 야외"에 가까워요. 36개월이면 아직 큰 아이들 속도에 맞추기 어렵고, 부딪히면 바로 울거나 컨디션이 꺾일 수 있거든요. 그래서 오늘 선택 기준은 재미 최대치가 아니라 사고 없이 웃고 돌아오기예요. 그 기준이면 <strong>${safeRecommended}</strong> 쪽이 더 낫습니다.`
      ];
      return pick(childReads, hashText(`${question}-${choiceA}-${choiceB}-${recommended}`));
    }
    return `형이 보기엔 이건 장소 이름보다 <strong>아이 컨디션, 안전, 보호자 체력</strong> 싸움이에요. 36개월 전후 아이는 "재밌다"가 순식간에 "힘들다"로 바뀔 수 있어서 오래 버티는 코스보다 빨리 정리 가능한 코스가 이깁니다. 그래서 오늘은 <strong>${safeRecommended}</strong> 쪽이 아이도 보호자도 덜 지치는 선택이에요.`;
  }
  if (profile.type === "attendance") {
    return `솔직히 출근 고민은 운세보다 현실이 먼저 때립니다. 지금은 "가기 싫다"보다 <strong>안 갔을 때 내일 따라오는 부담</strong>이 더 커요. 진짜 아픈 게 아니라면 오늘 빠지는 순간은 편한데, 설명하고 메우는 일은 내일 다시 옵니다. 그래서 <strong>${safeRecommended}</strong> 쪽이 현실적으로 덜 피곤한 선택이에요.`;
  }
  if (profile.type === "career") {
    return `퇴사나 이직은 마음만 보면 당장 시원한데, 통장과 다음 일정이 바로 따라붙는 선택이에요. 형이 보기엔 오늘은 "나 진짜 못 버티겠다"보다 <strong>그만둔 뒤 버틸 판이 있냐</strong>를 먼저 봐야 해요. 그래서 <strong>${safeRecommended}</strong> 쪽이 감정은 덜 시원해도 후폭풍을 줄이는 선택입니다.`;
  }
  if (profile.type === "money") {
    return `돈 들어가는 선택은 재밌는 냄새가 날수록 더 조심해야 해요. "지금 아니면 늦나?"라는 마음이 들 때가 제일 위험하거든요. 오늘은 수익 상상보다 <strong>틀렸을 때 얼마나 다치냐</strong>를 먼저 보는 게 맞고, 그 기준이면 <strong>${safeRecommended}</strong> 쪽이 리스크를 덜 키웁니다.`;
  }
  if (profile.type === "relationship") {
    return `관계 고민은 정답보다 말투가 판을 바꿔요. 마음이 크다고 크게 던지면 상대는 답보다 부담을 먼저 받을 수 있거든요. 오늘은 감정을 숨기는 게 아니라 <strong>받을 수 있는 크기로 건네는 것</strong>이 중요하고, 그쪽에 가까운 선택이 <strong>${safeRecommended}</strong>이에요.`;
  }
  return `형이 보기엔 <strong>${escapeHtml(question)}</strong> 이 고민은 마음은 한쪽으로 끌리는데, 현실이 "잠깐만" 하고 붙잡는 모양이에요. 오늘은 멋진 선택보다 하고 나서 덜 찝찝한 선택이 이깁니다. 그래서 <strong>${safeRecommended}</strong> 쪽이 조금 더 안정적으로 보여요.`;
}

function fortuneReading(sign, mood, wordInsights, seed, profile, question, choiceA, choiceB, recommended) {
  const main = wordInsights[0];
  const safeQuestion = escapeHtml(question);
  const safeA = escapeHtml(choiceA);
  const safeB = escapeHtml(choiceB);
  const safeRecommended = escapeHtml(recommended);
  const signLens = {
    "양자리": {
      focus: "바로 움직이고 싶은 마음",
      childcare: "아이가 먼저 뛰어나가려는 순간을 잡아주는 보호자 속도",
      warning: "시작은 빠르지만 멈추는 타이밍을 놓치기 쉬워요."
    },
    "황소자리": {
      focus: "몸이 편하고 오래 유지되는 안정감",
      childcare: "아이의 체력과 간식, 귀가 시간을 현실적으로 맞추는 감각",
      warning: "익숙한 선택만 고르면 새 즐거움이 줄어들 수 있어요."
    },
    "쌍둥이자리": {
      focus: "장소보다 분위기와 반응을 빨리 읽는 감각",
      childcare: "아이 표정이 바뀌는 순간 바로 코스를 바꾸는 유연함",
      warning: "선택지가 많아지면 오히려 집중이 흐려질 수 있어요."
    },
    "게자리": {
      focus: "안전하고 편안하게 마무리되는 느낌",
      childcare: "아이가 낯선 자극에 놀라지 않게 품을 만들어주는 흐름",
      warning: "걱정이 커지면 재미를 시작하기 전부터 줄일 수 있어요."
    },
    "사자자리": {
      focus: "즐겁게 기억에 남는 장면을 만드는 힘",
      childcare: "아이에게 '오늘 재밌었다'는 표정을 남겨주는 선택",
      warning: "더 신나게 해주려다 과한 자극으로 넘어갈 수 있어요."
    },
    "처녀자리": {
      focus: "동선, 준비물, 위험 요소를 미리 정리하는 감각",
      childcare: "신발, 물, 간식, 화장실 위치까지 챙기는 현실 운",
      warning: "완벽하게 준비하려다 출발이 늦어질 수 있어요."
    },
    "천칭자리": {
      focus: "아이의 즐거움과 보호자의 편함 사이 균형",
      childcare: "재미와 안전을 동시에 맞추는 장소 감각",
      warning: "둘 다 좋아 보이면 결정이 늦어질 수 있어요."
    },
    "전갈자리": {
      focus: "겉으로 보이는 재미보다 숨은 피로를 읽는 감각",
      childcare: "아이의 흥분 뒤에 오는 피곤함까지 미리 보는 흐름",
      warning: "예민하게 읽다 보면 작은 변수도 크게 느껴질 수 있어요."
    },
    "사수자리": {
      focus: "답답함을 풀어주는 넓은 장면",
      childcare: "아이가 몸을 쓰며 기분을 풀 수 있는 열린 흐름",
      warning: "너무 멀리 가면 귀가 타이밍이 흔들릴 수 있어요."
    },
    "염소자리": {
      focus: "무리 없이 끝낼 수 있는 현실적인 계획",
      childcare: "놀고, 정리하고, 돌아오는 시간표가 살아나는 운",
      warning: "재미보다 효율만 보면 아이의 만족이 줄어들 수 있어요."
    },
    "물병자리": {
      focus: "늘 하던 방식 말고 다른 선택지를 보는 감각",
      childcare: "아이에게 새로운 자극을 주되 거리를 두고 관찰하는 흐름",
      warning: "새로움이 많으면 아이가 산만해질 수 있어요."
    },
    "물고기자리": {
      focus: "분위기와 컨디션을 부드럽게 읽는 직감",
      childcare: "아이의 말보다 표정과 몸짓을 먼저 읽는 흐름",
      warning: "감정에 맞춰주다 보면 귀가 기준이 흐려질 수 있어요."
    }
  };
  const lens = signLens[sign[0]] || signLens["염소자리"];
  const elementTone = {
    "불": [
      "불의 기운은 아이디어보다 움직임을 먼저 켜지만, 오늘은 속도를 반 박자 낮출 때 운이 안정됩니다.",
      "불의 흐름이 강한 날이라 시작은 빠르지만, 마무리를 짧게 잡아야 좋은 기억으로 남아요.",
      "오늘의 불 기운은 큰 결심보다 작은 실행에 잘 붙습니다."
    ],
    "땅": [
      "땅의 기운은 몸의 컨디션과 실제 동선을 먼저 보라고 말합니다.",
      "오늘의 땅 기운은 화려한 선택보다 관리하기 쉬운 선택에 힘을 실어줘요.",
      "땅의 기운이 강해서 비용, 시간, 체력처럼 손에 잡히는 현실 체크가 먼저예요."
    ],
    "바람": [
      "바람의 기운은 분위기와 이동 흐름을 살피게 하지만, 변수가 많으면 금방 산만해질 수 있어요.",
      "오늘의 바람은 답을 크게 정하기보다 가볍게 움직여보고 조정하는 쪽에 가깝습니다.",
      "바람의 흐름은 선택을 복잡하게 만들 수 있어서, 기준을 짧게 잡을수록 좋아요."
    ],
    "물": [
      "물의 기운은 감정과 피로도를 민감하게 읽습니다. 오늘은 편안하게 끝나는 선택이 복을 부릅니다.",
      "오늘의 물 흐름은 자극보다 안정, 설렘보다 회복에 더 가깝습니다.",
      "물의 기운이 강한 날에는 마음이 편하게 닫히는 일정이 오래 기억에 남아요."
    ]
  };
  const moodLine = mood >= 8
    ? pick(["마음 온도가 높아서 별의 흐름도 빠르게 반응합니다.", "오늘은 마음이 앞서기 쉬워서 운도 짧고 선명한 선택을 좋아합니다.", "감정의 불이 큰 날이라 오래 끄는 일정은 피로로 바뀔 수 있어요."], seed + 3)
    : mood <= 3
      ? pick(["마음이 비교적 차분해서 작은 신호를 읽기 좋은 날이에요.", "오늘은 큰 자극보다 조용히 만족이 쌓이는 날이에요.", "감정의 파도가 낮아서 현실 체크를 운세처럼 써도 좋은 날이에요."], seed + 5)
      : pick(["마음이 살짝 흔들리는 만큼, 별의 흐름은 균형을 되찾는 쪽을 가리킵니다.", "오늘은 설렘과 피로가 같이 보이는 날이라 선택을 단순하게 잡는 게 좋아요.", "흐름이 애매할수록 오래 버티는 선택보다 빨리 정리되는 선택이 맞습니다."], seed + 7);
  const signTone = pick(elementTone[sign[2]] || elementTone["땅"], seed + sign[0].length);
  if (profile.type === "childcare") {
    const childFlows = [
      `오늘 ${sign[1]} ${escapeHtml(sign[0])} 쪽은 아이가 신난 뒤의 마무리까지 먼저 보는 날이에요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 "와 신난다!"보다 "아이고 무사히 잘 놀았다"로 끝나는 <strong>${safeRecommended}</strong> 쪽에 별이 더 편하게 앉습니다.`,
      `${sign[1]} ${escapeHtml(sign[0])} 운세로 보면 오늘은 아이 텐션을 100까지 올리는 날이 아니라, 70쯤에서 예쁘게 끊는 날이에요. ${lens.warning} <strong>${safeQuestion}</strong>에서는 보호자가 바로 조절할 수 있는 <strong>${safeRecommended}</strong>이 더 복 있는 선택처럼 보여요.`,
      `${sign[1]} ${escapeHtml(sign[0])}의 ${sign[2]} 기운이 오늘은 "신나게, 근데 무사히"라고 말해요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 아이가 흥분해도 빨리 수습 가능한 쪽, 그러니까 <strong>${safeRecommended}</strong>에 별빛이 조금 더 붙습니다.`
    ];
    return pick(childFlows, seed + mood);
  }
  if (profile.type === "attendance") {
    return `오늘 ${sign[1]} ${escapeHtml(sign[0])} 운세는 살짝 잔소리 모드예요. "완벽하게 해"가 아니라 <strong>최소한 판은 망치지 말자</strong> 쪽입니다. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 사이에서 별 흐름은 <strong>${safeRecommended}</strong>처럼 하루를 덜 꼬이게 만드는 선택을 밀어줘요.`;
  }
  if (profile.type === "money") {
    return `${sign[1]} ${escapeHtml(sign[0])} 별 흐름은 오늘 지갑에 브레이크등을 켜요. <strong>${safeQuestion}</strong>에서는 "대박?"보다 "틀리면 얼마나 아파?"가 먼저입니다. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 기준이 덜 흔들리는 <strong>${safeRecommended}</strong> 쪽이 운세적으로도 더 편합니다.`;
  }
  if (profile.type === "career") {
    return `${sign[1]} ${escapeHtml(sign[0])} 운세는 오늘 커리어에서 "한 방에 뒤집자"보다 "다음 발판부터 확인하자" 쪽이에요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 사이에서는 당장 속 시원한 것보다 내일도 고개 끄덕일 수 있는 <strong>${safeRecommended}</strong>에 별빛이 더 붙습니다.`;
  }
  if (profile.type === "relationship") {
    return `${sign[1]} ${escapeHtml(sign[0])}의 오늘 연애/관계 운은 말풍선 크기 조절이 핵심이에요. 마음은 크게 떠도, 상대가 받을 수 있게 보내야 해요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 오늘 별 흐름은 <strong>${safeRecommended}</strong>처럼 덜 부담스럽고 더 선명한 쪽에 가까워요.`;
  }
  const generalFlows = [
    `${sign[1]} ${escapeHtml(sign[0])} 운세를 오늘 버전으로 번역하면 "멋진 선택보다 뒤끝 없는 선택"이에요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 ${lens.focus}을 살릴 수 있는 쪽은 <strong>${safeRecommended}</strong>입니다.`,
    `오늘 별자리 흐름은 <strong>${safeQuestion}</strong>을 크게 만들지 말라고 해요. ${signTone} 그래서 마음이 편하게 닫히는 <strong>${safeRecommended}</strong>이 더 오래 갑니다.`,
    `${sign[1]} ${escapeHtml(sign[0])} 기준으로 오늘은 결과보다 리듬이 먼저예요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 지금 감당 가능한 <strong>${safeRecommended}</strong>이 운을 살리는 쪽입니다.`
  ];
  return pick(generalFlows, seed + main.label.length);
}

function crossroadsReading(profile, choiceA, choiceB, recommended, wordInsights) {
  const main = wordInsights[0];
  if (profile.type === "childcare") {
    const aKind = choiceA.includes("키즈카페") ? "실내 자극과 편의" : choiceA.includes("놀이터") ? "넓은 공간과 몸놀이" : "오늘의 첫 번째 장면";
    const bKind = choiceB.includes("키즈카페") ? "실내 자극과 편의" : choiceB.includes("놀이터") ? "넓은 공간과 몸놀이" : "오늘의 두 번째 장면";
    return `A는 <strong>${aKind}</strong>, B는 <strong>${bKind}</strong>에 가까워요. 이 갈림길은 "아이를 더 신나게 해줄 곳"이 아니라 <strong>신나게 놀고도 무사히 끝낼 수 있는 곳</strong>을 고르는 문제입니다. 오늘 추천인 <strong>${escapeHtml(recommended)}</strong>은 ${main.label}의 뜻처럼 보호하고 싶은 마음과 현실적인 편의를 같이 살리는 쪽이에요.`;
  }
  if (profile.type === "attendance") {
    return `이 갈림길은 "가기 싫다"와 "가야 마음이 편하다" 사이에 있어요. 선택의 기준은 기분이 아니라 오늘 지나고 난 뒤의 부담입니다. <strong>${escapeHtml(recommended)}</strong>은 지금의 피로보다 이후의 찝찝함을 줄이는 방향입니다.`;
  }
  return `이 갈림길에서 A는 <strong>${escapeHtml(choiceA)}</strong>, B는 <strong>${escapeHtml(choiceB)}</strong>예요. 오늘은 ${main.label}의 뜻처럼 ${main.meaning}을 한 번 더 봐야 해서, <strong>${escapeHtml(recommended)}</strong> 쪽이 후회가 적어 보입니다.`;
}

function finalRecommendationText(profile, recommended, adviceLine) {
  if (profile.type === "childcare") {
    return `<strong>${escapeHtml(recommended)}</strong>을 추천해요. 대신 오래 머무는 계획 말고, 아이가 지치기 전에 나올 수 있는 짧은 코스로 잡는 게 좋아요. 키즈카페를 간다면 큰 아이들이 뛰는 구역은 피하고, 놀이터를 간다면 미끄럼틀과 그네 주변에서만 더 가까이 봐주세요. 오늘의 핵심은 많이 노는 것보다 <strong>기분 좋게 마무리하는 것</strong>입니다.`;
  }
  return `<strong>${escapeHtml(recommended)}</strong>을 추천해요. 단, 이 선택을 크게 밀어붙이기보다 오늘 가능한 작은 단위로 실행하는 게 좋습니다. ${escapeHtml(adviceLine)}`;
}

const optionFeatureBank = [
  { keys: ["김치찌개"], category: "food", features: ["김치의 새콤함", "매콤한 국물", "돼지고기나 참치가 들어갔을 때 올라오는 묵직한 맛", "밥이랑 잘 맞는 만족감"], caution: "속이 예민하거나 자극적인 국물이 부담되면 피하는 게 좋아요.", vibe: "확실한 맛" },
  { keys: ["된장찌개"], category: "food", features: ["구수한 된장 향", "담백한 국물", "속이 편한 느낌", "익숙하고 편안한 한 끼"], caution: "강한 맛으로 스트레스를 풀고 싶은 날엔 조금 심심하게 느껴질 수 있어요.", vibe: "편한 맛" },
  { keys: ["짬뽕"], category: "food", features: ["얼큰한 국물", "해장되는 느낌", "땀나는 매운맛", "스트레스가 풀리는 자극"], caution: "속이 예민하거나 매운맛이 부담되는 날엔 먹고 나서 후회할 수 있어요.", vibe: "얼큰한 폭발력" },
  { keys: ["짜장면", "자장면"], category: "food", features: ["달달한 춘장 소스", "실패 확률이 낮은 중국집 기본값", "어릴 때 먹던 추억", "면 한 그릇으로 편하게 끝나는 느낌"], caution: "얼큰한 국물이나 해장감을 원하면 조금 답답하게 느껴질 수 있어요.", vibe: "편한 기본값" },
  { keys: ["라면"], category: "food", features: ["뜨거운 국물", "짭짤한 면발", "빠르게 채워지는 허기", "야식 같은 즉각적인 만족감"], caution: "붓기나 속 쓰림이 걱정되면 조심하는 게 좋아요.", vibe: "즉시 만족" },
  { keys: ["돈까스"], category: "food", features: ["바삭한 튀김", "든든한 양", "소스의 달큰함", "실패 확률이 낮은 메뉴"], caution: "느끼한 음식이 부담되면 끝까지 먹기 무거울 수 있어요.", vibe: "든든함" },
  { keys: ["국밥"], category: "food", features: ["뜨끈한 국물", "든든한 포만감", "속을 채워주는 느낌", "혼밥에도 편한 안정감"], caution: "가볍게 먹고 싶은 날엔 무겁게 느껴질 수 있어요.", vibe: "회복감" },
  { keys: ["순대국", "순댓국"], category: "food", features: ["익숙한 국밥 느낌", "뜨끈한 국물", "혼밥에도 편한 분위기", "부담 없이 든든한 한 그릇"], caution: "강한 해장감이나 푸짐한 한 상을 원하면 조금 얌전하게 느껴질 수 있어요.", vibe: "편안한 든든함" },
  { keys: ["감자탕"], category: "food", features: ["푸짐한 뼈고기", "묵직한 국물", "사람들과 먹기 좋은 양", "해장 느낌이 강한 에너지"], caution: "가볍게 먹고 싶거나 혼자 조용히 먹고 싶으면 살짝 과할 수 있어요.", vibe: "푸짐한 에너지" },
  { keys: ["치킨"], category: "food", features: ["바삭한 튀김", "짭짤한 양념", "기분 전환 느낌", "나눠 먹기 좋은 재미"], caution: "가볍게 끝내고 싶은 날엔 과해질 수 있어요.", vibe: "기분 전환" },
  { keys: ["피자"], category: "food", features: ["치즈의 고소함", "토핑 고르는 재미", "든든한 한 판", "같이 먹기 좋은 분위기"], caution: "속이 더부룩하거나 혼자 간단히 먹고 싶으면 부담될 수 있어요.", vibe: "풍성함" },
  { keys: ["술", "소주", "맥주", "와인", "막걸리"], category: "drink", features: ["기분이 확 풀리는 느낌", "사람들과 말이 조금 더 쉬워지는 분위기", "내일 아침 컨디션을 담보로 잡는 점", "한 잔이 두 잔으로 변신하기 쉬운 점"], caution: "내일 일정이 있거나 이미 피곤하면 내일의 내가 강하게 항의할 수 있어요.", vibe: "오늘의 유혹" },
  { keys: ["키즈카페"], category: "childcare", features: ["실내라 날씨 영향을 덜 받는 점", "장난감과 시설이 많은 점", "큰 아이들과 동선이 겹치면 부딪힐 수 있는 점", "소리와 자극이 많아 아이가 금방 흥분할 수 있는 점"], caution: "사람이 많으면 보호자가 계속 따라다니며 봐야 해요.", vibe: "실내 자극" },
  { keys: ["놀이터"], category: "childcare", features: ["공간이 넓은 점", "아이가 자기 속도로 뛰어놀 수 있는 점", "돈이 거의 들지 않는 점", "날씨와 미끄럼틀·그네 주변 안전을 봐야 하는 점"], caution: "비, 추위, 미세먼지가 있으면 만족도가 확 떨어질 수 있어요.", vibe: "자유로운 몸놀이" },
  { keys: ["공원"], category: "place", features: ["넓은 공간", "걷기 좋은 동선", "답답함이 풀리는 느낌", "날씨 영향을 많이 받음"], caution: "날씨가 나쁘면 금방 피곤해질 수 있어요.", vibe: "환기" },
  { keys: ["카페"], category: "place", features: ["앉아서 쉬기 좋음", "대화하기 편함", "커피나 디저트로 기분 전환 가능", "오래 있으면 비용이 쌓임"], caution: "아이가 있거나 사람이 많으면 생각보다 정신없을 수 있어요.", vibe: "잠깐의 여유" },
  { keys: ["출근"], category: "attendance", features: ["오늘 할 일을 미루지 않는 점", "내일 부담이 줄어드는 점", "책임을 지켰다는 마음이 남는 점", "몸이 피곤하면 하루가 길게 느껴질 수 있는 점"], caution: "진짜 아프면 무리하지 말고 먼저 연락하는 게 맞아요.", vibe: "최소 책임" },
  { keys: ["결근", "안한다", "쉰다", "쉬기"], category: "attendance", features: ["몸을 쉬게 할 수 있는 점", "당장 피로가 줄어드는 점", "대신 설명과 뒷일이 생길 수 있는 점", "무단이면 부담이 커지는 점"], caution: "쉬더라도 연락과 이유 정리는 꼭 필요해요.", vibe: "회복" },
  { keys: ["점심"], category: "daily", features: ["지금 바로 배고픔을 해결하는 점", "오후를 덜 예민하게 보내는 점", "오래 끌지 않아도 되는 점", "하루 리듬을 빨리 잡는 점"], caution: "저녁 약속이나 더 맛있는 계획이 있으면 조금 아쉬울 수 있어요.", vibe: "지금 챙김" },
  { keys: ["저녁"], category: "daily", features: ["하루 끝에 천천히 먹는 재미", "기대감을 남겨두는 점", "일정에 따라 밀릴 수 있는 점", "배고픔을 오래 데리고 다녀야 하는 점"], caution: "지금 배고프면 저녁까지 성격이 살짝 날카로워질 수 있어요.", vibe: "나중의 재미" },
  { keys: ["차를 탄다", "차 탄다", "자동차", "차"], category: "daily", features: ["빠르게 이동할 수 있는 점", "몸이 덜 피곤한 점", "비나 더위 같은 날씨 영향을 덜 받는 점", "주차나 비용이 생길 수 있는 점"], caution: "가까운 거리라면 오히려 준비와 주차가 더 번거로울 수 있어요.", vibe: "편한 이동" },
  { keys: ["걸어간다", "걷는다", "걷기", "걸어"], category: "daily", features: ["몸을 움직이며 기분 전환이 되는 점", "돈이 들지 않는 점", "생각을 정리할 시간이 생기는 점", "날씨와 체력 영향을 크게 받는 점"], caution: "시간이 촉박하거나 너무 덥고 추우면 도착 전에 지칠 수 있어요.", vibe: "가벼운 움직임" },
  { keys: ["매수", "투자"], category: "money", features: ["기회를 잡는 느낌", "수익 기대감", "가격 변동 리스크", "틀렸을 때 손실 가능성"], caution: "손실 한도 없이 들어가면 감정이 흔들릴 수 있어요.", vibe: "공격적 선택" },
  { keys: ["매도", "판다", "팔기", "팔래"], category: "money", features: ["결론을 내리는 느낌", "수익이나 손실을 확정하는 버튼", "다시 차트를 볼 수밖에 없는 찝찝함", "현금화해서 마음을 정리하는 장점"], caution: "팔고 나서 오르면 차트를 더 자주 보게 될 수 있어요.", vibe: "결론 버튼" },
  { keys: ["안판다", "안 판다", "보유", "홀딩", "가지고"], category: "money", features: ["괜히 팔았다가 후회할 가능성을 줄이는 점", "포지션을 유지하는 선택", "현금화 유혹을 참는 인내", "떨어질 때 마음이 흔들릴 수 있는 점"], caution: "그냥 버티는 게 아니라 다시 볼 가격이나 시간을 정해두는 게 좋아요.", vibe: "잠깐 버티기" },
  { keys: ["관망", "기다"], category: "money", features: ["손실을 피할 시간", "가격을 더 볼 여유", "기회를 놓칠 수 있는 아쉬움", "감정 매매를 줄이는 장점"], caution: "기다림에도 기준 가격이 있어야 해요.", vibe: "리스크 관리" },
  { keys: ["고백", "연락", "사과"], category: "relationship", features: ["마음을 직접 전함", "오해를 줄일 수 있음", "상대 반응을 확인할 수 있음", "말투가 세면 부담을 줄 수 있음"], caution: "긴 문장보다 짧고 정확한 말이 좋아요.", vibe: "직접 확인" },
  { keys: ["보류", "안 한다", "안한다"], category: "general", features: ["당장 부딪히지 않음", "생각할 시간이 생김", "너무 길어지면 답답함이 남음", "결정 피로가 줄어듦"], caution: "언제 다시 볼지 정하지 않으면 흐지부지될 수 있어요.", vibe: "보류" }
];

function inferCategory(question, choiceA, choiceB, profile) {
  const text = `${question} ${choiceA} ${choiceB}`.toLowerCase();
  if (profile.type !== "general") return profile.type;
  if (includesAny(text, ["찌개", "라면", "밥", "국밥", "순대국", "순댓국", "감자탕", "치킨", "피자", "돈까스", "냉면", "짜장", "짬뽕", "떡볶이", "초밥", "메뉴", "먹을"])) return "food";
  if (includesAny(text, ["술", "소주", "맥주", "와인", "막걸리", "마실까", "한잔", "한 잔"])) return "drink";
  if (includesAny(text, ["카페", "공원", "영화", "마트", "백화점", "여행", "놀러", "어디"])) return "place";
  if (includesAny(text, ["살까", "구매", "쇼핑", "예약", "결제"])) return "shopping";
  return "daily";
}

function findFeatureEntry(text) {
  const normalized = String(text).toLowerCase();
  let best = null;
  optionFeatureBank.forEach((item) => {
    item.keys.forEach((key) => {
      if (normalized.includes(key.toLowerCase()) && (!best || key.length > best.key.length)) {
        best = { item, key };
      }
    });
  });
  return best;
}

function analyzeOption(option, category) {
  const text = option.toLowerCase();
  const match = findFeatureEntry(text);
  const found = match && match.item;
  if (found) {
    return {
      name: option,
      category: found.category,
      features: found.features,
      caution: found.caution,
      vibe: found.vibe
    };
  }
  const fallbackByCategory = {
    food: { features: [`${option}만의 익숙한 맛`, "먹고 난 뒤의 포만감", "오늘 입맛에 따라 만족도가 달라짐", "같이 먹는 사람이나 컨디션 영향을 받음"], caution: "속 상태와 자극 정도는 한 번 보고 고르는 게 좋아요.", vibe: "한 끼 만족" },
    childcare: { features: [`${option}에서 생기는 아이 반응`, "보호자가 봐야 하는 안전 변수", "아이 체력 소모", "돌아오는 길 컨디션"], caution: "아이가 지치기 전에 나올 수 있는지가 중요해요.", vibe: "아이 리듬" },
    place: { features: [`${option}의 분위기`, "이동 거리", "사람 많은 정도", "끝나고 남는 피로감"], caution: "동선과 머무는 시간을 짧게 잡는 게 좋아요.", vibe: "장소감" },
    shopping: { features: [`${option}을 샀을 때의 만족감`, "가격 부담", "실제로 자주 쓸 가능성", "나중에 후회할 가능성"], caution: "지금 갖고 싶은 마음과 실제 사용 빈도를 따로 봐야 해요.", vibe: "구매 만족" },
    drink: { features: [`${option} 선택 후 바로 풀리는 기분`, "내일 아침 컨디션 변수", "자리 분위기에 휩쓸릴 가능성", "한 잔만 하겠다는 약속의 수상함"], caution: "내일 일정과 지금 피로도를 먼저 봐야 해요.", vibe: "한 잔의 유혹" },
    daily: { features: [`${option} 선택 후 바로 생기는 변화`, "하고 난 뒤의 마음", "미뤘을 때 남는 찝찝함", "오늘 감당 가능한 정도"], caution: "한 번에 크게 결정하기보다 작게 해보는 게 좋아요.", vibe: "일상 선택" }
  };
  const fallback = fallbackByCategory[category] || fallbackByCategory.daily;
  return { name: option, category, features: fallback.features, caution: fallback.caution, vibe: fallback.vibe };
}

function optionIntent(option) {
  const text = String(option).replace(/\s/g, "").toLowerCase();
  if (includesAny(text, ["만다", "안간", "안한다", "안판다", "안마신", "안마셔", "마시지마", "말자", "보류", "쉬", "쉰", "기다", "관망", "패스", "보유", "홀딩"])) return "skip";
  if (includesAny(text, ["간다", "가기", "간", "한다", "먹", "마신", "마셔", "산다", "살래", "매수", "매도", "판다", "연락", "고백", "출근"])) return "go";
  return "specific";
}

function findScenario(question, category) {
  const text = String(question).toLowerCase();
  const match = findFeatureEntry(text);
  const found = match && match.item;
  if (!found) return null;
  const key = match.key || found.keys[0];
  return {
    name: key,
    category: found.category || category,
    features: found.features,
    caution: found.caution,
    vibe: found.vibe
  };
}

function skipFeaturesForScenario(option, scenario, category) {
  const scenarioName = scenario.name;
  const byCategory = {
    childcare: {
      features: [`${scenarioName}의 사람 많은 시간을 피할 수 있는 점`, "아이 컨디션을 집에서 지켜볼 수 있는 점", "큰 아이들과 부딪히거나 자극이 과해질 위험을 줄이는 점", "부모도 체력을 아낄 수 있는 점"],
      caution: `며칠 동안 집에만 있었거나 아이가 에너지가 넘친다면 ${scenarioName}에 안 가는 선택이 오히려 아쉬울 수 있어요.`,
      vibe: "회복"
    },
    food: {
      features: [`${scenarioName}의 자극이나 무거움을 피할 수 있는 점`, "속 상태를 편하게 둘 수 있는 점", "지금 배고픔이 애매할 때 부담을 줄이는 점", "다른 메뉴를 고를 여지를 남기는 점"],
      caution: `배가 확실히 고프거나 ${scenarioName} 맛이 계속 생각난다면 안 먹는 쪽이 더 찝찝할 수 있어요.`,
      vibe: "속 편함"
    },
    drink: {
      features: [`${scenarioName}이 부르는 유혹을 넘기는 점`, "내일 아침 컨디션을 지키는 점", "지갑과 간에게 휴가를 주는 점", "한 잔이 길어지는 사고를 막는 점"],
      caution: `정말 가볍게 한 잔만 하고 끝낼 자신이 있으면 ${scenarioName}도 나쁘진 않아요. 문제는 한 잔이 자꾸 자기 친구를 데려온다는 거예요.`,
      vibe: "내일의 평화"
    },
    money: {
      features: [`${scenarioName} 타이밍을 늦춰 손실 가능성을 줄이는 점`, "가격을 한 번 더 볼 여유가 생기는 점", "감정 매매를 피하는 점", "놓칠 수 있다는 아쉬움이 남는 점"],
      caution: "기다리는 동안에도 다시 볼 가격이나 시간을 정해두는 게 좋아요.",
      vibe: "지갑 방어"
    },
    place: {
      features: [`${scenarioName}까지 이동하는 피로를 줄이는 점`, "사람 많은 공간을 피할 수 있는 점", "집에서 시간을 정리할 수 있는 점", "비용과 체력을 아낄 수 있는 점"],
      caution: `답답함이 오래 쌓였다면 ${scenarioName}에 안 가는 선택이 기분 전환 기회를 놓칠 수 있어요.`,
      vibe: "쉬어가기"
    },
    daily: {
      features: [`${scenarioName}을 미루며 부담을 줄이는 점`, "오늘 컨디션을 먼저 볼 수 있는 점", "급하게 움직이지 않아도 되는 점", "다른 선택지를 남겨두는 점"],
      caution: `계속 생각나는 일이라면 ${scenarioName}을 미루는 선택이 더 찝찝할 수 있어요.`,
      vibe: "보류"
    }
  };
  const picked = byCategory[category] || byCategory.daily;
  return {
    name: option,
    category,
    subjectName: scenarioName,
    intent: "skip",
    features: picked.features,
    caution: picked.caution,
    vibe: picked.vibe
  };
}

function contextualizeOption(option, category, question) {
  const scenario = findScenario(question, category);
  const intent = optionIntent(option);
  const base = analyzeOption(option, category);
  if (category === "money" && base.category === "money") {
    return { ...base, subjectName: base.name, intent };
  }
  if (!scenario || intent === "specific") {
    return { ...base, subjectName: base.name, intent };
  }
  if (intent === "skip") return skipFeaturesForScenario(option, scenario, category);
  return {
    name: option,
    category: scenario.category || category,
    subjectName: scenario.name,
    intent: "go",
    features: scenario.features,
    caution: scenario.caution,
    vibe: scenario.vibe
  };
}

const zodiacProfiles = {
  "양자리": { traits: ["도전", "즉흥성", "활동성", "에너지", "열정", "행동력", "돌진", "개척", "승부욕", "속도", "용기", "추진력", "자신감", "모험", "직진"], likes: ["energy", "bold", "action", "newness"] },
  "황소자리": { traits: ["익숙함", "편안함", "안정감", "만족감", "실속", "꾸준함", "여유", "느긋함", "안심", "소확행", "포근함", "안정성", "휴식", "현실감", "든든함"], likes: ["comfort", "satisfaction", "warmth", "practical"] },
  "쌍둥이자리": { traits: ["호기심", "대화", "유머", "변화", "소통", "정보", "가벼움", "재치", "유연함", "관심", "탐색", "수다", "아이디어", "순발력", "재미"], likes: ["variety", "fun", "newness", "social"] },
  "게자리": { traits: ["가족", "따뜻함", "보호", "배려", "공감", "안정", "추억", "편안함", "친근함", "정", "보살핌", "집밥감성", "애정", "감성", "안식처"], likes: ["comfort", "warmth", "family", "safe"] },
  "사자자리": { traits: ["자신감", "존재감", "주목", "리더십", "자존심", "화려함", "표현력", "열정", "자부심", "용기", "인기", "매력", "당당함", "카리스마", "에너지"], likes: ["bold", "social", "presence", "satisfaction"] },
  "처녀자리": { traits: ["계획성", "꼼꼼함", "분석", "정리", "효율", "정확함", "현실성", "신중함", "계산", "체크", "준비성", "깔끔함", "실용성", "점검", "완성도"], likes: ["practical", "clean", "safe", "simple"] },
  "천칭자리": { traits: ["균형", "조화", "매너", "관계", "아름다움", "배려", "우아함", "공정함", "분위기", "외교력", "선택", "조율", "평화", "센스", "품격"], likes: ["balance", "social", "mood", "comfort"] },
  "전갈자리": { traits: ["깊이", "몰입", "집중", "강렬함", "직감", "통찰", "결단", "비밀", "집요함", "카리스마", "진심", "탐구", "매력", "본능", "승부"], likes: ["deep", "bold", "rich", "focus"] },
  "사수자리": { traits: ["자유", "여행", "낙관", "모험", "확장", "도전", "성장", "개방성", "호기심", "가능성", "탐험", "웃음", "시도", "경험", "열정"], likes: ["adventure", "newness", "energy", "freedom"] },
  "염소자리": { traits: ["책임감", "성과", "목표", "인내", "현실성", "성공", "노력", "계획", "성취", "집중", "끈기", "성장", "관리", "신뢰", "꾸준함"], likes: ["practical", "safe", "responsibility", "result"] },
  "물병자리": { traits: ["독창성", "자유로움", "개성", "혁신", "창의성", "발상", "변화", "실험", "독립성", "호기심", "아이디어", "미래", "특별함", "신선함", "반전"], likes: ["unique", "newness", "variety", "freedom"] },
  "물고기자리": { traits: ["감성", "공감", "상상력", "직관", "낭만", "위로", "따뜻함", "몽상", "배려", "감정", "예술성", "이해", "포용", "여운", "순수함"], likes: ["mood", "comfort", "soft", "relax"] }
};

const zodiacVoices = {
  "황소자리": {
    money: (winner) => `황소자리는 오늘 큰 한 방보다 내 지갑이 잠을 잘 수 있는지를 먼저 봅니다. 그래서 ${escapeHtml(winner.name)} 쪽처럼 마음이 덜 출렁이는 선택에 점수가 붙었어요.`,
    food: (winner, loser) => `황소자리는 오늘 새 모험보다 실패 적은 한 입을 좋아합니다. ${escapeHtml(loser.name)}도 끌리지만, ${escapeHtml(winner.name)} 쪽이 "그래 이 맛이지"가 더 빨리 나올 것 같아요.`,
    daily: (winner) => `황소자리는 오늘 늘 가던 길의 편안함을 무시하지 못합니다. 그래서 ${escapeHtml(winner.name)} 쪽이 끝나고 몸과 마음이 덜 투덜거릴 선택으로 보입니다.`
  },
  "양자리": {
    money: (winner) => `양자리는 오늘 생각보다 몸이 먼저 움직이는 날입니다. 오래 재다가 기회를 놓치는 그림보다 ${escapeHtml(winner.name)} 쪽처럼 결론을 내는 장면에 힘이 붙었어요.`,
    food: (winner) => `양자리는 메뉴판 앞에서 오래 상담받는 타입이 아닙니다. 오늘은 ${escapeHtml(winner.name)}처럼 한 번에 기분을 확 올리는 쪽이 더 양자리답습니다.`,
    daily: (winner) => `양자리는 오늘 의자에 앉아 있어도 이미 마음은 버튼 근처까지 가 있습니다. 그래서 ${escapeHtml(winner.name)} 쪽이 생각보다 행동에 가까워요.`
  },
  "쌍둥이자리": {
    money: (winner) => `쌍둥이자리는 오늘 한 가지 생각에 묶이기보다 선택지를 열어두고 싶어 합니다. 그래서 ${escapeHtml(winner.name)} 쪽이 다음 대화를 만들 여지를 더 남겨요.`,
    food: (winner) => `쌍둥이자리는 오늘 입맛도 수다스럽습니다. ${escapeHtml(winner.name)} 쪽이 더 재밌고, 먹으면서 할 말도 하나 더 생길 것 같아요.`,
    daily: (winner) => `쌍둥이자리는 오늘 답보다 리듬을 봅니다. ${escapeHtml(winner.name)} 쪽이 하루를 덜 답답하게 굴릴 수 있어요.`
  },
  "게자리": {
    money: (winner) => `게자리는 오늘 공격보다 내 마음의 안전지대를 먼저 확인합니다. 그래서 ${escapeHtml(winner.name)} 쪽이 불안한 밤을 조금 덜 만들 것 같아요.`,
    food: (winner) => `게자리는 오늘 화려한 맛보다 속이 편하게 닫히는 식사를 좋아합니다. ${escapeHtml(winner.name)} 쪽이 집밥처럼 마음을 덜 흔들어요.`,
    daily: (winner) => `게자리는 오늘 내 사람, 내 컨디션, 내 안심을 먼저 봅니다. ${escapeHtml(winner.name)} 쪽이 마음이 덜 날카로워지는 선택이에요.`
  },
  "사자자리": {
    money: (winner) => `사자자리는 오늘 애매하게 끌려가기보다 "내가 정했다"는 느낌을 원합니다. 그래서 ${escapeHtml(winner.name)} 쪽이 더 당당한 결론처럼 보여요.`,
    food: (winner) => `사자자리는 오늘 존재감 있는 선택에 끌립니다. ${escapeHtml(winner.name)} 쪽이 먹고 나서 "나 오늘 이거 골랐다" 싶은 맛이 있어요.`,
    daily: (winner) => `사자자리는 오늘 작게 숨기보다 선명하게 고르는 쪽입니다. ${escapeHtml(winner.name)} 쪽이 내 선택이라는 맛이 더 납니다.`
  },
  "처녀자리": {
    money: (winner) => `처녀자리는 오늘 감보다 체크리스트를 먼저 꺼냅니다. 손실, 타이밍, 뒤처리를 따져보면 ${escapeHtml(winner.name)} 쪽이 더 깔끔하게 정리돼요.`,
    food: (winner) => `처녀자리는 오늘 맛보다 실패 확률과 뒷맛까지 봅니다. ${escapeHtml(winner.name)} 쪽이 먹고 난 뒤에도 덜 거슬릴 선택이에요.`,
    daily: (winner) => `처녀자리는 오늘 찝찝한 빈칸을 싫어합니다. ${escapeHtml(winner.name)} 쪽이 하루 정리가 더 잘 되는 답으로 보입니다.`
  },
  "천칭자리": {
    money: (winner) => `천칭자리는 오늘 수익 욕심과 마음의 균형을 같이 봅니다. 너무 한쪽으로 쏠리지 않는 ${escapeHtml(winner.name)} 쪽이 더 예쁘게 균형을 잡아요.`,
    food: (winner) => `천칭자리는 오늘 맛만큼 분위기도 봅니다. ${escapeHtml(winner.name)} 쪽이 입맛과 기분 사이의 균형이 더 좋아요.`,
    daily: (winner) => `천칭자리는 오늘 무리한 결론보다 보기 좋은 균형을 고릅니다. ${escapeHtml(winner.name)} 쪽이 하루 모양이 덜 삐뚤어져요.`
  },
  "전갈자리": {
    money: (winner) => `전갈자리는 차트를 5분 보다가 "그래서 결론이 뭔데?"라고 묻는 날입니다. 어중간하게 흔들리기보다 ${escapeHtml(winner.name)} 쪽처럼 깊게 보고 딱 자르는 선택에 힘이 붙었어요.`,
    food: (winner) => `전갈자리는 오늘 슴슴한 맛보다 확실히 꽂히는 맛을 원합니다. ${escapeHtml(winner.name)} 쪽이 한 입에 결론이 나는 느낌이에요.`,
    daily: (winner) => `전갈자리는 오늘 겉핥기보다 핵심을 찌릅니다. 오래 애매하게 두기보다 ${escapeHtml(winner.name)} 쪽으로 선을 긋는 게 더 전갈자리답습니다.`
  },
  "사수자리": {
    money: (winner) => `사수자리는 오늘 묶여 있는 느낌을 싫어합니다. 그래서 ${escapeHtml(winner.name)} 쪽이 돈보다 내 선택의 자유를 더 살려주는 방향으로 보여요.`,
    food: (winner) => `사수자리는 오늘 먹던 것만 먹기엔 살짝 심심합니다. ${escapeHtml(winner.name)} 쪽이 작은 모험처럼 느껴져요.`,
    daily: (winner) => `사수자리는 오늘 시야를 넓히는 쪽에 반응합니다. ${escapeHtml(winner.name)} 쪽이 하루를 조금 덜 갇히게 만들어요.`
  },
  "염소자리": {
    money: (winner) => `염소자리는 오늘 "벌 수 있나?"보다 "계획이 무너지나?"를 먼저 봅니다. 그래서 ${escapeHtml(winner.name)} 쪽이 현실적으로 더 납득됩니다.`,
    food: (winner) => `염소자리는 오늘 메뉴도 효율을 봅니다. ${escapeHtml(winner.name)} 쪽이 시간, 비용, 만족을 놓고 봤을 때 덜 흔들리는 선택이에요.`,
    daily: (winner) => `염소자리는 오늘 감정보다 다음 단계가 보이는 선택을 좋아합니다. ${escapeHtml(winner.name)} 쪽이 뒤처리가 더 현실적이에요.`
  },
  "물병자리": {
    money: (winner) => `물병자리는 오늘 남들이 다 보는 방향에서 살짝 비켜서 봅니다. 그래서 ${escapeHtml(winner.name)} 쪽이 뻔한 반응보다 내 방식에 가까워요.`,
    food: (winner) => `물병자리는 오늘 기본값을 그대로 누르기엔 손가락이 근질거립니다. ${escapeHtml(winner.name)} 쪽이 조금 더 신선하게 느껴져요.`,
    daily: (winner) => `물병자리는 오늘 "왜 꼭 그래야 해?"라고 묻는 날입니다. ${escapeHtml(winner.name)} 쪽이 내 방식대로 판을 바꾸는 선택이에요.`
  },
  "물고기자리": {
    money: (winner) => `물고기자리는 오늘 차트보다 표정을 먼저 봅니다. 수익보다 "내가 이걸 하고 편할까?"가 더 크게 보여서 ${escapeHtml(winner.name)} 쪽이 마음에 덜 물결칩니다.`,
    food: (winner) => `물고기자리는 오늘 맛보다 기분의 온도를 봅니다. ${escapeHtml(winner.name)} 쪽이 먹고 난 뒤 마음까지 덜 뾰족해질 것 같아요.`,
    daily: (winner) => `물고기자리는 오늘 논리보다 마음의 파동을 먼저 듣습니다. ${escapeHtml(winner.name)} 쪽이 끝나고 나서 더 부드럽게 남을 선택이에요.`
  }
};

function optionTags(analysis, question) {
  const text = `${analysis.name} ${analysis.subjectName || ""} ${analysis.features.join(" ")} ${analysis.vibe}`.toLowerCase();
  const tags = new Set();
  const addIf = (tag, words) => {
    if (includesAny(text, words)) tags.add(tag);
  };
  addIf("comfort", ["익숙", "편안", "속", "혼밥", "부담 없이", "안정", "쉬", "회복", "국밥", "순대국", "순댓국"]);
  addIf("satisfaction", ["만족", "든든", "포만", "푸짐", "한 그릇", "밥이랑", "양"]);
  addIf("warmth", ["뜨끈", "따뜻", "국물", "해장", "가족"]);
  addIf("energy", ["에너지", "활동", "뛰", "해장", "묵직", "감자탕", "바삭", "매콤", "얼큰", "짬뽕", "기분 전환"]);
  addIf("bold", ["강한", "강렬", "묵직", "매콤", "푸짐", "고기", "감자탕", "공격", "매도", "판다", "결론"]);
  addIf("action", ["간다", "먹", "마신", "매수", "매도", "판다", "출근", "움직", "바로"]);
  addIf("newness", ["새로운", "신선", "처음", "변화", "놀러", "여행"]);
  addIf("variety", ["다양", "토핑", "장난감", "시설", "재미"]);
  addIf("fun", ["재미", "웃음", "놀이", "기분"]);
  addIf("social", ["사람", "함께", "나눠", "관계", "분위기", "대화"]);
  addIf("practical", ["실용", "부담", "가격", "비용", "효율", "계획", "내일", "책임"]);
  addIf("safe", ["안전", "피할", "관망", "안판다", "보유", "홀딩", "쉬", "컨디션", "부담"]);
  addIf("balance", ["균형", "조화", "덜", "무리"]);
  addIf("mood", ["분위기", "감성", "여유", "카페"]);
  addIf("deep", ["깊", "몰입", "집중", "진한"]);
  addIf("rich", ["진한", "묵직", "푸짐", "고기"]);
  addIf("family", ["아이", "가족", "보호자", "집"]);
  addIf("unique", ["독창", "개성", "다른"]);
  addIf("freedom", ["자유", "넓", "공원", "놀이터", "여행"]);
  addIf("soft", ["담백", "부드", "여유"]);
  addIf("relax", ["쉬", "휴식", "편안", "여유"]);
  return tags;
}

function zodiacBoost(sign, analysis, question) {
  const profile = zodiacProfiles[sign[0]] || zodiacProfiles["황소자리"];
  const text = `${analysis.name} ${analysis.subjectName || ""} ${analysis.features.join(" ")} ${analysis.vibe}`.toLowerCase();
  const tags = optionTags(analysis, question);
  const matches = profile.likes.filter((tag) => tags.has(tag));
  let boost = Math.min(14, matches.length * 4);
  if (profile.likes.includes("comfort") && includesAny(text, ["순대국", "순댓국", "익숙", "편안", "혼밥"])) boost += 10;
  if (profile.likes.includes("energy") && includesAny(text, ["감자탕", "푸짐", "에너지", "묵직", "해장"])) boost += 10;
  if (profile.likes.includes("energy") && includesAny(text, ["짬뽕", "얼큰", "매운", "땀나는"])) boost += 8;
  if (profile.likes.includes("comfort") && includesAny(text, ["짜장", "실패 확률", "기본값", "달달"])) boost += 8;
  if (profile.likes.includes("variety") && includesAny(text, ["다양", "토핑", "장난감", "시설"])) boost += 6;
  if (profile.likes.includes("practical") && includesAny(text, ["관망", "책임", "효율", "계획", "부담"])) boost += 6;
  if (profile.likes.includes("action") && includesAny(text, ["매도", "판다", "결론", "확정"])) boost += 12;
  if (profile.likes.includes("bold") && includesAny(text, ["매도", "판다", "결론", "확정"])) boost += 10;
  if (profile.likes.includes("safe") && includesAny(text, ["안판다", "보유", "홀딩", "관망", "기다"])) boost += 10;
  if (profile.likes.includes("comfort") && includesAny(text, ["안판다", "보유", "홀딩", "관망"])) boost += 8;
  boost = Math.min(22, boost);
  return { boost, traits: profile.traits, matchedTags: matches };
}

function zodiacCards(sign, seed) {
  const profile = zodiacProfiles[sign[0]] || zodiacProfiles["황소자리"];
  const pool = profile.traits;
  const daySeed = hashText(`${todayKey()}-${sign[0]}`);
  const first = pick(pool, daySeed + seed + sign[0].length);
  const second = pick(pool.filter((item) => item !== first), daySeed + seed + first.length + 17);
  return [first, second];
}

function narrativeCardPreview(cards) {
  return cards.length > 1 ? `${cards[0]} + ${cards[1]}` : cards[0];
}

function cardHas(cards, words) {
  const text = cards.join(" ");
  return includesAny(text, words);
}

function cardTags(cards) {
  const text = cards.join(" ");
  const tags = new Set();
  const groups = [
    ["comfort", ["익숙함", "편안함", "안정감", "안심", "포근함", "안정성", "휴식", "친근함", "안식처"]],
    ["satisfaction", ["만족감", "실속", "소확행", "든든함", "성취", "성과"]],
    ["warmth", ["따뜻함", "정", "애정", "위로", "집밥감성", "보살핌"]],
    ["energy", ["에너지", "열정", "활동성", "추진력", "속도", "돌진", "직진"]],
    ["bold", ["도전", "용기", "승부욕", "자신감", "강렬함", "결단", "승부", "당당함"]],
    ["action", ["행동력", "추진력", "직진", "속도", "개척", "시도"]],
    ["newness", ["모험", "변화", "신선함", "실험", "반전", "혁신", "탐험"]],
    ["variety", ["호기심", "탐색", "아이디어", "발상", "가능성", "경험"]],
    ["fun", ["유머", "재치", "수다", "재미", "웃음"]],
    ["social", ["대화", "소통", "관계", "매너", "외교력", "인기"]],
    ["practical", ["현실성", "현실감", "계획", "계획성", "효율", "실용성", "관리", "체크", "계산"]],
    ["safe", ["신중함", "준비성", "점검", "책임감", "신뢰", "보호", "배려"]],
    ["balance", ["균형", "조화", "공정함", "조율", "평화", "센스"]],
    ["mood", ["감성", "낭만", "분위기", "여운", "예술성", "몽상"]],
    ["deep", ["깊이", "몰입", "집중", "통찰", "탐구", "진심", "직감", "본능"]],
    ["unique", ["독창성", "개성", "창의성", "특별함", "독립성"]],
    ["freedom", ["자유", "자유로움", "여행", "확장", "개방성"]],
    ["soft", ["공감", "이해", "포용", "순수함", "여유"]],
    ["relax", ["느긋함", "여유", "휴식", "안식처"]]
  ];
  groups.forEach(([tag, words]) => {
    if (includesAny(text, words)) tags.add(tag);
  });
  return tags;
}

function cardOptionBoost(cards, analysis) {
  const option = optionTags(analysis, "");
  const today = cardTags(cards);
  let boost = 0;
  today.forEach((tag) => {
    if (option.has(tag)) boost += 5;
  });
  return Math.min(16, boost);
}

function zodiacVoiceLine(sign, category, winner, loser) {
  const voice = zodiacVoices[sign[0]] || zodiacVoices["황소자리"];
  const key = voice[category] ? category : "daily";
  return voice[key](winner, loser);
}

function optionFeatureSentence(analysis) {
  const features = analysis.features.filter(Boolean).slice(0, 2).map(escapeHtml);
  if (features.length >= 2) return `${escapeHtml(analysis.name)}에는 ${features[0]}, ${features[1]}이 확실히 있어요.`;
  if (features.length === 1) return `${escapeHtml(analysis.name)}에는 ${features[0]}이 눈에 띕니다.`;
  return `${escapeHtml(analysis.name)}만의 장점이 오늘 선택에 들어왔어요.`;
}

function cardReasonLine(cards, winner, loser, category) {
  const cardText = escapeHtml(narrativeCardPreview(cards));
  const cardBecause = escapeHtml(withParticle(narrativeCardPreview(cards), "이라서", "라서"));
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  if (cardHas(cards, ["안정감", "안심", "편안함", "익숙함", "휴식", "여유", "느긋함", "포근함"])) {
    return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 새로움보다 마음이 덜 흔들리는 ${winnerName} 쪽에 점수가 붙었습니다.`;
  }
  if (cardHas(cards, ["도전", "행동력", "속도", "돌진", "직진", "추진력", "활동성", "에너지"])) {
    return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 오래 재는 ${loserName}보다 바로 움직이는 ${winnerName} 쪽이 더 세게 들어왔습니다.`;
  }
  if (cardHas(cards, ["결단", "몰입", "집중", "강렬함", "승부", "통찰", "본능"])) {
    return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 애매하게 끌기보다 ${winnerName}처럼 결론이 선명한 쪽이 앞섰습니다.`;
  }
  if (cardHas(cards, ["계획", "현실성", "체크", "계산", "책임감", "관리", "신뢰", "점검"])) {
    return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 기분보다 뒤처리와 기준이 분명한 ${winnerName} 쪽이 더 납득됩니다.`;
  }
  if (cardHas(cards, ["감성", "공감", "위로", "여운", "포용", "이해", "낭만"])) {
    return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 숫자나 효율보다 끝나고 마음이 덜 출렁이는 ${winnerName} 쪽이 더 편해 보입니다.`;
  }
  if (cardHas(cards, ["호기심", "재미", "유머", "재치", "아이디어", "탐색", "변화"])) {
    return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 무난함보다 이야기거리와 기분 전환이 있는 ${winnerName} 쪽이 더 살아납니다.`;
  }
  if (cardHas(cards, ["균형", "조화", "관계", "배려", "매너", "분위기", "센스"])) {
    return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 욕심과 부담 사이를 덜 삐뚤게 잡는 ${winnerName} 쪽이 더 예쁩니다.`;
  }
  return `오늘 카드가 <strong>${cardText}</strong>${cardBecause.replace(cardText, "")}, 지금 고민판에서는 ${winnerName} 쪽이 ${loserName}보다 조금 더 자연스럽게 붙었습니다.`;
}

function zodiacWhyNarrative(sign, cards, category, winner, loser) {
  const signName = sign[0];
  const cardText = escapeHtml(narrativeCardPreview(cards));
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerFeatureA = escapeHtml(winner.features[0] || winner.vibe || "오늘의 장점");
  const winnerFeatureB = escapeHtml(winner.features[1] || winner.caution || "선택 후 느낌");

  const templates = {
    "황소자리": () => [
      `황소자리는 오늘 새 모험보다 늘 가던 길을 더 오래 쳐다봅니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 별이 소파에 앉아서 "굳이 복잡하게 가야 해?"라고 말하는 쪽입니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 황소자리의 편한 리듬에 더 잘 붙습니다.`
    ],
    "양자리": () => [
      `양자리는 이미 신발을 신었습니다. 머리보다 몸이 먼저 반응하는 날입니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "일단 움직이고 보자" 쪽으로 손을 들었습니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 양자리의 즉흥 속도와 맞습니다.`
    ],
    "쌍둥이자리": () => [
      `쌍둥이자리는 오늘 머릿속에 작은 단톡방을 열었습니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 조용한 답보다 말할 거리 생기는 쪽을 더 재밌어합니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 오늘 쌍둥이자리의 호기심을 덜 심심하게 만듭니다.`
    ],
    "게자리": () => [
      `게자리는 오늘 결과보다 사람 마음, 표정, 돌아온 뒤의 기분을 먼저 봅니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "이 선택 하고 나서 마음이 차갑게 남지 않을까?"를 묻고 있습니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 게자리의 감정 온도를 덜 차갑게 만듭니다.`
    ],
    "사자자리": () => [
      `사자자리는 오늘 애매하게 끌려가는 표정을 싫어합니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 조명을 켜고 "선명하게 고른 쪽이 낫다"고 말합니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 사자자리의 당당함을 더 살립니다.`
    ],
    "처녀자리": () => [
      `처녀자리는 오늘 마음보다 체크리스트가 먼저 켜지는 별자리입니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "이거 끝나고 정리 쉬워?"부터 확인합니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 처녀자리의 점검 기준에 더 잘 맞습니다.`
    ],
    "천칭자리": () => [
      `천칭자리는 오늘 선택지를 저울 위에 올려놓고 분위기까지 같이 봅니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "너무 한쪽으로 쏠리진 말자"는 쪽으로 균형을 잡습니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 천칭자리의 균형감에 덜 삐뚤게 붙습니다.`
    ],
    "전갈자리": () => [
      `전갈자리는 오늘 겉핥기 설명을 싫어합니다. 계속 파고들다가 결국 결론을 원합니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "애매하게 두지 말고 마음속 선을 그어"라고 말합니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 전갈자리의 몰입과 결단에 더 깊게 꽂힙니다.`
    ],
    "사수자리": () => [
      `사수자리는 오늘 답답하게 묶이는 선택을 보면 바로 창문을 엽니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "작게라도 경험값 하나 만들자"는 쪽으로 갑니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 사수자리의 확장 욕구에 더 맞습니다.`
    ],
    "염소자리": () => [
      `염소자리는 오늘 감정표보다 계획표를 먼저 펼칩니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "내일도 설명 가능한 선택이냐"를 따지고 있습니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 염소자리의 현실 기준에 더 잘 들어갑니다.`
    ],
    "물병자리": () => [
      `물병자리는 오늘 남들이 고르는 기본값을 그대로 누르고 싶지 않습니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 고민판을 옆으로 돌려보고 있습니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 물병자리의 독특한 방식과 더 잘 맞습니다.`
    ],
    "물고기자리": () => [
      `물고기자리는 오늘 숫자보다 잠들기 전 마음의 파동을 먼저 듣습니다.`,
      `<strong>${cardText}</strong> 카드가 떠서 별이 "이거 하고 나서 마음이 덜 출렁일까?"를 묻습니다.`,
      `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureA}, ${winnerFeatureB}이 물고기자리의 감정선을 더 부드럽게 지나갑니다.`
    ]
  };

  return (templates[signName] || templates["황소자리"])().join(" ");
}

function zodiacAside(sign, category, winner) {
  const name = sign[0];
  const winnerName = escapeHtml(winner.name);
  const lines = {
    "황소자리": [
      `황소자리는 오늘 새 모험보다 늘 가던 길을 좋아합니다. ${winnerName} 쪽에서 발걸음이 덜 삐걱대네요.`,
      `황소자리가 오늘은 편한 의자에 앉아서 ${winnerName} 쪽을 오래 봤습니다. 마음이 편하면 별도 오래 머뭅니다.`
    ],
    "양자리": [
      `양자리는 오늘 생각보다 몸이 먼저 움직입니다. 고민판 보기도 전에 ${winnerName} 쪽으로 한 발 나갔어요.`,
      `양자리는 오늘 엘리베이터보다 계단을 고를 수도 있는 텐션입니다. ${winnerName} 쪽에 행동 버튼이 더 크게 떠요.`
    ],
    "쌍둥이자리": [
      `쌍둥이자리는 오늘 선택을 하나의 답보다 이야기거리로 봅니다. ${winnerName} 쪽이 말할 거리를 더 남겨요.`,
      `쌍둥이자리가 머릿속 단톡방을 열었는데, ${winnerName} 쪽 의견이 더 시끄럽습니다.`
    ],
    "게자리": [
      `게자리는 오늘 내 마음이 다치지 않는 쪽을 먼저 봅니다. ${winnerName} 쪽이 마음 이불을 덜 걷어차요.`,
      `게자리는 오늘 바깥 소리보다 안쪽 안심을 더 크게 듣습니다. ${winnerName} 쪽이 덜 차갑게 남아요.`
    ],
    "사자자리": [
      `사자자리는 오늘 애매한 표정보다 선명한 선택을 좋아합니다. ${winnerName} 쪽이 더 당당하게 서 있어요.`,
      `사자자리가 고민판 위에 조명을 켰습니다. 오늘 스포트라이트는 ${winnerName} 쪽으로 기웁니다.`
    ],
    "처녀자리": [
      `처녀자리는 오늘 마음보다 체크리스트를 먼저 봅니다. ${winnerName} 쪽이 뒤처리까지 더 깔끔해 보여요.`,
      `처녀자리가 빨간펜을 들었는데 ${winnerName} 쪽에 수정 표시가 적습니다. 이건 꽤 큰 장점이에요.`
    ],
    "천칭자리": [
      `천칭자리는 오늘 예쁜 균형을 찾습니다. ${winnerName} 쪽이 욕심과 부담 사이에서 덜 기울어요.`,
      `천칭자리가 저울을 올렸는데 ${winnerName} 쪽이 덜 흔들립니다. 오늘은 그게 예쁩니다.`
    ],
    "전갈자리": [
      `전갈자리가 차트를 5분 보다가 "그래서 결론이 뭔데?"라고 했습니다. ${winnerName} 쪽이 더 깊게 꽂혀요.`,
      `전갈자리는 오늘 애매한 여운을 싫어합니다. ${winnerName} 쪽이 마음속 선을 더 진하게 그어요.`
    ],
    "사수자리": [
      `사수자리는 오늘 묶이는 선택보다 숨통 트이는 쪽을 봅니다. ${winnerName} 쪽이 조금 더 넓어 보여요.`,
      `사수자리가 지도 없이도 벌써 밖을 봅니다. ${winnerName} 쪽이 오늘의 작은 모험입니다.`
    ],
    "염소자리": [
      `염소자리는 오늘 감정보다 계산기를 먼저 켭니다. ${winnerName} 쪽이 계획표에 덜 무리하게 들어갑니다.`,
      `염소자리가 "그래서 내일도 괜찮아?"를 물었습니다. ${winnerName} 쪽이 그 질문에 더 잘 버팁니다.`
    ],
    "물병자리": [
      `물병자리는 오늘 남들이 고르는 답을 그대로 따라가고 싶지 않습니다. ${winnerName} 쪽이 조금 더 내 방식 같아요.`,
      `물병자리가 고민판을 옆으로 돌려봤습니다. 그러자 ${winnerName} 쪽이 갑자기 더 재밌어졌어요.`
    ],
    "물고기자리": [
      `물고기자리가 오늘 차트보다 표정을 먼저 봤네요. ${winnerName} 쪽이 마음에 물결을 덜 만듭니다.`,
      `물고기자리는 오늘 숫자보다 잠들기 전 기분을 봅니다. ${winnerName} 쪽이 밤에 덜 출렁일 것 같아요.`
    ]
  };
  return pick(lines[name] || lines["황소자리"], winner.name.length + category.length);
}

function cardMeaningIntro(sign, cards, category, winner, loser, hasQuestionContext, subjectName) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const subject = escapeHtml(subjectName || winner.name);
  const winnerSubject = withParticle(winner.name, "은", "는");
  const winnerFeatures = featurePairText(winner.features[0], winner.features[1]);
  const voiceLine = zodiacVoiceLine(sign, category, winner, loser);

  if (category === "food") {
    if (cardHas(cards, ["편안함", "안정감", "익숙함", "따뜻함", "여유"])) {
      return `${voiceLine} ${winnerSubject} ${winnerFeatures} 있는 선택이라, ${loserName}보다 실패 확률이 낮아 보입니다.`;
    }
    if (cardHas(cards, ["도전", "에너지", "활동성", "즉흥성", "강렬함"])) {
      return `${voiceLine} ${winnerSubject} ${winnerFeatures} 올라오는 편이라, ${loserName}보다 오늘 표정이 더 빨리 살아날 것 같습니다.`;
    }
    if (cardHas(cards, ["관계", "분위기", "화려함", "존재감"])) {
      return `${voiceLine} ${winnerSubject} ${winnerFeatures} 있는 메뉴라, ${loserName}보다 이야기거리 만들기 좋습니다.`;
    }
    return `${voiceLine} ${winnerSubject} ${winnerFeatures} 있는 선택이라 ${loserName}보다 마음이 덜 흔들립니다.`;
  }

  if (category === "money") {
    if (cardHas(cards, ["책임감", "현실성", "계획", "성과", "실용성", "안정감"])) {
      return voiceLine;
    }
    if (cardHas(cards, ["도전", "즉흥성", "변화", "독창성"])) {
      return voiceLine;
    }
    return voiceLine || `오늘은 지갑이 놀라지 않는 선에서 결정하고 싶은 날이에요. ${winnerName} 쪽이 숫자 앞에서 표정 관리가 조금 더 됩니다.`;
  }

  if (category === "childcare") {
    if (cardHas(cards, ["편안함", "안정감", "가족", "따뜻함", "여유"])) {
      return `${voiceLine} ${subject} 고민이라면 ${winnerName} 쪽이 부모 체력까지 덜 잡아먹어 보입니다.`;
    }
    if (cardHas(cards, ["도전", "에너지", "활동성", "모험", "재미"])) {
      return `${voiceLine} ${subject} 고민이라면 ${winnerName} 쪽이 아이 표정을 더 빨리 밝힐 수 있습니다.`;
    }
    return `${voiceLine} ${winnerName} 쪽이 준비물과 체력 계산까지 넣었을 때 조금 더 무난합니다.`;
  }

  if (category === "drink") {
    if (winner.intent === "skip") {
      return `오늘은 술잔보다 내일 아침 얼굴색이 먼저 떠오르는 날이에요. ${winnerName} 쪽이면 간도 조용히 박수치고, 알람 소리도 덜 얄미울 겁니다.`;
    }
    return `오늘은 얌전히 지나가기엔 기분이 살짝 들뜬 날이에요. ${winnerName} 쪽이 지금 분위기를 살리긴 좋지만, 물 한 컵은 미리 친구처럼 옆에 둬야 합니다.`;
  }

  if (category === "attendance") {
    if (cardHas(cards, ["책임감", "성과", "계획", "현실성", "실용성"])) {
      return `오늘은 이불의 설득력보다 내일의 내 표정이 더 크게 보이는 날이에요. ${winnerName} 쪽이 귀찮아도 뒤끝은 덜 남길 가능성이 큽니다.`;
    }
    return `오늘은 몸과 일정 사이에서 눈치게임을 하는 날이에요. ${winnerName} 쪽이 지금 상황을 덜 꼬이게 만드는 선택으로 보입니다.`;
  }

  if (category === "relationship") {
    if (cardHas(cards, ["관계", "공감", "감성", "조화", "따뜻함"])) {
      return `오늘은 말 한마디를 너무 오래 묵히면 혼자 드라마를 찍기 쉬운 날이에요. ${winnerName} 쪽이 마음속 재방송을 줄이는 데 더 좋아 보입니다.`;
    }
    return `오늘은 감정보다 타이밍을 보는 쪽이 이기는 날이에요. ${winnerName} 쪽이 말풍선 앞에서 덜 어색합니다.`;
  }

  if (category === "place") {
    if (cardHas(cards, ["변화", "모험", "활동성", "재미", "호기심"])) {
      return `오늘은 같은 자리에서 고민만 굴리기보다 공기를 한 번 바꾸는 쪽이 더 재밌어 보입니다. ${winnerName} 쪽이 하루에 작은 이벤트를 넣어줄 수 있어요.`;
    }
    return `오늘은 멀리 화려하게 가는 것보다 편하게 다녀올 수 있는 쪽이 더 끌리는 날이에요. ${winnerName} 쪽이 돌아오는 길 표정까지 덜 지치게 합니다.`;
  }

  if (cardHas(cards, ["책임감", "현실성", "계획", "실용성"])) {
    return voiceLine || `오늘은 하고 싶은 마음보다 뒤처리까지 먼저 떠오르는 날이에요. 그래서 ${winnerName} 쪽이 끝나고 나서 덜 찜찜해 보입니다.`;
  }
  if (cardHas(cards, ["도전", "변화", "즉흥성", "호기심", "재미"])) {
    return voiceLine || `오늘은 너무 안전하게만 가면 하루가 심심하게 지나갈 수 있어요. ${winnerName} 쪽이 작게라도 기분 전환을 만들어줄 가능성이 큽니다.`;
  }
  return voiceLine || `오늘은 마음이 오래 끌리는 쪽보다 끝나고 덜 후회할 쪽을 고르는 날이에요. ${winnerName} 쪽이 그 느낌에 더 가깝습니다.`;
}

function starInterferenceLines(category, sign, cards, winner, loser, hasQuestionContext, subjectName, situationOverruledStars) {
  const signLabel = `${sign[1]} ${escapeHtml(sign[0])}`;
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerSaid = escapeHtml(withParticle(winner.name, "이라고", "라고"));
  const subject = escapeHtml(subjectName || winner.name);
  const cardText = escapeHtml(narrativeCardPreview(cards));
  const aside = zodiacAside(sign, category, winner);

  if (category === "food") {
    return [
      situationOverruledStars
        ? `${signLabel}가 ${loserName} 냄새에 잠깐 흔들렸는데, 오늘 몸 상태가 ${winnerName} 쪽 의자를 빼줬습니다. 별도 결국 배 속 평화를 무시하진 못하네요.`
        : aside,
      `${signLabel}의 오늘 카드: <strong>${cardText}</strong>. ${aside}`
    ];
  }
  if (category === "money") {
    return [
      aside,
      `${signLabel}의 오늘 카드: <strong>${cardText}</strong>. ${aside}`
    ];
  }
  if (category === "childcare") {
    return [
      aside,
      `${signLabel}의 오늘 카드: <strong>${cardText}</strong>. ${aside}`
    ];
  }
  if (category === "drink") {
    return [
      aside,
      `${signLabel}의 오늘 카드: <strong>${cardText}</strong>. ${aside}`
    ];
  }
  if (category === "attendance") {
    return [
      aside,
      `${signLabel}의 오늘 카드: <strong>${cardText}</strong>. ${aside}`
    ];
  }
  if (category === "relationship") {
    return [
      aside,
      `${signLabel}의 오늘 카드: <strong>${cardText}</strong>. ${aside}`
    ];
  }
  return [
    aside,
    `${signLabel}의 오늘 카드: <strong>${cardText}</strong>. ${aside}`
  ];
}

function futureComment(category, winner, question, seed) {
  const name = escapeHtml(winner.name);
  const subject = escapeHtml(winner.subjectName || winner.name);
  const raw = `${winner.name} ${winner.subjectName || ""} ${question}`.replace(/\s/g, "").toLowerCase();
  const winnerRaw = `${winner.name} ${winner.subjectName || ""}`.replace(/\s/g, "").toLowerCase();
  const variationSeed = Math.floor(Date.now() / 1000);
  const endings = [
    `미래의 내가 조용히 고개를 끄덕였습니다.`,
    `적어도 오늘 밤 변명거리는 하나 줄었습니다.`,
    `5분 뒤에도 이 선택을 다시 떠올릴 가능성은 있습니다.`,
    `내일의 내가 이 장면을 보고 표정 관리를 시도합니다.`,
    `생각보다 후폭풍이 귀엽게 지나갈 수도 있습니다.`,
    `오늘의 나는 납득했고, 미래의 나는 검토 중입니다.`,
    `결과는 모르지만 드라마 한 편은 줄였습니다.`,
    `괜히 오래 끌었으면 더 피곤했을 장면입니다.`,
    `이 선택이 완벽하진 않아도 오늘의 리듬에는 맞습니다.`,
    `미래의 내가 "그래, 그 정도면 됐다"라고 할 확률이 있습니다.`,
    `잠들기 전 머릿속 회의 시간이 조금 짧아집니다.`,
    `내일 다시 보면 웃길 수도 있지만, 오늘은 꽤 진지했습니다.`,
    `선택장애 회의실이 드디어 불을 껐습니다.`,
    `마음속 새로고침 버튼을 한 번 누른 느낌입니다.`,
    `오늘의 선택 기록에 밑줄 하나 생겼습니다.`,
    `미래의 내가 캡처해서 다시 볼지도 모릅니다.`,
    `괜히 미뤘으면 더 복잡해졌을 수 있습니다.`,
    `결론이 났다는 사실만으로도 반은 이겼습니다.`,
    `오늘의 나와 내일의 내가 일단 휴전했습니다.`,
    `선택 버튼 누른 손가락이 책임감을 느끼는 중입니다.`
  ];
  const startsByCategory = {
    food: [
      `${name} 한 입 먹고 "아, 이거였네" 했습니다.`,
      `국물 한 숟갈에 미래의 내가 조용히 납득했습니다.`,
      `단무지 두 번 리필하는 미래가 보입니다.`,
      `${subject} 쪽으로 간 나, 메뉴판 앞 방황은 끝냈습니다.`,
      `젓가락보다 숟가락이 먼저 박수쳤습니다.`,
      `한 입 먹고 고개를 끄덕였습니다. 말은 필요 없었습니다.`,
      `배고픈 나와 고민 많은 내가 동시에 조용해졌습니다.`,
      `오늘의 메뉴 회의는 ${name}에서 폐회했습니다.`,
      `입맛이 먼저 결재 올리고 미래의 내가 승인했습니다.`,
      `먹고 나서 "괜히 고민했네"가 나올 수 있습니다.`
    ],
    money: includesAny(winnerRaw, ["안판다", "보유", "홀딩", "관망", "기다"]) ? [
      `괜히 팔았다가 후회하는 미래는 일단 피했습니다.`,
      `오늘은 현금만 포지션이 아닙니다. 버티는 것도 포지션입니다.`,
      `적어도 잠은 조금 더 편하게 잘 것 같습니다. 차트만 안 보면요.`,
      `손은 가만히 있었고, 멘탈은 조금 덜 흔들렸습니다.`,
      `시장보다 내 평정심을 먼저 지킨 선택입니다.`,
      `매도 버튼 앞에서 한숨 돌린 미래가 보입니다.`,
      `오늘은 안 움직인 것도 하나의 움직임입니다.`,
      `괜히 팔고 다시 들어갈 타이밍 찾는 드라마는 피했습니다.`,
      `포지션은 남았고, 충동은 조금 줄었습니다.`,
      `내일 차트를 봐도 적어도 "왜 그랬지"는 덜할 수 있습니다.`
    ] : includesAny(winnerRaw, ["매도", "판다", "팔기", "팔래"]) ? [
      `결국 버튼은 눌렀네요. 이제 결과는 시장이 정합니다.`,
      `5분 뒤 다시 차트 보는 중입니다. 사람 마음 참 빠르죠.`,
      `팔고 나니 손은 가벼운데 눈은 차트에 붙어 있습니다.`,
      `현금화한 미래의 내가 일단 숨을 골랐습니다.`,
      `이제 차트는 구경이고, 마음은 정산 중입니다.`,
      `결론을 냈다는 사실만으로도 머리가 조금 조용해졌습니다.`,
      `팔고 나서 오르면 속 쓰릴 수 있지만, 오늘 고민은 끝났습니다.`,
      `시장에게 공을 넘겼습니다. 이제 심판은 내 계좌가 아닙니다.`,
      `버튼은 눌렀고, 마음은 방금 퇴근했습니다.`,
      `결과는 몰라도 결정 피로는 줄었습니다.`
    ] : [
      `지갑이 방금 심호흡했습니다.`,
      `미래의 내가 잔고를 보고 표정 관리를 시도합니다.`,
      `돈 앞에서 감정이 잠깐 정좌했습니다.`,
      `차트보다 내 멘탈이 먼저 출석했습니다.`,
      `숫자는 차갑고, 내 손가락은 뜨거웠습니다.`,
      `미래의 내가 손실과 기회를 동시에 계산하는 중입니다.`,
      `지갑 회의가 아직 끝나진 않았지만 의장은 정해졌습니다.`,
      `오늘의 선택은 계좌보다 마음의 소음부터 줄였습니다.`,
      `돈 이야기는 늘 진지한데, 오늘은 조금 덜 흔들렸습니다.`,
      `미래의 내가 계산기를 들고 다시 등장할 예정입니다.`
    ],
    childcare: [
      `아이보다 부모가 먼저 뻗을 가능성은 남아 있습니다.`,
      `물티슈 챙긴 사람은 결국 승자입니다.`,
      `${subject} 선택, 웃음은 챙기고 체력은 살짝 반납하는 코스입니다.`,
      `사진은 남고, 보호자 체력은 협상에 들어갑니다.`,
      `미래의 내가 "간식 챙겼으면 더 완벽했다"라고 말합니다.`,
      `아이 웃음소리에 오늘의 피로가 잠깐 밀렸습니다.`,
      `귀가 후 양말 상태가 모든 걸 말해줄 예정입니다.`,
      `보호자 허리는 회의 중이지만 추억은 승인됐습니다.`,
      `돌아오는 길에 말수가 줄어도 사진은 남습니다.`,
      `오늘의 육아 기록에 작은 별표가 붙었습니다.`
    ],
    relationship: [
      `말풍선 하나로 하루가 바뀔 수도 있습니다.`,
      `오늘의 한마디가 내일의 해석회를 줄여줄지도 모릅니다.`,
      `미래의 내가 "그래도 말하길 잘했다" 쪽으로 기웁니다.`,
      `상상으로 시즌2 찍는 일은 조금 줄었습니다.`,
      `읽씹보다 무서운 건 혼자 추측하는 밤입니다.`,
      `마음속 대본이 조금 짧아졌습니다.`,
      `상대 반응은 몰라도 내 마음은 덜 묵었습니다.`,
      `오늘의 말풍선은 생각보다 오래 남을 수 있습니다.`,
      `괜히 빙빙 돌던 문장이 드디어 밖으로 나왔습니다.`,
      `미래의 내가 이 장면을 다시 해석할 준비를 합니다.`
    ],
    attendance: [
      `가기 싫었지만 미래의 내가 커피 한 잔 사주고 싶어합니다.`,
      `이불은 졌고, 내일의 내가 박수쳤습니다.`,
      `오늘의 나태 회의가 조기 종료됐습니다.`,
      `알람은 미웠지만 결과적으로 출석 도장은 찍혔습니다.`,
      `내일의 찝찝함을 오늘 조금 결제했습니다.`,
      `몸은 투덜댔고 책임감은 조용히 이겼습니다.`,
      `미래의 내가 "그래도 해냈네"라고 중얼거립니다.`,
      `오늘은 완벽보다 출석에 의미가 있습니다.`,
      `귀찮음은 컸지만 뒤끝은 조금 줄었습니다.`,
      `내일의 내가 오늘의 나를 덜 혼낼 예정입니다.`
    ],
    place: [
      `돌아오는 길의 내가 덜 투덜거리면 성공입니다.`,
      `분위기는 이겼고, 체력은 협상 중입니다.`,
      `나간 김에 기분 전환 하나는 챙겼습니다.`,
      `집에만 있었으면 몰랐을 장면 하나를 얻었습니다.`,
      `신발은 고생했고 마음은 환기됐습니다.`,
      `돌아오면 피곤해도 "그래도 나갔다"가 남습니다.`,
      `오늘의 동선은 내 기분에 작은 구멍을 냈습니다.`,
      `밖 공기가 고민을 조금 덜 진지하게 만들었습니다.`,
      `체력은 빠졌지만 장면은 생겼습니다.`,
      `미래의 내가 사진첩을 열 가능성이 있습니다.`
    ],
    daily: [
      `미래의 내가 "오, 이 정도면 괜찮은데?" 하고 있습니다.`,
      `오늘의 선택이 내일의 핑곗거리를 하나 줄였습니다.`,
      `작은 결정 하나가 머릿속 소음을 줄였습니다.`,
      `미래의 내가 이 선택을 크게 문제 삼진 않을 것 같습니다.`,
      `고민판이 조금 조용해졌습니다.`,
      `오늘의 나와 내일의 나 사이에 임시 합의가 생겼습니다.`,
      `대단한 답은 아니어도 오늘 굴러가게는 만들었습니다.`,
      `미래의 내가 "그래, 그 정도면 됐다"라고 할 수 있습니다.`,
      `선택지가 더 커지기 전에 잡아둔 게 다행입니다.`,
      `오늘의 갈림길은 이 정도에서 닫아도 됩니다.`
    ]
  };
  const starts = startsByCategory[category] || startsByCategory.daily;
  const pool = [];
  starts.forEach((start) => endings.forEach((ending) => pool.push(`${start} ${ending}`)));
  return pick(pool, seed + raw.length + name.length + question.length + variationSeed);
}

function scoreOption(analysis, category, question, mood, seed, sign, cards = []) {
  const text = `${analysis.name} ${analysis.subjectName || ""} ${question}`.toLowerCase();
  let score = 50 + (hashText(`${analysis.name}-${seed}`) % 9) - 4;
  if (category === "food") {
    if (includesAny(text, ["김치", "라면", "짬뽕", "떡볶이", "치킨"]) && mood >= 5) score += 8;
    if (includesAny(text, ["된장", "국밥", "담백", "속 편"]) && (mood <= 4 || includesAny(question, ["속", "편", "부담"]))) score += 10;
    if (analysis.intent === "go" && !includesAny(question, ["속", "부담", "다이어트", "아프"])) score += 7;
    if (analysis.intent === "skip" && includesAny(question, ["속", "부담", "다이어트", "아프"])) score += 9;
  }
  if (category === "childcare") {
    if (includesAny(text, ["놀이터", "공원"]) && !includesAny(question, ["비", "춥", "미세먼지", "폭염", "한파"])) score += 12;
    if (includesAny(text, ["키즈카페", "실내"]) && includesAny(question, ["비", "춥", "미세먼지", "폭염", "한파"])) score += 14;
    if (analysis.intent === "go" && !includesAny(question, ["아프", "감기", "열", "주말", "사람 많", "피곤"])) score += 10;
    if (analysis.intent === "skip" && includesAny(question, ["아프", "감기", "열", "주말", "사람 많", "피곤"])) score += 14;
  }
  if (category === "attendance" && includesAny(text, ["출근", "근무"])) score += 12;
  if (category === "money" && includesAny(text, ["관망", "기다"])) score += 10;
  if (includesAny(question, ["어제 술", "술 많이", "숙취", "해장"])) {
    if (includesAny(text, ["감자탕", "해장", "묵직", "국물"])) score += 18;
    if (includesAny(text, ["순대국", "국밥", "뜨끈"])) score += 4;
  }
  score += zodiacBoost(sign, analysis, question).boost;
  score += cardOptionBoost(cards, analysis);
  return Math.max(35, Math.min(75, score));
}

function buildChoiceNarrative(question, choiceA, choiceB, mood, sign, profile, seed) {
  const category = inferCategory(question, choiceA, choiceB, profile);
  const a = contextualizeOption(choiceA, category, question);
  const b = contextualizeOption(choiceB, category, question);
  const cardLabels = zodiacCards(sign, seed);
  const cardText = narrativeCardPreview(cardLabels);
  const primaryCard = cardLabels[0];
  const secondaryCard = cardLabels[1];
  let aScore = scoreOption(a, category, question, mood, seed, sign, cardLabels);
  let bScore = scoreOption(b, category, question, mood, seed + 11, sign, cardLabels);
  if (profile.forced === "A") aScore = Math.max(aScore, bScore + 12);
  if (profile.forced === "B") bScore = Math.max(bScore, aScore + 12);
  const recommendA = aScore >= bScore;
  const winner = recommendA ? a : b;
  const loser = recommendA ? b : a;
  const winnerScore = Math.max(55, Math.min(75, recommendA ? aScore : bScore));
  const loserScore = 100 - winnerScore;
  const winnerSubject = withParticle(winner.name, "은", "는");
  const loserSubject = withParticle(loser.name, "은", "는");
  const winnerObject = withParticle(winner.name, "을", "를");
  const subjectName = winner.subjectName || winner.name;
  const loserSubjectName = loser.subjectName || loser.name;
  const hasQuestionContext = subjectName !== winner.name || loserSubjectName !== loser.name;
  const winnerActionText = scenarioActionText(subjectName, winner.name, category, winner.intent);
  const fortuneSubject = hasQuestionContext ? subjectName : winner.name;
  const winnerZodiac = zodiacBoost(sign, winner, question);
  const loserZodiac = zodiacBoost(sign, loser, question);
  const zodiacTraitText = winnerZodiac.traits.slice(0, 2).join(", ");
  const situationOverruledStars = loserZodiac.boost > winnerZodiac.boost && includesAny(question, ["어제 술", "술 많이", "숙취", "해장", "아프", "피곤", "비", "춥", "미세먼지"]);
  const fortune = pick(
    starInterferenceLines(category, sign, cardLabels, winner, loser, hasQuestionContext, subjectName, situationOverruledStars),
    seed + sign[0].length + winner.name.length
  );
  const cardDrivenReason = cardMeaningIntro(sign, cardLabels, category, winner, loser, hasQuestionContext, subjectName);
  const cardReason = cardReasonLine(cardLabels, winner, loser, category);
  const zodiacWhy = zodiacWhyNarrative(sign, cardLabels, category, winner, loser);
  const defaultWhy = [
    cardDrivenReason,
    cardReason,
    optionFeatureSentence(winner),
    `${escapeHtml(loser.name)}도 나쁘진 않은데, 지금은 ${escapeHtml(winner.name)} 쪽이 끝나고 덜 찝찝해 보입니다.`
  ].join(" ");
  const whyByCategory = {
    food: [
      cardDrivenReason,
      cardReason,
      hasQuestionContext
        ? `<strong>${escapeHtml(subjectName)}</strong> 고민이라면 ${escapeHtml(winner.name)} 쪽의 ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 오늘 바로 체감될 가능성이 큽니다.`
        : `${escapeHtml(loser.name)}도 ${escapeHtml(loser.features[0])} 쪽 매력이 있지만, 오늘은 ${escapeHtml(winner.name)}이 더 빠르게 마음을 정리해주는 메뉴예요.`,
      `그래서 오늘은 오래 비교하기보다 ${escapeHtml(winner.name)}처럼 고르자마자 "그래 이거지"가 나올 쪽에 점수가 붙었습니다.`
    ].join(" "),
    drink: [
      cardDrivenReason,
      cardReason,
      winner.intent === "skip"
        ? `${featurePairText(winner.features[0], winner.features[1])} 오늘은 꽤 큰 장점이에요. 한 잔의 재미보다 내일 아침 멀쩡함이 더 달콤할 수 있습니다.`
        : `${featurePairText(winner.features[0], winner.features[1])} 오늘의 유혹 포인트입니다. 다만 신난 김에 물 한 컵은 꼭 옆에 둬야 합니다.`,
      winner.intent === "skip"
        ? `간도 직장인이라 휴무가 필요합니다. 오늘은 ${escapeHtml(winner.name)} 쪽이 내일의 나한테 덜 혼납니다.`
        : `한 잔이 두 잔으로 변신하는 마법은 조심해야 합니다. 그래도 오늘 분위기만 보면 ${escapeHtml(winner.name)} 쪽이 더 재밌어 보여요.`
    ].join(" "),
    childcare: [
      cardDrivenReason,
      cardReason,
      hasQuestionContext
        ? `<strong>${escapeHtml(subjectName)}</strong> 고민이라면 ${escapeHtml(winner.name)} 쪽의 ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 오늘 더 크게 느껴질 수 있어요.`
        : `${winnerSubject} ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 있는 선택이에요.`,
      hasQuestionContext && winner.intent === "go"
        ? `아이가 "오늘 나 좀 풀어줘" 하는 날이면 ${escapeHtml(winner.name)} 쪽이 사진도 추억도 더 잘 남길 수 있습니다.`
        : hasQuestionContext
          ? `아이 컨디션이 애매하면 ${escapeHtml(subjectName)}은 살짝 다음 편 예고로 미뤄도 됩니다. 오늘은 무리하지 않는 선택도 꽤 괜찮아요.`
          : `${escapeHtml(loser.name)}도 ${escapeHtml(loser.features[0])}은 좋지만, ${escapeHtml(loser.features[2])} 같은 변수를 생각하면 보호자가 계속 신경을 써야 할 수 있어요.`,
      `결국 ${hasQuestionContext ? winnerActionText : escapeHtml(winner.name)} 쪽이 아이와 보호자 둘 다 덜 삐걱댈 가능성이 큽니다.`
    ].join(" "),
    attendance: [
      cardDrivenReason,
      cardReason,
      optionFeatureSentence(winner),
      `지금 귀찮음은 크지만, 내일 아침의 내가 고개를 끄덕일 쪽은 ${escapeHtml(winner.name)}에 더 가깝습니다.`
    ].join(" "),
    money: [
      cardDrivenReason,
      cardReason,
      optionFeatureSentence(winner)
    ].join(" "),
    relationship: [
      cardDrivenReason,
      cardReason,
      optionFeatureSentence(winner),
      `혼자 생각만 오래 굴리면 말 한마디가 점점 커집니다. 오늘은 ${escapeHtml(winner.name)} 쪽이 마음속 편집본을 줄여줄 수 있어요.`
    ].join(" ")
  };
  const adviceByCategory = {
    food: `오늘의 메뉴는 위장이 아니라 표정이 고르게 두세요.`,
    drink: `오늘 술잔보다 내일 아침 얼굴색이 더 큰 발언권을 가집니다.`,
    childcare: `아이의 웃음도 중요하지만, 보호자 체력 게이지도 생명줄입니다.`,
    attendance: `내일의 나한테 욕 덜 먹는 쪽으로 갑시다.`,
    money: `지갑이 비명 지르기 전에 한 번만 더 물어봅시다.`,
    relationship: `말은 짧게, 여운은 길게 가는 쪽이 이깁니다.`,
    shopping: `장바구니는 설레고, 카드값은 현실주의자입니다.`,
    place: `나갈 때의 신남보다 돌아올 때의 멀쩡함이 진짜 승자입니다.`,
    daily: `오늘은 끝나고 나서 "그래도 잘했다" 싶은 쪽으로 갑시다.`
  };
  const oppositeText = hasQuestionContext
    ? `반대로 <strong>${escapeHtml(loser.name)}</strong>는 ${featurePairText(loser.features[0], loser.features[1])} 장점이에요. ${escapeHtml(loser.caution)}`
    : `반대로 <strong>${escapeHtml(loser.name)}</strong>는 ${featurePairText(loser.features[0], loser.features[1])} 장점이에요. ${escapeHtml(loser.caution)}`;
  return {
    category,
    recommendA,
    winner,
    loser,
    winnerScore,
    loserScore,
    advice: adviceByCategory[category] || adviceByCategory.daily,
    why: zodiacWhy,
    opposite: oppositeText,
    fortune,
    zodiacCards: cardLabels,
    futureComment: futureComment(category, winner, question, seed),
    resultTitle: `${escapeHtml(winner.name)} 승`,
    finalText: `<strong>${escapeHtml(winner.name)} ${winnerScore}%</strong><br><strong>${escapeHtml(loser.name)} ${loserScore}%</strong>`
  };
}

function bulletList(items) {
  return `<ul class="result-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function reportCode(seed) {
  return `GL-${todayKey().replace(/-/g, "").slice(2)}-${String(seed % 997).padStart(3, "0")}`;
}

async function checkAiStatus() {
  const statusText = document.getElementById("aiStatusText");
  statusText.textContent = "서버 상태를 확인하고 있어요.";
  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    statusText.innerHTML = data.ai_ready
      ? "<strong>AI 손금 사용 가능</strong><br>사진을 선택하면 실제 AI 재미용 해석을 받을 수 있어요."
      : "<strong>화면 테스트 가능</strong><br>실제 AI 해석을 사용하려면 서버에 OpenAI API 키 설정이 필요해요.";
  } catch {
    statusText.innerHTML = "<strong>오프라인 화면 모드</strong><br>AI 손금은 온라인 서버에 연결한 뒤 사용할 수 있어요.";
  }
}

function setActiveTab(tabName) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === tabName);
  });
  const target = document.getElementById(tabName);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderHomeRecent() {
  const list = document.getElementById("recentList");
  if (!list) return;
  const recent = archive.slice(0, 3);
  if (!recent.length) {
    list.innerHTML = `
      <article class="empty-state compact">
        <strong>아직 기록이 없어요</strong>
        <p>첫 갈림길을 분석하면 최근 결과가 여기에 쌓입니다.</p>
      </article>
    `;
    return;
  }
  list.innerHTML = recent.map((card) => `
    <button class="recent-card" type="button" data-tab="archive">
      <span>${escapeHtml(card.date)}</span>
      <strong>${escapeHtml(card.choiceA || card.question)} ${card.choiceB ? "vs " + escapeHtml(card.choiceB) : ""}</strong>
      <em>${escapeHtml(card.recommended || card.choice || "")}</em>
    </button>
  `).join("");
  list.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });
}

function renderArchive() {
  const list = document.getElementById("archiveList");
  document.getElementById("archiveCount").textContent = `${archive.length} cards`;
  if (!archive.length) {
    list.innerHTML = `
      <article class="empty-state">
        <strong>아직 저장된 선택이 없어요</strong>
        <p>오늘의 갈림길을 열면 선택 카드가 여기에 쌓입니다.</p>
      </article>
    `;
    renderHomeRecent();
    return;
  }
  list.innerHTML = archive.map((card) => `
    <article class="archive-card">
      <span>${escapeHtml(card.date)}</span>
      <h3>${escapeHtml(card.question)}</h3>
      ${card.choiceA && card.choiceB ? `<p><strong>A:</strong> ${escapeHtml(card.choiceA)} · <strong>B:</strong> ${escapeHtml(card.choiceB)}</p>` : ""}
      <p>${escapeHtml(card.recommended || card.choice)}</p>
      ${card.advice ? `<p><strong>한 줄 조언:</strong> ${escapeHtml(card.advice)}</p>` : ""}
      ${card.outcome ? `<p><strong>체크인:</strong> ${escapeHtml(card.outcome)}</p>` : ""}
      ${card.memo ? `<p><strong>메모:</strong> ${escapeHtml(card.memo)}</p>` : ""}
    </article>
  `).join("");
  renderHomeRecent();
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

function downloadLatestCard() {
  if (!archive.length) {
    alert("먼저 선택 카드를 만들어주세요.");
    setActiveTab("choice");
    return;
  }
  const card = archive[0];
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
  gradient.addColorStop(0, "#071116");
  gradient.addColorStop(0.45, "#17333d");
  gradient.addColorStop(1, "#4a2638");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1920);

  ctx.fillStyle = "rgba(84, 210, 194, 0.22)";
  ctx.beginPath();
  ctx.arc(890, 260, 240, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(244, 200, 102, 0.2)";
  ctx.beginPath();
  ctx.arc(180, 1540, 320, 0, Math.PI * 2);
  ctx.fill();

  drawRoundedRect(ctx, 90, 220, 900, 1300, 42);
  ctx.fillStyle = "rgba(10, 20, 26, 0.82)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "#f4c866";
  ctx.font = "700 42px Malgun Gothic";
  ctx.fillText("갈림길 선택 카드", 150, 330);
  ctx.fillStyle = "#f7fbff";
  ctx.font = "800 78px Malgun Gothic";
  let y = wrapText(ctx, card.question, 150, 470, 780, 96);

  ctx.fillStyle = "#54d2c2";
  ctx.font = "700 38px Malgun Gothic";
  ctx.fillText(card.sign ? `${card.sign} · 마음 온도 ${card.mood}` : "오늘의 선택", 150, y + 70);

  ctx.fillStyle = "#a9bbc2";
  ctx.font = "500 44px Malgun Gothic";
  if (card.choiceA && card.choiceB) {
    y = wrapText(ctx, `${card.choiceA} vs ${card.choiceB}`, 150, y + 150, 780, 58);
    ctx.fillStyle = "#f4c866";
    ctx.font = "800 54px Malgun Gothic";
    y = wrapText(ctx, card.recommended || card.choice, 150, y + 70, 780, 70);
  } else {
    y = wrapText(ctx, card.choice, 150, y + 170, 780, 62);
  }

  if (card.advice) {
    ctx.fillStyle = "#f7fbff";
    ctx.font = "800 46px Malgun Gothic";
    y = wrapText(ctx, `"${card.advice}"`, 150, y + 90, 780, 62);
  }

  if (card.memo) {
    ctx.fillStyle = "#f7fbff";
    ctx.font = "500 38px Malgun Gothic";
    wrapText(ctx, `밤 체크인: ${card.memo}`, 150, y + 120, 780, 54);
  }

  ctx.fillStyle = "#f4c866";
  ctx.font = "600 34px Malgun Gothic";
  ctx.fillText("미래를 맞히는 대신, 오늘의 선택을 선명하게.", 150, 1410);
  ctx.fillStyle = "#a9bbc2";
  ctx.font = "500 30px Malgun Gothic";
  ctx.fillText("오락 및 자기성찰용", 150, 1466);

  const link = document.createElement("a");
  link.download = `galimgil-card-${todayKey()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function shareText(text, title = "갈림길", url = getShareUrl()) {
  const shareUrl = url || getShareUrl();
  if (navigator.share) {
    await navigator.share({ title, text, url: shareUrl });
    return;
  }
  const copyText = `${text}\n\n${shareUrl}`;
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(copyText);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = copyText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  alert("공유 문구와 앱 링크를 복사했어요.");
}

document.getElementById("todayDate").textContent = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short"
}).format(new Date());

const signInput = document.getElementById("signInput");
const chemMySign = document.getElementById("chemMySign");
const chemTheirSign = document.getElementById("chemTheirSign");
signs.forEach(([name, symbol]) => {
  signInput.add(new Option(`${symbol} ${name}`, name));
  chemMySign.add(new Option(`${symbol} ${name}`, name));
  chemTheirSign.add(new Option(`${symbol} ${name}`, name));
});
chemTheirSign.selectedIndex = 6;
updateStreak();
updateMoodLabel(Number(document.getElementById("moodInput").value));
document.getElementById("moodInput").addEventListener("input", (event) => {
  updateMoodLabel(Number(event.target.value));
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

document.querySelector("[data-scroll-target]")?.addEventListener("click", () => {
  document.getElementById("choiceA").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("choiceForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const loader = document.getElementById("analysisLoader");
  const loaderText = document.getElementById("loaderText");
  const submitButtons = document.querySelectorAll("#choiceForm button[type='submit']");
  document.getElementById("choiceResult").classList.remove("show");
  loader.classList.add("show");
  loader.scrollIntoView({ behavior: "smooth", block: "center" });
  submitButtons.forEach((button) => {
    button.disabled = true;
    button.textContent = "분석 중...";
  });
  loaderSteps.forEach((step, index) => {
    setTimeout(() => {
      if (loader.classList.contains("show")) {
        loaderText.textContent = step;
      }
    }, index * 420);
  });
  try {
    const question = document.getElementById("questionInput").value.trim() || "오늘 움직일까, 기다릴까?";
    const choiceA = document.getElementById("choiceA").value.trim() || "지금 움직인다";
    const choiceB = document.getElementById("choiceB").value.trim() || "조금 더 기다린다";
    const mood = Number(document.getElementById("moodInput").value);
    const signName = signInput.value || "양자리";
    const sign = signs.find(([name]) => name === signName) || signs[0];
    const seed = hashText(`${question}-${choiceA}-${choiceB}-${mood}-${signName}-${new Date().toDateString()}`);
    const profile = choiceProfile(question, choiceA, choiceB);
    const narrative = buildChoiceNarrative(question, choiceA, choiceB, mood, sign, profile, seed);
    const recommendA = narrative.recommendA;
    const recommended = narrative.winner.name;
    const mission = pick(missions, seed);
    const code = reportCode(seed);
    const adviceLine = narrative.advice;

    archive.unshift({
      date: new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric" }).format(new Date()),
      question,
      choice: `추천 선택: ${recommended}`,
      choiceA,
      choiceB,
      recommended: `추천: ${recommendA ? "A" : "B"} · ${recommended}`,
      advice: adviceLine,
      sign: signName,
      mood,
      createdAt: new Date().toISOString()
    });
    saveArchive();
    updateStreak();
    renderArchive();

    const shareCopy = [
      "[오늘의 갈림길 놀이 카드]",
      `리포트: ${code}`,
      `고민: ${question}`,
      `A: ${choiceA}`,
      `B: ${choiceB}`,
      `별자리 카드: ${narrative.zodiacCards.join(" + ")}`,
      `왜?: ${narrative.why.replace(/<[^>]+>/g, "")}`,
      `결과: ${recommended} 승`,
      `미래의 나: ${narrative.futureComment.replace(/<[^>]+>/g, "")}`,
      `확률: ${recommended} ${narrative.winnerScore}% / ${narrative.loser.name} ${narrative.loserScore}%`,
      "",
      "너도 갈림길 한 번 돌려봐 ㅋㅋ"
    ].join("\n");
    const inviteCopy = [
      "나 방금 갈림길 돌렸는데 결과가 좀 웃겨 ㅋㅋ",
      `내 고민은 "${question}"였고, "${recommended}" 승 나왔어.`,
      `미래의 나 댓글: "${narrative.futureComment.replace(/<[^>]+>/g, "")}"`,
      "너도 하나 넣어서 돌려봐."
    ].join("\n");

    const resultHtml = `
    <div class="report-hero">
      <span>${code} · 오늘의 갈림길 놀이</span>
      <h3>오늘의 별자리 카드</h3>
      <p>${escapeHtml(choiceA)} vs ${escapeHtml(choiceB)}</p>
    </div>
    <div class="report-section">
      <h4>🌟 오늘 ${escapeHtml(signName)} 카드</h4>
      <p class="zodiac-card-row">${narrative.zodiacCards.map((card) => `<span>🎲 ${escapeHtml(card)}</span>`).join("")}</p>
    </div>
    <div class="report-section">
      <h4>🌟 별의 참견</h4>
      <p>${narrative.fortune}</p>
    </div>
    <div class="report-section">
      <h4>💡 왜 이 결과가 나왔냐면</h4>
      <p>${narrative.why}</p>
    </div>
    <div class="report-section final-recommendation">
      <h4>🏁 갈림길 결과</h4>
      <p class="winner-line">${escapeHtml(recommended)} 승</p>
    </div>
    <div class="report-section">
      <h4>💬 미래의 나 댓글</h4>
      <blockquote class="advice-quote">${narrative.futureComment}</blockquote>
    </div>
    <div class="report-section">
      <h4>🎯 확률</h4>
      <p>${narrative.finalText}</p>
    </div>
    <div class="share-actions">
      <button class="secondary-button" id="downloadChoiceButton" type="button">이미지 저장</button>
      <button class="ghost-button" id="choiceShareButton" type="button">결과 공유</button>
    </div>
    <button class="ghost-button full-width" id="choiceInviteButton" type="button">친구에게 앱 보내기</button>
  `;
    setTimeout(() => {
      loader.classList.remove("show");
      showResult(document.getElementById("choiceResult"), resultHtml);
      document.getElementById("downloadChoiceButton").addEventListener("click", downloadLatestCard);
      document.getElementById("choiceShareButton").addEventListener("click", () => shareText(shareCopy, "갈림길 선택 카드"));
      document.getElementById("choiceInviteButton").addEventListener("click", () => shareText(inviteCopy, "갈림길"));
      document.getElementById("choiceResult").scrollIntoView({ behavior: "smooth", block: "start" });
      submitButtons.forEach((button) => {
        button.disabled = false;
        button.textContent = "분석하기";
      });
    }, 650);
  } catch (error) {
    loader.classList.remove("show");
    showResult(document.getElementById("choiceResult"), `
      <div class="report-hero">
        <span>리포트 생성 오류</span>
        <h3>다시 한 번 눌러주세요</h3>
        <p>앱이 리포트를 만드는 중 잠깐 멈췄어요. 입력값은 그대로 두고 다시 시도해보세요.</p>
      </div>
      <div class="report-section">
        <h4>확인용 메시지</h4>
        <p>${escapeHtml(error.message || "알 수 없는 오류")}</p>
      </div>
    `);
    document.getElementById("choiceResult").scrollIntoView({ behavior: "smooth", block: "start" });
    submitButtons.forEach((button) => {
      button.disabled = false;
      button.textContent = "분석하기";
    });
  }
});

document.getElementById("checkinForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!archive.length) {
    alert("먼저 선택 카드를 만들어주세요.");
    setActiveTab("choice");
    return;
  }
  archive[0].outcome = document.getElementById("outcomeInput").value;
  archive[0].memo = document.getElementById("checkinMemo").value.trim();
  saveArchive();
  renderArchive();
  document.getElementById("checkinMemo").value = "";
});

document.getElementById("chemistryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const relation = document.getElementById("relationInput").value;
  const myName = document.getElementById("myNameInput").value.trim() || "나";
  const theirName = document.getElementById("theirNameInput").value.trim() || "상대";
  const mySignName = chemMySign.value || "양자리";
  const theirSignName = chemTheirSign.value || "천칭자리";
  const relationMood = Number(document.getElementById("relationMoodInput").value);
  const question = document.getElementById("chemQuestionInput").value.trim() || "우리 사이의 리듬은 잘 맞을까?";
  const seed = hashText(`${relation}-${myName}-${theirName}-${mySignName}-${theirSignName}-${relationMood}-${question}`);
  const score = 62 + (seed % 36);
  const trust = 58 + ((seed * 3 + relationMood) % 39);
  const talk = 55 + ((seed * 5 + relationMood * 2) % 42);
  const fun = 61 + ((seed * 7 + relationMood * 3) % 37);
  const pace = 52 + ((seed * 11 + relationMood) % 44);
  const mySignData = signs.find(([name]) => name === mySignName) || signs[0];
  const theirSignData = signs.find(([name]) => name === theirSignName) || signs[6];
  const chemistryInsights = findWordInsights(relation, question, myName, theirName);
  const chemistryMessage = `${pick(chemistryMessages, seed + 17)} ${pick(chemistryAdvicePieces, seed + 29)}`;
  const chemistryMission = `${pick(chemistryMissions, seed + 23)}. ${pick(chemistryMissionObjects, seed + 41)}`;
  const loader = document.getElementById("chemistryLoader");
  const result = document.getElementById("chemistryResult");
  result.classList.remove("show");
  loader.classList.add("show");
  loader.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    loader.classList.remove("show");
    showResult(result, `
      <div class="report-hero">
        <span>${escapeHtml(relation)} CHEMISTRY CARD</span>
        <h3>${escapeHtml(myName)} × ${escapeHtml(theirName)}</h3>
        <p>${pick(chemistryOpeners, seed)} ${escapeHtml(mySignName)}의 ${mySignData[2]}과 ${escapeHtml(theirSignName)}의 ${theirSignData[2]}이 만난 조합으로 펼쳐봤어요.</p>
      </div>
      <div class="chemistry-score">
        <div><span>오늘의 케미</span><strong>${score}</strong></div>
      </div>
      <div class="metric-grid">
        <div><span>신뢰</span><strong>${trust}</strong></div>
        <div><span>대화</span><strong>${talk}</strong></div>
        <div><span>재미</span><strong>${fun}</strong></div>
        <div><span>속도</span><strong>${pace}</strong></div>
      </div>
      <div class="report-section">
        <h4>둘이 잘 맞는 부분</h4>
        <p>${pick(chemistryStrengths, seed)} ${pick(chemistryAdvicePieces, seed + score)}</p>
      </div>
      <div class="report-section">
        <h4>가끔 엇갈리는 지점</h4>
        <p>${pick(chemistryFrictions, seed + 9)} ${pick(chemistryAdvicePieces, seed + pace)}</p>
      </div>
      <div class="report-section">
        <h4>관계 단어 해석</h4>
        ${chemistryReading(relation, question, mySignData, theirSignData, chemistryInsights, seed)}
      </div>
      <div class="report-section">
        <h4>지금 궁금한 점에 대한 힌트</h4>
        <p><strong>${escapeHtml(question)}</strong></p>
        <p>오늘은 상대의 마음을 단정하기보다, 가볍게 확인하는 방식이 잘 맞아요. 무거운 결론보다 작은 대화 하나가 둘 사이의 온도를 더 정확하게 알려줄 수 있습니다. 특히 <strong>${chemistryInsights.map((item) => escapeHtml(item.label)).join(", ")}</strong> 키워드가 보여서, 말의 내용보다 말이 오가는 분위기가 중요해요.</p>
      </div>
      <div class="report-section">
        <h4>오늘 먼저 건넬 말</h4>
        <p>${chemistryMessage}</p>
      </div>
      <div class="report-section">
        <h4>같이 해볼 작은 미션</h4>
        <p>${chemistryMission}</p>
      </div>
      ${shareActionMarkup("chemistry")}
      <p class="fine-print">케미 카드는 오락 및 관계 성찰용 결과입니다. 실제 관계를 단정하지 않습니다.</p>
    `);
    const shareCopy = [
      "[갈림길 케미 카드]",
      `${myName} × ${theirName}`,
      `관계: ${relation}`,
      `오늘의 케미: ${score}`,
      `먼저 건넬 말: ${chemistryMessage}`,
      `같이 해볼 미션: ${chemistryMission}`,
      "",
      "너도 우리 케미 한번 열어봐."
    ].join("\n");
    const inviteCopy = [
      "우리 케미 갈림길에서 한번 봤는데 재밌다.",
      `${myName} × ${theirName} 케미 점수는 ${score} 나왔어.`,
      `같이 해볼 미션은 "${chemistryMission}"래.`,
      "너도 이름이랑 관계 넣어서 한번 봐봐."
    ].join("\n");
    document.getElementById("chemistryShareButton").addEventListener("click", () => shareText(shareCopy, "갈림길 케미 카드"));
    document.getElementById("chemistryInviteButton").addEventListener("click", () => shareText(inviteCopy, "갈림길 케미 보기"));
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 750);
});

document.getElementById("downloadCardButton").addEventListener("click", downloadLatestCard);
document.getElementById("shareAppButton").addEventListener("click", () => shareText(
  "오늘 고민을 A/B로 열어보는 앱이야. 선택 리포트, AI 손금, 케미 보기까지 있어서 지인끼리 해보기 좋아.",
  "갈림길"
));
document.getElementById("checkAiStatusButton").addEventListener("click", checkAiStatus);

const palmInput = document.getElementById("palmInput");
const palmPreview = document.getElementById("palmPreview");
let palmSeed = 0;

function preparePalmImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("사진을 읽지 못했어요. 다른 사진으로 다시 시도해주세요."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("사진 형식을 확인하지 못했어요. JPG 또는 PNG 사진으로 다시 시도해주세요."));
      image.onload = () => {
        const maxEdge = 1600;
        const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

palmInput.addEventListener("change", () => {
  const file = palmInput.files[0];
  if (!file) return;
  palmSeed = hashText(`${file.name}-${file.size}-${file.lastModified}`);
  const reader = new FileReader();
  reader.onload = () => {
    palmPreview.src = reader.result;
    palmPreview.classList.add("show");
  };
  reader.readAsDataURL(file);
});

document.getElementById("palmButton").addEventListener("click", () => {
  if (!palmInput.files.length) {
    showResult(document.getElementById("palmResult"), `
      <h3>손바닥 사진을 먼저 선택해주세요</h3>
      <p>손 전체와 손금이 선명하게 보이는 사진이 좋아요.</p>
    `);
    return;
  }

  if (!document.getElementById("palmConsent").checked) {
    showResult(document.getElementById("palmResult"), `
      <h3>사진 전송 동의가 필요해요</h3>
      <p>AI 분석을 진행하려면 사진 전송 안내를 확인하고 체크해주세요.</p>
    `);
    return;
  }

  const palmLoader = document.getElementById("palmLoader");
  const palmButton = document.getElementById("palmButton");
  palmLoader.classList.add("show");
  palmLoader.scrollIntoView({ behavior: "smooth", block: "center" });
  palmButton.disabled = true;
  palmButton.textContent = "AI 해석 중...";

  (async () => {
    try {
      const preparedImage = await preparePalmImage(palmInput.files[0]);
      const response = await fetch("/api/palm-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: preparedImage })
      });
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(`서버 응답을 읽지 못했어요. HTTP ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(data.error || "AI 손금 해석을 완료하지 못했어요.");
      }
      showResult(document.getElementById("palmResult"), `
        <div class="report-hero">
          <span>AI PALM CARD · ${escapeHtml(data.card_keyword)}</span>
          <h3>${escapeHtml(data.title)}</h3>
          <p>${escapeHtml(data.summary)}</p>
        </div>
        <div class="report-section">
          <h4>사진에서 읽은 흐름</h4>
          <p>${escapeHtml(data.visual_note)}</p>
        </div>
        <div class="report-section">
          <h4>주요 손금 해석</h4>
          <p><strong>생명선:</strong> ${escapeHtml(data.life_line)}</p>
          <p><strong>두뇌선:</strong> ${escapeHtml(data.head_line)}</p>
          <p><strong>감정선:</strong> ${escapeHtml(data.heart_line)}</p>
          <p><strong>운명선:</strong> ${escapeHtml(data.fate_line)}</p>
        </div>
        <div class="report-section">
          <h4>오늘의 메시지</h4>
          <p>${escapeHtml(data.today_message)}</p>
          <p><strong>작은 리추얼:</strong> ${escapeHtml(data.ritual)}</p>
        </div>
        ${shareActionMarkup("palm")}
        <p class="fine-print">AI 이미지 해석을 활용한 오락 및 자기성찰용 결과입니다. 실제 미래나 건강 상태를 판단하지 않습니다.</p>
      `);
      const palmShareCopy = [
        "[갈림길 AI 손금 카드]",
        `키워드: ${data.card_keyword}`,
        `제목: ${data.title}`,
        `오늘의 메시지: ${data.today_message}`,
        `작은 리추얼: ${data.ritual}`,
        "",
        "너도 손바닥 사진으로 재미용 손금 카드 열어봐."
      ].join("\n");
      const palmInviteCopy = [
        "나 갈림길에서 AI 손금 봤는데 결과 카드가 꽤 재밌어.",
        `내 키워드는 "${data.card_keyword}" 나왔어.`,
        "너도 사진 하나로 재미용 손금 카드 열어봐."
      ].join("\n");
      document.getElementById("palmShareButton").addEventListener("click", () => shareText(palmShareCopy, "갈림길 AI 손금 카드"));
      document.getElementById("palmInviteButton").addEventListener("click", () => shareText(palmInviteCopy, "갈림길 AI 손금"));
      document.getElementById("palmResult").scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      showResult(document.getElementById("palmResult"), `
        <h3>AI 손금 해석을 시작하지 못했어요</h3>
        <p>${escapeHtml(error.message)}</p>
        <p class="fine-print">오류 문구를 캡처해주면 바로 원인을 확인할 수 있어요.</p>
      `);
      document.getElementById("palmResult").scrollIntoView({ behavior: "smooth", block: "start" });
    } finally {
      palmLoader.classList.remove("show");
      palmButton.disabled = false;
      palmButton.textContent = "AI 손금 해석하기";
    }
  })();
});

renderArchive();
checkAiStatus();
