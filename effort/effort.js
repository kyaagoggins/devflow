//navigation sidebar display functionality
$(document).ready(function () {
  $.get("../navigation/navigation.html", function (html) {
    $("#sidebarContainer").html(html); //show sidebar

    $(".main-content").css("margin-left", "300px");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Sample data for tasks just to see how it looks we can replace nearing the end
  const dailyTasks = [
    {
      task: "Color choice or possibly some other task",
      team: "UI/UX",
      progress: 35,
      budgeted: 5,
      actual: 3,
    },
    {
      task: "Choose library",
      team: "Frontend JS",
      progress: 35,
      budgeted: 5,
      actual: 4,
    },
    {
      task: "Project Setup and development environment fancy words...",
      team: "Backend",
      progress: 35,
      budgeted: 5,
      actual: 2,
    },
  ];

  const weeklyTasks = [
    {
      task: "Color choice or possibly some other task",
      team: "UI/UX",
      budgeted: 5,
      actual: 3,
    },
    { task: "Choose library", team: "Frontend JS", budgeted: 5, actual: 4 },
    {
      task: "Project Setup and development environment fancy words...",
      team: "Backend",
      budgeted: 5,
      actual: 2,
    },
  ];

  function populateTable(tableId, tasks) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = ""; // Clear existing rows
    tasks.forEach((task) => {
      let row = tableBody.insertRow();
      row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.team}</td>
        ${tableId === "dailyTasksTable" ? `<td>${task.progress}%</td>` : ""}
        <td>${task.budgeted}</td>
        <td><span class="${getBudgetClass(task.budgeted, task.actual)}">${
        task.actual
      }</span></td>
      `;
    });
  }

  function getBudgetClass(budgeted, actual) {
    const percentage = (actual / budgeted) * 100;
    if (percentage > 110) return "over-budget";
    if (percentage > 90) return "near-budget";
    return "under-budget";
  }

  populateTable("dailyTasksTable", dailyTasks);
  populateTable("weeklyTasksTable", weeklyTasks);

  // effort form functionality (Existing Code)
  document
    .getElementById("effortForm")
    .addEventListener("submit", function (e) {
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
});
