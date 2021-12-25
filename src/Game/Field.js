import Ship from "./Ship";
import {genRandom} from "../utils";
import {Cell} from "./Cell";

class Field {
    map;
    _DEFAULT_SHIPS_SET = [
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
    _PLACING_ATTEMPTS_COUNT = 500;
    _ships = [];
    _areAllShipsDestroyed = false;
    _initialized = false;

    constructor() {
        this.map = Array(10).fill(0, 0, 11)
            .map(() => Array(10).fill(0, 0, 11));

        for (let row = 0; row < 10; row++)
            for (let column = 0; column < 10; column++)
                this.map[row][column] = new Cell(row, column);

        this.initMap();
    }

    initMap = () => {
        let success = true;
        this._DEFAULT_SHIPS_SET.forEach((shipsSet) => {
            for (let i = 0; i < shipsSet.count; i++) success &= this.placeShip(shipsSet.shipLen);
        });

        this._initialized = success;
    };

    placeShip = (shipLen) => {
        let ship = new Ship(shipLen);
        this._ships.push(ship);
        let success = false;
        let counter = this._PLACING_ATTEMPTS_COUNT;

        while(!success && counter--) {
            let row = genRandom(0, 9);
            let column = genRandom(0, 9);
            if (!this.map[row][column].isEmpty()) continue;

            success |= this._tryToPlaceHorizontally(ship, row, column);
            if (!success) success |= this._tryToPlaceVertically(ship, row, column);
        }

        return success;
    };

    _tryToPlaceHorizontally = (ship, row, column) => {
        let success = true;

        for (let i = -1; i < ship.len + 1 && success; i++) {
            if (row + i > 10 || row + i < -1) success = false;
            else if (row + i === 10 || row + i === -1) continue;
            else if (!this.map[row + i][column].isEmpty() ||
                (column > 0 && !this.map[row + i][column - 1].isEmpty() || column === 0) ||
                (column < 9 && !this.map[row + i][column + 1].isEmpty() || column === 9)
            ) success = false;
        }

        for (let i = 0; i < ship.len && success; i++) {
            this.map[row + i][column].value = ship.id;
            ship._occupiedCells.push(this.map[row + i][column]);
        }

        return success;
    };

    _tryToPlaceVertically = (ship, row, column) => {
        let success = true;

        for (let i = -1; i < ship.len + 1 && success; i++) {
            if (column + i > 10 || column + i < -1) success = false;
            else if (column + i === 10 || column + i === -1) continue;
            else if (!this.map[row][column + i].isEmpty() ||
                (row > 0 && !this.map[row - 1][column + i].isEmpty() || row === 0) ||
                (row < 9 && !this.map[row + 1][column + i].isEmpty() || row === 9)
            ) success = false;
        }

        for (let i = 0; i < ship.len && success; i++) {
            this.map[row][column + i].value = ship.id;
            ship._occupiedCells.push(this.map[row][column + i]);
        }

        return success;
    };

    performHit = (row, column) => {
        let shipHit = false;

        this._ships.forEach(ship => {
            if (ship.hit(row, column)) {
                shipHit = true;
                console.log(ship.id);
            }
        });

        if (shipHit) this._checkShipsDestroy();
        else this.map[row][column].hit();

        return shipHit;
    };

    _checkShipsDestroy = () => {
        this._areAllShipsDestroyed = this._ships.every(ship => ship.isDestroyed());
    };

    isInitialized = () => this._initialized;

    areAllShipsDestroyed = () => this._areAllShipsDestroyed;
}

export default Field;