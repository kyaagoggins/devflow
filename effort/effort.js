document.addEventListener('DOMContentLoaded', function() {
  // data arrays
  const effortEntries = [];
  const dailyTasks = [];
  const weeklyTasks = [];

  // for overall effort tracking
  const effortData = {
    requirements: 0,
    design: 0,
    coding: 0,
    testing: 0
  };

  // effort entries table
  function populateEffortEntriesTable() {
    const tableBody = document.getElementById('effortEntriesTable');
    tableBody.innerHTML = '';
    effortEntries.forEach(entry => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${capitalize(entry.phase)}</td>
        <td>${entry.hours}</td>
      `;
    });
  }

  // tasks tables
  function populateTable(tableId, tasks) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = '';
    tasks.forEach(task => {
      let row = tableBody.insertRow();
      row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.team}</td>
        ${tableId === 'dailyTasksTable' ? `<td>${task.progress}%</td>` : ''}
        <td>${task.budgeted}</td>
        <td><span class="${getBudgetClass(task.budgeted, task.actual)}">${task.actual}</span></td>
      `;
    });
  }

  function getBudgetClass(budgeted, actual) {
    if (!budgeted || isNaN(budgeted) || isNaN(actual)) return '';
    const percentage = (actual / budgeted) * 100;
    if (percentage > 110) return 'over-budget';
    if (percentage > 90) return 'near-budget';
    return 'under-budget';
  }

  function updateDashboard() {
    const dashboard = document.getElementById('progressDashboard');
    dashboard.innerHTML = `
      <ul>
        <li>Requirements Analysis: ${effortData.requirements} hours</li>
        <li>Design: ${effortData.design} hours</li>
        <li>Coding: ${effortData.coding} hours</li>
        <li>Testing: ${effortData.testing} hours</li>
      </ul>
    `;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // initial population 
  populateEffortEntriesTable();
  populateTable('dailyTasksTable', dailyTasks);
  populateTable('weeklyTasksTable', weeklyTasks);
  updateDashboard();

  // handle effort entry form
  document.getElementById('effortForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const phase = form.phase.value;
    const hours = parseFloat(form.hours.value);

    if (!date || isNaN(hours) || hours < 0) {
      alert("Please enter a valid date and number of hours.");
      return;
    }

    effortEntries.push({date, phase, hours});
    effortData[phase] += hours;
    populateEffortEntriesTable();
    updateDashboard();
    form.reset();
  });

  // handle daily task form
  document.getElementById('dailyTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const newTask = {
      task: form.task.value,
      team: form.team.value,
      progress: parseInt(form.progress.value),
      budgeted: parseFloat(form.budgeted.value),
      actual: parseFloat(form.actual.value)
    };
    dailyTasks.push(newTask);
    populateTable('dailyTasksTable', dailyTasks);
    form.reset();
  });

  // handle weekly task form
  document.getElementById('weeklyTaskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const newTask = {
      task: form.task.value,
      team: form.team.value,
      budgeted: parseFloat(form.budgeted.value),
      actual: parseFloat(form.actual.value)
    };
    weeklyTasks.push(newTask);
    populateTable('weeklyTasksTable', weeklyTasks);
    form.reset();
  });
});
