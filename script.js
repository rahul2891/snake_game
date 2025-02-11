document.addEventListener('DOMContentLoaded', function () {
    const gameArena = document.getElementById('game-arena')
    const arenaSize = 600
    const cellSize = 20
    let score = 0
    let gameStart = false
    let food = {x:300, y:200}
    let snake = [{ x:160, y:200}, { x: 140, y: 200}, { x: 120, y: 200}] //[head body body tail]
    let dx = cellSize
    let dy = 0


    function drawScoreBoard () {
        const scoreBoard = document.getElementById('score-board')
        scoreBoard.textContent = `Score: ${score}`
    }

    function runGame() {
        
    }

    function startGame () {
        const scoreBoard = document.createElement('div')
        scoreBoard.id = 'score-board'
        scoreBoard.textContent = '10'
        document.body.insertBefore(scoreBoard, gameArena)
        
        const startButton = document.createElement('button')
        startButton.textContent = 'Start Game'
        startButton.classList.add('start-button')
        document.body.appendChild(startButton)

        startButton.addEventListener('click', function startGame() {
            startButton.style.display = this.nonce;
            runGame();

        })
    }

    startGame()
})