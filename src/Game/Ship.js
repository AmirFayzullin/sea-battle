import {genId} from "../utils";

class Ship {
    len;
    id;
    occupiedCells = [];   // [Cell,...]
    _destroyed = false;
    constructor(len) {
        this.len = len;
        this.id = genId();
    }

    hit = (row, column) => {
        let cell = this.occupiedCells.find(cell => cell.row === row && cell.column === column);
        if (cell) cell.hit();
        this._destroyed = this.occupiedCells.every(cell => cell.isHit());
        return cell;
    };

    isDestroyed = () => this._destroyed;
}

export default Ship;