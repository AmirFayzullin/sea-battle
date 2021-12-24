export class Cell {
    static EMPTY_VALUE = 0;
    value = Cell.EMPTY_VALUE;
    _row;
    _column;
    _hit = false;
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    get row() {
        return this._row;
    }
    get column() {
        return this._column;
    }

    hit = () => this._hit = true;
    isHit = () => this._hit;
    isEmpty = () => this.value === Cell.EMPTY_VALUE;
}

