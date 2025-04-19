// estimated total hours for each phase (customize as needed)
const TOTAL_HOURS = {
  requirements: 40,
  design: 40,
  coding: 100,
  testing: 50
};

const phaseNames = {
  requirements: "Requirements Analysis",
  design: "Design",
  coding: "Coding",
  testing: "Testing"
};

let effortData = {
  requirements: 0,
  design: 0,
  coding: 0,
  testing: 0
};

document.getElementById('effortForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const phase = form.phase.value;
  const hours = parseFloat(form.hours.value);

  if (isNaN(hours) || hours < 0) {
    alert("Please enter a valid number of hours.");
    return;
  }

  effortData[phase] += hours;
  updateDashboard();
  form.reset();
});

function updateDashboard() {
  const dashboard = document.getElementById('progressDashboard');
  dashboard.innerHTML = '';

  let totalEffort = 0, totalEstimate = 0;

  for (let phase in effortData) {
    const spent = effortData[phase];
    const estimate = TOTAL_HOURS[phase];
    const percent = Math.min(100, Math.round((spent / estimate) * 100));
    totalEffort += spent;
    totalEstimate += estimate;

    // color coding
    let barClass = 'low';
    if (percent >= 80) barClass = 'high';
    else if (percent >= 50) barClass = 'medium';

    dashboard.innerHTML += `
      <div class="progress-bar-container">
        <span class="progress-label">${phaseNames[phase]}: ${spent} / ${estimate} hours</span>
        <div class="progress-bar">
          <div class="progress-bar-inner ${barClass}" style="width:${percent}%;">
            ${percent}%
          </div>
        </div>
      </div>
    `;
  }

  // overall progress
  const overallPercent = Math.min(100, Math.round((totalEffort / totalEstimate) * 100));
  let overallClass = 'low';
  if (overallPercent >= 80) overallClass = 'high';
  else if (overallPercent >= 50) overallClass = 'medium';

  dashboard.innerHTML += `
    <div class="progress-bar-container">
      <span class="progress-label">Overall Progress: ${totalEffort} / ${totalEstimate} hours</span>
      <div class="progress-bar">
        <div class="progress-bar-inner ${overallClass}" style="width:${overallPercent}%;">
          ${overallPercent}%
        </div>
      </div>
    </div>
  `;
}

// initialize dashboard on load
updateDashboard();
