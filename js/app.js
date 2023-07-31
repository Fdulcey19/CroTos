let timerInterval;
let startTime;
let running = false;
let interval;
let secondsSphere = document.getElementById("seconds-sphere")


function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  document.getElementById("display").textContent = formatTime(elapsedTime);
}

function startStopTimer() {
  let selectedInterval = document.getElementById("interval").value;
  
  if (selectedInterval === "Intervalo De Tiempo") {
    // El usuario no ha seleccionado un intervalo válido, mostrar mensaje de error con SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, seleccione un intervalo de tiempo antes de iniciar el cronómetro.",
      timer: 2000, // Duración del mensaje en milisegundos (2 segundos en este caso)
      timerProgressBar: true,
      showConfirmButton: false
    });
    return;
  }

  if (running) {
    clearInterval(timerInterval);
  } else {
    secondsSphere.style.animation = ' rotacion 60s linear infinite'
    secondsSphere.style.animationPlayState = 'running'
    startTime = new Date().getTime();
    timerInterval = setInterval(updateDisplay, 1000);
  }

  running = !running;

  if (running) {
    startStopBtn.style.display = "none";
    document.getElementById("intervalo").style.display = "none";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("display").textContent = "00:00";
  document.getElementById("ascensoTimer").textContent = "00:00";
  document.getElementById("crack1Timer").textContent = "00:00";
  document.getElementById("crack2Timer").textContent = "00:00";
  document.getElementById("finalTimer").textContent = "00:00";
  clearInterval(alertInterval);
  startStopBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
  secondsSphere.style.transform = ' rotate(-90deg) translate(80px)';
secondsSphere.style.animation = 'none';

  document.getElementById("intervalo").style.display = "inline-block"
  running = false;
}

const timers = {
  ascenso: { startTime: null, timerInterval: null },
  crack1: { startTime: null, timerInterval: null },
  crack2: { startTime: null, timerInterval: null },
};


function getDisplayValue() {
  const displayValue = document.getElementById("display").textContent;
  return displayValue;
}

function asenso() {
  const displayValue = getDisplayValue();
  ascensoTimer.innerHTML = displayValue;
}

function crack1() {
  const displayValue = getDisplayValue();
  crack1Timer.innerHTML = displayValue;
}

function crack2() {
  const displayValue = getDisplayValue();
  crack2Timer.innerHTML = displayValue;
}
function finaltimer() {
  const displayValue = getDisplayValue();

  finalTimer.innerHTML = displayValue;
  if (running) {
    clearInterval(timerInterval); // Detiene el intervalo del cronómetro principal
    running = false;
  }
  if (!running) {
    clearInterval(alertInterval);
    secondsSphere.style.animationPlayState = 'paused'
    resetBtn.style.display = "inline-block";
  }
}

function playBeep() {
  // Obtener el elemento de audio
  const audioElement = document.getElementById("beep");

  // Reproducir el sonido
  audioElement.play();
}

document
  .getElementById("startStopBtn")
  .addEventListener("click", startStopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

// Reproducir el sonido cada 5 segundos si el cronómetro principal está en funcionamiento
let alertInterval;
document.getElementById("startStopBtn").addEventListener("click", () => {
  let interval = document.getElementById("interval").value;
  if (running) {
    alertInterval = setInterval(playBeep, interval);
  }
});
