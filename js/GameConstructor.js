import createTime from './time.js'; // Import class Time

class GameConstructor {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;

        this.gameInstance.spacePressed = false;

        //Game
        this.gameInstance.isGameStarted = false;
        this.gameInstance.isGameOver = false;

        // Time and frame
        this.gameInstance.time = createTime(); 
        this.gameInstance.startTime = performance.now(); 


        this.gameInstance.spaceShipImage = new Image();
        this.gameInstance.spaceShipImage.src = "./assets/img/spaceship(1player).png"

        this.gameInstance.spaceShip2Image = new Image();
        this.gameInstance.spaceShip2Image.src = "./assets/img/spaceShip2.png"

        this.gameInstance.spaceShip1Image = new Image();
        this.gameInstance.spaceShip1Image.src = "./assets/img/spaceShip.png";
        
        this.gameInstance.spaceShip3Image = new Image();
        this.gameInstance.spaceShip3Image.src = "./assets/img/spaceship3.png";

        this.gameInstance.spaceBackground = new Image();
        this.gameInstance.spaceBackground.src = "./assets/img/bg-9.png";

        this.gameInstance.ufoImage = new Image();
        this.gameInstance.ufoImage.src = './assets/img/ufo.png';
        
        this.gameInstance.ufochild1Image = new Image();
        this.gameInstance.ufochild1Image.src = './assets/img/ufo-child-1.png';
        
        this.gameInstance.ufochild2Image = new Image();
        this.gameInstance.ufochild2Image.src = './assets/img/ufo-child-2.png';

        this.gameInstance.fireballImage = new Image();
        this.gameInstance.fireballImage.src = './assets/img/fireball.png';
        
        this.gameInstance.iceballImage = new Image();
        this.gameInstance.iceballImage.src = './assets/img/iceball.png';
        
        this.gameInstance.asteroidImage = new Image();
        this.gameInstance.asteroidImage.src = './assets/img/asteroid.png';
        
        this.gameInstance.missileImage = new Image();
        this.gameInstance.missileImage.src = './assets/img/missile.png';

        this.gameInstance.blackHoleImage = new Image();
        this.gameInstance.blackHoleImage.src = './assets/img/black-hole.png';

        this.gameInstance.cosmicDustImage = new Image();
        this.gameInstance.cosmicDustImage.src = './assets/img/cosmic-dust.png';

        this.gameInstance.neptuneImage = new Image();
        this.gameInstance.neptuneImage.src = './assets/img/neptune.png';

        this.gameInstance.uranusImage = new Image();
        this.gameInstance.uranusImage.src = './assets/img/uranus.png';

        this.gameInstance.saturnImage = new Image();
        this.gameInstance.saturnImage.src = './assets/img/saturn.png';

        this.gameInstance.marsImage = new Image();
        this.gameInstance.marsImage.src = './assets/img/mars.png';

        this.gameInstance.mercuryImage = new Image();
        this.gameInstance.mercuryImage.src = './assets/img/mercury.png';

        this.gameInstance.jupiterImage = new Image();
        this.gameInstance.jupiterImage.src = './assets/img/jupiter.png';

        this.gameInstance.venusImage = new Image();
        this.gameInstance.venusImage.src = './assets/img/venus.png';

        this.gameInstance.healthImage = new Image();
        this.gameInstance.healthImage.src = './assets/img/health.png';

        this.gameInstance.shieldImage = new Image();
        this.gameInstance.shieldImage.src = './assets/img/shield.png';
    }
}

export default GameConstructor;