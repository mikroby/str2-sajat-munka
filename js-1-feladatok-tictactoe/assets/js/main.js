// megállapítások tetszőleges cellaszámú és akár téglalap alakú pálya esetére (is). gyorsabb és általános érvényű a kód:
// 1.) ha N a megnyeréshez szükséges jelek száma, akkor elegendő 2*N-1-ik lépéstől keresni a lehetséges győztest.
// 2.) nem kell az egész táblát végigellenőrizni, elegendő az éppen lerakott jel oszlopában, sorában és a két áthaladó átlóban összeszámolni a lerakott jel db-számát.
// 3.) az éppen aktuális vonal mentén az összeszámolásnál ha a soron következő cella tartalma nem egyezik az előző celláéval, a számlálót nullázni kell és ehhez hozzáadva a kurrens cella értékét folytatni a számlálást.
// az alábbi kód a fentiek közül, egyelőre 3x3-as méretű táblán működve az 1.)-est valósítja meg, később szeretném általános esetre kibővíteni.
// bocsánat, a fentieket nehéz lett volna angolul...

'use strict';

// 'X' meaning: currentMark = false, marks[0], data-value=-1.
// 'O' meaning: currentMark = true,  marks[1], data-value=1.
const marks = ['X', 'O'];
const checkPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
];
const minMarksToWin = 3;
const minStepsToCheckWinner = 2 * minMarksToWin - 1;
let currentMark;
let steps;
let winnerIs;

(function fisrtStart() {
    initialize();
})();

const openModal = (mainMessage, altMessage, okBtnLabel, cancelBtnLabel) => {
    document.querySelector('#overlay').setAttribute('class', 'overlay--appear');
    document.querySelector('#modal').setAttribute('class', 'modal--appear');
    document.querySelector('.modal__header').textContent = mainMessage;
    document.querySelector('.modal__content').textContent = altMessage;
    document.querySelector('.modal__btn__ok').textContent = okBtnLabel;
    document.querySelector('.modal__btn__cancel').textContent = cancelBtnLabel;
}

const closeModal = () => {
    document.querySelector('#overlay').setAttribute('class', 'overlay--vanish');
    document.querySelector('#modal').setAttribute('class', 'modal--vanish');
}

function initialize() {
    document.querySelectorAll('.cell').forEach(item => {
        item.addEventListener('click', putMark);
        item.setAttribute('data-value', 0);
        item.textContent = '';
    });
    steps = 1;
    winnerIs = '';

    // first player starts with 'X'.
    currentMark = false;
    showTurn(currentMark);
}

function animate() {
    const element = document.querySelector('#game__header');
    element.className = 'game__header--shock';
    setTimeout(() => element.className = '', 510);
}

function putMark() {

    animate();

    this.textContent = marks[Number(currentMark)];
    this.setAttribute('data-value', currentMark ? 1 : -1);
    this.removeEventListener('click', putMark);

    if (steps >= minStepsToCheckWinner) {
        check();
    }

    currentMark = !currentMark;
    steps++;
    showTurn(currentMark);
}

function check() {
    let sumOfMarks;

    checkPatterns.forEach(pattern => {
        sumOfMarks = 0;
        pattern.forEach(index =>
            sumOfMarks += Number(document.querySelector(`[data-index = '${index}']`)
                .getAttribute('data-value')));

        evaluate(sumOfMarks, pattern);
    });
}

function evaluate(sumOfMarks, pattern) {

    if (Math.abs(sumOfMarks) === minMarksToWin) {
        // making 0 or 1 as an index to choose the winner mark.
        winnerIs = marks[(sumOfMarks + minMarksToWin) % minStepsToCheckWinner];

        pattern.forEach(index => document.querySelector(`[data-index = '${index}']`)
        .className='winnerCells');            
        
        setTimeout(()=>pattern.forEach(index => document.querySelector(`[data-index = '${index}']`)
        .className='cell'),2000);

        setTimeout(() => openModal(`A győztes: ${winnerIs} jelű játékos!`, '', 'Új játék', 'Kilépés'), 2000);
    }

    if (steps === 9 && winnerIs === '') {
        openModal('Döntetlen eredmény !', 'Vége a játéknak, nincs több üres cella.', 'Új játék', 'Kilépés');
    }
}

function showTurn(player) {
    document.querySelector('#nextPlayer').textContent = marks[Number(player)];
}

function newGameStart() {
    closeModal();
    initialize();
}