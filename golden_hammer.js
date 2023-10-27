let Creature = require('./creature')
const io = require('./server')

module.exports = class GoldenHammer extends Creature{
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
     mul() {
        var newCell = this.selectRandomCell(0);
        if (newCell) {
            statisticsObj.goldenHammer++
            io.emit('change statistics', statisticsObj)
            var newGoldenHammer = new GoldenHammer(newCell[0], newCell[1], 5);
            goldenHammerArr.push(newGoldenHammer);
            matrix[newCell[1]][newCell[0]] = 5;
        }

    }

    eat() {
        let characterArrCells = this.chooseCell(4);
        let newCell = characterArrCells[Math.floor(Math.random() * characterArrCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;
            for (let i in witchArr) {
                if (witchArr[i].x == newX && witchArr[i].y == newY) {
                    witchArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 9) {
                this.mul();
            }
        } else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in goldenHammerArr) {
            if (this.x == goldenHammerArr[i].x && this.y == goldenHammerArr[i].y) {
                goldenHammerArr.splice(i, 1);
                break;
            }
        }
    }
}
