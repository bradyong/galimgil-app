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

function withRoParticle(value) {
  const raw = String(value || "");
  const last = raw.charCodeAt(raw.length - 1);
  const hasKoreanBatchim = last >= 0xac00 && last <= 0xd7a3 && ((last - 0xac00) % 28) !== 0;
  const hasRieulBatchim = last >= 0xac00 && last <= 0xd7a3 && ((last - 0xac00) % 28) === 8;
  return `${escapeHtml(value)}${hasKoreanBatchim && !hasRieulBatchim ? "으로" : "로"}`;
}

function scenarioActionText(subject, option, category, intent) {
  const optionText = String(option || "").replace(/\s/g, "").toLowerCase();
  const subjectText = String(subject || "").toLowerCase();
  if (intent === "skip" && category === "shopping" && includesAny(subjectText, ["tv", "티비", "텔레비전", "테레비"]) && includesAny(optionText, ["그냥", "본다", "보기", "유지"])) return `${escapeHtml(subject)} 그냥 보기`;
  if (intent === "skip" && category === "shopping" && includesAny(subjectText, ["컴퓨터", "pc", "피씨", "게임기", "플스", "닌텐도", "차", "자동차", "휴대폰", "핸드폰", "스마트폰", "에어컨"]) && includesAny(optionText, ["버틴", "버티", "참", "유지", "그냥", "보류", "미룬", "미루"])) return `${escapeHtml(subject)} 버티기`;
  if (intent === "skip") return `${escapeHtml(subject)} 미루기`;
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

function hasChildcareContext(text) {
  const compact = String(text).replace(/\s/g, "").toLowerCase();
  const falsePositiveWords = ["아이스", "아이폰", "아이패드", "아이돌", "아이디어", "아이템"];
  if (falsePositiveWords.some((word) => compact.includes(word))) {
    const withoutFalsePositive = falsePositiveWords.reduce((next, word) => next.replaceAll(word, ""), compact);
    return includesAny(withoutFalsePositive, ["아기", "자녀", "아들", "딸", "개월", "육아", "키즈카페", "놀이터", "어린이집", "유치원", "초등"]);
  }
  return includesAny(compact, ["아이랑", "아이와", "아이한테", "아이선물", "아기", "자녀", "아들", "딸", "개월", "육아", "키즈카페", "놀이터", "어린이집", "유치원", "초등"]);
}

function dangerousChoiceCheck(question, choiceA = "", choiceB = "") {
  const raw = `${question} ${choiceA} ${choiceB}`.toLowerCase();
  const compact = raw.replace(/\s/g, "");
  const directKeywords = [
    "죽을까", "자살", "극단적선택", "뛰어내릴까", "목숨", "죽고싶", "죽고싶다",
    "사라지고싶", "사라지고싶다", "해칠까", "자해", "약먹을까", "목맬까",
    "목매", "죽인다", "죽일까", "해코지", "폭력", "때릴까", "때린다", "때리", "범죄", "훔칠까", "훔친다", "훔치", "불법",
    "마약", "약물", "필로폰", "대마", "코카인", "도박", "카지노", "불법토토", "토토할까",
    "음주운전", "술먹고운전", "술마시고운전", "무면허", "방화", "불지를까", "협박"
  ];
  const dangerous = directKeywords.some((keyword) => compact.includes(keyword)) ||
    (compact.includes("칼") && includesAny(compact, ["해칠", "찌를", "찌르", "죽일", "자해"])) ||
    (compact.includes("피") && includesAny(compact, ["보고싶", "내고싶", "흘리", "자해"])) ||
    (compact.includes("약") && includesAny(compact, ["많이먹", "한꺼번에", "죽고", "자살"]));
  return {
    dangerous,
    message: `
      <div class="report-hero safety-result">
        <span>안전 안내</span>
        <h3>지금 이 질문은 갈림길 놀이로 답할 수 있는 내용이 아닙니다.</h3>
        <p>당장 혼자 판단하지 말고, 가까운 사람이나 긴급 도움을 받을 수 있는 곳에 바로 연락해주세요.</p>
      </div>
      <div class="report-section">
        <h4>지금은 선택보다 안전이 먼저입니다</h4>
        <p>한국에서는 위급한 상황이면 <strong>112</strong> 또는 <strong>119</strong>에 연락할 수 있습니다.</p>
        <p>자살예방상담전화 <strong>109</strong>도 이용할 수 있습니다.</p>
        <p>이 앱은 이런 선택에 답을 주지 않습니다. 지금은 A/B를 고르는 시간이 아니라, 도움을 연결하는 시간이 먼저입니다.</p>
      </div>
    `
  };
}

function choiceProfile(question, choiceA, choiceB) {
  const text = `${question} ${choiceA} ${choiceB}`.toLowerCase();
  const a = choiceA.toLowerCase();
  const b = choiceB.toLowerCase();
  const profile = { type: "general", forced: null };
  const giftContext = includesAny(text, ["선물", "생일", "어린이날", "크리스마스", "사줄까", "사줘", "장난감"]);
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
  } else if (includesAny(text, ["매수", "매도", "투자", "코인", "주식", "종목", "차트"]) && !giftContext) {
    profile.type = "money";
    profile.forced = includesAny(a, ["관망", "기다", "보류"]) ? "A" : includesAny(b, ["관망", "기다", "보류"]) ? "B" : null;
  } else if (includesAny(text, ["살까", "구매", "쇼핑", "예약", "결제", "주문", "장바구니", "사도", "바꿀까", "바꾼", "바꾼다", "바꾸", "교체", "tv", "티비", "텔레비전", "가전"])) {
    profile.type = "shopping";
  } else if (includesAny(text, ["고백", "연락", "전화", "통화", "문자", "카톡", "사과", "화해", "친구", "만난다", "만날까"])) {
    profile.type = "relationship";
  } else if (includesAny(text, ["샤워", "씻", "목욕", "머리감", "세수", "양치"])) {
    profile.type = "hygiene";
  } else if (includesAny(text, ["운동", "헬스", "러닝", "뛸까", "뛰", "필라테스", "요가", "산책"])) {
    profile.type = "exercise";
  } else if (includesAny(text, ["공부", "시험", "숙제", "과제", "강의", "복습", "예습"])) {
    profile.type = "study";
  } else if (includesAny(text, ["게임", "롤", "배그", "스팀", "모바일게임"]) && !includesAny(text, ["플스", "플레이스테이션", "닌텐도", "스위치", "게임기"])) {
    profile.type = "game";
  } else if (includesAny(text, ["여행", "숙소", "호텔", "비행기표", "놀러갈", "놀러 갈", "캠핑"])) {
    profile.type = "travel";
  } else if (giftContext) {
    profile.type = "gift";
  } else if (hasChildcareContext(text)) {
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
  return `형이 보기엔 <strong>${escapeHtml(question)}</strong> 이 고민은 마음은 한쪽으로 끌리는데, 현실이 "잠깐만" 하고 붙잡는 모양이에요. 오늘은 멋진 선택보다 끝나고 설명이 되는 선택이 이깁니다. 그래서 <strong>${safeRecommended}</strong> 쪽이 조금 더 안정적으로 보여요.`;
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
  { keys: ["김치찌개"], category: "food", features: ["김치의 새콤함", "매콤한 국물", "밥이랑 잘 맞는 국물 맛", "반찬 없이도 한 끼가 되는 느낌"], caution: "속이 예민하거나 자극적인 국물이 부담되면 피하는 게 좋아요.", vibe: "확실한 맛" },
  { keys: ["된장찌개"], category: "food", features: ["구수한 된장 향", "담백한 국물", "속이 편한 느낌", "익숙하고 편안한 한 끼"], caution: "강한 맛으로 스트레스를 풀고 싶은 날엔 조금 심심하게 느껴질 수 있어요.", vibe: "편한 맛" },
  { keys: ["짬뽕"], category: "food", features: ["얼큰한 국물", "해장되는 느낌", "땀나는 매운맛", "스트레스가 풀리는 자극"], caution: "속이 예민하거나 매운맛이 부담되는 날엔 먹고 나서 후회할 수 있어요.", vibe: "얼큰한 폭발력" },
  { keys: ["짜장면", "자장면"], category: "food", features: ["달달한 춘장 소스", "실패 확률이 낮은 중국집 기본값", "어릴 때 먹던 추억", "면 한 그릇으로 편하게 끝나는 느낌"], caution: "얼큰한 국물이나 해장감을 원하면 조금 답답하게 느껴질 수 있어요.", vibe: "편한 기본값" },
  { keys: ["라면"], category: "food", features: ["뜨거운 국물", "짭짤한 면발", "빠르게 채워지는 허기", "야식 같은 즉각적인 만족감"], caution: "붓기나 속 쓰림이 걱정되면 조심하는 게 좋아요.", vibe: "즉시 만족" },
  { keys: ["김밥"], category: "food", features: ["깔끔하게 집어먹기 좋은 점", "속이 과하게 무겁지 않은 점", "이동 중에도 먹기 편한 점", "국물 없이 먹으면 살짝 심심할 수 있는 점"], caution: "뜨끈한 국물이나 자극적인 맛을 원하면 아쉬울 수 있어요.", vibe: "깔끔한 한 끼" },
  { keys: ["집밥"], category: "food", features: ["편하게 끝나는 한 끼", "자극이 덜한 느낌", "밖에 나가지 않아도 되는 점", "특별한 맛의 재미는 약할 수 있는 점"], caution: "확실히 기분 내고 싶은 날엔 조금 심심할 수 있어요.", vibe: "편한 마무리" },
  { keys: ["제육", "제육볶음"], category: "food", features: ["첫 쌈 싸는 손맛", "빨간 양념이 밥에 묻는 순간", "밥 한 숟갈 더 부르는 힘", "먹고 나면 물이 당길 수 있는 점"], caution: "매운 양념이 부담되는 날엔 끝까지 조금 세게 느껴질 수 있어요.", vibe: "밥도둑" },
  { keys: ["소고기"], category: "food", features: ["확실히 기분 내는 맛", "구워 먹는 재미", "특별한 식사 느낌", "비용과 준비가 커질 수 있는 점"], caution: "가볍게 끝내고 싶은 날엔 밖에서 한 판 벌이는 느낌이 부담될 수 있어요.", vibe: "확실한 한 판" },
  { keys: ["돈까스"], category: "food", features: ["바삭한 튀김", "든든한 양", "소스의 달큰함", "실패 확률이 낮은 메뉴"], caution: "느끼한 음식이 부담되면 끝까지 먹기 무거울 수 있어요.", vibe: "든든함" },
  { keys: ["국밥"], category: "food", features: ["뜨끈한 국물", "든든한 포만감", "속을 채워주는 느낌", "혼밥에도 편한 안정감"], caution: "가볍게 먹고 싶은 날엔 무겁게 느껴질 수 있어요.", vibe: "회복감" },
  { keys: ["순대국", "순댓국"], category: "food", features: ["익숙한 국밥 느낌", "뜨끈한 국물", "혼밥에도 편한 분위기", "부담 없이 든든한 한 그릇"], caution: "강한 해장감이나 푸짐한 한 상을 원하면 조금 얌전하게 느껴질 수 있어요.", vibe: "편안한 든든함" },
  { keys: ["뼈해장국", "뼈 해장국"], category: "food", features: ["뼈를 뜯는 재미", "국물과 고기를 오래 붙잡는 식사", "순대국보다 푸짐한 한 그릇", "먹는 시간이 길어지는 묵직함"], caution: "빨리 먹고 움직여야 하는 날엔 뼈 발라먹는 시간이 살짝 부담될 수 있어요.", vibe: "뜯는 해장" },
  { keys: ["감자탕"], category: "food", features: ["푸짐한 뼈고기", "묵직한 국물", "사람들과 먹기 좋은 양", "해장 느낌이 강한 에너지"], caution: "가볍게 먹고 싶거나 혼자 조용히 먹고 싶으면 살짝 과할 수 있어요.", vibe: "푸짐한 에너지" },
  { keys: ["치킨"], category: "food", features: ["바삭한 튀김", "짭짤한 양념", "기분 전환 느낌", "나눠 먹기 좋은 재미"], caution: "가볍게 끝내고 싶은 날엔 과해질 수 있어요.", vibe: "기분 전환" },
  { keys: ["치킨에 맥주", "치맥"], category: "food", features: ["바삭한 치킨 껍질", "맥주 한 모금의 시원함", "배달 상자를 여는 편한 맛", "소파 앞에서 바로 시작되는 가벼운 분위기"], caution: "느끼함이 빨리 오거나 배달 기다림이 길면 흥이 살짝 꺼질 수 있어요.", vibe: "바삭한 즉시 만족" },
  { keys: ["곱창에 소주", "곱창"], category: "food", features: ["한 잔이 두 잔 되는 위험구역", "추가 주문 확률이 올라가는 점", "자리 끝나고 볶음밥까지 떠오르는 점", "다음 날 속이 항의할 수 있는 점"], caution: "내일 일정이 있으면 곱창보다 소주가 더 큰 변수가 될 수 있어요.", vibe: "위험한 술상" },
  { keys: ["삼겹살에 소주", "삼겹살에 맥주", "삼겹살", "고기"], category: "food", features: ["불판에서 올라오는 고기 냄새", "쌈과 기름진 한 점의 묵직함", "먹고 집 가자는 말이 비교적 빨리 나오는 점", "굽는 수고와 냄새가 따라오는 점"], caution: "굽는 수고와 냄새가 부담이면 치킨보다 번거롭게 느껴질 수 있어요.", vibe: "불판 만족" },
  { keys: ["피자"], category: "food", features: ["치즈의 고소함", "토핑 고르는 재미", "든든한 한 판", "같이 먹기 좋은 분위기"], caution: "속이 더부룩하거나 혼자 간단히 먹고 싶으면 부담될 수 있어요.", vibe: "풍성함" },
  { keys: ["햄버거", "버거"], category: "food", features: ["포장지 열자마자 바로 드는 손", "한입에 소스가 삐져나오는 순간", "감튀를 곁들이는 속도감", "먹고 나면 손 닦을 휴지가 필요한 점"], caution: "천천히 먹고 싶은 날엔 너무 빨리 끝나서 허전할 수 있어요.", vibe: "손으로 드는 한 끼" },
  { keys: ["배달", "배달음식"], category: "food", features: ["문 열자마자 들어오는 냄새", "봉투 뜯는 순간의 기대감", "설거지가 줄어드는 기쁨", "기다리는 동안 배가 더 고파지는 점"], caution: "늦게 오면 배고픔이 예민함으로 변할 수 있어요.", vibe: "문 앞의 승부" },
  { keys: ["콩국수"], category: "food", features: ["차갑고 고소한 콩물", "면을 시원하게 넘기는 느낌", "더운 날 입맛을 식혀주는 점", "걸쭉한 식감이 취향을 탈 수 있는 점"], caution: "뜨끈하거나 자극적인 걸 원하는 날엔 심심하게 느껴질 수 있어요.", vibe: "차가운 고소함" },
  { keys: ["냉면"], category: "food", features: ["차가운 육수", "쫄깃한 면발", "더운 날 바로 식는 느낌", "식초와 겨자로 맛을 조절하는 재미"], caution: "속이 차거나 든든한 한 끼를 원하면 조금 가볍게 느껴질 수 있어요.", vibe: "시원한 한 그릇" },
  { keys: ["떡볶이"], category: "food", features: ["매콤달달한 양념", "쫀득한 떡 식감", "분식집 냄새처럼 바로 당기는 점", "먹고 나서 물을 찾게 될 수 있는 점"], caution: "속이 예민하거나 자극을 피하고 싶은 날엔 후폭풍이 있을 수 있어요.", vibe: "매콤한 폭주" },
  { keys: ["초밥", "스시"], category: "food", features: ["깔끔한 한 점씩 먹는 재미", "밥과 회의 담백함", "무겁지 않게 기분 내는 점", "양이 부족하면 아쉬움이 남는 점"], caution: "뜨끈하고 든든한 걸 원하면 먹고 나서 허전할 수 있어요.", vibe: "깔끔한 기분" },
  { keys: ["아이스아메리카노", "아아", "차가운 아메리카노"], category: "beverage", features: ["차갑게 바로 깨는 느낌", "입안이 가벼워지는 쓴맛", "더울 때 시원하게 들어가는 점", "속이 예민하면 차가움이 부담될 수 있는 점"], caution: "속이 비었거나 몸이 차가운 날엔 천천히 마시는 게 좋아요.", vibe: "시원한 각성" },
  { keys: ["따뜻한 아메리카노", "뜨아", "핫아메리카노", "아메리카노"], category: "beverage", features: ["따뜻하게 손에 감기는 느낌", "천천히 마시기 좋은 온도", "속이 덜 놀라는 점", "더운 날엔 답답하게 느껴질 수 있는 점"], caution: "이미 덥거나 갈증이 크면 시원한 쪽이 더 당길 수 있어요.", vibe: "따뜻한 정리" },
  { keys: ["라떼", "카페라떼"], category: "beverage", features: ["우유의 부드러움", "쓴맛이 덜한 편안함", "출출할 때 살짝 채워지는 느낌", "깔끔한 커피를 원하면 무겁게 느껴질 수 있는 점"], caution: "가볍게 마시고 싶으면 아메리카노 쪽이 더 나을 수 있어요.", vibe: "부드러운 커피" },
  { keys: ["콜라", "코카콜라", "펩시"], category: "beverage", features: ["첫 모금에 바로 오는 탄산 임팩트", "치킨이나 햄버거 옆에서 강해지는 존재감", "단맛이 확 올라오는 시원함", "마시고 나면 입안이 조금 끈적할 수 있는 점"], caution: "깔끔하게 마무리하고 싶거나 느끼함만 정리하고 싶으면 사이다가 더 가벼울 수 있어요.", vibe: "첫 모금 폭발" },
  { keys: ["사이다", "스프라이트", "칠성사이다"], category: "beverage", features: ["깔끔하게 빠지는 탄산", "느끼함을 씻어내는 후반전 역할", "콜라보다 가볍게 넘어가는 단맛", "강한 첫 모금 임팩트는 덜할 수 있는 점"], caution: "햄버거나 치킨처럼 진한 메뉴 옆에서 첫 임팩트를 원하면 콜라가 더 세게 느껴질 수 있어요.", vibe: "깔끔한 마무리" },
  { keys: ["위스키", "whisky", "whiskey"], category: "drink", features: ["잔 하나로 천천히 폼 잡는 술자리", "얼음과 향으로 분위기를 끌고 가는 점", "빨리 취하기보다 오래 붙잡는 느낌", "가격과 도수가 묵직하게 따라오는 점"], caution: "가볍게 웃고 떠들고 싶으면 분위기 잡다 끝날 수 있어요.", vibe: "느린 폼" },
  { keys: ["소주"], category: "drink", features: ["잔 돌기 시작하면 말이 풀리는 속도", "안주와 붙는 익숙함", "분위기가 빨리 올라가는 점", "내일 얼굴색이 흔들릴 수 있는 점"], caution: "내일 일정이 있으면 한 잔이 두 잔 되는 속도를 조심해야 해요.", vibe: "빠른 술자리" },
  { keys: ["술", "소주", "맥주", "와인", "막걸리"], category: "drink", features: ["기분이 확 풀리는 느낌", "사람들과 말이 조금 더 쉬워지는 분위기", "내일 아침 컨디션을 담보로 잡는 점", "한 잔이 두 잔으로 변신하기 쉬운 점"], caution: "내일 일정이 있거나 이미 피곤하면 내일의 내가 강하게 항의할 수 있어요.", vibe: "오늘의 유혹" },
  { keys: ["키즈카페"], category: "childcare", features: ["실내라 날씨 영향을 덜 받는 점", "장난감과 시설이 많은 점", "큰 아이들과 동선이 겹치면 부딪힐 수 있는 점", "소리와 자극이 많아 아이가 금방 흥분할 수 있는 점"], caution: "사람이 많으면 보호자가 계속 따라다니며 봐야 해요.", vibe: "실내 자극" },
  { keys: ["놀이터"], category: "childcare", features: ["공간이 넓은 점", "아이가 자기 속도로 뛰어놀 수 있는 점", "돈이 거의 들지 않는 점", "날씨와 미끄럼틀·그네 주변 안전을 봐야 하는 점"], caution: "비, 추위, 미세먼지가 있으면 만족도가 확 떨어질 수 있어요.", vibe: "자유로운 몸놀이" },
  { keys: ["공룡", "티라노", "티라노사우루스"], category: "gift", features: ["포장을 뜯는 순간 반응이 큰 점", "상상놀이로 이야기를 만들기 좋은 점", "첫날 임팩트가 강한 점", "취향이 맞으면 한동안 이름 붙여가며 놀 수 있는 점"], caution: "공룡에 관심이 없는 아이라면 첫 반응만 크고 금방 식을 수 있어요.", vibe: "우와 하는 선물" },
  { keys: ["자동차", "장난감 자동차", "미니카", "차"], category: "gift", features: ["바닥에서 계속 굴리며 놀기 좋은 점", "혼자 놀 때도 손이 자주 가는 점", "오래 두고 반복해서 쓰기 쉬운 점", "이미 비슷한 장난감이 많으면 새로움이 덜할 수 있는 점"], caution: "집에 비슷한 차가 많으면 처음 반응은 조금 약할 수 있어요.", vibe: "오래 굴러가는 선물" },
  { keys: ["레고", "블록"], category: "gift", features: ["만들면서 오래 집중할 수 있는 점", "완성했을 때 뿌듯함이 큰 점", "부모가 같이 놀아주기 좋은 점", "작은 부품 관리가 필요한 점"], caution: "나이나 집중 시간이 맞지 않으면 부모 숙제가 될 수 있어요.", vibe: "만드는 재미" },
  { keys: ["책", "그림책", "동화책"], category: "gift", features: ["잠들기 전 같이 보기 좋은 점", "오래 두고 반복해서 읽기 쉬운 점", "부모와 대화가 생기는 점", "당장 반응은 장난감보다 조용할 수 있는 점"], caution: "화려한 장난감을 기대한 날이면 첫 리액션은 약할 수 있어요.", vibe: "조용한 선물" },
  { keys: ["공원"], category: "place", features: ["넓은 공간", "걷기 좋은 동선", "답답함이 풀리는 느낌", "날씨 영향을 많이 받음"], caution: "날씨가 나쁘면 금방 피곤해질 수 있어요.", vibe: "환기" },
  { keys: ["동물원"], category: "place", features: ["동물 보는 재미", "천천히 걷는 동선", "구경할 거리가 계속 이어지는 점", "날씨와 걷는 거리에 체력이 많이 쓰이는 점"], caution: "더운 날이나 사람이 많은 날엔 그늘과 쉬는 시간을 꼭 잡아야 해요.", vibe: "구경하는 재미" },
  { keys: ["놀이공원"], category: "place", features: ["놀이기구의 확실한 재미", "하루가 이벤트처럼 느껴지는 점", "대기줄과 사람 많은 변수", "돌아올 때 체력이 크게 빠지는 점"], caution: "대기 시간이 길면 기대감보다 피로가 먼저 올 수 있어요.", vibe: "큰 이벤트" },
  { keys: ["롯데월드"], category: "amusement", features: ["실내외를 오가는 놀이공원 코스", "인기 놀이기구와 긴 대기줄", "사진 찍기 좋은 공간", "사람 많은 날엔 체력이 빨리 빠지는 점"], caution: "주말이나 방학 시즌엔 대기시간이 하루의 절반을 가져갈 수 있어요.", vibe: "도심 놀이공원" },
  { keys: ["서울랜드"], category: "amusement", features: ["상대적으로 여유 있는 동선", "가족 단위로 돌기 좋은 분위기", "넓게 걷는 놀이공원 느낌", "강한 임팩트는 롯데월드보다 약할 수 있는 점"], caution: "확실한 스릴과 유명 어트랙션을 원하면 조금 얌전하게 느껴질 수 있어요.", vibe: "여유 놀이공원" },
  { keys: ["카페"], category: "place", features: ["앉아서 쉬기 좋음", "대화하기 편함", "커피나 디저트로 기분 전환 가능", "오래 있으면 비용이 쌓임"], caution: "사람이 많거나 자리가 불편하면 생각보다 정신없을 수 있어요.", vibe: "잠깐의 여유" },
  { keys: ["홍대"], category: "place", features: ["술집과 사람 많은 거리", "즉흥적으로 코스가 바뀌는 분위기", "시끄럽고 에너지 높은 밤", "집에 갈 타이밍을 놓치기 쉬운 점"], caution: "조용히 쉬고 싶은 날이면 사람 많은 공기부터 피곤할 수 있어요.", vibe: "즉흥적인 밤" },
  { keys: ["합정"], category: "place", features: ["카페와 맛집을 천천히 고르는 재미", "홍대보다 한 칸 낮은 소음", "데이트나 대화에 맞는 여유", "너무 조용하면 심심할 수 있는 점"], caution: "확실히 놀고 싶은 날엔 홍대보다 얌전하게 느껴질 수 있어요.", vibe: "여유 있는 약속" },
  { keys: ["일본", "도쿄", "오사카", "후쿠오카", "교토"], category: "travel", features: ["도시를 걸으며 구경하는 재미", "쇼핑과 맛집을 촘촘히 도는 여행", "교통과 동선 짜는 맛", "많이 걸으면 체력이 빨리 빠지는 점"], caution: "휴양처럼 푹 쉬고 싶으면 일정이 빡빡하게 느껴질 수 있어요.", vibe: "도시여행" },
  { keys: ["태국", "방콕", "푸켓", "치앙마이", "파타야"], category: "travel", features: ["휴양과 마사지의 느슨함", "수영장과 야시장의 재미", "더운 공기 속에서 천천히 쉬는 느낌", "날씨와 이동 피로가 변수인 점"], caution: "쇼핑과 도시 구경을 빽빽하게 하고 싶으면 일본보다 느슨하게 느껴질 수 있어요.", vibe: "휴양 여행" },
  { keys: ["제주도", "제주"], category: "travel", features: ["렌터카로 드라이브하는 재미", "바다와 오름, 자연을 보는 시간", "카페를 찍고 천천히 도는 여유", "날씨와 이동 동선 영향을 크게 받는 점"], caution: "운전이나 날씨 운이 안 맞으면 생각보다 피곤한 여행이 될 수 있어요.", vibe: "자연 드라이브" },
  { keys: ["부산"], category: "travel", features: ["바다와 밤바다의 기분", "회와 술자리로 이어지는 재미", "도시 여행과 바다 구경이 같이 되는 점", "사람 많은 시즌엔 이동이 답답할 수 있는 점"], caution: "조용한 자연 휴식을 원하면 부산의 도시 에너지가 살짝 시끄러울 수 있어요.", vibe: "바다 도시" },
  { keys: ["강릉"], category: "travel", features: ["바다 보고 카페까지 이어지는 동선", "커피거리와 바닷바람이 같이 오는 점", "사진첩에 남기 좋은 해변 장면", "사람 많은 시간엔 주차와 이동이 답답할 수 있는 점"], caution: "조용히 깊게 쉬고 싶으면 유명 코스의 사람 많은 느낌이 살짝 피곤할 수 있어요.", vibe: "바다 카페 코스" },
  { keys: ["삼척"], category: "travel", features: ["조금 더 한적한 바다와 자연", "동굴이나 해안길처럼 구경 포인트가 있는 점", "강릉보다 차분하게 도는 여행감", "코스가 맞지 않으면 이동 시간이 길게 느껴질 수 있는 점"], caution: "카페와 맛집을 촘촘히 이어가고 싶으면 강릉보다 선택지가 적게 느껴질 수 있어요.", vibe: "차분한 바다 여행" },
  { keys: ["경주"], category: "travel", features: ["역사 유적을 따라 걷는 재미", "한옥과 야경 사진이 잘 나오는 분위기", "조용히 구경하는 여행감", "밤에 너무 늦게까지 놀기엔 얌전할 수 있는 점"], caution: "먹거리와 술자리 중심으로 크게 놀고 싶으면 전주나 부산보다 차분하게 느껴질 수 있어요.", vibe: "역사 산책" },
  { keys: ["전주"], category: "travel", features: ["한옥마을과 먹거리 중심의 여행", "비빔밥·막걸리·길거리 음식으로 이어지는 재미", "사진 찍고 천천히 걷기 좋은 분위기", "사람 많은 시간엔 관광지 느낌이 강해지는 점"], caution: "역사 유적을 깊게 보고 싶으면 경주보다 먹방 여행 쪽으로 느껴질 수 있어요.", vibe: "먹거리 산책" },
  { keys: ["캠핑"], category: "travel", features: ["짐 싸는 순간부터 시작되는 여행", "불멍과 바깥 공기", "직접 준비하는 추억", "장비와 날씨가 귀찮아질 수 있는 점"], caution: "회복이 목표면 준비와 정리가 피곤할 수 있어요.", vibe: "직접 만드는 여행" },
  { keys: ["리조트"], category: "travel", features: ["문 여는 순간 쉬는 모드", "수영장과 조식과 침대가 붙어 있는 회복감", "짐 풀고 바로 늘어질 수 있는 점", "비용이 캠핑보다 커질 수 있는 점"], caution: "자연에서 직접 움직이는 추억을 원하면 심심할 수 있어요.", vibe: "회복 숙소" },
  { keys: ["영화"], category: "place", features: ["티켓 끊고 외출하는 이벤트감", "두 시간 정도 딱 몰입하는 시간", "끝나고 감상 얘기가 남는 점", "시간표와 이동이 따라오는 점"], caution: "집 밖으로 나갈 기운이 없으면 예매부터 귀찮아질 수 있어요.", vibe: "작은 이벤트" },
  { keys: ["드라마"], category: "place", features: ["침대나 소파에서 이어 보는 편함", "한 편만 보려다 다음 화로 넘어가는 위험", "새벽까지 이어질 수 있는 몰입", "외출 준비가 필요 없는 점"], caution: "다음 화 버튼을 못 끊으면 내일 아침이 살짝 삐질 수 있어요.", vibe: "연속시청" },
  { keys: ["출근"], category: "attendance", features: ["오늘 할 일을 미루지 않는 점", "내일 부담이 줄어드는 점", "책임을 지켰다는 마음이 남는 점", "몸이 피곤하면 하루가 길게 느껴질 수 있는 점"], caution: "진짜 아프면 무리하지 말고 먼저 연락하는 게 맞아요.", vibe: "최소 책임" },
  { keys: ["결근", "안한다", "쉰다", "쉬기"], category: "attendance", features: ["몸을 쉬게 할 수 있는 점", "당장 피로가 줄어드는 점", "대신 설명과 뒷일이 생길 수 있는 점", "무단이면 부담이 커지는 점"], caution: "쉬더라도 연락과 이유 정리는 꼭 필요해요.", vibe: "회복" },
  { keys: ["점심"], category: "daily", features: ["지금 바로 배고픔을 해결하는 점", "오후를 덜 예민하게 보내는 점", "오래 끌지 않아도 되는 점", "하루 리듬을 빨리 잡는 점"], caution: "저녁 약속이나 더 맛있는 계획이 있으면 조금 아쉬울 수 있어요.", vibe: "지금 챙김" },
  { keys: ["저녁"], category: "daily", features: ["하루 끝에 천천히 먹는 재미", "기대감을 남겨두는 점", "일정에 따라 밀릴 수 있는 점", "배고픔을 오래 데리고 다녀야 하는 점"], caution: "지금 배고프면 저녁까지 성격이 살짝 날카로워질 수 있어요.", vibe: "나중의 재미" },
  { keys: ["차를 탄다", "차 탄다", "자동차", "차"], category: "daily", features: ["빠르게 이동할 수 있는 점", "몸이 덜 피곤한 점", "비나 더위 같은 날씨 영향을 덜 받는 점", "주차나 비용이 생길 수 있는 점"], caution: "가까운 거리라면 오히려 준비와 주차가 더 번거로울 수 있어요.", vibe: "편한 이동" },
  { keys: ["버스"], category: "daily", features: ["돈을 아끼는 이동", "타고 가는 동안 폰을 보거나 멍때릴 수 있는 시간", "도착 시간이 교통 상황에 흔들리는 점", "퇴근길엔 사람 많은 변수가 있는 점"], caution: "시간이 촉박하거나 너무 지친 날엔 버스 기다리는 시간부터 길게 느껴질 수 있어요.", vibe: "교통비 방어" },
  { keys: ["택시"], category: "daily", features: ["시간과 체력을 아끼는 이동", "문 앞까지 편하게 가는 점", "피곤한 날 바로 앉을 수 있는 장점", "요금이 생각보다 크게 찍힐 수 있는 점"], caution: "거리나 시간대에 따라 요금이 확 뛰면 내릴 때 표정이 굳을 수 있어요.", vibe: "돈으로 사는 편함" },
  { keys: ["걸어간다", "걷는다", "걷기", "걸어"], category: "daily", features: ["몸을 움직이며 기분 전환이 되는 점", "돈이 들지 않는 점", "생각을 정리할 시간이 생기는 점", "날씨와 체력 영향을 크게 받는 점"], caution: "시간이 촉박하거나 너무 덥고 추우면 도착 전에 지칠 수 있어요.", vibe: "가벼운 움직임" },
  { keys: ["만난다", "만나", "나간다", "외출"], category: "daily", features: ["사람을 만나며 기분이 환기되는 점", "집에 있으면 없을 장면이 생기는 점", "대화와 웃음이 생길 수 있는 점", "체력과 시간이 소모되는 점"], caution: "몸이 많이 피곤하면 약속이 즐거움보다 숙제가 될 수 있어요.", vibe: "밖으로 나가는 장면" },
  { keys: ["잔다", "잠", "잠잔다", "쉰다"], category: "daily", features: ["몸을 바로 회복하는 점", "이불과 베개의 설득력이 강한 점", "내일 컨디션을 챙기는 점", "밖에서 생길 장면은 놓치는 점"], caution: "이미 너무 오래 미뤘던 약속이면 자고 나서 아쉬움이 남을 수 있어요.", vibe: "회복과 휴식" },
  { keys: ["강아지", "개", "댕댕이"], category: "pet", features: ["매일 산책이 필요한 생활 리듬", "표현이 크고 애착이 바로 보이는 점", "같이 움직이는 시간이 많아지는 점", "털·짖음·외출 책임이 따라오는 점"], caution: "예쁨보다 매일 산책과 돌봄 루틴을 감당할 수 있는지가 먼저예요.", vibe: "같이 사는 에너지" },
  { keys: ["고양이", "냥이", "猫"], category: "pet", features: ["혼자 있는 시간도 비교적 잘 보내는 성향", "조용히 다가오는 애착", "집 안 생활에 맞는 독립성", "화장실·털·스크래처 관리가 필요한 점"], caution: "혼자 잘 있는 편이어도 방치가 되는 건 아니고, 집 환경 관리가 꽤 중요해요.", vibe: "조용한 동거" },
  { keys: ["노래방", "코노", "코인노래방"], category: "hobby", features: ["마이크 잡는 순간 스트레스가 빠지는 점", "같이 가면 분위기가 바로 올라가는 점", "목이 먼저 지칠 수 있는 점", "선곡 실패하면 민망함이 생기는 점"], caution: "목 상태가 안 좋거나 조용히 쉬고 싶은 날엔 에너지를 더 뺏길 수 있어요.", vibe: "소리 지르는 해방감" },
  { keys: ["pc방", "피시방", "피씨방"], category: "hobby", features: ["앉자마자 게임과 간식이 같이 시작되는 점", "시간이 조용히 사라지는 점", "친구와 가면 몰입이 빨라지는 점", "끝낼 타이밍을 놓치기 쉬운 점"], caution: "한 시간만 하겠다는 말이 제일 먼저 배신할 수 있어요.", vibe: "시간 삭제 구역" },
  { keys: ["샤워", "씻", "씻기", "목욕"], category: "hygiene", features: ["몸이 개운하게 리셋되는 점", "땀과 찝찝함을 털어내는 점", "잠들기 전 기분이 가벼워지는 점", "시작 전 귀찮음이 꽤 큰 점"], caution: "너무 늦었거나 몸이 축 처져 있으면 짧게만 씻어도 충분해요.", vibe: "개운함" },
  { keys: ["머리감", "머리 감", "세수", "양치"], category: "hygiene", features: ["찝찝함이 바로 줄어드는 점", "거울 볼 때 마음이 덜 흐트러지는 점", "밖에 나가거나 잠들기 전 부담이 줄어드는 점", "귀찮음이 문앞에서 버티는 점"], caution: "완벽하게 다 하려다 더 미루지 말고 제일 찝찝한 것 하나만 해도 좋아요.", vibe: "정돈" },
  { keys: ["운동", "헬스", "러닝", "뛴다", "뛰기", "요가", "필라테스"], category: "exercise", features: ["몸을 움직이며 기분이 풀리는 점", "하고 나면 뿌듯함이 남는 점", "시작 전까지 귀찮음이 강한 점", "체력과 시간이 필요한 점"], caution: "몸이 진짜 피곤하거나 아프면 무리하지 않는 게 좋아요.", vibe: "몸의 시동" },
  { keys: ["운동안", "안운동", "안 한다", "안한다", "쉰다"], category: "exercise", features: ["오늘 체력을 아낄 수 있는 점", "소파와 타협하기 쉬운 점", "회복 시간을 확보하는 점", "미루는 습관이 생길 수 있는 점"], caution: "쉬기로 했다면 죄책감 대신 회복 시간을 제대로 쓰는 게 좋아요.", vibe: "운동 보류" },
  { keys: ["공부", "시험공부", "복습", "예습", "강의", "숙제", "과제"], category: "study", features: ["미래의 부담을 조금 덜어내는 점", "시작하면 생각보다 진도가 잡히는 점", "시험이나 마감 앞에서 마음이 덜 쫓기는 점", "책상 앞까지 가는 과정이 제일 어려운 점"], caution: "처음부터 오래 하려 하지 말고 20분만 잡아도 흐름이 생겨요.", vibe: "진도 한 칸" },
  { keys: ["스타크래프트", "스타"], category: "game", features: ["빌드 꼬이면 바로 티 나는 점", "내 손과 판단을 끝까지 의심하게 되는 점", "한 판 끝나고 리플레이가 생각나는 점", "실수 원인이 꽤 정직하게 드러나는 점"], caution: "한 번 말리면 내 탓인지 종족 탓인지 오래 따지게 될 수 있어요.", vibe: "내 실수 추적" },
  { keys: ["롤", "리그오브레전드", "리그 오브 레전드"], category: "game", features: ["팀원 핑이 먼저 올라오는 점", "내가 잘해도 판이 흔들릴 수 있는 점", "채팅창을 참는 것도 실력인 점", "이기면 한 판 더가 바로 따라오는 점"], caution: "남 탓 버튼이 너무 쉽게 켜지면 한 판이 세 판으로 번질 수 있어요.", vibe: "팀 운명 공동체" },
  { keys: ["게임", "배그", "플스", "스팀", "모바일게임"], category: "game", features: ["머리를 잠깐 꺼두는 재미", "스트레스가 빠르게 풀리는 점", "시간이 순식간에 사라지는 점", "한 판만 하겠다는 약속이 자주 흔들리는 점"], caution: "내일 일정이 있으면 종료 시간을 먼저 정해두는 게 좋아요.", vibe: "한 판의 유혹" },
  { keys: ["여행", "놀러", "숙소", "호텔", "비행기", "기차"], category: "travel", features: ["일상에서 빠져나오는 기분 전환", "사진과 추억이 남는 점", "비용과 동선 계산이 필요한 점", "체력이 생각보다 빨리 닳을 수 있는 점"], caution: "설렘만 보지 말고 이동 시간과 예산을 같이 봐야 해요.", vibe: "작은 탈출" },
  { keys: ["TV", "티비", "텔레비전", "테레비"], category: "shopping", features: ["화질이 바로 달라지는 점", "시청환경이 좋아지는 점", "거실이나 방 분위기가 바뀌는 점", "구매 비용과 설치 고민이 따라오는 점"], caution: "지금 TV가 아직 볼 만하면 화면 크기, 화질, 설치 공간, 예산을 같이 봐야 해요.", vibe: "시청환경 교체" },
  { keys: ["컴퓨터", "PC", "피씨", "노트북"], category: "shopping", features: ["버벅임이 줄어드는 성능 체감", "게임이나 작업 시간이 덜 답답해지는 점", "부품 가격과 신제품 타이밍 고민", "사고 나서 더 좋은 모델이 나올까 봐 찝찝한 점"], caution: "지금 컴퓨터가 아직 버틸 만하면 가격 안정이나 신제품 발표를 한 번 더 보는 것도 방법이에요.", vibe: "성능 지름신" },
  { keys: ["플스", "플레이스테이션", "ps5", "ps4"], category: "shopping", features: ["독점작과 고사양 게임의 유혹", "큰 화면에 연결해서 몰입하는 재미", "성능과 그래픽 체감", "휴대성은 약하고 TV 앞 시간이 필요하다는 점"], caution: "집에서 진득하게 할 시간이 없으면 성능보다 먼지가 먼저 쌓일 수 있어요.", vibe: "거치형 몰입" },
  { keys: ["닌텐도", "스위치"], category: "shopping", features: ["휴대성과 가볍게 켜는 재미", "마리오·젤다·동숲 같은 독점작", "가족이나 친구와 같이 하기 쉬운 점", "그래픽 성능은 플스보다 약할 수 있는 점"], caution: "고사양 그래픽과 묵직한 게임을 원하면 플스 쪽이 더 끌릴 수 있어요.", vibe: "가벼운 게임기" },
  { keys: ["게임기", "xbox", "엑스박스"], category: "shopping", features: ["켜자마자 놀 수 있는 재미", "독점작이나 새 게임 유혹", "사놓고 안 켤 수 있는 위험", "새 모델이나 할인 타이밍 고민"], caution: "하고 싶은 게임이 확실하지 않으면 박스만 예쁘게 모셔둘 수 있어요.", vibe: "게임 지름신" },
  { keys: ["자동차", "차량", "차 산", "차 살", "차 바꿀", "차 구매", "차 계약"], category: "shopping", features: ["이동 스트레스가 줄어드는 점", "출퇴근이나 가족 이동이 편해지는 점", "보험·세금·유지비가 따라오는 점", "신차/중고차 타이밍과 감가 걱정"], caution: "차는 사는 순간보다 유지하는 매달이 진짜 결정이에요.", vibe: "큰 이동비" },
  { keys: ["휴대폰", "핸드폰", "스마트폰", "폰", "아이폰", "갤럭시"], category: "shopping", features: ["배터리와 카메라 체감이 바로 오는 점", "새 폰 만지는 설렘", "요금제와 할부가 따라오는 점", "곧 새 모델 나올까 봐 고민되는 점"], caution: "지금 폰이 배터리만 문제인지, 진짜 전체가 답답한지부터 보면 좋아요.", vibe: "손안의 지름신" },
  { keys: ["에어컨"], category: "shopping", features: ["더위 스트레스가 바로 줄어드는 점", "여름 밤 수면이 달라지는 점", "전기요금과 설치비 고민", "성수기 가격과 설치 대기 변수"], caution: "한여름이 오기 전에 움직이면 설치 대기와 가격 스트레스를 줄일 수 있어요.", vibe: "생존형 소비" },
  { keys: ["산다", "구매", "결제", "예약", "주문"], category: "shopping", features: ["바로 쓰거나 누릴 수 있는 장점", "가격만큼 자주 쓸지 따져봐야 하는 점", "카드값이 따라붙는 현실감", "며칠 뒤에도 필요하다고 느낄지"], caution: "진짜 자주 쓸지, 지금 기분만 그런 건지 한 번만 더 보면 좋아요.", vibe: "구매 판단" },
  { keys: ["안 산다", "안산다", "안 사", "사지 않는다", "보류"], category: "shopping", features: ["통장을 지키는 점", "충동 결제를 줄이는 점", "배송 기다림이 사라지는 점", "대신 계속 생각날 수 있는 점"], caution: "계속 생각나면 하루 뒤 다시 봐도 늦지 않아요.", vibe: "통장 방어" },
  { keys: ["매수", "투자"], category: "money", features: ["기회를 잡는 느낌", "수익 기대감", "가격 변동 리스크", "틀렸을 때 손실 가능성"], caution: "손실 한도 없이 들어가면 감정이 흔들릴 수 있어요.", vibe: "공격적 선택" },
  { keys: ["매도", "판다", "팔기", "팔래"], category: "money", features: ["결론을 내리는 느낌", "수익이나 손실을 확정하는 버튼", "다시 차트를 볼 수밖에 없는 찝찝함", "현금화해서 마음을 정리하는 장점"], caution: "팔고 나서 오르면 차트를 더 자주 보게 될 수 있어요.", vibe: "결론 버튼" },
  { keys: ["안판다", "안 판다", "보유", "홀딩", "가지고"], category: "money", features: ["괜히 팔았다가 후회할 가능성을 줄이는 점", "포지션을 유지하는 선택", "현금화 유혹을 참는 인내", "떨어질 때 마음이 흔들릴 수 있는 점"], caution: "그냥 버티는 게 아니라 다시 볼 가격이나 시간을 정해두는 게 좋아요.", vibe: "잠깐 버티기" },
  { keys: ["관망", "기다"], category: "money", features: ["손실을 피할 시간", "가격을 더 볼 여유", "기회를 놓칠 수 있는 아쉬움", "감정 매매를 줄이는 장점"], caution: "기다림에도 기준 가격이 있어야 해요.", vibe: "리스크 관리" },
  { keys: ["전화", "통화"], category: "relationship", features: ["목소리로 오해를 줄일 수 있는 점", "답을 바로 확인하는 점", "문자보다 감정이 빨리 전달되는 점", "상대가 바쁘면 부담이 될 수 있는 점"], caution: "늦은 시간이거나 상대가 예민한 상황이면 짧게 시작하는 게 좋아요.", vibe: "직접 확인" },
  { keys: ["문자", "카톡", "연락"], category: "relationship", features: ["부담을 덜 주고 말을 꺼낼 수 있는 점", "상대가 답할 시간을 가질 수 있는 점", "말을 고쳐 쓸 수 있는 점", "기다리는 시간이 길어질 수 있는 점"], caution: "길게 쓰기보다 핵심만 짧게 보내는 게 좋아요.", vibe: "말풍선" },
  { keys: ["고백", "연락", "사과"], category: "relationship", features: ["마음을 직접 전함", "오해를 줄일 수 있음", "상대 반응을 확인할 수 있음", "말투가 세면 부담을 줄 수 있음"], caution: "긴 문장보다 짧고 정확한 말이 좋아요.", vibe: "직접 확인" },
  { keys: ["우리집앞", "우리 집 앞", "내집앞", "내 집 앞"], category: "relationship", features: ["내가 덜 움직이는 만남", "상대가 더 다가오는 거리감", "편한 구역에서 만나는 안정감", "상대에게 부담이 갈 수 있는 점"], caution: "상대가 계속 움직이는 그림이면 배려가 부족해 보일 수 있어요.", vibe: "내 구역" },
  { keys: ["친구집앞", "친구 집 앞", "상대집앞", "상대 집 앞"], category: "relationship", features: ["내가 먼저 움직이는 용기", "상대에게 부담을 덜 주는 거리감", "만남의 의지를 보여주는 행동", "내 이동 피로가 생기는 점"], caution: "너무 늦은 시간이나 갑작스러운 방문이면 부담이 될 수 있어요.", vibe: "다가가는 쪽" },
  { keys: ["차단"], category: "relationship", features: ["프로필 확인 횟수를 줄이는 점", "상대 반응을 기다리는 시간을 끊는 점", "마음속 소음을 강제로 줄이는 점", "나중에 풀지 말지 다시 고민할 수 있는 점"], caution: "화난 순간의 차단이면 하루 정도 지나 다시 봐도 늦지 않아요.", vibe: "버튼 한 번" },
  { keys: ["둔다", "냅둔다", "냅둘", "그냥둔다", "그냥 둔다"], category: "relationship", features: ["상황을 크게 만들지 않는 점", "나중에 다시 말할 여지를 남기는 점", "상대 반응을 계속 보게 되는 점", "혼자 상상하는 시간이 길어질 수 있는 점"], caution: "그냥 두기로 했다면 프로필 확인을 줄이는 기준도 같이 잡아야 해요.", vibe: "상상력 연장" },
  { keys: ["보류", "안 한다", "안한다"], category: "general", features: ["당장 부딪히지 않음", "생각할 시간이 생김", "너무 길어지면 답답함이 남음", "결정 피로가 줄어듦"], caution: "언제 다시 볼지 정하지 않으면 흐지부지될 수 있어요.", vibe: "보류" }
];

function inferCategory(question, choiceA, choiceB, profile) {
  const text = `${question} ${choiceA} ${choiceB}`.toLowerCase();
  if (profile.type !== "general") return profile.type;
  if (includesAny(text, ["점심", "저녁", "아침", "야식", "메뉴", "먹을", "뭐먹", "뭐 먹", "식사", "찌개", "라면", "밥", "국밥", "순대국", "순댓국", "뼈해장", "감자탕", "치킨", "피자", "햄버거", "버거", "배달", "돈까스", "냉면", "짜장", "짬뽕", "떡볶이", "초밥", "스시", "회", "사시미", "곱창", "삼겹살", "고기", "한우", "소고기"])) return "food";
  if (includesAny(text, ["아메리카노", "아이스", "아아", "뜨아", "커피", "라떼", "카페라떼", "콜드브루", "콜라", "코카콜라", "펩시", "사이다", "스프라이트", "칠성"])) return "beverage";
  if (includesAny(text, ["술", "소주", "맥주", "와인", "막걸리", "마실까", "한잔", "한 잔"])) return "drink";
  if (includesAny(text, ["샤워", "씻", "목욕", "머리감", "세수", "양치"])) return "hygiene";
  if (includesAny(text, ["운동", "헬스", "러닝", "뛸까", "뛰", "요가", "필라테스", "산책"])) return "exercise";
  if (includesAny(text, ["공부", "시험", "숙제", "과제", "강의", "복습", "예습"])) return "study";
  if (includesAny(text, ["게임", "롤", "리그오브레전드", "리그 오브 레전드", "스타", "스타크래프트", "배그", "스팀", "모바일게임"]) && !includesAny(text, ["플스", "플레이스테이션", "닌텐도", "스위치", "게임기"])) return "game";
  if (includesAny(text, ["강아지", "고양이", "댕댕이", "냥이", "반려동물", "반려견", "반려묘", "키울까", "입양"])) return "pet";
  if (includesAny(text, ["롯데월드", "서울랜드", "에버랜드", "놀이공원", "어트랙션", "자이로드롭", "롤러코스터", "대기줄"])) return "amusement";
  if (includesAny(text, ["노래방", "코노", "코인노래방", "pc방", "피시방", "피씨방", "취미", "놀거리", "뭐하고 놀"])) return "hobby";
  if (includesAny(text, ["선물", "생일", "어린이날", "크리스마스", "사줄까", "사줘", "장난감"])) return "gift";
  if (includesAny(text, ["여행", "휴가", "여름휴가", "겨울휴가", "해외", "국내", "숙소", "호텔", "비행기표", "놀러갈", "놀러 갈", "캠핑", "일본", "도쿄", "오사카", "후쿠오카", "교토", "태국", "방콕", "푸켓", "치앙마이", "파타야", "제주도", "제주", "부산", "강릉", "삼척", "속초", "양양", "경주", "전주"])) return "travel";
  if (hasChildcareContext(text)) return "childcare";
  if (includesAny(text, ["친구", "만난다", "만날까", "약속", "우리집앞", "우리 집 앞", "내집앞", "내 집 앞", "친구집앞", "친구 집 앞", "상대집앞", "상대 집 앞", "차단", "둔다", "냅둔다", "냅둘", "연락처", "프로필", "읽씹", "카톡"])) return "relationship";
  if (includesAny(text, ["홍대", "합정", "카페", "공원", "영화", "드라마", "넷플릭스", "마트", "백화점", "여행", "놀러", "어디", "캠핑"])) return "place";
  if (includesAny(text, ["소비", "살까", "구매", "쇼핑", "예약", "결제", "주문", "장바구니", "바꿀까", "바꾼", "바꾼다", "바꾸", "교체", "버틴", "버티", "컴퓨터", "pc", "피씨", "노트북", "게임기", "플스", "플레이스테이션", "닌텐도", "스위치", "자동차", "차량", "차 산", "차 살", "차 바꿀", "차 구매", "차 계약", "휴대폰", "핸드폰", "스마트폰", "폰", "아이폰", "갤럭시", "에어컨", "tv", "티비", "텔레비전", "가전"])) return "shopping";
  return "daily";
}

function findFeatureEntry(text, preferredCategory = null) {
  const normalized = String(text).toLowerCase();
  const matches = [];
  let best = null;
  optionFeatureBank.forEach((item) => {
    item.keys.forEach((key) => {
      if (key === "책" && includesAny(normalized, ["책상", "책장", "책꽂이", "책받침"])) return;
      if (normalized.includes(key.toLowerCase())) {
        matches.push({ item, key });
      }
    });
  });
  matches.forEach((match) => {
    const categoryBonus = preferredCategory && match.item.category === preferredCategory ? 1000 : 0;
    const score = match.key.length + categoryBonus;
    if (!best || score > best.score) best = { ...match, score };
  });
  return best;
}

function inferredOptionProfile(option, category, question = "") {
  const name = String(option || "");
  const optionRaw = name.toLowerCase();
  const optionCompact = optionRaw.replace(/\s/g, "");
  const questionCompact = String(question || "").toLowerCase().replace(/\s/g, "");
  const make = (features, caution, vibe) => ({ name, category, features, caution, vibe, inferred: true });
  const has = (words) => includesAny(optionCompact, words);
  const contextHas = (words) => includesAny(questionCompact, words);

  if (category === "travel" || category === "place") {
    if (has(["바다", "해변", "비치", "섬", "제주", "푸켓", "코타", "몰디브", "괌", "휴양"])) {
      return make(
        [`${name}에서 바다나 자연을 보며 쉬는 시간`, "카페나 산책처럼 느슨하게 흐르는 일정", "날씨에 따라 만족도가 크게 갈리는 점", "이동보다 머무는 시간이 더 중요해지는 점"],
        "날씨와 이동 동선이 안 맞으면 쉬러 갔다가 생각보다 피곤해질 수 있어요.",
        "휴양/자연"
      );
    }
    if (has(["도쿄", "오사카", "서울", "부산", "홍콩", "대만", "방콕", "싱가포르", "시내", "도시", "역", "쇼핑", "시장"])) {
      return make(
        [`${name}에서 걷고 구경하는 도시 여행`, "맛집과 쇼핑을 촘촘히 도는 재미", "교통과 동선을 짜는 맛", "많이 걸으면 체력이 빨리 빠지는 점"],
        "쉬는 여행을 원하면 일정이 빽빽하게 느껴질 수 있어요.",
        "도시 구경"
      );
    }
    if (has(["산", "오름", "숲", "계곡", "공원", "호수", "드라이브"])) {
      return make(
        [`${name}에서 바람 쐬고 몸을 움직이는 시간`, "사진 남기기 좋은 자연감", "복잡한 실내보다 머리가 환기되는 점", "날씨와 체력 영향을 크게 받는 점"],
        "비가 오거나 너무 덥고 추우면 만족도가 확 떨어질 수 있어요.",
        "자연 환기"
      );
    }
    return make(
      contextHas(["휴가", "여름휴가", "여행", "해외", "국내"])
        ? [`${name}에서 휴가 느낌이 어떻게 살아나는지`, "숙소와 이동 동선이 만드는 피로도", "가서 쉬는지 돌아다니는지에 따라 달라지는 만족도", "돌아왔을 때 사진과 이야깃거리가 남는 정도"]
        : [`${name}에서 하루 공기가 바뀌는 점`, "도착하기까지의 이동과 비용", "가서 무엇을 할지에 따라 만족도가 달라지는 점", "돌아올 때 체력이 남는지가 중요한 점"],
      "이름만 보고 고르기보다 이동 시간, 날씨, 같이 가는 사람을 같이 봐야 해요.",
      category === "travel" ? "여행 후보" : "장소 후보"
    );
  }

  if (category === "food") {
    if (has(["국", "탕", "찌개", "해장", "면", "라면", "우동"])) {
      return make(
        [`${name}에서 뜨거운 한 숟갈로 시작되는 느낌`, "먹는 동안 속이 천천히 풀리는 점", "국물까지 보면 시간이 조금 더 걸리는 점", "날씨나 속 상태에 따라 만족도가 갈리는 점"],
        "가볍고 빨리 끝내고 싶은 날엔 생각보다 무겁게 느껴질 수 있어요.",
        "뜨끈한 한 끼"
      );
    }
    if (has(["고기", "삼겹", "갈비", "스테이크", "곱창", "치킨", "튀김", "돈까스"])) {
      return make(
        [`${name}에서 냄새와 식감이 먼저 치고 들어오는 점`, "먹기 시작하면 말수가 잠깐 줄어드는 장면", "확실히 먹었다는 느낌이 남는 점", "끝나고 살짝 무거울 수 있는 점"],
        "속이 예민하거나 가볍게 끝내고 싶은 날엔 후반부가 부담될 수 있어요.",
        "확실한 식사"
      );
    }
    if (has(["커피", "라떼", "콜라", "사이다", "주스", "음료"])) {
      return make(
        [`${name} 한 모금으로 입안이 바뀌는 점`, "음식 옆에서 역할이 달라지는 점", "마시고 난 뒤 깔끔함이나 단맛이 남는 점", "얼음이나 온도에 따라 기분이 달라지는 점"],
        "음료는 같이 먹는 음식이 무엇인지에 따라 답이 바뀔 수 있어요.",
        "마시는 선택"
      );
    }
    return make(
      [`${name}을 골랐을 때 바로 떠오르는 식사 장면`, "먹고 난 뒤 배부름과 후회 정도", "지금 입맛과 귀찮음에 맞는지", "같이 먹는 메뉴나 상황에 따라 달라지는 점"],
      "맛만 보지 말고 먹고 난 뒤 몸이 어떨지도 같이 보면 좋아요.",
      "메뉴 후보"
    );
  }

  if (category === "shopping") {
    return make(
      [`${name}을 샀을 때 바로 쓰는 장면`, "가격과 실제 사용 빈도", "지름신이 지나간 뒤에도 필요할지", "신제품이나 할인 타이밍 때문에 생기는 후회 가능성"],
      "오늘 사고 싶은 마음과 한 달 뒤에도 잘 쓸 장면을 따로 봐야 해요.",
      "소비 판단"
    );
  }

  if (category === "relationship") {
    return make(
      [`${name}을 했을 때 상대 반응을 기다리는 시간`, "말하고 나서 마음속 소음이 줄어드는 점", "타이밍이 어긋나면 어색해질 수 있는 점", "혼자 상상만 키우지 않아도 되는 점"],
      "관계 선택은 내용보다 타이밍과 말투가 더 크게 작동할 수 있어요.",
      "관계 선택"
    );
  }

  if (category === "daily") {
    if (has(["버스", "지하철", "택시", "차", "걸어", "걷", "자전거"])) {
      return make(
        [`${name}로 이동했을 때 드는 시간과 돈`, "몸이 덜 피곤한지 혹은 돈을 아끼는지", "기다리는 시간과 도착 시간 변수", "퇴근길이면 사람 많음까지 같이 따라오는 점"],
        "이동 선택은 편함과 비용 중 오늘 무엇을 더 아낄지로 보면 좋아요.",
        "이동 수단"
      );
    }
    return make(
      [`${name}을 골랐을 때 바로 달라지는 오늘 장면`, "끝나고 남는 피로감이나 개운함", "미루면 남는 찝찝함", "지금 시간과 몸 상태로 감당 가능한지"],
      "큰 의미를 붙이기보다 끝나고 내가 덜 투덜댈 쪽을 보면 좋아요.",
      "일상 판단"
    );
  }

  return make(
    [`${name}을 선택했을 때 바로 생기는 변화`, "끝나고 남는 기분", "비용이나 시간처럼 따라오는 현실 변수", "나중에 다시 떠올렸을 때 후회할 가능성"],
    "단어 자체보다 이 선택 뒤에 오는 하루를 같이 봐야 해요.",
    "추론 후보"
  );
}

function analyzeOption(option, category, question = "") {
  const text = option.toLowerCase();
  const match = findFeatureEntry(text, category);
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
  const inferred = inferredOptionProfile(option, category, question);
  if (inferred) return inferred;
  const fallbackByCategory = {
    food: { features: [`${option}만의 맛 포인트`, "한 입 먹었을 때 바로 오는 반응", "오늘 입맛에 따라 만족도가 달라짐", "같이 먹는 사람이나 컨디션 영향을 받음"], caution: "속 상태와 자극 정도는 한 번 보고 고르는 게 좋아요.", vibe: "한 끼 만족" },
    childcare: { features: [`${option}에서 생기는 아이 반응`, "보호자가 봐야 하는 안전 변수", "아이 체력 소모", "돌아오는 길 컨디션"], caution: "아이가 지치기 전에 나올 수 있는지가 중요해요.", vibe: "아이 리듬" },
    gift: { features: [`${option}를 받는 순간의 첫 반응`, "며칠 뒤에도 다시 찾을 가능성", "같이 놀아주기 쉬운 정도", "이미 비슷한 게 있는지"], caution: "첫 리액션과 오래 쓰는 재미를 같이 봐야 해요.", vibe: "선물 반응" },
    place: { features: [`${option}의 분위기`, "이동 거리", "사람 많은 정도", "끝나고 남는 피로감"], caution: "동선과 머무는 시간을 짧게 잡는 게 좋아요.", vibe: "장소감" },
    shopping: { features: [`${option}을 샀을 때 바로 쓰는 장면`, "가격 부담", "실제로 자주 쓸 가능성", "나중에 후회할 가능성"], caution: "지금 갖고 싶은 마음과 실제 사용 빈도를 따로 봐야 해요.", vibe: "구매 판단" },
    beverage: { features: [`${option}를 마시는 첫 느낌`, "온도에 따라 달라지는 컨디션", "갈증이나 속 상태와 맞는지", "마시고 난 뒤 남는 깔끔함"], caution: "지금 몸이 더운지, 속이 비었는지 먼저 보면 좋아요.", vibe: "커피 선택" },
    drink: { features: [`${option} 선택 후 바로 풀리는 기분`, "내일 아침 컨디션 변수", "자리 분위기에 휩쓸릴 가능성", "한 잔만 하겠다는 약속의 수상함"], caution: "내일 일정과 지금 피로도를 먼저 봐야 해요.", vibe: "한 잔의 유혹" },
    hygiene: { features: [`${option} 후 몸이 개운해지는 점`, "찝찝함을 털어내는 점", "잠들기 전 마음이 가벼워지는 점", "시작 전 귀찮음이 큰 점"], caution: "전부 다 하려다 미루지 말고 짧게라도 끝내는 게 좋아요.", vibe: "개운함" },
    study: { features: [`${option}로 진도를 조금이라도 당기는 점`, "마감이나 시험 부담을 줄이는 점", "시작 전 저항감", "끝나고 마음이 덜 쫓기는 점"], caution: "오래 하겠다고 잡으면 시작이 어려우니 작게 끊는 게 좋아요.", vibe: "진도" },
    game: { features: [`${option}로 스트레스를 빨리 푸는 점`, "한 판의 재미", "시간이 빨리 사라지는 점", "끝낼 타이밍이 흔들리는 점"], caution: "시작 전에 종료 시간을 정해두면 내일의 내가 덜 째려봐요.", vibe: "한 판" },
    travel: { features: [`${option}로 일상에서 잠깐 빠져나오는 점`, "사진과 추억이 남는 점", "비용과 동선 부담", "체력 소모"], caution: "설렘과 예산을 같이 놓고 보는 게 좋아요.", vibe: "탈출" },
    daily: { features: [`${option}을 골랐을 때 달라지는 장면`, "하고 난 뒤의 마음", "미뤘을 때 남는 찝찝함", "오늘 감당 가능한 정도"], caution: "한 번에 크게 결정하기보다 작게 해보는 게 좋아요.", vibe: "일상 선택" }
  };
  const fallback = fallbackByCategory[category] || fallbackByCategory.daily;
  return { name: option, category, features: fallback.features, caution: fallback.caution, vibe: fallback.vibe };
}

function optionIntent(option) {
  const text = String(option).replace(/\s/g, "").toLowerCase();
  if (includesAny(text, ["만다", "그냥", "그대로", "유지", "안간", "안한다", "안판다", "안바꾼", "안바꾸", "안마신", "안마셔", "마시지마", "말자", "보류", "쉬", "쉰", "기다", "관망", "패스", "보유", "홀딩", "버틴", "버티", "참", "더쓴", "그냥쓴"])) return "skip";
  if (includesAny(text, ["간다", "가기", "간", "한다", "먹", "마신", "마셔", "산다", "살래", "바꾼", "바꾸", "교체", "매수", "매도", "판다", "연락", "고백", "출근"])) return "go";
  return "specific";
}

function giftTarget(question) {
  const text = String(question).toLowerCase();
  const targets = [
    { keys: ["아들", "아들한테", "아들 선물"], name: "아들" },
    { keys: ["딸", "딸한테", "딸 선물"], name: "딸" },
    { keys: ["아이", "아기", "애기", "어린이"], name: "아이" },
    { keys: ["조카"], name: "조카" },
    { keys: ["남편"], name: "남편" },
    { keys: ["아내", "와이프"], name: "아내" },
    { keys: ["여자친구", "여친"], name: "여자친구" },
    { keys: ["남자친구", "남친"], name: "남자친구" },
    { keys: ["친구"], name: "친구" },
    { keys: ["부모님", "엄마", "아빠"], name: "부모님" }
  ];
  const found = targets.find((target) => includesAny(text, target.keys));
  return found ? found.name : "받는 사람";
}

function giftScenario(question) {
  const text = String(question).toLowerCase();
  if (!includesAny(text, ["선물", "생일", "어린이날", "크리스마스", "사줄까", "사줘", "장난감"])) return null;
  const target = giftTarget(question);
  const occasion = includesAny(text, ["생일"]) ? "생일 선물" :
    includesAny(text, ["어린이날"]) ? "어린이날 선물" :
    includesAny(text, ["크리스마스"]) ? "크리스마스 선물" :
    "선물";
  return {
    name: `${target} ${occasion}`,
    target,
    category: "gift",
    features: [`${target}가 받자마자 보일 첫 반응`, "며칠 뒤에도 다시 꺼낼 가능성", "부모가 같이 놀아주기 쉬운지", "집에 이미 비슷한 게 있는지"],
    caution: "첫날 리액션만 보지 말고 오래 가지고 놀지도 같이 봐야 해요.",
    vibe: "선물 리액션"
  };
}

function contextualGiftFeatures(base, scenario) {
  const target = scenario.target || "받는 사람";
  const targetSubject = withParticle(target, "이", "가");
  const features = base.features || [];
  return {
    features: [
      features[0] ? `${targetSubject} ${features[0]}` : `${targetSubject} 받자마자 반응하기 쉬운 점`,
      features[1] || "며칠 뒤에도 다시 꺼내 놀 가능성",
      features[2] || "처음 뜯는 순간의 표정",
      features[3] || "집에 이미 비슷한 게 있으면 반응이 약해질 수 있는 점"
    ],
    caution: base.caution || scenario.caution,
    vibe: base.vibe || scenario.vibe
  };
}

function contextZodiacClosing(category, signName, winner, loser, featureA, featureB) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const safeFeatureA = escapeHtml(featureA);
  const safeFeatureB = escapeHtml(featureB);
  if (category === "gift") {
    const target = escapeHtml(winner.targetName || "받는 사람");
    const targetSubject = withParticle(winner.targetName || "받는 사람", "이", "가");
    const winnerSubject = withParticle(winner.name, "은", "는");
    const lines = {
      "황소자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 황소자리는 첫날 난리보다 한 달 뒤에도 바닥에서 굴러다니는 선물을 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${targetSubject} 오래 손댈 가능성에 점수가 붙었습니다.`,
      "양자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 양자리는 포장 뜯는 순간의 "우와!"를 먼저 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${target}의 첫 반응을 더 크게 만들 수 있어요.`,
      "쌍둥이자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 쌍둥이자리는 선물 하나로 이야깃거리가 얼마나 생기는지를 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${targetSubject} 혼자 중얼거리며 놀 그림이 더 잘 나옵니다.`,
      "게자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 게자리는 선물보다 ${target}의 표정을 먼저 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 받는 순간 마음이 더 따뜻해질 가능성이 있어요.`,
      "사자자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 사자자리는 선물 뜯는 장면의 리액션을 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${targetSubject} 주인공처럼 좋아할 그림이 더 큽니다.`,
      "처녀자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 처녀자리는 "받고 끝"이 아니라 얼마나 자주 쓰일지까지 계산합니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 선물 효율표에서 조금 앞섭니다.`,
      "천칭자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 천칭자리는 반응과 실용성 사이의 균형을 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${loserName}보다 선물 그림이 덜 어색합니다.`,
      "전갈자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 전갈자리는 "진짜 꽂힐까?"를 깊게 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${targetSubject} 몰입해서 파고들 가능성이 더 있어요.`,
      "사수자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 사수자리는 선물에서 작은 모험을 찾습니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${targetSubject} 새 놀이를 시작하기 좋아 보입니다.`,
      "염소자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 염소자리는 가격보다 오래 쓰는지를 먼저 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 "사주고 끝"보다 오래 남는 쪽에 가깝습니다.`,
      "물병자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 물병자리는 뻔한 선물보다 다르게 노는 그림을 좋아합니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${targetSubject} 자기 방식으로 가지고 놀 여지가 더 있습니다.`,
      "물고기자리": `그래서 ${winnerName} 쪽으로 기울었습니다. 물고기자리는 선물 받은 뒤의 표정과 여운을 봅니다. ${winnerSubject} ${safeFeatureA}, ${safeFeatureB} 쪽이라 ${target} 마음에 더 오래 남을 수 있어요.`
    };
    return lines[signName] || lines["황소자리"];
  }
  return null;
}

function findScenario(question, category) {
  const text = String(question).toLowerCase();
  if (category === "gift") return giftScenario(question);
  const match = findFeatureEntry(text, category);
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
  const highValue = category === "shopping" ? highValuePurchaseProfile(scenarioName) : null;
  if (highValue) {
    return {
      name: option,
      category,
      subjectName: highValue.label,
      intent: "skip",
      features: [
        `${highValue.label} 구매를 미뤄서 큰돈 나가는 타이밍을 늦추는 점`,
        "신제품이나 할인 타이밍을 한 번 더 볼 수 있는 점",
        "지름신이 시끄러울 때 바로 결제하지 않는 점",
        `대신 ${highValue.label}를 쓸 때마다 답답함이 다시 올라올 수 있는 점`
      ],
      caution: `${highValue.label}가 이미 고장, 렉, 배터리, 더위처럼 매일 불편을 만들고 있다면 버티는 쪽도 오래 편하진 않아요.`,
      vibe: `${highValue.label} 버티기`
    };
  }
  if (category === "shopping" && includesAny(String(scenarioName).toLowerCase(), ["tv", "티비", "텔레비전", "테레비"])) {
    return {
      name: option,
      category,
      subjectName: scenarioName,
      intent: "skip",
      features: ["TV 교체를 미뤄서 예산을 지키는 점", "지금 쓰는 시청환경을 유지하는 점", "설치와 배송 고민이 사라지는 점", "대신 화질이나 화면 크기 아쉬움이 남는 점"],
      caution: "화질이 너무 답답하거나 화면 크기가 계속 거슬리면 미루는 쪽도 오래 편하진 않을 수 있어요.",
      vibe: "TV 유지"
    };
  }
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
    hygiene: {
      features: [`${scenarioName}를 미뤄서 당장 귀찮음이 줄어드는 점`, "물 틀고 움직이는 과정을 피하는 점", "시간을 조금 아끼는 점", "대신 찝찝함과 수면 전 개운함을 놓치는 점"],
      caution: `너무 피곤해도 ${scenarioName}는 짧게 끝내면 생각보다 몸이 빨리 가벼워질 수 있어요.`,
      vibe: "귀찮음 방어"
    },
    exercise: {
      features: [`${scenarioName}를 미뤄서 오늘 체력을 아끼는 점`, "소파와 타협하기 쉬운 점", "회복 시간을 확보하는 점", "대신 뿌듯함은 내일로 넘어가는 점"],
      caution: `몸이 아픈 게 아니라면 ${scenarioName}를 10분만 해도 기분이 꽤 바뀔 수 있어요.`,
      vibe: "운동 보류"
    },
    relationship: {
      features: [`${scenarioName}를 미뤄서 당장 부담을 피하는 점`, "상대 반응을 기다리지 않아도 되는 점", "말실수 위험을 줄이는 점", "대신 궁금함이 계속 남는 점"],
      caution: `계속 신경 쓰이는 일이라면 ${scenarioName}를 너무 미루는 게 더 피곤할 수 있어요.`,
      vibe: "답장 보류"
    },
    study: {
      features: [`${scenarioName}를 미뤄서 지금 피로를 줄이는 점`, "책상 앞 저항감을 피하는 점", "당장은 마음이 편한 점", "대신 마감이나 시험 부담이 뒤로 쌓이는 점"],
      caution: `전부 하려 하지 말고 ${scenarioName}를 20분만 잡으면 죄책감이 꽤 줄어요.`,
      vibe: "진도 보류"
    },
    game: {
      features: [`${scenarioName}를 안 해서 시간을 지키는 점`, "내일 컨디션을 보호하는 점", "한 판이 세 판 되는 사고를 막는 점", "대신 오늘 스트레스 해소감은 줄어드는 점"],
      caution: `정말 하고 싶다면 ${scenarioName}는 종료 시간을 정하고 시작하는 게 좋아요.`,
      vibe: "시간 방어"
    },
    travel: {
      features: [`${scenarioName}를 미뤄서 비용과 체력을 아끼는 점`, "동선 계산을 오늘 안 해도 되는 점", "일정을 덜 복잡하게 만드는 점", "대신 기분 전환의 장면은 줄어드는 점"],
      caution: `답답함이 오래 쌓였다면 ${scenarioName}를 계속 미루는 것도 마음에 먼지가 쌓여요.`,
      vibe: "예산 방어"
    },
    shopping: {
      features: [`${scenarioName}를 미뤄서 통장을 지키는 점`, "충동 결제를 줄이는 점", "배송 기다림이 사라지는 점", "대신 계속 생각날 수 있는 점"],
      caution: `하루 뒤에도 ${scenarioName}가 계속 생각나면 그때 다시 봐도 늦지 않아요.`,
      vibe: "통장 방어"
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
  const base = analyzeOption(option, category, question);
  if (category === "money" && base.category === "money") {
    return { ...base, subjectName: base.name, intent };
  }
  if (category === "gift" && scenario) {
    const gift = contextualGiftFeatures(base, scenario);
    return {
      ...base,
      category: "gift",
      subjectName: scenario.name,
      targetName: scenario.target,
      intent,
      features: gift.features,
      caution: gift.caution,
      vibe: gift.vibe
    };
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
    food: (winner) => `양자리는 음식 앞에서 오래 상담받는 타입이 아닙니다. 오늘은 ${escapeHtml(winner.name)}처럼 한 번에 기분을 확 올리는 쪽이 더 양자리답습니다.`,
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
  const displayName = analysis.subjectName && analysis.subjectName !== analysis.name ? analysis.subjectName : analysis.name;
  const features = analysis.features.filter(Boolean).slice(0, 2).map(escapeHtml);
  if (features.length >= 2) return `${escapeHtml(displayName)}에는 ${features[0]}, ${features[1]}이 확실히 있어요.`;
  if (features.length === 1) return `${escapeHtml(displayName)}에는 ${features[0]}이 눈에 띕니다.`;
  return `${escapeHtml(displayName)}만의 장점이 오늘 선택에 들어왔어요.`;
}

function featureSubjectText(featureA, featureB) {
  const first = escapeHtml(featureA || "오늘의 장점");
  const second = featureB || "선택 후 느낌";
  return `${first}, ${withParticle(second, "이", "가")}`;
}

function optionDisplayName(analysis, category) {
  return analysis.subjectName && analysis.subjectName !== analysis.name
    ? scenarioActionText(analysis.subjectName, analysis.name, category, analysis.intent)
    : analysis.name;
}

function cleanPlayTone(text) {
  return String(text || "")
    .replaceAll("컨디션", "몸 상태")
    .replaceAll("분위기", "공기")
    .replaceAll("선명합니다", "또렷합니다")
    .replaceAll("선명해", "또렷해")
    .replaceAll("선명한", "또렷한")
    .replaceAll("선명하고", "또렷하고")
    .replaceAll("자연스럽게", "슬쩍")
    .replaceAll("자연스럽다", "괜찮다")
    .replaceAll("자연스럽습니다", "괜찮습니다")
    .replaceAll("설명이 됩니다", "말이 됩니다")
    .replaceAll("설명 가능한", "말 되는")
    .replaceAll("설명 가능", "말 됨")
    .replaceAll("납득됩니다", "고개가 끄덕여집니다")
    .replaceAll("납득되는", "고개 끄덕이는")
    .replaceAll("납득", "고개 끄덕")
    .replaceAll("그 장면", "그 순간")
    .replaceAll("그런 장면", "그런 순간")
    .replaceAll("오늘 장면", "오늘 순간")
    .replaceAll("그림", "느낌")
    .replaceAll("회의실", "대기실")
    .replaceAll("머릿속 회의", "속마음 수다")
    .replaceAll("선택장애", "결정 고민")
    .replaceAll("선택 기록", "선택 흔적")
    .replaceAll("휴전", "잠깐 악수");
}

function foodSceneOpening(winner, loser, question) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const raw = `${question} ${winner.name} ${loser.name}`.toLowerCase();
  const winnerText = `${winner.name} ${winner.features.join(" ")}`.toLowerCase();
  if (includesAny(raw, ["김밥"]) && includesAny(raw, ["라면"])) {
    return includesAny(winnerText, ["김밥"])
      ? "라면 냄비가 보글거리는데도, 손은 이미 김밥 꼬다리 하나 집고 있습니다."
      : "김밥 꼬다리도 좋지만, 오늘은 라면 냄새가 방 문틈을 먼저 뚫고 들어왔습니다.";
  }
  if (includesAny(raw, ["짜장"]) && includesAny(raw, ["짬뽕"])) {
    return includesAny(winnerText, ["짜장"])
      ? "짬뽕 국물도 손짓하지만, 오늘 젓가락은 춘장 묻은 면을 먼저 끌어올립니다."
      : "짜장 소스도 묵직한데, 오늘은 짬뽕 국물 한 숟갈에 이마가 살짝 풀리는 쪽입니다.";
  }
  if (includesAny(raw, ["김치찌개"]) && includesAny(raw, ["된장찌개"])) {
    return includesAny(winnerText, ["김치찌개"])
      ? "냄비 뚜껑 열리는 순간 김치찌개 냄새가 먼저 나옵니다. 밥은 이미 옆에서 대기 중입니다."
      : "김치찌개도 세게 부르지만, 오늘은 된장찌개 첫 숟갈에 어깨가 조용히 내려갑니다.";
  }
  if (includesAny(raw, ["제육"]) && includesAny(raw, ["돈까스"])) {
    return includesAny(winnerText, ["제육"])
      ? "돈까스 바삭 소리도 센데, 오늘은 제육 첫 쌈 싸는 순간 후회할 시간이 사라집니다."
      : "제육 양념도 밥을 부르지만, 오늘은 돈까스 자르는 소리에서 이미 마음이 흔들렸습니다.";
  }
  if (includesAny(raw, ["콩국수"]) && includesAny(raw, ["라면"])) {
    return includesAny(winnerText, ["콩국수"])
      ? "라면 냄새가 익숙하게 부르지만, 오늘 젓가락은 차가운 콩국수 그릇에 먼저 닿습니다."
      : "콩국수 그릇은 시원한 척하지만, 오늘은 라면 국물 첫 숟갈이 더 크게 들어옵니다.";
  }
  if (includesAny(raw, ["치킨"]) && includesAny(raw, ["삼겹살"])) {
    return includesAny(winnerText, ["삼겹살", "고기"])
      ? "치킨 상자도 설레지만, 오늘은 삼겹살 뒤집는 소리에서 이미 졌습니다."
      : "삼겹살 불판도 센데, 오늘은 치킨 상자 열 때 나는 김이 먼저 이깁니다.";
  }
  if (includesAny(raw, ["소고기"]) && includesAny(raw, ["집밥"])) {
    return includesAny(winnerText, ["집밥"])
      ? "소고기 굽는 냄새도 무섭지만, 오늘은 집밥 첫 숟갈에 어깨가 내려가는 쪽입니다."
      : "집밥은 조용히 붙잡지만, 오늘은 소고기 굽는 냄새가 이미 문 앞까지 왔습니다.";
  }
  if (includesAny(winnerText, ["차갑", "냉면", "콩국수"])) {
    return `${loserName}도 끌리지만, 오늘은 ${winnerName} 첫 젓가락에 입안이 차갑게 정리되는 쪽입니다.`;
  }
  if (includesAny(winnerText, ["매콤", "얼큰", "떡볶이", "짬뽕", "김치"])) {
    return `${loserName}도 좋지만, 오늘은 ${winnerName} 냄새 맡는 순간 침이 먼저 나오는 쪽입니다.`;
  }
  if (includesAny(winnerText, ["깔끔", "담백", "집밥", "초밥", "김밥"])) {
    return `${loserName}의 유혹도 있지만, 오늘은 ${winnerName} 한 입 먹고 바로 고개 끄덕이는 쪽입니다.`;
  }
  if (includesAny(winnerText, ["불판", "고기", "푸짐", "치즈", "튀김", "바삭"])) {
    return `${withParticle(winner.name, "은", "는")} 첫입 전에 이미 소리가 납니다. 오늘은 그 바삭함과 냄새가 ${loserName}보다 먼저 들어왔습니다.`;
  }
  const pool = [
    `${loserName}도 괜찮은데, 오늘은 ${winnerName} 먹고 나서 "그래 이거였네" 할 확률이 높습니다.`,
    `${winnerName} 쪽은 먹고 난 뒤 표정이 덜 복잡합니다. ${loserName}은 다음 끼니 후보로 남겨둡시다.`,
    `오늘은 ${winnerName} 먹고 나서 후회보다 만족 핑계가 먼저 나올 그림입니다.`,
    `${winnerName} 쪽은 계산할수록 배고파집니다. 그냥 고르면 마음이 빨리 조용해질 타입입니다.`,
    `메뉴판 앞에서 오래 서 있으면 더 힘듭니다. 오늘은 ${winnerName}으로 끝내도 욕 덜 먹을 날입니다.`
  ];
  return pick(pool, hashText(`${question}-${winner.name}-${loser.name}-food-scene`));
}

function foodCharacterLines(foodName) {
  const name = String(foodName || "").toLowerCase();
  const bank = [
    { keys: ["짜장"], lines: [
      "짜장면은 시끄럽게 등장하지 않습니다. 젓가락에 소스 묻는 순간 조용히 이깁니다.",
      "짜장면은 토론을 싫어합니다. 비비는 순간 이미 결론이 났습니다.",
      "짜장면은 단무지 옆에 앉아 있다가, 첫 젓가락에서 본색을 드러냅니다.",
      "짜장면은 배고픈 사람을 설득하지 않습니다. 그냥 입가에 소스를 남깁니다."
    ], future: [
      "입가에 소스 묻고도 만족한 척할 예정입니다.",
      "단무지 하나 더 집는 순간 이미 성공입니다.",
      "비빈 그릇 바닥까지 확인할 가능성이 있습니다."
    ] },
    { keys: ["짬뽕"], lines: [
      "짬뽕은 입장부터 시끄럽습니다. 국물 한 숟갈에 토론이 끝납니다.",
      "짬뽕은 조용히 못 들어옵니다. 냄새부터 먼저 문을 엽니다.",
      "짬뽕은 젓가락보다 숟가락을 먼저 부릅니다. 이건 꽤 강한 신호입니다.",
      "짬뽕은 먹기 전엔 고민이고, 한 숟갈 뒤엔 땀이 대답합니다."
    ], future: [
      "국물 한 숟갈 뒤에 이마가 먼저 대답합니다.",
      "물컵이 옆에서 대기 타기 시작합니다.",
      "땀 살짝 나고 나서야 조용해질 예정입니다."
    ] },
    { keys: ["김치찌개"], lines: [
      "김치찌개는 냄비 뚜껑 열리는 순간 이미 승부를 걸었습니다.",
      "김치찌개는 밥을 혼자 두지 않습니다. 첫 숟갈부터 바로 데려갑니다.",
      "김치찌개는 식탁에 앉기 전부터 냄새로 출석 체크를 합니다.",
      "김치찌개는 반찬 많은 척 안 합니다. 밥 한 공기만 데려오면 됩니다."
    ], future: [
      "밥 한 공기 추가를 고민하는 미래가 보입니다.",
      "국물에 숟가락 담그고 말수가 줄어듭니다.",
      "냄비 바닥 보는 순간까지 갈 수 있습니다."
    ] },
    { keys: ["된장찌개"], lines: [
      "된장찌개는 큰소리 안 내고 숟가락을 붙잡는 타입입니다.",
      "된장찌개는 첫 숟갈에 어깨가 내려갑니다. 요란하진 않은데 세요.",
      "된장찌개는 화려한 척 안 합니다. 밥 위에 얹는 순간 끝납니다.",
      "된장찌개는 조용히 이기는 음식입니다. 먹고 나서야 힘을 압니다."
    ], future: [
      "숟가락이 냄비 쪽으로 한 번 더 갑니다.",
      "먹고 나서 괜히 집 생각날 수 있습니다.",
      "조용히 배가 편해지는 쪽입니다."
    ] },
    { keys: ["제육"], lines: [
      "제육은 첫 쌈 싸는 순간 후회할 시간을 없앱니다.",
      "제육은 밥 위에 양념 묻는 순간 이미 판이 기웁니다.",
      "제육은 조용한 음식이 아닙니다. 상추가 먼저 긴장합니다.",
      "제육은 한입 넣고 나서야 물컵 위치를 확인하게 만듭니다."
    ], future: [
      "쌈 하나 더 싸는 손이 이미 보입니다.",
      "밥 한 숟갈이 갑자기 바빠집니다.",
      "상추가 생각보다 빨리 사라질 수 있습니다."
    ] },
    { keys: ["돈까스"], lines: [
      "돈까스는 자르는 소리부터 이미 반칙입니다.",
      "돈까스는 첫 칼질에서 마음을 흔듭니다. 바삭 소리는 꽤 설득력 있습니다.",
      "돈까스는 소스 찍는 순간 후퇴가 어렵습니다.",
      "돈까스는 한 조각만 먹어도 다음 조각 위치를 보게 만듭니다."
    ], future: [
      "바삭 소리 한 번에 표정이 풀릴 수 있습니다.",
      "소스 한 번 더 찍는 미래가 보입니다.",
      "마지막 조각을 누가 먹을지 이미 중요해졌습니다."
    ] },
    { keys: ["라면"], lines: [
      "라면은 물 올리는 순간 이미 마음을 반쯤 가져갑니다.",
      "라면은 냄비 앞에서 기다리는 시간이 제일 위험합니다.",
      "라면은 봉지 뜯는 순간부터 이미 판을 키웁니다.",
      "라면은 '간단히'라는 말로 시작해서 국물까지 보게 만듭니다.",
      "라면 고르면 국물까지 마실 확률이 높습니다. 내일 붓기는 일단 모르는 척합니다."
    ], future: [
      "냄비 앞에서 괜히 타이머를 한 번 더 봅니다.",
      "먹고 나면 말이 줄어듭니다.",
      "먹고 나서 물 찾는 미래까지 보입니다."
    ] },
    { keys: ["김밥"], lines: [
      "김밥은 꼬다리 하나로 승부를 시작합니다.",
      "김밥은 포장지만 열면 고민이 갑자기 작아지는 타입입니다.",
      "김밥은 한 줄만 먹자고 해놓고 두 개 더 집게 만듭니다.",
      "김밥은 조용한데 손이 계속 갑니다. 이게 무섭습니다.",
      "김밥 고르면 먹고 나서도 죄책감이 덜 남습니다. 배도 크게 항의하지 않습니다."
    ], future: [
      "꼬다리 먼저 먹고 이미 이긴 표정입니다.",
      "한 줄 끝이 생각보다 빨리 옵니다.",
      "단무지랑 같이 가면 속도가 붙습니다."
    ] },
    { keys: ["순대국", "순댓국"], lines: [
      "순대국은 말이 길어지기 전에 숟가락부터 들어가는 쪽입니다. 혼자 가도 어색하지 않고, 뜨끈하게 빨리 정리됩니다.",
      "순대국은 편하게 앉아서 한 그릇 비우는 음식입니다. 깍두기 하나 올리면 고민이 갑자기 작아집니다.",
      "순대국은 해장도 되고 식사도 되는 중간 지점입니다. 요란하진 않은데 먹고 나면 몸이 조용히 고개를 끄덕입니다.",
      "순대국은 오래 뜯고 싸우는 음식이 아닙니다. 국물 한 숟갈, 밥 한 번 말고, 빠르게 살아나는 쪽입니다."
    ], future: [
      "깍두기 한 번 더 집는 순간 이미 만족 쪽입니다.",
      "혼밥이어도 별로 외롭지 않은 한 그릇입니다.",
      "먹고 나서 몸이 조용히 데워질 수 있습니다.",
      "국물까지 보면 오늘은 꽤 잘 끝난 겁니다."
    ] },
    { keys: ["뼈해장국", "뼈 해장국"], lines: [
      "뼈해장국은 빨리 끝낼 생각으로 들어가면 안 됩니다. 뼈 하나 잡는 순간 식사가 아니라 작업이 시작됩니다.",
      "뼈해장국은 뜯는 재미가 있습니다. 국물도 국물인데, 결국 손이 바빠지는 쪽입니다.",
      "뼈해장국은 푸짐하게 앉아서 오래 먹는 음식입니다. 순대국보다 한 단계 더 큰 결심이 필요합니다.",
      "뼈해장국은 해장이라는 이름으로 들어와서 뼈 뜯는 재미까지 챙겨갑니다. 급한 식사보단 제대로 먹는 쪽입니다."
    ], future: [
      "뼈 하나 더 집다가 시간이 슬쩍 사라집니다.",
      "먹고 나면 손은 바빴고 배는 조용해질 겁니다.",
      "국물보다 뼈 뜯은 기억이 더 오래 남을 수 있습니다.",
      "급하게 먹긴 글렀고, 대신 든든함은 남습니다."
    ] },
    { keys: ["햄버거", "버거"], lines: [
      "햄버거는 생각보다 행동이 먼저 나오는 음식입니다. 포장지 열면 이미 늦었습니다.",
      "햄버거는 포장지 안에서 결론을 냅니다. 소스 삐져나오면 더 이상 회의 없습니다.",
      "햄버거는 양손을 쓰게 만드는 순간 이깁니다.",
      "햄버거는 감튀 하나 집는 순간 팀플레이가 시작됩니다.",
      "햄버거는 먹는 동안 말이 짧아집니다. 휴지는 옆에 두는 게 예의입니다."
    ], future: [
      "소스 묻은 손가락을 보고도 웃을 수 있습니다.",
      "감튀를 하나만 먹는 미래는 거의 없습니다.",
      "포장지 접는 순간 배가 조용해질 겁니다."
    ] },
    { keys: ["피자"], lines: [
      "피자는 혼자보다 같이 있을 때 강합니다. 한 조각만 먹겠다는 사람을 잘 못 봤습니다.",
      "피자는 박스 열리는 순간 방 안 공기를 바꿉니다.",
      "피자는 치즈 늘어나는 순간 말보다 사진이 먼저 나옵니다.",
      "피자는 첫 조각보다 두 번째 조각에서 진심이 나옵니다.",
      "피자는 남으면 내일도 핑계가 생깁니다. 이게 은근히 큰 장점입니다."
    ], future: [
      "한 조각만 먹겠다는 약속이 흔들립니다.",
      "치즈 늘어나는 순간 대화가 잠깐 멈춥니다.",
      "박스 닫기 전에 한 조각 더 볼 수 있습니다."
    ] },
    { keys: ["집밥"], lines: [
      "집밥은 화려하진 않지만 밤 11시에 생각나는 쪽입니다.",
      "집밥은 첫 숟갈에 밖에서 힘 준 어깨를 내려놓게 합니다.",
      "집밥은 사진은 안 찍어도 끝까지 먹게 되는 타입입니다.",
      "집밥은 조용한데 오래 갑니다. 먹고 나면 괜히 덜 피곤합니다."
    ], future: [
      "먹고 나서 괜히 편해질 수 있습니다.",
      "숟가락 내려놓고 바로 눕고 싶어집니다.",
      "화려하진 않아도 배가 조용해집니다."
    ] },
    { keys: ["배달"], lines: [
      "배달은 문 열고 냄새 들어오는 순간 절반은 끝난 게임입니다.",
      "배달은 기다리는 동안 배고픔을 키우는 재능이 있습니다.",
      "배달은 봉투 뜯는 소리부터 이미 이벤트입니다.",
      "배달은 설거지 안 해도 된다는 말로 마음을 흔듭니다."
    ], future: [
      "초인종 울리는 순간 표정이 달라질 겁니다.",
      "봉투 뜯는 손이 제일 빠릅니다.",
      "리뷰 쓰기 전에 이미 젓가락 들고 있습니다."
    ] }
    ,
    { keys: ["곱창"], lines: [
      "곱창에 소주는 한 잔이 두 잔 되는 위험구역입니다.",
      "곱창은 끝났다고 생각한 순간 볶음밥이 뒤에서 걸어 나옵니다.",
      "곱창은 자리 분위기를 빨리 올립니다. 대신 내일 속이 항의서를 낼 수 있습니다.",
      "곱창은 추가 주문 버튼을 너무 자연스럽게 누르게 만듭니다."
    ], future: [
      "볶음밥까지 가면 오늘은 이미 연장전입니다.",
      "소주잔이 혼자 늘어난 척할 수 있습니다.",
      "내일 속이 오늘의 결정을 기억할 예정입니다."
    ] },
    { keys: ["삼겹살"], lines: [
      "삼겹살에 소주는 불판 앞에서 대화가 알아서 굴러갑니다.",
      "삼겹살은 먹고 집 가자는 말이 비교적 빨리 나오는 타입입니다.",
      "삼겹살은 굽는 사람이 생기는 순간 작은 리더십 테스트가 시작됩니다.",
      "삼겹살은 쌈 하나 싸는 동안 오늘 얘기가 조금 정리됩니다."
    ], future: [
      "집에 가서 옷 냄새 맡고 오늘을 다시 떠올립니다.",
      "마지막 한 점 양보 게임이 시작될 수 있습니다.",
      "쌈장 뚜껑 닫는 순간 하루가 정리됩니다."
    ] }
  ];
  return bank.find((item) => item.keys.some((key) => name.includes(key))) || null;
}

function optionCharacterLine(entry, optionName, question, salt = "") {
  if (!entry || !entry.lines || !entry.lines.length) return null;
  return pick(entry.lines, hashText(`${question}-${optionName}-${salt}-character-line`));
}

function zodiacSceneTone(sign) {
  const name = Array.isArray(sign) ? sign[0] : String(sign || "황소자리");
  const bank = {
    "양자리": {
      food: ["양자리는 오래 재지 않습니다. 배보다 손이 먼저 움직이는 날입니다.", "일단 먹고 생각하자는 쪽입니다. 오늘은 메뉴판보다 주문 버튼이 빠릅니다.", "고민이 길어지기 전에 이미 앞접시가 준비됐습니다."],
      travel: ["양자리는 일단 나가고 봅니다. 계획은 길 위에서 대충 맞추는 쪽입니다.", "가만히 앉아서 비교하기보다 발이 먼저 움직이는 날입니다.", "생각보다 출발이 빠릅니다. 티켓보다 몸이 먼저 반응합니다."],
      shopping: ["양자리는 손가락이 결제 버튼 근처까지 먼저 갑니다.", "생각은 아직인데 이미 상세 페이지를 세 번 봤습니다.", "일단 질러보고 이유는 나중에 찾으려는 기운이 있습니다."],
      default: ["양자리는 결론보다 출발이 빠릅니다.", "오늘은 몸이 먼저 움직이고 머리가 뒤따라오는 날입니다.", "가만히 있으면 답답해서 결국 한쪽을 누르게 됩니다."]
    },
    "황소자리": {
      food: ["황소자리는 편하게 앉아서 맛있는 쪽에 오래 머뭅니다.", "오늘은 굳이 복잡하게 가기보다 먹고 나서 몸이 덜 투덜대는 쪽입니다.", "배부르고 편하면 이미 절반은 이긴 날입니다."],
      travel: ["황소자리는 여행도 결국 몸이 편해야 오래 웃습니다.", "오늘은 새 모험보다 돌아와서도 덜 지치는 그림을 먼저 봅니다.", "편한 동선과 확실한 만족이 같이 오는 쪽에 마음이 갑니다."],
      shopping: ["황소자리는 사고 나서 오래 편하게 쓸 물건인지 먼저 봅니다.", "굳이? 라고 하다가도 생활이 편해지면 바로 설득됩니다.", "오늘은 화려한 지름보다 실속 있는 만족에 점수가 붙습니다."],
      default: ["황소자리는 편한 게 최고라는 표정입니다.", "오늘은 몸이 덜 귀찮아하는 쪽이 꽤 강합니다.", "새로운 척보다 오래 편한 쪽에 마음이 눕습니다."]
    },
    "쌍둥이자리": {
      food: ["쌍둥이자리는 먹으면서 할 말이 생기는 쪽을 좋아합니다.", "찬성도 나고 반대도 나지만, 결국 더 떠들 거리 있는 쪽으로 갑니다.", "메뉴 하나 고르는데 머릿속 채팅방이 너무 시끄럽습니다."],
      travel: ["쌍둥이자리는 돌아와서 할 얘기가 많은 쪽에 약합니다.", "이쪽도 궁금하고 저쪽도 궁금한데, 오늘은 이야깃거리가 더 많은 쪽입니다.", "검색 탭을 여러 개 열어놓고도 결국 더 수다스러운 여행에 끌립니다."],
      shopping: ["쌍둥이자리는 리뷰를 보다가 다른 리뷰까지 다 읽는 타입입니다.", "궁금해서 찾아본 게 이미 반쯤 마음을 흔들었습니다.", "장바구니보다 검색 기록이 먼저 길어지는 날입니다."],
      default: ["쌍둥이자리는 아직도 내부 회의 중입니다.", "잠깐, 이것도 재밌는데? 하는 쪽이 튀어나옵니다.", "찬성 의견도 본인이고 반대 의견도 본인입니다."]
    },
    "게자리": {
      food: ["게자리는 먹고 나서 마음이 편한 쪽을 먼저 봅니다.", "오늘은 입보다 속마음이 덜 서운한 메뉴에 끌립니다.", "누구랑 먹든 끝나고 따뜻하게 남는 쪽이 강합니다."],
      travel: ["게자리는 장소보다 같이 갔을 때의 표정을 먼저 떠올립니다.", "오늘은 돌아와서 마음이 덜 허전한 쪽이 이깁니다.", "사진보다 그날의 기분이 오래 남는 여행에 점수가 붙습니다."],
      shopping: ["게자리는 물건보다 사고 난 뒤 마음이 편한지를 먼저 봅니다.", "괜히 마음 쓰이는 소비면 오래 갑니다. 오늘은 그 찝찝함을 피하는 쪽입니다.", "내가 진짜 좋아할지, 괜히 신경 쓰일지부터 확인하는 날입니다."],
      default: ["게자리는 결과보다 마음의 뒷정리를 먼저 봅니다.", "나중에 마음 쓰이면 그게 답입니다.", "오늘은 덜 미안하고 덜 서운한 쪽이 앞섭니다."]
    },
    "사자자리": {
      food: ["사자자리는 밥도 살짝 주인공처럼 먹고 싶어 합니다.", "오늘은 테이블 위에서 존재감 있는 쪽이 눈에 들어옵니다.", "이왕 먹을 거면 기억에 남는 한 판을 고르는 날입니다."],
      travel: ["사자자리는 여행에서도 오늘의 컷이 멋있어야 합니다.", "나중에 말했을 때 더 폼 나는 쪽이 살짝 앞섭니다.", "오늘은 배경도 중요합니다. 주인공 컷이 사는 쪽입니다."],
      shopping: ["사자자리는 쓰는 순간 티가 나는 물건에 약합니다.", "조용한 만족보다 딱 봐도 기분 올라오는 쪽이 보입니다.", "오늘은 내 기분을 조금 크게 대접하고 싶은 날입니다."],
      default: ["사자자리는 이왕이면 멋있게 가고 싶어 합니다.", "눈치보다가 장면 놓치기 싫은 날입니다.", "오늘은 내가 주인공이라는 쪽에 살짝 힘이 들어갑니다."]
    },
    "처녀자리": {
      food: ["처녀자리는 먹고 난 뒤 정리까지 계산합니다.", "오늘은 배보다 뒤처리가 덜 귀찮은 쪽도 꽤 중요합니다.", "괜히 과하게 먹고 후회하는 루트는 체크리스트에서 빠졌습니다."],
      travel: ["처녀자리는 이동, 비용, 피로를 머릿속에서 이미 줄 세웠습니다.", "오늘은 다녀와서 일정이 덜 꼬이는 쪽에 마음이 갑니다.", "즉흥도 좋지만 준비 없이 피곤해지는 건 싫은 날입니다."],
      shopping: ["처녀자리는 사고 나서 실제로 몇 번 쓸지부터 셉니다.", "리뷰, 가격, 사용 빈도가 머릿속에서 이미 회의 중입니다.", "오늘은 예쁜 말보다 실사용 장면이 더 센 날입니다."],
      default: ["처녀자리는 잠깐 계산 좀 하고 갑니다.", "체크리스트가 조용히 켜졌습니다.", "오차 범위 안이면 가고, 찝찝하면 멈춥니다."]
    },
    "천칭자리": {
      food: ["천칭자리는 맛도 보지만 같이 놓였을 때 그림도 봅니다.", "둘 다 괜찮아서 저울이 흔들렸는데, 오늘 테이블은 이쪽으로 기웁니다.", "오늘은 과하지 않고 보기 좋은 선택이 조금 더 앞섭니다."],
      travel: ["천칭자리는 여행의 분위기와 동선을 같이 봅니다.", "너무 빡세지도 너무 심심하지도 않은 쪽을 찾는 날입니다.", "사진, 기분, 피로가 적당히 맞는 쪽에 저울이 멈춥니다."],
      shopping: ["천칭자리는 필요와 예쁨 사이에서 오래 흔들립니다.", "오늘은 사고 나서 보기에도, 쓰기에도 어색하지 않은 쪽입니다.", "균형이 무너지면 바로 후회가 옵니다. 그래서 이쪽입니다."],
      default: ["천칭자리는 둘 다 괜찮아서 더 어렵습니다.", "저울이 한참 흔들리다 오늘은 이쪽에 멈췄습니다.", "분위기상 이쪽입니다."]
    },
    "전갈자리": {
      food: ["전갈자리는 대충 배만 채우는 걸 싫어합니다.", "오늘은 한 번 꽂히면 끝까지 가는 쪽입니다.", "어중간한 선택보다 먹는 동안 몰입되는 쪽이 셉니다."],
      travel: ["전갈자리는 겉핥기보다 깊게 빠질 수 있는 쪽을 봅니다.", "오늘은 사진 몇 장보다 오래 생각나는 경험 쪽입니다.", "대충 다녀오는 여행보다 마음에 남는 쪽에 힘이 실립니다."],
      shopping: ["전갈자리는 살 거면 제대로 빠질 물건인지 봅니다.", "괜히 애매한 만족은 싫습니다. 오늘은 확실히 꽂히는 쪽입니다.", "한 번 마음에 걸리면 계속 생각나는 쪽이 있습니다."],
      default: ["전갈자리는 그래서 본질이 뭔데? 하고 묻습니다.", "대충은 싫고 끝까지 파보는 날입니다.", "오늘은 애매함보다 확실한 쪽이 이깁니다."]
    },
    "사수자리": {
      food: ["사수자리는 먹는 것도 작은 이벤트처럼 가고 싶어 합니다.", "오늘은 평소처럼 끝내기보다 기분이 움직이는 쪽입니다.", "먹고 나서 얘깃거리 하나 남는 쪽이 더 재밌습니다."],
      travel: ["사수자리는 답답하면 일단 멀어지는 쪽입니다.", "오늘은 피곤해도 경험치가 남는 선택에 끌립니다.", "지도보다 기분이 먼저 펼쳐지는 날입니다."],
      shopping: ["사수자리는 써보고 나서 생길 재미를 먼저 봅니다.", "지금은 안전한 선택보다 새 경험 쪽이 더 크게 보입니다.", "인생 뭐 있어요, 라는 말이 장바구니 옆에서 맴돕니다."],
      default: ["사수자리는 가보자 쪽입니다.", "경험치가 남으면 그걸로 됐다는 표정입니다.", "답답하면 움직이는 쪽이 강합니다."]
    },
    "염소자리": {
      food: ["염소자리는 먹고 나서 하루가 망가지지 않는 쪽을 봅니다.", "오늘은 만족도 좋지만 내일의 리듬도 같이 챙깁니다.", "괜히 과한 선택보다 오래 봐도 괜찮은 쪽입니다."],
      travel: ["염소자리는 다녀온 뒤 일정과 지갑까지 같이 봅니다.", "오늘은 즐거움만큼 돌아온 뒤의 현실도 중요한 날입니다.", "나중에 봐도 잘 골랐다 싶은 쪽으로 기웁니다."],
      shopping: ["염소자리는 사고 난 뒤 오래 남는 값을 봅니다.", "결국 결과입니다. 오늘은 쓴 돈이 변명 가능한 쪽입니다.", "미래의 내가 덜 혼나는 선택이 꽤 세게 올라옵니다."],
      default: ["염소자리는 결국 결과를 봅니다.", "미래의 내가 덜 혼나는 쪽이 강합니다.", "할 건 해야 하고, 남는 건 남아야 합니다."]
    },
    "물병자리": {
      food: ["물병자리는 남들이 다 고르는 답보다 살짝 다른 맛에 끌립니다.", "오늘은 뻔한 결론을 피하고 싶은 기운이 있습니다.", "왜 꼭 평범하게 골라야 하냐는 표정입니다."],
      travel: ["물병자리는 정석 코스보다 내 방식대로 움직이는 여행을 봅니다.", "오늘은 남들이 추천한 곳보다 내가 이상하게 끌리는 쪽입니다.", "계획표보다 반전 있는 하루에 마음이 갑니다."],
      shopping: ["물병자리는 남들과 똑같은 소비보다 내 취향이 보이는 쪽입니다.", "오늘은 기능보다 '이거 좀 나답다'가 먼저 올라옵니다.", "왜 꼭 그걸 사야 하냐고 묻다가, 이상하게 이쪽에 꽂힙니다."],
      default: ["물병자리는 왜 꼭 그래야 하지? 하고 시작합니다.", "남들 다 가는 길은 재미없다는 표정입니다.", "오늘은 살짝 다른 답이 더 살아 있습니다."]
    },
    "물고기자리": {
      food: ["물고기자리는 먹고 난 뒤 기분이 어떻게 남을지 먼저 봅니다.", "오늘은 배보다 마음이 덜 출렁이는 메뉴가 강합니다.", "한 끼가 위로처럼 느껴지는 쪽에 마음이 갑니다."],
      travel: ["물고기자리는 여행지를 고를 때 그날의 기분까지 같이 챙깁니다.", "오늘은 다녀와서 마음에 잔잔하게 남는 쪽입니다.", "사진보다 여운이 오래 갈 선택에 점수가 붙습니다."],
      shopping: ["물고기자리는 물건보다 그걸 쓰는 내 기분을 먼저 상상합니다.", "오늘은 논리보다 마음이 덜 흔들리는 쪽입니다.", "잠들기 전에 괜히 떠오르는 쪽이 답일 수 있습니다."],
      default: ["물고기자리는 마음이 먼저입니다.", "오늘 기분은 이쪽으로 조용히 흐릅니다.", "잠들기 전에 덜 출렁이는 쪽이 강합니다."]
    }
  };
  return bank[name] || bank["황소자리"];
}

function zodiacSceneLine(category, sign, winner, loser, question, seed, salt = "scene") {
  const tone = zodiacSceneTone(sign);
  const pool = tone[category] || tone.default || [];
  if (!pool.length) return "";
  return pick(pool, hashText(`${question}-${winner.name}-${loser.name}-${Array.isArray(sign) ? sign[0] : sign}-${seed}-${category}-${salt}`));
}

function optionSceneVariant(category, winner, loser, question, sign, seed) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const raw = `${question} ${winner.name} ${loser.name}`.toLowerCase();
  const winnerRaw = String(winner.name || "").toLowerCase();
  const pools = [];
  if (category === "food") {
    if (includesAny(winnerRaw, ["회", "사시미"])) pools.push("회는 불판 대신 대화 속도를 늦춥니다.", "초장 뚜껑 열리는 순간 오늘 식사는 조금 차분해집니다.", "회는 배를 꽉 누르기보다 시간을 천천히 잡아주는 쪽입니다.");
    if (includesAny(winnerRaw, ["고기"])) pools.push("고기는 옷에 냄새까지 남기고 가는 선택입니다.", "불판 위에 올라가는 순간 오늘 대화도 같이 익습니다.", "고기는 배만 채우는 게 아니라 자리의 온도까지 올립니다.");
    if (includesAny(winnerRaw, ["삼겹살"])) pools.push("고기 냄새 배는 건 싫은데, 한 점 더 먹는 손은 이미 배신했습니다.", "굽는 사람은 따로 있는데 젓가락은 이상하게 내 앞으로 옵니다.", "쌈 싸는 순간 오늘의 다짐은 잠깐 외출합니다.", "불판 앞에 앉으면 대화보다 뒤집는 타이밍이 먼저 중요해집니다.", "집 가서 옷 냄새 맡고도 방금 한 점은 인정하게 됩니다.");
    if (includesAny(winnerRaw, ["한우", "소고기"])) pools.push("계산할 때는 비싸다 싶은데 집 가서 사진을 다시 보게 되는 쪽입니다.", "한우는 말이 줄어드는 음식입니다. 가격 생각은 잠깐 뒤로 밀립니다.", "오늘은 배보다 기분을 대접하는 쪽이 더 세게 올라옵니다.", "한 점 올리는 순간부터 식사가 아니라 작은 행사처럼 변합니다.", "통장은 살짝 눈치 보지만 입은 이미 편을 정했습니다.");
    if (includesAny(winnerRaw, ["곱창"])) pools.push("곱창은 한 잔이 두 잔 되는 위험구역입니다.", "불판 위에서 기름이 올라오면 오늘 대화도 같이 길어집니다.", "추가 주문 확률이 조용히 올라가는 선택입니다.");
    if (includesAny(winnerRaw, ["피자"])) pools.push("피자는 한 조각만 먹겠다는 말을 잘 안 믿습니다.", "상자 열리는 순간 나눠 먹을 핑계가 생깁니다.", "치즈 늘어나는 동안 오늘 고민은 잠깐 조용해집니다.");
    if (includesAny(winnerRaw, ["햄버거", "버거"])) pools.push("햄버거는 포장지 여는 순간 손이 바빠지는 쪽입니다.", "감튀 하나 집는 순간 이미 세트가 본론이 됩니다.", "소스 묻은 손가락 보고도 만족하면 이긴 겁니다.");
    if (includesAny(winnerRaw, ["라면"])) pools.push("물 올리는 순간 마음은 이미 반쯤 넘어갑니다.", "먹고 나면 물 한 컵 더 찾을 미래까지 같이 옵니다.", "간단히 먹자는 말로 시작해서 냄비 바닥까지 확인할 수 있습니다.");
    if (!pools.length) pools.push(`${winnerName} 고르면 먹고 난 뒤 변명보다 표정이 먼저 나옵니다.`, `${loserName}도 좋지만 오늘은 ${winnerName} 쪽으로 주문하고 나서 덜 흔들릴 듯합니다.`, `${winnerName} 쪽은 끝나고 "괜히 고민했네"가 나오기 쉽습니다.`, `오늘은 ${winnerName} 먹고 나서 다음 선택지를 굳이 다시 떠올리지 않을 쪽입니다.`);
  }
  if (category === "travel") {
    if (includesAny(winnerRaw, ["일본"])) pools.push("일본은 회사 생각을 잊는다기보다, 걷고 구경하느라 생각할 틈을 줄이는 쪽입니다.", "편의점 한 바퀴만 돌아도 괜히 여행 온 티가 나는 선택입니다.", "많이 걷는 건 각오해야 하지만, 골목마다 오늘의 핑계가 생깁니다.");
    if (includesAny(winnerRaw, ["태국"])) pools.push("태국은 회사 생각이 덜 나는 쪽입니다. 슬리퍼 신고 느슨해지는 그림이 먼저 옵니다.", "마사지 받고 야시장 걷는 순간 휴가가 빨리 시작됩니다.", "계획표보다 몸이 먼저 풀리는 여행에 가깝습니다.");
    if (includesAny(winnerRaw, ["제주"])) pools.push("제주는 차 타고 창밖 보는 시간까지 여행처럼 느껴지는 쪽입니다.", "카페, 바람, 드라이브가 한 세트로 따라옵니다.", "크게 뭘 안 해도 사진첩이 조금 넓어지는 선택입니다.");
    if (includesAny(winnerRaw, ["부산"])) pools.push("부산은 바다 보고 회 한 점 먹는 순간 말이 쉬워집니다.", "밤바다 앞에서는 피곤해도 괜히 한 번 더 걷게 됩니다.", "도착하면 여행보다 놀러 온 느낌이 먼저 납니다.");
    if (!pools.length) pools.push(`${winnerName}은 다녀온 뒤 말할 거리가 조금 더 남는 쪽입니다.`, `${winnerName} 고르면 피곤해도 오늘 하루가 덜 평범해집니다.`, `${loserName}도 좋지만, 지금 머릿속 예고편은 ${winnerName} 쪽이 먼저 틀어집니다.`);
  }
  if (category === "shopping") {
    if (includesAny(raw, ["컴퓨터", "pc", "노트북"])) pools.push("렉 걸릴 때마다 참던 마음이 오늘은 조금 크게 말합니다.", "새 컴퓨터는 비싸지만 기다리는 시간을 줄여주는 변명이 꽤 셉니다.", "장바구니는 이미 조용히 견적서를 흔들고 있습니다.");
    if (includesAny(raw, ["tv", "티비", "텔레비전", "테레비"])) pools.push("TV는 바꾸는 순간 거실이 먼저 알아봅니다.", "화질 욕심은 조용히 오지만 한 번 보면 계속 신경 쓰입니다.", "리모컨 누르는 기분까지 바뀔 수 있는 선택입니다.");
    if (includesAny(raw, ["플스", "플레이스테이션", "닌텐도", "스위치", "게임기"])) pools.push("게임기는 사는 순간보다 실제로 켜는 밤이 더 중요합니다.", "박스 뜯는 설렘은 강한데, 오래 켜게 될 그림까지 보여야 이깁니다.", "오늘은 장식품이 될지 퇴근 후 루틴이 될지 싸움입니다.");
    if (!pools.length) pools.push(`결제 버튼은 반짝이지만, ${winnerName}은 사고 난 뒤 실제로 쓰는 장면이 먼저 보여야 합니다.`, `${winnerName} 쪽은 갖고 싶은 마음보다 며칠 뒤에도 손이 갈지가 핵심입니다.`, `${loserName}은 장바구니 옆에서 눈치만 보고, 오늘 지름신은 ${winnerName} 쪽 영수증을 먼저 흔듭니다.`);
  }
  if (!pools.length) return "";
  return pick(pools, hashText(`${question}-${winner.name}-${loser.name}-${Array.isArray(sign) ? sign[0] : sign}-${seed}-${category}-option-scene`));
}

function foodComparisonLine(winner, loser, question, sign, seed = 0) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerCharacter = foodCharacterLines(winner.name);
  const loserCharacter = foodCharacterLines(loser.name);
  if (winnerCharacter && loserCharacter) {
    const sceneTone = zodiacSceneLine("food", sign, winner, loser, question, seed, "food-comparison-tone");
    const sceneVariant = optionSceneVariant("food", winner, loser, question, sign, seed);
    const winnerLine = optionCharacterLine(winnerCharacter, winner.name, question, "winner");
    const loserLine = optionCharacterLine(loserCharacter, loser.name, question, "loser");
    const closer = pick([
      `야 그냥 오늘은 ${winnerName} 가자. 먹고 나서 덜 궁시렁댈 쪽입니다.`,
      `${loserName}도 좋은데, 오늘 끝나고 "괜히 골랐다" 덜 나올 쪽은 ${winnerName}입니다.`,
      `둘 다 배신은 안 하는데, 오늘은 ${winnerName} 쪽이 식탁 엔딩이 더 깔끔합니다.`,
      `결론만 말하면 ${winnerName}. 길게 따지면 더 배고파집니다.`
    ], hashText(`${question}-${winner.name}-${loser.name}-${Array.isArray(sign) ? sign[0] : sign}-${seed}-food-comparison-close`));
    return cleanPlayTone(`${sceneTone} ${sceneVariant} ${winnerLine} ${loserLine} ${closer}`);
  }
  return null;
}

function foodRealityReason(winner, loser, question, sign, seed = 0) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerTopic = withParticle(winner.name, "은", "는");
  const winnerObject = withParticle(winner.name, "을", "를");
  const opening = foodSceneOpening(winner, loser, question);
  const comparison = foodComparisonLine(winner, loser, question, sign, seed);
  if (comparison) return comparison;
  const culturalComparison = culturalRealityReason(winner, loser, question, sign, seed);
  if (culturalComparison) return culturalComparison;
  const character = foodCharacterLines(winner.name);
  if (character) {
    const sceneTone = zodiacSceneLine("food", sign, winner, loser, question, seed, "food-character-tone");
    const sceneVariant = optionSceneVariant("food", winner, loser, question, sign, seed);
    const line = pick(character.lines, hashText(`${question}-${winner.name}-${Array.isArray(sign) ? sign[0] : sign}-${seed}-food-character`));
    const loserTopic = withParticle(loser.name, "은", "는");
    const detail = pick([
      `${loserName}도 버티지만, 오늘은 ${winnerName} 쪽으로 손이 먼저 갑니다.`,
      `이건 분석하면 더 배고파집니다. 오늘은 ${winnerName}으로 빨리 끝내는 쪽입니다.`,
      `먹고 나서 "괜히 골랐다"가 덜 나올 쪽입니다.`,
      `${winnerName} 쪽은 먹고 난 뒤 표정이 바로 정리됩니다. ${loserTopic} 다음 라운드로 보내도 됩니다.`
    ], hashText(`${question}-${winner.name}-${Array.isArray(sign) ? sign[0] : sign}-${seed}-food-character-detail`));
    return cleanPlayTone(`${sceneTone} ${sceneVariant} ${line} ${detail}`);
  }
  const first = winner.features[0] || "먹고 난 뒤 표정";
  const second = winner.features[1] || "후회가 덜 남는 쪽";
  const detailPool = [
    `${winnerTopic} 먹고 나서 괜히 고개 끄덕일 쪽입니다.`,
    `${winnerObject} 고르면 식사 끝나고 말이 덜 길어질 가능성이 있습니다. ${loserName}은 다음 끼니에 다시 부르면 됩니다.`,
    `${winnerName} 쪽은 먹고 나서 "아 이거였네"가 나올 확률이 더 큽니다. 후회는 잠깐 쉬는 걸로 갑시다.`,
    `지금은 설명보다 주문입니다. ${winnerName} 쪽이 끝나고 덜 궁시렁댈 선택이에요.`,
    `${winnerName}은 먹고 난 뒤 표정이 바로 옵니다. ${loserName}은 오늘 후보석에 잠깐 앉혀둡시다.`
  ];
  const sceneTone = zodiacSceneLine("food", sign, winner, loser, question, seed, "food-generic-tone");
  const sceneVariant = optionSceneVariant("food", winner, loser, question, sign, seed);
  return cleanPlayTone([
    sceneTone,
    sceneVariant,
    opening,
    pick(detailPool, hashText(`${question}-${winner.name}-${loser.name}-${Array.isArray(sign) ? sign[0] : sign}-${seed}-food-detail`))
  ].join(" "));
}

function gameCharacterLines(gameName) {
  const name = String(gameName || "").toLowerCase();
  const bank = [
    { keys: ["스타크래프트", "스타"], lines: [
      "스타는 내가 못한 이유를 끝까지 찾게 만드는 게임입니다. 변명도 결국 빌드오더 앞에서 작아집니다.",
      "스타는 조용히 시작했다가 손이 꼬이는 순간 바로 들킵니다.",
      "스타는 남 탓하기 전에 내 앞마당부터 보게 만듭니다.",
      "스타는 한 판 끝나면 '아까 그 타이밍'이 계속 머리에 남습니다."
    ], future: [
      "리플레이 보면서 3분 전의 나를 혼낼 수 있습니다.",
      "졌어도 빌드 탓인지 손 탓인지 끝까지 따집니다.",
      "한 판 끝나고도 머릿속 미니맵이 꺼지지 않습니다."
    ] },
    { keys: ["롤", "리그오브레전드", "리그 오브 레전드"], lines: [
      "롤은 남이 못한 이유를 찾게 만드는 속도가 빠릅니다. 채팅창은 늘 위험 구역입니다.",
      "롤은 내가 잘해도 팀원이 같이 타야 도착하는 버스입니다.",
      "롤은 한 판만 하겠다는 말을 가장 쉽게 배신합니다.",
      "롤은 이기면 한 판 더, 지면 억울해서 한 판 더가 붙습니다."
    ], future: [
      "끝나고 전적 검색창을 열 가능성이 있습니다.",
      "남 탓 버튼을 참으면 이미 절반은 이긴 겁니다.",
      "한 판만 한다는 약속은 잠깐 심문이 필요합니다."
    ] },
    { keys: ["배그"], lines: [
      "배그는 조용히 걷다가 갑자기 심장이 먼저 뛰는 게임입니다.",
      "배그는 총소리 한 번에 자세가 바로 바뀝니다.",
      "배그는 파밍할 땐 평화롭고, 맞는 순간 현실로 돌아옵니다.",
      "배그는 오래 숨어도 마지막엔 손이 대답해야 합니다."
    ], future: [
      "발소리 하나에 방 안 공기가 바뀔 수 있습니다.",
      "죽고 나서 방금 그 각도를 다시 떠올립니다.",
      "치킨은 못 먹어도 심장은 뛰었습니다."
    ] }
  ];
  return bank.find((item) => item.keys.some((key) => name.includes(key))) || null;
}

function gameRealityReason(winner, loser, question) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerCharacter = gameCharacterLines(winner.name);
  const loserCharacter = gameCharacterLines(loser.name);
  if (winnerCharacter && loserCharacter) {
    const winnerLine = optionCharacterLine(winnerCharacter, winner.name, question, "game-winner");
    const loserLine = optionCharacterLine(loserCharacter, loser.name, question, "game-loser");
    const closer = pick([
      `둘 다 시간 먹는 속도는 빠른데, 오늘은 ${winnerName} 쪽이 시작 버튼을 더 세게 누릅니다.`,
      `${loserName}도 위험하지만, 오늘 손가락은 ${winnerName} 쪽 단축키를 먼저 기억합니다.`,
      `이건 승패 예측보다 어떤 스트레스를 고를지 문제입니다. 오늘은 ${winnerName} 쪽입니다.`,
      `그래서 ${winnerName} 승. 끝나고 한 판 더 하고 싶어지는 쪽도 아마 이쪽입니다.`
    ], hashText(`${question}-${winner.name}-${loser.name}-game-comparison-close`));
    return cleanPlayTone(`${winnerLine} ${loserLine} ${closer}`);
  }
  return playfulRealityReason("game", winner, loser, question);
}

function culturalMeaningProfile(optionName) {
  const name = String(optionName || "").toLowerCase();
  const bank = [
    {
      keys: ["콜라", "코카콜라", "펩시"],
      lines: [
        "콜라는 첫 모금부터 크게 들어옵니다. 치킨이나 햄버거 옆에서는 거의 등장 음악처럼 따라붙습니다.",
        "콜라는 조용히 마시는 음료가 아닙니다. 캔 따는 소리부터 이미 입안이 준비합니다.",
        "콜라는 첫 탄산이 세게 치고 들어오는 쪽입니다. 느끼한 메뉴 옆에 있으면 괜히 더 당당합니다.",
        "콜라는 햄버거 한입 뒤에 가장 말이 잘 통합니다. 단맛과 탄산이 바로 치고 올라오는 쪽입니다."
      ],
      future: [
        "첫 모금에 목이 바로 대답할 수 있습니다.",
        "치킨 상자 옆이면 콜라가 괜히 더 당당해집니다.",
        "얼음컵까지 있으면 이미 분위기는 끝났습니다.",
        "마시고 나서 트림 한 번까지 세트일 수 있습니다."
      ]
    },
    {
      keys: ["사이다", "스프라이트", "칠성사이다"],
      lines: [
        "사이다는 후반전에 강합니다. 느끼함이 올라올 때 깔끔하게 정리하는 쪽입니다.",
        "사이다는 콜라처럼 먼저 소리치진 않는데, 입안 정리는 더 깔끔하게 합니다.",
        "사이다는 기름진 음식 뒤에서 빛납니다. 한 모금 마시면 입안이 새로고침되는 느낌입니다.",
        "사이다는 끝맛을 가볍게 가져갑니다. 강한 첫방보다 마무리 능력이 좋은 쪽입니다."
      ],
      future: [
        "느끼함이 올라올 때 사이다가 뒤에서 수습합니다.",
        "한 모금 뒤에 입안이 다시 시작 버튼을 누를 수 있습니다.",
        "깔끔하게 넘어가서 다음 젓가락이 덜 부담스럽습니다.",
        "콜라보다 덜 요란하지만 끝은 더 가볍게 남습니다."
      ]
    },
    {
      keys: ["홍대"],
      lines: [
        "홍대는 조용히 끝나는 선택이 아닙니다. 술집 간판, 사람 많은 골목, 갑자기 바뀌는 2차 코스가 같이 따라옵니다.",
        "홍대는 약속이 아니라 작은 소동에 가깝습니다. 나가면 뭐라도 생기고, 집에 갈 타이밍은 살짝 밀립니다.",
        "홍대는 '잠깐만' 하고 들어갔다가 시간이 사라지는 쪽입니다. 즉흥성이 장점이자 함정입니다.",
        "홍대는 오늘 에너지를 밖으로 던지는 선택입니다. 조용함보다 사람 냄새와 소음 쪽에 가깝습니다."
      ],
      future: [
        "집에 오는 길에 '왜 이렇게 늦었지'가 나올 수 있습니다.",
        "2차까지는 아니었다고 말하지만 발은 이미 알고 있습니다.",
        "사진첩보다 결제 내역이 더 솔직할 수 있습니다."
      ]
    },
    {
      keys: ["합정"],
      lines: [
        "합정은 홍대처럼 뛰쳐나가기보다 카페와 맛집 사이를 천천히 걷는 쪽입니다.",
        "합정은 대화가 조금 더 오래 살아남는 동네입니다. 시끄럽게 놀기보다 앉아서 얘기하기 좋습니다.",
        "합정은 약속을 덜 소란스럽게 끝내는 선택입니다. 카페, 밥집, 산책이 한 줄로 이어집니다.",
        "합정은 힘을 빼고 만나는 쪽입니다. 놀긴 노는데 귀가 후 체력이 완전히 파산하진 않습니다."
      ],
      future: [
        "집에 와서 '오늘은 적당했다'가 나올 수 있습니다.",
        "카페 영수증은 남고 체력은 조금 살아남습니다.",
        "대화가 길어졌는데 이상하게 덜 피곤할 수 있습니다."
      ]
    },
    {
      keys: ["일본", "도쿄", "오사카", "후쿠오카", "교토"],
      lines: [
        "일본은 쉬러 간다기보다 하루를 꽉 채우고 싶은 날에 끌립니다. 편의점 하나 들어가도 괜히 여행 온 티가 납니다.",
        "일본은 회사 생각을 잊는다기보다, 걷고 구경하느라 생각할 틈을 없애는 쪽입니다. 발은 힘들어도 눈은 바쁩니다.",
        "일본은 통장이 살짝 울어도 쇼핑백과 사진이 변명해주는 선택입니다. 돌아오면 '많이 봤다'는 느낌은 확실히 남습니다.",
        "일본은 누워 쉬는 여행보다 골목을 계속 넘기는 여행입니다. 오늘 마음이 심심함을 싫어하면 이쪽이 당깁니다."
      ],
      future: [
        "편의점 디저트 하나로 하루가 이상하게 만족스러워질 수 있습니다.",
        "발은 아픈데 쇼핑백은 늘어날 예정입니다.",
        "지하철 노선도 앞에서 잠깐 어른이 됩니다.",
        "돌아와서 영수증을 보면 여행이 꽤 성실했습니다."
      ]
    },
    {
      keys: ["태국", "방콕", "푸켓", "치앙마이", "파타야"],
      lines: [
        "태국은 회사 생각이 덜 나는 쪽입니다. 낮에는 몸을 풀고, 밤에는 야시장 냄새 따라 걷는 그림이 먼저 옵니다.",
        "태국은 계획표를 꽉 채우기보다 슬리퍼 신고 느슨해지고 싶은 날에 끌립니다. 마사지 받고 나오면 마음도 같이 풀립니다.",
        "태국은 무언가를 많이 해냈다는 여행보다 '아, 좀 쉬었다'가 남는 선택입니다. 오늘 지친 마음이면 이쪽이 더 솔직합니다.",
        "태국은 낮엔 늘어지고 밤엔 다시 살아나는 여행입니다. 몸이 쉬고 싶다고 말하면 이쪽이 꽤 설득력 있습니다."
      ],
      future: [
        "마사지 받고 나오면 어깨가 여행을 먼저 인정할 수 있습니다.",
        "야시장 냄새 앞에서 계획표가 잠깐 사라집니다.",
        "수영장 사진 한 장으로 이미 휴가 느낌은 납니다.",
        "더워도 망고 하나 먹으면 갑자기 관대해질 수 있습니다."
      ]
    },
    {
      keys: ["제주도", "제주"],
      lines: [
        "제주도는 도시를 털어먹는 여행보다 차 타고 바람 보는 쪽입니다. 카페, 바다, 오름이 느리게 이어집니다.",
        "제주는 드라이브가 절반입니다. 창밖에 바다가 보이면 계획이 조금 틀어져도 기분이 풀립니다.",
        "제주도는 자연 쪽입니다. 예쁜 카페도 좋지만 결국 바람, 오름, 바다가 기억을 가져갑니다.",
        "제주는 날씨가 반쯤 주인공입니다. 맑으면 드라이브가 이기고, 비 오면 카페 투어가 갑자기 강해집니다."
      ],
      future: [
        "렌터카 시동 거는 순간 여행이 시작된 느낌이 납니다.",
        "바다 앞 카페에서 괜히 오래 앉게 될 수 있습니다.",
        "오름 하나 올라갔다가 숨은 차도 사진은 남습니다.",
        "날씨 앱을 자주 보게 되는 미래가 보입니다."
      ]
    },
    {
      keys: ["부산"],
      lines: [
        "부산은 바다만 보고 끝나는 곳이 아닙니다. 회, 술, 밤바다까지 이어지면 하루가 꽤 진해집니다.",
        "부산은 도시 에너지랑 바다가 같이 옵니다. 낮엔 돌아다니고 밤엔 바다 앞에서 괜히 말이 길어집니다.",
        "부산은 회 한 접시와 밤바다가 같이 떠오르는 선택입니다. 조용한 휴식보단 살아있는 도시 여행 쪽입니다.",
        "부산은 바다 보러 갔다가 술자리로 이어질 수 있습니다. 여행이 깔끔하게 끝난다는 보장은 없습니다."
      ],
      future: [
        "밤바다 앞에서 괜히 사진을 한 장 더 찍을 수 있습니다.",
        "회 먹고 나면 여행이 갑자기 설득력을 얻습니다.",
        "바닷바람 맞고 말수가 조금 늘어날 예정입니다.",
        "돌아오는 길에 부산 또 가자는 말이 나올 수 있습니다."
      ]
    },
    {
      keys: ["경주"],
      lines: [
        "경주는 크게 떠들기보다 천천히 걷고 싶은 날에 끌립니다. 말수는 줄어도 사진첩은 은근히 차는 쪽입니다.",
        "경주는 역사책처럼 시작하지만 밤에 조명 켜지면 갑자기 사진 욕심이 올라옵니다. 조용한데 기억은 남습니다.",
        "경주는 많이 먹고 많이 노는 쪽보다, 걷다 보니 여행 온 티가 나는 선택입니다. 마음이 복잡한 날엔 이 차분함이 꽤 좋습니다.",
        "경주는 속도를 늦추면 좋아지는 여행입니다. 오늘 너무 시끄러운 선택이 싫다면 이쪽이 편하게 들어옵니다."
      ],
      future: [
        "야경 사진 한 장은 건질 가능성이 높습니다.",
        "많이 먹었다기보다 많이 걸었다는 기억이 남을 수 있습니다.",
        "역사 공부하러 간 척하다가 사진첩이 이깁니다.",
        "돌아오면 조용한 여행이었다고 말할 수 있습니다."
      ]
    },
    {
      keys: ["전주"],
      lines: [
        "전주는 배가 먼저 여행을 허락하는 쪽입니다. 한옥마을 걷다가도 길거리 음식 앞에서 계획이 자꾸 멈춥니다.",
        "전주는 사진도 찍지만 결국 뭐 먹었는지가 더 또렷하게 남을 수 있습니다. 오늘 마음이 먹는 재미를 원하면 이쪽입니다.",
        "전주는 걷는 속도가 느려도 입은 바쁜 여행입니다. 심심한 하루에 작은 맛들을 계속 넣고 싶을 때 끌립니다.",
        "전주는 계획표보다 먹거리 리스트가 먼저 커지는 선택입니다. 오늘은 얌전한 구경보다 한입씩 즐기는 쪽이 더 살아납니다."
      ],
      future: [
        "결국 뭘 먹었는지가 제일 또렷하게 남을 수 있습니다.",
        "한옥마을 사진보다 간식 사진이 더 많아질 수 있습니다.",
        "막걸리 한상 앞에서 일정표가 잠깐 조용해집니다.",
        "돌아오는 길에 배는 꽤 설득당해 있을 겁니다."
      ]
    },
    {
      keys: ["버스"],
      lines: [
        "버스는 돈을 아끼는 대신 시간을 조금 맡기는 선택입니다. 앉으면 이기고, 서서 가면 살짝 억울합니다.",
        "버스는 교통비 방어에 강합니다. 대신 퇴근길 사람 많은 버스는 마음의 손잡이까지 필요합니다.",
        "버스는 느리지만 지갑이 덜 삐집니다. 창밖 보면서 멍때릴 수 있으면 나쁘지 않은 거래입니다.",
        "버스는 시간이 급하지 않을 때 힘을 받습니다. 문제는 배차 간격이 오늘의 인내심을 시험할 수 있다는 겁니다."
      ],
      future: [
        "교통비는 아꼈고, 다리는 상황을 지켜보는 중입니다.",
        "앉아서 가면 오늘 선택은 바로 미화됩니다.",
        "버스 도착 시간이 늦으면 이 결정이 잠깐 흔들릴 수 있습니다.",
        "창밖 보다가 생각보다 빨리 도착하면 성공입니다."
      ]
    },
    {
      keys: ["택시"],
      lines: [
        "택시는 시간을 돈으로 사는 선택입니다. 문 닫고 앉는 순간 몸은 바로 편을 듭니다.",
        "택시는 지갑이 싫어하고 다리가 좋아합니다. 특히 퇴근길엔 이 거래가 꽤 달콤합니다.",
        "택시는 빠르고 편하지만 요금 미터기가 작은 긴장감을 줍니다. 편함은 즉시 오고 후회는 결제 때 옵니다.",
        "택시는 오늘 체력을 아끼는 쪽입니다. 기다림을 줄이고 집 문 앞까지 가는 게 생각보다 큽니다."
      ],
      future: [
        "문 앞에 내리는 순간 돈 쓴 이유가 생길 수 있습니다.",
        "요금은 아픈데 몸은 조용히 박수칩니다.",
        "뒷좌석에 앉자마자 오늘의 피로가 조금 풀립니다.",
        "카드 찍는 순간만 빼면 꽤 완벽한 이동입니다."
      ]
    },
    {
      keys: ["영화"],
      lines: [
        "영화는 그냥 보는 게 아니라 티켓 끊고 밖으로 나가는 작은 이벤트입니다.",
        "영화는 두 시간 동안 폰을 내려놓게 만드는 선택입니다. 끝나고 나면 괜히 감상평도 생깁니다.",
        "영화는 외출 준비와 상영 시간표까지 끌고 옵니다. 대신 보고 나면 하루가 조금 행사 같아집니다.",
        "영화는 몰입을 돈 주고 사는 쪽입니다. 침대보다 번거롭지만 끝나고 남는 말이 있습니다."
      ],
      future: [
        "엔딩 크레딧 올라갈 때 괜히 하루가 정리될 수 있습니다.",
        "팝콘은 핑계였고 사실은 외출이 필요했을 수 있습니다.",
        "보고 나와서 별점 주는 척 전문가가 됩니다."
      ]
    },
    {
      keys: ["드라마"],
      lines: [
        "드라마는 침대가 리모컨을 쥐는 선택입니다. 한 편만 보겠다는 말은 일단 의심해야 합니다.",
        "드라마는 외출 없이 몰입하는 쪽입니다. 문제는 다음 화 버튼이 너무 가까이 있다는 겁니다.",
        "드라마는 귀찮음을 이기는 게 아니라 귀찮음과 손잡는 선택입니다. 소파가 가장 강한 조연입니다.",
        "드라마는 조용히 시작해서 새벽을 살짝 훔쳐갈 수 있습니다. 한 편만 볼 자신이 핵심입니다."
      ],
      future: [
        "다음 화 버튼 앞에서 자제력 면접이 시작됩니다.",
        "침대가 오늘의 상영관이 될 예정입니다.",
        "한 편만 본다는 약속은 증인이 필요합니다."
      ]
    }
  ];
  return bank.find((item) => item.keys.some((key) => name.includes(key))) || null;
}

function culturalRealityReason(winner, loser, question, sign, seed = 0) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerProfile = culturalMeaningProfile(winner.name);
  const loserProfile = culturalMeaningProfile(loser.name);
  if (!winnerProfile && !loserProfile) return null;
  const category = inferCategory(question, winner.name, loser.name, {});
  const sceneTone = zodiacSceneLine(category, sign, winner, loser, question, seed, "culture-tone");
  const sceneVariant = optionSceneVariant(category, winner, loser, question, sign, seed);
  const winnerLine = winnerProfile
    ? optionCharacterLine(winnerProfile, winner.name, question, `${Array.isArray(sign) ? sign[0] : sign}-${seed}-culture-winner`)
    : `${winnerName}도 나쁘진 않은데, 오늘 머릿속에 바로 뜨는 그림은 조금 약합니다.`;
  const loserLine = loserProfile
    ? optionCharacterLine(loserProfile, loser.name, question, `${Array.isArray(sign) ? sign[0] : sign}-${seed}-culture-loser`)
    : `${loserName} 쪽도 예고편은 있는데, 오늘은 ${winnerName}을 고른 뒤 벌어질 일이 더 또렷합니다.`;
  const closer = pick([
    `그래서 오늘은 ${winnerName}. 뜻보다 장면으로 보면 이쪽이 더 살아 있습니다.`,
    `${loserName}도 말은 되는데, 오늘 하루가 원하는 톤은 ${winnerName} 쪽에 더 가깝습니다.`,
    `야 그냥 ${winnerName} 가자. 머릿속 예고편이 이쪽이 더 빨리 틀어졌습니다.`,
    `결론은 ${winnerName}. 설명보다 그 선택 뒤에 따라오는 하루가 더 잘 보입니다.`
  ], hashText(`${question}-${winner.name}-${loser.name}-${Array.isArray(sign) ? sign[0] : sign}-${seed}-culture-close`));
  return cleanPlayTone(`${sceneTone} ${sceneVariant} ${winnerLine} ${loserLine} ${closer}`);
}

function highValuePurchaseProfile(value) {
  const text = String(value || "").toLowerCase();
  const bank = [
    {
      keys: ["컴퓨터", "pc", "피씨", "노트북"],
      label: "컴퓨터",
      buy: [
        "컴퓨터는 사는 순간 성능 체감이 바로 옵니다. 버벅이던 창이 조용해지면 지름신이 자기가 맞았다고 우깁니다.",
        "컴퓨터 구매는 단순 소비가 아니라 답답함을 돈으로 끄는 버튼입니다. 문제는 결제 후 신제품 소식이 제일 얄밉다는 겁니다.",
        "새 컴퓨터는 게임이든 작업이든 기다리는 시간을 줄여줍니다. 대신 통장은 팬 소리보다 크게 울 수 있습니다."
      ],
      hold: [
        "버티기는 통장을 지키지만, 렉 걸릴 때마다 마음이 조금씩 닳습니다.",
        "컴퓨터를 더 버티면 신제품이나 가격 안정은 볼 수 있습니다. 대신 오늘의 답답함은 그대로 출근합니다.",
        "지금 컴퓨터가 아직 켜지고 돌아간다면 버티기도 말은 됩니다. 다만 로딩 화면 볼 때마다 지름신이 다시 문을 두드립니다."
      ],
      futureGo: [
        "새 컴퓨터 켜는 순간 팬 소리보다 기분이 먼저 조용해질 수 있습니다.",
        "결제 문자는 아픈데 부팅 속도는 위로가 됩니다.",
        "신제품 뉴스만 당분간 안 보면 행복합니다."
      ],
      futureSkip: [
        "통장은 웃고, 로딩 화면은 계속 눈치 봅니다.",
        "오늘은 버텼지만 장바구니는 아직 살아 있습니다.",
        "다음 렉에서 이 결정이 다시 재판받을 수 있습니다."
      ]
    },
    {
      keys: ["게임기", "플스", "플레이스테이션", "닌텐도", "스위치", "xbox", "엑스박스"],
      label: "게임기",
      buy: [
        "게임기는 사는 순간 박스 뜯는 재미가 먼저 옵니다. 문제는 진짜 할 게임이 있느냐입니다.",
        "게임기 구매는 지름신이 가장 말 잘하는 분야입니다. 독점작 하나만 보여줘도 마음이 흔들립니다.",
        "새 게임기는 퇴근 후 시간을 바꾸는 물건입니다. 대신 안 켜는 날이 많아지면 장식품이 됩니다."
      ],
      hold: [
        "버티면 할인이나 새 모델을 기다릴 수 있습니다. 대신 유튜브 게임 영상 볼 때마다 마음이 다시 흔들립니다.",
        "게임기를 안 사면 시간과 돈은 지킵니다. 하지만 하고 싶은 게임이 확실하면 참는 시간이 더 길게 느껴집니다.",
        "지금 당장 할 게임이 애매하면 버티기가 꽤 강합니다. 박스만 모셔두는 미래는 피하는 게 좋습니다."
      ],
      futureGo: [
        "박스 뜯는 순간 이미 절반은 이긴 기분입니다.",
        "설치 업데이트 시간까지 설레면 진짜 사고 싶었던 겁니다.",
        "첫 실행 화면에서 지름신이 박수칠 수 있습니다."
      ],
      futureSkip: [
        "할인 알림 뜨면 다시 흔들릴 예정입니다.",
        "오늘은 참았지만 게임 영상은 당분간 조심해야 합니다.",
        "장식품 될 미래 하나는 피했습니다."
      ]
    },
    {
      keys: ["자동차", "차량", "차 산", "차 살", "차 바꿀", "차 구매", "차 계약"],
      label: "차",
      buy: [
        "차는 사는 순간 이동이 편해지지만, 보험료와 유지비가 같이 조수석에 탑니다.",
        "차 구매는 설렘이 큽니다. 대신 매달 빠져나가는 돈도 성실합니다.",
        "새 차는 생활 동선을 바꿉니다. 문제는 감가와 유지비가 생각보다 현실적이라는 겁니다."
      ],
      hold: [
        "버티면 큰돈 나가는 타이밍을 늦출 수 있습니다. 대신 이동 스트레스도 같이 연장됩니다.",
        "차를 안 사면 통장은 크게 안 흔들립니다. 하지만 매번 이동이 불편했다면 불만도 계속 누적됩니다.",
        "지금 차 없이도 버틸 수 있으면 관망이 강합니다. 차는 사는 날보다 유지하는 달이 더 깁니다."
      ],
      futureGo: [
        "첫 드라이브는 좋고, 첫 보험료는 현실적입니다.",
        "차 키 잡는 순간 기분은 오르지만 고정비도 같이 탑승합니다.",
        "이동은 편해지고 통장은 어른스러워집니다."
      ],
      futureSkip: [
        "오늘 큰돈은 막았고, 이동 불편은 조금 더 남았습니다.",
        "통장은 살았지만 택시 앱은 아직 친구입니다.",
        "다음 비 오는 날 이 결정이 다시 소환될 수 있습니다."
      ]
    },
    {
      keys: ["휴대폰", "핸드폰", "스마트폰", "폰", "아이폰", "갤럭시"],
      label: "휴대폰",
      buy: [
        "휴대폰은 매일 손에 쥐는 물건이라 체감이 빠릅니다. 배터리와 카메라가 좋아지면 변명도 좋아집니다.",
        "새 폰은 박스 여는 순간 기분이 올라갑니다. 대신 할부는 조용히 오래 따라옵니다.",
        "폰 교체는 지름신이 가장 합리적인 척하는 분야입니다. '어차피 매일 쓰잖아'가 꽤 강합니다."
      ],
      hold: [
        "버티면 새 모델과 가격 변화를 볼 수 있습니다. 대신 배터리 20%부터 마음이 급해집니다.",
        "지금 폰이 느리지만 쓸 만하다면 버티기도 가능합니다. 문제는 사진 찍을 때마다 새 폰 생각이 난다는 겁니다.",
        "휴대폰을 더 쓰면 통신비와 할부 부담은 늦출 수 있습니다. 대신 하루에도 몇 번씩 답답함을 만납니다."
      ],
      futureGo: [
        "새 폰 켜는 순간 케이스부터 검색할 수 있습니다.",
        "사진 한 장 찍고 바로 합리화가 시작됩니다.",
        "할부는 길지만 화면은 예쁩니다."
      ],
      futureSkip: [
        "배터리 숫자가 다시 이 결정을 흔들 수 있습니다.",
        "오늘은 참았지만 새 폰 광고는 피해야 합니다.",
        "통장은 웃고 충전기는 계속 바쁩니다."
      ]
    },
    {
      keys: ["에어컨"],
      label: "에어컨",
      buy: [
        "에어컨은 지름신이라기보다 생존 장비에 가깝습니다. 더운 밤 잠이 깨면 결제 논리가 강해집니다.",
        "에어컨 구매는 여름 체감이 바로 옵니다. 대신 설치비와 전기요금이 뒤에서 손을 듭니다.",
        "에어컨은 사면 매일 쓰는 계절이 옵니다. 문제는 성수기엔 가격과 설치 대기가 같이 뜨거워진다는 겁니다."
      ],
      hold: [
        "버티면 돈은 지키지만 더운 밤마다 인내심이 시험을 봅니다.",
        "아직 참을 만하면 버티기도 됩니다. 다만 한여름 설치 대기는 생각보다 사람을 급하게 만듭니다.",
        "에어컨을 미루면 지출은 늦어집니다. 대신 더위가 오면 판단력이 같이 녹을 수 있습니다."
      ],
      futureGo: [
        "시원한 바람 한 번에 결제 이유가 생길 수 있습니다.",
        "설치 끝난 날 방 온도보다 표정이 먼저 내려갑니다.",
        "전기요금은 나중 문제고 오늘 밤은 살았습니다."
      ],
      futureSkip: [
        "오늘은 버텼지만 다음 열대야가 다시 투표를 열 겁니다.",
        "통장은 시원하고 방은 아직 덥습니다.",
        "선풍기가 갑자기 책임감을 느낄 예정입니다."
      ]
    }
  ];
  return bank.find((item) => item.keys.some((key) => text.includes(key))) || null;
}

function highValuePurchaseReason(winner, loser, question) {
  const source = `${question} ${winner.subjectName || ""} ${loser.subjectName || ""} ${winner.name} ${loser.name}`;
  const profile = highValuePurchaseProfile(source);
  if (!profile) return null;
  const winnerName = escapeHtml(optionDisplayName(winner, "shopping"));
  const loserName = escapeHtml(optionDisplayName(loser, "shopping"));
  const winnerIsBuy = winner.intent !== "skip";
  const mainLine = pick(winnerIsBuy ? profile.buy : profile.hold, hashText(`${source}-${winner.name}-high-buy`));
  const counterLine = pick(winnerIsBuy ? profile.hold : profile.buy, hashText(`${source}-${loser.name}-high-hold`));
  const closer = winnerIsBuy
    ? `그래서 오늘은 ${winnerName}. 가격은 아픈데, 답답함을 줄이는 값이 더 크게 보입니다.`
    : `그래서 오늘은 ${winnerName}. 지름신은 시끄럽지만, 지금은 후회 방지턱이 조금 더 높습니다.`;
  return cleanPlayTone(`${mainLine} ${counterLine} ${closer}`);
}

function categoryDecisionFrame(category, winner, loser, question) {
  const raw = `${question} ${winner.name} ${loser.name} ${winner.subjectName || ""} ${loser.subjectName || ""}`.toLowerCase();
  if (category === "travel") {
    if (includesAny(raw, ["일본", "태국", "해외", "비행"])) {
      return "";
    }
    if (includesAny(raw, ["경주", "전주", "부산", "제주"])) {
      return "";
    }
    return "";
  }
  if (category === "shopping" && includesAny(raw, ["플스", "플레이스테이션", "닌텐도", "스위치", "게임기", "ps5"])) {
    return "";
  }
  if (category === "shopping") {
    return "";
  }
  return "";
}

function gameConsoleReason(winner, loser, question, sign, seed = 0) {
  const raw = `${question} ${winner.name} ${loser.name}`.toLowerCase();
  if (!includesAny(raw, ["플스", "플레이스테이션", "닌텐도", "스위치", "게임기", "ps5"])) return null;
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerRaw = String(winner.name).toLowerCase();
  const loserRaw = String(loser.name).toLowerCase();
  const sceneTone = zodiacSceneLine("shopping", sign, winner, loser, question, seed, "console-tone");
  const sceneVariant = optionSceneVariant("shopping", winner, loser, question, sign, seed);
  const signKey = Array.isArray(sign) ? sign[0] : sign;
  const winnerLine = includesAny(winnerRaw, ["플스", "플레이스테이션", "ps5", "ps4"])
    ? pick([
      `${winnerName}는 밤에 불 끄고 TV 앞에 앉는 느낌이 먼저 옵니다. 한 번 켜면 "제대로 한다"는 쪽입니다.`,
      `${winnerName}는 퇴근 후 방 불 낮추고 오래 앉을 자신이 있을 때 힘을 받습니다.`,
      `${winnerName}는 짧게 켜는 장난감보다, 각 잡고 빠지는 밤에 가까운 선택입니다.`,
      `${winnerName} 쪽은 화면 앞에 앉는 순간 오늘 시간이 통째로 넘어갈 수 있습니다.`
    ], hashText(`${question}-${winner.name}-${signKey}-${seed}-console-winner-ps`))
    : includesAny(winnerRaw, ["닌텐도", "스위치"])
      ? pick([
        `${winnerName}는 소파, 침대, 이동 중에 슬쩍 켜는 그림이 먼저 옵니다.`,
        `${winnerName}는 큰 결심 없이 켜도 되는 쪽입니다. 혼자 해도, 같이 해도 덜 뻣뻣합니다.`,
        `${winnerName}는 게임을 숙제처럼 잡지 않아도 되는 편한 맛이 있습니다.`,
        `${winnerName}는 잠깐 켰다가도 웃을 구석이 생기는 쪽입니다.`
      ], hashText(`${question}-${winner.name}-${signKey}-${seed}-console-winner-nintendo`))
      : `${winnerName}는 하고 싶은 게임이 확실할 때 힘을 받는 선택입니다.`;
  const loserLine = includesAny(loserRaw, ["플스", "플레이스테이션", "ps5", "ps4"])
    ? pick([
      `${loserName}는 몰입감은 센데, TV 앞에 앉을 시간이 없으면 괜히 눈치 보는 물건이 됩니다.`,
      `${loserName}는 마음먹고 켜야 맛이 납니다. 자주 못 켜면 박스가 조금 억울합니다.`,
      `${loserName}는 제대로 빠질 수 있으면 강하지만, 대충 켜기엔 살짝 무겁습니다.`
    ], hashText(`${question}-${loser.name}-${signKey}-${seed}-console-loser-ps`))
    : includesAny(loserRaw, ["닌텐도", "스위치"])
      ? pick([
        `${loserName}는 자주 켜기엔 좋은데, 묵직하게 빠져들 밤을 원하면 살짝 가볍게 느껴질 수 있습니다.`,
        `${loserName}는 편하지만 오늘 원하는 게 큰 몰입이면 한 걸음 물러납니다.`,
        `${loserName}는 부담은 적은데, 지금 마음이 원하는 무게와는 조금 다를 수 있습니다.`
      ], hashText(`${question}-${loser.name}-${signKey}-${seed}-console-loser-nintendo`))
      : `${loserName}도 끌리지만, 실제로 켜는 밤을 떠올리면 ${winnerName} 쪽이 먼저 손에 잡힙니다.`;
  const closer = includesAny(winnerRaw, ["플스", "플레이스테이션", "ps5", "ps4"])
    ? pick([
      `그래서 오늘은 ${winnerName}. 오늘의 나는 짧게 자주보다 한 번 앉아 제대로 빠지는 쪽입니다.`,
      `결론은 ${winnerName}. 켤 때마다 "그래 이 맛이지"가 나와야 돈 쓴 티가 납니다.`,
      `오늘은 ${winnerName} 쪽입니다. 문제는 살까 말까보다 진짜 켤 밤이 있냐입니다.`
    ], hashText(`${question}-${winner.name}-${signKey}-${seed}-console-close-ps`))
    : includesAny(winnerRaw, ["닌텐도", "스위치"])
      ? pick([
        `그래서 오늘은 ${winnerName}. 생각날 때 툭 켜는 쪽이 오래 갈 것 같습니다.`,
        `결론은 ${winnerName}. 게임을 큰 행사로 만들지 않아도 되는 쪽입니다.`,
        `오늘은 ${winnerName} 쪽입니다. 자주 손이 가면 그게 결국 이기는 게임기입니다.`
      ], hashText(`${question}-${winner.name}-${signKey}-${seed}-console-close-nintendo`))
      : `그래서 오늘은 ${winnerName}. 게임기는 스펙보다 실제로 켜는 시간이 이깁니다.`;
  return cleanPlayTone(`${sceneTone} ${sceneVariant} ${winnerLine} ${loserLine} ${closer}`);
}

function sameResultDifferentReason(category, winner, loser, question, cards = [], sign = ["황소자리", "♉"], seed = 0) {
  const signName = sign && sign[0] ? sign[0] : "황소자리";
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const raw = `${question} ${winner.name} ${loser.name} ${winner.subjectName || ""} ${loser.subjectName || ""}`.replace(/\s/g, "").toLowerCase();
  const winnerRaw = `${winner.name} ${winner.subjectName || ""}`.replace(/\s/g, "").toLowerCase();
  const cardText = cards && cards.length ? cards.slice(0, 2).join(" + ") : "오늘 카드";
  const hasRaw = (words) => includesAny(raw, words);
  const winnerHas = (words) => includesAny(winnerRaw, words);
  const signNudge = {
    "양자리": "양자리는 오래 재지 않습니다. 마음이 튀면 컵이든 발이든 먼저 나갑니다.",
    "황소자리": "황소자리는 굳이 힘든 길을 좋아하지 않습니다. 편하고 확실한 쪽에 오래 앉습니다.",
    "쌍둥이자리": "쌍둥이자리는 고르면서도 이미 옆 사람한테 설명할 멘트를 만들고 있습니다.",
    "게자리": "게자리는 끝나고 마음이 어떤 표정일지를 먼저 봅니다.",
    "사자자리": "사자자리는 오늘 선택이 조금은 폼 나야 움직입니다.",
    "처녀자리": "처녀자리는 머릿속 체크리스트를 켰습니다. 귀찮음까지 계산에 넣었습니다.",
    "천칭자리": "천칭자리는 둘 다 저울에 올려놓고, 오늘 보기 덜 어색한 쪽을 봅니다.",
    "전갈자리": "전갈자리는 대충 넘기는 걸 싫어합니다. 꽂히면 끝까지 보는 쪽입니다.",
    "사수자리": "사수자리는 답답하면 일단 움직입니다. 경험치가 남으면 절반은 성공입니다.",
    "염소자리": "염소자리는 나중에 봐도 덜 민망한 선택을 고릅니다.",
    "물병자리": "물병자리는 남들이 정한 정답보다 지금 나한테 이상하게 맞는 쪽을 봅니다.",
    "물고기자리": "물고기자리는 숫자보다 잠들기 전 마음의 파도를 먼저 봅니다."
  }[signName] || "오늘 별자리는 크게 떠들지 않고, 선택 뒤 표정을 먼저 봅니다.";

  if (category === "beverage" && hasRaw(["아아", "아이스아메리카노", "라떼", "카페라떼"])) {
    const line = winnerHas(["라떼", "카페라떼"])
      ? pick([
        `아아는 정신 차리려고 마시는 쪽이고, 라떼는 오늘 나를 조금 달래는 쪽입니다. 지금은 각성보다 위로가 먼저라 ${winnerName} 쪽입니다.`,
        `아아는 "일어나"에 가깝고, 라떼는 "괜찮아"에 가깝습니다. 오늘 컵은 혼내는 쪽보다 달래는 쪽이 더 어울립니다.`,
        `아아는 얼음으로 정신을 깨우지만, 라떼는 우유로 하루를 둥글게 만듭니다. 오늘은 조금 덜 날카롭게 가도 됩니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-latte-scene`))
      : pick([
        `라떼는 달래주는 컵이고, 아아는 멱살 잡고 깨우는 컵입니다. 오늘은 부드러운 위로보다 정신 번쩍 쪽입니다.`,
        `라떼는 천천히 마시기 좋지만, 지금 필요한 건 얼음 들어간 빠른 시동입니다. ${winnerName} 쪽이 손에 먼저 잡힙니다.`,
        `라떼가 다정하게 부르긴 했는데, 오늘 눈꺼풀은 그런 말로는 안 움직입니다. 아아가 와서 스위치를 눌러야 합니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-aa-scene`));
    return cleanPlayTone(`${line} ${signNudge}`);
  }

  if (category === "drink" && hasRaw(["위스키", "whisky", "whiskey", "소주"])) {
    const line = winnerHas(["소주"])
      ? pick([
        `소주는 잔 돌기 시작하면 말이 먼저 풀립니다. 위스키는 멋은 있는데 오늘은 폼 잡다 끝날 수 있습니다. 오늘은 폼보다 속도라서 ${winnerName} 쪽입니다.`,
        `위스키는 조명부터 찾고, 소주는 안주 나오기 전에 이미 대화가 풀립니다. 오늘 술자리는 멋보다 템포입니다.`,
        `위스키는 천천히 앉히는 술이고, 소주는 자리를 빨리 데우는 술입니다. 오늘은 말문 열리는 쪽이 이깁니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-soju-scene`))
      : pick([
        `소주는 판을 빨리 키우고, 위스키는 잔 하나로 시간을 천천히 끕니다. 오늘은 떠들썩함보다 폼 잡고 오래 가는 쪽입니다.`,
        `소주는 시작이 빠른 대신 끝도 빠르게 흐려질 수 있습니다. 위스키는 잔을 들고 있는 시간까지 오늘의 연출입니다.`,
        `소주는 웃음이 먼저 터지고, 위스키는 말 사이에 잠깐 여백을 만듭니다. 오늘은 그 여백이 더 맛있습니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-whisky-scene`));
    return cleanPlayTone(`${line} ${signNudge}`);
  }

  if (category === "travel" && hasRaw(["캠핑", "리조트"])) {
    const line = winnerHas(["리조트"])
      ? pick([
        `캠핑은 도착하기 전부터 짐이 말을 겁니다. 리조트는 문 여는 순간 몸이 먼저 퇴근합니다. 오늘은 추억보다 회복이 먼저라 ${winnerName} 쪽입니다.`,
        `캠핑은 불멍까지 가면 좋은데, 그 전에 장비와 정리가 줄을 섭니다. 리조트는 카드키 받는 순간 이미 쉬는 편입니다.`,
        `캠핑은 하루를 직접 만들어야 하고, 리조트는 하루가 차려져 있습니다. 오늘은 내가 덜 움직이는 휴식이 더 세 보입니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-resort-scene`))
      : pick([
        `리조트는 몸이 편한데, 캠핑은 불 피우는 순간 하루가 이야기가 됩니다. 오늘은 편함보다 직접 만든 추억이 앞섭니다.`,
        `리조트는 문 열면 쉬지만, 캠핑은 짐 푸는 순간부터 "우리 뭐 좀 했다"가 생깁니다. 오늘은 귀찮음까지 추억으로 넣는 쪽입니다.`,
        `리조트는 깔끔하고 캠핑은 손이 갑니다. 그런데 오늘은 그 손 가는 과정이 오히려 할 말이 됩니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-camping-scene`));
    return cleanPlayTone(`${line} ${signNudge}`);
  }

  if (category === "travel") {
    const wFeatures = (winner.features || []).filter(Boolean);
    const lFeatures = (loser.features || []).filter(Boolean);
    const f0 = escapeHtml(wFeatures[0] || `${winnerName}에서 하루가 바뀌는 느낌`);
    const f1 = escapeHtml(wFeatures[1] || "다녀온 뒤 남는 이야기");
    const f2 = escapeHtml(wFeatures[2] || "사진첩에 남을 장면");
    const l0 = escapeHtml(lFeatures[0] || `${loserName}의 다른 매력`);
    const l1 = escapeHtml(lFeatures[1] || "반대쪽 코스");
    const winnerVibe = escapeHtml(winner.vibe || "여행");
    const travelScenes = [
      `${winnerName}은 출발 전부터 ${f0}부터 떠오릅니다. ${loserName}의 ${l0}도 끌리지만, 오늘은 코스가 눈앞에 더 잘 이어지는 쪽입니다.`,
      `사진첩 기준으로 보면 ${winnerName} 쪽이 조금 더 말을 겁니다. ${f2} 쪽으로 한 장 남기기 좋고, 돌아와서도 "거기 괜찮았지" 할 장면이 있습니다.`,
      `${winnerName}은 밥 먹고 다음 코스로 넘어가는 그림이 덜 끊깁니다. ${f1}가 붙어서 하루 계획을 짜기 편한 쪽입니다.`,
      `${loserName}에도 ${l1}가 있긴 한데, 오늘 여행은 고민을 길게 늘리는 것보다 ${winnerName}처럼 바로 그려지는 코스가 이깁니다.`,
      `${winnerName}은 이름을 듣자마자 하루의 온도가 잡힙니다. ${winnerVibe} 쪽으로 마음이 기울고, ${loserName}은 다음 여행 후보석에 앉습니다.`,
      `오늘은 멀리 거창한 이유보다 "가면 뭐 하지?"가 바로 나오는지가 큽니다. ${winnerName}은 ${f0}, ${f1}가 붙어서 계획이 덜 뻣뻣합니다.`,
      `${winnerName} 쪽은 도착한 뒤 첫 두 시간이 빨리 그려집니다. ${loserName}도 좋은데, 오늘은 움직이는 동선이 더 자연스러운 쪽입니다.`,
      `${winnerName}은 다녀오고 나서 설명하기 쉬운 여행입니다. ${f2} 하나만 남아도 오늘 갈림길 값은 합니다.`,
      `지금 필요한 건 여행지 이름 자체보다 하루가 어떻게 흘러갈지입니다. ${winnerName}은 ${f0}부터 ${f1}까지 이어지는 느낌이 더 또렷합니다.`,
      `${loserName}은 조용히 손을 들고 있지만, ${winnerName}은 벌써 지도 앱에서 핀을 꽂고 있습니다. 오늘은 바로 움직일 수 있는 쪽입니다.`
    ];
    const signTravelAngles = {
      "양자리": ["양자리는 검색보다 출발 버튼이 빠른 날입니다.", "양자리는 복잡하게 따지기 전에 신발부터 봅니다."],
      "황소자리": ["황소자리는 돌아와서 덜 지치는 코스를 좋아합니다.", "황소자리는 편한 동선과 확실한 만족을 같이 봅니다."],
      "쌍둥이자리": ["쌍둥이자리는 돌아와서 할 얘기가 많은 쪽에 약합니다.", "쌍둥이자리는 코스보다 수다거리를 먼저 챙깁니다."],
      "게자리": ["게자리는 장소보다 같이 갔을 때 마음이 편한지를 봅니다.", "게자리는 사진보다 그날 기분이 오래 남는 쪽입니다."],
      "사자자리": ["사자자리는 여행에서도 오늘의 컷이 살아야 합니다.", "사자자리는 나중에 말했을 때 폼 나는 쪽을 봅니다."],
      "처녀자리": ["처녀자리는 이동, 비용, 피로를 머릿속에서 이미 줄 세웠습니다.", "처녀자리는 즉흥보다 하루가 덜 꼬이는 쪽을 좋아합니다."],
      "천칭자리": ["천칭자리는 사진, 기분, 피로가 적당히 맞는 쪽을 봅니다.", "천칭자리는 너무 빡세지도 심심하지도 않은 코스를 찾습니다."],
      "전갈자리": ["전갈자리는 겉핥기보다 마음에 깊게 남는 쪽을 봅니다.", "전갈자리는 대충 다녀오는 여행을 별로 안 좋아합니다."],
      "사수자리": ["사수자리는 경험치가 남으면 피로도 어느 정도 용서합니다.", "사수자리는 답답하면 일단 멀어지는 쪽입니다."],
      "염소자리": ["염소자리는 다녀온 뒤 일정과 지갑까지 같이 봅니다.", "염소자리는 나중에 봐도 잘 골랐다 싶은 쪽을 고릅니다."],
      "물병자리": ["물병자리는 정석 코스보다 내 방식대로 움직이는 여행을 봅니다.", "물병자리는 남들이 추천한 곳보다 이상하게 끌리는 쪽을 봅니다."],
      "물고기자리": ["물고기자리는 사진보다 여운이 오래 갈 선택에 약합니다.", "물고기자리는 다녀와서 마음에 잔잔하게 남는 쪽을 봅니다."]
    };
    const scene = pick(travelScenes, hashText(`${question}-${winner.name}-${loser.name}-${signName}-${seed}-${cardText}-travel-scene`));
    const angle = pick(signTravelAngles[signName] || [signNudge], hashText(`${question}-${winner.name}-${signName}-${seed}-travel-angle`));
    return cleanPlayTone(`${scene} ${angle}`);
  }

  if (category === "daily" && hasRaw(["버스", "택시"])) {
    const line = winnerHas(["택시"])
      ? pick([
        `버스는 돈을 아끼고, 택시는 오늘의 인내심을 아낍니다. 지금은 지갑보다 도착했을 때 표정이 더 중요합니다.`,
        `버스 정류장에 서 있는 나도 보이지만, 택시 문 닫는 순간의 안도감이 더 큽니다. 오늘은 시간을 사는 쪽입니다.`,
        `버스는 착하지만 기다림이 붙어옵니다. 택시는 비싸도 문 앞에서 내리는 순간 변명이 줄어듭니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-taxi-scene`))
      : pick([
        `택시는 몸을 살리고, 버스는 지갑을 살립니다. 오늘은 조금 늦어도 통장이 덜 째려보는 쪽입니다.`,
        `택시가 손짓하긴 하는데, 버스는 타고 나면 "그래 이 정도면 됐다"가 나옵니다. 오늘은 돈 쓰는 속도를 늦춥니다.`,
        `택시는 빠르고 버스는 버팁니다. 이상하게 오늘은 그 버티는 쪽이 나중에 덜 찝찝합니다.`
      ], hashText(`${question}-${winner.name}-${signName}-${seed}-bus-scene`));
    return cleanPlayTone(`${line} ${signNudge}`);
  }
  const style = {
    "양자리": {
      pet: [`양자리는 오래 고민하기 전에 이미 리드줄부터 봅니다. ${winnerName} 쪽은 반응이 바로 오고, 같이 움직이는 하루가 먼저 떠오릅니다. ${loserName}도 좋지만 오늘은 조용한 관찰보다 직접 부딪히는 애착이 더 셉니다.`],
      amusement: [`양자리는 줄 서는 시간보다 타는 순간을 먼저 봅니다. ${winnerName} 쪽은 "일단 가자"가 빨리 나오는 선택입니다. ${loserName}은 아직 지도 보고 있는데 몸은 이미 이쪽으로 출발했습니다.`],
      hobby: [`양자리는 고민보다 시작 버튼이 빠릅니다. ${winnerName} 쪽은 들어가자마자 바로 놀 수 있는 그림이 큽니다. ${loserName}도 좋지만 오늘은 일단 터뜨리는 재미가 앞섭니다.`],
      relationship: [`양자리는 기다리다가 속 터지는 걸 싫어합니다. ${winnerName} 쪽은 마음을 행동으로 바꾸는 느낌이 큽니다. ${loserName}도 안전하지만 오늘은 움직여서 확인하는 쪽입니다.`]
    },
    "황소자리": {
      pet: [`황소자리는 예쁜 순간보다 같이 살 때의 편안함을 봅니다. ${winnerName} 쪽은 매일 반복되는 루틴이 덜 거칠게 느껴집니다. ${loserName}도 좋지만 오늘은 오래 편하게 맞출 수 있는 쪽입니다.`],
      amusement: [`황소자리는 신나는 것보다 돌아와서 덜 넉다운 되는지를 봅니다. ${winnerName} 쪽은 하루를 너무 몰아붙이지 않는 그림이 있습니다. ${loserName}도 재밌지만 오늘은 체력이 덜 삐지는 쪽입니다.`],
      hobby: [`황소자리는 편하게 앉아 오래 즐길 수 있는 쪽을 좋아합니다. ${winnerName} 쪽은 시작부터 몸이 덜 귀찮아합니다. ${loserName}도 좋지만 오늘은 부담 적은 재미가 앞섭니다.`],
      relationship: [`황소자리는 관계에서도 편한 거리감을 봅니다. ${winnerName} 쪽은 무리해서 분위기를 키우기보다 안정적으로 만나는 그림입니다. ${loserName}도 가능하지만 오늘은 마음이 덜 지치는 쪽입니다.`]
    },
    "쌍둥이자리": {
      pet: [`쌍둥이자리는 반려동물도 대화가 생기는 쪽에 끌립니다. ${winnerName} 쪽은 매일 새로운 반응을 관찰하는 재미가 있습니다. ${loserName}도 매력 있지만 오늘은 더 궁금한 쪽입니다.`],
      amusement: [`쌍둥이자리는 놀이공원에서도 할 말이 많은 코스를 고릅니다. ${winnerName} 쪽은 기다리는 동안에도 얘깃거리가 생길 가능성이 큽니다. ${loserName}도 좋지만 오늘은 더 수다스러운 하루입니다.`],
      hobby: [`쌍둥이자리는 한 가지 재미보다 중간중간 말이 터지는 쪽에 약합니다. ${winnerName} 쪽은 끝나고도 할 얘기가 남습니다. ${loserName}도 좋지만 오늘 호기심은 이쪽입니다.`],
      relationship: [`쌍둥이자리는 거리를 고르면서도 대화를 먼저 상상합니다. ${winnerName} 쪽은 만나기 전부터 할 말이 생기는 선택입니다. ${loserName}은 조용히 앉아 있는데, 오늘 궁금증은 이미 신발을 신었습니다.`]
    },
    "게자리": {
      pet: [`게자리는 귀여움보다 마음이 붙는 방식을 봅니다. ${winnerName} 쪽은 돌봄과 애착의 온도가 더 잘 맞아 보입니다. ${loserName}도 좋지만 오늘은 같이 있을 때 마음이 덜 허전한 쪽입니다.`],
      amusement: [`게자리는 놀이기구보다 같이 간 사람의 표정을 먼저 봅니다. ${winnerName} 쪽은 하루 끝에 마음이 더 따뜻하게 남을 가능성이 있습니다. ${loserName}도 좋지만 오늘은 추억의 온도입니다.`],
      hobby: [`게자리는 노는 방식에서도 같이 있는 사람의 기분을 봅니다. ${winnerName} 쪽은 끝나고 마음이 덜 비는 선택입니다. ${loserName}도 좋지만 오늘은 감정이 덜 튀는 쪽입니다.`],
      relationship: [`게자리는 장소보다 마음의 부담을 먼저 봅니다. ${winnerName} 쪽은 상대와 나 사이의 온도를 덜 거칠게 만듭니다. ${loserName}도 가능하지만 오늘은 덜 서운한 쪽입니다.`]
    },
    "사자자리": {
      pet: [`사자자리는 반려동물도 존재감 있는 그림을 봅니다. ${winnerName} 쪽은 집 안 분위기를 확 바꾸는 힘이 있습니다. ${loserName}도 좋지만 오늘은 더 주인공 같은 동거입니다.`],
      amusement: [`사자자리는 오늘 하루가 좀 폼 나야 합니다. ${winnerName} 쪽은 사진과 리액션이 더 크게 남는 선택입니다. ${loserName}도 좋지만 오늘의 컷은 이쪽입니다.`],
      hobby: [`사자자리는 조용히 사라지는 재미보다 한 방 있는 재미를 봅니다. ${winnerName} 쪽은 끝나고 "오늘 좀 놀았다"가 나옵니다. ${loserName}도 좋지만 오늘은 존재감입니다.`],
      relationship: [`사자자리는 애매하게 눈치 보는 그림을 싫어합니다. ${winnerName} 쪽은 내가 어떤 태도인지 더 분명하게 보입니다. ${loserName}도 가능하지만 오늘은 당당한 쪽입니다.`]
    },
    "처녀자리": {
      pet: [`처녀자리는 귀여움보다 관리표를 먼저 봅니다. ${winnerName} 쪽은 산책, 털, 생활패턴까지 계산했을 때 더 정리가 됩니다. ${loserName}도 좋지만 오늘은 감당 가능한 루틴이 중요합니다.`],
      amusement: [`처녀자리는 놀이공원도 동선과 대기시간부터 계산합니다. ${winnerName} 쪽은 하루 계획이 덜 꼬이는 선택입니다. ${loserName}도 좋지만 오늘은 피로 관리가 먼저입니다.`],
      hobby: [`처녀자리는 재미도 시간표 안에 들어와야 편합니다. ${winnerName} 쪽은 시작과 끝이 더 관리될 것 같습니다. ${loserName}도 좋지만 오늘은 뒤처리가 덜 복잡한 쪽입니다.`],
      relationship: [`처녀자리는 만남도 동선과 부담을 같이 봅니다. ${winnerName} 쪽은 누가 얼마나 움직이는지 계산했을 때 덜 찝찝합니다. ${loserName}도 가능하지만 오늘은 기준이 있는 쪽입니다.`]
    },
    "천칭자리": {
      pet: [`천칭자리는 애착과 생활 균형을 같이 봅니다. ${winnerName} 쪽은 예쁨과 부담 사이의 저울이 덜 흔들립니다. ${loserName}도 좋지만 오늘 균형은 이쪽입니다.`],
      amusement: [`천칭자리는 놀이기구, 사진, 피로의 균형을 봅니다. ${winnerName} 쪽은 과하게 지치지 않으면서 하루가 예쁘게 남습니다. ${loserName}도 좋지만 오늘 그림은 이쪽입니다.`],
      hobby: [`천칭자리는 재미와 분위기가 둘 다 맞아야 움직입니다. ${winnerName} 쪽은 같이 있어도 혼자 있어도 덜 어색한 선택입니다. ${loserName}도 좋지만 오늘 저울은 이쪽입니다.`],
      relationship: [`천칭자리는 누가 더 움직이는지보다 관계의 균형을 봅니다. ${winnerName} 쪽은 부담이 한쪽으로 덜 쏠립니다. ${loserName}도 가능하지만 오늘은 모양이 덜 삐뚤어지는 쪽입니다.`]
    },
    "전갈자리": {
      pet: [`전갈자리는 귀여움보다 깊게 붙는 애착을 봅니다. ${winnerName} 쪽은 한 번 마음이 가면 오래 몰입할 그림입니다. ${loserName}도 좋지만 오늘은 더 진하게 남는 쪽입니다.`],
      amusement: [`전갈자리는 대충 즐기는 하루보다 제대로 꽂히는 하루를 원합니다. ${winnerName} 쪽은 지치더라도 몰입도가 더 큽니다. ${loserName}도 좋지만 오늘은 깊게 파고드는 재미입니다.`],
      hobby: [`전갈자리는 시간 가는 줄 모르는 몰입을 봅니다. ${winnerName} 쪽은 시작하면 끝까지 붙잡을 가능성이 큽니다. ${loserName}도 좋지만 오늘은 대충 놀기 싫은 날입니다.`],
      relationship: [`전갈자리는 애매한 거리감을 싫어합니다. ${winnerName} 쪽은 내가 어디까지 움직일지 더 확실히 보여줍니다. ${loserName}도 가능하지만 오늘은 결론이 진한 쪽입니다.`]
    },
    "사수자리": {
      pet: [`사수자리는 같이 움직일 수 있는 에너지를 봅니다. ${winnerName} 쪽은 일상에 작은 모험이 더 자주 생길 수 있습니다. ${loserName}도 좋지만 오늘은 경험치가 남는 쪽입니다.`],
      amusement: [`사수자리는 피곤해도 놀 거리 많은 쪽을 그냥 못 지나칩니다. ${winnerName} 쪽은 하루가 더 크게 열립니다. ${loserName}도 좋지만 오늘은 가보자 쪽입니다.`],
      hobby: [`사수자리는 재미있으면 일단 들어갑니다. ${winnerName} 쪽은 끝나고 할 말이 더 남을 선택입니다. ${loserName}도 좋지만 오늘은 경험치입니다.`],
      relationship: [`사수자리는 거리를 핑계로 멈추기보다 한 번 움직여봅니다. ${winnerName} 쪽은 나중에 이야기라도 남습니다. ${loserName}도 가능하지만 오늘은 가보는 쪽입니다.`]
    },
    "염소자리": {
      pet: [`염소자리는 반려동물을 책임의 단위로 봅니다. ${winnerName} 쪽은 오래 감당할 수 있는 루틴인지가 먼저입니다. ${loserName}도 좋지만 오늘은 현실적인 지속성이 중요합니다.`],
      amusement: [`염소자리는 재미 뒤에 남는 피로와 비용도 봅니다. ${winnerName} 쪽은 다녀온 뒤에도 덜 후회할 선택입니다. ${loserName}도 좋지만 오늘은 결과가 남는 쪽입니다.`],
      hobby: [`염소자리는 놀아도 다음 날을 망치지 않는지를 봅니다. ${winnerName} 쪽은 재미와 시간 관리 사이가 조금 더 낫습니다. ${loserName}도 좋지만 오늘은 덜 무너지는 쪽입니다.`],
      relationship: [`염소자리는 만남도 책임과 배려를 같이 봅니다. ${winnerName} 쪽은 나중에 봐도 덜 민망한 선택입니다. ${loserName}도 가능하지만 오늘은 오래 갈 기준입니다.`]
    },
    "물병자리": {
      pet: [`물병자리는 남들이 말하는 정답보다 나랑 맞는 리듬을 봅니다. ${winnerName} 쪽은 조금 더 독특한 동거 그림이 있습니다. ${loserName}도 좋지만 오늘은 내 방식입니다.`],
      amusement: [`물병자리는 뻔한 코스보다 다르게 노는 하루를 봅니다. ${winnerName} 쪽은 예상 밖으로 재밌을 가능성이 있습니다. ${loserName}도 좋지만 오늘은 반전입니다.`],
      hobby: [`물병자리는 남들 다 하는 재미보다 내 취향에 꽂히는 쪽을 봅니다. ${winnerName} 쪽은 조금 더 내 방식으로 놀 수 있습니다. ${loserName}도 좋지만 오늘은 개성입니다.`],
      relationship: [`물병자리는 관계도 정석대로만 움직이지 않습니다. ${winnerName} 쪽은 남들이 보기엔 애매해도 나한텐 말이 됩니다. ${loserName}도 가능하지만 오늘은 다른 각도입니다.`]
    },
    "물고기자리": {
      pet: [`물고기자리는 반려동물과의 감정선을 먼저 봅니다. ${winnerName} 쪽은 마음이 더 부드럽게 붙는 그림입니다. ${loserName}도 좋지만 오늘은 덜 외로운 쪽입니다.`],
      amusement: [`물고기자리는 놀이기구보다 하루가 끝난 뒤의 여운을 봅니다. ${winnerName} 쪽은 피곤해도 마음에 남는 장면이 있습니다. ${loserName}도 좋지만 오늘은 감정의 잔상입니다.`],
      hobby: [`물고기자리는 취미도 기분을 달래주는 쪽을 고릅니다. ${winnerName} 쪽은 끝나고 마음이 덜 출렁입니다. ${loserName}도 좋지만 오늘은 위로가 되는 재미입니다.`],
      relationship: [`물고기자리는 장소보다 잠들기 전 마음을 봅니다. ${winnerName} 쪽은 오늘 밤 덜 출렁일 선택입니다. ${loserName}도 가능하지만 오늘은 마음이 덜 무거운 쪽입니다.`]
    }
  };
  const categoryPool = style[signName] && style[signName][category];
  if (categoryPool && categoryPool.length) {
    return cleanPlayTone(pick(categoryPool, hashText(`${question}-${winner.name}-${loser.name}-${signName}-${seed}-${cardText}-same-result`)));
  }
  if (category === "food") {
    const line = zodiacSceneLine("food", sign, winner, loser, question, seed, "same-food");
    const scene = optionSceneVariant("food", winner, loser, question, sign, seed);
    if (line || scene) return cleanPlayTone(`${line} ${scene}`);
  }
  return null;
}

function playfulRealityReason(category, winner, loser, question) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerTopic = withParticle(winner.name, "은", "는");
  const loserTopic = withParticle(loser.name, "은", "는");
  const subject = escapeHtml(optionDisplayName(winner, category));
  const loserSubject = escapeHtml(optionDisplayName(loser, category));
  const first = winner.features[0] || "바로 체감되는 장점";
  const second = winner.features[1] || "끝나고 남는 느낌";
  const loserFirst = loser.features[0] || "반대쪽 장점";
  const opening = realityOpeningLine(category, winner, loser, question);
  const feature = featurePairText(first, second);
  const pools = {
    beverage: [
      `${opening} ${winnerTopic} ${escapeHtml(first)}, ${escapeHtml(second)} 때문에 컵을 들었을 때 바로 답이 옵니다.`,
      `${winnerTopic} 한 모금 뒤 표정이 덜 애매합니다. ${loserName}도 좋지만 오늘 컵은 이쪽으로 기웁니다.`
    ],
    gift: [
      `${winnerName}은 받는 순간 표정이 먼저 튈 가능성이 큽니다. ${loserName}도 좋지만 오늘 리액션 담당은 ${winnerName}입니다.`,
      `${subject} 쪽은 ${feature} 쪽이라 포장 뜯는 순간이 더 재밌습니다.`
    ],
    relationship: [
      `${subject} 쪽은 마음속 소리를 밖으로 조금 꺼내는 선택입니다. ${loserSubject}는 편하지만 폰을 계속 보게 만들 수 있어요.`,
      `${winnerTopic} 보내고 나서 떨릴 수는 있어도, 혼자 상상 시즌2 찍는 시간은 줄여줍니다.`
    ],
    shopping: [
      `${opening} ${subject} 쪽은 ${feature} 쪽이라 사고 나서 쓸 순간이 바로 떠오릅니다.`,
      `${winnerTopic} 손가락이 결제 버튼 근처까지 간 선택입니다. ${loserTopic} 지갑이 옆에서 팔짱 끼고 보는 쪽이고요.`
    ],
    attendance: [
      `${winnerName}은 오늘 귀찮고, ${loserName}은 내일 찝찝할 수 있습니다. 오늘은 어느 쪽 욕을 덜 먹을지 싸움이에요.`,
      `${subject} 쪽은 지금 몸은 투덜대도 나중에 일이 덜 쌓이는 편입니다.`
    ],
    money: [
      `${winnerName}은 계좌 앞에서 손을 덜 떨게 하는 쪽입니다. ${loserName}은 맞으면 좋지만 틀리면 꽤 시끄럽습니다.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 돈 문제는 멋보다 잠이 잘 오는지가 꽤 중요합니다.`
    ],
    drink: [
      `${winnerName}은 오늘 밤을 살리고, ${loserName}은 내일 아침을 살립니다. 오늘 별은 일단 덜 후회할 쪽을 찍었습니다.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 술잔보다 알람이 더 무섭다면 답은 빨리 나옵니다.`
    ],
    childcare: [
      `${winnerName}은 아이 웃음과 어른 체력을 같이 봤을 때 덜 빡센 쪽입니다. ${loserName}도 좋지만 돌아오는 길까지 생각해야죠.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 아이가 웃어도 보호자가 방전되면 엔딩이 조금 흐립니다.`
    ],
    hygiene: [
      `${winnerName}은 시작 전 5분만 귀찮고, 끝나면 몸이 바로 편을 듭니다. ${loserName}은 지금은 편한데 찝찝함이 오래 남을 수 있어요.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 물 틀기 전까지만 세상 귀찮은 선택입니다.`
    ],
    exercise: [
      `${winnerName}은 하기 전엔 싫고 끝나면 괜히 뿌듯한 쪽입니다. ${loserName}은 소파가 박수치는 선택이고요.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 운동화가 오늘은 장식품 탈출을 노립니다.`
    ],
    study: [
      `${winnerName}은 미래의 내가 덜 째려보는 쪽입니다. ${loserName}은 지금은 달콤한데 마감이 뒤에서 웃고 있어요.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 책상에 앉는 순간 이미 반은 이겼습니다.`
    ],
    game: [
      `${winnerName}은 재미 담당이고, ${loserName}은 시간 담당입니다. 오늘은 종료 버튼 누를 자신까지 같이 봐야 합니다.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 한 판이 세 판 되는 마법만 조심하면 됩니다.`
    ],
    pet: [
      `${winnerTopic} 귀여움보다 생활 리듬을 먼저 바꾸는 선택입니다. ${loserName}도 좋지만 오늘은 같이 사는 하루를 더 잘 상상해야 합니다.`,
      `${subject} 쪽은 반려동물의 성격, 애착, 생활패턴을 같이 보는 선택입니다. 예쁜 순간보다 매일 반복되는 루틴이 진짜 본편입니다.`
    ],
    amusement: [
      `${winnerTopic} 놀이기구보다 대기줄과 체력까지 같이 데려오는 선택입니다. ${loserName}도 좋지만 오늘은 다 놀고 난 다리 상태까지 봐야 합니다.`,
      `${subject} 쪽은 놀이기구, 대기시간, 체력을 같이 보는 선택입니다. 설렘도 크지만 돌아오는 길 표정이 승부를 가릅니다.`
    ],
    hobby: [
      `${winnerName}은 시작하면 시간이 사라지는 쪽입니다. ${loserName}도 좋지만 오늘은 재미와 체력 소모를 같이 봐야 합니다.`,
      `${subject} 쪽은 재미, 시간, 비용을 같이 보는 선택입니다. 취미 선택은 시작보다 끝낼 타이밍이 더 어렵습니다.`
    ],
    travel: [
      winner.intent === "skip"
        ? `${winnerTopic} 텐트 대신 집 천장을 고르는 쪽입니다. ${loserTopic} 바람은 좋지만 짐 싸는 순간부터 일이 커집니다.`
        : `${winnerTopic} 귀찮음 위에 바람 한 컵 붓는 선택입니다. ${loserTopic} 돈과 체력을 아끼는 쪽이고요.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 다녀오면 피곤해도 얘깃거리는 남습니다.`
    ],
    place: [
      `${winnerName}은 나가서 뭐라도 생기는 쪽입니다. ${loserName}은 체력과 지갑이 덜 삐지는 쪽이고요.`,
      `${subject} 쪽은 ${feature} 쪽입니다. 돌아오는 길 표정까지 생각하면 이쪽이 조금 낫습니다.`
    ]
  };
  if (category === "shopping" && includesAny(`${winner.subjectName || ""} ${loser.subjectName || ""} ${question}`.toLowerCase(), ["tv", "티비", "텔레비전", "테레비"])) {
    const tvPool = winner.intent === "go" ? [
      `TV를 바꾸면 리모컨 누르는 순간부터 기분이 달라집니다. 대신 카드값도 같이 큰 화면으로 등장합니다.`,
      `새 TV는 화질로 꼬시고, 기존 TV는 예산으로 버팁니다. 오늘은 화면 쪽 욕심이 조금 더 셉니다.`
    ] : [
      `TV를 그냥 보면 화면은 그대로지만 통장은 조용히 웃습니다. 새 화질은 다음 시즌으로 미뤄둡시다.`,
      `새 TV는 거실에서 손짓하지만, 오늘은 리모컨보다 예산이 더 큰소리칩니다.`
    ];
    return cleanPlayTone(pick(tvPool, hashText(`${question}-${winner.name}-${loser.name}-tv-play`)));
  }
  if (category === "relationship" && includesAny(String(question).toLowerCase(), ["친구", "약속", "만난다", "만날까"])) {
    const friendPool = includesAny(`${winner.name}`.toLowerCase(), ["일찍", "집", "들어", "안"]) ? [
      `친구 약속도 좋지만 오늘은 집 문이 꽤 설득력 있습니다. 나가면 재밌고, 들어가면 내일의 내가 덜 째려봅니다.`,
      `친구는 보고 싶고 침대도 보고 싶습니다. 오늘은 침대 쪽 영업력이 조금 더 셉니다.`
    ] : [
      `집도 좋지만 친구 얼굴 보면 바로 말 많아질 날입니다. 나가서 웃고 오면 오늘 하루가 덜 납작해집니다.`,
      `일찍 들어가는 것도 어른스럽지만, 오늘은 친구 만나서 쓸데없는 얘기 좀 하는 쪽이 더 삽니다.`
    ];
    return cleanPlayTone(pick(friendPool, hashText(`${question}-${winner.name}-${loser.name}-friend-play`)));
  }
  const pool = pools[category] || [
    `${winnerName}은 지금 바로 다음 장면으로 넘어가는 선택입니다. ${loserName}은 머릿속에서 아직 말이 많습니다.`,
    `${subject} 쪽은 ${feature} 쪽이라 끝나고 "아 몰라, 됐다"가 조금 더 빨리 나옵니다.`
  ];
  return cleanPlayTone(pick(pool, hashText(`${question}-${winner.name}-${loser.name}-${category}-play`)));
}

function inferredRealityReason(category, winner, loser, question) {
  if (!winner.inferred && !loser.inferred) return null;
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerTopic = escapeHtml(withParticle(winner.name, "은", "는"));
  const first = escapeHtml(winner.features[0] || "바로 달라지는 장면");
  const second = escapeHtml(winner.features[1] || "끝나고 남는 느낌");
  const loserFirst = escapeHtml(loser.features[0] || "반대쪽 장점");
  const pools = {
    travel: [
      `${winnerTopic} 고르면 하루의 속도가 먼저 바뀝니다. ${first}이 떠오르고, ${second}도 같이 따라옵니다. ${loserName}은 아직 일정표 안에서 머뭇거립니다.`,
      `${winnerName}을 고르면 여행이 조금 더 쉽게 시작되는 느낌입니다. ${first}, 그리고 ${second} 쪽이라 오늘의 나는 ${loserName}보다 이쪽을 더 편하게 떠올립니다.`
    ],
    shopping: [
      `${winnerTopic} 사고 나서 바로 쓰는 내가 먼저 떠오릅니다. ${first}, ${second}가 붙어서 지름신이 그냥 헛소리만 하는 건 아닌 듯합니다. ${loserName}도 좋지만 오늘은 ${winnerName} 쪽이 더 손에 잡힙니다.`,
      `${winnerTopic} 결제 직후보다 며칠 뒤의 내가 더 중요합니다. ${first}, ${second} 쪽이라 지금 마음이 실제 생활까지 따라갈 가능성이 있어 보입니다.`
    ],
    food: [
      `${winnerTopic} 먹고 난 뒤 표정이 먼저 떠오릅니다. ${first}, ${second}가 보이고, ${loserName}은 ${loserFirst} 쪽으로 따라옵니다. 오늘은 ${winnerName}으로 닫아도 덜 궁시렁댈 날입니다.`,
      `${winnerName}을 고르면 식탁에서 바로 달라지는 건 ${first}입니다. ${loserName}은 다음 끼니에 다시 부르면 됩니다.`
    ],
    daily: [
      `${winnerTopic} 끝나고 난 내 표정이 먼저 보입니다. ${first}, ${second}가 있어서 오늘은 ${loserName}보다 덜 꼬일 가능성이 있습니다.`,
      `${winnerTopic} 지금보다 끝나고 남는 상태가 더 크게 보입니다. ${first}이 먼저 보이고, ${loserName}은 ${loserFirst} 쪽으로 버팁니다.`
    ]
  };
  const pool = pools[category] || [
    `${winnerTopic} 고르면 첫 번째로 달라지는 건 ${first}입니다. ${second}까지 따라오면 오늘 고민은 더 길게 끌 필요가 없습니다.`
  ];
  return cleanPlayTone(pick(pool, hashText(`${question}-${winner.name}-${loser.name}-${category}-inferred`)));
}

function categoryRealityReason(category, winner, loser, question, cards = [], sign = ["황소자리", "♉"], seed = 0) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const subject = escapeHtml(optionDisplayName(winner, category));
  const loserSubject = escapeHtml(optionDisplayName(loser, category));
  const first = escapeHtml(winner.features[0] || "바로 체감되는 장점");
  const second = escapeHtml(winner.features[1] || "끝나고 남는 느낌");
  const loserFirst = escapeHtml(loser.features[0] || "반대 선택의 장점");
  const loserFirstTopic = withParticle(loser.features[0] || "반대 선택의 장점", "은", "는");
  const pair = featurePairText(winner.features[0] || "바로 체감되는 장점", winner.features[1] || "끝나고 남는 느낌");
  const opening = realityOpeningLine(category, winner, loser, question);
  const variedReason = sameResultDifferentReason(category, winner, loser, question, cards, sign, seed);
  if (variedReason && ["pet", "amusement", "hobby", "relationship", "beverage", "drink", "travel", "daily"].includes(category)) return variedReason;
  if (category === "food") {
    const foodReason = foodRealityReason(winner, loser, question, sign, seed);
    return variedReason || foodReason;
  }
  if (category === "game") return gameRealityReason(winner, loser, question);
  if (category === "shopping") {
    const consoleReason = gameConsoleReason(winner, loser, question, sign, seed);
    if (consoleReason) return consoleReason;
    const highValueReason = highValuePurchaseReason(winner, loser, question);
    if (highValueReason) {
      const sceneTone = zodiacSceneLine("shopping", sign, winner, loser, question, seed, "high-value-tone");
      const sceneVariant = optionSceneVariant("shopping", winner, loser, question, sign, seed);
      return cleanPlayTone(`${sceneTone} ${sceneVariant} ${highValueReason}`);
    }
  }
  const culturalReason = culturalRealityReason(winner, loser, question, sign, seed);
  if (culturalReason) return cleanPlayTone(`${categoryDecisionFrame(category, winner, loser, question)}${culturalReason}`);
  const inferredReason = inferredRealityReason(category, winner, loser, question);
  if (inferredReason) return cleanPlayTone(`${categoryDecisionFrame(category, winner, loser, question)}${inferredReason}`);
  return cleanPlayTone(`${categoryDecisionFrame(category, winner, loser, question)}${playfulRealityReason(category, winner, loser, question)}`);
}

function probabilityReason(category, winner, loser, winnerScore, loserScore) {
  const gap = winnerScore - loserScore;
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const loserTopic = withParticle(loser.name, "은", "는");
  const lightReason = {
    food: `${winnerName} 쪽이 먹고 나서 덜 궁시렁댈 선택입니다.`,
    beverage: `${winnerName} 컵이 오늘 손에 더 먼저 잡힙니다.`,
    gift: `${winnerName} 쪽이 뜯는 순간 반응이 더 좋아 보입니다.`,
    relationship: `${winnerName} 쪽이 폰을 덜 오래 쳐다보게 합니다.`,
    shopping: `${winnerName} 쪽이 지갑과 욕망 사이에서 조금 이깁니다.`,
    attendance: `${winnerName} 쪽이 내일의 나한테 덜 혼납니다.`,
    money: `${winnerName} 쪽이 계좌 앞에서 덜 떨립니다.`,
    drink: `${winnerName} 쪽이 내일 아침까지 덜 무섭습니다.`,
    childcare: `${winnerName} 쪽이 웃음과 체력 사이에서 조금 낫습니다.`,
    hygiene: `${winnerName} 쪽이 끝나고 몸이 덜 투덜댑니다.`,
    exercise: `${winnerName} 쪽이 끝나고 괜히 뿌듯할 확률이 높습니다.`,
    study: `${winnerName} 쪽이 내일의 압박을 조금 줄입니다.`,
    game: `${winnerName} 쪽이 재미와 시간 사이에서 오늘은 앞섭니다.`,
    travel: `${winnerName} 쪽이 다녀온 뒤 할 말이 더 남습니다.`,
    place: `${winnerName} 쪽이 나갔다 온 값이 조금 더 있습니다.`
  };
  if (gap <= 12) {
    if (category === "food") {
      const foodClosePool = [
        `거의 반반인데, 오늘은 ${winnerName} 먹고 집에 가는 그림이 덜 찝찝합니다.`,
        `${loserName}도 좋은데, 지금 고르면 ${winnerName} 쪽이 나중에 변명이 덜 필요합니다.`,
        `막상 주문 직전까지 가면 ${winnerName} 쪽으로 손이 갈 확률이 살짝 높습니다.`,
        `둘 다 괜찮아서 오래 끌면 배만 더 고픕니다. 오늘은 ${withRoParticle(winner.name)} 닫읍시다.`
      ];
      return cleanPlayTone(pick(foodClosePool, hashText(`${winner.name}-${loser.name}-${winnerScore}-${category}-food-close`)));
    }
    const closePool = [
      `AI도 마지막 3초까지 고민했습니다. 그래도 ${lightReason[category] || `${winnerName} 쪽이 한 끗 앞섭니다.`}`,
      `오늘은 동전 던졌어도 이상하지 않습니다. 그래도 ${winnerName} 쪽으로 살짝 굴러갔어요.`,
      `연장전 끝에 ${winnerName} 쪽이 겨우 이겼습니다. ${loserName}도 벤치에서 아직 안 일어났어요.`,
      `심판 판정까지 갔습니다. 오늘은 ${winnerName} 쪽 손을 아주 살짝 들어줍니다.`
    ];
    return cleanPlayTone(pick(closePool, hashText(`${winner.name}-${loser.name}-${winnerScore}-${category}-close`)));
  }
  if (gap <= 24) {
    const midPool = [
      `${lightReason[category] || `${winnerName} 쪽이 조금 앞섭니다.`} ${loserName}도 따라왔지만 막판 스퍼트가 부족했습니다.`,
      `중간까지 비볐는데 마지막에 ${winnerName} 쪽이 치고 나갔습니다.`,
      `${winnerName} 쪽이 오늘은 한 발 빨랐습니다. ${loserName}은 다음 판에서 바로 복수 가능합니다.`
    ];
    return cleanPlayTone(pick(midPool, hashText(`${winner.name}-${loser.name}-${winnerScore}-${category}-mid`)));
  }
  const strongPool = [
    `오늘은 ${winnerName} 쪽이 꽤 세게 들어왔습니다. ${loserTopic} 다음 판에서 다시 싸워봅시다.`,
    `${winnerName} 쪽이 초반부터 치고 나갔습니다. ${loserTopic} 추격하다가 숨이 찼습니다.`,
    `이건 꽤 확실한 승입니다. ${winnerName} 쪽이 먼저 결승선 밟았습니다.`
  ];
  return cleanPlayTone(pick(strongPool, hashText(`${winner.name}-${loser.name}-${winnerScore}-${category}-strong`)));
}

function realityOpeningLine(category, winner, loser, question) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const subject = escapeHtml(optionDisplayName(winner, category));
  const loserSubject = escapeHtml(optionDisplayName(loser, category));
  const first = winner.features[0] || "바로 느껴지는 장점";
  const loserFirst = loser.features[0] || "반대쪽 장점";
  const firstSubject = withParticle(first, "이", "가");
  const loserFirstInstrument = withRoParticle(loserFirst);
  const winnerTopic = withParticle(winner.name, "은", "는");
  const loserTopic = withParticle(loser.name, "은", "는");
  const raw = `${question} ${winner.name} ${loser.name}`.toLowerCase();
  if (category === "food") {
    if (includesAny(raw, ["김밥"]) && includesAny(raw, ["라면"])) {
      return includesAny(winner.name, ["김밥"])
        ? "오늘 배는 뜨거운 국물보다 깔끔하게 끝나는 쪽을 먼저 봤습니다."
        : "오늘은 깔끔함보다 뜨거운 국물 한 젓가락이 더 크게 들어왔습니다.";
    }
    if (includesAny(raw, ["소고기"]) && includesAny(raw, ["집밥"])) {
      return includesAny(winner.name, ["집밥"])
        ? "소고기는 확실히 끌리지만, 오늘은 밖에서 한 판 벌이기보다 집에서 편하게 끝내는 그림이 더 편해 보입니다."
        : "집밥은 편하지만, 오늘은 소고기처럼 확실히 기분 내는 한 끼가 더 선명합니다.";
    }
    if (includesAny(raw, ["짬뽕"]) && includesAny(raw, ["짜장"])) {
      return includesAny(winner.name, ["짬뽕"])
        ? "짜장면의 무난함이 붙잡았지만, 오늘 입은 얼큰한 국물 쪽으로 먼저 움직였습니다."
        : "배는 뜨거운 국물도 떠올렸지만, 오늘은 달달한 춘장 소스처럼 편하게 끝나는 쪽이 더 가까웠습니다.";
    }
  }
  if (category === "beverage" && includesAny(raw, ["아메리카노", "아아", "뜨아"])) {
    return includesAny(winner.name, ["아이스", "아아"])
      ? "따뜻한 잔도 나쁘지 않지만, 지금 손은 차갑게 깨는 쪽으로 먼저 갑니다."
      : "차가운 한 모금도 끌리지만, 오늘 몸은 따뜻하게 내려가는 쪽을 더 편하게 봅니다.";
  }
  if (category === "shopping" && includesAny(raw, ["닌텐도", "플스", "playstation", "ps5"])) {
    return `마음은 ${winnerName} 쪽 화면을 켜고 있는데, ${loserName}도 오래 고민하게 만드는 후보입니다.`;
  }
  if (category === "shopping" && includesAny(raw, ["tv", "티비", "텔레비전", "테레비"])) {
    return winner.intent === "go"
      ? "TV를 바꾸면 화질과 시청환경은 바로 달라집니다. 문제는 그 만족감 옆에 비용과 설치 고민도 같이 온다는 점이에요."
      : "지금 TV를 그냥 보면 돈은 지킵니다. 대신 화질, 화면 크기, 시청환경에 대한 아쉬움도 그대로 남아요.";
  }
  if (category === "place" && includesAny(raw, ["동물원"]) && includesAny(raw, ["놀이공원"])) {
    return includesAny(winner.name, ["놀이공원"])
      ? "동물원은 천천히 구경하는 재미가 있고, 놀이공원은 하루가 이벤트처럼 커지는 쪽입니다."
      : "놀이공원은 확실히 크지만, 오늘은 동물원처럼 천천히 구경하는 그림이 더 편해 보입니다.";
  }
  const byCategory = {
    food: [
      `${winnerTopic} ${firstSubject} 먼저 오고, ${loserTopic} ${loserFirstInstrument} 끝까지 유혹합니다.`,
      `오늘 입맛은 ${winnerName} 쪽으로 먼저 움직였고, ${loserName}은 마지막까지 후보석에 앉아 있습니다.`,
      `${winnerName}은 먹는 장면이 바로 떠오르고, ${loserName}은 먹고 난 뒤 느낌을 다시 보게 합니다.`,
      `젓가락은 ${winnerName} 쪽으로 갔고, 머리는 ${loserName}도 한 번 더 보라고 합니다.`,
      `오늘 한 끼는 거창한 정답보다, 먹고 나서 몸이 어떻게 느낄지가 더 크게 보입니다.`
    ],
    beverage: [
      `${winnerTopic} ${firstSubject} 먼저 오고, ${loserTopic} ${loserFirstInstrument} 마지막까지 붙잡습니다.`,
      `${winnerTopic} 지금 마시는 순간이 선명하고, ${loserTopic} 마신 뒤 몸 상태를 다시 보게 합니다.`,
      `커피는 맛보다 온도가 먼저 결정할 때가 있습니다. 오늘은 마신 뒤 몸의 느낌이 더 크게 보입니다.`,
      `손은 ${winnerName} 쪽 컵을 떠올리고, ${loserName}은 천천히 마시는 그림으로 따라옵니다.`
    ],
    gift: [
      `${winnerName}은 받는 순간의 반응이 먼저 보이고, ${loserName}은 오래 가지고 놀 그림이 따라옵니다.`,
      `선물은 물건보다 뜯는 순간의 표정이 먼저라서, ${winnerName}과 ${loserName}의 첫 장면부터 비교했습니다.`,
      `${winnerName}은 바로 반응을 만들고, ${loserName}은 며칠 뒤에도 손이 갈지로 승부합니다.`
    ],
    relationship: [
      `${subject}는 답을 빨리 확인하는 쪽이고, ${loserSubject}는 말을 아끼는 쪽입니다.`,
      `이건 누가 맞냐보다, 지금 말을 꺼냈을 때 상대가 받을 수 있느냐의 문제입니다.`,
      `${winnerName}은 마음을 밖으로 꺼내는 선택이고, ${loserName}은 조금 더 품고 가는 선택입니다.`,
      `보내는 건 금방이지만, 그 뒤의 대화까지 생각하면 ${winnerName} 쪽 그림이 더 선명합니다.`,
      `${loserName}은 조용히 넘어가는 길이고, ${winnerName}은 확인하고 넘어가는 길입니다.`
    ],
    shopping: [
      `${winnerName}은 바로 쓰는 장면이 보이고, ${loserName}은 카드값 앞에서 한 번 더 멈추게 합니다.`,
      `마음은 ${winnerName} 쪽을 보고 있는데, 지갑은 ${loserName} 쪽 의견도 조용히 냅니다.`,
      `${winnerName}은 갖는 순간이 선명하고, ${loserName}은 며칠 뒤에도 필요한지 묻습니다.`,
      `결제 직전의 손은 ${winnerName} 쪽으로 가지만, ${loserName}은 사용 빈도를 다시 묻습니다.`,
      `${winnerName}은 오늘 바로 생기는 변화가 있고, ${loserName}은 통장에 남는 여유가 있습니다.`
    ],
    attendance: [
      `${winnerTopic} 오늘을 어렵게 만들고, ${loserTopic} 내일 설명할 일을 만들 수 있습니다.`,
      `${winnerName}은 오늘의 피로를 감수하는 쪽이고, ${loserName}은 오늘 숨 쉴 공간을 만드는 쪽입니다.`,
      `${winnerName}은 내일 일을 덜 만들고, ${loserName}은 오늘 몸을 먼저 챙깁니다.`,
      `알람은 ${winnerName}을 가리키고, 몸은 ${loserName} 쪽에서 조용히 버팁니다.`,
      `${winnerName}은 책임 쪽에 가깝고, ${loserName}은 회복 쪽에 가깝습니다. 문제는 오늘 컨디션입니다.`
    ],
    money: [
      `${winnerName}은 결론을 미루지 않는 쪽이고, ${loserName}은 손실 가능성을 한 번 더 보는 쪽입니다.`,
      `차트는 ${winnerName} 쪽으로 속삭일 수 있지만, 계좌는 ${loserName}의 이유도 들어보라고 합니다.`,
      `투자는 맞히는 기분보다 틀렸을 때 버틸 수 있느냐가 먼저라서, ${winnerName}과 ${loserName}을 그 기준으로 봤습니다.`
    ],
    drink: [
      `${winnerName}은 오늘 밤을 살리고, ${loserName}은 내일 아침을 살립니다.`,
      `술잔은 지금을 부르고, 알람은 내일을 들이밉니다. 그 사이에서 ${winnerName}을 봤습니다.`,
      `${winnerName}은 분위기 쪽이고, ${loserName}은 컨디션 쪽입니다. 오늘은 둘 다 할 말이 있습니다.`
    ],
    childcare: [
      `${winnerName}은 아이 반응이 먼저 보이고, ${loserName}은 보호자 체력 계산이 따라옵니다.`,
      `아이와 가는 곳은 재미만 보면 안 됩니다. 돌아오는 길 표정까지 봐야 합니다.`,
      `${winnerName}도 좋고 ${loserName}도 좋지만, 오늘은 아이 속도와 보호자 체력이 먼저입니다.`
    ],
    hygiene: [
      `${winnerName}은 몸을 새로고침하는 쪽이고, ${loserName}은 귀찮음을 잠깐 이기는 쪽입니다.`,
      `샤워나 씻기 고민은 거창하지 않습니다. 물 틀기 전 5분과 끝난 뒤 개운함의 싸움입니다.`,
      `${winnerName}은 끝나고 몸이 가벼워지고, ${loserName}은 지금 당장 움직이지 않아도 되는 선택입니다.`
    ],
    exercise: [
      `${winnerName}은 끝나고 뿌듯한 쪽이고, ${loserName}은 지금 체력을 지키는 쪽입니다.`,
      `운동화는 ${winnerName}을 보고 있고, 소파는 ${loserName}을 붙잡고 있습니다.`,
      `${winnerName}과 ${loserName} 사이에서 오늘은 의지보다 몸 상태가 더 솔직합니다.`
    ],
    study: [
      `${winnerName}은 내일 압박을 줄이고, ${loserName}은 오늘 피로를 줄입니다.`,
      `책상은 ${winnerName} 쪽으로 불렀고, 이불은 ${loserName} 쪽에서 조용히 손짓했습니다.`,
      `${winnerName}은 진도 한 칸이고, ${loserName}은 오늘 머리를 쉬게 하는 선택입니다.`
    ],
    game: [
      `${winnerName}은 스트레스를 빨리 풀고, ${loserName}은 시간을 지키는 쪽입니다.`,
      `게임은 시작보다 종료가 문제라서, ${winnerName}과 ${loserName}을 플레이타임 기준으로 봤습니다.`,
      `${winnerName}은 재미가 선명하고, ${loserName}은 내일 컨디션이 선명합니다.`
    ],
    travel: [
      `${winnerName}은 일상을 벗어나는 쪽이고, ${loserName}은 비용과 체력을 지키는 쪽입니다.`,
      `여행은 떠나는 순간보다 돌아오는 길까지가 한 세트라서, ${winnerName}과 ${loserName}을 같이 봤습니다.`,
      `${winnerName}은 사진이 남고, ${loserName}은 예산이 남습니다. 오늘은 둘 다 꽤 현실적입니다.`
    ],
    place: [
      `${winnerName}은 오늘 장면을 만들고, ${loserName}은 동선과 체력을 아끼는 쪽입니다.`,
      `${winnerName}은 가는 순간의 재미가 있고, ${loserName}은 돌아오는 길의 체력까지 계산하게 합니다.`,
      `${winnerName}은 가서 볼 장면이 선명하고, ${loserName}은 이동 전부터 체력을 다시 계산하게 합니다.`,
      `${winnerName}은 하루를 크게 만들고, ${loserName}은 일정의 무게를 줄이는 쪽입니다.`,
      `${winnerName}은 도착한 뒤의 재미가 있고, ${loserName}은 돌아오는 길의 편함이 있습니다.`
    ]
  };
  const pool = byCategory[category] || [
    `${winnerName}은 바로 움직이는 쪽이고, ${loserName}은 한 번 더 생각하는 쪽입니다.`,
    `이 질문은 감보다 끝나고 남는 현실감으로 보는 게 더 맞습니다.`,
    `${winnerName}과 ${loserName} 사이에서 오늘은 실행 후 그림이 더 선명한 쪽을 봤습니다.`
  ];
  return pick(pool, hashText(`${question}-${winner.name}-${loser.name}-${category}`));
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

function signOpeningPool(signName, category, winner, loser, question) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerWithAnd = withParticle(winner.name, "과", "와");
  const loserSubject = withParticle(loser.name, "은", "는");
  const target = winner.targetName || loser.targetName || giftTarget(question);
  const targetSubject = withParticle(target, "이", "가");
  const targetPossessive = target === "아들" ? "아들의" : `${escapeHtml(target)}의`;
  const targetName = escapeHtml(target);
  const giftLine = {
    "양자리": [
      `${targetSubject} 포장을 뜯기도 전에 양자리는 이미 리액션 버튼을 눌렀습니다. ${winnerWithAnd} ${loserName} 중에서 "우와!"가 먼저 터질 쪽을 보고 있어요.`,
      `양자리는 선물 고민을 오래 들여다보지 않습니다. ${targetSubject} 뛰어올 장면이 보이면 그쪽으로 바로 갑니다.`,
      `${targetSubject} 박스를 여는 순간, 양자리는 이미 한 발 앞으로 나갔습니다. 오늘은 얌전한 선물보다 반응 큰 쪽이 먼저 보입니다.`,
      `양자리는 "일단 뜯어봐!" 쪽입니다. ${winnerWithAnd} ${loserName} 사이에서 첫 3초 리액션을 제일 크게 봅니다.`,
      `${targetSubject} 눈이 커지는 장면을 양자리가 먼저 상상했습니다. 선물은 설명보다 터지는 반응이 중요하다고 보는 날이에요.`,
      `양자리는 포장지보다 손이 빠릅니다. ${targetSubject} 받자마자 달려드는 쪽에 별이 먼저 움직였습니다.`,
      `양자리는 기다리는 선물보다 바로 놀기 시작하는 선물을 좋아합니다. 오늘은 첫 반응이 심사위원입니다.`,
      `${targetSubject} "이거 내 거야?" 하는 순간을 양자리가 먼저 잡았습니다. 얌전함보다 즉시 반응이 앞섭니다.`,
      `양자리는 선물 앞에서 설명서를 읽지 않습니다. ${targetSubject} 바로 만지고 싶어 할 쪽을 봅니다.`,
      `양자리는 이미 포장지를 찢는 소리를 들었습니다. 오늘 별은 오래 고민보다 바로 웃는 장면을 밀고 있습니다.`,
      `양자리는 선물 고를 때 심장이 먼저 뜁니다. ${winnerWithAnd} ${loserName} 중 더 신나는 그림이 앞에 섰습니다.`,
      `양자리는 "고민 끝, 줘보자" 쪽입니다. ${targetPossessive} 첫 반응이 세게 나올 선택에 점수가 붙습니다.`,
      `양자리는 선물도 추진력입니다. 받는 순간 가만히 못 있을 쪽을 먼저 봅니다.`,
      `양자리는 박스가 열리기도 전에 이미 놀이가 시작됐다고 봅니다. ${targetSubject} 바로 달려들 장면이 중요합니다.`,
      `양자리는 오늘 조용한 만족보다 폭발하는 반응을 봅니다. 선물은 첫 표정에서 이미 절반이 결정됩니다.`,
      `양자리는 "해보고 아니면 말고" 성격입니다. 선물도 일단 손이 가는 쪽이 이깁니다.`,
      `${targetSubject} 포장을 뜯고 바로 놀 수 있는지, 양자리는 그 속도부터 봅니다.`,
      `양자리는 선물 앞에서 체감 속도를 봅니다. 오래 설명해야 좋은 선물보다 바로 먹히는 쪽이 강합니다.`,
      `양자리는 리액션이 늦는 선물에 인내심이 없습니다. 오늘은 받자마자 반응 오는 쪽입니다.`,
      `양자리는 선물 선택도 직진입니다. ${winnerWithAnd} ${loserName} 사이에서 먼저 심장이 뛴 쪽을 잡습니다.`
    ],
    "황소자리": [
      `황소자리는 선물을 고를 때 한 달 뒤 바닥 풍경까지 봅니다. ${targetSubject} 계속 꺼내 놀 쪽인지가 먼저입니다.`,
      `황소자리는 첫날 난리보다 오래 가는 만족을 봅니다. ${winnerWithAnd} ${loserName} 중 덜 질릴 쪽을 천천히 봅니다.`,
      `황소자리는 포장 뜯는 순간보다 다음 주에도 손이 가는지를 봅니다. 선물은 오래 굴러야 이긴다고 생각합니다.`,
      `황소자리는 "굳이 새롭지 않아도 오래 좋으면 됐지" 쪽입니다. ${targetSubject} 편하게 반복해서 놀 선택을 봅니다.`,
      `황소자리는 선물 앞에서도 실속파입니다. 첫 리액션보다 집에서 오래 살아남을 장난감이 중요합니다.`,
      `황소자리는 상자보다 사용감을 봅니다. ${targetSubject} 다시 찾을 물건인지가 먼저 떠오릅니다.`,
      `황소자리는 선물을 고를 때 조용히 내구성 회의를 엽니다. 오래 가지고 놀 쪽에 마음이 갑니다.`,
      `황소자리는 "이거 오래 쓰나?"를 먼저 묻습니다. 반짝 인기보다 꾸준한 손길이 중요합니다.`,
      `황소자리는 선물도 편안해야 한다고 봅니다. ${targetSubject} 부담 없이 계속 만질 쪽을 고릅니다.`,
      `황소자리는 첫날 환호보다 일주일 뒤 재등장을 봅니다. 다시 꺼내는 선물이 진짜라고 믿습니다.`,
      `황소자리는 선물 고르다 갑자기 집에 이미 있는 장난감까지 떠올립니다. 실속 계산이 켜졌습니다.`,
      `황소자리는 오늘도 "편한 게 오래 간다" 편입니다. ${winnerWithAnd} ${loserName} 중 질리지 않을 쪽을 봅니다.`,
      `황소자리는 화려한 반응에 잠깐 흔들려도 결국 오래 노는 쪽을 봅니다.`,
      `황소자리는 선물에 안정감을 요구합니다. ${targetSubject} 쉽게 익숙해질 선택이 점수를 받습니다.`,
      `황소자리는 박스 개봉보다 보관함 생존율을 봅니다. 계속 살아남을 선물이 강합니다.`,
      `황소자리는 "사줬는데 안 놀면 아깝잖아"를 먼저 생각합니다.`,
      `황소자리는 선물도 밥처럼 든든해야 합니다. 오래 가고 손 자주 가는 쪽이 좋습니다.`,
      `황소자리는 새로움보다 반복 만족을 봅니다. ${targetSubject} 매일 조금씩 만질 선물이 앞섭니다.`,
      `황소자리는 유행보다 손맛을 봅니다. 계속 굴리고 만지는 쪽에 마음이 갑니다.`,
      `황소자리는 선물 앞에서 천천히 고개를 끄덕입니다. 오래 남을 것 같은 쪽이면 충분합니다.`
    ],
    "쌍둥이자리": [
      `쌍둥이자리는 선물 하나로 몇 가지 놀이가 생기는지부터 셉니다. ${targetSubject} 이야기를 만들 쪽이 궁금합니다.`,
      `쌍둥이자리는 이미 머릿속에서 ${winnerWithAnd} ${loserName} 토론회를 열었습니다. 찬성도 본인, 반대도 본인입니다.`,
      `쌍둥이자리는 선물보다 그걸로 떠들 이야기를 먼저 봅니다. ${targetSubject} 설명하고 자랑할 쪽이 강합니다.`,
      `쌍둥이자리는 "근데 이걸로 뭐 하고 놀 수 있는데?"를 묻습니다. 놀이 확장성이 먼저입니다.`,
      `쌍둥이자리는 포장 뜯고 끝나는 선물보다 대화가 이어지는 선물을 좋아합니다.`,
      `쌍둥이자리는 선물 앞에서 질문이 많아집니다. ${targetSubject} 계속 궁금해할 쪽을 봅니다.`,
      `쌍둥이자리는 장난감 하나로 혼자 역할극까지 갈 수 있는지를 봅니다.`,
      `쌍둥이자리는 "둘 다 사면 안 돼?"라고 했지만 별이 하나만 고르라네요.`,
      `쌍둥이자리는 선택보다 비교를 즐깁니다. 그래도 오늘은 말 많은 쪽에 점수가 붙습니다.`,
      `쌍둥이자리는 선물의 사용법보다 변신 가능성을 봅니다.`,
      `쌍둥이자리는 ${targetSubject} 친구에게 자랑할 문장을 먼저 상상합니다.`,
      `쌍둥이자리는 장난감이 조용하면 금방 심심해합니다. 계속 말 붙일 쪽이 좋습니다.`,
      `쌍둥이자리는 선물 상자를 열자마자 질문 세 개가 나오는 쪽을 좋아합니다.`,
      `쌍둥이자리는 오늘도 내부 회의 중입니다. 하지만 재밌는 쪽이 회의장을 장악했습니다.`,
      `쌍둥이자리는 선물에서 수다거리를 찾습니다. ${winnerWithAnd} ${loserName} 중 이야기 많은 쪽입니다.`,
      `쌍둥이자리는 놀이가 한 가지로 끝나면 아쉬워합니다. 변주가 되는 선물이 강합니다.`,
      `쌍둥이자리는 ${targetSubject} "이건 뭐야?" 하고 묻는 순간을 좋아합니다.`,
      `쌍둥이자리는 선물 고르면서 이미 리뷰 방송을 찍고 있습니다.`,
      `쌍둥이자리는 단순히 좋아하는지보다 오래 말할 수 있는지를 봅니다.`,
      `쌍둥이자리는 선택지 둘을 놓고 아직도 떠들고 있지만, 별은 더 궁금한 쪽으로 기웁니다.`
    ],
    "게자리": [
      `게자리는 선물보다 ${targetPossessive} 표정을 먼저 봅니다. 좋아하는 척 말고 진짜 마음이 풀릴 쪽이 중요합니다.`,
      `게자리는 포장지보다 받는 사람 마음을 봅니다. ${targetSubject} 편하게 좋아할 쪽인지가 먼저입니다.`,
      `게자리는 "이거 받고 마음이 따뜻해질까?"를 묻습니다. 선물은 감정부터 통과해야 합니다.`,
      `게자리는 선물 고르면서 이미 ${targetPossessive} 눈빛을 상상했습니다.`,
      `게자리는 화려함보다 정이 남는 선물을 좋아합니다.`,
      `게자리는 ${winnerWithAnd} ${loserName} 사이에서 받는 사람의 마음 온도를 봅니다.`,
      `게자리는 선물 받은 뒤 같이 웃는 장면을 먼저 떠올립니다.`,
      `게자리는 "이거 좋아하겠지?"라는 마음을 제일 크게 봅니다.`,
      `게자리는 선물의 기능보다 마음이 담긴 느낌을 봅니다.`,
      `게자리는 ${targetSubject} 안심하고 좋아할 쪽에 손을 듭니다.`,
      `게자리는 첫 반응보다 그 뒤의 기분을 봅니다. 마음이 오래 따뜻한 쪽입니다.`,
      `게자리는 선물을 고를 때 받는 사람 하루 전체를 생각합니다.`,
      `게자리는 ${targetSubject} 서운하지 않을 선택을 먼저 봅니다.`,
      `게자리는 장난감보다 그걸 건네는 순간의 공기를 봅니다.`,
      `게자리는 선물 앞에서도 배려 모드입니다. 너무 과하지 않고 마음에 닿는 쪽입니다.`,
      `게자리는 ${targetPossessive} 웃음이 억지인지 진짜인지까지 상상합니다.`,
      `게자리는 "좋아해줬으면 좋겠다"는 마음이 먼저 움직입니다.`,
      `게자리는 선물을 통해 마음이 전해지는지를 봅니다.`,
      `게자리는 오늘도 받는 사람 편입니다. ${targetSubject} 편하게 좋아할 쪽을 찾습니다.`,
      `게자리는 선물 고르다 벌써 건네는 장면까지 갔습니다.`
    ],
    "사자자리": [
      `사자자리는 선물 뜯는 순간의 리액션을 봅니다. ${targetSubject} 주인공처럼 좋아할 쪽이 먼저입니다.`,
      `사자자리는 "와!" 소리가 크게 나는 선물을 좋아합니다. 오늘은 장면이 중요합니다.`,
      `사자자리는 선물도 무대라고 봅니다. ${winnerWithAnd} ${loserName} 중 더 빛나는 쪽을 찾습니다.`,
      `사자자리는 받는 순간의 표정이 카메라에 잘 잡힐 쪽을 봅니다.`,
      `사자자리는 평범한 만족보다 존재감 있는 선물을 좋아합니다.`,
      `사자자리는 ${targetSubject} 자랑하고 싶어질 쪽에 점수를 줍니다.`,
      `사자자리는 선물 고르면서 이미 박수 소리를 듣고 있습니다.`,
      `사자자리는 "이거 멋있다"가 나올 쪽을 봅니다.`,
      `사자자리는 선물도 당당해야 한다고 봅니다. 애매한 반응은 싫습니다.`,
      `사자자리는 포장보다 등장감을 봅니다.`,
      `사자자리는 ${targetSubject} 받자마자 보여주고 싶어질 선물을 고릅니다.`,
      `사자자리는 선물 앞에서 주인공 엔딩을 찾습니다.`,
      `사자자리는 작은 선물도 장면이 살아야 한다고 봅니다.`,
      `사자자리는 ${winnerWithAnd} ${loserName} 중 더 눈에 띄는 쪽을 봅니다.`,
      `사자자리는 선물의 첫인상을 굉장히 중요하게 봅니다.`,
      `사자자리는 리액션이 약한 선물에는 살짝 실망합니다.`,
      `사자자리는 "이거 내 거야!" 하는 소리를 기다립니다.`,
      `사자자리는 선물을 건네는 순간의 폼까지 계산합니다.`,
      `사자자리는 받는 사람이 자랑할 수 있는 선물에 끌립니다.`,
      `사자자리는 오늘도 주인공 표정이 나오는 쪽입니다.`
    ],
    "처녀자리": [
      `처녀자리는 선물 앞에서도 체크리스트를 켰습니다. ${targetSubject} 얼마나 자주 쓸지가 먼저입니다.`,
      `처녀자리는 "좋아하겠지"에서 멈추지 않습니다. 오래 놀지, 안전한지, 비슷한 게 있는지 봅니다.`,
      `처녀자리는 포장 리액션보다 사용 빈도를 계산합니다.`,
      `처녀자리는 선물도 효율표에 넣고 봅니다. ${winnerWithAnd} ${loserName} 중 덜 실패할 쪽입니다.`,
      `처녀자리는 "집에 이미 있나?"부터 떠올립니다.`,
      `처녀자리는 선물 고르다 머릿속 엑셀을 열었습니다.`,
      `처녀자리는 첫날보다 일주일 뒤 사용률을 봅니다.`,
      `처녀자리는 받는 사람 취향과 실제 놀이 시간을 같이 계산합니다.`,
      `처녀자리는 장난감의 재미와 관리 난이도를 동시에 봅니다.`,
      `처녀자리는 "이거 사면 어디에 둘까?"까지 생각합니다.`,
      `처녀자리는 선물의 완성도를 봅니다. 반응만 큰 건 살짝 불안합니다.`,
      `처녀자리는 ${targetSubject} 혼자 놀 수 있는지도 봅니다.`,
      `처녀자리는 과한 선물보다 실패 확률 낮은 선물을 좋아합니다.`,
      `처녀자리는 선물 고르면서 후기까지 상상합니다.`,
      `처녀자리는 "좋은데 실용적이야?"를 묻습니다.`,
      `처녀자리는 ${winnerWithAnd} ${loserName} 사이에서 관리 쉬운 쪽을 봅니다.`,
      `처녀자리는 선물의 디테일을 뜯어봅니다. 대충 끌리는 건 통과가 어렵습니다.`,
      `처녀자리는 받는 순간보다 오래 쓰는 데이터를 봅니다.`,
      `처녀자리는 선물 선택도 정리정돈이 필요하다고 봅니다.`,
      `처녀자리는 오늘도 체크 표시가 많은 쪽으로 갑니다.`
    ],
    "천칭자리": [
      `천칭자리는 선물에서 반응과 실속의 균형을 봅니다. ${winnerWithAnd} ${loserName} 중 너무 한쪽으로 치우치지 않는 쪽입니다.`,
      `천칭자리는 "예쁘게 좋아할까, 오래 좋아할까"를 저울에 올렸습니다.`,
      `천칭자리는 선물의 분위기와 실제 놀이를 같이 봅니다.`,
      `천칭자리는 ${targetPossessive} 첫 반응과 부모 마음의 만족도를 같이 계산합니다.`,
      `천칭자리는 너무 과하지도, 너무 심심하지도 않은 쪽을 찾습니다.`,
      `천칭자리는 선물도 조화가 중요하다고 봅니다.`,
      `천칭자리는 ${winnerWithAnd} ${loserName} 사이에서 균형추를 흔들고 있습니다.`,
      `천칭자리는 받는 순간의 예쁜 장면과 이후 활용도를 같이 봅니다.`,
      `천칭자리는 "둘 다 괜찮은데?" 하다가 결국 더 자연스러운 쪽을 고릅니다.`,
      `천칭자리는 선물 고르면서 분위기 점수까지 줍니다.`,
      `천칭자리는 반응이 너무 짧은 선물도, 오래 가지만 심심한 선물도 고민합니다.`,
      `천칭자리는 ${targetSubject} 부담 없이 좋아할 쪽을 봅니다.`,
      `천칭자리는 선물의 첫인상과 오래감 사이에서 저울질합니다.`,
      `천칭자리는 오늘도 선택지 둘을 예쁘게 세워놓고 봅니다.`,
      `천칭자리는 선물도 센스가 있어야 한다고 봅니다.`,
      `천칭자리는 ${winnerWithAnd} ${loserName} 중 더 보기 좋은 결말을 찾습니다.`,
      `천칭자리는 "좋아할 것 같고, 납득도 되는" 쪽을 선호합니다.`,
      `천칭자리는 선물을 고를 때 관계의 공기까지 봅니다.`,
      `천칭자리는 과한 놀람보다 기분 좋은 반응을 좋아합니다.`,
      `천칭자리는 오늘도 저울을 흔들다가 조금 더 자연스러운 쪽으로 갑니다.`
    ],
    "전갈자리": [
      `전갈자리는 선물에서 "진짜 꽂힐까?"를 봅니다. ${targetSubject} 몰입할 쪽인지가 핵심입니다.`,
      `전갈자리는 첫 반응보다 깊게 빠질 가능성을 봅니다.`,
      `전갈자리는 ${winnerWithAnd} ${loserName} 중 더 오래 집착할 쪽을 찾습니다.`,
      `전갈자리는 선물을 대충 보지 않습니다. 본질은 ${targetSubject} 계속 찾느냐입니다.`,
      `전갈자리는 "이거 그냥 좋아하는 척 아니야?"까지 의심합니다.`,
      `전갈자리는 선물의 강한 한 방을 봅니다.`,
      `전갈자리는 ${targetSubject} 이름 붙이고 아끼게 될 쪽을 봅니다.`,
      `전갈자리는 선물 고르면서 이미 몰입 포인트를 찾고 있습니다.`,
      `전갈자리는 "진짜 오래 꽂히는가"를 먼저 묻습니다.`,
      `전갈자리는 반응보다 애착을 봅니다.`,
      `전갈자리는 ${winnerWithAnd} ${loserName} 사이에서 더 강렬한 기억을 남길 쪽을 고릅니다.`,
      `전갈자리는 선물에서 표면보다 속을 봅니다.`,
      `전갈자리는 한번 빠지면 오래 가는 쪽에 점수를 줍니다.`,
      `전갈자리는 ${targetSubject} 혼자 조용히 계속 만질 선물을 봅니다.`,
      `전갈자리는 오늘도 본질 질문부터 던집니다. "그래서 뭐에 꽂힐 건데?"`,
      `전갈자리는 선물의 첫날보다 애착의 깊이를 봅니다.`,
      `전갈자리는 예쁜 포장보다 강한 취향 적중을 원합니다.`,
      `전갈자리는 ${targetSubject} 계속 들고 다닐 가능성을 봅니다.`,
      `전갈자리는 선물 하나로 몰입 세계가 열리는지를 봅니다.`,
      `전갈자리는 대충 좋아하는 선물보다 진짜 꽂히는 선물을 고릅니다.`
    ],
    "사수자리": [
      `사수자리는 선물에서 새 놀이가 열리는지를 봅니다. ${targetSubject} 경험치를 얻을 쪽이 먼저입니다.`,
      `사수자리는 "이걸로 뭐 해볼 수 있지?"부터 묻습니다.`,
      `사수자리는 선물도 작은 모험이어야 한다고 봅니다.`,
      `사수자리는 ${winnerWithAnd} ${loserName} 중 가능성이 더 넓은 쪽을 봅니다.`,
      `사수자리는 받자마자 새로운 놀이가 시작될 선물을 좋아합니다.`,
      `사수자리는 선물 앞에서 지도 없이 출발합니다.`,
      `사수자리는 ${targetSubject} 새로운 장면을 만들 쪽에 끌립니다.`,
      `사수자리는 익숙한 만족보다 경험이 남는 선물을 봅니다.`,
      `사수자리는 "재밌잖아"가 나오면 반쯤 결정된 겁니다.`,
      `사수자리는 선물 고르며 다음 놀이 코스까지 상상합니다.`,
      `사수자리는 ${winnerWithAnd} ${loserName} 중 더 넓게 놀 수 있는 쪽을 봅니다.`,
      `사수자리는 선물에 자유도가 있으면 좋아합니다.`,
      `사수자리는 ${targetSubject} 밖으로 뛰어나갈 만큼 신날 쪽을 봅니다.`,
      `사수자리는 오늘도 작은 탐험을 찾습니다.`,
      `사수자리는 선물이 새로운 경험을 열어주길 바랍니다.`,
      `사수자리는 단순한 반응보다 이후 놀이 확장을 봅니다.`,
      `사수자리는 ${targetSubject} "또 하자" 할 쪽에 점수를 줍니다.`,
      `사수자리는 선물도 여행처럼 봅니다. 어디까지 데려가느냐가 중요합니다.`,
      `사수자리는 가능성이 좁은 선물보다 열려 있는 선물을 좋아합니다.`,
      `사수자리는 오늘도 경험치가 남는 쪽입니다.`
    ],
    "염소자리": [
      `염소자리는 선물 앞에서도 현실성을 봅니다. ${targetSubject} 오래 쓰고, 돈값 하는지가 먼저입니다.`,
      `염소자리는 "사주고 끝인가, 계속 쓰나"를 봅니다.`,
      `염소자리는 선물도 결과가 있어야 마음이 편합니다.`,
      `염소자리는 ${winnerWithAnd} ${loserName} 중 더 오래 남는 쪽을 계산합니다.`,
      `염소자리는 첫 반응보다 구매 후 만족도를 봅니다.`,
      `염소자리는 선물 고르면서 예산과 활용도를 같이 봅니다.`,
      `염소자리는 ${targetSubject} 계속 사용할 쪽에 점수를 줍니다.`,
      `염소자리는 "이거 괜히 샀다"를 피하고 싶어합니다.`,
      `염소자리는 선물의 성과를 봅니다. 잘 놀면 성공입니다.`,
      `염소자리는 화려함보다 책임 있는 선택을 좋아합니다.`,
      `염소자리는 ${winnerWithAnd} ${loserName} 사이에서 실속 있는 쪽을 고릅니다.`,
      `염소자리는 오늘도 결과표를 떠올립니다.`,
      `염소자리는 선물도 관리 가능한 쪽을 봅니다.`,
      `염소자리는 ${targetSubject} 질리지 않을 선택을 현실적으로 봅니다.`,
      `염소자리는 "나중에 후회 안 하나"를 먼저 묻습니다.`,
      `염소자리는 선물을 감정만으로 고르지 않습니다.`,
      `염소자리는 오래 남는 만족을 더 믿습니다.`,
      `염소자리는 선물 앞에서도 계획표를 내려놓지 않습니다.`,
      `염소자리는 ${targetSubject} 며칠 뒤에도 찾을 선택을 봅니다.`,
      `염소자리는 오늘도 돈값 하는 쪽에 별을 붙입니다.`
    ],
    "물병자리": [
      `물병자리는 선물에서 뻔하지 않은 놀이를 봅니다. ${targetSubject} 자기 방식으로 가지고 놀 쪽이 중요합니다.`,
      `물병자리는 "왜 꼭 평범해야 하지?"부터 묻습니다.`,
      `물병자리는 ${winnerWithAnd} ${loserName} 중 더 엉뚱하게 놀 수 있는 쪽을 봅니다.`,
      `물병자리는 선물도 개성이 있어야 재밌다고 봅니다.`,
      `물병자리는 정답 선물보다 새로운 반응을 좋아합니다.`,
      `물병자리는 ${targetSubject} 예상 밖으로 활용할 쪽을 고릅니다.`,
      `물병자리는 선물 앞에서 남들과 다른 각도를 봅니다.`,
      `물병자리는 뻔한 만족보다 신선한 놀이를 찾습니다.`,
      `물병자리는 선물도 실험처럼 봅니다.`,
      `물병자리는 ${winnerWithAnd} ${loserName} 사이에서 더 독특한 그림을 봅니다.`,
      `물병자리는 설명서대로만 노는 선물엔 흥미가 적습니다.`,
      `물병자리는 ${targetSubject} 이상하게 잘 가지고 놀 가능성을 봅니다.`,
      `물병자리는 "이걸 이렇게도 쓴다고?"가 나오면 좋아합니다.`,
      `물병자리는 선물에서 반전 포인트를 찾습니다.`,
      `물병자리는 오늘도 정석보다 다른 답을 봅니다.`,
      `물병자리는 ${targetPossessive} 개성이 살아날 쪽을 고릅니다.`,
      `물병자리는 선물이 새로운 생각을 열어주면 좋다고 봅니다.`,
      `물병자리는 평범한 리액션보다 예상 밖 반응을 좋아합니다.`,
      `물병자리는 ${winnerWithAnd} ${loserName} 중 더 신선한 선택에 끌립니다.`,
      `물병자리는 선물도 살짝 이상해야 오래 기억된다고 봅니다.`
    ],
    "물고기자리": [
      `물고기자리는 선물 받은 뒤의 여운을 봅니다. ${targetSubject} 잠들기 전까지 생각할 쪽이 중요합니다.`,
      `물고기자리는 "마음이 어디에 끌릴까"를 먼저 봅니다.`,
      `물고기자리는 ${winnerWithAnd} ${loserName} 중 더 따뜻한 표정을 남길 쪽을 봅니다.`,
      `물고기자리는 선물보다 그 순간의 분위기를 봅니다.`,
      `물고기자리는 ${targetSubject} 조용히 좋아할 쪽에 마음이 갑니다.`,
      `물고기자리는 첫 반응보다 마음에 남는 장면을 봅니다.`,
      `물고기자리는 선물에 작은 이야기가 있으면 좋아합니다.`,
      `물고기자리는 ${targetSubject} 상상 속으로 들어갈 쪽을 봅니다.`,
      `물고기자리는 오늘도 감정선부터 확인합니다.`,
      `물고기자리는 ${winnerWithAnd} ${loserName} 사이에서 더 포근한 여운을 고릅니다.`,
      `물고기자리는 선물 받은 표정 뒤의 마음까지 상상합니다.`,
      `물고기자리는 장난감보다 그걸 안고 있는 장면을 봅니다.`,
      `물고기자리는 ${targetSubject} 오래 기억할 기분을 중요하게 봅니다.`,
      `물고기자리는 선물도 작은 위로가 되면 좋다고 생각합니다.`,
      `물고기자리는 오늘 마음이 끌리는 쪽을 믿습니다.`,
      `물고기자리는 ${targetSubject} 혼자 상상놀이에 빠질 쪽을 봅니다.`,
      `물고기자리는 선물의 소리보다 분위기를 듣습니다.`,
      `물고기자리는 ${winnerWithAnd} ${loserName} 중 더 부드러운 기억을 남길 쪽입니다.`,
      `물고기자리는 잠들기 전 다시 떠오를 선물을 좋아합니다.`,
      `물고기자리는 선물도 마음에 물결이 남아야 한다고 봅니다.`
    ]
  };
  if (category === "gift") return giftLine[signName] || giftLine["황소자리"];
  const situationByCategory = {
    drink: `술잔과 내일 아침 사이에서 ${winnerName} 쪽이 먼저 눈에 들어옵니다.`,
    relationship: `말풍선 앞에서 ${winnerWithAnd} ${loserName} 사이를 다시 보고 있습니다.`,
    attendance: `이불과 일정표 사이에서 ${winnerName} 쪽 카드가 올라왔습니다.`,
    hygiene: `찝찝함과 귀찮음 사이에서 ${winnerName} 쪽이 먼저 고개를 듭니다.`,
    exercise: `운동화와 소파 사이에서 ${winnerName} 쪽이 오늘의 후보로 올라왔습니다.`,
    study: `책상과 이불 사이에서 ${winnerName} 쪽이 오늘의 결론으로 올라왔습니다.`,
    game: `한 판의 유혹과 내일 컨디션 사이에서 ${winnerName} 쪽을 봅니다.`,
    shopping: `장바구니와 통장 사이에서 ${winnerName} 쪽이 별의 심사를 받습니다.`,
    food: `${winnerWithAnd} ${loserName} 중 오늘 입에 들어오는 장면이 더 선명한 쪽을 봅니다.`,
    money: `차트와 계좌 사이에서 ${winnerName} 쪽이 먼저 움직였습니다.`,
    childcare: `아이 컨디션과 보호자 체력 사이에서 ${winnerName} 쪽을 봅니다.`,
    travel: `답답한 일상과 지갑 현실 사이에서 ${winnerName} 쪽을 다시 봅니다.`,
    place: `밖으로 나갈지 말지의 공기 속에서 ${winnerName} 쪽이 보입니다.`,
    daily: `${winnerWithAnd} ${loserName} 사이에서 오늘 마음이 먼저 반응한 쪽을 봅니다.`
  };
  const nudge = situationByCategory[category] || situationByCategory.daily;
  const genericLine = {
    "양자리": [
      `양자리는 이미 한 발 앞으로 나갔습니다. ${nudge}`,
      `양자리는 생각보다 몸이 빠른 날입니다. ${nudge}`,
      `양자리는 결론보다 출발이 먼저입니다. ${nudge}`,
      `양자리는 "일단 해보고 생각하자" 쪽으로 몸이 기웁니다. ${nudge}`,
      `양자리는 고민판 앞에서 오래 앉아 있지 못합니다. ${nudge}`,
      `양자리는 지금도 신발끈을 묶는 중입니다. ${nudge}`,
      `양자리는 멈춰 있는 선택을 보면 답답해합니다. ${nudge}`,
      `양자리는 오늘 기다림보다 움직임을 먼저 봅니다. ${nudge}`,
      `양자리는 버튼 앞에서 손가락이 먼저 반응합니다. ${nudge}`,
      `양자리는 "가보자"가 머릿속 첫 줄입니다. ${nudge}`,
      `양자리는 오늘 후회도 나중으로 미룹니다. ${nudge}`,
      `양자리는 고민보다 실행 리듬을 믿습니다. ${nudge}`,
      `양자리는 정지 화면보다 다음 장면을 봅니다. ${nudge}`,
      `양자리는 오늘 속도가 판단 기준입니다. ${nudge}`,
      `양자리는 가만히 있다가 더 피곤해지는 쪽을 싫어합니다. ${nudge}`,
      `양자리는 오늘도 직진 본능이 먼저 출석했습니다. ${nudge}`,
      `양자리는 선택지를 보자마자 몸이 살짝 앞으로 갔습니다. ${nudge}`,
      `양자리는 "망설이다 놓치느니 해보자" 쪽입니다. ${nudge}`,
      `양자리는 오늘 작은 모험에 점수를 줍니다. ${nudge}`,
      `양자리는 시작이 빠른 쪽을 더 믿습니다. ${nudge}`
    ],
    "황소자리": [
      `황소자리는 편한 쪽부터 봅니다. ${nudge}`,
      `황소자리는 오늘도 "굳이?"를 먼저 꺼냈습니다. ${nudge}`,
      `황소자리는 안정감 없는 선택을 오래 쳐다보지 않습니다. ${nudge}`,
      `황소자리는 마음이 덜 흔들리는 쪽을 좋아합니다. ${nudge}`,
      `황소자리는 새 모험보다 익숙한 리듬을 먼저 봅니다. ${nudge}`,
      `황소자리는 오늘 소파에 앉아서도 꽤 정확합니다. ${nudge}`,
      `황소자리는 오래 편할 선택인지부터 묻습니다. ${nudge}`,
      `황소자리는 즉흥보다 실속을 먼저 계산합니다. ${nudge}`,
      `황소자리는 배부르고 편한 결말을 좋아합니다. ${nudge}`,
      `황소자리는 오늘 마음의 소음이 적은 쪽을 봅니다. ${nudge}`,
      `황소자리는 편안함이 무너지면 바로 의심합니다. ${nudge}`,
      `황소자리는 손이 자주 가는 선택을 믿습니다. ${nudge}`,
      `황소자리는 오래 남는 만족을 천천히 봅니다. ${nudge}`,
      `황소자리는 오늘도 안정감 회의를 열었습니다. ${nudge}`,
      `황소자리는 과한 자극보다 덜 피곤한 쪽을 봅니다. ${nudge}`,
      `황소자리는 익숙한 길의 장점을 과소평가하지 않습니다. ${nudge}`,
      `황소자리는 끝나고 편할지를 먼저 묻습니다. ${nudge}`,
      `황소자리는 오늘 무리하지 않는 쪽에 귀가 열립니다. ${nudge}`,
      `황소자리는 만족이 오래 가는 쪽을 고릅니다. ${nudge}`,
      `황소자리는 흔들리지 않는 선택을 좋아합니다. ${nudge}`
    ],
    "쌍둥이자리": [
      `쌍둥이자리는 벌써 머릿속 단톡방을 열었습니다. ${nudge}`,
      `쌍둥이자리는 "근데 이것도 궁금한데?"부터 시작합니다. ${nudge}`,
      `쌍둥이자리는 선택보다 토론을 먼저 즐깁니다. ${nudge}`,
      `쌍둥이자리는 찬성파와 반대파가 둘 다 본인입니다. ${nudge}`,
      `쌍둥이자리는 말할 거리가 생기는 쪽을 봅니다. ${nudge}`,
      `쌍둥이자리는 오늘 정보가 많은 쪽에 끌립니다. ${nudge}`,
      `쌍둥이자리는 심심한 결론을 싫어합니다. ${nudge}`,
      `쌍둥이자리는 선택지를 보자마자 질문 세 개를 만들었습니다. ${nudge}`,
      `쌍둥이자리는 변주가 가능한 쪽을 좋아합니다. ${nudge}`,
      `쌍둥이자리는 오늘도 내부 회의가 길어질 뻔했습니다. ${nudge}`,
      `쌍둥이자리는 대화가 이어지는 선택을 봅니다. ${nudge}`,
      `쌍둥이자리는 가벼운 재미가 있는 쪽에 반응합니다. ${nudge}`,
      `쌍둥이자리는 "둘 다?"를 외쳤지만 하나만 고릅니다. ${nudge}`,
      `쌍둥이자리는 궁금증이 먼저 생긴 쪽을 봅니다. ${nudge}`,
      `쌍둥이자리는 오늘 지루하지 않은 답을 찾습니다. ${nudge}`,
      `쌍둥이자리는 말이 많아지는 쪽에 점수를 줍니다. ${nudge}`,
      `쌍둥이자리는 선택지를 비교하는 순간 이미 즐기고 있습니다. ${nudge}`,
      `쌍둥이자리는 정보와 재미가 붙은 쪽을 봅니다. ${nudge}`,
      `쌍둥이자리는 생각이 빠르게 갈라졌다가 다시 모입니다. ${nudge}`,
      `쌍둥이자리는 오늘도 회의록이 긴 별자리입니다. ${nudge}`
    ],
    "게자리": [
      `게자리는 결과보다 마음을 먼저 봅니다. ${nudge}`,
      `게자리는 "마음은 어때?"에서 출발합니다. ${nudge}`,
      `게자리는 끝나고 마음이 편할 쪽을 봅니다. ${nudge}`,
      `게자리는 사람과 감정의 온도를 먼저 잽니다. ${nudge}`,
      `게자리는 후회보다 안심을 더 크게 봅니다. ${nudge}`,
      `게자리는 오늘도 정이 가는 쪽에 귀가 열립니다. ${nudge}`,
      `게자리는 선택 뒤의 표정을 상상합니다. ${nudge}`,
      `게자리는 관계와 마음의 공기를 같이 봅니다. ${nudge}`,
      `게자리는 차가운 정답보다 따뜻한 납득을 찾습니다. ${nudge}`,
      `게자리는 마음이 덜 다칠 쪽을 먼저 봅니다. ${nudge}`,
      `게자리는 오늘 밤 마음 편한지를 묻습니다. ${nudge}`,
      `게자리는 상황보다 감정의 뒷맛을 봅니다. ${nudge}`,
      `게자리는 배려가 남는 선택에 점수를 줍니다. ${nudge}`,
      `게자리는 혼자 찝찝할 결말을 싫어합니다. ${nudge}`,
      `게자리는 상대나 내 마음이 서운하지 않을 쪽을 봅니다. ${nudge}`,
      `게자리는 따뜻하게 마무리되는 장면을 찾습니다. ${nudge}`,
      `게자리는 선택의 말투까지 생각합니다. ${nudge}`,
      `게자리는 기분이 오래 남을 쪽을 봅니다. ${nudge}`,
      `게자리는 오늘도 마음의 안전벨트를 먼저 맵니다. ${nudge}`,
      `게자리는 덜 차가운 결론을 고릅니다. ${nudge}`
    ],
    "사자자리": [
      `사자자리는 장면이 살아나는 쪽을 봅니다. ${nudge}`,
      `사자자리는 "주인공은 너잖아"에서 시작합니다. ${nudge}`,
      `사자자리는 눈치 보는 선택을 싫어합니다. ${nudge}`,
      `사자자리는 당당하게 말할 수 있는 쪽을 봅니다. ${nudge}`,
      `사자자리는 오늘도 스포트라이트 위치를 확인합니다. ${nudge}`,
      `사자자리는 폼이 사는 선택에 반응합니다. ${nudge}`,
      `사자자리는 애매한 표정보다 선명한 태도를 좋아합니다. ${nudge}`,
      `사자자리는 내가 작아지지 않는 쪽을 봅니다. ${nudge}`,
      `사자자리는 자존심이 덜 구겨질 결말을 찾습니다. ${nudge}`,
      `사자자리는 멋없게 끌려가는 선택을 싫어합니다. ${nudge}`,
      `사자자리는 오늘도 당당함 점수를 매깁니다. ${nudge}`,
      `사자자리는 리액션이 확실한 쪽을 봅니다. ${nudge}`,
      `사자자리는 "이 장면 괜찮네" 싶은 선택을 고릅니다. ${nudge}`,
      `사자자리는 자신감이 붙는 쪽에 별을 줍니다. ${nudge}`,
      `사자자리는 표현이 살아나는 쪽을 먼저 봅니다. ${nudge}`,
      `사자자리는 주눅 드는 결말을 피하려고 합니다. ${nudge}`,
      `사자자리는 오늘 나를 더 크게 만드는 선택을 봅니다. ${nudge}`,
      `사자자리는 눈빛이 살아나는 쪽을 고릅니다. ${nudge}`,
      `사자자리는 대충 넘기는 선택에 박수를 안 칩니다. ${nudge}`,
      `사자자리는 오늘도 주인공 엔딩을 찾습니다. ${nudge}`
    ],
    "처녀자리": [
      `처녀자리는 이미 머릿속 엑셀을 열었습니다. ${nudge}`,
      `처녀자리는 감정보다 체크리스트를 먼저 봅니다. ${nudge}`,
      `처녀자리는 "그게 효율적인가?"부터 묻습니다. ${nudge}`,
      `처녀자리는 선택 뒤의 정리까지 계산합니다. ${nudge}`,
      `처녀자리는 오차가 적은 쪽을 좋아합니다. ${nudge}`,
      `처녀자리는 오늘도 조건표를 만듭니다. ${nudge}`,
      `처녀자리는 준비가 덜 된 선택을 의심합니다. ${nudge}`,
      `처녀자리는 실용적인 결론에 마음이 놓입니다. ${nudge}`,
      `처녀자리는 기분보다 관리 가능성을 봅니다. ${nudge}`,
      `처녀자리는 "나중에 번거롭지 않나?"를 먼저 봅니다. ${nudge}`,
      `처녀자리는 완성도가 낮은 선택을 오래 못 봅니다. ${nudge}`,
      `처녀자리는 오늘도 점검 모드입니다. ${nudge}`,
      `처녀자리는 작은 변수까지 같이 봅니다. ${nudge}`,
      `처녀자리는 현실적으로 덜 흐트러질 쪽을 고릅니다. ${nudge}`,
      `처녀자리는 감정도 계산식에 넣고 싶어합니다. ${nudge}`,
      `처녀자리는 기준이 분명한 선택에 점수를 줍니다. ${nudge}`,
      `처녀자리는 뒤처리가 쉬운 쪽을 봅니다. ${nudge}`,
      `처녀자리는 오늘도 깔끔한 결론을 찾습니다. ${nudge}`,
      `처녀자리는 무리 없는 실행 가능성을 봅니다. ${nudge}`,
      `처녀자리는 체크 표시가 많은 쪽으로 갑니다. ${nudge}`
    ],
    "천칭자리": [
      `천칭자리는 저울을 먼저 꺼냈습니다. ${nudge}`,
      `천칭자리는 균형이 덜 무너지는 쪽을 봅니다. ${nudge}`,
      `천칭자리는 "둘 다 괜찮은데?"에서 시작합니다. ${nudge}`,
      `천칭자리는 분위기와 실속을 같이 봅니다. ${nudge}`,
      `천칭자리는 과하지 않은 결론을 좋아합니다. ${nudge}`,
      `천칭자리는 선택의 모양새까지 봅니다. ${nudge}`,
      `천칭자리는 오늘도 조화로운 답을 찾습니다. ${nudge}`,
      `천칭자리는 관계와 내 마음 사이를 조율합니다. ${nudge}`,
      `천칭자리는 너무 튀지도, 너무 죽지도 않는 쪽을 봅니다. ${nudge}`,
      `천칭자리는 센스 있는 마무리를 좋아합니다. ${nudge}`,
      `천칭자리는 부담과 만족 사이의 각도를 봅니다. ${nudge}`,
      `천칭자리는 애매함 속에서도 예쁜 균형을 찾습니다. ${nudge}`,
      `천칭자리는 선택지를 나란히 세워놓고 공기를 봅니다. ${nudge}`,
      `천칭자리는 덜 삐뚤어진 결론에 끌립니다. ${nudge}`,
      `천칭자리는 평화롭게 끝날 쪽을 봅니다. ${nudge}`,
      `천칭자리는 오늘도 저울이 바쁩니다. ${nudge}`,
      `천칭자리는 공정한 핑계를 찾고 있습니다. ${nudge}`,
      `천칭자리는 기분 좋은 균형감을 믿습니다. ${nudge}`,
      `천칭자리는 선택 뒤의 분위기를 먼저 봅니다. ${nudge}`,
      `천칭자리는 우아하게 납득되는 쪽을 고릅니다. ${nudge}`
    ],
    "전갈자리": [
      `전갈자리는 본질부터 묻습니다. ${nudge}`,
      `전갈자리는 "그래서 진짜 이유가 뭔데?"에서 시작합니다. ${nudge}`,
      `전갈자리는 겉핥기 결론을 싫어합니다. ${nudge}`,
      `전갈자리는 깊게 꽂히는 쪽을 봅니다. ${nudge}`,
      `전갈자리는 애매한 상태를 오래 두지 않습니다. ${nudge}`,
      `전갈자리는 오늘도 끝까지 볼 준비가 됐습니다. ${nudge}`,
      `전갈자리는 진심이 더 선명한 쪽을 봅니다. ${nudge}`,
      `전갈자리는 선택 뒤에 숨은 욕망을 봅니다. ${nudge}`,
      `전갈자리는 강한 결론이 있는 쪽에 끌립니다. ${nudge}`,
      `전갈자리는 대충 좋은 선택엔 의심부터 합니다. ${nudge}`,
      `전갈자리는 몰입할 수 있는 쪽을 고릅니다. ${nudge}`,
      `전갈자리는 "끝까지 갈 수 있나?"를 묻습니다. ${nudge}`,
      `전갈자리는 깊이 없는 재미를 오래 못 봅니다. ${nudge}`,
      `전갈자리는 진짜 꽂히는 포인트를 찾습니다. ${nudge}`,
      `전갈자리는 오늘도 본능의 안테나를 세웠습니다. ${nudge}`,
      `전갈자리는 결론이 흐린 선택을 싫어합니다. ${nudge}`,
      `전갈자리는 한 번 정하면 오래 보는 쪽입니다. ${nudge}`,
      `전갈자리는 표면보다 속을 봅니다. ${nudge}`,
      `전갈자리는 찜찜함의 뿌리를 먼저 찾습니다. ${nudge}`,
      `전갈자리는 오늘 본질이 살아있는 쪽을 고릅니다. ${nudge}`
    ],
    "사수자리": [
      `사수자리는 가능성이 열리는 쪽을 봅니다. ${nudge}`,
      `사수자리는 "가보자, 재밌잖아"에서 시작합니다. ${nudge}`,
      `사수자리는 경험치가 남는 쪽에 끌립니다. ${nudge}`,
      `사수자리는 답답한 결론보다 넓어지는 선택을 봅니다. ${nudge}`,
      `사수자리는 오늘도 지도 없이 출발할 준비가 됐습니다. ${nudge}`,
      `사수자리는 작은 모험이 있는 쪽을 좋아합니다. ${nudge}`,
      `사수자리는 나중에 얘깃거리 되는 선택을 봅니다. ${nudge}`,
      `사수자리는 자유도가 높은 쪽에 점수를 줍니다. ${nudge}`,
      `사수자리는 "해보면 알겠지"를 믿습니다. ${nudge}`,
      `사수자리는 안전한 반복보다 새 장면을 봅니다. ${nudge}`,
      `사수자리는 선택에서 확장성을 찾습니다. ${nudge}`,
      `사수자리는 오늘도 웃고 넘길 수 있는 쪽을 봅니다. ${nudge}`,
      `사수자리는 가능성이 좁은 선택에 금방 답답해합니다. ${nudge}`,
      `사수자리는 경험 하나 더 생기는 쪽을 고릅니다. ${nudge}`,
      `사수자리는 긍정 회로가 먼저 켜졌습니다. ${nudge}`,
      `사수자리는 모험값이 있는 쪽에 반응합니다. ${nudge}`,
      `사수자리는 나중에 후회해도 이야기가 되는 쪽을 봅니다. ${nudge}`,
      `사수자리는 오늘의 지루함을 깨는 선택을 좋아합니다. ${nudge}`,
      `사수자리는 문이 열리는 쪽을 봅니다. ${nudge}`,
      `사수자리는 오늘도 가능성 편입니다. ${nudge}`
    ],
    "염소자리": [
      `염소자리는 현실성부터 봅니다. ${nudge}`,
      `염소자리는 "나중에 도움 되냐?"에서 시작합니다. ${nudge}`,
      `염소자리는 결과가 남는 쪽을 좋아합니다. ${nudge}`,
      `염소자리는 책임 있는 결론을 먼저 봅니다. ${nudge}`,
      `염소자리는 오늘도 목표표를 꺼냈습니다. ${nudge}`,
      `염소자리는 감정보다 뒤끝 관리를 봅니다. ${nudge}`,
      `염소자리는 장기적으로 덜 손해인 쪽을 찾습니다. ${nudge}`,
      `염소자리는 "해야 할 건 해야지" 모드입니다. ${nudge}`,
      `염소자리는 선택의 성과를 봅니다. ${nudge}`,
      `염소자리는 흔들림보다 관리 가능성을 믿습니다. ${nudge}`,
      `염소자리는 미래의 나에게 덜 혼날 쪽을 봅니다. ${nudge}`,
      `염소자리는 현실적으로 버틸 수 있는 선택을 고릅니다. ${nudge}`,
      `염소자리는 계획에 덜 어긋나는 쪽을 봅니다. ${nudge}`,
      `염소자리는 오늘도 실속 있는 결론을 찾습니다. ${nudge}`,
      `염소자리는 감정의 파도보다 목표를 봅니다. ${nudge}`,
      `염소자리는 성과가 남는 선택에 점수를 줍니다. ${nudge}`,
      `염소자리는 책임감이 덜 무너지는 쪽을 봅니다. ${nudge}`,
      `염소자리는 "끝나고 납득되나?"를 묻습니다. ${nudge}`,
      `염소자리는 오늘도 현실 체크가 빠릅니다. ${nudge}`,
      `염소자리는 나중에 설명 가능한 선택을 고릅니다. ${nudge}`
    ],
    "물병자리": [
      `물병자리는 다르게 생각하는 쪽에서 출발합니다. ${nudge}`,
      `물병자리는 "왜 꼭 그래야 하지?"를 먼저 묻습니다. ${nudge}`,
      `물병자리는 정답보다 새로운 답을 봅니다. ${nudge}`,
      `물병자리는 뻔한 선택에 금방 흥미를 잃습니다. ${nudge}`,
      `물병자리는 오늘도 옆길을 살짝 봅니다. ${nudge}`,
      `물병자리는 독창성이 살아나는 쪽을 좋아합니다. ${nudge}`,
      `물병자리는 남들이 안 보는 각도를 봅니다. ${nudge}`,
      `물병자리는 반전이 있는 선택에 끌립니다. ${nudge}`,
      `물병자리는 자유롭게 해석할 수 있는 쪽을 봅니다. ${nudge}`,
      `물병자리는 실험해볼 만한 선택을 좋아합니다. ${nudge}`,
      `물병자리는 평범한 납득보다 신선한 이유를 찾습니다. ${nudge}`,
      `물병자리는 오늘도 규칙을 살짝 비틀어 봅니다. ${nudge}`,
      `물병자리는 개성이 죽지 않는 쪽을 고릅니다. ${nudge}`,
      `물병자리는 "이렇게도 볼 수 있잖아"에서 시작합니다. ${nudge}`,
      `물병자리는 예상 밖으로 괜찮은 쪽을 봅니다. ${nudge}`,
      `물병자리는 틀에 박힌 결론을 싫어합니다. ${nudge}`,
      `물병자리는 선택의 신선도를 봅니다. ${nudge}`,
      `물병자리는 오늘도 자기 방식이 먼저입니다. ${nudge}`,
      `물병자리는 다수가 고른 답보다 낯선 답을 의심 없이 봅니다. ${nudge}`,
      `물병자리는 미래의 재미가 있는 쪽을 고릅니다. ${nudge}`
    ],
    "물고기자리": [
      `물고기자리는 감성의 물결부터 봅니다. ${nudge}`,
      `물고기자리는 "마음이 어디로 흐르지?"에서 시작합니다. ${nudge}`,
      `물고기자리는 끝나고 남는 여운을 봅니다. ${nudge}`,
      `물고기자리는 숫자보다 기분의 결을 먼저 듣습니다. ${nudge}`,
      `물고기자리는 오늘도 마음이 덜 출렁이는 쪽을 찾습니다. ${nudge}`,
      `물고기자리는 조용히 끌리는 쪽을 믿습니다. ${nudge}`,
      `물고기자리는 감정선이 부드럽게 이어지는 선택을 봅니다. ${nudge}`,
      `물고기자리는 잠들기 전 떠오를 장면을 봅니다. ${nudge}`,
      `물고기자리는 상상 속에서 먼저 살아나는 쪽을 고릅니다. ${nudge}`,
      `물고기자리는 위로가 남는 선택에 반응합니다. ${nudge}`,
      `물고기자리는 오늘도 마음의 파도를 관찰합니다. ${nudge}`,
      `물고기자리는 현실보다 여운이 먼저 들어옵니다. ${nudge}`,
      `물고기자리는 감정이 덜 다칠 쪽을 봅니다. ${nudge}`,
      `물고기자리는 부드럽게 납득되는 선택을 좋아합니다. ${nudge}`,
      `물고기자리는 "왠지"라는 말을 꽤 믿습니다. ${nudge}`,
      `물고기자리는 오늘 마음에 오래 남을 쪽을 봅니다. ${nudge}`,
      `물고기자리는 상상력이 먼저 움직였습니다. ${nudge}`,
      `물고기자리는 선택 뒤의 기분 온도를 봅니다. ${nudge}`,
      `물고기자리는 조용히 위로되는 쪽을 고릅니다. ${nudge}`,
      `물고기자리는 오늘도 마음이 먼저 안 쪽을 봅니다. ${nudge}`
    ]
  };
  return genericLine[signName] || genericLine["황소자리"];
}

function situationHook(category, winner, loser, question, sign = null) {
  const signName = sign && sign[0] ? sign[0] : "황소자리";
  const signOpenings = signOpeningPool(signName, category, winner, loser, question);
  if (signOpenings) {
    return pick(signOpenings, hashText(`${todayKey()}-${signName}-${category}-${winner.name}-${loser.name}-${question}`));
  }
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerWithAnd = withParticle(winner.name, "과", "와");
  const q = String(question).toLowerCase();
  if (category === "drink") {
    return `술은 지금 부르고 있지만 내일 아침도 대기 중입니다. ${winnerName}와 ${loserName} 사이에서 간이 회의실 문을 잠갔습니다.`;
  }
  if (category === "relationship") {
    return `보내는 건 1초인데 후폭풍은 3일 갈 수 있습니다. 말풍선 앞에서 ${winnerName}와 ${loserName}가 서로 눈치 보는 중입니다.`;
  }
  if (category === "attendance") {
    return `이불과 월급이 정면 승부 중입니다. 알람은 이미 졌다고 생각하지만 아직 ${winnerName} 카드가 남아 있습니다.`;
  }
  if (category === "exercise") {
    return `운동화는 신을 준비가 됐는데 마음은 아직 소파에 있습니다. 몸과 귀찮음이 ${winnerName} 앞에서 협상 중입니다.`;
  }
  if (category === "shopping" || includesAny(q, ["살까", "구매", "장바구니", "결제"])) {
    return `장바구니는 이미 결제된 척하고 있습니다. 카드값은 뒤에서 ${loserName} 쪽 의견서를 제출했습니다.`;
  }
  if (category === "food") {
    return `오늘 입맛이 먼저 움직였습니다. 머릿속 한 입은 ${winnerName} 쪽 냄새를 먼저 맡은 것 같습니다.`;
  }
  if (category === "money") {
    return `차트는 조용한 척하지만 손가락은 바쁩니다. ${winnerName}와 ${loserName} 사이에서 계좌가 눈치를 봅니다.`;
  }
  if (category === "childcare") {
    return `아이의 에너지와 보호자의 체력이 서로 다른 말을 하고 있습니다. 웃음과 귀가 후 피곤함이 같이 계산됩니다.`;
  }
  if (category === "gift") {
    const targetSubject = withParticle(winner.targetName || loser.targetName || giftTarget(question), "이", "가");
    return `${targetSubject} 포장을 뜯는 순간을 먼저 상상해봤습니다. ${winnerWithAnd} ${loserName} 사이에서 별은 "첫 반응이냐, 오래 갖고 노느냐"를 놓고 회의 중입니다.`;
  }
  return `고민은 짧아 보이지만 머릿속에서는 이미 회의가 열렸습니다. 오늘은 ${winnerName}와 ${loserName} 사이에서 별이 먼저 참견합니다.`;
}

function zodiacWhyNarrative(sign, cards, category, winner, loser, question) {
  const signName = sign[0];
  const cardText = escapeHtml(narrativeCardPreview(cards));
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerFeatureA = escapeHtml(winner.features[0] || winner.vibe || "오늘의 장점");
  const winnerFeatureB = escapeHtml(winner.features[1] || winner.caution || "선택 후 느낌");
  const winnerFeatureSubject = featureSubjectText(
    winner.features[0] || winner.vibe || "오늘의 장점",
    winner.features[1] || winner.caution || "선택 후 느낌"
  );
  const hook = situationHook(category, winner, loser, question, sign);
  const contextClosing = contextZodiacClosing(
    category,
    signName,
    winner,
    loser,
    winner.features[0] || winner.vibe || "오늘의 장점",
    winner.features[1] || winner.caution || "선택 후 느낌"
  );

  const templates = {
    "황소자리": () => [
      hook,
      `황소자리는 오늘 새 모험보다 늘 가던 길을 더 오래 쳐다봅니다. "굳이?"가 첫마디입니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 황소자리는 "편한 게 최고지. 귀찮으면 진 겁니다" 쪽으로 기웁니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 황소자리의 편한 리듬에 붙습니다.`
    ],
    "양자리": () => [
      hook,
      `양자리는 이미 신발을 신었습니다. "일단 해. 생각은 나중."이 오늘 말버릇입니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 몸이 먼저 나갔습니다. 오래 재는 순간 양자리는 이미 문 앞입니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 양자리의 즉흥 속도에 올라탑니다.`
    ],
    "쌍둥이자리": () => [
      hook,
      `쌍둥이자리는 오늘 머릿속에 작은 단톡방을 열었습니다. "잠깐, 이것도 재밌는데?"가 바로 나옵니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 회의가 아직 안 끝났습니다. 찬성도 나고 반대도 나입니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 오늘 쌍둥이자리의 호기심을 덜 심심하게 만듭니다.`
    ],
    "게자리": () => [
      hook,
      `게자리는 오늘 결과보다 사람 마음, 표정, 돌아온 뒤의 기분을 먼저 봅니다. "마음은 어때요?"가 먼저입니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 그 사람 표정이 먼저입니다. 괜히 마음 쓰이면 그게 답입니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 게자리의 감정 온도를 덜 차갑게 만듭니다.`
    ],
    "사자자리": () => [
      hook,
      `사자자리는 오늘 애매하게 끌려가는 표정을 싫어합니다. "주인공은 나야" 모드입니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 "이왕이면 멋있게"가 기준입니다. 눈치보다가 장면 놓칩니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 사자자리의 당당함을 살립니다.`
    ],
    "처녀자리": () => [
      hook,
      `처녀자리는 오늘 마음보다 체크리스트가 먼저 켜지는 별자리입니다. "잠깐 계산 좀."부터 나옵니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 체크리스트 켰습니다. 오차 범위 안이면 갑니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 처녀자리의 점검표에서 살아남았습니다.`
    ],
    "천칭자리": () => [
      hook,
      `천칭자리는 오늘 선택지를 저울 위에 올려놓고 분위기까지 같이 봅니다. "둘 다 괜찮은데?"가 오래 갑니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 균형이 살짝 무너졌습니다. 분위기상 이쪽입니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 천칭자리의 저울에서 덜 흔들립니다.`
    ],
    "전갈자리": () => [
      hook,
      `전갈자리는 오늘 겉핥기 설명을 싫어합니다. "그래서 본질이 뭔데?"를 묻는 날입니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 대충은 싫습니다. 끝까지 파봤더니 ${winnerName} 쪽이 더 선명합니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 전갈자리의 몰입과 결단에 깊게 꽂힙니다.`
    ],
    "사수자리": () => [
      hook,
      `사수자리는 오늘 답답하게 묶이는 선택을 보면 바로 창문을 엽니다. "가보자."가 먼저입니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 경험치가 남습니다. 인생 뭐 있어요, 오늘은 장면 하나 만들 쪽입니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 사수자리의 경험치 욕심을 건드립니다.`
    ],
    "염소자리": () => [
      hook,
      `염소자리는 오늘 감정표보다 계획표를 먼저 펼칩니다. "결국 결과입니다."가 핵심입니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 미래의 내가 덜 혼나는 쪽을 봅니다. 할 건 해야 합니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 염소자리의 현실 기준표에 들어갑니다.`
    ],
    "물병자리": () => [
      hook,
      `물병자리는 오늘 남들이 고르는 기본값을 그대로 누르고 싶지 않습니다. "왜 꼭 그래야 하지?"가 먼저 나옵니다.`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 다르게 보면 이쪽입니다. 남들 다 가는 길은 재미없습니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 물병자리의 독특한 각도에서 살아납니다.`
    ],
    "물고기자리": () => [
      hook,
      `물고기자리는 오늘 숫자보다 잠들기 전 마음의 파동을 먼저 듣습니다. "마음이 먼저입니다."`,
      `<strong>${cardText}</strong> 카드가 뜬 날이라 오늘 기분은 이쪽입니다. 잠들기 전에 덜 출렁이는 쪽을 봅니다.`,
      contextClosing || `그래서 ${winnerName} 쪽으로 기울었습니다. ${winnerName}의 ${winnerFeatureSubject} 물고기자리의 감정선을 부드럽게 지나갑니다.`
    ]
  };

  return (templates[signName] || templates["황소자리"])().join(" ");
}

function zodiacAside(sign, category, winner) {
  const name = sign[0];
  const winnerName = escapeHtml(winner.name);
  const lines = {
    "황소자리": [
      `황소자리는 오늘 "굳이?"라고 말합니다. ${winnerName} 쪽이 더 편하고 덜 귀찮아 보입니다.`,
      `황소자리가 오늘은 베개 쪽에 누워 있습니다. 편한 게 최고라서 ${winnerName} 쪽을 봅니다.`
    ],
    "양자리": [
      `양자리는 이미 현관문 근처입니다. 일단 해보고 생각하자는 쪽이라 ${winnerName}에 붙었습니다.`,
      `양자리는 가만히 있으면 답답해 죽는 날입니다. ${winnerName} 쪽 버튼이 먼저 눌렸습니다.`
    ],
    "쌍둥이자리": [
      `쌍둥이자리는 "야 잠깐만" 하고 아직도 혼자 회의 중입니다. 그래도 ${winnerName} 쪽이 더 궁금합니다.`,
      `쌍둥이자리는 둘 다 해보고 싶어 하지만, 지금 수다방에서는 ${winnerName} 의견이 더 큽니다.`
    ],
    "게자리": [
      `게자리는 "마음은 어때?"부터 묻습니다. 오늘 밤 마음 편한 쪽은 ${winnerName}입니다.`,
      `게자리는 그 사람, 내 기분, 후회까지 같이 봅니다. ${winnerName} 쪽이 덜 차갑게 남습니다.`
    ],
    "사자자리": [
      `사자자리는 "주인공은 너잖아"라고 말합니다. 오늘 스포트라이트는 ${winnerName} 쪽입니다.`,
      `사자자리는 눈치 보는 선택을 싫어합니다. ${winnerName} 쪽이 더 당당합니다.`
    ],
    "처녀자리": [
      `처녀자리는 이미 엑셀을 켰습니다. 계산해보니 ${winnerName} 쪽이 더 깔끔합니다.`,
      `처녀자리는 "확률은? 효율은?"부터 봅니다. 오늘 기준표에는 ${winnerName} 쪽이 낫습니다.`
    ],
    "천칭자리": [
      `천칭자리는 아직도 저울을 흔들고 있습니다. 그래도 오늘 균형은 ${winnerName} 쪽으로 살짝 갑니다.`,
      `천칭자리는 "둘 다 괜찮은데?"라고 말하지만, 분위기는 ${winnerName} 쪽이 덜 깨집니다.`
    ],
    "전갈자리": [
      `전갈자리는 "그래서 본질이 뭔데?"라고 묻습니다. 오늘 결론은 ${winnerName} 쪽에 더 깊게 꽂힙니다.`,
      `전갈자리는 대충을 싫어합니다. 애매함보다 ${winnerName} 쪽이 더 확실합니다.`
    ],
    "사수자리": [
      `사수자리는 "가보자, 재밌잖아" 쪽입니다. 오늘 경험치는 ${winnerName}에 붙습니다.`,
      `사수자리는 지도 없이도 갑니다. ${winnerName} 쪽이 오늘의 작은 모험입니다.`
    ],
    "염소자리": [
      `염소자리는 "나중에 도움 되냐?"부터 묻습니다. ${winnerName} 쪽이 미래의 나에게 덜 혼납니다.`,
      `염소자리는 해야 할 건 해야 한다는 쪽입니다. 오늘 결과표에는 ${winnerName}이 더 낫습니다.`
    ],
    "물병자리": [
      `물병자리는 "왜 꼭 그래야 하지?"라고 묻습니다. 다르게 보면 ${winnerName} 쪽이 더 재밌습니다.`,
      `물병자리가 고민판을 옆으로 돌렸습니다. 그러자 ${winnerName} 쪽이 더 자기 방식처럼 보입니다.`
    ],
    "물고기자리": [
      `물고기자리는 "오늘 기분은?"부터 묻습니다. 잠들기 전에 덜 출렁이는 쪽은 ${winnerName}입니다.`,
      `물고기자리는 숫자보다 마음이 끌리는 쪽을 봅니다. 오늘은 ${winnerName} 쪽이 더 부드럽게 남습니다.`
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

  if (category === "gift") {
    const target = escapeHtml(winner.targetName || giftTarget(subjectName || ""));
    if (cardHas(cards, ["도전", "에너지", "활동성", "재미", "호기심", "상상력"])) {
      return `${voiceLine} ${subject} 고민이라면 ${winnerName} 쪽이 ${target}의 눈이 먼저 반짝일 가능성이 큽니다. ${winnerFeatures}이 선물 뜯는 순간의 리액션을 더 크게 만들 수 있어요.`;
    }
    if (cardHas(cards, ["편안함", "안정감", "실속", "꾸준함", "현실성", "만족감"])) {
      return `${voiceLine} ${subject} 고민이라면 ${winnerName} 쪽이 첫날만 반짝하고 끝나기보다 며칠 뒤에도 손이 갈 가능성이 커 보입니다. ${winnerFeatures}이 오래 쓰는 선물 쪽에 더 붙습니다.`;
    }
    return `${voiceLine} ${subject} 고민이라면 ${winnerName} 쪽이 받는 순간의 표정과 나중에 다시 꺼내 놀 확률 사이에서 더 괜찮아 보입니다.`;
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
  const cardText = escapeHtml(narrativeCardPreview(cards));
  const tinyPools = {
    food: [
      `${signLabel}는 오늘 메뉴판에 별가루만 조금 뿌렸습니다. 카드는 <strong>${cardText}</strong>, 결론은 ${winnerName} 쪽.`,
      `${signLabel}도 ${loserName}에 잠깐 흔들렸지만, 계산대 앞에서는 ${winnerName} 쪽에 섰습니다.`
    ],
    shopping: [
      `${signLabel}는 계산대 옆에서 조용히 구경 중입니다. 오늘 카드는 <strong>${cardText}</strong>.`,
      `${signLabel}가 한마디만 합니다. "${winnerName}, 나쁘지 않은데?"`
    ],
    relationship: [
      `${signLabel}는 옆에서 눈치만 봅니다. 오늘 카드는 <strong>${cardText}</strong>, 말은 짧게 가래요.`,
      `${signLabel}가 크게 참견하진 않습니다. 그냥 ${winnerName} 쪽을 살짝 밀었습니다.`
    ],
    daily: [
      `${signLabel}는 오늘 말을 길게 안 합니다. 별이 ${winnerName} 쪽에 스티커를 붙이고 도망갔습니다.`,
      `${signLabel}가 팝콘 들고 ${winnerName} 쪽에 앉았습니다.`
    ]
  };
  const pool = tinyPools[category] || tinyPools.daily;
  return pool;
}

function futureComment(category, winner, question, seed, sign) {
  const name = escapeHtml(winner.name);
  const subject = escapeHtml(winner.subjectName || winner.name);
  const raw = `${winner.name} ${winner.subjectName || ""} ${question}`.replace(/\s/g, "").toLowerCase();
  const winnerRaw = `${winner.name} ${winner.subjectName || ""}`.replace(/\s/g, "").toLowerCase();
  const variationSeed = Math.floor(Date.now() / 1000);
  const signName = sign && sign[0] ? sign[0] : "황소자리";
  if (category === "food") {
    const character = foodCharacterLines(winner.name);
    if (character && character.future) {
      return cleanPlayTone(pick(character.future, seed + raw.length + question.length + variationSeed));
    }
  }
  if (category === "game") {
    const character = gameCharacterLines(winner.name);
    if (character && character.future) {
      return cleanPlayTone(pick(character.future, seed + raw.length + question.length + variationSeed));
    }
  }
  if (category === "shopping") {
    const highValue = highValuePurchaseProfile(`${winner.name} ${winner.subjectName || ""} ${question}`);
    if (highValue) {
      const pool = winner.intent === "skip" ? highValue.futureSkip : highValue.futureGo;
      return cleanPlayTone(pick(pool, seed + raw.length + question.length + variationSeed));
    }
  }
  const cultural = culturalMeaningProfile(winner.name);
  if (cultural && cultural.future) {
    return cleanPlayTone(pick(cultural.future, seed + raw.length + question.length + variationSeed));
  }
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
      `${name} 먹고 "아, 이거였네" 할 확률이 높습니다.`,
      `먹고 나서 말수가 줄면 성공입니다.`,
      `추가 주문을 합리화하는 미래가 보입니다.`,
      `${subject} 쪽으로 간 나, 메뉴판을 조용히 닫았습니다.`,
      `계산서 보기 전까지는 꽤 행복할 예정입니다.`,
      `먹고 나서 고개를 끄덕이면 그걸로 끝입니다.`,
      `배고픈 나와 고민 많은 내가 동시에 조용해졌습니다.`,
      `오늘 메뉴판은 ${name}에서 접혔습니다.`,
      `입맛이 먼저 주문서 올리고 미래의 내가 승인했습니다.`,
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
    gift: [
      `포장지를 뜯는 순간의 표정을 상상하면 답이 조금 보입니다.`,
      `첫 리액션은 크게, 오래 놀 확률은 조용히 계산했습니다.`,
      `받는 사람보다 주는 사람이 더 설렌 장면일 수도 있습니다.`,
      `며칠 뒤 바닥에 아직 굴러다니면 성공한 선물입니다.`,
      `"우와" 한마디가 나오면 일단 절반은 이긴 겁니다.`,
      `집에 와서 또 찾으면 그때 진짜 합격입니다.`,
      `포장지는 버려져도 기억은 조금 남을 수 있습니다.`,
      `선물 고르는 사람의 진심도 같이 포장됐습니다.`,
      `받는 순간의 눈빛이 오늘의 심사위원입니다.`,
      `장난감보다 그걸 보고 웃는 얼굴이 진짜 결과입니다.`
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
    exercise: [
      `운동화가 드디어 장식품 신세를 벗었습니다.`,
      `시작 전엔 싫었는데 끝나고 나니 괜히 뿌듯합니다.`,
      `소파가 붙잡았지만 몸이 한 번 이겼습니다.`,
      `땀은 났고 핑계는 줄었습니다.`,
      `미래의 체력이 오늘의 선택에 작게 박수칩니다.`,
      `가기 전엔 귀찮았고, 하고 나니 말이 줄었습니다.`,
      `오늘의 나태 회의가 조기 종료됐습니다.`,
      `운동 끝나고 물 마시는 순간만큼은 주인공입니다.`,
      `몸은 힘든데 기분은 이상하게 덜 무겁습니다.`,
      `운동화가 "드디어?" 하고 눈을 떴습니다.`
    ],
    hygiene: [
      `샤워기 물소리에 귀찮음이 조금 씻겨 내려갔습니다.`,
      `이불 들어가기 전에 개운함 하나는 챙겼습니다.`,
      `씻기 전의 나는 투덜댔고, 씻은 뒤의 나는 조용해졌습니다.`,
      `찝찝함 회의가 욕실 앞에서 종료됐습니다.`,
      `머리는 몰라도 몸은 방금 고맙다고 했습니다.`,
      `수건을 집는 순간부터 미래의 내가 살짝 웃었습니다.`,
      `귀찮음은 컸지만 개운함이 판정승했습니다.`,
      `오늘의 몸 상태가 새로고침 버튼을 눌렀습니다.`,
      `물이 닿자마자 "왜 미뤘지"가 나올 수 있습니다.`,
      `씻고 나면 침대가 더 당당하게 기다립니다.`
    ],
    study: [
      `책상 앞에 앉은 것만으로도 미래의 내가 박수쳤습니다.`,
      `진도 한 칸이 마음의 빚을 조금 줄였습니다.`,
      `20분짜리 시작이 생각보다 큰 알리바이가 됐습니다.`,
      `공부 요정은 안 왔지만 책은 열렸습니다.`,
      `내일의 내가 오늘의 페이지를 보고 고개를 끄덕입니다.`,
      `미룰 핑계가 하나 줄고 체크 표시가 하나 늘었습니다.`,
      `책상은 차갑고 마음은 조금 덜 쫓깁니다.`,
      `오늘 한 줄이라도 봤으면 완전 패배는 아닙니다.`,
      `시험/마감이라는 단어가 방금 살짝 작아졌습니다.`,
      `미래의 내가 "그래도 시작은 했네"라고 합니다.`
    ],
    game: [
      `한 판만 하겠다는 약속이 지금 면접을 보고 있습니다.`,
      `재미는 왔고 시간은 조용히 도망갈 준비 중입니다.`,
      `컨트롤러는 웃고 내일 알람은 긴장했습니다.`,
      `스트레스는 줄었지만 시계는 증거를 남깁니다.`,
      `오늘의 나와 내일의 나가 플레이타임을 두고 협상합니다.`,
      `게임은 켜졌고 자제력은 관전 모드입니다.`,
      `한 판이 정말 한 판이면 이건 거의 승리입니다.`,
      `재미 담당 부서는 만족했고 수면 담당 부서는 항의 중입니다.`,
      `미래의 내가 플레이 기록을 보며 침묵할 수 있습니다.`,
      `종료 버튼을 누를 수 있으면 오늘은 꽤 어른입니다.`
    ],
    pet: [
      `귀여운 사진은 늘고, 책임감도 같이 입주합니다.`,
      `미래의 내가 산책 시간이나 모래 삽을 들고 있을 수 있습니다.`,
      `이 선택은 오늘의 설렘보다 매일의 루틴에서 진짜 평가받습니다.`,
      `털은 남고 애착도 남습니다. 둘 다 꽤 오래 갑니다.`,
      `귀엽다는 말로 시작했지만 생활표가 같이 따라옵니다.`,
      `미래의 내가 간식 봉투를 흔들며 이 결정을 다시 떠올립니다.`,
      `집 안 공기가 조금 달라질 수 있습니다. 귀여움 쪽으로요.`,
      `반려는 선택보다 동거에 가깝다는 걸 미래의 내가 알게 됩니다.`,
      `사진첩은 행복하고 청소기는 바빠질 예정입니다.`,
      `귀여움에 졌다면 이제 루틴으로 갚아야 합니다.`
    ],
    amusement: [
      `사진은 남고 다리는 다음 날 항의할 수 있습니다.`,
      `대기줄에서 한 번, 놀이기구에서 한 번 오늘 선택이 평가됩니다.`,
      `돌아오는 길 말수가 줄어도 추억은 꽤 시끄럽게 남습니다.`,
      `간식값과 체력이 같이 빠져나갈 예정입니다.`,
      `놀이기구보다 줄 서는 시간이 더 오래 기억날 수도 있습니다.`,
      `미래의 내가 발바닥을 보며 오늘을 떠올립니다.`,
      `하루가 이벤트가 되면 피곤함도 약간은 용서됩니다.`,
      `사진첩은 웃고, 무릎은 조용히 불만 접수합니다.`,
      `재미는 탔고 체력은 내려놨습니다.`,
      `집 가는 길에 "그래도 재밌었다"가 나오면 성공입니다.`
    ],
    hobby: [
      `재미는 왔고 시간은 조용히 사라질 준비를 합니다.`,
      `한 시간만 하자는 말이 오늘도 신뢰를 잃을 수 있습니다.`,
      `스트레스는 빠지고 목이나 손목이 대신 항의할 수 있습니다.`,
      `끝낼 타이밍만 잡으면 꽤 괜찮은 선택입니다.`,
      `미래의 내가 시계를 보고 살짝 놀랄 가능성이 있습니다.`,
      `오늘의 취미는 기분 전환과 시간 삭제 사이에 있습니다.`,
      `시작은 가볍고, 끝은 늘 생각보다 늦습니다.`,
      `재밌으면 이긴 건데 내일 피곤하면 재심이 열립니다.`,
      `놀고 나서 "딱 좋았다"가 나오면 성공입니다.`,
      `자제력은 관전 모드, 재미는 선발 출전입니다.`
    ],
    travel: [
      `지도 앱이 열리자 일상이 살짝 질투했습니다.`,
      `사진첩에 들어갈 장면 하나가 대기 중입니다.`,
      `지갑은 걱정하지만 마음은 이미 창밖을 보고 있습니다.`,
      `다녀오면 피곤해도 이야깃거리는 남습니다.`,
      `숙소 검색창 앞에서 현실과 설렘이 악수했습니다.`,
      `미래의 내가 "그때 가길 잘했다"를 준비할 수도 있습니다.`,
      `동선은 귀찮지만 바람은 꽤 설득력 있습니다.`,
      `여행 계획 하나가 답답한 하루에 숨구멍을 냈습니다.`,
      `돌아오는 길의 피로까지 계산하면 꽤 현실적인 선택입니다.`,
      `오늘의 탈출 버튼이 살짝 반짝였습니다.`
    ],
    beverage: [
      `${name} 한 모금 뒤에 미래의 내가 말없이 컵을 다시 봅니다.`,
      `컵을 드는 순간 오늘 텐션이 어느 쪽인지 들켰습니다.`,
      `마시고 나서 "오늘은 이 온도였네"가 나올 수 있습니다.`,
      `카페인보다 먼저 손끝 온도가 반응했습니다.`,
      `미래의 내가 컵을 내려놓고 조용히 고개를 끄덕입니다.`,
      `갈증과 기분이 짧게 회의를 끝냈습니다.`,
      `오늘 커피 선택은 생각보다 몸이 먼저 알고 있었습니다.`,
      `한 모금 마시고 나면 고민이 조금 덜 진지해질 겁니다.`,
      `컵 안의 온도가 오늘 기분을 설득했습니다.`,
      `마지막 한 모금까지 덜 어색하면 성공입니다.`
    ],
    drink: includesAny(winnerRaw, ["소주"]) ? [
      `잔이 돌기 시작하면 말문도 같이 열릴 예정입니다.`,
      `내일 얼굴색은 모르겠고, 오늘 대화는 빨라집니다.`,
      `안주 나오기 전에 이미 분위기가 데워질 수 있습니다.`,
      `한 잔만 하자는 말이 제일 의심스럽습니다.`,
      `집에 갈 때 물 한 병 사면 미래의 내가 박수칩니다.`,
      `소주잔은 작지만 후폭풍은 가끔 큽니다.`,
      `말이 먼저 풀리고 계산은 나중에 옵니다.`,
      `오늘의 속도는 확실히 빠릅니다. 내일은 협상입니다.`
    ] : includesAny(winnerRaw, ["위스키", "whisky", "whiskey"]) ? [
      `얼음 녹는 속도만큼 오늘 밤도 천천히 갑니다.`,
      `잔 하나 들고 폼 잡는 미래가 보입니다. 나쁘진 않습니다.`,
      `소란은 줄고, 괜히 말투가 조금 느려집니다.`,
      `향 맡는 척하다가 생각보다 오래 앉아 있을 수 있습니다.`,
      `오늘은 빨리 취하기보다 오래 버티는 쪽입니다.`,
      `잔을 내려놓는 소리까지 오늘의 연출입니다.`,
      `가격은 묵직하지만 사진은 그럴듯할 수 있습니다.`,
      `분위기 말고 폼입니다. 오늘은 폼이 밥값 합니다.`
    ] : [
      `술잔은 웃고, 내일 알람은 아직 심사 중입니다.`,
      `한 잔의 나는 용감하고, 내일의 나는 물을 찾습니다.`,
      `오늘 밤은 풀리고 내일 아침은 협상합니다.`,
      `적당히 끝내면 미래의 내가 의외로 칭찬합니다.`,
      `안주보다 물을 같이 주문하면 승률이 올라갑니다.`,
      `기분은 가벼워지고 귀가 시간은 무거워질 수 있습니다.`
    ],
    shopping: includesAny(winnerRaw, ["tv", "티비", "텔레비전", "테레비"]) && winner.intent === "go" ? [
      `리모컨을 들 때마다 오늘 선택이 다시 떠오를 수 있습니다.`,
      `거실 화면 앞에서 미래의 내가 조용히 평가합니다.`,
      `화질이 바뀌면 영화 첫 장면부터 티가 납니다.`,
      `바꿨다면 배송 기사님 오는 날부터 거실 분위기가 달라집니다.`,
      `미래의 내가 리모컨을 누르며 "그래, 이 정도면 됐다" 할 수도 있습니다.`,
      `화면 크기와 카드값이 서로 눈치를 봅니다.`,
      `TV 앞에 앉는 시간이 많다면 이 선택은 매일 검토됩니다.`,
      `거실 조명이 꺼지고 화면이 켜질 때 답이 다시 보일 겁니다.`,
      `오늘의 선택은 리모컨보다 통장이 더 오래 기억할 수도 있습니다.`
    ] : includesAny(winnerRaw, ["tv", "티비", "텔레비전", "테레비"]) ? [
      `안 바꿨다면 통장은 웃고, 화면은 조금 더 버팁니다.`,
      `리모컨은 그대로고 예산도 그대로라 일단 평화롭습니다.`,
      `거실 화면은 조금 더 일하게 됐고, 통장은 박수칩니다.`,
      `화질 아쉬움은 남지만 카드값 공포는 오늘 쉬어갑니다.`,
      `미래의 내가 TV 앞에서 "아직은 볼 만하지"라고 합리화할 수 있습니다.`,
      `새 화면은 미뤘지만 예산표는 덜 흔들렸습니다.`,
      `화면 크기는 그대로지만 지출도 그대로라 균형은 맞습니다.`,
      `오늘은 리모컨보다 통장의 표정이 더 밝습니다.`,
      `거실 분위기는 그대로고, 잔고도 그대로에 가깝습니다.`,
      `TV는 한 시즌 더 연장 계약을 따낸 셈입니다.`
    ] : [
      `장바구니가 오늘도 혼자 결제 연기를 했습니다.`,
      `카드는 긴장했고 손가락은 침착한 척했습니다.`,
      `사고 나서 합리화 문장이 자동 생성됐습니다.`,
      `안 샀다면 통장이 조용히 고개를 끄덕였습니다.`,
      `가격표 앞에서 마음과 지갑이 짧게 싸웠습니다.`,
      `미래의 내가 실제로 잘 쓰는지 조용히 감시합니다.`,
      `오늘의 소비 회의가 예상보다 뜨거웠습니다.`,
      `위시리스트가 한 칸 줄거나, 욕망이 한 칸 줄었습니다.`,
      `결제 버튼 앞에서 별도 잠깐 숨을 참았습니다.`,
      `사든 안 사든 이유는 이미 머릿속에 준비돼 있었습니다.`
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
  if (category !== "daily") {
    return pick(starts, seed + raw.length + name.length + question.length + variationSeed + hashText(`${signName}-${category}`));
  }
  const zodiacStarts = {
    "양자리": [`어차피 할 거였잖아?`, `그래도 질렀네.`, `멈췄으면 더 답답했을 듯.`, `출발이 결론보다 빨랐습니다.`, `후회는 나중 부서로 넘겼습니다.`],
    "황소자리": [`좋아. 다시 눕자.`, `귀찮음 대비 효율이 괜찮았다.`, `생각보다 안 힘들었네.`, `편한 쪽으로 잘 마무리했습니다.`, `배부르고 편하면 일단 성공입니다.`],
    "쌍둥이자리": [`회의 결과가 드디어 나왔습니다.`, `머릿속 토론회가 종료되었습니다.`, `반대파도 대충 동의했습니다.`, `찬성 의견도 본인이고 반대 의견도 본인이었습니다.`, `결정했지만 아직 말은 더 하고 싶습니다.`],
    "게자리": [`마음이 덜 다쳤으면 이긴 겁니다.`, `후회보다 안심이 조금 더 남았습니다.`, `오늘 밤 마음 편하면 됐습니다.`, `그 사람 생각까지 하느라 고생했습니다.`, `감정 온도가 크게 떨어지진 않았습니다.`],
    "사자자리": [`생각보다 주인공 엔딩이었다.`, `연출 점수는 높게 주겠습니다.`, `나쁘지 않은 장면이었다.`, `눈치 덜 본 선택이라 보기 좋았습니다.`, `오늘 컷은 꽤 당당했습니다.`],
    "처녀자리": [`체크 표시 하나 추가.`, `오차 범위 내 성공.`, `기록할 가치가 있었다.`, `머릿속 엑셀에 저장됐습니다.`, `정리 기준으로는 나쁘지 않았습니다.`],
    "천칭자리": [`저울이 드디어 멈췄습니다.`, `균형은 아주 살짝 이쪽이었습니다.`, `둘 다 괜찮았지만 하나는 골랐습니다.`, `분위기 점수는 나쁘지 않았습니다.`, `고민한 시간까지 포함하면 꽤 우아했습니다.`],
    "전갈자리": [`결론을 냈으니 이제 끝까지 봅니다.`, `대충 넘기지 않은 건 인정입니다.`, `마음속 선이 진하게 그어졌습니다.`, `집요하게 본 보람은 있었습니다.`, `본질 찾기 회의가 잠시 종료됐습니다.`],
    "사수자리": [`경험치 하나 추가.`, `인생 뭐 있나 싶었고, 일단 갔습니다.`, `재밌었으면 이미 반은 성공입니다.`, `지도 없이 간 선택치고 나쁘지 않습니다.`, `오늘도 작은 모험 하나 완료했습니다.`],
    "염소자리": [`미래의 나에게 덜 혼날 선택입니다.`, `해야 할 건 했습니다.`, `결과표에 적을 말은 생겼습니다.`, `책임감이 또 이겼습니다.`, `나중에 도움 될 가능성은 있습니다.`],
    "물병자리": [`남들과 다른 각도로 본 값은 있었습니다.`, `왜 꼭 그래야 하냐는 질문이 통했습니다.`, `조금 이상하지만 내 방식입니다.`, `반전 하나는 챙겼습니다.`, `평범한 답은 아니었지만 지루하진 않았습니다.`],
    "물고기자리": [`마음이 덜 출렁이면 이긴 겁니다.`, `잠들기 전 덜 생각나면 성공입니다.`, `감정선이 크게 다치진 않았습니다.`, `오늘 기분 기준으로는 나쁘지 않았습니다.`, `조용히 위로되는 선택이었습니다.`]
  };
  const pool = [];
  const pushMixed = (startList) => {
    startList.forEach((start) => endings.forEach((ending) => {
      const repeatedFuture = start.includes("미래의 내가") && ending.includes("미래의 내가");
      const repeatedChoice = start.includes("오늘의 선택") && ending.includes("오늘의 선택");
      if (!repeatedFuture && !repeatedChoice) pool.push(`${start} ${ending}`);
    }));
  };
  pushMixed(starts);
  pushMixed(zodiacStarts[signName] || zodiacStarts["황소자리"]);
  return cleanPlayTone(pick(pool, seed + raw.length + name.length + question.length + variationSeed));
}

function shareableAdvice(category, winner, loser, question, seed, sign) {
  const winnerName = escapeHtml(winner.name);
  const loserName = escapeHtml(loser.name);
  const winnerTopic = escapeHtml(withParticle(winner.name, "은", "는"));
  const loserTopic = escapeHtml(withParticle(loser.name, "은", "는"));
  const signName = sign && sign[0] ? sign[0] : "황소자리";
  const raw = `${question} ${winner.name} ${loser.name} ${winner.subjectName || ""} ${loser.subjectName || ""}`.replace(/\s/g, "").toLowerCase();
  const winnerRaw = `${winner.name} ${winner.subjectName || ""}`.replace(/\s/g, "").toLowerCase();
  const loserRaw = `${loser.name} ${loser.subjectName || ""}`.replace(/\s/g, "").toLowerCase();
  const signHooks = {
    "양자리": ["생각은 나중, 오늘은 손이 먼저입니다.", "양자리는 이미 마음속으로 시작 버튼 눌렀습니다.", "일단 해보고 후회는 고객센터로 넘깁니다."],
    "황소자리": ["편한 게 이기면 그게 오늘의 정답입니다.", "황소자리는 굳이 힘든 행복을 고르지 않습니다.", "몸이 덜 투덜대는 쪽이 오늘의 승자입니다."],
    "쌍둥이자리": ["찬성도 나고 반대도 나인데, 오늘은 이쪽 목소리가 큽니다.", "쌍둥이자리는 고민도 콘텐츠로 만듭니다.", "회의는 길었고 결론은 생각보다 가볍습니다."],
    "게자리": ["마음이 덜 쓰이는 쪽이 결국 오래 갑니다.", "게자리는 결과보다 밤에 덜 신경 쓰이는 쪽입니다.", "후회보다 안심이 더 오래 남습니다."],
    "사자자리": ["오늘은 조금 폼 나는 선택이 이깁니다.", "사자자리는 눈치보다가 장면 놓치는 걸 싫어합니다.", "주인공 컷으로 보면 이쪽입니다."],
    "처녀자리": ["계산해보니 덜 찝찝한 쪽입니다.", "처녀자리는 감정도 체크리스트에 넣고 봅니다.", "뒤처리까지 생각하면 답이 조금 보입니다."],
    "천칭자리": ["둘 다 괜찮지만 오늘 그림은 이쪽입니다.", "저울이 흔들리다 결국 여기서 멈췄습니다.", "분위기까지 계산하면 이쪽이 덜 삐걱댑니다."],
    "전갈자리": ["대충 고를 거면 애초에 안 물어봤습니다.", "전갈자리는 꽂히면 끝까지 갑니다.", "오늘은 애매함보다 확실한 쪽입니다."],
    "사수자리": ["후회할 자유까지 포함입니다.", "사수자리는 경험치 남는 쪽을 그냥 못 지나칩니다.", "답답하면 움직이는 쪽이 이깁니다."],
    "염소자리": ["미래의 나한테 덜 혼나는 쪽입니다.", "결국 남는 게 있으면 염소자리는 고개를 끄덕입니다.", "오늘의 선택도 성과표에 올라갑니다."],
    "물병자리": ["남들 답 말고 내 방식이면 됩니다.", "물병자리는 평범한 답을 그냥 두지 않습니다.", "왜 꼭 그래야 하냐고 묻다 보니 이쪽입니다."],
    "물고기자리": ["마음이 덜 출렁이면 그걸로 이긴 겁니다.", "물고기자리는 잠들기 전 덜 생각나는 쪽을 봅니다.", "오늘 기분이 조용히 이쪽으로 흘렀습니다."]
  };
  const zodiacTag = () => pick(signHooks[signName] || signHooks["황소자리"], hashText(`${question}-${winner.name}-${loser.name}-${signName}-${seed}-share-zodiac-tag`));
  const withZodiacTag = (line) => cleanPlayTone(`${line} ${zodiacTag()}`);
  if (category === "relationship" && includesAny(raw, ["우리집앞", "내집앞", "친구집앞", "상대집앞"])) {
    const locationLines = winnerRaw.includes("우리집앞") || winnerRaw.includes("내집앞")
      ? [
        `우리집앞은 편하고, 친구집앞은 마음을 보여줍니다.`,
        `오늘은 멀리 움직이는 용기보다 편한 거리의 안정감입니다.`,
        `만남도 장소가 아니라 누가 얼마나 움직이느냐가 은근히 큽니다.`,
        `우리집앞은 덜 움직이고, 대신 관계의 온도를 가까이 둡니다.`
      ]
      : [
        `친구집앞은 내가 움직였다는 증거가 남는 선택입니다.`,
        `오늘은 편한 거리보다 먼저 다가가는 그림이 더 큽니다.`,
        `우리집앞은 편하지만, 친구집앞은 마음을 행동으로 보여줍니다.`,
        `만남에서 가끔은 거리보다 태도가 먼저 보입니다.`
      ];
    return withZodiacTag(pick(locationLines, hashText(`${question}-${winner.name}-${loser.name}-${signName}-${seed}-relationship-location-share`)));
  }
  const pools = {
    food: [
      `${winnerName}은 배를 설득하고, ${loserName}은 미련을 남깁니다.`,
      `${winnerName} 먹고 후회하면 그건 메뉴 탓이 아니라 욕심 탓입니다.`,
      `${winnerName} 쪽은 먹는 순간 변명이 줄어듭니다.`,
      `${loserName}도 좋지만 오늘 침샘은 ${winnerName} 편입니다.`,
      `${winnerName} 앞에서는 다짐이 잠깐 자리를 비웁니다.`
    ],
    drink: [
      `${winnerTopic} 오늘 밤을 살리고, ${loserTopic} 내일 아침을 살립니다.`,
      `술잔은 부르지만 알람은 아직 허락하지 않았습니다.`,
      `${winnerName} 고르면 기분은 웃고, 내일 얼굴색은 협상합니다.`,
      `${loserName} 잔은 옆에 있지만, 오늘 손목은 ${winnerName} 쪽으로 기울었습니다.`
    ],
    beverage: [
      `${winnerTopic} 손에 잡히고, ${loserTopic} 머리로 고민합니다.`,
      `오늘 커피는 취향보다 손끝 온도가 먼저 골랐습니다.`,
      `${winnerName} 한 모금이면 고민이 조금 덜 진지해집니다.`,
      `${loserName} 컵은 옆에서 대기 중이고, 오늘 손은 ${winnerName} 쪽으로 갑니다.`
    ],
    shopping: [
      `버티기는 돈을 지키고, 구매는 정신건강을 지킵니다.`,
      `${winnerName}은 욕망이고, ${loserName}은 예산표입니다.`,
      `지름신은 말이 많고, 통장은 표정이 안 좋습니다.`,
      `${winnerName} 고르면 마음은 편해지고 지갑은 말수가 줄어듭니다.`,
      `사지 않으면 잔고가 웃고, 사면 내가 웃습니다.`
    ],
    relationship: [
      `차단은 버튼 한 번, 안 차단은 상상력 무한대입니다.`,
      `말 안 하면 조용한 게 아니라 머릿속이 시끄럽습니다.`,
      `${winnerName}은 마음을 줄이고, ${loserName}은 상상을 늘립니다.`,
      `답장은 상대 몫이고, 내 마음 정리는 내 몫입니다.`,
      `폰을 덜 들여다보게 만드는 쪽이 오늘의 승자입니다.`
    ],
    attendance: [
      `이불은 강하지만 월급은 더 현실적입니다.`,
      `${winnerName}은 오늘을 힘들게 하고, 내일을 덜 괴롭힙니다.`,
      `출근은 몸을 쓰고, 결근은 마음을 씁니다.`,
      `오늘의 귀찮음과 내일의 찝찝함이 정면승부했습니다.`
    ],
    travel: [
      `${winnerName}은 피곤해도 이야깃거리가 남는 쪽입니다.`,
      `여행은 돈을 쓰고, 사진첩은 증거를 남깁니다.`,
      `${loserName}도 좋지만 오늘 예고편은 ${winnerName} 쪽이 먼저 틀어졌습니다.`,
      `${winnerName} 고르면 몸은 피곤하고 마음은 덜 납작합니다.`
    ],
    game: [
      `${winnerName}은 재미를 주고, 시간은 몰래 가져갑니다.`,
      `한 판만 한다는 말은 오늘도 신뢰를 잃었습니다.`,
      `${winnerName} 켜면 스트레스는 줄고 시계는 배신합니다.`,
      `게임은 켜졌고 자제력은 관전 모드입니다.`
    ],
    pet: [
      `${winnerName}은 귀여움이고, ${loserName}은 다른 생활 리듬입니다.`,
      `반려동물은 예쁨보다 매일 반복되는 루틴이 본편입니다.`,
      `${winnerName} 고르면 사진첩은 늘고, 책임감도 같이 입주합니다.`,
      `귀여운 건 1초고 돌봄은 매일입니다.`
    ],
    amusement: [
      `${winnerName}은 설렘을 주고, 대기줄은 인내심을 가져갑니다.`,
      `놀이공원은 놀이기구보다 돌아오는 다리가 진실을 말합니다.`,
      `${winnerName} 고르면 사진은 남고 체력은 협상합니다.`,
      `오늘의 재미는 줄 서는 시간까지 포함 가격입니다.`
    ],
    hobby: [
      `${winnerName}은 재미를 주고, 시간은 몰래 가져갑니다.`,
      `노는 선택은 시작보다 끝낼 타이밍이 더 어렵습니다.`,
      `${winnerName} 고르면 스트레스는 줄고 시계는 배신합니다.`,
      `오늘의 취미는 내일의 피곤함과 조용히 계약합니다.`
    ],
    hygiene: [
      `씻기 전엔 귀찮고, 씻고 나면 내가 맞습니다.`,
      `물 틀기 전까지만 인생 최대 고민입니다.`,
      `${winnerName}은 5분 귀찮고, 안 하면 계속 찝찝합니다.`,
      `샤워기는 귀찮음을 이기는 가장 빠른 버튼입니다.`
    ],
    exercise: [
      `운동은 시작 전이 제일 세고, 끝나면 내가 이깁니다.`,
      `운동화가 오늘은 장식품 탈출을 노립니다.`,
      `${winnerName}은 몸을 괴롭히고 자존감을 살립니다.`,
      `소파는 편하고, 운동은 내일의 변명을 줄입니다.`
    ],
    study: [
      `책상에 앉는 순간 이미 핑계 하나는 죽었습니다.`,
      `공부는 싫지만 미룬 공부는 더 싫습니다.`,
      `${winnerName}은 오늘을 쓰고 내일의 압박을 줄입니다.`,
      `한 페이지라도 보면 완전 패배는 아닙니다.`
    ],
    childcare: [
      `아이 웃음은 남고, 보호자 체력은 잠깐 외출합니다.`,
      `육아 선택은 추억과 허리 사이의 협상입니다.`,
      `${winnerName}은 아이를 웃기고 어른을 조용히 지치게 할 수 있습니다.`,
      `사진은 남고, 양말은 더러워질 예정입니다.`
    ],
    gift: [
      `선물은 가격보다 뜯는 순간 표정이 먼저입니다.`,
      `${winnerName}은 포장지 뜯는 순간을 노립니다.`,
      `받는 사람 눈이 반짝이면 영수증은 잠깐 조용해집니다.`,
      `좋은 선물은 며칠 뒤에도 바닥에 굴러다닙니다.`
    ],
    money: [
      `현금도 포지션이고, 충동도 포지션입니다.`,
      `돈 앞에서는 용기보다 수면의 질이 중요합니다.`,
      `${winnerName}은 계좌를 지키고, ${loserName}은 심장을 뛰게 합니다.`,
      `버튼 누르는 건 1초, 차트 보는 건 하루 종일입니다.`
    ],
    place: [
      `${winnerName}은 신발을 신게 하고, ${loserName}은 체력을 지킵니다.`,
      `밖은 피곤하고, 안 나가면 하루가 너무 조용합니다.`,
      `${winnerName} 고르면 체력은 빠지고 장면은 생깁니다.`,
      `나가면 귀찮고, 안 나가면 아쉽습니다. 오늘은 이쪽입니다.`
    ],
    daily: [
      `${withParticle(winner.name, "은", "는")} 오늘의 나를 살리고, ${withParticle(loser.name, "은", "는")} 다른 나를 설득합니다.`,
      `고민이 길어지면 선택보다 피로가 먼저 이깁니다.`,
      `오늘은 완벽한 답보다 덜 질질 끄는 답입니다.`,
      `${winnerName} 고르면 적어도 머릿속 탭 하나는 닫힙니다.`
    ]
  };
  if (category === "food") {
    if (includesAny(raw, ["회", "사시미"]) && includesAny(raw, ["고기", "삼겹살", "한우", "소고기"])) {
      if (includesAny(winnerRaw, ["회", "사시미"])) return withZodiacTag("회는 살 안 찌는 척하고, 고기는 그럴 생각이 없습니다.");
      return withZodiacTag("회는 조용히 들어오고, 고기는 옷에 냄새까지 남기고 갑니다.");
    }
    if (includesAny(raw, ["삼겹살"]) && includesAny(raw, ["한우", "소고기"])) {
      if (includesAny(winnerRaw, ["삼겹살"])) return withZodiacTag("삼겹살은 배를 채우고, 한우는 통장을 비웁니다.");
      return withZodiacTag("한우는 통장을 울리고, 입은 모른 척합니다.");
    }
  }
  if (category === "shopping" && includesAny(raw, ["산다", "구매", "바꾼다", "버틴다", "참는다"])) {
    if (winner.intent === "skip") return withZodiacTag("버티기는 돈을 지키고, 구매는 정신건강을 지킵니다.");
    return withZodiacTag("구매는 마음을 고치고, 버티기는 잔고를 고칩니다.");
  }
  if (includesAny(raw, ["차단", "둔다", "냅둔다", "냅둘"])) {
    if (includesAny(winnerRaw, ["차단"])) return withZodiacTag("차단은 버튼 한 번, 안 차단은 상상력 무한대입니다.");
    return withZodiacTag("둔다는 관용처럼 보이지만 사실 상상력 유료 구독입니다.");
  }
  if (includesAny(raw, ["택시", "버스"])) {
    if (includesAny(winnerRaw, ["택시"])) return withZodiacTag("택시는 돈을 쓰고, 버스는 인내심을 씁니다.");
    return withZodiacTag("버스는 돈을 아끼고, 자리가 없으면 인격을 시험합니다.");
  }
  if (category === "pet" && includesAny(raw, ["강아지", "고양이"])) {
    if (includesAny(winnerRaw, ["강아지", "댕댕이"])) return withZodiacTag("강아지는 사랑을 크게 주고, 산책 알람도 같이 줍니다.");
    return withZodiacTag("고양이는 조용히 들어와서 집 주인 자리를 가져갑니다.");
  }
  if (category === "amusement" && includesAny(raw, ["롯데월드", "서울랜드"])) {
    if (includesAny(winnerRaw, ["롯데월드"])) return withZodiacTag("롯데월드는 설렘을 크게 주고, 대기줄도 크게 줍니다.");
    return withZodiacTag("서울랜드는 덜 화려해도 다리가 덜 화낼 가능성이 있습니다.");
  }
  if (category === "hobby" && includesAny(raw, ["노래방", "pc방", "피시방", "피씨방"])) {
    if (includesAny(winnerRaw, ["노래방", "코노"])) return withZodiacTag("노래방은 목을 쓰고, PC방은 시간을 씁니다.");
    return withZodiacTag("PC방은 앉는 순간 시간이 삭제되고, 노래방은 목소리가 삭제됩니다.");
  }
  const basePool = pools[category] || pools.daily;
  const zodiacPool = signHooks[signName] || signHooks["황소자리"];
  const combined = basePool.concat(zodiacPool);
  return cleanPlayTone(pick(combined, hashText(`${question}-${winner.name}-${loser.name}-${signName}-${seed}-shareable-advice`)));
}

function scoreOption(analysis, category, question, mood, seed, sign, cards = []) {
  const text = `${analysis.name} ${analysis.subjectName || ""} ${question}`.toLowerCase();
  const optionText = `${analysis.name} ${analysis.subjectName || ""}`.toLowerCase();
  let score = 50 + (hashText(`${analysis.name}-${seed}`) % 9) - 4;
  if (category === "food") {
    if (includesAny(text, ["김치", "라면", "짬뽕", "떡볶이", "치킨"]) && mood >= 5 && includesAny(question, ["매콤", "얼큰", "자극", "스트레스"])) score += 6;
    if (includesAny(text, ["된장", "국밥", "순대국", "담백", "속 편", "짜장"]) && (mood <= 4 || includesAny(question, ["속", "편", "부담", "무난", "간단"]))) score += 10;
    if (includesAny(text, ["삼겹살", "감자탕", "고기", "돈까스"]) && includesAny(question, ["가볍", "속", "부담", "다이어트", "느끼"])) score -= 8;
    if (includesAny(optionText, ["콜라", "코카콜라", "펩시"]) && includesAny(question, ["치킨", "햄버거", "버거", "피자"])) score += 18;
    if (includesAny(optionText, ["사이다", "스프라이트", "칠성"]) && includesAny(question, ["느끼", "깔끔", "정리", "후반", "가볍"])) score += 9;
    if (analysis.intent === "go" && !includesAny(question, ["속", "부담", "다이어트", "아프"])) score += 3;
    if (analysis.intent === "skip" && includesAny(question, ["속", "부담", "다이어트", "아프"])) score += 9;
  }
  if (category === "beverage") {
    if (includesAny(text, ["아이스", "아아", "차가운", "콜드"]) && includesAny(question, ["덥", "갈증", "시원", "졸려", "깨"])) score += 10;
    if (includesAny(text, ["따뜻", "뜨아", "핫", "라떼"]) && includesAny(question, ["춥", "속", "빈속", "편하게", "천천히"])) score += 10;
    if (includesAny(text, ["아이스", "차가운"]) && includesAny(question, ["속", "빈속", "춥", "배아"])) score -= 6;
    if (includesAny(text, ["따뜻", "뜨아", "핫"]) && includesAny(question, ["덥", "갈증", "시원"])) score -= 5;
  }
  if (category === "childcare") {
    if (includesAny(text, ["놀이터", "공원"]) && !includesAny(question, ["비", "춥", "미세먼지", "폭염", "한파"])) score += 12;
    if (includesAny(text, ["키즈카페", "실내"]) && includesAny(question, ["비", "춥", "미세먼지", "폭염", "한파"])) score += 14;
    if (analysis.intent === "go" && !includesAny(question, ["아프", "감기", "열", "주말", "사람 많", "피곤"])) score += 10;
    if (analysis.intent === "skip" && includesAny(question, ["아프", "감기", "열", "주말", "사람 많", "피곤"])) score += 14;
  }
  if (category === "gift") {
    if (includesAny(text, ["공룡", "티라노", "우와", "상상놀이", "첫날", "반응"]) && cardHas(cards, ["도전", "에너지", "활동성", "재미", "호기심", "상상력", "모험"])) score += 12;
    if (includesAny(text, ["자동차", "미니카", "굴리", "오래", "반복", "실속"]) && cardHas(cards, ["편안함", "안정감", "실속", "꾸준함", "현실성", "만족감"])) score += 12;
    if (includesAny(text, ["레고", "블록", "만들", "집중"]) && cardHas(cards, ["계획성", "꼼꼼함", "창의성", "완성도", "집중"])) score += 10;
    if (includesAny(text, ["책", "그림책", "동화", "읽"]) && cardHas(cards, ["감성", "따뜻함", "가족", "여유", "공감"])) score += 10;
    if (includesAny(question, ["아들", "아이", "아기", "조카"]) && includesAny(text, ["공룡", "자동차", "미니카", "레고", "블록"])) score += 5;
  }
  if (category === "attendance" && includesAny(text, ["출근", "근무"])) score += 12;
  if (category === "money" && includesAny(text, ["관망", "기다"])) score += 10;
  if (category === "hygiene") {
    if (analysis.intent === "go") score += includesAny(question, ["너무 피곤", "아파", "감기", "늦었", "시간없", "시간 없어"]) ? 4 : 14;
    if (analysis.intent === "skip" && includesAny(question, ["너무 피곤", "아파", "감기", "늦었", "시간없", "시간 없어"])) score += 8;
    if (analysis.intent === "skip" && !includesAny(question, ["너무 피곤", "아파", "감기", "늦었", "시간없", "시간 없어"])) score -= 6;
  }
  if (category === "exercise") {
    if (analysis.intent === "go" && !includesAny(question, ["아파", "몸살", "다쳤", "너무 피곤", "무리"])) score += 10;
    if (analysis.intent === "skip" && includesAny(question, ["아파", "몸살", "다쳤", "너무 피곤", "무리"])) score += 12;
  }
  if (category === "study") {
    if (analysis.intent === "go" && includesAny(question, ["시험", "마감", "숙제", "과제", "내일"])) score += 14;
    if (analysis.intent === "go") score += 6;
    if (analysis.intent === "skip" && includesAny(question, ["너무 피곤", "아파", "밤새", "잠"])) score += 5;
  }
  if (category === "game") {
    if (analysis.intent === "go" && includesAny(question, ["스트레스", "쉬고", "기분", "친구"])) score += 8;
    if (analysis.intent === "skip" && includesAny(question, ["내일", "출근", "시험", "늦", "밤", "시간없", "시간 없어"])) score += 14;
  }
  if (category === "travel") {
    if (analysis.intent === "go" && includesAny(question, ["답답", "휴가", "기분전환", "놀러"])) score += 10;
    if (analysis.intent === "skip" && includesAny(question, ["돈", "비싸", "피곤", "시간없", "일정"])) score += 12;
  }
  const questionText = String(question).toLowerCase();
  const highValueShopping = category === "shopping" ? highValuePurchaseProfile(`${questionText} ${analysis.name} ${analysis.subjectName || ""}`) : null;
  if (highValueShopping) {
    const urgentNeed = includesAny(questionText, ["고장", "느려", "느림", "느린", "렉", "버벅", "배터리", "발열", "더워", "더운", "덥", "열대야", "땀", "작업", "게임", "필요", "힘들", "답답", "안켜", "안 켜", "꺼져", "부족", "오래"]);
    const waitReason = includesAny(questionText, ["비싸", "가격", "돈", "할부", "신제품", "새모델", "새 모델", "할인", "세일", "아직", "멀쩡", "다음", "출시", "기다"]);
    const impulse = includesAny(questionText, ["지름", "사고싶", "사고 싶", "끌려", "갖고싶", "갖고 싶", "바꾸고싶", "바꾸고 싶"]);
    if (analysis.intent === "go" && urgentNeed) score += 24;
    if (analysis.intent === "skip" && waitReason) score += 14;
    if (analysis.intent === "skip" && urgentNeed) score -= 16;
    if (analysis.intent === "go" && waitReason && !urgentNeed) score -= 5;
    if (analysis.intent === "go" && impulse) score += 6;
    if (analysis.intent === "skip" && impulse && waitReason) score += 4;
    if (analysis.intent === "skip" && !urgentNeed) score += 3;
  }
  if (category === "shopping" && includesAny(questionText, ["tv", "티비", "텔레비전", "테레비"])) {
    const tvProblem = includesAny(questionText, ["오래", "고장", "화질", "작", "불편", "눈아", "안보", "안 보", "안좋", "안 좋", "큰 화면"]);
    if (analysis.intent === "go" && tvProblem) score += 24;
    if (analysis.intent === "skip" && includesAny(questionText, ["돈", "비싸", "부담", "아직", "멀쩡", "그냥", "볼만", "볼 만"])) score += 12;
    if (analysis.intent === "skip" && tvProblem) score -= 8;
    if (analysis.intent === "go" && includesAny(questionText, ["돈", "비싸", "부담", "아직", "멀쩡", "볼만", "볼 만"])) score -= 5;
  }
  if (category === "relationship") {
    if (analysis.intent === "go" && includesAny(question, ["전화", "통화", "연락", "카톡", "문자"]) && !includesAny(question, ["싸웠", "부담", "늦은"])) score += 8;
    if (analysis.intent === "skip" && includesAny(question, ["늦은", "밤", "싸웠", "화났", "부담"])) score += 8;
  }
  if (includesAny(question, ["어제 술", "술 많이", "숙취", "해장"])) {
    if (includesAny(text, ["감자탕", "해장", "묵직", "국물"])) score += 10;
    if (includesAny(text, ["순대국", "국밥", "뜨끈"])) score += 8;
    if (includesAny(text, ["짬뽕", "얼큰"])) score += 7;
  }
  score += Math.round(zodiacBoost(sign, analysis, question).boost * 0.35);
  score += Math.round(cardOptionBoost(cards, analysis) * 0.4);
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
  const rawWinnerScore = recommendA ? aScore : bScore;
  const rawLoserScore = recommendA ? bScore : aScore;
  const scoreGap = Math.abs(rawWinnerScore - rawLoserScore);
  const uncertaintyWords = ["모르", "애매", "고민", "반반", "불안", "혹시", "잘"];
  const strongContextWords = ["고장", "아프", "마감", "시험", "화질", "비", "춥", "숙취", "해장", "돈", "비싸", "내일", "너무"];
  const uncertainty = includesAny(question, uncertaintyWords);
  const strongContext = includesAny(question, strongContextWords) || profile.forced;
  let winnerScore = 55;
  if (scoreGap <= 3 || uncertainty) {
    winnerScore = 51 + ((seed + rawWinnerScore) % 4);
  } else if (scoreGap <= 8) {
    winnerScore = 53 + ((seed + rawWinnerScore) % 5);
  } else if (scoreGap <= 18) {
    winnerScore = 58 + ((seed + rawWinnerScore) % 8);
  } else {
    winnerScore = 66 + ((seed + rawWinnerScore) % 10);
  }
  if (strongContext && scoreGap > 8) winnerScore = Math.max(winnerScore, 64 + ((seed + rawWinnerScore) % 9));
  winnerScore = Math.max(51, Math.min(75, winnerScore));
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
  const zodiacWhy = zodiacWhyNarrative(sign, cardLabels, category, winner, loser, question);
  const defaultWhy = [
    cardDrivenReason,
    cardReason,
    optionFeatureSentence(winner),
    `${escapeHtml(loser.name)}도 나쁘진 않은데, 지금은 ${escapeHtml(winner.name)} 쪽이 끝나고 더 설명이 됩니다.`
  ].join(" ");
  const whyByCategory = {
    food: categoryRealityReason("food", winner, loser, question, cardLabels, sign, seed),
    beverage: categoryRealityReason("beverage", winner, loser, question, cardLabels, sign, seed),
    drink: categoryRealityReason("drink", winner, loser, question, cardLabels, sign, seed),
    childcare: categoryRealityReason("childcare", winner, loser, question, cardLabels, sign, seed),
    gift: categoryRealityReason("gift", winner, loser, question, cardLabels, sign, seed),
    relationship: categoryRealityReason("relationship", winner, loser, question, cardLabels, sign, seed),
    shopping: categoryRealityReason("shopping", winner, loser, question, cardLabels, sign, seed),
    attendance: categoryRealityReason("attendance", winner, loser, question, cardLabels, sign, seed),
    money: categoryRealityReason("money", winner, loser, question, cardLabels, sign, seed),
    hygiene: categoryRealityReason("hygiene", winner, loser, question, cardLabels, sign, seed),
    exercise: categoryRealityReason("exercise", winner, loser, question, cardLabels, sign, seed),
    study: categoryRealityReason("study", winner, loser, question, cardLabels, sign, seed),
    game: categoryRealityReason("game", winner, loser, question, cardLabels, sign, seed),
    pet: categoryRealityReason("pet", winner, loser, question, cardLabels, sign, seed),
    amusement: categoryRealityReason("amusement", winner, loser, question, cardLabels, sign, seed),
    hobby: categoryRealityReason("hobby", winner, loser, question, cardLabels, sign, seed),
    travel: categoryRealityReason("travel", winner, loser, question, cardLabels, sign, seed),
    place: categoryRealityReason("place", winner, loser, question, cardLabels, sign, seed),
    daily: categoryRealityReason("daily", winner, loser, question, cardLabels, sign, seed)
  };
  const shareLine = shareableAdvice(category, winner, loser, question, seed, sign);
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
    advice: cleanPlayTone(shareLine),
    why: cleanPlayTone(whyByCategory[category] || defaultWhy),
    opposite: oppositeText,
    fortune: cleanPlayTone(fortune),
    zodiacCards: cardLabels,
    futureComment: cleanPlayTone(futureComment(category, winner, question, seed, sign)),
    resultTitle: `${escapeHtml(winner.name)} 승`,
    finalText: `<strong>${escapeHtml(winner.name)} ${winnerScore}%</strong><br><strong>${escapeHtml(loser.name)} ${loserScore}%</strong><br><small>${probabilityReason(category, winner, loser, winnerScore, loserScore)}</small>`
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
    const safety = dangerousChoiceCheck(question, choiceA, choiceB);
    if (safety.dangerous) {
      setTimeout(() => {
        loader.classList.remove("show");
        showResult(document.getElementById("choiceResult"), safety.message);
        document.getElementById("choiceResult").scrollIntoView({ behavior: "smooth", block: "start" });
        submitButtons.forEach((button) => {
          button.disabled = false;
          button.textContent = "분석하기";
        });
      }, 300);
      return;
    }
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
      `캡처 한 줄: ${narrative.advice.replace(/<[^>]+>/g, "")}`,
      `짧게 말하면: ${narrative.why.replace(/<[^>]+>/g, "")}`,
      `결과: ${recommended} 승`,
      `미래의 나: ${narrative.futureComment.replace(/<[^>]+>/g, "")}`,
      `확률: ${recommended} ${narrative.winnerScore}% / ${narrative.loser.name} ${narrative.loserScore}%`,
      "",
      "너도 갈림길 한 번 돌려봐 ㅋㅋ"
    ].join("\n");
    const inviteCopy = [
      "나 방금 갈림길 돌렸는데 결과가 좀 웃겨 ㅋㅋ",
      `내 고민은 "${question}"였고, "${recommended}" 승 나왔어.`,
      `캡처 한 줄: "${narrative.advice.replace(/<[^>]+>/g, "")}"`,
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
      <h4>🌟 별 한 스푼</h4>
      <p class="zodiac-card-row">${narrative.zodiacCards.map((card) => `<span>🎲 ${escapeHtml(card)}</span>`).join("")}</p>
    </div>
    <div class="report-section">
      <h4>🌟 별의 한마디</h4>
      <p>${narrative.fortune}</p>
    </div>
    <div class="report-section">
      <h4>💡 짧게 말하면</h4>
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
      <h4>📌 캡처 한 줄</h4>
      <blockquote class="advice-quote">${escapeHtml(narrative.advice)}</blockquote>
    </div>
    <div class="report-section">
      <h4>🎯 오늘의 승률</h4>
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

