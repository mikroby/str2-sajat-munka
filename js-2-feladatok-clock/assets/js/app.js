'use strict';

const clock = document.querySelector('.clock');

const showClock = () => {
  clock.textContent = new Date().toLocaleTimeString().padStart(8, '0');
  timing();
};

const timing = () => {
  let id = setTimeout(() => {
    clearTimeout(id);
    showClock()
  }, 1000);
};

const startClock = () => {
  showClock();
}

export default startClock;
