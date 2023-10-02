var matrix = [];

let characterCount = 5;
var side = 20;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var witchArr = [];
var goldenHammerArr = [];
var destroyerArr = [];

function setup() {
    MatrixGenerator();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gre = new GrassEater(x, y, 2)
                predatorArr.push(gre);
            }
            else if (matrix[y][x] == 3) {
               var pre = new Predator(x, y, 3);
               predatorArr.push(pre);
            }
            else if (matrix[y][x] == 4){
               var wit = new Witch(x,y,4);
               witchArr.push(wit);
            }
            else if (matrix[y][x] == 5){
                var gh = new GoldenHammer(x,y,5);
                goldenHammerArr.push(gh);   
            }
        }
    }
}



function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3){
                fill("red");
            }
            else if (matrix[y][x] == 4){
                fill("purple");
            }
            else if (matrix[y][x] == 5){
                fill("gold");
            }
            
            rect(x * side, y * side, side, side);
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for(var i in predatorArr){
        predatorArr[i].eat();
    }
    for(var i in witchArr){
        witchArr[i].eat();
    }
    for(var i in goldenHammerArr){
        goldenHammerArr[i].eat();
    }
    
}


function MatrixGenerator() {
    for (var y = 0; y < side; ++y) {
        matrix[y] = [];
        for (var x = 0; x < side; ++x) {
            matrix[y][x] = Math.round(random(0, characterCount));
        }
    }
}



