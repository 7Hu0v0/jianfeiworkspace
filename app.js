const pageMeta = {
  "week-plan": ["WEEK PLAN", "2026.7.13-7.17 周规划", "本周推进中", "周规划", 3],
  "week-review": ["WEEK REVIEW", "2026.7.13-7.17 周复盘", "复盘本周表现", "周复盘", 3],
  "month-plan": ["MONTH PLAN", "2026.7 月规划", "拆解月度目标", "月规划", 6],
  "month-review": ["MONTH REVIEW", "2026.7 月复盘", "复盘月度趋势", "月复盘", 6],
  "half-plan": ["HALF YEAR PLAN", "2026 H2 半年规划", "长期目标编排", "半年规划", 12],
  "half-review": ["HALF YEAR REVIEW", "2026 H2 半年复盘", "观察长期变化", "半年复盘", 12],
};

const pageState = {
  "week-plan": {
    calorieBudget: 1680,
    burnTarget: 420,
    startWeightInput: 84.2,
    currentWeightInput: 82.4,
    stepsInput: 10840,
    sleepInput: 7.4,
    stepsTarget: 10000,
    sleepTarget: 7.5,
    trainingMinutes: 45,
    trainingTarget: 60,
    mealInput: "早餐：鸡蛋2个，希腊酸奶200g\n午餐：鸡胸肉180g，米饭150g，西兰花\n晚餐：三文鱼150g，沙拉，玉米\n加餐：乳清蛋白一勺，杏仁20g",
    trainingInput: "力量 A：深蹲 4x8，推举 4x8，划船 4x10\n有氧：Zone 2 坡度走 20 分钟\n拉伸：肩颈与髋部 8 分钟",
  },
  "week-review": {
    calorieBudget: 1700,
    burnTarget: 390,
    startWeightInput: 84.2,
    currentWeightInput: 82.7,
    stepsInput: 9240,
    sleepInput: 6.9,
    stepsTarget: 10000,
    sleepTarget: 7.5,
    trainingMinutes: 218,
    trainingTarget: 300,
    mealInput: "本周高蛋白日：鸡胸肉4次，鸡蛋10个，酸奶5杯\n波动日：火锅一次，夜宵一次\n加餐：乳清蛋白3勺",
    trainingInput: "本周完成：力量 3 次，有氧 2 次\n漏掉：周四核心训练\n下周调整：把有氧放到午饭后",
  },
  "month-plan": {
    calorieBudget: 1750,
    burnTarget: 360,
    startWeightInput: 84.2,
    currentWeightInput: 82.4,
    stepsInput: 10200,
    sleepInput: 7.2,
    stepsTarget: 9500,
    sleepTarget: 7.3,
    trainingMinutes: 5,
    trainingTarget: 20,
    mealInput: "月度饮食原则：鸡胸肉、鱼、鸡蛋、酸奶轮换\n每周一次自由餐，乳清蛋白训练日补充",
    trainingInput: "月目标：力量 12 次，有氧 8 次\n重点：深蹲、硬拉、卧推逐步加重量",
  },
  "month-review": {
    calorieBudget: 1760,
    burnTarget: 330,
    startWeightInput: 86.1,
    currentWeightInput: 82.4,
    stepsInput: 9800,
    sleepInput: 7.0,
    stepsTarget: 9500,
    sleepTarget: 7.3,
    trainingMinutes: 16,
    trainingTarget: 20,
    mealInput: "本月主要蛋白来源：鸡蛋、鸡胸肉、三文鱼、牛肉、希腊酸奶\n问题：周末碳水偏高",
    trainingInput: "本月复盘：力量 10 次，有氧 6 次\n瓶颈：下肢恢复慢，睡眠不足时训练质量下降",
  },
  "half-plan": {
    calorieBudget: 1850,
    burnTarget: 300,
    startWeightInput: 88.8,
    currentWeightInput: 82.4,
    stepsInput: 10000,
    sleepInput: 7.5,
    stepsTarget: 9000,
    sleepTarget: 7.5,
    trainingMinutes: 18,
    trainingTarget: 96,
    mealInput: "半年策略：每餐保证蛋白质\n常备：鸡胸肉、牛肉、鱼、鸡蛋、酸奶、豆腐、乳清蛋白",
    trainingInput: "半年训练：力量为主，有氧辅助\n阶段一减脂，阶段二维持，阶段三塑形",
  },
  "half-review": {
    calorieBudget: 1860,
    burnTarget: 280,
    startWeightInput: 88.8,
    currentWeightInput: 82.4,
    stepsInput: 9400,
    sleepInput: 7.1,
    stepsTarget: 9000,
    sleepTarget: 7.5,
    trainingMinutes: 42,
    trainingTarget: 96,
    mealInput: "半年复盘记录：鸡胸肉、鸡蛋、酸奶执行稳定\n需要改善：外食估算不准，周末蛋白质不足",
    trainingInput: "半年训练复盘：力量习惯已建立\n下一阶段：增加背部容量和核心稳定",
  },
};

const proteinRules = [
  ["鸡胸肉", 31, "g/100g"],
  ["三文鱼", 22, "g/100g"],
  ["牛肉", 26, "g/100g"],
  ["虾", 20, "g/100g"],
  ["豆腐", 8, "g/100g"],
  ["希腊酸奶", 10, "g/100g"],
  ["酸奶", 5, "g/100g"],
  ["乳清蛋白", 24, "每勺"],
  ["鸡蛋", 6, "每个"],
  ["杏仁", 21, "g/100g"],
  ["米饭", 2.6, "g/100g"],
];

const fields = [
  "calorieBudget",
  "burnTarget",
  "startWeightInput",
  "currentWeightInput",
  "stepsInput",
  "sleepInput",
  "stepsTarget",
  "sleepTarget",
  "trainingMinutes",
  "trainingTarget",
];

const stateFields = [...fields, "mealInput", "trainingInput"];
let activePage = "week-plan";
let isAdmin = sessionStorage.getItem("jianfei-admin") === "true";
const adminPassword = "admin0330";

const $ = (selector) => document.querySelector(selector);

function numberValue(id) {
  return Number($(`#${id}`).value) || 0;
}

function estimateProtein(text) {
  const hits = [];
  let total = 0;

  proteinRules.forEach(([name, protein, unit]) => {
    if (!text.includes(name)) return;
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(new RegExp(`${escaped}\\s*([0-9.]+)?\\s*(g|个|勺)?`));
    const amount = match && match[1] ? Number(match[1]) : 1;
    let grams = protein;

    if (unit === "g/100g") grams = (amount * protein) / 100;
    if (unit === "每个") grams = amount * protein;
    if (unit === "每勺") grams = amount * protein;

    total += grams;
    hits.push(`${name} ≈ ${Math.round(grams)}g`);
  });

  return { total: Math.round(total), hits };
}

function setWidth(selector, value) {
  $(selector).style.width = `${Math.max(0, Math.min(value, 100))}%`;
}

function updateDashboard() {
  const budget = numberValue("calorieBudget");
  const burn = numberValue("burnTarget");
  const startWeight = numberValue("startWeightInput");
  const currentWeight = numberValue("currentWeightInput");
  const steps = numberValue("stepsInput");
  const sleep = numberValue("sleepInput");
  const stepsGoal = Math.max(numberValue("stepsTarget"), 1);
  const sleepGoal = Math.max(numberValue("sleepTarget"), 1);
  const training = numberValue("trainingMinutes");
  const trainingGoal = Math.max(numberValue("trainingTarget"), 1);

  const meta = pageMeta[document.body.dataset.page || "week-plan"];
  const targetLoss = meta[4];
  const lost = Math.max(startWeight - currentWeight, 0);
  const progress = Math.round((lost / targetLoss) * 100);
  const deficit = 2000 + burn - budget;
  const protein = estimateProtein($("#mealInput").value);
  const stepsRate = Math.round((steps / stepsGoal) * 100);
  const sleepRate = Math.round((sleep / sleepGoal) * 100);
  const trainingRate = Math.round((training / trainingGoal) * 100);
  const score = Math.round(
    Math.min(progress, 100) * 0.42 +
      Math.min(Math.max(deficit / 8, 0), 100) * 0.2 +
      Math.min(stepsRate, 100) * 0.18 +
      Math.min(sleepRate, 100) * 0.1 +
      Math.min(trainingRate, 100) * 0.1
  );

  $("#lostWeight").textContent = lost.toFixed(1);
  $("#lostWeightText").textContent = `${lost.toFixed(1)} kg`;
  $("#progressText").textContent = `${Math.min(progress, 100)}%`;
  $("#progressValue").textContent = `${Math.min(progress, 100)}%`;
  $("#deficitValue").textContent = deficit;
  $("#proteinValue").textContent = `${protein.total}g`;
  $("#proteinHint").textContent = protein.hits.length ? `识别 ${protein.hits.length} 项` : "等待饮食输入";
  $("#stepsValue").textContent = steps;
  $("#stepsHint").textContent = `目标 ${stepsGoal} · ${Math.min(stepsRate, 100)}%`;
  $("#sleepValue").textContent = `${sleep.toFixed(1)}h`;
  $("#sleepHint").textContent = `目标 ${sleepGoal}h · ${Math.min(sleepRate, 100)}%`;
  $("#burnScore").textContent = score;
  $("#targetLossLabel").textContent = `目标 ${targetLoss.toFixed(1)}kg`;
  $("#trainingChip").textContent = `${training} / ${trainingGoal} min`;
  $("#coachNote").textContent =
    trainingRate >= 100
      ? "训练目标已完成，今天可以把重点放在恢复、拉伸和睡眠。"
      : `还差 ${Math.max(trainingGoal - training, 0)} 分钟，建议补一个轻有氧或核心训练。`;

  $("#proteinBreakdown").innerHTML = protein.hits.length
    ? protein.hits.map((hit) => `<span>${hit}</span>`).join("")
    : "<span>输入鸡胸肉、鸡蛋、酸奶、乳清蛋白等食物后会自动估算。</span>";

  setWidth("#progressBar", progress);
  setWidth("#trainingBar", trainingRate);
  $(".orbital-meter").style.background = `conic-gradient(from 220deg, var(--white) 0 ${Math.min(progress, 100)}%, rgba(255,255,255,0.08) ${Math.min(progress, 100)}% 100%)`;
}

function switchPage(page) {
  stateFields.forEach((id) => {
    pageState[activePage][id] = $(`#${id}`).value;
  });

  activePage = page;
  stateFields.forEach((id) => {
    $(`#${id}`).value = pageState[page][id];
  });

  const meta = pageMeta[page];
  document.body.dataset.page = page;
  $("#pageKicker").textContent = meta[0];
  $("#pageTitle").textContent = meta[1];
  $("#pageStatus").textContent = meta[2];
  $("#periodChip").textContent = meta[3];
  $("#meterLabel").textContent = meta[3];

  document.querySelectorAll(".time-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.page === page);
  });

  const isReview = page.includes("review");
  $(".control-panel .panel-head strong").textContent = isReview ? "复盘输入" : "目标输入";
  updateDashboard();
  applyAdminMode();
}

fields.forEach((id) => $(`#${id}`).addEventListener("input", updateDashboard));
$("#mealInput").addEventListener("input", updateDashboard);
$("#trainingInput").addEventListener("input", updateDashboard);

document.querySelectorAll(".time-item").forEach((item) => {
  item.addEventListener("click", () => switchPage(item.dataset.page));
});

function applyAdminMode() {
  document.body.classList.toggle("admin-mode", isAdmin);
  document.body.classList.toggle("readonly-mode", !isAdmin);
  $("#adminState").textContent = isAdmin ? "管理员可编辑" : "访客只读";
  $("#adminToggle").textContent = isAdmin ? "退出管理" : "管理员模式";

  stateFields.forEach((id) => {
    const field = $(`#${id}`);
    field.readOnly = !isAdmin;
    field.setAttribute("aria-readonly", String(!isAdmin));
  });
}

$("#adminToggle").addEventListener("click", () => {
  if (isAdmin) {
    isAdmin = false;
    sessionStorage.removeItem("jianfei-admin");
    applyAdminMode();
    return;
  }

  const password = window.prompt("请输入管理员密码");
  if (password === adminPassword) {
    isAdmin = true;
    sessionStorage.setItem("jianfei-admin", "true");
    applyAdminMode();
    return;
  }

  if (password !== null) {
    window.alert("密码不正确");
  }
});

switchPage("week-plan");
