import {GameManagerFactory} from "../Game/GameManager";

const initialState = {
    managerFactory: new GameManagerFactory(),
    manager: null,                          // instance of GameManager
    gameState: null,                        // state of game from GameManager
    me: null,                               // real player (instance of Player)
    enemy: null,                            // AI player (instance of AIPlayer)
    enemyField: null,                       // Field instance of AIPlayer
    myField: null,                          // Field instance of Player
    initializingPlayer: null,               // current initializing player (instance of Player)
    gameLaunched: false,                    // tracks if game started or not
};

// actions types
const START_NEW_GAME = "GAME/START_NEW_GAME";
const INITIALIZE_NEXT_PLAYER = "GAME/INITIALIZE_NEW_PLAYER";
const PERFORM_HIT = "GAME/PERFORM_HIT";
const HANDLE_MANAGER_UPDATE = "GAME/HANDLE_MANAGER_UPDATE";

const gameReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        // performs hit of real player
        case PERFORM_HIT:
            let player = state.manager.getRealPlayer();
            player.performHit(action.row, action.column);
            newState = {...state};
            break;

        // initializes player (name is given in action payload)
        case INITIALIZE_NEXT_PLAYER:
            state.manager.initializeNextPlayer(action.name);
            newState = {...state};
            break;

        // handles game manager update
        case HANDLE_MANAGER_UPDATE:
            newState = {...state};
            break;

        // starts new game with new game manager(given in action payload)
        case START_NEW_GAME:
            newState = {
                ...initialState,
                manager: action.manager,
                gameLaunched: true
            };
            break;
        default:
            return state;
    }


    return {
        ...newState,
        gameState: newState.manager.state,
        enemyField: {...newState.manager.getAIPlayer().field},
        myField: {...newState.manager.getRealPlayer().field},
        me: {...newState.manager.getRealPlayer()},
        enemy: {...newState.manager.getAIPlayer()},
        initializingPlayer: newState.manager.state.currentInitializingPlayer,
    }
};

// actions creators
export const startNewGame = (manager) => ({type: START_NEW_GAME, manager});
export const initializeNextPlayer = (name) => ({type: INITIALIZE_NEXT_PLAYER, name});
export const performHit = (row, column) => ({type: PERFORM_HIT, row, column});
export const handleGameManagerUpdate = () => ({type: HANDLE_MANAGER_UPDATE});

export default gameReducer;