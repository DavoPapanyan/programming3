const cellNum = 20
const socket = io()

var matrix = [];

let characterCount = 5;
var side = 20;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var witchArr = [];
var goldenHammerArr = [];

const pauseBtn = document.getElementById("pause")
const resumeBtn = document.getElementById("resume")
const restartBtn = document.getElementById("restart")

function setup() {
    // MatrixGenerator();
    frameRate(5);
    createCanvas(cellNum * side, cellNum * side);
    background('#acacac');



}



function drawmatrix(matrix) {
    for (var y = 0; y < cellNum; y++) {
        for (var x = 0; x < cellNum; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
            }
            else if (matrix[y][x] == 5) {
                fill("gold");
            }

            rect(x * side, y * side, side, side);
        }
    }


}


// function MatrixGenerator() {
//     for (var y = 0; y < side; ++y) {
//         matrix[y] = [];
//         for (var x = 0; x < side; ++x) {
//             matrix[y][x] = Math.round(random(0, characterCount));
//         }
//     }
// }


socket.on("draw matrix", drawmatrix)

pauseBtn.addEventListener('click', handlePauseGame)
resumeBtn.addEventListener('click', handleResumeGame)
restartBtn.addEventListener('click', handleRestartGame)

let ifPaused = false


function handlePauseGame(ifPaused){
    console.log('paused');
    
   ifPaused = true
    socket.emit('pause game', ifPaused)
}


function handleResumeGame() {
    ifPaused = false
    socket.emit('pause game', ifPaused)
}


function handleRestartGame(){
   socket.emit('restart game', ifPaused)
}