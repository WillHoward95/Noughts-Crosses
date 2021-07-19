document.addEventListener('DOMContentLoaded', () => {
const squares = document.querySelectorAll('.grid div')
const playerTurn = document.getElementById('player-turn')
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
const gameEnd = document.getElementById('game-end')
const winner = document.getElementById('winner')
const winningTitle = document.getElementById('winning-title')
const restartButton = document.getElementById('restart')

let currentPlayer = 'X'
let drawCounter = 0;




squares.forEach(square => {
    square.addEventListener('click', clickResult)
})

function clickResult(e) {
    const squareArray = Array.from(squares)
    const index = squareArray.indexOf(e.target)

    if (squares[index].classList.contains('X') || squares[index].classList.contains('O')) {
        return
    } else if (currentPlayer === 'X') {
        squares[index].classList.add('X')
        drawCounter++
    } else {
        squares[index].classList.add('O')
        drawCounter++
    }


    checkWin() 
    if (gameEnd.classList.contains('winScreen')) {

    } else {
        checkDraw()
    }
    
    changePlayer()
    playerTurn.innerHTML = currentPlayer;

    restartButton.addEventListener('click', resetBoard)

    function resetBoard(e) {
        for (let i = 0; i < 9; i++) {
            squares[i].classList.remove('X')
            squares[i].classList.remove('O')
            gameEnd.classList.remove('winScreen')
            currentPlayer = 'X'
            playerTurn.innerHTML = currentPlayer;
            drawCounter = 0;
            winningTitle.innerHTML = '';
        }
    }
}

function changePlayer() {
    if(currentPlayer === 'X') {
        currentPlayer = 'O'
    } else {
        currentPlayer ='X'
    }
}

function checkWin() {
    for (let i = 0; i < 8; i++){
        let sequenceCounter = 0;
        for (let j = 0; j < 3; j++) {
            if (squares[winningCombinations[i][j]].classList.contains(currentPlayer)) {
                sequenceCounter++
            }
            if (sequenceCounter === 3) {
                winningTitle.innerText = `${currentPlayer} wins!`;
                gameEnd.classList.add('winScreen')
            }
        }
    }
} 

function checkDraw() {
    if (drawCounter >= 9) {
        winningTitle.innerText = 'It\'s a Draw';
        gameEnd.classList.add('winScreen')
    }
}

})
