$(document).ready(function () {
  $.get("../../navigation/navigation.html", function (html) {
    $("#sidebarContainer").html(html); //show sidebar

    $("body").css("margin-left", "300px");
  });

  //function to handle nav button functionality
  $(".navButton").on("click", function () {
    //if the sidebar is not shown yet, get the html
    if ($("body").css("margin-left") === "0px") {
      $.get("../../navigation/navigation.html", function (html) {
        $("#sidebarContainer").html(html); //show sidebar
        $(".title").css("padding-right", "47%");
        $("body").css("margin-left", "300px");
        $(".mainContent").css("margin-left", "40px");
        $(".mainContent").css("width", "82%");
        $(".tasks").css("margin-top", "25%");
      });
    } else {
      //the sidebar is open, clicking will remove it
      $("body").css("margin-left", "0px");
      $("#sidebarContainer").html("");
      $(".title").css("padding-right", "50%");
      $(".mainContent").css("margin-left", "0px");
      $(".mainContent").css("width", "100%");
      $(".tasks").css("margin-top", "20.5%");
    }
  });
});

//load data when page loads
document.addEventListener("DOMContentLoaded", function () {
  getData();
});

//get project data and display each
function getData() {
  const data = JSON.parse(localStorage.getItem("projectInfo"));

  const manager = document.getElementById("managerName");
  manager.textContent = data.manager;

  displayTeams(data.team);

  displayRisks(data.risks);

  displayTasks(data.tasks);

  displayDeadlines(data.deadlines);

  displayProjectInfo(data);
}

//display project info and a graph for tasks by team
function displayProjectInfo(projData) {
  document.getElementById("projectTitle").textContent = projData.title;
  document.getElementById("projectDescription").textContent =
    projData.description;

  projectPriority =
    projData.priority.charAt(0).toUpperCase() + projData.priority.slice(1);
  document.getElementById("projectPriority").textContent =
    "Priority: " + projectPriority;

  const teamTaskCounts = {};

  projData.tasks.forEach((task) => {
    const team = task.teamAssigned;
    if (teamTaskCounts[team]) {
      teamTaskCounts[team]++;
    } else {
      teamTaskCounts[team] = 1;
    }
  });

  // labels for graph
  const teamLabels = Object.keys(teamTaskCounts);
  const teamData = Object.values(teamTaskCounts);

  //color scheme
  const teamColors = [
    "#62929E",
    "#F7CACD",
    "#D291BC",
    "#F9E79F",
    "#A8C0A5",
    "#F4A896",
    "#CBAACB",
  ];

  // Destroy existing chart if needed
  if (window.taskChart) {
    window.taskChart.destroy();
  }

  const ctx = document.getElementById("taskPieChart").getContext("2d");
  window.taskChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: teamLabels,
      datasets: [
        {
          data: teamData,
          backgroundColor: teamColors,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Tasks by Team",
          font: {
            size: 16,
          },
        },
      },
    },
  });
}

//function that gets the deadline data and displays it on the page
function displayDeadlines(deadlineData) {
  const container = document.getElementById("deadlineContent");

  Object.entries(deadlineData).forEach(([category, items]) => {
    const details = document.createElement("details");

    const summary = document.createElement("summary");
    summary.className = "deadlineTitle";
    summary.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    details.appendChild(summary);

    const deadlines = Array.isArray(items) ? items : [items];

    deadlines.forEach((deadline) => {
      const p = document.createElement("p");
      p.className = "deadline";
      p.textContent = deadline;
      details.appendChild(p);
    });

    container.appendChild(details);
  });
}

//function that gets the task data and displays it on the page
function displayTasks(taskData) {
  const taskContent = document.getElementById("taskContent");

  taskData.forEach((task) => {
    const row = document.createElement("div");
    row.className = "taskRow";

    //task data
    const taskCell = document.createElement("p");
    taskCell.className = "taskCell";
    taskCell.textContent = task.taskInfo;

    //due date
    const dueCell = document.createElement("p");
    dueCell.className = "taskCell";
    dueCell.textContent = task.dueDate;

    //priority
    const priorityCell = document.createElement("p");
    priorityCell.className = "taskCell";
    taskPriority =
      task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    priorityCell.textContent = taskPriority;

    //assigned team
    const teamCell = document.createElement("p");
    teamCell.className = "taskCell";
    teamCell.textContent = task.teamAssigned;

    const priority = task.priority.toLowerCase();
    projectPriority =
      task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    // critical priority in bold and red
    if (priority === "critical") {
      [taskCell, dueCell, priorityCell, teamCell].forEach((item) => {
        item.style.fontWeight = "bold";
        item.style.color = "red";
      });
    }
    // high priority just bolded
    else if (priority === "high") {
      [taskCell, dueCell, priorityCell, teamCell].forEach((item) => {
        item.style.fontWeight = "bold";
      });
    }

    row.append(taskCell, dueCell, priorityCell, teamCell);
    taskContent.appendChild(row);
  });
}

//function that gets the risk data and displays it on the page
function displayRisks(riskData) {
  const container = document.getElementById("riskContent");

  riskData.forEach((risk) => {
    const p = document.createElement("p");
    p.className = "riskText";
    p.textContent = risk;
    container.appendChild(p);
  });
}

//function that receives the team data and displays it on the page
function displayTeams(teamData) {
  const container = document.getElementById("teams");

  teamData = teamData["teamType"];

  Object.entries(teamData).forEach(([teamTitle, members]) => {
    const details = document.createElement("details");

    const summary = document.createElement("summary");
    summary.className = "teamTitle";
    summary.textContent = teamTitle;

    details.appendChild(summary);

    if (Array.isArray(members)) {
      members.forEach((member) => {
        const p = document.createElement("p");
        p.className = "teamMember";
        p.textContent = member;
        details.appendChild(p);
      });
    }

    container.appendChild(details);
  });
}
