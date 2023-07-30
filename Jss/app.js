let timerInterval;
let startTime;
let running = false;

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStopTimer() {
    if (running) {
        clearInterval(timerInterval);
        document.getElementById('startStopBtn').textContent = 'Iniciar';
    } else {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateDisplay, 1000);
        document.getElementById('startStopBtn').textContent = 'Detener';
    }

    running = !running;
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStopBtn').textContent = 'Iniciar';
    running = false;
}

const timers = {
    ascenso: { startTime: null, timerInterval: null },
    crack1: { startTime: null, timerInterval: null },
    crack2: { startTime: null, timerInterval: null }
};

function startStopIndividualTimer(timerName) {
    const btn = document.getElementById(`${timerName}Btn`);
    const timerDisplay = document.getElementById(`${timerName}Timer`);

    if (timers[timerName].timerInterval) {
        clearInterval(timers[timerName].timerInterval);
        timers[timerName].timerInterval = null;
        btn.textContent = `Iniciar ${timerName}`;
    } else {
        timers[timerName].startTime = new Date().getTime();
        timers[timerName].timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - timers[timerName].startTime;
            timerDisplay.textContent = formatTime(elapsedTime);
        }, 1000);
        btn.textContent = `Detener ${timerName}`;
    }
}

function getDisplayValue() {
    const displayValue = document.getElementById('display').textContent;
    return displayValue;
}

document.getElementById('ascensoBtn').addEventListener('click', () => {
    const displayValue = getDisplayValue();
    console.log('Valor del display principal:', displayValue);
});

document.getElementById('crack1Btn').addEventListener('click', () => {
    const displayValue = getDisplayValue();
    console.log('Valor del display principal:', displayValue);
});

document.getElementById('crack2Btn').addEventListener('click', () => {
    const displayValue = getDisplayValue();
    console.log('Valor del display principal:', displayValue);
});

document.getElementById('ascensoBtn').addEventListener('click', () => startStopIndividualTimer('ascenso'));
document.getElementById('crack1Btn').addEventListener('click', () => startStopIndividualTimer('crack1'));
document.getElementById('crack2Btn').addEventListener('click', () => startStopIndividualTimer('crack2'));
document.getElementById('startStopBtn').addEventListener('click', startStopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
