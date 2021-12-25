import {GameManagerFactory} from "../Game/GameManager";

const initialState = {
    managerFactory: new GameManagerFactory(),
    manager: null,
    gameState: null,
    enemyField: null,
    myField: null,
    initializingPlayer: null,
    gameLaunched: false,
};

const START_NEW_GAME = "GAME/START_NEW_GAME";
const INITIALIZE_NEXT_PLAYER = "GAME/INITIALIZE_NEW_PLAYER";
const PERFORM_HIT = "GAME/PERFORM_HIT";
const HANDLE_MANAGER_UPDATE = "GAME/HANDLE_MANAGER_UPDATE";

const gameReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case PERFORM_HIT:
            let player = state.manager.getRealPlayer();
            player.performHit(action.row, action.column);
            newState = {...state};
            break;

        case INITIALIZE_NEXT_PLAYER:
            state.manager.initializeNextPlayer(action.name);
            newState = {...state};
            break;

        case HANDLE_MANAGER_UPDATE:
            newState = {...state};
            break;

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
        initializingPlayer: newState.manager.getPlayerById(newState.manager.state.currentInitializingPlayerId),
    }
};

export const startNewGame = (manager) => ({type: START_NEW_GAME, manager});
export const initializeNextPlayer = (name) => ({type: INITIALIZE_NEXT_PLAYER, name});
export const performHit = (row, column) => ({type: PERFORM_HIT, row, column});
export const handleGameManagerUpdate = () => ({type: HANDLE_MANAGER_UPDATE});

export default gameReducer;