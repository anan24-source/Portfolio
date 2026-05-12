const statusMeta = {
  run: { label: "Run", color: "#22c55e" },
  warm: { label: "Warm Up", color: "#facc15" },
  stop: { label: "Alarm", color: "#fb4d55" },
  offline: { label: "Offline", color: "#64748b" },
};

const zoneTargets = {
  zoneA: 36,
  zoneB: 30,
  zoneC: 30,
  zoneD: 24,
  zoneE: 30,
};

const zoneNames = {
  zoneA: "Line A",
  zoneB: "Line B",
  zoneC: "Line C",
  zoneD: "Line D",
  zoneE: "Line E",
};

const prefixSequence = ["AA", "BB", "CC", "DD", "EE"];
const statusPattern = [
  "run",
  "run",
  "run",
  "warm",
  "run",
  "stop",
  "run",
  "run",
  "offline",
  "run",
  "warm",
  "run",
  "run",
  "stop",
  "run",
];

const downtimeMeta = {
  run: { label: "Run", color: "#22c55e" },
  warmup: { label: "Warm Up", color: "#facc15" },
  mm: { label: "MM", color: "#ef4444" },
  setup: { label: "Setup", color: "#f97316" },
  alarm: { label: "Alarm", color: "#ec4899" },
  planStop: { label: "Plan Stop", color: "#2563eb" },
  offline: { label: "Offline", color: "#64748b" },
};

let displayMode = "output";
let activeMachine = null;
let outputTimer = null;
let downtimeView = "details";

function pad(value) {
  return String(value).padStart(2, "0");
}

function machineName(index) {
  const prefix = prefixSequence[Math.floor((index - 1) / 30)];
  const number = ((index - 1) % 30) + 1;
  return `${prefix}-${pad(number)}`;
}

function createTimeline(machineIndex) {
  const alarmReason = [
    "Servo overload on X axis",
    "Hydraulic pressure low",
    "Door interlock open",
    "Tool clamp signal missing",
  ][machineIndex % 4];
  const warm = 25 + (machineIndex % 4) * 5;
  const setup = 30 + (machineIndex % 5) * 8;
  const mm = 18 + (machineIndex % 3) * 6;
  const alarm = 12 + (machineIndex % 6) * 5;
  const planStop = 45 + (machineIndex % 4) * 15;
  const offline = machineIndex % 9 === 0 ? 90 : 0;
  const run = 1440 - warm - setup - mm - alarm - planStop - offline;

  return [
    { type: "run", start: "06:00", minutes: Math.max(run, 780) },
    { type: "warmup", minutes: warm },
    { type: "setup", minutes: setup },
    { type: "run", minutes: 210 + (machineIndex % 4) * 18 },
    { type: "mm", minutes: mm },
    { type: "alarm", minutes: alarm, reason: alarmReason },
    { type: "planStop", minutes: planStop },
    { type: "offline", minutes: offline },
  ].filter((segment) => segment.minutes > 0);
}

function addMinutes(time, minutes) {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  const normalized = ((total % 1440) + 1440) % 1440;
  return `${pad(Math.floor(normalized / 60))}:${pad(normalized % 60)}`;
}

function enrichTimeline(segments) {
  let cursor = "06:00";

  return segments.map((segment) => {
    const start = cursor;
    const end = addMinutes(cursor, segment.minutes);
    cursor = end;
    return { ...segment, start, end };
  });
}

function createMachine(index) {
  const status = statusPattern[(index - 1) % statusPattern.length];
  const plan = 1000 + (index % 6) * 120;
  const actual = Math.max(120, plan - ((index * 37) % 420));
  const ng = (index * 3) % 34;
  const availability = status === "stop" ? 68 : status === "offline" ? 0 : 86 + (index % 10);
  const performance = status === "stop" ? 64 : status === "offline" ? 0 : 82 + (index % 13);
  const quality = status === "offline" ? 0 : 88 + (index % 8);
  const oee = Math.round((availability * performance * quality) / 10000);
  const cycleTime = 6 + (index % 9);

  return {
    id: index,
    name: machineName(index),
    status,
    output: actual,
    plan,
    actual,
    diff: actual - plan,
    ng,
    downTime: status === "run" ? "00:05:18" : status === "warm" ? "00:22:40" : status === "stop" ? "01:12:18" : "03:44:10",
    workTime: status === "offline" ? "00:00:00" : "07:10:07",
    availability,
    performance,
    quality,
    oee,
    cycleTime,
    timeline: enrichTimeline(createTimeline(index)),
  };
}

const machines = Array.from({ length: 150 }, (_, index) => createMachine(index + 1));

const pcList = [
  ["PC-01", "Running", "pcZoneA", "Line A"],
  ["PC-02", "Running", "pcZoneB", "Line B"],
  ["PC-03", "Offline", "pcZoneC", "Line C"],
  ["PC-04", "Running", "pcZoneD", "Line D"],
  ["PC-05", "Running", "pcZoneE", "Line E"],
];

const computers = pcList.map(([name, status, zoneId, lineName], index) => ({
  id: index + 1,
  name,
  version: "Version 1.0.2",
  status,
  zoneId,
  lineName,
  autoStart: false,
}));

function displayData(machine) {
  if (displayMode === "ability") {
    return { label: "Ability", value: `${machine.availability}%` };
  }

  if (displayMode === "cycle") {
    return { label: "Cycle Time", value: `${machine.cycleTime}s` };
  }

  return { label: "Output", value: machine.output.toLocaleString() };
}

function renderMachines() {
  let start = 0;

  Object.entries(zoneTargets).forEach(([zoneId, count]) => {
    const zone = document.querySelector(`#${zoneId}`);
    const slice = machines.slice(start, start + count);
    start += count;

    zone.innerHTML = slice
      .map((machine) => {
        machine.lineName = zoneNames[zoneId];
        const meta = statusMeta[machine.status];
        const display = displayData(machine);
        return `
          <button class="machine-box" type="button" data-machine-id="${machine.id}" style="--status-color: ${meta.color}" aria-label="${machine.name} ${meta.label} ${display.label} ${display.value}">
            <span class="machine-name">${machine.name}</span>
            <span class="machine-output">${display.label}<strong data-live-card-output="${machine.id}">${display.value}</strong></span>
          </button>
        `;
      })
      .join("");
  });
}

function renderComputers() {
  computers.forEach((pc) => {
    const target = document.querySelector(`#${pc.zoneId}`);

    target.innerHTML = `
        <button class="pc-marker" type="button" data-pc-id="${pc.id}" aria-label="${pc.name} ${pc.status}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="5" width="16" height="11" rx="2"></rect>
            <path d="M8 21h8M12 16v5"></path>
          </svg>
          <span>${pc.name}</span>
        </button>
      `;
  });
}

function lineStats() {
  const stats = {};

  machines.forEach((machine) => {
    if (!stats[machine.lineName]) {
      stats[machine.lineName] = {
        line: machine.lineName,
        machines: 0,
        output: 0,
        availability: 0,
        oee: 0,
        downtime: 0,
      };
    }

    const item = stats[machine.lineName];
    item.machines += 1;
    item.output += machine.output;
    item.availability += machine.availability;
    item.oee += machine.oee;
    item.downtime += machine.timeline
      .filter((segment) => segment.type !== "run")
      .reduce((sum, segment) => sum + segment.minutes, 0);
  });

  return Object.values(stats).map((item) => ({
    ...item,
    availability: Math.round(item.availability / item.machines),
    oee: Math.round(item.oee / item.machines),
  }));
}

function updateSummary() {
  const stats = lineStats();
  const totalPlan = machines.reduce((sum, machine) => sum + machine.plan, 0);
  const totalOutput = machines.reduce((sum, machine) => sum + machine.output, 0);
  const totalDiff = totalOutput - totalPlan;
  const totalNg = machines.reduce((sum, machine) => sum + machine.ng, 0);
  const avgNg = ((totalNg / Math.max(totalOutput + totalNg, 1)) * 100).toFixed(2);
  const avgAbility = Math.round(machines.reduce((sum, machine) => sum + machine.availability, 0) / machines.length);
  const avgOee = Math.round(machines.reduce((sum, machine) => sum + machine.oee, 0) / machines.length);
  const summaryGrid = document.querySelector(".summary-grid");

  summaryGrid.innerHTML = `
    <article class="summary-card ability">
      <span>Total D.Plan</span>
      <strong>${totalPlan.toLocaleString()}</strong>
      <small>All machine target</small>
    </article>
    <article class="summary-card run">
      <span>Total Output</span>
      <strong>${totalOutput.toLocaleString()}</strong>
      <small>Live mock output</small>
    </article>
    <article class="summary-card ${totalDiff >= 0 ? "run" : "stop"}">
      <span>Total Diff.</span>
      <strong>${totalDiff.toLocaleString()}</strong>
      <small>Output - D.Plan</small>
    </article>
    <article class="summary-card warm">
      <span>Avg NG %</span>
      <strong>${avgNg}%</strong>
      <small>All machine average</small>
    </article>
    <article class="summary-card pc">
      <span>Avg Ability</span>
      <strong>${avgAbility}%</strong>
      <small>All machine average</small>
    </article>
    <article class="summary-card ability">
      <span>Avg OEE %</span>
      <strong>${avgOee}%</strong>
      <small>All machine average</small>
    </article>
  `;

  stats.forEach((item) => {
    const label = document.querySelector(`[data-line-name="${item.line}"]`);
    if (label) {
      label.innerHTML = `<strong>${item.line}</strong><span>OEE : ${item.oee}%</span>`;
    }
  });
}

const drawer = document.querySelector("#detailDrawer");
const drawerBackdrop = document.querySelector("#drawerBackdrop");
const detailContent = document.querySelector("#detailContent");
const closeDrawer = document.querySelector("#closeDrawer");

function openDrawer() {
  drawer.hidden = false;
  drawerBackdrop.hidden = false;
  closeDrawer.focus();
}

function clearOutputTimer() {
  if (outputTimer) {
    clearInterval(outputTimer);
    outputTimer = null;
  }
}

function closeDetail() {
  hideDowntimeTooltip({ force: true });
  clearOutputTimer();
  activeMachine = null;
  drawer.hidden = true;
  drawerBackdrop.hidden = true;
  document.querySelectorAll(".is-selected").forEach((item) => item.classList.remove("is-selected"));
}

function formatDuration(minutes) {
  const seconds = minutes * 60;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  return `${seconds}s / ${mins + hours * 60}m / ${hours}h ${mins}m`;
}

function formatClockTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:00`;
}

function downtimeTitle(segment) {
  const meta = downtimeMeta[segment.type];
  const base = `${meta.label}: ${segment.start}-${segment.end} | ${formatDuration(segment.minutes)}`;
  return segment.type === "alarm" ? `${base} | Alarm: ${segment.reason}` : base;
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDowntimeTimeline(machine) {
  return `
    <div class="timeline-head">
      <span>06:00</span>
      <strong>Downtime 06:00 - 06:00</strong>
      <span>06:00+1</span>
    </div>
    <div class="downtime-track" aria-label="Downtime timeline">
      ${machine.timeline
        .map((segment) => {
          const meta = downtimeMeta[segment.type];
          const width = (segment.minutes / 1440) * 100;
          return `<span
            class="downtime-segment"
            aria-label="${escapeHtml(downtimeTitle(segment))}"
            data-status="${escapeHtml(meta.label)}"
            data-color="${meta.color}"
            data-start="${segment.start}"
            data-end="${segment.end}"
            data-duration="${formatClockTime(segment.minutes)}"
            data-detail="${segment.type === "alarm" ? escapeHtml(segment.reason) : ""}"
            role="button"
            tabindex="0"
            style="--segment-color: ${meta.color}; --segment-width: ${width}%"
          ></span>`;
        })
        .join("")}
    </div>
    <div class="downtime-legend">
      ${Object.entries(downtimeMeta)
        .map(([, meta]) => `<span><i style="background:${meta.color}"></i>${meta.label}</span>`)
        .join("")}
    </div>
  `;
}

function downtimeSummary(machine) {
  const summary = {};
  machine.timeline.forEach((segment) => {
    const meta = downtimeMeta[segment.type];
    if (!summary[segment.type]) {
      summary[segment.type] = { type: segment.type, label: meta.label, color: meta.color, minutes: 0, count: 0, alarms: [] };
    }
    summary[segment.type].minutes += segment.minutes;
    summary[segment.type].count += 1;
    if (segment.type === "alarm" && segment.reason) {
      summary[segment.type].alarms.push(segment.reason);
    }
  });
  return Object.values(summary);
}

function downtimeDetail(item) {
  if (item.type !== "alarm") return "";
  const alarms = [...new Set(item.alarms)];
  return alarms.length ? alarms.join(", ") : "Alarm reason not specified";
}

function renderDowntimeDetails(machine) {
  return `
    <div class="downtime-table-wrap">
      <table class="downtime-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Total Time</th>
            <th>Count</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          ${downtimeSummary(machine)
            .map(
              (item) => `
                <tr>
                  <td><span class="status-pill" style="--status-color: ${item.color}"><i></i>${item.label}</span></td>
                  <td>${formatClockTime(item.minutes)}</td>
                  <td class="count-cell">${item.count}</td>
                  <td>${downtimeDetail(item)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderDowntimeGraph(machine) {
  const items = downtimeSummary(machine);
  const total = items.reduce((sum, item) => sum + item.minutes, 0);

  return `
    <div class="downtime-graph" aria-label="Downtime graph by day">
      ${items
        .map((item) => {
          const pct = Math.round((item.minutes / total) * 100);
          return `
            <div class="graph-row">
              <span>${item.label}</span>
              <div class="graph-track"><i style="--bar-color:${item.color}; width:${pct}%"></i></div>
              <strong>${pct}%</strong>
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function tooltipMarkup(segment) {
  const detail = segment.dataset.detail
    ? `<div class="downtime-tooltip-row">
        <span class="tooltip-label">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10"></path></svg>
          Detail:
        </span>
        <strong>${escapeHtml(segment.dataset.detail)}</strong>
      </div>`
    : "";

  return `
    <div class="downtime-tooltip-title">
      <i style="background:${segment.dataset.color}"></i>
      <strong>${segment.dataset.status}</strong>
    </div>
    <div class="downtime-tooltip-row">
      <span class="tooltip-label">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M4 12l5-5M4 12l5 5"></path></svg>
        Start Time:
      </span>
      <strong>${segment.dataset.start}:00</strong>
    </div>
    <div class="downtime-tooltip-row">
      <span class="tooltip-label">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m16 0-5-5m5 5-5 5"></path></svg>
        End Time:
      </span>
      <strong>${segment.dataset.end}:00</strong>
    </div>
    <div class="downtime-tooltip-row">
      <span class="tooltip-label">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4"></path></svg>
        Duration:
      </span>
      <strong>${segment.dataset.duration}</strong>
    </div>
    ${detail}
  `;
}

let pinnedDowntimeTooltip = false;

function closestDowntimeSegment(target) {
  return target instanceof Element ? target.closest(".downtime-segment") : null;
}

function getDowntimeTooltip() {
  let tooltip = document.querySelector("#downtimeTooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "downtimeTooltip";
    tooltip.className = "downtime-tooltip";
    tooltip.setAttribute("role", "tooltip");
    document.body.appendChild(tooltip);
  }
  return tooltip;
}

function moveDowntimeTooltip(event, segment = null, isPinned = false) {
  const tooltip = getDowntimeTooltip();
  const offset = 14;
  const rect = tooltip.getBoundingClientRect();
  const segmentRect = segment?.getBoundingClientRect();
  const anchorX = isPinned && segmentRect ? segmentRect.left + segmentRect.width / 2 : event.clientX;
  const anchorY = isPinned && segmentRect ? segmentRect.top : event.clientY;
  let left = isPinned ? anchorX - rect.width / 2 : anchorX + offset;
  let top = isPinned ? anchorY - rect.height - offset : anchorY + offset;

  if (left + rect.width > window.innerWidth - 12) {
    left = isPinned ? window.innerWidth - rect.width - 12 : anchorX - rect.width - offset;
  }

  if (top < 12 && isPinned && segmentRect) {
    top = segmentRect.bottom + offset;
  } else if (top + rect.height > window.innerHeight - 12) {
    top = anchorY - rect.height - offset;
  }

  tooltip.style.left = `${Math.max(12, left)}px`;
  tooltip.style.top = `${Math.max(12, top)}px`;
}

function showDowntimeTooltip(event, segment, options = {}) {
  if (pinnedDowntimeTooltip && !options.pinned) return;
  const tooltip = getDowntimeTooltip();
  pinnedDowntimeTooltip = Boolean(options.pinned);
  document.querySelectorAll(".downtime-segment.is-active").forEach((item) => item.classList.remove("is-active"));
  segment.classList.add("is-active");
  tooltip.innerHTML = tooltipMarkup(segment);
  tooltip.classList.toggle("is-pinned", pinnedDowntimeTooltip);
  tooltip.classList.add("is-visible");
  moveDowntimeTooltip(event, segment, pinnedDowntimeTooltip);
}

function hideDowntimeTooltip(options = {}) {
  if (pinnedDowntimeTooltip && !options.force) return;
  const tooltip = document.querySelector("#downtimeTooltip");
  pinnedDowntimeTooltip = false;
  document.querySelectorAll(".downtime-segment.is-active").forEach((item) => item.classList.remove("is-active"));
  if (tooltip) tooltip.classList.remove("is-visible", "is-pinned");
}

function renderDowntimePanel(machine) {
  const panel = document.querySelector("#downtimePanel");
  if (!panel) return;
  panel.innerHTML = downtimeView === "graph" ? renderDowntimeGraph(machine) : renderDowntimeDetails(machine);
  document.querySelectorAll("[data-downtime-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.downtimeView === downtimeView);
  });
}

function scheduleOutputIncrement(machine) {
  clearOutputTimer();
  outputTimer = setInterval(() => {
    machine.output += 1;
    machine.actual += 1;
    machine.diff = machine.actual - machine.plan;
    updateMachineOutput(machine);
  }, machine.cycleTime * 1000);
}

function updateMachineOutput(machine) {
  const liveOutput = document.querySelector("#liveOutput");
  const detailOutput = document.querySelector("#machineDetailOutput");
  const cardOutput = document.querySelector(`[data-live-card-output="${machine.id}"]`);

  if (liveOutput) liveOutput.textContent = machine.output.toLocaleString();
  if (detailOutput) detailOutput.textContent = machine.output.toLocaleString();
  if (cardOutput && displayMode === "output") cardOutput.textContent = machine.output.toLocaleString();
  updateSummary();
}

function showMachineDetail(machine) {
  activeMachine = machine;
  downtimeView = "details";
  const meta = statusMeta[machine.status];

  detailContent.innerHTML = `
    <div class="detail-fullscreen machine-detail">
      <section class="detail-hero">
        <div>
          <p class="section-kicker">Machine Detail</p>
          <h2 class="detail-title" id="detailTitle">${machine.name}</h2>
          <p class="detail-subtitle">${machine.lineName} / fake CNC machine profile for interview demo</p>
          <span class="detail-status" style="--status-color: ${meta.color}"><i></i>${meta.label}</span>
        </div>
        <figure class="machine-visual">
          <img src="./assets/cnc-machine-transparent.png" alt="CNC machine transparent reference" />
          <figcaption>CNC machine reference</figcaption>
        </figure>
      </section>

      <section class="live-strip" aria-label="Live production">
        <div>
          <span>Live Output</span>
          <strong id="liveOutput">${machine.output.toLocaleString()}</strong>
          <small>+1 every ${machine.cycleTime}s cycle time</small>
        </div>
        <div>
          <span>Ability</span>
          <strong>${machine.availability}%</strong>
          <small>Availability score</small>
        </div>
        <div>
          <span>Cycle Time</span>
          <strong>${machine.cycleTime}s</strong>
          <small>Mock takt cycle</small>
        </div>
      </section>

      <div class="detail-grid">
        <section class="oee-card oee-polished" aria-label="OEE information">
          <div class="oee-top">
            <div>
              <span>Model Name</span>
              <strong>MODEL-${machine.name}</strong>
            </div>
            <div>
              <span>Line</span>
              <strong>${machine.lineName}</strong>
            </div>
            <div>
              <span>C.T.</span>
              <strong>${machine.cycleTime} s</strong>
            </div>
          </div>

          <div class="oee-score-grid">
            ${renderScore("Availability", machine.availability)}
            ${renderScore("Performance", machine.performance)}
            ${renderScore("Quality", machine.quality)}
            ${renderScore("OEE", machine.oee)}
          </div>

          <div class="oee-stats">
            <div class="oee-stat"><span>D.Plan</span><strong>${machine.plan.toLocaleString()}</strong></div>
            <div class="oee-stat"><span>Plan</span><strong>${Math.round(machine.plan * 0.72).toLocaleString()}</strong></div>
            <div class="oee-stat"><span>Actual</span><strong>${machine.actual.toLocaleString()}</strong></div>
            <div class="oee-stat ${machine.diff < 0 ? "negative" : ""}"><span>Diff.</span><strong>${machine.diff.toLocaleString()}</strong></div>
            <div class="oee-stat warn"><span>NG.</span><strong>${machine.ng.toLocaleString()}</strong></div>
            <div class="oee-stat"><span>Output</span><strong id="machineDetailOutput">${machine.output.toLocaleString()}</strong></div>
          </div>
        </section>

        <section class="downtime-card" aria-label="Downtime information">
          <div class="card-heading">
            <div>
              <p class="section-kicker">Downtime</p>
              <h3>24-hour state timeline</h3>
            </div>
            <div class="segmented small">
              <button type="button" data-downtime-view="details">Details</button>
              <button type="button" data-downtime-view="graph">Graph Mode</button>
            </div>
          </div>
          ${renderDowntimeTimeline(machine)}
          <div id="downtimePanel"></div>
        </section>
      </div>
    </div>
  `;

  openDrawer();
  renderDowntimePanel(machine);
  scheduleOutputIncrement(machine);
}

function renderScore(label, value) {
  return `
    <div class="score-card">
      <span>${label}</span>
      <strong>${value}%</strong>
      <div class="score-track"><i style="width:${value}%"></i></div>
    </div>
  `;
}

const pcActionFeedback = {
  start: { action: "start", message: "เปิดโปรแกรมสำเร็จ" },
  stop: { action: "stop", message: "ปิดโปรแกรมสำเร็จ" },
  update: { action: "update", message: "อัปเดตโปรแกรมสำเร็จ" },
};

function successIcon(action) {
  const icons = {
    start: '<path d="M8 5v14l11-7-11-7Z"></path>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"></rect>',
    update: '<path d="M21 12a9 9 0 1 1-2.64-6.36"></path><path d="M21 3v6h-6"></path>',
  };

  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      ${icons[action] || icons.update}
    </svg>
  `;
}

function showToast(feedback) {
  const toast = document.querySelector("#toast");
  if (!toast || !feedback) return;

  toast.className = `toast is-${feedback.action}`;
  toast.innerHTML = `
    <div class="toast-panel">
      <span class="toast-icon" aria-hidden="true">${successIcon(feedback.action)}</span>
      <strong>สำเร็จ</strong>
      <span class="toast-message">${feedback.message}</span>
    </div>
  `;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

function showComputerDetail(pc) {
  clearOutputTimer();
  activeMachine = null;
  const statusClass = pc.status === "Running" ? "run" : "offline";
  const statusColor = pc.status === "Running" ? statusMeta.run.color : statusMeta.offline.color;

  detailContent.innerHTML = `
    <div class="detail-fullscreen pc-detail">
      <section class="detail-hero pc-hero">
        <div>
          <p class="section-kicker">Collector PC Detail</p>
          <h2 class="detail-title" id="detailTitle">${pc.name}</h2>
          <p class="detail-subtitle">Computer node for ${pc.lineName}</p>
          <span class="detail-status ${statusClass}" style="--status-color: ${statusColor}"><i></i>${pc.status}</span>
        </div>
        <div class="pc-visual">
          <svg viewBox="0 0 96 96" aria-hidden="true">
            <rect x="14" y="18" width="68" height="46" rx="8"></rect>
            <path d="M34 78h28M48 64v14"></path>
          </svg>
          <strong>${pc.lineName}</strong>
        </div>
      </section>

      <section class="pc-card pc-card-grid" aria-label="PC information">
        <div class="pc-info"><span>Computer Name</span><strong>${pc.name}</strong></div>
        <div class="pc-info"><span>Version</span><strong>${pc.version}</strong></div>
        <div class="pc-info"><span>Status</span><strong>${pc.status}</strong></div>
        <div class="pc-info">
          <span>Auto Open Program</span>
          <button class="toggle-button ${pc.autoStart ? "is-on" : ""}" type="button" data-auto-toggle="${pc.id}">
            ${pc.autoStart ? "ON" : "OFF"} / Auto after 30 min
          </button>
        </div>
        <div class="pc-info pc-action-panel">
          <span>Action</span>
          <div class="action-row">
            <button class="start-action" type="button" data-pc-action="start">Start</button>
            <button class="stop-action" type="button" data-pc-action="stop">Stop</button>
            <button class="update-action" type="button" data-pc-action="update">Update</button>
          </div>
        </div>
      </section>
    </div>
  `;

  openDrawer();
}

document.addEventListener("click", (event) => {
  const downtimeSegment = closestDowntimeSegment(event.target);
  const machineButton = event.target.closest("[data-machine-id]");
  const pcButton = event.target.closest("[data-pc-id]");
  const modeButton = event.target.closest("[data-display-mode]");
  const downtimeButton = event.target.closest("[data-downtime-view]");
  const pcAction = event.target.closest("[data-pc-action]");
  const autoToggle = event.target.closest("[data-auto-toggle]");

  if (downtimeSegment) {
    event.preventDefault();
    showDowntimeTooltip(event, downtimeSegment, { pinned: true });
    return;
  }

  hideDowntimeTooltip({ force: true });

  if (modeButton) {
    displayMode = modeButton.dataset.displayMode;
    renderMachines();
    renderComputers();
    document.querySelectorAll("[data-display-mode]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.displayMode === displayMode);
    });
    return;
  }

  if (downtimeButton && activeMachine) {
    downtimeView = downtimeButton.dataset.downtimeView;
    renderDowntimePanel(activeMachine);
    return;
  }

  if (pcAction) {
    showToast(pcActionFeedback[pcAction.dataset.pcAction]);
    return;
  }

  if (autoToggle) {
    const pc = computers.find((item) => item.id === Number(autoToggle.dataset.autoToggle));
    pc.autoStart = !pc.autoStart;
    autoToggle.classList.toggle("is-on", pc.autoStart);
    autoToggle.textContent = `${pc.autoStart ? "ON" : "OFF"} / Auto after 30 min`;
    return;
  }

  if (machineButton) {
    document.querySelectorAll(".is-selected").forEach((item) => item.classList.remove("is-selected"));
    machineButton.classList.add("is-selected");
    const machine = machines.find((item) => item.id === Number(machineButton.dataset.machineId));
    showMachineDetail(machine);
    return;
  }

  if (pcButton) {
    document.querySelectorAll(".is-selected").forEach((item) => item.classList.remove("is-selected"));
    pcButton.classList.add("is-selected");
    const pc = computers.find((item) => item.id === Number(pcButton.dataset.pcId));
    showComputerDetail(pc);
  }
});

document.addEventListener("pointerover", (event) => {
  const segment = closestDowntimeSegment(event.target);
  if (!segment) return;
  showDowntimeTooltip(event, segment);
});

document.addEventListener("pointermove", (event) => {
  const segment = closestDowntimeSegment(event.target);
  if (!segment || pinnedDowntimeTooltip) return;
  moveDowntimeTooltip(event, segment);
});

document.addEventListener("pointerout", (event) => {
  if (!closestDowntimeSegment(event.target)) return;
  hideDowntimeTooltip();
});

closeDrawer.addEventListener("click", closeDetail);
drawerBackdrop.addEventListener("click", closeDetail);

document.addEventListener("keydown", (event) => {
  const segment = closestDowntimeSegment(event.target);
  if (segment && (event.key === "Enter" || event.key === " ")) {
    const rect = segment.getBoundingClientRect();
    event.preventDefault();
    showDowntimeTooltip({ clientX: rect.left + rect.width / 2, clientY: rect.top }, segment, { pinned: true });
    return;
  }

  if (event.key === "Escape" && pinnedDowntimeTooltip) {
    hideDowntimeTooltip({ force: true });
    return;
  }

  if (event.key === "Escape" && !drawer.hidden) {
    closeDetail();
  }
});

const clock = document.querySelector("#clock");

function updateClock() {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  clock.textContent = `${date} ${time}`;
}

renderMachines();
renderComputers();
updateSummary();
updateClock();
setInterval(updateClock, 1000);
