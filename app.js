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

const archiveKey = "crossroads-choice-cards-v1";
const lastDateKey = "crossroads-last-date-v1";
const streakKey = "crossroads-streak-v1";
let archive = loadArchive();

function hashText(text) {
  return [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pick(list, seed) {
  return list[Math.abs(seed) % list.length];
}

function showResult(element, html) {
  element.innerHTML = html;
  element.classList.add("show");
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
    return;
  }
  list.innerHTML = archive.map((card) => `
    <article class="archive-card">
      <span>${escapeHtml(card.date)}</span>
      <h3>${escapeHtml(card.question)}</h3>
      <p>${escapeHtml(card.choice)}</p>
      ${card.outcome ? `<p><strong>체크인:</strong> ${escapeHtml(card.outcome)}</p>` : ""}
      ${card.memo ? `<p><strong>메모:</strong> ${escapeHtml(card.memo)}</p>` : ""}
    </article>
  `).join("");
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
  y = wrapText(ctx, card.choice, 150, y + 170, 780, 62);

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

async function shareText(text) {
  if (navigator.share) {
    await navigator.share({ title: "갈림길 선택 카드", text });
    return;
  }
  await navigator.clipboard.writeText(text);
  alert("선택 카드 문구를 복사했어요.");
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

document.querySelector("[data-scroll-target]").addEventListener("click", () => {
  document.querySelector(".tabbar").scrollIntoView({ behavior: "smooth" });
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
    button.textContent = "리포트 작성 중...";
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
    const recommendA = (seed + mood) % 2 === 0;
    const recommended = recommendA ? choiceA : choiceB;
    const caution = mood >= 8 ? "지금 마음 온도가 높아서, 결정 직후 바로 메시지를 길게 보내는 건 피하는 편이 좋아요." : "오늘은 너무 오래 재지 말고, 작게 확인하는 쪽이 흐름을 살립니다.";
    const aStory = pick(aScenes, seed);
    const bStory = pick(bScenes, seed + 7);
    const mission = pick(missions, seed);
    const opener = pick(insightOpeners, seed + mood);
    const reason = pick(recommendedReasons, seed + 13);
    const script = pick(oneLineScripts, seed + 21);
    const checkin = pick(checkinQuestions, seed + 31);
    const [typeName, typeDescription] = questionType(question);
    const metrics = buildMetrics(seed, mood, choiceA, choiceB);
    const code = reportCode(seed);

    archive.unshift({
      date: new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric" }).format(new Date()),
      question,
      choice: `추천 선택: ${recommended}`,
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
      `오늘의 추천: ${recommended}`,
      `미션: ${mission}`
    ].join("\n");

    const resultHtml = `
    <div class="report-hero">
      <span>${code} · ${typeName}</span>
      <h3>${recommendA ? "A" : "B"} · ${escapeHtml(recommended)}</h3>
      <p>${opener}</p>
    </div>
    <div class="report-section">
      <h4>오늘의 분석 지표</h4>
      ${metricMarkup(metrics)}
      <p>${typeDescription}</p>
    </div>
    <div class="report-section">
      <h4>지금의 흐름</h4>
      <p><strong>${sign[1]} ${escapeHtml(signName)}</strong>의 오늘 키워드는 ${sign[2]}입니다. ${sign[3]}이라서, ${pick(tones, seed)}</p>
      <p>${moodReading(mood)}</p>
    </div>
    <div class="path-cards">
      <div class="path-card">
        <span>A</span>
        <strong>${escapeHtml(choiceA)}</strong>
        <p>${aStory}</p>
      </div>
      <div class="path-card">
        <span>B</span>
        <strong>${escapeHtml(choiceB)}</strong>
        <p>${bStory}</p>
      </div>
    </div>
    <div class="decision-line">
      <span>추천</span>
      <strong>${escapeHtml(recommended)}</strong>
    </div>
    <div class="report-section">
      <h4>왜 이 선택인가요?</h4>
      <p>${reason}</p>
      <p>특히 지금 고민은 <strong>${escapeHtml(question)}</strong>라는 질문 안에 감정과 타이밍이 함께 들어 있어요. 그래서 오늘은 크게 판을 바꾸는 결정보다, 내 마음을 덜 흐리게 만드는 방향을 고르는 게 더 중요합니다.</p>
      <p>${timingAdvice(metrics, mood)}</p>
    </div>
    <div class="report-section">
      <h4>오늘 사용할 문장</h4>
      <p>${script}</p>
      <p><strong>주의할 말:</strong> ${caution}</p>
    </div>
    <div class="report-section">
      <h4>오늘의 미션</h4>
      <p>${mission}</p>
      <p>${checkin}</p>
    </div>
    <button class="secondary-button" id="shareChoiceButton" type="button">선택 카드 공유/복사</button>
  `;
    setTimeout(() => {
      loader.classList.remove("show");
      showResult(document.getElementById("choiceResult"), resultHtml);
      document.getElementById("shareChoiceButton").addEventListener("click", () => shareText(shareCopy));
      document.getElementById("choiceResult").scrollIntoView({ behavior: "smooth", block: "start" });
      submitButtons.forEach((button) => {
        button.disabled = false;
        button.textContent = "선택 리포트 받기";
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
      button.textContent = "선택 리포트 받기";
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
        <p>${escapeHtml(mySignName)}의 ${mySignData[2]}과 ${escapeHtml(theirSignName)}의 ${theirSignData[2]}이 만난 조합이에요. 둘 사이의 리듬을 재미로 펼쳐봤어요.</p>
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
        <p>${pick(chemistryStrengths, seed)}</p>
      </div>
      <div class="report-section">
        <h4>가끔 엇갈리는 지점</h4>
        <p>${pick(chemistryFrictions, seed + 9)}</p>
      </div>
      <div class="report-section">
        <h4>지금 궁금한 점에 대한 힌트</h4>
        <p><strong>${escapeHtml(question)}</strong></p>
        <p>오늘은 상대의 마음을 단정하기보다, 가볍게 확인하는 방식이 잘 맞아요. 무거운 결론보다 작은 대화 하나가 둘 사이의 온도를 더 정확하게 알려줄 수 있습니다.</p>
      </div>
      <div class="report-section">
        <h4>오늘 먼저 건넬 말</h4>
        <p>${pick(chemistryMessages, seed + 17)}</p>
      </div>
      <div class="report-section">
        <h4>같이 해볼 작은 미션</h4>
        <p>${pick(chemistryMissions, seed + 23)}</p>
      </div>
      <button class="secondary-button" id="shareChemistryButton" type="button">케미 카드 공유/복사</button>
      <p class="fine-print">케미 카드는 오락 및 관계 성찰용 결과입니다. 실제 관계를 단정하지 않습니다.</p>
    `);
    const shareCopy = [
      "[갈림길 케미 카드]",
      `${myName} × ${theirName}`,
      `관계: ${relation}`,
      `오늘의 케미: ${score}`,
      `먼저 건넬 말: ${pick(chemistryMessages, seed + 17)}`,
      `같이 해볼 미션: ${pick(chemistryMissions, seed + 23)}`
    ].join("\n");
    document.getElementById("shareChemistryButton").addEventListener("click", () => shareText(shareCopy));
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 750);
});

document.getElementById("downloadCardButton").addEventListener("click", downloadLatestCard);
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
        <p class="fine-print">AI 이미지 해석을 활용한 오락 및 자기성찰용 결과입니다. 실제 미래나 건강 상태를 판단하지 않습니다.</p>
      `);
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
