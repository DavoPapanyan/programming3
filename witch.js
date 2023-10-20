let Creature = require('./creature')
module.exports = class Witch extends Creature {
    constructor(x, y, index) {
       super(x, y , index)
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
            var newWitch = new Witch(newCell[0], newCell[1], 4);
            witchArr.push(newWitch);
            matrix[newCell[1]][newCell[0]] = 4;
        }

    }

    eat() {
        let predatorCells = this.chooseCell(3);
        let newCell = predatorCells[Math.floor(Math.random() * predatorCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy++;
            for (let i in predatorArr) {
                if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                    predatorArr.splice(i, 1);
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
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in witchArr) {
            if (this.x == witchArr[i].x && this.y == witchArr[i].y) {
                witchArr.splice(i, 1);
                break;
            }
        }
    }
}
