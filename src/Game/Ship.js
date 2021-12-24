import {genId} from "../utils";

class Ship {
    len;
    id;
    occupiedCells = [];   // [Cell,...]
    constructor(len) {
        this.len = len;
        this.id = genId();
    }

    hit = (row, column) => {
        let cell = this.occupiedCells.find(cell => cell.row === row && cell.column === column);
        if (cell) cell.hit();
        return cell;
    }
}

export default Ship;