import {genId} from "../utils";

class Ship {
    len;
    id;
    occupiedCells = [];   // [[row, column],...]
    constructor(len) {
        this.len = len;
        this.id = genId();
    }
}

export default Ship;