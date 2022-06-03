//game canvas + context
//make object on line 4 a canvas
/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d");


//player object
const player = {
    x: 0, // should not be changed
    y: 0, // This will be changed when jumping
    xSize: 20,
    ySize: 40
}
//variables
let score = 0;
let highscore = 0;
let isJumping = false; // change this to true to start the jump
let isFalling = true; // when reaching the ground this should be changed to false

const baseJumpForce = 0.6;
let jumpforce = baseJumpForce;
const jumpIncreaser = 1.08;

const baseFallForce = 0.2;
let fallForce = baseFallForce;
const fallIncreaser = 1.04;

//gameLoop
const drawGame = () => {
    requestAnimationFrame(drawGame)
    //clear the screen
    clearScreen()
    //then do the 'physics' and 'checks'
    jump()
    fall()
    //after that draw everything
    drawPlayer()
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

//jump method
const jump = () => {
    if (!isJumping || isFalling) return;
    //check if jump reached jump height to turn isJumping off and turn isFalling on
    player.y -= jumpforce;
    jumpforce *= jumpIncreaser;
    if (player.y <= 0){ // reaching max height
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
