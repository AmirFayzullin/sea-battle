import Ship from "./Ship";
import {genRandom} from "../utils";
import {Cell} from "./Cell";


// implements logic connected with field of player
class Field {
    map;                    // 2d matrix of Cell instances
    _DEFAULT_SHIPS_SET = [  // defines which ships should be placed on the map
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

    // defines max iterations count of attempts to place ship on the map to avoid infinite loops
    _PLACING_ATTEMPTS_COUNT = 500;

    ships = [];                             //  stores Ships instances
    _areAllShipsDestroyed = false;          //  tracks are all ships destroyed or not
    _initialized = false;                   //  tracks initialization(it's true when all ships were placed on the map)

    constructor() {
        this.map = Array(10).fill(0, 0, 11)
            .map(() => Array(10).fill(0, 0, 11));

        for (let row = 0; row < 10; row++)
            for (let column = 0; column < 10; column++)
                this.map[row][column] = new Cell(row, column);

        this._initMap();
    }

    // goes via ships set and tries to place them
    _initMap = () => {
        let success = true;
        this._DEFAULT_SHIPS_SET.forEach((shipsSet) => {
            for (let i = 0; i < shipsSet.count; i++) success &= this._placeShip(shipsSet.shipLen);
        });

        this._initialized = success;
    };

    // takes ship length and tries to place it vertically or horizontally
    _placeShip = (shipLen) => {
        let ship = new Ship(shipLen);
        this.ships.push(ship);
        let success = false;
        let counter = this._PLACING_ATTEMPTS_COUNT;

        while(!success && counter--) {
            let row = genRandom(0, 9);
            let column = genRandom(0, 9);
            if (!this.map[row][column].isWater()) continue;

            success |= this._tryToPlaceHorizontally(ship, row, column);
            if (!success) success |= this._tryToPlaceVertically(ship, row, column);
        }

        return success;
    };

    // tries to place ship horizontally starting in specified row and column
    _tryToPlaceHorizontally = (ship, row, column) => {
        let success = true;

        for (let i = -1; i < ship.len + 1 && success; i++) {
            if (row + i > 10 || row + i < -1) success = false;
            else if (row + i === 10 || row + i === -1) continue;
            else if (!this.map[row + i][column].isWater() ||
                (column > 0 && !this.map[row + i][column - 1].isWater() || column === 0) ||
                (column < 9 && !this.map[row + i][column + 1].isWater() || column === 9)
            ) success = false;
        }

        for (let i = 0; i < ship.len && success; i++) {
            this.map[row + i][column].value = ship.id;
            ship.occupiedCells.push(this.map[row + i][column]);
        }

        return success;
    };

    // tries to place ship vertically starting in specified row and column
    _tryToPlaceVertically = (ship, row, column) => {
        let success = true;

        for (let i = -1; i < ship.len + 1 && success; i++) {
            if (column + i > 10 || column + i < -1) success = false;
            else if (column + i === 10 || column + i === -1) continue;
            else if (!this.map[row][column + i].isWater() ||
                (row > 0 && !this.map[row - 1][column + i].isWater() || row === 0) ||
                (row < 9 && !this.map[row + 1][column + i].isWater() || row === 9)
            ) success = false;
        }

        for (let i = 0; i < ship.len && success; i++) {
            this.map[row][column + i].value = ship.id;
            ship.occupiedCells.push(this.map[row][column + i]);
        }

        return success;
    };

    // performs hit on ships and "water" cells
    performHit = (row, column) => {
        let shipHit = false;

        this.ships.forEach(ship => {
            if (ship.hit(row, column)) {
                shipHit = true;
            }
        });

        if (shipHit) this._checkShipsDestroy();
        else this.map[row][column].hit();

        return shipHit;
    };

    // checks are all ships destroyed or not
    _checkShipsDestroy = () => {
        this._areAllShipsDestroyed = this.ships.every(ship => ship.isDestroyed());
    };

    isInitialized = () => this._initialized;
    isHitCell = (row, column) => this.map[row][column].isHit();

    areAllShipsDestroyed = () => this._areAllShipsDestroyed;
}

export default Field;