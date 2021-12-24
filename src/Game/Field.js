import Ship from "./Ship";
import {genRandom} from "../utils";
import {Cell} from "./Cell";

class Field {
    map;
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
            .map(() => Array(10).fill(0, 0, 11));

        for (let row = 0; row < 10; row++)
            for (let column = 0; column < 10; column++)
                this.map[row][column] = new Cell(row, column);

        this.initMap();
        console.log(this);
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
            if (!this.map[row][column].isEmpty()) continue;

            success |= this.tryToPlaceHorizontally(ship, row, column);
            if (!success) success |= this.tryToPlaceVertically(ship, row, column);
        }
    };

    tryToPlaceHorizontally = (ship, row, column) => {
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

    tryToPlaceVertically = (ship, row, column) => {
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
        this.ships.forEach(ship => {
            if (ship.hit(row, column)) console.log(ship.id);
        });
    }
}

export default Field;