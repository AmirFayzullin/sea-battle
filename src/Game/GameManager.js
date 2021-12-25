import {genId} from "../utils";
import {AIPlayer, Player} from "./Player";

export class GameManager {
    id;
    _playerIdWithCurrentTurn;
    players = [];
    listeners = [];
    state = {
        initialized: false,
        currentInitializingPlayerId: null,
        started: false,
        finished: false,
        winner: null,
    };

    constructor() {
        this.id = genId();
        this.players = [new Player(this), new AIPlayer(this)];
        this.state.currentInitializingPlayerId = this.players[0].id;
    }

    initializeNextPlayer = (name) => {
        let player = this.players.find(player => player.id === this.state.currentInitializingPlayerId);
        player.initialize(name);
        let uninitializedPlayer = this.players.find(player => !player.isInitialized());

        if (!uninitializedPlayer) {
            this.state = {...this.state, initialized: true, currentInitializingPlayerId: null};
            this._startGame();
        }
        else this.state.currentInitializingPlayerId = uninitializedPlayer.id;
        this.notifyListeners();
    };

    _startGame = () => {
        if (!this.state.initialized) return;
        this.state.started = true;
        this._playerIdWithCurrentTurn = this.players.find(player => !player.isAI).id;
        this.notifyListeners();
    };

    subscribe = (handler) => {
        this.listeners.push(handler);
    };

    performHit = (row, column) => {
        const victim = this.getIdlePlayer();
        victim.takeHit(row, column);

        if (victim.isLose()) {
            this.state = {
                ...this.state,
                winner: this.getActivePlayer(),
                finished: true
            };
            this._playerIdWithCurrentTurn = null;
        }
        else {
            this._playerIdWithCurrentTurn = victim.id;
        }
        this.notifyListeners();
    };

    getActivePlayer = () => this.players.find(player => player.id === this._playerIdWithCurrentTurn);
    getIdlePlayer = () => this.players.find(player => player.id !== this._playerIdWithCurrentTurn);
    getRealPlayer = () => this.players.find(player => !player.isAI);
    getAIPlayer = () => this.players.find(player => player.isAI);

    getPlayerById = (id) => this.players.find(player => player.id === id);

    notifyListeners = () => {
        this.listeners.forEach(listener => listener());
    }
}