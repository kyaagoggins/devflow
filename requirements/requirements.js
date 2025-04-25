// Load sidebar navigation
$(document).ready(function () {
  $.get("../navigation/navigation.html", function (html) {
    $("#sidebarContainer").html(html);
    $(".main-content").css("margin-left", "300px");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Load sidebar
  $.get("../navigation/navigation.html", function (html) {
    $("#sidebarContainer").html(html);
    $(".main-content").css("margin-left", "300px");
  });

  // Button listeners
  document.getElementById("addFunctionalBtn").addEventListener("click", addFunctionalRow);
  document.getElementById("addNonFunctionalBtn").addEventListener("click", addNonFunctionalRow);

  // Handle dropdown changes
  document.addEventListener("change", function (e) {
    if (e.target.matches("select[name$='_priority[]']")) {
      if (e.target.value === "remove") {
        const row = e.target.closest("tr");
        if (row) row.remove();
      } else {
        applyPriorityStyles(e.target);
      }
    }
  });

  // Delay to make sure initial select elements are processed AFTER render
  setTimeout(updateAllPriorityIndicators, 0);

  function updateAllPriorityIndicators() {
    document.querySelectorAll(".priority-dropdown").forEach(select => {
      applyPriorityStyles(select);
    });
  }

  function applyPriorityStyles(select) {
    const wrapper = select.closest(".priority-wrapper");
    if (!wrapper) return;

    wrapper.classList.remove("high", "medium", "low", "");

    switch (select.value) {
      case "high":
        wrapper.classList.add("high");
        break;
      case "medium":
        wrapper.classList.add("medium");
        break;
      case "low":
        wrapper.classList.add("low");
        break;
      default:
        // Do nothing if "Select priority" or "remove" is selected
        break;
    }
  }

  function addFunctionalRow() {
    const tbody = document.getElementById("functional-req-body");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" name="func_id[]" required /></td>
      <td><input type="text" name="func_abbrev[]" required /></td>
      <td><textarea name="func_expanded[]" required></textarea></td>
      <td>
        <div class="priority-wrapper">
          <select name="func_priority[]" class="priority-dropdown" required>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="remove">Remove</option>
          </select>
          <span class="priority-indicator"></span>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  }

  function addNonFunctionalRow() {
    const tbody = document.getElementById("non-functional-req-body");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" name="non_func_id[]" required /></td>
      <td><input type="text" name="non_func_abbrev[]" required /></td>
      <td><textarea name="non_func_expanded[]" required></textarea></td>
      <td>
        <div class="priority-wrapper">
          <select name="non_func_priority[]" class="priority-dropdown" required>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="remove">Remove</option>
          </select>
          <span class="priority-indicator"></span>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  }
});
