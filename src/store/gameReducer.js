import {GameManager} from "../Game/GameManager";

const initialState = {
    manager: null,
    gameState: null,
    enemyField: null,
    initializingPlayer: null,
};

const START_NEW_GAME = "GAME/START_NEW_GAME";
const INITIALIZE_NEXT_PLAYER = "GAME/INITIALIZE_NEW_PLAYER";
const RUN_GAME = "GAME/RUN_GAME";
const PERFORM_HIT = "GAME/PERFORM_HIT";

const gameReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case PERFORM_HIT:
            let player = state.manager.getRealPlayer();
            player.performHit(action.row, action.column);
            break;

        case RUN_GAME:
            state.manager.startGame();
            break;

        case INITIALIZE_NEXT_PLAYER:
            state.manager.initializeNextPlayer(action.name);
            break;

        case START_NEW_GAME:
            const manager = new GameManager();
            newState = {
                ...state,
                manager,
            };
            break;
        default:
            return state;
    }

    return {
        ...newState,
        gameState: newState.manager.state,
        enemyField: newState.manager.getAIPlayerField(),
        initializingPlayer: newState.manager.getPlayerById(newState.gameState.currentInitializingPlayerId),
    }
};

export default gameReducer;