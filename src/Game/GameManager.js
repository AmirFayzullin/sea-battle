import {genId} from "../utils";
import {AIPlayer, Player} from "./Player";

export class GameManager {
    id;
    players = [];
    _listeners = [];
    state = {
        initialized: false,
        currentInitializingPlayer: null,
        started: false,
        finished: false,
        playerMakingTurn: null,
        winner: null,

    };

    constructor() {
        this.id = genId();
        this.players = [new Player(this), new AIPlayer(this)];
        this.state.currentInitializingPlayer = this.players[0];
    }

    initializeNextPlayer = (name) => {
        this.state.currentInitializingPlayer.initialize(name);
        let uninitializedPlayer = this.players.find(player => !player.isInitialized());

        if (!uninitializedPlayer) {
            this.state = {
                ...this.state,
                initialized: true,
                currentInitializingPlayer: null
            };
            this._startGame();
        }
        else this.state.currentInitializingPlayer = uninitializedPlayer;
        this._notifyListeners();
    };

    _startGame = () => {
        if (!this.state.initialized) return;
        this.state = {
            ...this.state,
            started: true,
            playerMakingTurn: this.getRealPlayer(),
        };

        this._notifyListeners();
    };

    subscribe = (handler) => {
        this._listeners = [...this._listeners, handler];
    };

    performHit = (row, column) => {
        const victim = this.getIdlePlayer();
        if (victim.field.isHitCell(row, column)) return;

        const shipHit = victim.takeHit(row, column);

        if (victim.isLose()) {
            this.state = {
                ...this.state,
                winner: this.getActivePlayer(),
                finished: true,
                playerMakingTurn: null
            };
        }
        else if (!shipHit) {
            this._changePlayerMakingTurn();
        }
        this._notifyListeners();
    };

    _changePlayerMakingTurn = () => {
        this.state.playerMakingTurn = this.getIdlePlayer();
    };

    getActivePlayer = () => this.state.playerMakingTurn;
    getIdlePlayer = () => this.players.find(player => player.id !== this.state.playerMakingTurn.id);
    getRealPlayer = () => this.players.find(player => !player.isAI);
    getAIPlayer = () => this.players.find(player => player.isAI);

    _notifyListeners = () => {
        this._listeners.forEach(listener => listener());
    }
}

export class GameManagerFactory {
    DEFAULT_SETTINGS = {
        listeners: []
    };

    createGameManager = (s) => {
        const settings = {...this.DEFAULT_SETTINGS, ...s};
        let manager = new GameManager();

        settings.listeners.forEach(listener => manager.subscribe(listener));
        return manager;
    }

}
