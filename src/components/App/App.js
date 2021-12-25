import React, {useState} from "react";
import {connect} from 'react-redux';
import {initializeNextPlayer, performHit, startNewGame} from "../../store/gameReducer";

const App = ({
                 enemyField, initialized, finished,
                 started, initializingPlayerIsAI, winner,
                 startNewGame, initializeNextPlayer,
                 performHit, gameLaunched, myField
}) => {
    let enemyMap = [];
    let myMap = [];
    const [name, setName] = useState("");
    enemyField?.map?.forEach((row, rowIndex) => {
        let cells = [];
        row.forEach((column, columnIndex) => {
            cells.push(<div key={columnIndex} onClick={() => performHit(rowIndex, columnIndex)}>
                <p>{enemyField.map[rowIndex][columnIndex].value}</p>
                <p>{enemyField.map[rowIndex][columnIndex].isHit() ? "Hit" : "free"}</p>
            </div>);
        });
        enemyMap.push(<div key={rowIndex}>{cells}</div>);
    });

    myField?.map?.forEach((row, rowIndex) => {
        let cells = [];
        row.forEach((column, columnIndex) => {
            cells.push(<div key={columnIndex}>
                <p>{myField.map[rowIndex][columnIndex].value}</p>
                <p>{myField.map[rowIndex][columnIndex].isHit() ? "Hit" : "free"}</p>
            </div>);
        });
        myMap.push(<div key={rowIndex}>{cells}</div>);
    });

    if (!gameLaunched) return <div onClick={startNewGame}>Launch</div>;

    return (
        <>
            <div className="App">
                {started &&
                    <div>
                        <div>{enemyMap}</div>
                        <div>{myMap}</div>
                    </div>

                }
                {!initialized &&
                <div>
                    <label>
                        {initializingPlayerIsAI ? "AI" : "Player"}
                        name
                        <input value={name} onChange={(e) => setName(e.target.value)}/>
                        <button onClick={() => initializeNextPlayer(name)}>Set name</button>
                    </label>
                </div>
                }
                {
                    finished &&
                        <div>
                            <div>{winner.name} won!</div>
                            <div onClick={() => startNewGame()}>Play again</div>
                        </div>

                }
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
        winner: gameState?.winner,
        initializingPlayerIsAI: state.game.initializingPlayer?.isAI,
        gameLaunched: state.game.gameLaunched,
    };
};

export default connect(mstp, {
    startNewGame, initializeNextPlayer, performHit,
})(App);
