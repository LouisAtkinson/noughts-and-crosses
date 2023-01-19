const boardContainer = document.getElementById("boardcontainer")
const rowOne = document.getElementById("rowone");
const rowTwo = document.getElementById("rowtwo");
const rowThree = document.getElementById("rowthree");



let playerOne = {};
let playerTwo = {};
let turn = 0;
let win = 0
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
        if (turn === "p1") {
            cell.innerHTML = playerOne.mark;
            cell.mark = playerOne.mark;
            cell.occupied = 'yes';
            checkWin(playerOne.mark, playerOne.name);
            if (win === 1) {
                console.log("win")
                winMessage(playerOne.name);
                return;
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
                return;
            } else {
                p1Turn();
            }
        }
    });
}

const player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {name, mark, getName, getMark};
}

const playernameBtn = document.getElementById("playernameBtn");
playernameBtn.addEventListener("click", playerOneMenu);

function playerOneMenu() {
document.getElementById("form-popup1").style.display = "block";
}

const submitP1Btn = document.getElementById("submitp1");
submitP1Btn.addEventListener("click", submitP1);

function submitP1() {
    let p1Name = document.getElementById("p1name").value;
    playerOne = player(p1Name, 'X');
    document.getElementById("form-popup1").style.display = "none";
    document.getElementById("form-popup2").style.display = "block";
    return playerOne;
}

const submitP2Btn = document.getElementById("submitp2");
submitP2Btn.addEventListener("click", submitP2);

function submitP2() {
    let p2Name = document.getElementById("p2name").value;
    playerTwo = player(p2Name, 'O');
    document.getElementById("form-popup2").style.display = "none";
    p1Turn();
    return playerTwo;
}

function p1Turn() {
    display.innerHTML = "It is " + playerOne.name + "'s turn";
    turn = "p1";
}

function p2Turn() {
    display.innerHTML = "It is " + playerTwo.name + "'s turn";
    turn = "p2";
}

function checkWin(mark, name) {
    console.log(mark)
    if (gameBoard.a1.textContent === "X" && gameBoard.a2.textContent === 
    "X" && gameBoard.a3.textContent === "X") {
        win = 1;
    } else if (gameBoard.b1.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.b3.textContent === mark) {
        win = 1;
    } else if (gameBoard.c1.textContent === mark && gameBoard.c2.textContent === 
    mark && gameBoard.c3.textContent === mark) {
        win = 1;
    } else if (gameBoard.a1.textContent === mark && gameBoard.b1.textContent === 
    mark && gameBoard.c1.textContent === mark) {
        win = 1;
    } else if (gameBoard.a2.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.c2.textContent === mark) {
        win = 1;
    } else if (gameBoard.a3.textContent === mark && gameBoard.b3.textContent === 
    mark && gameBoard.c3.textContent === mark) {
        win = 1;
    } else if (gameBoard.a1.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.c3.textContent === mark) {
        win = 1;
    } else if (gameBoard.a3.textContent === mark && gameBoard.b2.textContent === 
    mark && gameBoard.c1.textContent === mark) {
        win = 1;
    } else {}
}

function winMessage(name) {
    display.innerHTML = "Congratulations " + name + "! You have won!"
}