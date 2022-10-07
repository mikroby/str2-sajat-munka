'use strict';

const header = document.querySelector('#game__header');
const info = document.querySelector('#info');
const pegNumber = document.querySelector('#pegNumber');
const button = document.querySelector('.btn');


const hit = (cell) => {
  const hitSound = new Audio('assets/sound/hit.wav');
  hitSound.volume = 0.5;
  hitSound.play();
  info.textContent = 'Talált!';
}


const theEnd = () => {
  button.textContent = 'Új játék';
  button.onclick = start;
}


const animateHeader = () => {
  header.classList.add('shock-header');
  const id = setTimeout(() => {
    clearTimeout(id);
    header.classList.toggle('shock-header');
  }, 510);
}

// -------------------------------------------------------------
import { moves, neighbors } from "./graphs.js"

let cells, firstMove

const createField = () => {
  const fieldPattern = [3, 3, 7, 7, 7, 3, 3]
  const template = []
  let from = 0

  for (let row = 0; row < fieldPattern.length; row++) {
    template.push(`<div class="row">`)

    for (let cell = from; cell < from + fieldPattern[row]; cell++) {
      template.push(`<div class="cell" data-cell="${cell}"></div>`)
    }

    from += fieldPattern[row]

    template.push(`</div>`)
  }

  document.querySelector('.field').innerHTML = template.join('')
}

const initialize = () => {
  cells.forEach(cell => {
    cell.classList.remove('transposable', 'moveable', 'taken', 'occupied', 'empty')
    cell.dataset.cell === '16' ? cell.classList.add('empty') : cell.classList.add('occupied')
  })

  button.textContent = 'A játék leírása'
  button.onclick = function () { window.location = "#playRules" }
  info.textContent = ''
  firstMove = true
}

const showInfo = () => {
  const pegs = document.querySelectorAll('.occupied')
  pegNumber.textContent = pegs.length
}

function takeOne() {
  const taken = document.querySelector('.taken')

  if (taken) taken.classList.toggle('taken')

  document.querySelectorAll('.transposable').forEach(cell =>
    cell.classList.remove('transposable')
  )

  this.classList.add('taken')

  const transposables = moves[this.dataset.cell]
  console.log(transposables);
  transposables.forEach(position => {
    cells[position].classList.toggle('transposable')
    cells[position].addEventListener('click', transpose)
  })

}

function transpose() {
  if (firstMove) {
    firstMove = false
    button.textContent = 'Újrakezdés'
    button.onclick = start
  }

  const next = this.dataset.cell
  const taken = document.querySelector('.taken')
  const current = taken.dataset.cell

  const common = neighbors[current].filter(cell => neighbors[next].includes(cell))[0]
  console.log('common: ', common)
  cells[common].classList.replace('occupied', 'empty')

  this.classList.replace('empty', 'occupied')
  taken.classList.replace('occupied', 'empty')

  setNextState()
  prepareNextStep()
  showInfo()
  animateHeader()
}

const setNextState = () =>
  cells.forEach(cell => {
    cell.removeEventListener('click', transpose)
    cell.removeEventListener('click', takeOne)
    cell.classList.remove('transposable', 'moveable', 'taken')
  })

const setMoveables = (positions) =>
  positions.forEach(position => {
    cells[position].classList.add('moveable')
    cells[position].addEventListener('click', takeOne)
  });

const getAllEmpty = () => {
  const positions = []
  document.querySelectorAll('.empty')
    .forEach(cell => positions.push(moves[cell.dataset.cell]))
  return [...new Set(positions.flat())]
}

const prepareNextStep = () => {
  const empty = getAllEmpty().filter(position => !(cells[position].classList.contains('empty')))
  setMoveables(empty);
}

const start = () => {
  initialize()
  showInfo()
  prepareNextStep()
}

// IIFE starter.
(() => {
  createField()
  cells = document.querySelectorAll('.cell')

  start()
})()
