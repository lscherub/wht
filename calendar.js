document.addEventListener('DOMContentLoaded', function() {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: JSON.parse(localStorage.getItem('shifts')).map(shift => ({
            title: `Worked ${shift.hoursWorked.toFixed(2)} hrs`,
            start: new Date(shift.punchInTime),
            end: new Date(shift.punchOutTime)
        }))
    });
    calendar.render();
});
