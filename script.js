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

    function drawDiv(x, y, className) {
        const div = document.createElement('div')
        div.classList.add(className)
        div.style.top = `${y}px`
        div.style.left = `${x}px`
        return div
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = ''

        const foodElement = drawDiv(food.x, food.y, 'food')
        gameArena.appendChild(foodElement)
    }

    function gameLoop () {
        setInterval(() => {
            drawScoreBoard()
            drawFoodAndSnake()

        }, 1000)
    }

    function runGame() {
        gameStart = true
        gameLoop()

    }

    function startGame () {
        const scoreBoard = document.createElement('div')
        scoreBoard.id = 'score-board'
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