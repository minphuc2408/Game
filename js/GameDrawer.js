class GameDrawer {
    constructor(gameInstance, gameCtx) {
        this.gameInstance = gameInstance;
        this.gameCtx = gameCtx;
    }

    draw() {
        this.gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        this.gameCtx.drawImage(this.gameInstance.spaceBackground, 0, 0, gameCanvas.width, gameCanvas.height);

        this.gameInstance.playerInGame.forEach(player => {
            player.drawPlayer();
        });

        this.gameInstance.obstacleHandler.drawObstacles();
    }
}

export default GameDrawer;