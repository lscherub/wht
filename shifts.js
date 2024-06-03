let shifts = JSON.parse(localStorage.getItem('shifts')) || [];

function loadShifts() {
    const tbody = document.getElementById('shiftsTableBody');
    tbody.innerHTML = '';
    shifts.forEach((shift, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(shift.punchInTime).toLocaleString()}</td>
            <td>${new Date(shift.punchOutTime).toLocaleString()}</td>
            <td>${shift.hoursWorked.toFixed(2)}</td>
            <td>$${shift.earnings.toFixed(2)}</td>
            <td>
                <button onclick="editShift(${index})">Edit</button>
                <button onclick="deleteShift(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editShift(index) {
    const shift = shifts[index];
    const newPunchInTime = prompt('Edit Punch In Time', new Date(shift.punchInTime).toISOString().substring(0, 19));
    const newPunchOutTime = prompt('Edit Punch Out Time', new Date(shift.punchOutTime).toISOString().substring(0, 19));
    const hourlyWage = parseFloat(prompt('Edit Hourly Wage', shift.earnings / shift.hoursWorked));

    shift.punchInTime = newPunchInTime;
    shift.punchOutTime = newPunchOutTime;
    shift.hoursWorked = (new Date(newPunchOutTime) - new Date(newPunchInTime)) / 1000 / 60 / 60;
    shift.earnings = shift.hoursWorked * hourlyWage;

    localStorage.setItem('shifts', JSON.stringify(shifts));
    loadShifts();
}

function deleteShift(index) {
    shifts.splice(index, 1);
    localStorage.setItem('shifts', JSON.stringify(shifts));
    loadShifts();
}

document.addEventListener('DOMContentLoaded', loadSh
                          ifts);
