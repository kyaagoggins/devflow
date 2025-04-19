document.getElementById('projectForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // collect the form data
  const form = e.target;
  const data = {
    description: form.description.value,
    manager: form.manager.value,
    team: form.team.value.split(',').map(s => s.trim()),
    risks: form.risks.value,
    tasks: form.tasks.value.split('\n').map(s => s.trim()).filter(Boolean),
    requirements: form.requirements.value.split('\n').map(s => s.trim()).filter(Boolean),
    priority: form.priority.value,
    file: form.file.files[0] ? form.file.files[0].name : 'No file uploaded'
  };

  // show data in alert and log
  alert('Form submitted! Check the console for data.');
  console.log('Submitted Data:', data);

  // heere is where you would send data to backend as needed
});
