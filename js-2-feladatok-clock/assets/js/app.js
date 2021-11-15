'use strict';

const clock = document.querySelector('.clock');

const showClock = () => {
  clock.textContent = new Date().toLocaleTimeString().padStart(8, '0');
  timing();
};

const timing = () => {
  setTimeout(() => showClock(), 1000);
};

const startClock=()=>{
  showClock();
}

export default startClock;
