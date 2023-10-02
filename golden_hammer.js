class GoldenHammer {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                    break;
                }
            }
        }
        return found;
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
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
