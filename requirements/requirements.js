// Load sidebar navigation
$(document).ready(function () {
  $.get("../navigation/navigation.html", function (html) {
    $("#sidebarContainer").html(html);
    $(".main-content").css("margin-left", "300px");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Prefill data if it exists in localStorage
  const storedData = JSON.parse(localStorage.getItem("requirements"));
  if (storedData) {
    storedData.functional.forEach((req) =>
      addFunctionalRow(req.id, req.abbrev, req.expanded, req.priority)
    );
    storedData.nonFunctional.forEach((req) =>
      addNonFunctionalRow(req.id, req.abbrev, req.expanded, req.priority)
    );
  }

  // Button listeners
  document
    .getElementById("addFunctionalBtn")
    .addEventListener("click", addFunctionalRow);
  document
    .getElementById("addNonFunctionalBtn")
    .addEventListener("click", addNonFunctionalRow);

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

  function applyPriorityStyles(select) {
    const wrapper = select.closest(".priority-wrapper");
    if (!wrapper) return;
    wrapper.classList.remove("high", "medium", "low");
    if (select.value) wrapper.classList.add(select.value);
  }

  function addFunctionalRow(
    id = "",
    abbrev = "",
    expanded = "",
    priority = ""
  ) {
    const tbody = document.getElementById("functional-req-body");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" name="func_id[]" value="${id}" required /></td>
      <td><input type="text" name="func_abbrev[]" value="${abbrev}" required /></td>
      <td><textarea name="func_expanded[]" required>${expanded}</textarea></td>
      <td>
        <div class="priority-wrapper ${priority}">
          <select name="func_priority[]" class="priority-dropdown">
            <option value="" ${!priority ? "selected" : ""}>--</option>
            <option value="high" ${
              priority === "high" ? "selected" : ""
            }>High</option>
            <option value="medium" ${
              priority === "medium" ? "selected" : ""
            }>Medium</option>
            <option value="low" ${
              priority === "low" ? "selected" : ""
            }>Low</option>
            <option value="remove">Remove</option>
          </select>
          <span class="priority-indicator"></span>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  }

  function addNonFunctionalRow(
    id = "",
    abbrev = "",
    expanded = "",
    priority = ""
  ) {
    const tbody = document.getElementById("non-functional-req-body");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" name="non_func_id[]" value="${id}" required /></td>
      <td><input type="text" name="non_func_abbrev[]" value="${abbrev}" required /></td>
      <td><textarea name="non_func_expanded[]" required>${expanded}</textarea></td>
      <td>
        <div class="priority-wrapper ${priority}">
          <select name="non_func_priority[]" class="priority-dropdown" required>
            <option value="" ${!priority ? "selected" : ""}>--</option>
            <option value="high" ${
              priority === "high" ? "selected" : ""
            }>High</option>
            <option value="medium" ${
              priority === "medium" ? "selected" : ""
            }>Medium</option>
            <option value="low" ${
              priority === "low" ? "selected" : ""
            }>Low</option>
            <option value="remove">Remove</option>
          </select>
          <span class="priority-indicator"></span>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  }

  // Save requirements currently shown on page to localStorage
  window.saveRequirements = function () {
    //get current info on page
    const funcIds = document.getElementsByName("func_id[]");
    const funcAbbrevs = document.getElementsByName("func_abbrev[]");
    const funcExpanded = document.getElementsByName("func_expanded[]");
    const funcPriorities = document.getElementsByName("func_priority[]");

    const nonFuncIds = document.getElementsByName("non_func_id[]");
    const nonFuncAbbrevs = document.getElementsByName("non_func_abbrev[]");
    const nonFuncExpanded = document.getElementsByName("non_func_expanded[]");
    const nonFuncPriorities = document.getElementsByName("non_func_priority[]");

    // Set functional requirements
    const functional = [];
    for (let i = 0; i < funcIds.length; i++) {
      const funcId = funcIds[i];
      const funcAbbrev = funcAbbrevs[i];
      const funcExp = funcExpanded[i];
      const funcPriority = funcPriorities[i];

      // Only push to the array if all required fields exist and have valid values
      if (
        funcId &&
        funcAbbrev &&
        funcExp &&
        funcPriority &&
        funcPriority.value !== "remove"
      ) {
        functional.push({
          id: funcId.value.trim(),
          abbrev: funcAbbrev.value.trim(),
          expanded: funcExp.value.trim(),
          priority: funcPriority.value || "",
        });
      }
    }

    // Set non-functional requirements
    const nonFunctional = [];
    for (let i = 0; i < nonFuncIds.length; i++) {
      const nonFuncId = nonFuncIds[i];
      const nonFuncAbbrev = nonFuncAbbrevs[i];
      const nonFuncExp = nonFuncExpanded[i];
      const nonFuncPriority = nonFuncPriorities[i];

      // Only push to the array if all required fields exist and have valid values
      if (
        nonFuncId &&
        nonFuncAbbrev &&
        nonFuncExp &&
        nonFuncPriority &&
        nonFuncPriority.value !== "remove"
      ) {
        nonFunctional.push({
          id: nonFuncId.value.trim(),
          abbrev: nonFuncAbbrev.value.trim(),
          expanded: nonFuncExp.value.trim(),
          priority: nonFuncPriority.value || "",
        });
      }
    }

    //add data on page to current data in local storage to keep page data
    const requirements = {
      functional,
      nonFunctional,
    };

    //set local storage
    localStorage.setItem("requirements", JSON.stringify(requirements));
  };

  // save button
  document.getElementById("saveBtn").addEventListener("click", function () {
    saveRequirements();
    alert("Requirements saved!");
  });
});
