//game canvas + context
//make object on line 4 a canvas
/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d");


//player object
const player = {
    x: 20, // should not be changed
    y: canvas.height-40, // This will be changed when jumping
    xSize: 20,
    ySize: 40 // added Y size to the player Y
}
//enemy template object
const enemy = {
    x: canvas.width,
    y: canvas.height-10, // canvas.height-ySize
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
    //after that draw everything
    drawPlayer()
    drawEnemies()

    enemyCleaner()
}
//method to clear the screen in order to redraw
const clearScreen = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

//draw the player
const drawPlayer = () => {
    ctx.fillStyle = "white"
    ctx.fillRect(player.x,player.y,player.xSize,player.ySize)
}
//enemySpawner
const spawnEnemy = () => {
    // don't spawn enemy every frame
    if (gameFrame % 300 !== 0) return;
    const spawningEnemy = {...enemy};
    const randomHeight = Math.random() * 15
    spawningEnemy.y = canvas.height-randomHeight;
    spawningEnemy.ySize = randomHeight;
    spawningEnemy.x += Math.random()*30;
    enemyArray.push(spawningEnemy)
}
//drawEnemy
const drawEnemies = () => {
    enemyArray.forEach(obj => {
        ctx.fillStyle = "red"
        ctx.fillRect(obj.x,obj.y,obj.xSize,obj.ySize)
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
    enemyArray = enemyArray.filter(obj => obj.x >0-obj.xSize)
}
//collision detection

//jump method
const jump = () => {
    if (!isJumping || isFalling) return;
    //check if jump reached jump height to turn isJumping off and turn isFalling on
    player.y -= jumpforce;
    jumpforce *= jumpIncreaser;
    if (player.y <= 0 + canvas.height/6){ // reaching max height
        jumpforce = baseJumpForce;
        isJumping = false
        isFalling = true
    }

}
const fall = () => {
    if (isJumping || !isFalling) return;
    player.y += fallForce;
    fallForce *= fallIncreaser;
    if (player.y >= canvas.height-player.ySize){
        fallForce = baseFallForce;
        isFalling = false
    };
}

const keyDown = (event) => {
    if ((event.keyCode !== 38 && event.keyCode !== 32) || isJumping || isFalling) return; //keyCode 32 = space, 38 = arrow up
    isJumping = true; // put this on true after passing the IF statement

}
//event listener for space keypress
document.body.addEventListener('keydown', keyDown)

//start the gameloop
drawGame();
