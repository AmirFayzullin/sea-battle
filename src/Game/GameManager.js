import {genId} from "../utils";
import {AIPlayer, Player} from "./Player";

export class GameManager {
    id;
    playerIdWithCurrentTurn;
    players;
    listeners = [];
    winner = null;

    constructor() {
        this.id = genId();
        this.players = [new Player("Amir", this), new AIPlayer("Computer", this)];
        this.playerIdWithCurrentTurn = this.players[0].id;
        this.notifyListeners();
    }

    subscribe = (handler) => {
        this.listeners.push(handler);
    };

    performHit = (row, column) => {
        const victim = this.getIdlePlayer();
        victim.takeHit(row, column);

        if (victim.isLose()) this.winner = this.getActivePlayer();
        else {
            this.playerIdWithCurrentTurn = victim.id;
            this.notifyListeners();
        }
    };

    getActivePlayer = () => this.players.find(player => player.id === this.playerIdWithCurrentTurn);
    getIdlePlayer = () => this.players.find(player => player.id !== this.playerIdWithCurrentTurn);

    notifyListeners = () => {
        this.listeners.forEach(listener => listener());
    }
}