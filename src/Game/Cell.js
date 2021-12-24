export class Cell {
    value;
    _row;
    _column;
    _hit = false;
    constructor(value, row, column) {
        this.value = value;
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
}

