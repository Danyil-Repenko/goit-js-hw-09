import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector("button[type='submit']"),
  delaySetter: document.querySelector("input[name='delay']"),
  stepSetter: document.querySelector("input[name='step']"),
  amountSetter: document.querySelector("input[name='amount']"),
};

refs.button.addEventListener('click', onButtonClick);

function onButtonClick(event) {
  event.preventDefault();

  const step = Number(refs.stepSetter.value);
  const amount = Number(refs.amountSetter.value);
  let delay = Number(refs.delaySetter.value);

  if (step < 0 || amount < 0 || delay < 0) {
    Notify.failure('Please, make sure that ALL numbers are 0 or higher');
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false });
      });
    delay += step;
  }

}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
  return promise;
}