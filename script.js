let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
  const date = new Date(time);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    document.getElementById('startStopBtn').textContent = 'Stop';
    document.getElementById('startStopBtn').classList.replace('start', 'stop');
    isRunning = true;
  } else {
    clearInterval(intervalId);
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('startStopBtn').classList.replace('stop', 'start');
    isRunning = false;
  }
}

function reset() {
  clearInterval(intervalId);
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.000';
  lapsList.innerHTML = '';
  document.getElementById('startStopBtn').textContent = 'Start';
  document.getElementById('startStopBtn').classList.replace('stop', 'start');
  isRunning = false;
}

function lap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
}

document.getElementById('startStopBtn').addEventListener('click', startStop);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);
