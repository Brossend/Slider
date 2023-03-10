const view = document.querySelector('.container__view');
const photos = document.querySelector('.container__photos');
const images = photos.querySelectorAll('img');

const bar = document.querySelector('.countainer__bar');

const buttonForward = document.querySelector('.countainer__buttonForward');
const buttonBack = document.querySelector('.countainer__buttonBack');

buttonForward.addEventListener('click', forwardSlide);
buttonBack.addEventListener('click', backSlide);

let position = 0;
let temp = 0;
let coordinatesBar = [];

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < images.length; i++) {
    if (i === 0) {
      bar.insertAdjacentHTML(
        'beforeend',
        `<button class="container__barButton container__barButtonActive" onClick="buttonBar(${i})"></button>`
      );
    } else {
      bar.insertAdjacentHTML(
        'beforeend',
        `<button class="container__barButton" onClick="buttonBar(${i})"></button>`
      );
    }
  }

  buttonСoordinates();
});

function buttonСoordinates() {
  for (let i = 0, k = 640; i < images.length; i++, k -= 640) {
    coordinatesBar[i] = k;
  }
}

function forwardSlide() {
  position++;

  if (position >= images.length) {
    temp = 640;
    position = 0;
  }

  moveSlide(-1);
}

function backSlide() {
  position--;

  if (position < 0) {
    temp = (images.length - 1) * -640 - 640;
    position = images.length - 1;
  }

  moveSlide(1);
}

function buttonBar(value) {
  if (position > value) {
    temp = coordinatesBar[value] - 1280;
    position = value;
    moveSlide(1);
  } else if (position === value) {
  } else {
    temp = coordinatesBar[value];
    position = value;
    moveSlide(-1);
  }
}

function moveSlide(value) {
  const barButtons = bar.querySelectorAll('.container__barButton');

  for (let i = 0; i < images.length; i++) {
    barButtons[i].classList.remove('container__barButtonActive');
  }

  barButtons[position].classList.add('container__barButtonActive');

  buttonForward.classList.add('container__unClick');
  buttonBack.classList.add('container__unClick');

  for (let i = 0; i < images.length; i++) {
    barButtons[i].classList.add('container__unClick');
  }

  let start = Date.now();

  let timer = setInterval(function () {
    let timePassed = Date.now() - start;

    if (timePassed > 640) {
      if (value === -1) {
        temp += -640;
      } else {
        temp += 640;
      }

      for (let i = 0; i < images.length; i++) {
        barButtons[i].classList.remove('container__unClick');
      }

      buttonForward.classList.remove('container__unClick');
      buttonBack.classList.remove('container__unClick');

      clearInterval(timer);
      return;
    }

    photos.style.transform = `translateX(${temp + value * timePassed}px)`;
  }, 1);
}
