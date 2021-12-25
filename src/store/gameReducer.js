import {GameManager} from "../Game/GameManager";

const initialState = {
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

        case START_NEW_GAME:
            const manager = new GameManager();

            newState = {
                ...initialState,
                manager,
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

export const startNewGame = () => ({type: START_NEW_GAME});
export const initializeNextPlayer = (name) => ({type: INITIALIZE_NEXT_PLAYER, name});
export const performHit = (row, column) => ({type: PERFORM_HIT, row, column});

export default gameReducer;