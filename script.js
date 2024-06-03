let punchInTime = null;
let totalHours = 0;
let earnings = 0;
let shifts = JSON.parse(localStorage.getItem('shifts')) || [];

function punchIn() {
    punchInTime = new Date();
    document.getElementById('punchInButton').disabled = true;
    document.getElementById('punchOutButton').disabled = false;
    localStorage.setItem('punchInTime', punchInTime);
}

function punchOut() {
    const punchOutTime = new Date();
    const hourlyWage = parseFloat(document.getElementById('hourlyWage').value);

    const hoursWorked = (punchOutTime - new Date(punchInTime)) / 1000 / 60 / 60;
    totalHours += hoursWorked;
    const earned = hoursWorked * hourlyWage;
    earnings += earned;

    const shift = {
        punchInTime: punchInTime,
        punchOutTime: punchOutTime,
        hoursWorked: hoursWorked,
        earnings: earned
    };
    shifts.push(shift);
    localStorage.setItem('shifts', JSON.stringify(shifts));

    document.getElementById('totalHours').innerText = totalHours.toFixed(2);
    document.getElementById('earnings').innerText = earnings.toFixed(2);
    document.getElementById('recentPunchIn').innerText = new Date(punchInTime).toLocaleString();
    document.getElementById('recentPunchOut').innerText = punchOutTime.toLocaleString();
    document.getElementById('recentHoursWorked').innerText = hoursWorked.toFixed(2);
    document.getElementById('recentEarnings').innerText = earned.toFixed(2);

    document.getElementById('punchInButton').disabled = false;
    document.getElementById('punchOutButton').disabled = true;

    punchInTime = null;
    localStorage.removeItem('punchInTime');
}

document.addEventListener('DOMContentLoaded', (event) => {
    punchInTime = localStorage.getItem('punchInTime');
    if (punchInTime) {
        punchInTime = new Date(punchInTime);
        document.getElementById('punchInButton').disabled = true;
        document.getElementById('punchOutButton').disabled = false;
    } else {
        document.getElementById('punchInButton').disabled = false;
        document.getElementById('punchOutButton').disabled = true;
    }
});
