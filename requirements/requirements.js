// Load sidebar navigation on page load
$(document).ready(function () {
  $.get("../navigation/navigation.html", function (html) {
    $("#sidebarContainer").html(html);
    $(".main-content").css("margin-left", "300px"); // Adjust if needed
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Add task item button
  document.getElementById("addTaskBtn").addEventListener("click", function () {
    addTaskItem();
  });

  // Remove task functionality
  document.getElementById("taskContainer").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-task")) {
      e.target.closest(".task-item").remove();
    }
  });

  // Form submission logic
  document.getElementById("projectForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;

    const taskInfo = Array.from(form.querySelectorAll('input[name="task_info[]"]')).map(i => i.value);
    const taskDueDates = Array.from(form.querySelectorAll('input[name="task_due_date[]"]')).map(i => i.value);
    const taskPriorities = Array.from(form.querySelectorAll('select[name="task_priority[]"]')).map(s => s.value);
    const taskTeams = Array.from(form.querySelectorAll('select[name="task_team[]"]')).map(s => s.value);

    const tasks = taskInfo.map((info, i) => ({
      taskInfo: info,
      dueDate: taskDueDates[i],
      priority: taskPriorities[i],
      teamAssigned: taskTeams[i],
    }));


    const data = {
      title: form.title.value,
      description: form.description.value,
      manager: form.manager.value,
      team,
      deadlines,
      risks: form.risks.value.split("\n").map(s => s.trim()).filter(Boolean),
      tasks,
      requirements: form.requirements.value.split("\n").map(s => s.trim()).filter(Boolean),
      priority: form.priority.value,
      file: form.file.files[0] ? form.file.files[0].name : "No file uploaded",
    };

    alert("Form submitted! Check the console for data.");
    console.log("Submitted Data:", data);
    localStorage.setItem("projectInfo", JSON.stringify(data));
  });

  // Autofill form if saved data exists
  const savedData = localStorage.getItem("projectInfo");
  if (savedData) {
    const data = JSON.parse(savedData);
    const form = document.getElementById("projectForm");


    document.getElementById("taskContainer").innerHTML = "";

    if (Array.isArray(data.tasks)) {
      data.tasks.forEach(task => addTaskItem(task));
    }
  }

  if (!savedData) {
    addTaskItem();
  }

  // Apply priority color logic
  function applyPriorityColor(el) {
    el.classList.remove("priority-high", "priority-medium", "priority-low");
    switch (el.value) {
      case "high":
        el.classList.add("priority-high");
        break;
      case "medium":
        el.classList.add("priority-medium");
        break;
      case "low":
        el.classList.add("priority-low");
        break;
    }
  }

  const priorityDropdowns = document.querySelectorAll('select[name="func_priority[]"], select[name="nonfunc_priority[]"], select[name="task_priority[]"]');
  priorityDropdowns.forEach(select => {
    applyPriorityColor(select);
    select.addEventListener("change", () => applyPriorityColor(select));
  });

  // Add new task row
  function addTaskItem(task = {}) {
    const taskContainer = document.getElementById("taskContainer");
    const newTask = document.createElement("div");
    newTask.className = "task-item";
    newTask.innerHTML = `
      <label>Task Information:
        <input type="text" name="task_info[]" required value="${escapeHtml(task.taskInfo || "")}">
      </label>
      <label>Due Date:
        <input type="date" name="task_due_date[]" required value="${escapeHtml(task.dueDate || "")}">
      </label>
      <label>Priority:
        <select name="task_priority[]" required>
          <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
          <option value="medium" ${task.priority === "medium" ? "selected" : ""}>Medium</option>
          <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
        </select>
      </label>
      <button type="button" class="remove-task">Remove</button>
    `;
    taskContainer.appendChild(newTask);

    // Attach priority styling logic
    const prioritySelect = newTask.querySelector('select[name="task_priority[]"]');
    applyPriorityColor(prioritySelect);
    prioritySelect.addEventListener("change", () => applyPriorityColor(prioritySelect));
  }

  function escapeHtml(text) {
    return text
      ? text.replace(/[&<>"']/g, m => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m]))
      : "";
  }
});
