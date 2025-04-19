document.addEventListener('DOMContentLoaded', function() {
  // added task button functionality
  document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskContainer = document.getElementById('taskContainer');
    const newTask = document.createElement('div');
    newTask.className = 'task-item';
    newTask.innerHTML = `
      <label>Task Information:
        <input type="text" name="task_info[]" required>
      </label>
      <label>Due Date:
        <input type="date" name="task_due_date[]" required>
      </label>
      <label>Priority:
        <select name="task_priority[]" required>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      <label>Team Assigned:
        <select name="task_team[]" required>
          <option value="UI/UX">UI/UX</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="QA">QA</option>
          <option value="All">All</option>
        </select>
      </label>
      <button type="button" class="remove-task">Remove</button>
    `;
    taskContainer.appendChild(newTask);
    
    // add remove button functionality
    newTask.querySelector('.remove-task').addEventListener('click', function() {
      newTask.remove();
    });
  });

  // form submission
  document.getElementById("projectForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // collect the form data
    const form = e.target;
    
    // Get all task data
    const taskInfo = Array.from(form.querySelectorAll('input[name="task_info[]"]')).map(input => input.value);
    const taskDueDates = Array.from(form.querySelectorAll('input[name="task_due_date[]"]')).map(input => input.value);
    const taskPriorities = Array.from(form.querySelectorAll('select[name="task_priority[]"]')).map(select => select.value);
    const taskTeams = Array.from(form.querySelectorAll('select[name="task_team[]"]')).map(select => select.value);
    
    // Build tasks array
    const tasks = [];
    for (let i = 0; i < taskInfo.length; i++) {
      tasks.push({
        taskInfo: taskInfo[i],
        dueDate: taskDueDates[i],
        priority: taskPriorities[i],
        teamAssigned: taskTeams[i]
      });
    }
    
    // Build team structure
    const team = {
      teamType: {
        "UI/UX": form.uiux_team.value.split(",").map(s => s.trim()).filter(Boolean),
        "Frontend": form.frontend_team.value.split(",").map(s => s.trim()).filter(Boolean),
        "Backend": form.backend_team.value.split(",").map(s => s.trim()).filter(Boolean),
        "QA": form.qa_team.value.split(",").map(s => s.trim()).filter(Boolean),
        "Other": form.other_team.value.split(",").map(s => s.trim()).filter(Boolean)
      }
    };
    
    // Build deadlines
    const deadlines = {
      current: form.current_deadlines.value.split("\n").map(s => s.trim()).filter(Boolean),
      nextMonth: form.next_month_deadlines.value.split("\n").map(s => s.trim()).filter(Boolean)
    };

    const data = {
      description: form.description.value,
      manager: form.manager.value,
      team: team,
      deadlines: deadlines,
      risks: form.risks.value.split("\n").map(s => s.trim()).filter(Boolean),
      tasks: tasks,
      requirements: form.requirements.value.split("\n").map(s => s.trim()).filter(Boolean),
      priority: form.priority.value,
      file: form.file.files[0] ? form.file.files[0].name : "No file uploaded",
    };

    // show data in alert and log
    alert("Form submitted! Check the console for data.");
    console.log("Submitted Data:", data);
    // here is where you would send data to backend as needed
    localStorage.setItem("projectInfo", JSON.stringify(data));
    
    // Optionally redirect to the dashboard
    // window.location.href = "dashboard.html";
  });
});

