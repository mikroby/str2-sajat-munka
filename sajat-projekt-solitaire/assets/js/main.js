'use strict';
import { moves, neighbors } from "./graphs.js"

const header = document.querySelector('#game__header');
const info = document.querySelector('#info');
const pegNumber = document.querySelector('#pegNumber');
const button = document.querySelector('.btn');
const fieldPattern = [3, 3, 7, 7, 7, 3, 3]
let cells, firstMove

const theEnd = () => {
  info.textContent = 'VÉGE A JÁTÉKNAK.'
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

const createField = () => {
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

function take() {
  const taken = document.querySelector('.taken')

  if (taken) taken.classList.toggle('taken')

  document.querySelectorAll('.transposable').forEach(cell => {
    cell.classList.remove('transposable')
    cell.removeEventListener('click', transpose)
  })

  this.classList.toggle('taken')

  markTransposables(this)
}

const markTransposables = (cell) => {
  moves[cell.dataset.cell]
    .filter(position => cells[position].classList.contains('empty'))
    .forEach(position => {
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

  // kill the overtaken one
  cells[commonNeighbor(current, next)].classList.replace('occupied', 'empty')

  this.classList.replace('empty', 'occupied')
  taken.classList.replace('occupied', 'empty')

  cleanup()
  showInfo()
  animateHeader()
  markMoveables()
}

const cleanup = () =>
  cells.forEach(cell => {
    cell.removeEventListener('click', transpose)
    cell.removeEventListener('click', take)
    cell.classList.remove('transposable', 'moveable', 'taken')
  })

const markMoveables = () =>
  getAllPosition().forEach(position => {
    cells[position].classList.add('moveable')
    cells[position].addEventListener('click', take)
  });

const commonNeighbor = (first, second) => {
  return neighbors[first].filter(neighborOfFirst => neighbors[second].includes(neighborOfFirst))[0]
}

const getAllPosition = () => {
  const positions = []
  document.querySelectorAll('.empty')
    .forEach(empty =>
      positions.push(moves[empty.dataset.cell]
        .filter(position => cells[position].classList.contains('occupied'))
        .filter(position => cells[commonNeighbor(empty.dataset.cell, position)].classList.contains('occupied'))
      )
    )
  // remove duplicates
  return [...new Set(positions.flat())]
}

const start = () => {
  initialize()
  showInfo()
  markMoveables()
}


// IIFE starter.
(() => {
  createField()
  cells = document.querySelectorAll('.cell')

  start()
})()

// for testing graph objects:
// tester()
// function tester() {
//   initialize()
//   cells.forEach(cell => cell.addEventListener('click', toggleColor))
// }
// function toggleColor() {
//   neighbors[this.dataset.cell].forEach(position =>
//     cells[position].classList.toggle('transposable'))

//   moves[this.dataset.cell].forEach(position =>
//     cells[position].classList.toggle('moveable'))
// }