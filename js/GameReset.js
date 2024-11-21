class GameReset {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
    }
    
    reset() {
        this.gameInstance.spacePressed = false;

        if (!this.gameInstance.isGameStarted) {
            this.gameInstance.gameScreen.drawStartScreen();
        }

        // Game
        this.gameInstance.isGameStarted = false;
        this.gameInstance.isGameOver = false;
        this.gameInstance.obstacleInterval = 1;
        this.gameInstance.framesSinceLastObstacle = 0; 
        
        //Obtacles
        this.gameInstance.obstacleHandler.reset();
    }
}

export default GameReset;
