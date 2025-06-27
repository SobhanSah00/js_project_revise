let second = 0;
let interval = null;
let isRunning = false;

const display = document.getElementById('display')
const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const resetBtn = document.getElementById('resetBtn')

function updateDisplay() {
    const min = String(Math.floor(second / 60)).padStart(2, '0');
    const sec = String(second % 60).padStart(2, '0');
    display.textContent = `${min} : ${sec}`
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            second++;
            updateDisplay();
        }, 1000)
    }
}

function pauseTimer() {
    clearInterval(interval)
    isRunning = false
}

function resetTimer() {
    clearInterval(interval);
    second = 0;
    isRunning = false
    updateDisplay()
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay()