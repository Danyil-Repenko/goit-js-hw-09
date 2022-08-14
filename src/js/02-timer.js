import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dateTimePicker: document.querySelector("input#datetime-picker"),
    startButton: document.querySelector('button[data-start]'),
    daysCounter: document.querySelector('span[data-days]'),
    hoursCounter: document.querySelector('span[data-hours]'),
    minutesCounter: document.querySelector('span[data-minutes]'),
    secondsCounter: document.querySelector('span[data-seconds]'),
}

refs.startButton.addEventListener('click', onStartButtonClick);

let intervalId = null;

const fp = flatpickr(refs.dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure('Please choose a date in the future');
        } else {
            refs.startButton.removeAttribute('disabled');
            refs.dateTimePicker.setAttribute('disabled', true);
        }
    },
});


function onStartButtonClick() {
    refs.startButton.setAttribute('disabled', true);
    let startTime = fp.selectedDates[0] - Date.now();
    showTime(startTime);
    intervalId = setInterval(() => {
        startTime -= 1000;
        if (startTime <= 0) {
            clearInterval(intervalId);
            refs.dateTimePicker.removeAttribute('disabled');
            return;
        }
        showTime(startTime);
    }, 1000);
}

function showTime(time) {
    const { days, hours, minutes, seconds } = convertMs(time);
    refs.daysCounter.textContent = addLeadingZero(days);
    refs.hoursCounter.textContent = addLeadingZero(hours);
    refs.minutesCounter.textContent = addLeadingZero(minutes);
    refs.secondsCounter.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}