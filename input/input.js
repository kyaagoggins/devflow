//navigation sidebar display functionality
$(document).ready(function () {
  $.get("../navigation/navigation.html", function (html) {
    $("#sidebarContainer").html(html); //show sidebar

    $(".main-content").css("margin-left", "300px");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // add task button functionality
  document.getElementById("addTaskBtn").addEventListener("click", function () {
    addTaskItem();
  });

  // remove task functionality
  document
    .getElementById("taskContainer")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-task")) {
        e.target.closest(".task-item").remove();
      }
    });

  // auto-fill form if data exists in localStorage
  const savedData = localStorage.getItem("projectInfo");
  if (savedData) {
    const data = JSON.parse(savedData);
    const form = document.getElementById("projectForm");
    form.description.value = data.description || "";
    form.manager.value = data.manager || "";
    form.uiux_team.value = data.team?.teamType?.["UI/UX"]?.join(", ") || "";
    form.frontend_team.value =
      data.team?.teamType?.["Frontend"]?.join(", ") || "";
    form.backend_team.value =
      data.team?.teamType?.["Backend"]?.join(", ") || "";
    form.qa_team.value = data.team?.teamType?.["QA"]?.join(", ") || "";
    form.other_team.value = data.team?.teamType?.["Other"]?.join(", ") || "";
    form.current_deadlines.value = data.deadlines?.current?.join("\n") || "";
    form.next_month_deadlines.value =
      data.deadlines?.nextMonth?.join("\n") || "";
    form.risks.value = Array.isArray(data.risks)
      ? data.risks.join("\n")
      : data.risks || "";
    form.requirements.value = Array.isArray(data.requirements)
      ? data.requirements.join("\n")
      : data.requirements || "";
    form.priority.value = data.priority || "";

    // remove default task items if present
    document.getElementById("taskContainer").innerHTML = "";

    // fill in the tasks
    if (Array.isArray(data.tasks)) {
      data.tasks.forEach((task) => {
        addTaskItem(task);
      });
    }
  }

  // the form submission
  document
    .getElementById("projectForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const form = e.target;

      // get task data
      const taskInfo = Array.from(
        form.querySelectorAll('input[name="task_info[]"]')
      ).map((input) => input.value);
      const taskDueDates = Array.from(
        form.querySelectorAll('input[name="task_due_date[]"]')
      ).map((input) => input.value);
      const taskPriorities = Array.from(
        form.querySelectorAll('select[name="task_priority[]"]')
      ).map((select) => select.value);
      const taskTeams = Array.from(
        form.querySelectorAll('select[name="task_team[]"]')
      ).map((select) => select.value);

      // build the tasks array
      const tasks = [];
      for (let i = 0; i < taskInfo.length; i++) {
        tasks.push({
          taskInfo: taskInfo[i],
          dueDate: taskDueDates[i],
          priority: taskPriorities[i],
          teamAssigned: taskTeams[i],
        });
      }

      // build the team structure
      const team = {
        teamType: {
          "UI/UX": form.uiux_team.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          Frontend: form.frontend_team.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          Backend: form.backend_team.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          QA: form.qa_team.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          Other: form.other_team.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      };

      // build the deadlines
      const deadlines = {
        current: form.current_deadlines.value
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        nextMonth: form.next_month_deadlines.value
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const data = {
        title: form.title.value,
        description: form.description.value,
        manager: form.manager.value,
        team: team,
        deadlines: deadlines,
        risks: form.risks.value
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        tasks: tasks,
        requirements: form.requirements.value
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        priority: form.priority.value,
        file: form.file.files[0] ? form.file.files[0].name : "No file uploaded",
      };

      alert("Form submitted! Check the console for data.");
      console.log("Submitted Data:", data);
      localStorage.setItem("projectInfo", JSON.stringify(data));
      // optionally redirect to the dashboard
      // window.location.href = "dashboard.html";
    });

  // helper to add a task input group, optionally with pre-filled data
  function addTaskItem(task = {}) {
    const taskContainer = document.getElementById("taskContainer");
    const newTask = document.createElement("div");
    newTask.className = "task-item";
    newTask.innerHTML = `
      <label>Task Information:
        <input type="text" name="task_info[]" required value="${
          task.taskInfo ? escapeHtml(task.taskInfo) : ""
        }">
      </label>
      <label>Due Date:
        <input type="date" name="task_due_date[]" required value="${
          task.dueDate ? escapeHtml(task.dueDate) : ""
        }">
      </label>
      <label>Priority:
        <select name="task_priority[]" required>
          <option value="high" ${
            task.priority === "high" ? "selected" : ""
          }>High</option>
          <option value="medium" ${
            task.priority === "medium" ? "selected" : ""
          }>Medium</option>
          <option value="low" ${
            task.priority === "low" ? "selected" : ""
          }>Low</option>
        </select>
      </label>
      <label>Team Assigned:
        <select name="task_team[]" required>
          <option value="UI/UX" ${
            task.teamAssigned === "UI/UX" ? "selected" : ""
          }>UI/UX</option>
          <option value="Frontend" ${
            task.teamAssigned === "Frontend" ? "selected" : ""
          }>Frontend</option>
          <option value="Backend" ${
            task.teamAssigned === "Backend" ? "selected" : ""
          }>Backend</option>
          <option value="QA" ${
            task.teamAssigned === "QA" ? "selected" : ""
          }>QA</option>
          <option value="All" ${
            task.teamAssigned === "All" ? "selected" : ""
          }>All</option>
        </select>
      </label>
      <button type="button" class="remove-task">Remove</button>
    `;
    taskContainer.appendChild(newTask);
  }

  // helper to escape HTML for safe value insertion
  function escapeHtml(text) {
    return text
      ? text.replace(/[&<>"']/g, function (m) {
          return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[m];
        })
      : "";
  }

  // if there is no data add one blank task item by default
  if (!savedData) {
    addTaskItem();
  }
});
