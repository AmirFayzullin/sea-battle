import React from "react";
import {connect} from 'react-redux';
import {performHit, startNewGame} from "../../../store/gameReducer";
import PlayersInitializationWidget from "../PlayersInitializationWidget/PlayersInitializationWidget";
import ResultsWidget from "../ResultsWidget/ResultsWidget";
import Field from "../Field/Field";

const App = ({
                 enemyField, initialized, finished,
                 started, startNewGame, performHit,
                 gameLaunched, myField
}) => {

    if (!gameLaunched) return <div onClick={startNewGame}>Launch</div>;

    return (
        <>
            <div className="App">
                {started &&
                    <div>
                        <Field map={enemyField.map} performHit={(row, column) => performHit(row, column)} isMyField={true}/>
                        <Field map={myField.map} performHit={() => {}} isMyField={false}/>
                    </div>

                }
                {!initialized && <PlayersInitializationWidget/>}
                {finished && <ResultsWidget/>}
            </div>
        </>
    );
};

const mstp = (state) => {
    const gameState = state.game.gameState;
    return {
        enemyField: state.game.enemyField,
        myField: state.game.myField,
        initialized: gameState?.initialized,
        started: gameState?.started,
        finished: gameState?.finished,
        gameLaunched: state.game.gameLaunched,
    };
};

export default connect(mstp, {
    startNewGame, performHit,
})(App);
