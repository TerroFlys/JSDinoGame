//game canvas + context
//make object on line 4 a canvas
/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d");


//player object
const player = {
    x: 20, // should not be changed
    y: canvas.height - 40, // This will be changed when jumping
    xSize: 20,
    ySize: 40 // added Y size to the player Y
}
//enemy template object
const enemy = {
    x: canvas.width,
    y: canvas.height - 10, // canvas.height-ySize
    xSize: 5,
    ySize: 10 // added Y size to the enemy Y
}
let enemyArray = [] // list of spawned enemies

//variables
let score = 0;
let highscore = 0;
let isJumping = false; // change this to true to start the jump
let isFalling = true; // when reaching the ground this should be changed to false

//'Physics'
const baseJumpForce = 0.6;
let jumpforce = baseJumpForce;
const jumpIncreaser = 1.08;

const baseFallForce = 0.2;
let fallForce = baseFallForce;
const fallIncreaser = 1.04;
//speed for the object that go towards the player
let gameSpeed = 1;
let gameFrame = 0;

let timeBetweenSpawn = 250

//gameLoop
const drawGame = () => {
    requestAnimationFrame(drawGame)
    gameFrame += 1;

    //clear the screen
    clearScreen()
    //spawn enemy
    spawnEnemy()
    //then do the 'physics' and 'checks'
    jump()
    fall()
    enemyMove()
    collisionCheck()
    //after that draw everything
    drawPlayer()
    drawEnemies()

    enemyCleaner()
    //after everything is done increase the score
    score = gameFrame/5;
    //draw score
    drawScore()
}
//method to clear the screen in order to redraw
const clearScreen = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//draw the player
const drawPlayer = () => {
    ctx.fillStyle = "white"
    ctx.fillRect(player.x, player.y, player.xSize, player.ySize)
}
//enemySpawner
const spawnEnemy = () => {
    // don't spawn enemy every frame
    if (gameFrame % timeBetweenSpawn !== 0) return;
    //when spawning an enemy, increase gameSpeed
    if (gameSpeed < 2.5) { // making sure the game doesn't go too fast
        gameSpeed += 0.4
    }

    //after spawning, reduce time for next spawn
    if (timeBetweenSpawn > 150) { // do not go too low, randomly go under 150 afterwards don't decrease timeBetweenSpawn anymore
        timeBetweenSpawn -= Math.floor(Math.random() * 10) // between 0 and 9 or 10, no clue
    }


    const spawningEnemy = {...enemy};
    const randomHeight = Math.random() * 15
    spawningEnemy.y = canvas.height - randomHeight;
    spawningEnemy.ySize = randomHeight;
    // a little different spawning for each enemy
    // could be a lot better tho
    spawningEnemy.x += Math.random() * 30;
    enemyArray.push(spawningEnemy)
}
//drawEnemy
const drawEnemies = () => {
    enemyArray.forEach(obj => {
        ctx.fillStyle = "red"
        ctx.fillRect(obj.x, obj.y, obj.xSize, obj.ySize)
    })
}
//Move enemy - Game speed stuff
const enemyMove = () => {
    enemyArray.map(obj => {
        obj.x -= gameSpeed;
    })
}
//remove Passed Enemies
const enemyCleaner = () => {
    enemyArray = enemyArray.filter(obj => obj.x > 0 - obj.xSize)
}
//collision detection
const collisionCheck = () => {
    // if player collides with an enemy, reset game
    enemyArray.forEach(obj => {
        //check  if player's y is in enemies y
        //check if enemy is in but left sticks out
        //check if enemy is in but right sticks out
        //check if enemy is completely in
        // this ***Should*** work, tbh I have no clue atm
        if ((obj.x > player.x && obj.x < player.x + player.xSize || obj.x < player.x && obj.x + obj.xSize > player.x) && //this was x, now  comes y
            (obj.y > player.y && obj.y < player.y + player.ySize || obj.y < player.y && obj.y + obj.ySize > player.y)) {
            gameOver()
        }
    })

}


//jump method
const jump = () => {
    if (!isJumping || isFalling) return;
    //check if jump reached jump height to turn isJumping off and turn isFalling on
    player.y -= jumpforce;
    jumpforce *= jumpIncreaser;
    if (player.y <= 0 + canvas.height / 6) { // reaching max height
        jumpforce = baseJumpForce;
        isJumping = false
        isFalling = true
    }
}

//fall method
const fall = () => {
    if (isJumping || !isFalling) return;
    player.y += fallForce;
    fallForce *= fallIncreaser;
    if (player.y >= canvas.height - player.ySize) {
        fallForce = baseFallForce;
        isFalling = false
    }
    ;
}

//keydown event listener
const keyDown = (event) => {
    if ((event.keyCode !== 38 && event.keyCode !== 32) || isJumping || isFalling) return; //keyCode 32 = space, 38 = arrow up
    isJumping = true; // put this on true after passing the IF statement

}

//Game Over method to reset the game
//Change variables here
const gameOver = () => {
    player.y = canvas.height - player.ySize;
    gameSpeed = 1;
    gameFrame = 0;
    isJumping = false;
    isFalling = false;
    timeBetweenSpawn = 225
    //new high score ?
    if (score > highscore) highscore = score;
    score = 0;
    //empty enemy array
    enemyArray = []
    //this should be everything
}

//Draw score/highscore
const drawScore = () => {
    ctx.fillStyle = "white";
    const fontSize = 15;
    ctx.fillText(`Score: ${Math.floor(score)} Highscore: ${Math.floor(highscore)}`, canvas.width / 2.7, fontSize);
    ctx.font = `${fontSize}px Designer`;
}


//event listener for space keypress
document.body.addEventListener('keydown', keyDown)

//set the default values
gameOver()
//start the gameloop
drawGame();
