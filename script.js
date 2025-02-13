document.addEventListener('DOMContentLoaded', function () {
    const gameArena = document.getElementById('game-arena')
    const arenaSize = 600
    const cellSize = 20
    let intervalId;
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

    function moveFood() {
        let newX, newY;
        do{
            newX = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize))* cellSize
            newY = Math.floor(Math.random() * ((arenaSize - cellSize)/cellSize))* cellSize
        } while(snake.some(snakeCell => snakeCell.x === newX && snakeCell.y === newY))

            food = {x: newX, y: newY}
    }

    function updateSnake() {
        const newHead = {x: snake[0].x + dx, y: snake[0].y + dy}
        snake.unshift(newHead)
        if(newHead.x === food.x && newHead.y === food.y){
            score += 5;
            moveFood();
        } else {
            snake.pop()
        }
    }

    function drawFoodAndSnake() {
        gameArena.innerHTML = ''
        
        snake.forEach((snakeCell) => {
            const snakeElement = drawDiv(snakeCell.x, snakeCell.y, 'snake')
            gameArena.appendChild(snakeElement)
        })

        const foodElement = drawDiv(food.x, food.y, 'food')
        gameArena.appendChild(foodElement)
    }

    function gameOver () {
        // snake body hit
        for(i=1; i < snake.length; i++){
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true
        }
        // wall collision
        const isHittingLeftWall = snake[0].x < 0;
        const isHittingTopWall = snake[0].y < 0;
        const isHittingRightWall = snake[0].x >= arenaSize;
        const isHittingDownWall = snake[0].y >= arenaSize;

        return isHittingLeftWall || isHittingRightWall || isHittingTopWall || isHittingDownWall;
    }

    function gameLoop () {
        intervalId = setInterval(() => {
            if(gameOver()) {
                clearInterval(intervalId);
                gameStart = false;
                alert('Game Over' + '\n' + 'Your Score: ' + score);
                return;
            }
            updateSnake();
            drawFoodAndSnake();
            drawScoreBoard();
        }, 200);
    }

    function changeDirection(e) {
        console.log(e, e.keyCode)

        const LEFT_KEY = 37
        const UP_KEY = 38
        const RIGHT_KEY = 39
        const DOWN_KEY = 40

        const isGoingDown = dy === cellSize;
        const isGoingUp = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;

        const keyPressed = e.keyCode

        if(keyPressed === LEFT_KEY && !isGoingRight) {
            dx = -cellSize;
            dy = 0;
        }

        if(keyPressed === RIGHT_KEY && !isGoingLeft) {
            dx = cellSize;
            dy = 0;
        }

        if(keyPressed === UP_KEY && !isGoingDown) {
            dy = -cellSize;
            dx = 0;
        }

        if(keyPressed === DOWN_KEY && !isGoingUp) {
            dy = cellSize;
            dx = 0;
        }


    }

    function runGame() {
        if(!gameStart) {
            gameStart = true
            gameLoop()
            document.addEventListener('keydown', changeDirection)

        }

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