function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let second = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // hours = hours % 12;
    if (hours > 12) {
        hours = hours - 12
    }
    if (hours == 0) {
        hours = 12
    }

    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes
    if (second < 10) second = '0' + second

    const timeString = hours + ':' + minutes + ':' + second + ' ' + ampm

    const clock = document.getElementById('time')
    clock.textContent = timeString

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[now.getDay()]
    const dayString = dayName + ', ' + now.getDate() 
    document.getElementById('date').textContent = dayString 

}

setInterval(updateClock, 1000);
updateClock()