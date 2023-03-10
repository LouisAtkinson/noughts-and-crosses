const boardContainer = document.getElementById("boardcontainer")
const rowOne = document.getElementById("rowone");
const rowTwo = document.getElementById("rowtwo");
const rowThree = document.getElementById("rowthree");
const scoreDisplay = document.getElementById('score');
let winSound = new Audio('win.wav');

const playernameBtn = document.getElementById("playernameBtn");
playernameBtn.addEventListener("click", playerOneMenu);

const submitP1Btn = document.getElementById("submitp1");
submitP1Btn.addEventListener("click", submitP1);

const submitP2Btn = document.getElementById("submitp2");
submitP2Btn.addEventListener("click", submitP2);

const replay = document.getElementById("replay");
replay.addEventListener("click", function() {
    clear();
    replay.style.display = "none";
    changeNames.style.display = "none";
    p1Turn();
});

const changeNames = document.getElementById("change");
changeNames.addEventListener("click", function() {
    score.innerHTML = '';
    playerOneMenu();
})

let playerOne = {};
let playerTwo = {};
let turn = 0;
let win = 0;
let round = 0;
const display = document.getElementById("display");

const gameBoard = (() => {
    const a1 = document.createElement("TD");
    const a2 = document.createElement("TD");
    const a3 = document.createElement("TD");
    const b1 = document.createElement("TD");
    const b2 = document.createElement("TD");
    const b3 = document.createElement("TD");
    const c1 = document.createElement("TD");
    const c2 = document.createElement("TD");
    const c3 = document.createElement("TD");
    rowOne.appendChild(a1);
    rowOne.appendChild(a2);
    rowOne.appendChild(a3);
    rowTwo.appendChild(b1);
    rowTwo.appendChild(b2);
    rowTwo.appendChild(b3);
    rowThree.appendChild(c1);
    rowThree.appendChild(c2);
    rowThree.appendChild(c3);
    return {a1, a2, a3, b1, b2, b3, c1, c2, c3,};
})();

let cells = document.getElementsByTagName("TD");
let cellArray = Array.prototype.slice.call(cells);
for (const cell of cellArray) {
    cell.addEventListener("click", function() {
        if (cell.innerHTML === '') {
            if (turn === "p1") {
                round++;
                console.log(round);
                cell.innerHTML = playerOne.mark;
                cell.mark = playerOne.mark;
                cell.occupied = 'yes';
                checkWin(playerOne.mark, playerOne.name);
                if (win === 1) {
                    console.log("win")
                    winMessage(playerOne.name);
                } else if (round === 5){
                    drawMessage();
                } else {
                    p2Turn();
                }
            } else if (turn === "p2") {
                cell.innerHTML = playerTwo.mark;
                cell.mark = playerTwo.mark;
                cell.occupied = 'yes';
                checkWin(playerTwo.mark, playerTwo.name);
                if (win === 1) {
                    winMessage(playerTwo.name);
                } else {
                    p1Turn();
                }
            }
        }
    });
}

const player = (name, mark, score) => {
    const getName = () => name;
    const getMark = () => mark;
    const getScore = () => score;
    return {name, mark, score, getName, getMark, getScore};
}

function playerOneMenu() {
    clear();
    display.style.display = "none";
    playernameBtn.style.display = "none";
    replay.style.display = "none";
    changeNames.style.display = "none";
    document.getElementById("form-popup1").style.display = "block";
}

function submitP1() {
    let p1Name = capitalise(document.getElementById("p1name").value);
    playerOne = player(p1Name, 'X', 0);
    document.getElementById("form-popup1").style.display = "none";
    document.getElementById("form-popup2").style.display = "block";
    return playerOne;
}

function submitP2() {
    let p2Name = capitalise(document.getElementById("p2name").value);
    playerTwo = player(p2Name, 'O', 0);
    document.getElementById("form-popup2").style.display = "none";
    document.getElementById("form").reset();
    p1Turn();
    return playerTwo;
}

function p1Turn() {
    display.style.display = "block";
    display.innerHTML = "It is " + playerOne.name + "'s turn";
    turn = "p1";
}

function p2Turn() {
    display.innerHTML = "It is " + playerTwo.name + "'s turn";
    turn = "p2";
}

function checkWin(mark, name) {
    console.log(mark)
    if (gameBoard.a1.textContent === mark && gameBoard.a2.textContent === 
    mark && gameBoard.a3.textContent === mark) {
        win = 1;
        gameBoard.a1.classList.add('win');
        gameBoard.a2.classList.add('win');
        gameBoard.a3.classList.add('win');
    } else if (gameBoard.b1.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.b3.textContent === mark) {
        win = 1;
        gameBoard.b1.classList.add('win');
        gameBoard.b2.classList.add('win');
        gameBoard.b3.classList.add('win');
    } else if (gameBoard.c1.textContent === mark && gameBoard.c2.textContent === 
    mark && gameBoard.c3.textContent === mark) {
        win = 1;
        gameBoard.c1.classList.add('win');
        gameBoard.c2.classList.add('win');
        gameBoard.c3.classList.add('win');
    } else if (gameBoard.a1.textContent === mark && gameBoard.b1.textContent === 
    mark && gameBoard.c1.textContent === mark) {
        win = 1;
        gameBoard.a1.classList.add('win');
        gameBoard.b1.classList.add('win');
        gameBoard.c1.classList.add('win');
    } else if (gameBoard.a2.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.c2.textContent === mark) {
        win = 1;
        gameBoard.a2.classList.add('win');
        gameBoard.b2.classList.add('win');
        gameBoard.c2.classList.add('win');
    } else if (gameBoard.a3.textContent === mark && gameBoard.b3.textContent === 
    mark && gameBoard.c3.textContent === mark) {
        win = 1;
        gameBoard.a3.classList.add('win');
        gameBoard.b3.classList.add('win');
        gameBoard.c3.classList.add('win');
    } else if (gameBoard.a1.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.c3.textContent === mark) {
        win = 1;
        gameBoard.a1.classList.add('win');
        gameBoard.b2.classList.add('win');
        gameBoard.c3.classList.add('win');
    } else if (gameBoard.a3.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.c1.textContent === mark) {
        win = 1;
        gameBoard.a3.classList.add('win');
        gameBoard.b2.classList.add('win');
        gameBoard.c1.classList.add('win');
    } else {}
}

function winMessage(name) {
    winSound.play();
    if (turn === 'p1') {
        playerOne.score++;
    } else if (turn === 'p2') {
        playerTwo.score++;
    }
    display.innerHTML = "Congratulations " + name + "! You have won!"
    scoreDisplay.innerHTML = playerOne.name + ": " + playerOne.score + '<br>' + playerTwo.name + ": " + playerTwo.score;
    win = 0;
    round = 0;
    turn = 0;
    replay.style.display = "block";
    changeNames.style.display = "block";
}

function drawMessage() {
    display.innerHTML = "It's a draw!"
    round = 0;
    turn = 0;
    replay.style.display = "block";
    changeNames.style.display = "block";
}

function clear() {
    for (const cell of cellArray) {
        cell.textContent = "";
        cell.classList.remove('win');
    }
}

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}