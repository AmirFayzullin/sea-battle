import React from "react";
import {connect} from 'react-redux';
import {handleGameManagerUpdate, performHit, startNewGame} from "../../../store/gameReducer";
import PlayersInitializationWidget from "../PlayersInitializationWidget/PlayersInitializationWidget";
import ResultsWidget from "../ResultsWidget/ResultsWidget";
import Field from "../Field/Field";
import Scene from "../Scene/Scene";

const App = ({
                 enemyField, initialized, finished,
                 started, startNewGame, performHit,
                 gameLaunched, myField, gameManagerFactory,
                 handleGameManagerUpdate
}) => {
    const newGame = () => {
        // setTimeout because without it "Reducer may not dispatch actions" error occurs, it seems like redux issue
        // https://github.com/reduxjs/redux-thunk/issues/122

        const gameManager = gameManagerFactory.createGameManager({
            listeners: [
                () => setTimeout(() => handleGameManagerUpdate())
            ]
        });
        startNewGame(gameManager);
    };

    if (!gameLaunched) return <div onClick={() => newGame()}>Launch</div>;

    return (
        <>
            <div className="App">
                {started && <Scene/>}
                {!initialized && <PlayersInitializationWidget/>}
                {finished && <ResultsWidget startNewGame={() => newGame()}/>}
            </div>
        </>
    );
};

const mstp = (state) => {
    const gameState = state.game.gameState;
    return {
        gameManagerFactory: state.game.managerFactory,
        enemyField: state.game.enemyField,
        myField: state.game.myField,
        initialized: gameState?.initialized,
        started: gameState?.started,
        finished: gameState?.finished,
        gameLaunched: state.game.gameLaunched,
    };
};

export default connect(mstp, {
    startNewGame, performHit, handleGameManagerUpdate
})(App);
