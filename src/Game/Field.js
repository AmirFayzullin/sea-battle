import Ship from "./Ship";
import {genRandom} from "../utils";

class Field {
    map;
    FREE_CELL = 0;
    DEFAULT_SHIPS_SET = [
        {
            shipLen: 1,
            count: 4
        },
        {
            shipLen: 2,
            count: 3
        },
        {
            shipLen: 3,
            count: 2
        },
        {
            shipLen: 4,
            count: 1
        }
    ];
    ships = [];

    constructor() {
        this.map = Array(10).fill(0, 0, 11)
            .map(() =>
                Array(10).fill(this.FREE_CELL, 0, 11)
            );

        this.initMap();
    }

    initMap = () => {
        this.DEFAULT_SHIPS_SET.forEach((shipsSet) => {
            for (let i = 0; i < shipsSet.count; i++) this.placeShip(shipsSet.shipLen);
        });
    };

    placeShip = (shipLen) => {
        let ship = new Ship(shipLen);
        this.ships.push(ship);
        let success = false;

        while(!success) {
            let row = genRandom(0, 9);
            let column = genRandom(0, 9);
            if (this.map[row][column] !== this.FREE_CELL) continue;

            success |= this.tryToPlaceHorizontally(ship, row, column);
            if (!success) success |= this.tryToPlaceVertically(ship, row, column);
        }
    };

    tryToPlaceHorizontally = (ship, row, column) => {
        let success = true;

        //success &= row === 0 || this.map[row - 1][column] === this.FREE_CELL;
        //success &= row + ship.len + 1 >= 9 || this.map[row + ship.len + 1][column] === this.FREE_CELL;

        for (let i = -1; i < ship.len + 1 && success; i++) {
            if (row + i > 10 || row + i < -1) success = false;
            else if (row + i === 10 || row + i === -1) continue;
            else if (this.map[row + i][column] !== this.FREE_CELL ||
                (column > 0 && this.map[row + i][column - 1] !== this.FREE_CELL || column === 0) ||
                (column < 9 && this.map[row + i][column + 1] !== this.FREE_CELL || column === 9)
            ) success = false;
        }

        for (let i = 0; i < ship.len && success; i++) {
            this.map[row + i][column] = ship.id;
            ship.occupiedCells.push([row + i, column]);
        }

        return success;
    };

    tryToPlaceVertically = (ship, row, column) => {
        let success = true;

        //success &= column === 0 || this.map[row][column - 1] === this.FREE_CELL;
        //success &= column + ship.len + 1 >= 9 || this.map[row][column + ship.len + 1] === this.FREE_CELL;

        for (let i = -1; i < ship.len + 1 && success; i++) {
            if (column + i > 10 || column + i < -1) success = false;
            else if (column + i === 10 || column + i === -1) continue;
            else if (this.map[row][column + i] !== this.FREE_CELL ||
                (row > 0 && this.map[row - 1][column + i] !== this.FREE_CELL || row === 0) ||
                (row < 9 && this.map[row + 1][column + i] !== this.FREE_CELL || row === 9)
            ) success = false;
        }

        for (let i = 0; i < ship.len && success; i++) {
            this.map[row][column + i] = ship.id;
            ship.occupiedCells.push([row, column + i]);
        }

        return success;
    }
}

export default Field;