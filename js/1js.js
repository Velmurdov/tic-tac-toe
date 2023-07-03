const container = document.querySelector(".js-content");
const winText = document.querySelector('.js-winnerText');
const countX = document.querySelector('.js-countX');
const countO = document.querySelector('.js-countO');

const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
let player = 'X';

let historyX = [];
let historyO = [];

let winCountX = 0;
let winCountO = 0;

function createMarkup() {
    let markup = '';
    for (let i = 1; i < 10; i += 1) {
        markup += `<div class='item js-item' data-id='${i}'></div> `;
    }

    container.innerHTML = markup;
}
createMarkup();

container.addEventListener('click', onClick);

function onClick(evt) {
    const { target } = evt;
    if (!target.classList.contains('js-item') || target.textContent) {
        return;
    }

    let result = false;
    const id = Number(target.dataset.id);
    if (player === 'X') {
        historyX.push(id);
        result = isWinner(historyX);
        target.style.backgroundColor = 'burlywood';
    } else {
        historyO.push(id);
        result = isWinner(historyO);
        target.style.backgroundColor = 'darkturquoise';
    }

    target.textContent = player;

    if (result) {
        winText.textContent = `Winner is ${player} 🙃`;
        console.log(`Winner ${player} 🙃`);
        if (player === 'X') {
            winCountX++;
        } else {
            winCountO++;
        }
        countX.textContent = `Player X: ${winCountX}`;
        countO.textContent = `Player O: ${winCountO}`;
        setTimeout(() => {
            resetGame();
        }, 2000);
        return;
    } else if (historyO.length + historyX.length === 9) {
        winText.textContent = `Try again 😱`;
        console.log(`Try again`);
        setTimeout(() => {
            resetGame();
        }, 2000);
        return;
    }

    player = player === 'X' ? 'O' : 'X';
}

function isWinner(arr) {
    return wins.some(item => item.every(id => arr.includes(id)));
}

function resetGame(evt) {
    createMarkup();
    historyX = [];
    historyO = [];
    player = 'X';
    winText.textContent = `Let's go!`;
    countX.textContent = `Player X: ${winCountX}`;
    countO.textContent = `Player O: ${winCountO}`;
}