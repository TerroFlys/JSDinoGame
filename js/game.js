//game canvas + context
//make object on line 4 a canvas
/**@type {HTMLCanvasElement}*/
const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d");


//player object
const player = {
    x: 0,
    y: 0,
    size: 30
}