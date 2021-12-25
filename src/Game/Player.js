import Field from "./Field";
import {genId, genRandom} from "../utils";

export class Player {
    id;
    isAI = false;
    field;
    name = null;
    _gameManager;
    _myTurn = false;

    constructor(gameManager) {
        this.id = genId();
        this.field = new Field();

        while(!this.field.isInitialized()) this.field = new Field();

        this._gameManager = gameManager;
        this._gameManager.subscribe(this._handleManagerUpdate);
    }

    initialize = (name) => {
        this.name = this.name || name;
    };

    isInitialized = () => !!this.name;

    _handleManagerUpdate = () => {
        let activePlayer = this._gameManager.getActivePlayer();
        this._myTurn = activePlayer && activePlayer.id === this.id;
        this._onManagerUpdate();
    };

    _onManagerUpdate = () => {

    };

    performHit = (row, column) => {
        if (!this._myTurn) return;
        this._gameManager.performHit(row, column);
    };

    takeHit = (row, column) => {
        return this.field.performHit(row, column);
    };

    isLose = () => this.field.areAllShipsDestroyed();
}

export class AIPlayer extends Player {
    constructor(gameManager) {
        super(gameManager);
        this.isAI = true;
        this.unhitCells = Array(100);
        for (let row = 0; row < 10; row++)
            for (let column = 0; column < 10; column++)
                this.unhitCells[row * 10 + column] = {row, column};
    }

    _onManagerUpdate = () => {
        this._makeTurn();
    };

    _makeTurn = () => {
        if (!this._myTurn) return;
        let hitPerformed = false;
        setTimeout(() => {
            while (!hitPerformed) {
                const i = genRandom(0, this.unhitCells.length - 1);

                this.performHit(this.unhitCells[i].row, this.unhitCells[i].column);
                this.unhitCells = this.unhitCells.filter(cell => cell !== this.unhitCells[i]);
                hitPerformed = true;
            }
        }, 1000);
    }
}