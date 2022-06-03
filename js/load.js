const loadingElement = document.getElementById("progress-bar");
const loadingDivElement = document.getElementById("loading-div");
const gameElement = document.getElementById("game-canvas");
let number = 0;
let increaser = 1;
let randomIncreaser = 100;
const increaseLoadingBar = () => {
    if (number >= 100){
        loadingDivElement.style.display = "none";
        gameElement.style.display = "";

    }
    if (loadingDivElement.style.display === "none") return;
    number += increaser;
    increaser += randomIncreaser;
    loadingElement.style.width = number+"%";

}

const loading = () => {
    setInterval(increaseLoadingBar, 777);
}

loading();
