class ObstacleHandler {
    constructor(gameInstance, gameCtx) {
        this.gameInstance = gameInstance;
        this.gameCtx = gameCtx;

        this.obstacles = [];
        this.obstacleGap = 150;
        this.obstacleWidth = 60;
        this.obstacleHeight = 60;
        this.obstacleInterval = 1;
        this.framesSinceLastObstacle = 0; 
    }

    reset(){
        this.obstacles = [];
    }

    updateObstacles() {
        this.obstacles.forEach((obstacle) => {
            obstacle.x -= obstacle.speed;
        });
    }

    drawObstacles() {
        this.obstacles.forEach((obstacle) => {
            this.gameCtx.save();
            this.gameCtx.drawImage(obstacle.image, obstacle.x, obstacle.y, this.obstacleWidth, this.obstacleHeight);
            this.gameCtx.restore();
        });
    }

    createRandomObstacleColumn() {
        const obstaclePositions = [];
        const obstacleCount = 4;
        const minGap = this.obstacleWidth + this.obstacleGap;

        const weightedObstacleTypes = [
            { type: 'cosmicDust', image: this.gameInstance.cosmicDustImage, weight: 9 },
            { type: 'neptune', image: this.gameInstance.neptuneImage, weight: 8 },
            { type: 'uranus', image: this.gameInstance.uranusImage, weight: 8 },
            { type: 'saturn', image: this.gameInstance.saturnImage, weight: 8 },
            { type: 'mars', image: this.gameInstance.marsImage, weight: 8 },
            { type: 'mercury', image: this.gameInstance.mercuryImage, weight: 8 },
            { type: 'jupiter', image: this.gameInstance.jupiterImage, weight: 8 },
            { type: 'ufo', image: this.gameInstance.ufoImage, weight: 8 },
            { type: 'venus', image: this.gameInstance.venusImage, weight: 8 },
            { type: 'ufochild1', image: this.gameInstance.ufochild1Image, weight: 5 },
            { type: 'ufochild2', image: this.gameInstance.ufochild2Image, weight: 5 },
            { type: 'blackHole', image: this.gameInstance.blackHoleImage, weight: 5 },
            { type: 'shield', image: this.gameInstance.shieldImage, weight: 6 },
            { type: 'health', image: this.gameInstance.healthImage, weight: 6 },
        ];

        //Position Obstacle
        const getRandomYPosition =  (obstaclePositions, minGap, canvasHeight) => {
            let obstacleY;
            let isValidPosition = false;
            const maxAttemps = 10;
            let attemps = 0;

            while(!isValidPosition && (attemps < maxAttemps)) {
                obstacleY = Math.floor(Math.random() * (canvasHeight - this.obstacleHeight));
                isValidPosition = obstaclePositions.every((pos) => Math.abs(pos - obstacleY) >= minGap);
                attemps++;
            }

            return isValidPosition ? obstacleY : null;
        }

        for (let i = 0; i < obstacleCount; i++) {
            const obstacleY = getRandomYPosition(obstaclePositions, minGap, gameCanvas.height);
            if (obstacleY !== null) {
                obstaclePositions.push(obstacleY);
            }
        }

        // Get random obstale type
        const getRandomObstacleType = (weightedTypes) => {
            const totalWeight = weightedTypes.reduce((total, item) => total + item.weight, 0);
            const randomWeight = Math.random() * totalWeight;

            let cumalativeWeight = 0;
            for (const item of weightedTypes) {
                cumalativeWeight += item.weight;
                if (randomWeight < cumalativeWeight) {
                    return item;
                }
            }
        };

        for (let i = 0; i < obstacleCount; i++) {
            const randomType = getRandomObstacleType(weightedObstacleTypes);
            this.obstacles.push({
                x: gameCanvas.width,
                y: obstaclePositions[i],
                type: randomType.type,
                image: randomType.image,
                passed: false,
                isColumn: i === 0,
                speed: 2
            });
        }
    }
}

export default ObstacleHandler;