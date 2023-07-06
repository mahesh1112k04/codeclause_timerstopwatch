// Timer variables
var timerInterval;
var timerSeconds = 0;

// Stopwatch variables
var stopwatchInterval;
var stopwatchSeconds = 0;

// Get elements from the DOM
var timerInput = document.getElementById("timerInput");
var startTimerButton = document.getElementById("startTimer");
var pauseTimerButton = document.getElementById("pauseTimer");
var resetTimerButton = document.getElementById("resetTimer");
var timerDisplay = document.getElementById("timerDisplay");

var startStopwatchButton = document.getElementById("startStopwatch");
var pauseStopwatchButton = document.getElementById("pauseStopwatch");
var resetStopwatchButton = document.getElementById("resetStopwatch");
var stopwatchDisplay = document.getElementById("stopwatchDisplay");

// Timer functions
function startTimer() {
    if (timerInterval) return; // Timer already running

    var timeInSeconds = parseInt(timerInput.value);
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) return; // Invalid input

    timerSeconds = timeInSeconds;

    timerInterval = setInterval(function() {
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
        } else {
            timerSeconds--;
            updateTimerDisplay(timerSeconds);
        }
    }, 1000);

    disableTimerControls(true);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    disableTimerControls(false);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    timerInput.value = "";
    updateTimerDisplay(timerSeconds);
    disableTimerControls(false);
}

// Stopwatch functions
function startStopwatch() {
    if (stopwatchInterval) return; // Stopwatch already running

    stopwatchInterval = setInterval(function() {
        stopwatchSeconds++;
        updateStopwatchDisplay(stopwatchSeconds);
    }, 1000);

    disableStopwatchControls(true);
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    disableStopwatchControls(false);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchSeconds = 0;
    updateStopwatchDisplay(stopwatchSeconds);
    disableStopwatchControls(false);
}

// Helper functions
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = time % 60;

    var formattedTime = "";
    if (hours < 10) {
        formattedTime += "0";
    }
    formattedTime += hours + ":";

    if (minutes < 10) {
        formattedTime += "0";
    }
    formattedTime += minutes + ":";

    if (seconds < 10) {
        formattedTime += "0";
    }
    formattedTime += seconds;

    return formattedTime;
}

function updateTimerDisplay(time) {
    timerDisplay.textContent = formatTime(time);
}

function updateStopwatchDisplay(time) {
    stopwatchDisplay.textContent = formatTime(time);
}

function disableTimerControls(disabled) {
    startTimerButton.disabled = disabled;
    pauseTimerButton.disabled = !disabled;
    resetTimerButton.disabled = disabled;
    timerInput.disabled = disabled;
}

function disableStopwatchControls(disabled) {
    startStopwatchButton.disabled = disabled;
    pauseStopwatchButton.disabled = !disabled;
    resetStopwatchButton.disabled = disabled;
}

// Add event listeners
startTimerButton.addEventListener("click", startTimer);
pauseTimerButton.addEventListener("click", pauseTimer);
resetTimerButton.addEventListener("click", resetTimer);

startStopwatchButton.addEventListener("click", startStopwatch);
pauseStopwatchButton.addEventListener("click", pauseStopwatch);
resetStopwatchButton.addEventListener("click", resetStopwatch);
