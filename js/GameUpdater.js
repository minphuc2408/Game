class GameUpdate {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
    }

    update() {
        const obstacleHandler = this.gameInstance.obstacleHandler;
        let playerInGame = this.gameInstance.playerInGame;
        // GameStart
        if (!this.gameInstance.isGameStarted) {
            return;
        }

        this.gameInstance.drawGame();

        //Player
        playerInGame.forEach(player => {
            player.updatePlayer();
        });

        playerInGame = playerInGame.filter(player => player.isAlive);

        if(playerInGame.length === 0) {
            this.gameInstance.isGameOver = true;
            this.gameInstance.players.forEach(player => {
                player.resetPlayer();
            });
            playerInGame = [...this.gameInstance.players];
        }
  
        obstacleHandler.framesSinceLastObstacle += 1/144;

        if (obstacleHandler.framesSinceLastObstacle >= obstacleHandler.obstacleInterval) {
            obstacleHandler.createRandomObstacleColumn();
            obstacleHandler.framesSinceLastObstacle = 0;
        }

        obstacleHandler.updateObstacles();

        // GameOver
        if (this.gameInstance.isGameOver) {
            this.gameInstance.gameScreen.drawGameOverScreen(); 
            return;
        }

        requestAnimationFrame(() => this.update());
    }
}

export default GameUpdate;