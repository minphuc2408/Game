import Player from "./Player.js";
import GameConstructor from "./GameConstructor.js";
import GameDrawer from "./GameDrawer.js"
import GameUpdate from "./GameUpdater.js";
import GameKeyHandler from "./GameKeyHandler.js";
import GameReset from "./GameReset.js";
import ObstacleHandler from "./GameObstacles.js";

const gameCanvas = document.getElementById("gameCanvas");
const gameCtx = gameCanvas.getContext("2d");

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function main() {  
    class Game {
        constructor() {
            this.gameConstructor = new GameConstructor(this);
            this.keyHandler = new GameKeyHandler(this); 
            this.image = [this.spaceShipImage, this.spaceShip1Image, this.spaceShip2Image,this.spaceShip3Image];
            this.players = [];
            this.playerInGame = [...this.players];
            this.obstacleHandler = new ObstacleHandler(this, gameCtx);
            this.gameReset = new GameReset(this);
            this.gameUpdate = new GameUpdate(this);
            this.gameDrawer = new GameDrawer(this, gameCtx);
            this.gameScreen = gameScreen(this);
            this.gameScreen.drawStartScreen();
        }

        updatePlayers(players) {
            this.players = []; //1 line bug 2 hours
            for (let i = 0; i < players; i++) {
                let player;
                if(players === 1) {
                    player = new Player(this, this.image[i], gameCtx, i + 1);
                } else {
                    player = new Player(this, this.image[i + 1], gameCtx, i + 1);
                }
                this.players.push(player);
            }
            this.playerInGame = [...this.players];
        }
    
        startGame() {
            this.isGameStarted = true;
            this.isGameover = false;
            this.updateGame();
        }
        
        updateGame() { 
            this.gameUpdate.update();
        }
        
        drawGame() {
            this.gameDrawer.draw();
        }
        
        resetGame() {
            this.gameReset.reset();
        }
    }

    // alert("Hãy thiết lập camera để chơi game");
    document.querySelector(".btn-start-game").addEventListener("click", () => {
        document.querySelector(".header").classList.replace("visible", "hidden");
        document.querySelector(".tutorial").classList.replace("hidden", "visible");
    });

    const buttonPlayer = document.querySelectorAll('.btn-play');
    const game = new Game();

    const images = [
        game.spaceShipImage,
        game.spaceShip2Image,
        game.spaceShip1Image,
        game.spaceShip3Image,
        game.spaceBackground,
        game.fireballImage,
        game.iceballImage,
        game.asteroidImage,
        game.blackHoleImage,
        game.cosmicDustImage,
        game.neptuneImage,
        game.uranusImage,
        game.saturnImage,
        game.marsImage,
        game.mercuryImage,
        game.jupiterImage,
        game.venusImage,
        game.ufoImage,
        game.ufochild1Image,
        game.ufochild2Image,
        game.missileImage,
        game.healthImage,
        game.shieldImage
    ];
    
    let imagesLoaded = 0;
    let selectPlayers = 0;
    for (let i = 0; i < images.length; i++) {
        images[i].onload = () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                buttonPlayer.forEach((btn, index) => {
                    btn.addEventListener('click', () => {
                        document.querySelector(".tutorial").classList.replace("visible", "hidden");
                        document.querySelector(".game-fla-bird").classList.remove("hidden", "visible");

                        selectPlayers = index + 1
                        game.updatePlayers(selectPlayers); // Initialize players on button click
                    });
                });
                game.resetGame();
            }
        };
    }
}
main();

function resizeCanvas() {
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
}

function gameScreen(gameInstance) {
    let gameOverDisplayed = false;

    function drawBlurredBackground() {
        gameCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

    function drawStartScreen () {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.drawImage(gameInstance.spaceBackground, 0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.fillStyle = 'white';
        gameCtx.font = '30px Arial';
        gameCtx.textAlign = 'center';
        gameCtx.fillText('Press Enter to start', gameCanvas.width / 2, gameCanvas.height / 2);
    }

    function drawGameOverScreen () {
        if(gameOverDisplayed) return;

        gameInstance.isGameStarted = false;
        gameOverDisplayed = true;

        drawBlurredBackground(gameCtx, gameCanvas);

        const gameOverContainer = document.createElement("div");
        gameOverContainer.className = "game-over-container";

        const gameOverTitle = document.createElement("div");
        gameOverTitle.className = "game-over-title";
        gameOverTitle.innerText = "Game Over"
        gameOverContainer.appendChild(gameOverTitle);

        const scoreText = document.createElement('div');
        scoreText.className = 'score-text';
        scoreText.innerText = `Score: ${gameInstance.score}`;
        gameOverContainer.appendChild(scoreText);

        const playAgainText = document.createElement('div');
        playAgainText.className = 'play-again-text';
        playAgainText.innerText = 'Play Again?';
        gameOverContainer.appendChild(playAgainText);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const yesButton = document.createElement('button');
        yesButton.className = 'restart-btn';
        yesButton.innerText = 'YES';
        yesButton.onclick = () => {
            gameInstance.resetGame();
            drawStartScreen();
            document.body.removeChild(gameOverContainer);
            gameOverDisplayed = false;
        };
        buttonContainer.appendChild(yesButton);

        const noButton = document.createElement('button');
        noButton.className = 'restart-btn';
        noButton.innerText = 'NO';
        noButton.onclick = () => {
            gameInstance.resetGame();
            document.querySelector('.header').classList.remove('hidden');
            document.querySelector('.header').classList.add('visible');
            document.body.removeChild(gameOverContainer);
            gameOverDisplayed = false;
        };
        buttonContainer.appendChild(noButton);

        gameOverContainer.appendChild(buttonContainer);

        document.body.appendChild(gameOverContainer);
    }

    return {
        drawBlurredBackground,
        drawStartScreen,
        drawGameOverScreen
    };
}
