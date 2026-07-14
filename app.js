const dailyLogs = {
  "2026-07-13": {
    calorieBudget: 1680,
    actualCalories: 1620,
    burnTarget: 420,
    startWeightInput: 84.2,
    currentWeightInput: 83.2,
    stepsInput: 9800,
    sleepInput: 7.1,
    stepsTarget: 10000,
    sleepTarget: 7.5,
    trainingMinutes: 50,
    trainingTarget: 60,
    mealInput: "早餐：鸡蛋2个，希腊酸奶200g\n午餐：鸡胸肉160g，米饭120g，青菜\n晚餐：牛肉120g，豆腐，沙拉\n加餐：乳清蛋白一勺",
    trainingInput: "力量 A：深蹲 4x8，推举 4x8，划船 4x10\n有氧：坡度走 18 分钟",
  },
  "2026-07-14": {
    calorieBudget: 1680,
    actualCalories: 1740,
    burnTarget: 420,
    startWeightInput: 84.2,
    currentWeightInput: 82.8,
    stepsInput: 11240,
    sleepInput: 6.8,
    stepsTarget: 10000,
    sleepTarget: 7.5,
    trainingMinutes: 35,
    trainingTarget: 60,
    mealInput: "早餐：鸡蛋2个，酸奶250g\n午餐：三文鱼150g，米饭150g，西兰花\n晚餐：鸡胸肉120g，玉米，沙拉",
    trainingInput: "有氧：Zone 2 35 分钟\n拉伸：髋部 8 分钟",
  },
  "2026-07-15": {
    calorieBudget: 1680,
    actualCalories: 1560,
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
};

const periodGoals = {
  "week-plan": {
    kicker: "WEEK PLAN",
    title: "2026.7.13-7.17 周规划",
    status: "由每日记录推进",
    chip: "周规划",
    targetLoss: 3,
    dateRange: ["2026-07-13", "2026-07-15"],
  },
  "week-review": {
    kicker: "WEEK REVIEW",
    title: "2026.7.13-7.17 周复盘",
    status: "复盘本周表现",
    chip: "周复盘",
    targetLoss: 3,
    dateRange: ["2026-07-13", "2026-07-15"],
  },
  "month-plan": {
    kicker: "MONTH PLAN",
    title: "2026.7 月规划",
    status: "按日累计月目标",
    chip: "月规划",
    targetLoss: 6,
    dateRange: ["2026-07-01", "2026-07-31"],
  },
  "month-review": {
    kicker: "MONTH REVIEW",
    title: "2026.7 月复盘",
    status: "复盘月度趋势",
    chip: "月复盘",
    targetLoss: 6,
    dateRange: ["2026-07-01", "2026-07-31"],
  },
  "half-plan": {
    kicker: "HALF YEAR PLAN",
    title: "2026 H2 半年规划",
    status: "长期目标编排",
    chip: "半年规划",
    targetLoss: 12,
    dateRange: ["2026-07-01", "2026-12-31"],
  },
  "half-review": {
    kicker: "HALF YEAR REVIEW",
    title: "2026 H2 半年复盘",
    status: "观察长期变化",
    chip: "半年复盘",
    targetLoss: 12,
    dateRange: ["2026-07-01", "2026-12-31"],
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

const numericFields = [
  "calorieBudget",
  "actualCalories",
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
const stateFields = ["dateInput", ...numericFields, "mealInput", "trainingInput"];
const editableFields = stateFields;
let activePage = "daily-log";
let activeDate = "2026-07-15";
let isAdmin = sessionStorage.getItem("jianfei-admin") === "true";
const adminPassword = "admin0330";

const $ = (selector) => document.querySelector(selector);

function numberValue(id) {
  return Number($(`#${id}`).value) || 0;
}

function dateLabel(date) {
  const [, month, day] = date.split("-");
  return `${Number(month)}.${Number(day)}`;
}

function blankLog(date) {
  const latest = dailyLogs[activeDate] || dailyLogs["2026-07-15"];
  return {
    ...latest,
    actualCalories: 0,
    currentWeightInput: latest.currentWeightInput,
    stepsInput: 0,
    sleepInput: 0,
    trainingMinutes: 0,
    mealInput: "",
    trainingInput: "",
    dateInput: date,
  };
}

function getDailyLog(date) {
  if (!dailyLogs[date]) dailyLogs[date] = blankLog(date);
  return dailyLogs[date];
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

function datesBetween(start, end) {
  return Object.keys(dailyLogs)
    .filter((date) => date >= start && date <= end)
    .sort();
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function aggregatePeriod(page) {
  const goal = periodGoals[page];
  const dates = datesBetween(goal.dateRange[0], goal.dateRange[1]);
  const logs = dates.map((date) => dailyLogs[date]);
  const first = logs[0] || getDailyLog(activeDate);
  const last = logs[logs.length - 1] || first;
  const mealInput = dates.map((date) => `${dateLabel(date)}\n${dailyLogs[date].mealInput}`).join("\n\n");
  const trainingInput = dates.map((date) => `${dateLabel(date)}\n${dailyLogs[date].trainingInput}`).join("\n\n");

  return {
    dateInput: activeDate,
    calorieBudget: Math.round(average(logs.map((log) => Number(log.calorieBudget)))),
    actualCalories: Math.round(average(logs.map((log) => Number(log.actualCalories)))),
    burnTarget: Math.round(average(logs.map((log) => Number(log.burnTarget)))),
    startWeightInput: first.startWeightInput,
    currentWeightInput: last.currentWeightInput,
    stepsInput: Math.round(average(logs.map((log) => Number(log.stepsInput)))),
    sleepInput: Number(average(logs.map((log) => Number(log.sleepInput))).toFixed(1)),
    stepsTarget: Math.round(average(logs.map((log) => Number(log.stepsTarget)))),
    sleepTarget: Number(average(logs.map((log) => Number(log.sleepTarget))).toFixed(1)),
    trainingMinutes: logs.reduce((sum, log) => sum + Number(log.trainingMinutes), 0),
    trainingTarget: logs.reduce((sum, log) => sum + Number(log.trainingTarget), 0),
    mealInput,
    trainingInput,
    days: logs.length,
  };
}

function saveDailyForm() {
  if (activePage !== "daily-log") return;
  const previousDate = activeDate;
  const nextDate = $("#dateInput").value || activeDate;
  const log = getDailyLog(nextDate);
  numericFields.forEach((id) => {
    log[id] = $(`#${id}`).value;
  });
  log.mealInput = $("#mealInput").value;
  log.trainingInput = $("#trainingInput").value;
  activeDate = nextDate;
  if (previousDate !== nextDate) setPageHeader("daily-log", nextDate);
}

function fillForm(data) {
  $("#dateInput").value = data.dateInput || activeDate;
  numericFields.forEach((id) => {
    $(`#${id}`).value = data[id] ?? 0;
  });
  $("#mealInput").value = data.mealInput || "";
  $("#trainingInput").value = data.trainingInput || "";
}

function setWidth(selector, value) {
  $(selector).style.width = `${Math.max(0, Math.min(value, 100))}%`;
}

function updateDashboard() {
  if (activePage === "daily-log") saveDailyForm();

  const budget = numberValue("calorieBudget");
  const actual = numberValue("actualCalories");
  const burn = numberValue("burnTarget");
  const startWeight = numberValue("startWeightInput");
  const currentWeight = numberValue("currentWeightInput");
  const steps = numberValue("stepsInput");
  const sleep = numberValue("sleepInput");
  const stepsGoal = Math.max(numberValue("stepsTarget"), 1);
  const sleepGoal = Math.max(numberValue("sleepTarget"), 1);
  const training = numberValue("trainingMinutes");
  const trainingGoal = Math.max(numberValue("trainingTarget"), 1);
  const targetLoss = activePage === "daily-log" ? 3 : periodGoals[activePage].targetLoss;
  const lost = Math.max(startWeight - currentWeight, 0);
  const progress = Math.round((lost / targetLoss) * 100);
  const deficit = budget + burn - actual;
  const protein = estimateProtein($("#mealInput").value);
  const stepsRate = Math.round((steps / stepsGoal) * 100);
  const sleepRate = Math.round((sleep / sleepGoal) * 100);
  const trainingRate = Math.round((training / trainingGoal) * 100);
  const score = Math.round(
    Math.min(progress, 100) * 0.35 +
      Math.min(Math.max(deficit / 8, 0), 100) * 0.25 +
      Math.min(stepsRate, 100) * 0.17 +
      Math.min(sleepRate, 100) * 0.11 +
      Math.min(trainingRate, 100) * 0.12
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
  $("#targetLossLabel").textContent = activePage === "daily-log" ? "周目标 3.0kg" : `目标 ${targetLoss.toFixed(1)}kg`;
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

function setPageHeader(page, date = activeDate) {
  if (page === "daily-log") {
    $("#pageKicker").textContent = "DAILY LOG";
    $("#pageTitle").textContent = `${dateLabel(date)} 日录入`;
    $("#pageStatus").textContent = "记录今天";
    $("#periodChip").textContent = "日录入";
    $("#meterLabel").textContent = "今日记录";
    $(".control-panel .panel-head strong").textContent = "日录入";
    return;
  }

  const goal = periodGoals[page];
  $("#pageKicker").textContent = goal.kicker;
  $("#pageTitle").textContent = goal.title;
  $("#pageStatus").textContent = goal.status;
  $("#periodChip").textContent = goal.chip;
  $("#meterLabel").textContent = goal.chip;
  $(".control-panel .panel-head strong").textContent = page.includes("review") ? "汇总复盘" : "周期目标";
}

function switchPage(page, date = activeDate) {
  if (activePage === "daily-log") saveDailyForm();

  activePage = page;
  activeDate = date;
  document.body.dataset.page = page;
  setPageHeader(page, date);

  if (page === "daily-log") {
    const log = getDailyLog(date);
    fillForm({ ...log, dateInput: date });
  } else {
    fillForm(aggregatePeriod(page));
  }

  document.querySelectorAll(".time-item").forEach((item) => {
    const isDaily = item.dataset.page === "daily-log" && item.dataset.date === activeDate;
    const isPeriod = page !== "daily-log" && item.dataset.page === page;
    item.classList.toggle("active", isDaily || isPeriod);
  });

  updateDashboard();
  applyAdminMode();
}

stateFields.forEach((id) => $(`#${id}`).addEventListener("input", updateDashboard));

document.querySelectorAll(".time-item").forEach((item) => {
  item.addEventListener("click", () => switchPage(item.dataset.page, item.dataset.date || activeDate));
});

function applyAdminMode() {
  document.body.classList.toggle("admin-mode", isAdmin);
  document.body.classList.toggle("readonly-mode", !isAdmin);
  $("#adminState").textContent = isAdmin ? "管理员可编辑" : "访客只读";
  $("#adminToggle").textContent = isAdmin ? "退出管理" : "管理员模式";

  editableFields.forEach((id) => {
    const field = $(`#${id}`);
    const isReadonly = !isAdmin || activePage !== "daily-log";
    field.readOnly = isReadonly;
    field.setAttribute("aria-readonly", String(isReadonly));
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

switchPage("daily-log", activeDate);
