document.getElementById('faculty').addEventListener('change', async function() {
    const facultyId = this.value;
    const response = await fetch(`/departments/${facultyId}`);
    const departments = await response.json();

    const departmentSelect = document.getElementById('department');
    departmentSelect.innerHTML = '';

    departments.forEach(department => {
        const option = document.createElement('option');
        option.value = department.departmentid;
        option.textContent = department.departmentname;
        departmentSelect.appendChild(option);
    });
});