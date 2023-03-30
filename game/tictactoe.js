let cells = document.querySelectorAll(".cell");
let statusText = document.querySelector("#statusText");
let restartBtn = document.querySelector("#restartBtn");

let player1Image = 'img/cat_keks.png'; // image кота
let player2Image = 'img/mouse.png'; // image мыши


let player1Name = 'кошки';
let player2Name = 'мышки';

let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = `${player1Name}`;
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked, {once:true}));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Ходят ${currentPlayer}`;
    running = true;
}
function cellClicked() {
    let cellIndex = this.getAttribute('cellIndex');
    
    if(options[cellIndex] != '' || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function restartGame() {
    console.log("restart");
    currentPlayer = `${player1Name}`;
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Ходят ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.addEventListener('click', cellClicked, {once:true}));
    running = true;
}
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.innerHTML = setPlayerImageInCell();
}
function setPlayerImageInCell() {
    let pl = currentPlayer === `${player1Name}` ? `${player1Image}` : `${player2Image}`;
    //let innerText = `<img src='${pl}'>`;
    let innerText = `<img class='cell_playerImage' src='${pl}'>`
    return innerText;
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `Победили ${currentPlayer}!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Ничья!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function changePlayer() {
    currentPlayer = currentPlayer === `${player1Name}` ? `${player2Name}` : `${player1Name}`;
    statusText.textContent = `Ходят ${currentPlayer}`;
}