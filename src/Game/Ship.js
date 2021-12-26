import {genId} from "../utils";

// represents ship
class Ship {
    len;
    id;
    occupiedCells = [];   // [Cell,...]     // array of cells that are occupied by ship
    _destroyed = false;
    constructor(len) {
        this.len = len;
        this.id = genId();
    }

    // goes via occupied cells and asks them, is hit performed on them or not
    hit = (row, column) => {
        let cell = this.occupiedCells.find(cell => cell.row === row && cell.column === column);
        if (cell) cell.hit();
        this._destroyed = this.occupiedCells.every(cell => cell.isHit());
        return cell;
    };

    isDestroyed = () => this._destroyed;
}

export default Ship;