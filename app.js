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
      `오늘 별자리 카드 펼쳐보면 ${sign[1]} ${escapeHtml(sign[0])} 쪽에 <strong>${lens.childcare}</strong> 카드가 떠요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 "와 신난다!"보다 "아이고 무사히 잘 놀았다"로 끝나는 쪽이 운을 받아요. 그래서 별 흐름은 <strong>${safeRecommended}</strong> 쪽으로 손을 들어줍니다.`,
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
    `${sign[1]} ${escapeHtml(sign[0])} 카드가 말하길, 오늘은 결과보다 리듬이에요. <strong>${safeA}</strong>와 <strong>${safeB}</strong> 중 지금 감당 가능한 <strong>${safeRecommended}</strong>이 운을 살리는 쪽입니다.`
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
  { keys: ["라면"], category: "food", features: ["뜨거운 국물", "짭짤한 면발", "빠르게 채워지는 허기", "야식 같은 즉각적인 만족감"], caution: "붓기나 속 쓰림이 걱정되면 조심하는 게 좋아요.", vibe: "즉시 만족" },
  { keys: ["돈까스"], category: "food", features: ["바삭한 튀김", "든든한 양", "소스의 달큰함", "실패 확률이 낮은 메뉴"], caution: "느끼한 음식이 부담되면 끝까지 먹기 무거울 수 있어요.", vibe: "든든함" },
  { keys: ["국밥"], category: "food", features: ["뜨끈한 국물", "든든한 포만감", "속을 채워주는 느낌", "혼밥에도 편한 안정감"], caution: "가볍게 먹고 싶은 날엔 무겁게 느껴질 수 있어요.", vibe: "회복감" },
  { keys: ["치킨"], category: "food", features: ["바삭한 튀김", "짭짤한 양념", "기분 전환 느낌", "나눠 먹기 좋은 재미"], caution: "가볍게 끝내고 싶은 날엔 과해질 수 있어요.", vibe: "기분 전환" },
  { keys: ["피자"], category: "food", features: ["치즈의 고소함", "토핑 고르는 재미", "든든한 한 판", "같이 먹기 좋은 분위기"], caution: "속이 더부룩하거나 혼자 간단히 먹고 싶으면 부담될 수 있어요.", vibe: "풍성함" },
  { keys: ["키즈카페"], category: "childcare", features: ["실내라 날씨 영향을 덜 받는 점", "장난감과 시설이 많은 점", "큰 아이들과 동선이 겹치면 부딪힐 수 있는 점", "소리와 자극이 많아 아이가 금방 흥분할 수 있는 점"], caution: "사람이 많으면 보호자가 계속 따라다니며 봐야 해요.", vibe: "실내 자극" },
  { keys: ["놀이터"], category: "childcare", features: ["공간이 넓은 점", "아이가 자기 속도로 뛰어놀 수 있는 점", "돈이 거의 들지 않는 점", "날씨와 미끄럼틀·그네 주변 안전을 봐야 하는 점"], caution: "비, 추위, 미세먼지가 있으면 만족도가 확 떨어질 수 있어요.", vibe: "자유로운 몸놀이" },
  { keys: ["공원"], category: "place", features: ["넓은 공간", "걷기 좋은 동선", "답답함이 풀리는 느낌", "날씨 영향을 많이 받음"], caution: "날씨가 나쁘면 금방 피곤해질 수 있어요.", vibe: "환기" },
  { keys: ["카페"], category: "place", features: ["앉아서 쉬기 좋음", "대화하기 편함", "커피나 디저트로 기분 전환 가능", "오래 있으면 비용이 쌓임"], caution: "아이가 있거나 사람이 많으면 생각보다 정신없을 수 있어요.", vibe: "잠깐의 여유" },
  { keys: ["출근"], category: "attendance", features: ["오늘 할 일을 미루지 않는 점", "내일 부담이 줄어드는 점", "책임을 지켰다는 마음이 남는 점", "몸이 피곤하면 하루가 길게 느껴질 수 있는 점"], caution: "진짜 아프면 무리하지 말고 먼저 연락하는 게 맞아요.", vibe: "최소 책임" },
  { keys: ["결근", "안한다", "쉰다", "쉬기"], category: "attendance", features: ["몸을 쉬게 할 수 있는 점", "당장 피로가 줄어드는 점", "대신 설명과 뒷일이 생길 수 있는 점", "무단이면 부담이 커지는 점"], caution: "쉬더라도 연락과 이유 정리는 꼭 필요해요.", vibe: "회복" },
  { keys: ["매수", "투자"], category: "money", features: ["기회를 잡는 느낌", "수익 기대감", "가격 변동 리스크", "틀렸을 때 손실 가능성"], caution: "손실 한도 없이 들어가면 감정이 흔들릴 수 있어요.", vibe: "공격적 선택" },
  { keys: ["관망", "기다"], category: "money", features: ["손실을 피할 시간", "가격을 더 볼 여유", "기회를 놓칠 수 있는 아쉬움", "감정 매매를 줄이는 장점"], caution: "기다림에도 기준 가격이 있어야 해요.", vibe: "리스크 관리" },
  { keys: ["고백", "연락", "사과"], category: "relationship", features: ["마음을 직접 전함", "오해를 줄일 수 있음", "상대 반응을 확인할 수 있음", "말투가 세면 부담을 줄 수 있음"], caution: "긴 문장보다 짧고 정확한 말이 좋아요.", vibe: "직접 확인" },
  { keys: ["보류", "안 한다", "안한다"], category: "general", features: ["당장 부딪히지 않음", "생각할 시간이 생김", "너무 길어지면 답답함이 남음", "결정 피로가 줄어듦"], caution: "언제 다시 볼지 정하지 않으면 흐지부지될 수 있어요.", vibe: "보류" }
];

function inferCategory(question, choiceA, choiceB, profile) {
  const text = `${question} ${choiceA} ${choiceB}`.toLowerCase();
  if (profile.type !== "general") return profile.type;
  if (includesAny(text, ["찌개", "라면", "밥", "국밥", "치킨", "피자", "돈까스", "냉면", "짜장", "짬뽕", "떡볶이", "초밥", "메뉴", "먹을"])) return "food";
  if (includesAny(text, ["카페", "공원", "영화", "마트", "백화점", "여행", "놀러", "어디"])) return "place";
  if (includesAny(text, ["살까", "구매", "쇼핑", "예약", "결제"])) return "shopping";
  return "daily";
}

function analyzeOption(option, category) {
  const text = option.toLowerCase();
  const found = optionFeatureBank.find((item) => item.keys.some((key) => text.includes(key)));
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
    daily: { features: [`${option}을 했을 때 바로 생기는 변화`, "하고 난 뒤의 마음", "미뤘을 때 남는 찝찝함", "오늘 감당 가능한 정도"], caution: "한 번에 크게 결정하기보다 작게 해보는 게 좋아요.", vibe: "일상 선택" }
  };
  const fallback = fallbackByCategory[category] || fallbackByCategory.daily;
  return { name: option, category, features: fallback.features, caution: fallback.caution, vibe: fallback.vibe };
}

function optionIntent(option) {
  const text = String(option).replace(/\s/g, "").toLowerCase();
  if (includesAny(text, ["만다", "안간", "안한다", "말자", "보류", "쉬", "쉰", "기다", "관망", "패스"])) return "skip";
  if (includesAny(text, ["간다", "가기", "간", "한다", "먹", "산다", "살래", "매수", "연락", "고백", "출근"])) return "go";
  return "specific";
}

function findScenario(question, category) {
  const text = String(question).toLowerCase();
  const found = optionFeatureBank.find((item) => item.keys.some((key) => text.includes(key)));
  if (!found) return null;
  const key = found.keys.find((itemKey) => text.includes(itemKey)) || found.keys[0];
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

function scoreOption(analysis, category, question, mood, seed) {
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
  return Math.max(35, Math.min(75, score));
}

function buildChoiceNarrative(question, choiceA, choiceB, mood, sign, profile, seed) {
  const category = inferCategory(question, choiceA, choiceB, profile);
  const a = contextualizeOption(choiceA, category, question);
  const b = contextualizeOption(choiceB, category, question);
  let aScore = scoreOption(a, category, question, mood, seed);
  let bScore = scoreOption(b, category, question, mood, seed + 11);
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
  const signToneByElement = {
    "불": "생각을 오래 굴리기보다 한 번 움직여보는 쪽에 힘이 있어요.",
    "땅": "괜히 새 판을 키우기보다 몸이 편하게 따라갈 수 있는 쪽을 좋아해요.",
    "바람": "가볍게 시작하고, 중간에 조정할 수 있는 선택을 밀어줘요.",
    "물": "기분을 세게 몰아붙이기보다 마음이 편안하게 끝나는 쪽을 봐요."
  };
  const fortuneBase = signToneByElement[sign[2]] || signToneByElement["땅"];
  const fortune = winner.intent === "skip"
    ? `${sign[1]} ${escapeHtml(sign[0])} 카드로 보면 오늘은 속도를 줄이고 컨디션을 먼저 챙기는 쪽이 편해요. ${fortuneBase} 그래서 형이 보기엔 <strong>${escapeHtml(winner.name)}</strong> 쪽에 운이 조금 더 붙습니다.`
    : `${sign[1]} ${escapeHtml(sign[0])} 카드로 보면 오늘은 머릿속에서만 재기보다 작게라도 움직여보는 쪽이 편해요. ${fortuneBase} 그래서 형이 보기엔 <strong>${escapeHtml(winner.name)}</strong> 쪽에 운이 조금 더 붙습니다.`;
  const defaultWhy = [
    `${winnerSubject} ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 확실한 선택이에요.`,
    `이 선택은 지금 고민에서 바로 체감되는 변화가 있다는 쪽에 가까워요.`,
    `그래서 형이 보기엔 ${escapeHtml(winner.name)} 쪽이 선택하고 나서 후회가 더 적어 보입니다.`
  ].join(" ");
  const whyByCategory = {
    food: [
      hasQuestionContext
        ? `${escapeHtml(question)}라면 핵심은 <strong>${escapeHtml(subjectName)}</strong> 자체예요. ${escapeHtml(subjectName)}에는 ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}, ${escapeHtml(winner.features[2])}이 같이 있어요.`
        : `${winnerSubject} ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}, ${escapeHtml(winner.features[2])}이 같이 올라오는 메뉴예요.`,
      hasQuestionContext
        ? `그래서 <strong>${escapeHtml(winner.name)}</strong>는 단순히 "${escapeHtml(winner.name)}"가 아니라, 오늘 ${escapeHtml(subjectName)}의 맛을 실제로 가져가는 선택으로 보여요.`
        : `지금 고민이 메뉴 선택이라면, ${escapeHtml(winner.name)} 쪽이 입에 들어갔을 때 바로 차이가 느껴지는 편이에요.`,
      `솔직히 나라면 오늘은 ${winnerObject} 고를 것 같아요.`
    ].join(" "),
    childcare: [
      hasQuestionContext
        ? `${escapeHtml(question)}라면 핵심은 <strong>${escapeHtml(subjectName)}</strong>에 가느냐 마느냐예요. ${escapeHtml(subjectName)}에는 ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 있어요.`
        : `${winnerSubject} ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 있는 선택이에요.`,
      hasQuestionContext && winner.intent === "go"
        ? `특히 아이가 며칠 집에만 있었거나 몸을 쓰고 싶어 하는 날이면, ${escapeHtml(subjectName)}처럼 새로운 놀이를 하나 경험하는 쪽이 만족도가 높을 수 있어요.`
        : hasQuestionContext
          ? `다만 오늘 아이 컨디션이 애매하거나 사람이 많은 시간이면, ${escapeHtml(subjectName)}을 쉬어가는 선택도 충분히 현실적이에요.`
          : `${escapeHtml(loser.name)}도 ${escapeHtml(loser.features[0])}은 좋지만, ${escapeHtml(loser.features[2])} 같은 변수를 생각하면 보호자가 계속 신경을 써야 할 수 있어요.`,
      `형이 보기엔 오늘은 ${hasQuestionContext ? winnerActionText : escapeHtml(winner.name)} 쪽이 아이도 편하고 어른도 덜 지치는 선택으로 보여요.`
    ].join(" "),
    attendance: [
      `${winnerSubject} ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 바로 따라오는 선택이에요.`,
      `${escapeHtml(loser.name)}도 ${escapeHtml(loser.features[0])}이라는 장점이 있지만, 오늘 질문에서는 내일의 부담까지 같이 봐야 해요.`,
      `솔직히 몸이 정말 아픈 게 아니라면 형이 보기엔 ${escapeHtml(winner.name)} 쪽이 후회가 적어 보입니다.`
    ].join(" "),
    money: [
      `${winnerSubject} ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 있는 선택이에요.`,
      `${escapeHtml(loser.name)}도 끌리지만, 돈이 걸린 선택은 기분보다 손실을 버틸 수 있는지가 먼저예요.`,
      `그래서 형이 보기엔 오늘은 ${escapeHtml(winner.name)} 쪽이 더 단단해 보입니다.`
    ].join(" "),
    relationship: [
      `${winnerSubject} ${escapeHtml(winner.features[0])}, ${escapeHtml(winner.features[1])}이 있는 선택이에요.`,
      `${escapeHtml(loser.name)}도 나쁘진 않지만, 관계 고민은 타이밍과 말투가 반을 먹고 들어가요.`,
      `보통 이런 경우엔 ${escapeHtml(winner.name)}처럼 마음을 덜 꼬이게 만드는 쪽이 후회가 적습니다.`
    ].join(" ")
  };
  const adviceByCategory = {
    food: `오늘은 먹고 난 뒤 표정이 밝아질 쪽으로 가세요.`,
    childcare: `오늘은 아이보다 어른이 먼저 지치지 않는 계획이 이깁니다.`,
    attendance: `오늘은 내일의 나에게 빚을 덜 남기는 쪽이 낫습니다.`,
    money: `오늘은 벌 생각보다 잃어도 버틸 선을 먼저 보세요.`,
    relationship: `오늘은 길게 설명하기보다 짧게 건네는 쪽이 낫습니다.`,
    shopping: `오늘은 사고 싶은 이유보다 계속 쓸 이유를 보세요.`,
    place: `오늘은 나가는 순간보다 돌아오는 순간까지 계산하세요.`,
    daily: `오늘은 끝내고 나서 마음이 가벼울 쪽을 고르세요.`
  };
  const oppositeText = hasQuestionContext
    ? `반대로 <strong>${escapeHtml(loser.name)}</strong>는 ${escapeHtml(loser.features[0])}, ${escapeHtml(loser.features[1])}이 장점이에요. ${escapeHtml(loser.caution)}`
    : `반대로 <strong>${escapeHtml(loser.name)}</strong>는 ${escapeHtml(loser.features[0])}, ${escapeHtml(loser.features[1])}이 장점이에요. ${escapeHtml(loser.caution)}`;
  return {
    category,
    recommendA,
    winner,
    loser,
    winnerScore,
    loserScore,
    advice: adviceByCategory[category] || adviceByCategory.daily,
    why: whyByCategory[category] || defaultWhy,
    opposite: oppositeText,
    fortune,
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
      "[갈림길 선택 카드]",
      `리포트: ${code}`,
      `고민: ${question}`,
      `A: ${choiceA}`,
      `B: ${choiceB}`,
      `오늘의 추천: ${recommendA ? "A" : "B"} · ${recommended}`,
      `최종 판단: ${recommended} ${narrative.winnerScore}% / ${narrative.loser.name} ${narrative.loserScore}%`,
      `오늘의 조언: ${adviceLine}`,
      "",
      "너도 오늘 고민 A/B로 열어봐."
    ].join("\n");
    const inviteCopy = [
      "나 방금 갈림길에서 선택 리포트 봤는데 은근 잘 맞아.",
      `내 고민은 "${question}"였고, 오늘 추천은 "${recommended}" 나왔어.`,
      `한 줄 조언은 "${adviceLine}"래.`,
      "너도 오늘 고민 하나 넣어서 봐봐."
    ].join("\n");

    const resultHtml = `
    <div class="report-hero">
      <span>${code} · 오늘의 추천</span>
      <h3>오늘은 ${recommendA ? "A" : "B"}. ${escapeHtml(recommended)}를 추천합니다.</h3>
      <p>${escapeHtml(choiceA)} vs ${escapeHtml(choiceB)}</p>
    </div>
    <div class="report-section">
      <h4>왜 이쪽이냐면</h4>
      <p>${narrative.why}</p>
    </div>
    <div class="report-section">
      <h4>반대 선택이 좋은 경우</h4>
      <p>${narrative.opposite}</p>
    </div>
    <div class="report-section">
      <h4>별자리/운세 한 스푼</h4>
      <p>${narrative.fortune}</p>
    </div>
    <div class="report-section final-recommendation">
      <h4>최종 판단</h4>
      <p>${narrative.finalText}</p>
    </div>
    <div class="report-section">
      <h4>한 줄 조언</h4>
      <blockquote class="advice-quote">${escapeHtml(adviceLine)}</blockquote>
    </div>
    <div class="report-section">
      <h4>오늘의 작은 미션</h4>
      <p><strong>작은 미션:</strong> ${mission}</p>
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
