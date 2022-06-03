//game canvas + context
//make object on line 4 a canvas
/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d");


//player object
const player = {
    x: 0,
    y: 0,
    xSize: 20,
    ySize: 60
}
//gameLoop
const drawGame = () => {
    requestAnimationFrame(drawGame)
    clearScreen()
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

//start the gameloop
drawGame();
