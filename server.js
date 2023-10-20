const express = require("express")
const app = express()
const http = require('http')

const server = http.createServer(app)
const io=require('socket.io')(server)

app.use(express.static("."));

app.get('/', (req, res) => {
    res.redirect('index.html')
})
server.listen(3500, () => {
    console.log('Server is listening to port 3500');
})

matrix = []
let cellNum = 20
grassArr = []
grassEaterArr = [],
    predatorArr = [],
    witchArr = [],
    goldenHammerArr = [];
let Grass = require('./grass.js')
let GrassEater = require('./grassEater.js')
let Predator = require('./predator.js')
let Witch = require('./witch.js')
let GoldenHammer = require('./golden_hammer.js')


function fillMatrix(cellNum, grassNum, grEaterNum, predatorNum, witchNum, goldenHammerNum) {
    let matrix = [];
    for (let y = 0; y < cellNum; y++) {
        matrix[y] = [];
        for (let x = 0; x < cellNum; x++) {
            matrix[y][x] = 0;
        }
    }
    function fillRandomCells(value, count) {
        while (count > 0) {
            const col = Math.floor(Math.random() * cellNum);
            const row = Math.floor(Math.random() * cellNum);
            if (matrix[col][row] === 0) {
                matrix[col][row] = value;
                count--;
            }
        }
    }

    fillRandomCells(1, grassNum);
    fillRandomCells(2, grEaterNum);
    fillRandomCells(3, predatorNum);
    fillRandomCells(4, witchNum);
    fillRandomCells(5, goldenHammerNum);
    console.log('fill', matrix);
    
    return matrix;
}

function initGame() {
    fillMatrix(cellNum, 30, 10, 5, 5, 5)
    console.log(matrix);
    
    initArrays()
    startInterval()
}

function initArrays() {
    grassArr = [],
        grassEaterArr = [],
        predatorArr = [],
        witchArr = [],
        goldenHammerArr = []
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
            else if (matrix[y][x] == 4) {
                var wit = new Witch(x, y, 4);
                witchArr.push(wit);
            }
            else if (matrix[y][x] == 5) {
                var gh = new GoldenHammer(x, y, 5);
                goldenHammerArr.push(gh);
            }
        }
    }
}


fillMatrix(cellNum)
let speed = 300
let intId;

function startInterval() {
    clearInterval(intId)
    intId = setInterval(function () {
        playGame()
    }, speed)
}

function playGame() {
    for (var i in grassArr) {
        grassArr[i].mul();

    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in witchArr) {
        witchArr[i].eat();
    }
    for (var i in goldenHammerArr) {
        goldenHammerArr[i].eat();
    }
}

io.on("connection", function (socket) {
    socket.emit('draw matrix', matrix)
    initGame()
})

