import React from "react";
import {connect} from 'react-redux';
import {handleGameManagerUpdate, startNewGame} from "../../../store/gameReducer";
import PlayersInitializationWidget from "../PlayersInitializationWidget/PlayersInitializationWidget";
import ResultsWidget from "../ResultsWidget/ResultsWidget";
import Scene from "../Scene/Scene";
import Menu from "../Menu/Menu";
import s from './App.module.css';

const App = ({
                 initialized, finished, started,
                 startNewGame, gameLaunched, gameManagerFactory,
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

    if (!gameLaunched) return (
        <div className={s.app}>
            <Menu startNewGame={() => newGame()}/>
        </div>
    );

    return (
        <div className={s.app}>
            {started && <Scene/>}
            {!initialized && <PlayersInitializationWidget/>}
            {finished && <ResultsWidget startNewGame={() => newGame()}/>}
        </div>
    );
};

const mstp = (state) => {
    const gameState = state.game.gameState;
    return {
        gameManagerFactory: state.game.managerFactory,
        initialized: gameState?.initialized,
        started: gameState?.started,
        finished: gameState?.finished,
        gameLaunched: state.game.gameLaunched,
    };
};

export default connect(mstp, {
    startNewGame, handleGameManagerUpdate
})(App);
