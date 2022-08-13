
const refs = {
    startButton: document.querySelector("button[data-start]"),
    stopButton: document.querySelector("button[data-stop]"),
}

let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
    refs.startButton.setAttribute('disabled', true);
    refs.stopButton.removeAttribute('disabled');
    intervalId = setInterval(changeBgColor, 1000);
}

function onStopButtonClick() {
    clearInterval(intervalId);
    refs.stopButton.setAttribute('disabled', true);
    refs.startButton.removeAttribute('disabled');
}