import Field from "./Field";
import {genId, genRandom} from "../utils";

export class Player {
    id;
    field;
    name;
    _gameManager;
    _myTurn = false;

    constructor(name, gameManager) {
        this.id = genId();
        this.field = new Field();
        this.name = name;
        this._gameManager = gameManager;
        this._gameManager.subscribe(this._handleManagerUpdate);
    }

    _handleManagerUpdate = () => {
        this._myTurn = this._gameManager.playerIdWithCurrentTurn === this.id;
        this._onManagerUpdate();
    };

    _onManagerUpdate = () => {

    };

    performHit = (row, column) => {
        if (!this._myTurn) return;
        this._gameManager.performHit(row, column);
    };

    takeHit = (row, column) => {
        this.field.performHit(row, column);
    };

    isLose = () => this.field.areAllShipsDestroyed();
}

export class AIPlayer extends Player {
    constructor(name, gameManager) {
        super(name, gameManager);
        this.unhitCells = Array(100);
        for (let row = 0; row < 10; row++)
            for (let column = 0; column < 10; column++)
                this.unhitCells[row * 10 + column] = {row, column};
    }

    _onManagerUpdate = () => {
        if (!this._myTurn) return;
        let hitPerformed = false;

        while (!hitPerformed) {
            const i = genRandom(0, this.unhitCells.length - 1);

            this.performHit(this.unhitCells[i].row, this.unhitCells[i].column);
            this.unhitCells = this.unhitCells.filter(cell => cell !== this.unhitCells[i]);
            hitPerformed = true;
        }
    };
}