let Creature = require('./creature')
const io = require('./server')

module.exports = class Grass extends Creature{
    constructor(x, y, index) {
        super(x, y, index)
    }

     mul () {
        this.multiply++;
        var newCell = this.selectRandomCell(0)
    
        if(newCell && this.multiply >= 8){
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            statisticsObj.grass++
            io.emit('change statistics', statisticsObj)
            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}


