const dimensions = {
  EI: {
    left: "E",
    right: "I",
    name: "精力来源",
    leftName: "外倾",
    rightName: "内倾",
    description: "你更倾向从外部互动还是内部反思中恢复能量。",
  },
  SN: {
    left: "S",
    right: "N",
    name: "信息偏好",
    leftName: "实感",
    rightName: "直觉",
    description: "你更依赖具体经验，还是更关注模式、可能性和抽象联系。",
  },
  TF: {
    left: "T",
    right: "F",
    name: "决策依据",
    leftName: "思考",
    rightName: "情感",
    description: "你做判断时更优先一致性和原则，还是人际影响与价值感受。",
  },
  JP: {
    left: "J",
    right: "P",
    name: "生活节奏",
    leftName: "判断",
    rightName: "知觉",
    description: "你更偏好计划收束，还是保留弹性、边探索边调整。",
  },
};

const facetDefinitions = {
  EI: [
    { id: "energy", name: "能量恢复", left: "外部充电", right: "独处充电" },
    { id: "social", name: "社交启动", left: "主动破冰", right: "审慎进入" },
    { id: "processing", name: "表达加工", left: "边说边想", right: "先想后说" },
    { id: "stimulation", name: "刺激需求", left: "外部反馈", right: "低刺激专注" },
  ],
  SN: [
    { id: "evidence", name: "证据取向", left: "事实经验", right: "趋势隐喻" },
    { id: "learning", name: "学习路径", left: "步骤案例", right: "概念愿景" },
    { id: "practicality", name: "落地意识", left: "现实可行", right: "可能性探索" },
    { id: "novelty", name: "变化开放", left: "明确边界", right: "假设重构" },
  ],
  TF: [
    { id: "logic", name: "判断标准", left: "逻辑原则", right: "价值处境" },
    { id: "feedback", name: "反馈方式", left: "直接指出", right: "顾及感受" },
    { id: "conflict", name: "分歧处理", left: "论证优先", right: "理解优先" },
    { id: "tradeoff", name: "取舍风格", left: "规则优先", right: "关系优先" },
  ],
  JP: [
    { id: "planning", name: "计划程度", left: "提前规划", right: "保留选择" },
    { id: "closure", name: "收束需求", left: "尽快闭环", right: "临近激发" },
    { id: "structure", name: "秩序偏好", left: "稳定可控", right: "灵活调整" },
    { id: "process", name: "推进方式", left: "目标流程", right: "现场探索" },
  ],
};

function facetForQuestion(index, dimension) {
  const starts = { EI: 0, SN: 27, TF: 54, JP: 81 };
  const position = index - starts[dimension];
  const facets = facetDefinitions[dimension];
  return facets[position % facets.length].id;
}
const typeProfiles = {
  ISTJ: ["检查者", "稳健、负责、重视事实与承诺，擅长把复杂任务拆成可执行的秩序。"],
  ISFJ: ["守护者", "细致、可靠、关注他人的实际需要，常用稳定行动提供支持。"],
  INFJ: ["洞察者", "敏感而有方向感，擅长理解深层动机，并把价值观转化为长期行动。"],
  INTJ: ["策划者", "独立、系统、目标导向，倾向先建立模型，再推动高杠杆改进。"],
  ISTP: ["工匠型分析者", "冷静、务实、反应快，擅长在真实问题中拆解机制并即时修正。"],
  ISFP: ["体验型创作者", "温和、敏锐、重视真实感受，偏好用行动和审美表达价值。"],
  INFP: ["理想型调和者", "重视内在一致性和意义，善于从人的处境中发现可能的改变。"],
  INTP: ["思想架构师", "好奇、抽象、逻辑敏锐，喜欢追问系统背后的规则和边界。"],
  ESTP: ["行动型解决者", "直接、灵活、现实感强，擅长在变化现场快速试探有效路径。"],
  ESFP: ["现场带动者", "热情、敏感、重体验，容易捕捉氛围并让事情动起来。"],
  ENFP: ["可能性发起者", "开放、联想丰富、重视意义，擅长点燃新想法和人际连接。"],
  ENTP: ["探索型辩手", "机敏、发散、喜欢挑战假设，擅长把矛盾转化为新方案。"],
  ESTJ: ["执行组织者", "清晰、果断、讲求标准和责任，适合推动团队进入可控节奏。"],
  ESFJ: ["协作维护者", "外向、体贴、重视关系秩序，擅长让群体目标和成员需要对齐。"],
  ENFJ: ["关系型引导者", "有感染力、重视成长，善于识别他人潜力并组织共同行动。"],
  ENTJ: ["战略指挥者", "果断、结构化、面向结果，倾向主动定义目标并配置资源。"],
};

const questions = [
  ["EI", 1, "连续工作后，我通常通过与人交流、讨论或参加活动来恢复状态。"],
  ["EI", -1, "重要事情发生后，我更想先独处消化，再决定是否分享。"],
  ["EI", 1, "在陌生团队里，我常常会自然地开启话题或推动互动。"],
  ["EI", -1, "长时间社交后，即使过程愉快，我也需要明显的独处时间。"],
  ["EI", 1, "我边说边想时，经常能更快理清自己的观点。"],
  ["EI", -1, "我更习惯在表达前先把观点在脑中整理完整。"],
  ["EI", 1, "我容易从热闹、有反馈的环境中获得动力。"],
  ["EI", -1, "我更喜欢少数深度关系，而不是频繁扩展社交圈。"],
  ["EI", 1, "面对机会时，我倾向先参与进去，再在过程中调整。"],
  ["EI", -1, "我常把私人兴趣、计划或感受留给很少的人知道。"],
  ["EI", 1, "团队需要有人破冰时，我不太抗拒站出来。"],
  ["EI", -1, "我在安静环境中的效率和舒适度通常更高。"],
  ["EI", 1, "外部反馈会显著激发我的思路和行动意愿。"],
  ["EI", -1, "被频繁打断交流会让我很快感到消耗。"],
  ["EI", 1, "我喜欢在现场即时交换想法，而不是只通过文字慢慢整理。"],
  ["EI", -1, "我对自己的内在节奏很敏感，不喜欢被过多社交安排填满。"],
  ["EI", 1, "当讨论突然热起来时，我通常会更有参与感，而不是想退到旁边观察。"],
  ["EI", -1, "我更愿意把精力投入少数稳定场景，而不是频繁切换人群和活动。"],
  ["EI", 1, "遇到卡住的问题时，我常通过找人聊一聊来重新启动思路。"],
  ["EI", -1, "如果一天里互动太密集，我会明显需要减少输入来恢复清晰感。"],
  ["EI", 1, "我在多人协作中常能从即时回应里获得信心和方向。"],
  ["EI", -1, "我更喜欢用文字或独处思考把复杂感受整理好。"],
  ["EI", 1, "新的社交机会对我通常意味着能量和可能性。"],
  ["EI", -1, "我不太喜欢在准备不足时被要求当众表达。"],
  ["EI", 1, "我会主动维护人际联系，而不是等别人先来找我。"],
  ["EI", -1, "我对外界声音、消息和邀约的疲劳感来得比较快。"],
  ["EI", 1, "在需要快速行动的场合，我更愿意通过现场互动来推进。"],

  ["SN", 1, "我更信任经过验证的经验、数据和具体事实。"],
  ["SN", -1, "我经常先注意到事情背后的趋势、隐喻或未来可能性。"],
  ["SN", 1, "学习新技能时，我喜欢先看步骤、案例和可复现的方法。"],
  ["SN", -1, "比起现有细节，我更容易被一个新概念或长远愿景吸引。"],
  ["SN", 1, "描述问题时，我倾向给出具体场景、时间线和证据。"],
  ["SN", -1, "我常把看似无关的信息连接成新的解释框架。"],
  ["SN", 1, "我更喜欢把注意力放在当下能确认、能执行的部分。"],
  ["SN", -1, "重复成熟流程会让我无聊，我更想知道还能怎样变化。"],
  ["SN", 1, "我判断方案好坏时，会先看它是否现实、稳定、可落地。"],
  ["SN", -1, "我常对抽象理论、系统模型或潜在机会保持兴趣。"],
  ["SN", 1, "我擅长发现计划中遗漏的细节、风险和资源限制。"],
  ["SN", -1, "我更愿意讨论方向和可能性，而不是过早锁定细节。"],
  ["SN", 1, "清晰的定义、边界和操作标准会让我感到安心。"],
  ["SN", -1, "我经常会想到“如果换一种假设会怎样”。"],
  ["SN", 1, "我喜欢先处理眼前可见的问题。"],
  ["SN", -1, "我容易被尚未成形但有潜力的想法吸引。"],
  ["SN", 1, "我会先问一个想法有哪些证据支持，而不是马上扩展它的可能性。"],
  ["SN", -1, "我常能从零散信息里看出一个尚未被说清的方向。"],
  ["SN", 1, "我更容易记住具体细节、操作差异和实际发生过的情况。"],
  ["SN", -1, "我喜欢讨论一个选择在未来几年可能造成的连锁影响。"],
  ["SN", 1, "如果说明过于抽象，我会希望对方给出例子或步骤。"],
  ["SN", -1, "我常觉得真正重要的是隐藏在事实背后的模式。"],
  ["SN", 1, "我倾向先把已有资源用好，再考虑彻底换一种做法。"],
  ["SN", -1, "当别人只谈现实限制时，我会自然去想有没有替代路径。"],
  ["SN", 1, "我喜欢能直接检验、能复盘、能复制的方案。"],
  ["SN", -1, "我会被跨领域类比、概念迁移或新框架吸引。"],
  ["SN", 1, "我判断信息质量时，会优先看来源、样本和具体条件。"],

  ["TF", 1, "做决定时，我会优先看逻辑一致性、因果关系和公平规则。"],
  ["TF", -1, "做决定时，我会认真考虑相关人的感受、处境和价值冲突。"],
  ["TF", 1, "讨论问题时，直接指出漏洞对我来说比保持气氛更重要。"],
  ["TF", -1, "即使观点正确，如果表达伤人，我也会认为需要调整方式。"],
  ["TF", 1, "我倾向用标准、证据和原则来评价一个方案。"],
  ["TF", -1, "我常能察觉某个决定会让谁被忽视或受影响。"],
  ["TF", 1, "面对分歧，我更想尽快找出哪个论证更站得住。"],
  ["TF", -1, "面对分歧，我会先确认各方真正重视的东西是什么。"],
  ["TF", 1, "我不太介意把人和事分开评价。"],
  ["TF", -1, "我很难完全忽略决策背后的人际关系和情绪成本。"],
  ["TF", 1, "我欣赏清晰、客观、可辩护的判断。"],
  ["TF", -1, "我欣赏体贴、共情、能保留人情温度的判断。"],
  ["TF", 1, "当团队陷入犹豫时，我会倾向用规则和优先级做取舍。"],
  ["TF", -1, "当团队陷入冲突时，我会倾向先修复理解和信任。"],
  ["TF", 1, "我能接受短期不舒服，只要决定长期上更合理。"],
  ["TF", -1, "如果一个决定让人感到被否定，我会怀疑它是否真的成熟。"],
  ["TF", 1, "我更容易被清晰的论证说服，而不是被情绪强度说服。"],
  ["TF", -1, "如果一个方案忽略了人的尊严和感受，我很难认为它是好方案。"],
  ["TF", 1, "我倾向把批评看作改进信息，而不一定看作关系否定。"],
  ["TF", -1, "我会注意自己的评价是否让对方还有继续沟通的空间。"],
  ["TF", 1, "我做取舍时，会把一致标准放在个人好恶前面。"],
  ["TF", -1, "我做取舍时，会认真权衡不同人的真实需要。"],
  ["TF", 1, "在压力下，我更倾向快速建立优先级和判断规则。"],
  ["TF", -1, "在压力下，我更倾向先稳定情绪和关系氛围。"],
  ["TF", 1, "我欣赏能够把问题讲得锋利、准确、少含糊的人。"],
  ["TF", -1, "我欣赏能够照顾语气、时机和对方承受度的人。"],
  ["TF", 1, "如果规则本身合理，我通常希望大家都按同一标准执行。"],

  ["JP", 1, "我喜欢提前规划，把任务、时间和标准尽量明确下来。"],
  ["JP", -1, "我喜欢保留选择空间，等信息更充分后再决定。"],
  ["JP", 1, "未完成的事项会持续占用我的注意力，我想尽快收尾。"],
  ["JP", -1, "临近截止日期反而可能激发我的效率和创造力。"],
  ["JP", 1, "日程稳定、承诺清楚，会让我表现更好。"],
  ["JP", -1, "过早确定计划会让我觉得可能错过更好的路径。"],
  ["JP", 1, "我倾向把生活和工作环境保持在可控、有秩序的状态。"],
  ["JP", -1, "我能接受一定混乱，只要它带来探索和灵活性。"],
  ["JP", 1, "我做事通常先定目标、排优先级、再行动。"],
  ["JP", -1, "我常在行动中逐渐弄清楚目标和方法。"],
  ["JP", 1, "我不喜欢计划被临时打乱，尤其是没有充分理由时。"],
  ["JP", -1, "我能较快适应临时变化，甚至会觉得有趣。"],
  ["JP", 1, "清单、流程或阶段性检查会提高我的安全感。"],
  ["JP", -1, "我不喜欢被流程管得太死，希望根据现场调整。"],
  ["JP", 1, "我更偏好有明确结论的会议。"],
  ["JP", -1, "我更偏好能打开新问题、新选项的讨论。"],
  ["JP", 1, "我会提前为重要任务预留时间，而不是主要依靠临场发挥。"],
  ["JP", -1, "我常在最后阶段整合信息，并不一定喜欢太早定稿。"],
  ["JP", 1, "如果计划没有负责人、时间点和交付物，我会觉得不踏实。"],
  ["JP", -1, "如果计划太早被写死，我会担心它失去适应变化的能力。"],
  ["JP", 1, "我倾向把复杂事情拆成阶段，并逐步检查完成情况。"],
  ["JP", -1, "我倾向先探索多个方向，再决定哪个方向值得投入。"],
  ["JP", 1, "我喜欢把待办事项清空，这会给我明显的掌控感。"],
  ["JP", -1, "我可以同时保留几个未完成的想法，让它们继续发酵。"],
  ["JP", 1, "面对不确定性时，我会通过制定规则和边界来降低风险。"],
  ["JP", -1, "面对不确定性时，我会通过试探和调整来寻找机会。"],
  ["JP", 1, "我更愿意先确认共识和结论，再进入下一轮行动。"],
].map(([dimension, direction, text], index) => ({
  id: index + 1,
  dimension,
  direction,
  facet: facetForQuestion(index, dimension),
  text,
}));

const optionLabels = [
  ["非常不同意", -2],
  ["比较不同意", -1],
  ["不确定", 0],
  ["比较同意", 1],
  ["非常同意", 2],
];

const heroLines = [
  "进来坐坐，看看你的大脑平时把门开向哪边。",
  "不用紧张，这里只审讯偏好，不审讯灵魂。",
  "四个字母在暗处排队，等你把灯打开。",
  "你的选择会说话，虽然它们偶尔也会狡辩。",
  "看看你是计划派、灵感派，还是临场编剧派。",
  "这不是算命，但你的习惯可能会露馅。",
  "欢迎进入偏好密室，出口在第 108 题后面。",
  "请诚实作答，你的大脑已经在旁边偷笑了。",
];

const state = {
  index: 0,
  answers: Array(questions.length).fill(null),
  reviewMode: false,
  heroLineIndex: 0,
  lastReport: null,
  lastAiAnalysis: null,
};

const els = {
  introView: document.querySelector("#intro-view"),
  testView: document.querySelector("#test-view"),
  resultView: document.querySelector("#result-view"),
  startButton: document.querySelector("#start-button"),
  sampleButton: document.querySelector("#sample-button"),
  backButton: document.querySelector("#back-button"),
  prevButton: document.querySelector("#prev-button"),
  nextButton: document.querySelector("#next-button"),
  retakeButton: document.querySelector("#retake-button"),
  reviewButton: document.querySelector("#review-button"),
  aiButton: document.querySelector("#ai-button"),
  questionCounter: document.querySelector("#question-counter"),
  progressPercent: document.querySelector("#progress-percent"),
  progressBar: document.querySelector("#progress-bar"),
  questionStage: document.querySelector("#question-stage"),
  questionKicker: document.querySelector("#question-kicker"),
  questionText: document.querySelector("#question-text"),
  scale: document.querySelector("#scale"),
  typeCode: document.querySelector("#type-code"),
  typeName: document.querySelector("#type-name"),
  confidenceScore: document.querySelector("#confidence-score"),
  summaryText: document.querySelector("#summary-text"),
  heroLine: document.querySelector("#hero-line"),
  dimensionBars: document.querySelector("#dimension-bars"),
  subscoreGrid: document.querySelector("#subscore-grid"),
  consistencyGrid: document.querySelector("#consistency-grid"),
  consistencyNote: document.querySelector("#consistency-note"),
  strengthList: document.querySelector("#strength-list"),
  growthList: document.querySelector("#growth-list"),
  reliabilityText: document.querySelector("#reliability-text"),
  aiPanel: document.querySelector("#ai-panel"),
  aiOutput: document.querySelector("#ai-output"),
  aiDownloadButton: document.querySelector("#ai-download-button"),
  printReport: document.querySelector("#print-report"),
};

function showView(view) {
  [els.introView, els.testView, els.resultView].forEach((item) => {
    item.classList.toggle("hidden", item !== view);
  });
  if (view === els.introView) rotateHeroLine();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function rotateHeroLine() {
  if (!els.heroLine) return;
  state.heroLineIndex = (state.heroLineIndex + 1) % heroLines.length;
  els.heroLine.textContent = heroLines[state.heroLineIndex];
  els.heroLine.classList.remove("line-fade");
  void els.heroLine.offsetWidth;
  els.heroLine.classList.add("line-fade");
}

function animateQuestionSwitch() {
  els.questionStage.classList.remove("switching");
  void els.questionStage.offsetWidth;
  els.questionStage.classList.add("switching");
}

function renderQuestion() {
  const question = questions[state.index];
  const progress = ((state.index + 1) / questions.length) * 100;
  const selected = state.answers[state.index];

  els.questionCounter.textContent = `第 ${state.index + 1} / ${questions.length} 题`;
  els.progressPercent.textContent = `${Math.round(progress)}%`;
  els.progressBar.style.width = `${progress}%`;
  els.questionKicker.textContent = dimensions[question.dimension].name;
  els.questionText.textContent = question.text;
  els.prevButton.disabled = state.index === 0;
  els.nextButton.textContent = state.index === questions.length - 1 ? "生成结果" : "下一题";
  els.nextButton.disabled = selected === null && !state.reviewMode;

  els.scale.innerHTML = "";
  optionLabels.forEach(([label, value], optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scale-option";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(selected === value));
    if (selected === value) button.classList.add("selected");
    button.innerHTML = `<strong>${optionIndex + 1}</strong><span>${label}</span>`;
    button.addEventListener("click", () => {
      state.answers[state.index] = value;
      renderQuestion();
      if (state.index < questions.length - 1 && !state.reviewMode) {
        window.setTimeout(() => {
          state.index += 1;
          renderQuestion();
          animateQuestionSwitch();
        }, 180);
      }
    });
    els.scale.appendChild(button);
  });
}

function startTest(reset = true) {
  if (reset) {
    state.index = 0;
    state.answers = Array(questions.length).fill(null);
    state.reviewMode = false;
  }
  showView(els.testView);
  renderQuestion();
  animateQuestionSwitch();
}

function scoreAnswers(answers) {
  const raw = {};
  const details = {};
  const facetRaw = {};
  const facetDetails = {};

  Object.keys(dimensions).forEach((key) => {
    raw[key] = 0;
    details[key] = [];
    facetRaw[key] = {};
    facetDetails[key] = {};
    facetDefinitions[key].forEach((facet) => {
      facetRaw[key][facet.id] = 0;
      facetDetails[key][facet.id] = [];
    });
  });

  questions.forEach((question, index) => {
    const answer = answers[index] ?? 0;
    const contribution = answer * question.direction;
    raw[question.dimension] += contribution;
    details[question.dimension].push(contribution);
    facetRaw[question.dimension][question.facet] += contribution;
    facetDetails[question.dimension][question.facet].push(contribution);
  });

  const result = {};
  const subScores = {};
  let type = "";
  let certaintyTotal = 0;
  let consistencyTotal = 0;

  Object.entries(raw).forEach(([key, score]) => {
    const dimension = dimensions[key];
    const max = details[key].length * 2;
    const normalized = score / max;
    const letter = score >= 0 ? dimension.left : dimension.right;
    const strength = Math.round(Math.abs(normalized) * 100);
    const answeredSignals = details[key].filter((value) => value !== 0);
    const sideAgree = answeredSignals.filter((value) => Math.sign(value) === Math.sign(score || 1)).length;
    const consistency = answeredSignals.length
      ? Math.round((sideAgree / answeredSignals.length) * 100)
      : 50;

    result[key] = {
      score,
      normalized,
      letter,
      strength,
      consistency,
      leftPercent: Math.round(((normalized + 1) / 2) * 100),
    };

    subScores[key] = facetDefinitions[key].map((facet) => {
      const facetScore = facetRaw[key][facet.id];
      const facetMax = facetDetails[key][facet.id].length * 2;
      const facetNormalized = facetScore / facetMax;
      return {
        ...facet,
        score: facetScore,
        letter: facetScore >= 0 ? dimension.left : dimension.right,
        pole: facetScore >= 0 ? facet.left : facet.right,
        strength: Math.round(Math.abs(facetNormalized) * 100),
        leftPercent: Math.round(((facetNormalized + 1) / 2) * 100),
      };
    });

    type += letter;
    certaintyTotal += strength;
    consistencyTotal += consistency;
  });

  const neutralCount = answers.filter((answer) => answer === 0 || answer === null).length;
  const answered = answers.filter((answer) => answer !== null);
  const completion = answered.length / answers.length;
  const certainty = certaintyTotal / 4;
  const consistency = consistencyTotal / 4;
  const neutralPenalty = Math.min(18, neutralCount * 0.8);
  const confidence = Math.max(
    35,
    Math.min(96, Math.round(completion * 38 + certainty * 0.34 + consistency * 0.28 - neutralPenalty))
  );

  const consistencyReport = buildConsistencyReport(answers, result, neutralCount);

  return {
    type,
    result,
    subScores,
    consistencyReport,
    confidence,
    neutralCount,
    consistency: Math.round(consistency),
  };
}

function buildConsistencyReport(answers, result, neutralCount) {
  const answered = answers.filter((answer) => answer !== null);
  const answeredCount = Math.max(1, answered.length);
  let contradictionCount = 0;
  let comparablePairs = 0;

  for (let index = 0; index < questions.length - 1; index += 1) {
    if (questions[index].dimension !== questions[index + 1].dimension) continue;
    if (questions[index].direction === questions[index + 1].direction) continue;
    const first = answers[index];
    const second = answers[index + 1];
    if (first === null || second === null || first === 0 || second === 0) continue;
    const firstSignal = first * questions[index].direction;
    const secondSignal = second * questions[index + 1].direction;
    comparablePairs += 1;
    if (Math.sign(firstSignal) !== Math.sign(secondSignal)) contradictionCount += 1;
  }

  const neutralRate = Math.round((neutralCount / answeredCount) * 100);
  const extremeRate = Math.round((answered.filter((answer) => Math.abs(answer) === 2).length / answeredCount) * 100);
  const averageRaw = answered.reduce((sum, answer) => sum + answer, 0) / answeredCount;
  const agreementBias = Math.round(averageRaw * 50);
  const pairConsistency = comparablePairs
    ? Math.round(((comparablePairs - contradictionCount) / comparablePairs) * 100)
    : 50;
  const dimensionAverage = Math.round(
    Object.values(result).reduce((sum, item) => sum + item.consistency, 0) / Object.keys(result).length
  );
  const overall = Math.round(dimensionAverage * 0.58 + pairConsistency * 0.28 + (100 - neutralRate) * 0.14);

  return {
    overall,
    dimensionAverage,
    pairConsistency,
    contradictionCount,
    comparablePairs,
    neutralRate,
    extremeRate,
    agreementBias,
    biasLabel:
      agreementBias > 18
        ? "偏同意"
        : agreementBias < -18
          ? "偏不同意"
          : "无明显同意偏向",
  };
}
function getAnalysis(type, result, confidence, neutralCount, consistency) {
  const profile = typeProfiles[type];
  const letters = type.split("");
  const traits = letters.map((letter) => {
    const entry = Object.entries(dimensions).find(([, value]) => value.left === letter || value.right === letter);
    const [key, dim] = entry;
    const side = dim.left === letter ? dim.leftName : dim.rightName;
    return { key, letter, side, strength: result[key].strength };
  });

  const strongTraits = traits.filter((trait) => trait.strength >= 38);
  const closeTraits = traits.filter((trait) => trait.strength < 18);
  const dominantText = strongTraits.length
    ? `其中 ${strongTraits.map((item) => `${item.side}(${item.letter})`).join("、")} 倾向较明显。`
    : "四个维度都不算特别极端，说明你的行为可能更依赖情境。";
  const closeText = closeTraits.length
    ? ` ${closeTraits.map((item) => `${item.letter} 维度`).join("、")} 接近中线，建议结合具体场景解读。`
    : "";

  const strengths = [
    `${profile[0]}通常会以“${profile[1]}”的方式处理任务和关系。`,
    ...traits
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 3)
      .map((trait) => `${trait.side}倾向较强：${dimensionStrengthCopy(trait.key, trait.letter)}`),
  ];

  const growth = [
    ...traits
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 3)
      .map((trait) => dimensionGrowthCopy(trait.key, trait.letter)),
  ];

  const reliability =
    confidence >= 82
      ? `本次结果可信度较高。你的作答方向比较稳定，中立选项 ${neutralCount} 个，维度内部一致性约 ${consistency}%。`
      : confidence >= 68
        ? `本次结果可信度中等偏上。中立选项 ${neutralCount} 个，维度内部一致性约 ${consistency}%。接近中线的维度更适合看作“偏好”，不是固定标签。`
        : `本次结果可信度一般。中立选项 ${neutralCount} 个，维度内部一致性约 ${consistency}%。可能存在情境依赖、疲劳作答或自我印象不稳定，建议隔几天重测并对照真实行为。`;

  return {
    name: `${profile[0]} · ${letters.join(" ")}`,
    summary: `你的类型倾向为 ${type}：${profile[1]} ${dominantText}${closeText}`,
    strengths,
    growth,
    reliability,
  };
}

function dimensionStrengthCopy(key, letter) {
  const copy = {
    EI: {
      E: "容易借助交流、反馈和外部刺激推进想法。",
      I: "擅长通过独立思考沉淀判断，注意力更不易被外界牵走。",
    },
    SN: {
      S: "善于抓住事实、流程和现实约束，让方案更可靠。",
      N: "善于发现模式、趋势和隐藏可能性，让方案更有想象空间。",
    },
    TF: {
      T: "能用逻辑和原则稳定判断，适合处理复杂取舍。",
      F: "能把价值、关系和人的处境纳入判断，适合协调多方感受。",
    },
    JP: {
      J: "擅长建立结构、推进闭环，并让团队知道下一步是什么。",
      P: "擅长保留弹性、吸收新信息，在变化中快速调整路径。",
    },
  };
  return copy[key][letter];
}

function dimensionGrowthCopy(key, letter) {
  const copy = {
    EI: {
      E: "外倾强时，给自己留出安静复盘时间，避免把即时反馈误当作最终答案。",
      I: "内倾强时，适度提前暴露想法，能减少独自推演带来的盲区。",
    },
    SN: {
      S: "实感强时，刻意问一次“这个事实背后的趋势是什么”。",
      N: "直觉强时，把愿景落到证据、边界和下一步动作上。",
    },
    TF: {
      T: "思考强时，先确认对方是否感到被理解，再推进逻辑判断。",
      F: "情感强时，为重要决定补上一组清晰标准，避免只凭关系压力取舍。",
    },
    JP: {
      J: "判断强时，给计划预留变化窗口，避免过早收束。",
      P: "知觉强时，设置最低限度的时间节点，避免弹性变成拖延。",
    },
  };
  return copy[key][letter];
}

function renderResults(sample = false) {
  const answers = sample ? buildSampleAnswers("ENFP") : state.answers;
  const { type, result, subScores, consistencyReport, confidence, neutralCount, consistency } = scoreAnswers(answers);
  const analysis = getAnalysis(type, result, confidence, neutralCount, consistency);
  state.lastReport = {
    type,
    confidence,
    dimensions: result,
    subScores,
    consistencyReport,
    summary: analysis.summary,
    strengths: analysis.strengths,
    growth: analysis.growth,
    reliability: analysis.reliability,
  };

  els.typeCode.textContent = type;
  els.typeName.textContent = analysis.name;
  els.confidenceScore.textContent = `${confidence}`;
  els.summaryText.textContent = analysis.summary;
  els.reliabilityText.textContent = analysis.reliability;
  els.aiPanel.classList.add("hidden");
  els.aiOutput.textContent = "";
  els.aiOutput.className = "ai-output";

  els.strengthList.innerHTML = analysis.strengths.map((item) => `<li>${item}</li>`).join("");
  els.growthList.innerHTML = analysis.growth.map((item) => `<li>${item}</li>`).join("");
  els.dimensionBars.innerHTML = "";
  els.subscoreGrid.innerHTML = "";
  els.consistencyGrid.innerHTML = "";

  Object.entries(result).forEach(([key, value]) => {
    const dim = dimensions[key];
    const row = document.createElement("div");
    const fillWidth = value.strength / 2;
    const fillLeft = value.score >= 0 ? 50 - fillWidth : 50;
    row.className = "dim-row";
    row.innerHTML = `
      <span class="dim-label">${dim.left}</span>
      <div class="dim-track" aria-label="${dim.name}">
        <span class="dim-fill" style="left:${fillLeft}%;width:${fillWidth}%"></span>
      </div>
      <span class="dim-label">${dim.right}</span>
      <span class="dim-meta">${value.letter} · ${value.strength}%｜${dim.description}</span>
    `;
    els.dimensionBars.appendChild(row);
  });

  renderSubscores(subScores);
  renderConsistencyReport(consistencyReport);
  showView(els.resultView);
}


function renderSubscores(subScores) {
  Object.entries(subScores).forEach(([dimensionKey, facets]) => {
    const dim = dimensions[dimensionKey];
    facets.forEach((facet) => {
      const card = document.createElement("div");
      card.className = "subscore-card";
      card.innerHTML = `
        <b>${dim.left}/${dim.right} · ${facet.name}</b>
        <span>${facet.pole}</span>
        <small>${facet.letter} 倾向 ${facet.strength}% · ${facet.left} / ${facet.right}</small>
        <div class="mini-track"><i class="mini-fill" style="width:${Math.max(6, facet.strength)}%"></i></div>
      `;
      els.subscoreGrid.appendChild(card);
    });
  });
}

function renderConsistencyReport(report) {
  const cards = [
    ["总体一致性", `${report.overall}%`, "综合维度内部一致、成对题一致和中立比例。"],
    ["维度内部一致", `${report.dimensionAverage}%`, "同一维度内题项是否指向相同偏好。"],
    ["成对题一致", `${report.pairConsistency}%`, `${report.contradictionCount}/${report.comparablePairs || 0} 组出现方向矛盾。`],
    ["中立作答", `${report.neutralRate}%`, "比例过高会降低类型判断清晰度。"],
    ["极端作答", `${report.extremeRate}%`, "比例过高可能表示偏好很强，也可能表示作答风格偏强。"],
    ["同意偏向", report.biasLabel, `同意偏向指数 ${report.agreementBias}，正数表示更常同意。`],
  ];

  els.consistencyGrid.innerHTML = cards
    .map(
      ([title, value, note]) => `
        <div class="consistency-card">
          <b>${title}</b>
          <span>${value}</span>
          <small>${note}</small>
        </div>
      `
    )
    .join("");

  els.consistencyNote.textContent = consistencyAdvice(report);
}

function consistencyAdvice(report) {
  if (report.overall >= 82 && report.neutralRate <= 18) {
    return "反应模式较稳定，本次类型和维度强度有较好的参考价值。";
  }
  if (report.pairConsistency < 68) {
    return "正反向成对题出现较多矛盾，可能存在情境摇摆、题意理解偏差或作答疲劳；建议休息后重测。";
  }
  if (report.neutralRate > 28) {
    return "中立选项偏多，说明偏好边界不清或当前状态不稳定；建议结合真实行为，而不是只看四字母类型。";
  }
  if (Math.abs(report.agreementBias) > 28) {
    return "存在较明显的同意/不同意作答风格，解读时应更关注正反向题共同支持的维度。";
  }
  return "反应一致性处于可接受范围；接近中线的维度仍建议按情境偏好理解。";
}
async function generateAiAnalysis() {
  if (!state.lastReport) return;

  els.aiPanel.classList.remove("hidden");
  els.aiDownloadButton.classList.add("hidden");
  els.aiOutput.className = "ai-output loading";
  els.aiOutput.textContent = "正在生成分析摘要，完整版在PDF里。";
  els.aiButton.disabled = true;

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report: state.lastReport }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "AI 接口暂时不可用。");
    }

    const summary = stripThink(data.summary || data.analysis || "AI 没有返回摘要。").trim();
    const fullAnalysis = stripThink(data.fullAnalysis || data.analysis || summary).trim();

    state.lastAiAnalysis = {
      summary,
      fullAnalysis,
      createdAt: new Date().toLocaleString("zh-CN"),
      report: state.lastReport,
    };

    els.aiOutput.className = "ai-output";
    els.aiOutput.textContent = summary;
    els.aiDownloadButton.classList.remove("hidden");
  } catch (error) {
    els.aiOutput.className = "ai-output error";
    els.aiOutput.textContent =
      `${error.message}\n\n如果你正在 GitHub Pages 上访问，这是正常的：GitHub Pages 只能托管静态页面，不能运行 /api/analyze。请把项目部署到 Vercel，并在 Vercel 环境变量里设置 MINIMAX_API_KEY。`;
  } finally {
    els.aiButton.disabled = false;
  }
}

function stripThink(text) {
  return String(text || "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<thinking>[\s\S]*?<\/thinking>/gi, "")
    .replace(/<think>[\s\S]*$/gi, "")
    .trim();
}

function downloadAiPdf() {
  if (!state.lastAiAnalysis) return;

  const { summary, fullAnalysis, createdAt, report } = state.lastAiAnalysis;
  const type = report?.type || "MBTI";

  els.printReport.innerHTML = `
    <h1>${escapeHtml(type)} AI 深度分析报告</h1>
    <div class="print-meta">生成时间：${escapeHtml(createdAt)} · 非官方 MBTI 风格自评报告</div>
    <h2>页面摘要</h2>
    <div class="print-box">${escapeHtml(summary)}</div>
    <h2>完整分析</h2>
    <div class="print-content">${escapeHtml(fullAnalysis)}</div>
  `;

  window.setTimeout(() => window.print(), 30);
}
function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function buildSampleAnswers(type) {
  return questions.map((question) => {
    const dimension = dimensions[question.dimension];
    const target = type.includes(dimension.left) ? 1 : -1;
    const aligned = target * question.direction;
    return aligned > 0 ? 2 : -1;
  });
}

function goNext() {
  if (state.answers[state.index] === null && !state.reviewMode) return;
  if (state.index === questions.length - 1) {
    renderResults();
    return;
  }
  state.index += 1;
  renderQuestion();
  animateQuestionSwitch();
}

function goPrev() {
  if (state.index === 0) return;
  state.index -= 1;
  renderQuestion();
  animateQuestionSwitch();
}

els.startButton.addEventListener("click", () => startTest(true));
els.sampleButton.addEventListener("click", () => renderResults(true));
els.backButton.addEventListener("click", () => showView(els.introView));
els.prevButton.addEventListener("click", goPrev);
els.nextButton.addEventListener("click", goNext);
els.retakeButton.addEventListener("click", () => startTest(true));
els.reviewButton.addEventListener("click", () => {
  state.reviewMode = true;
  state.index = 0;
  startTest(false);
});
els.aiButton.addEventListener("click", generateAiAnalysis);
els.aiDownloadButton.addEventListener("click", downloadAiPdf);

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  button.classList.remove("tap-fade");
  void button.offsetWidth;
  button.classList.add("tap-fade");
  window.setTimeout(() => button.classList.remove("tap-fade"), 300);
});

window.addEventListener("keydown", (event) => {
  if (els.testView.classList.contains("hidden")) return;
  const number = Number(event.key);
  if (number >= 1 && number <= 5) {
    state.answers[state.index] = optionLabels[number - 1][1];
    renderQuestion();
  }
  if (event.key === "ArrowRight") goNext();
  if (event.key === "ArrowLeft") goPrev();
});
