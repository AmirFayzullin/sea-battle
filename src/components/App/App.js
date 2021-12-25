import React, {useState} from "react";
import {connect} from 'react-redux';

const App = ({
                 enemyField, initialized, finished,
                 started, initializingPlayerIsAI, winner
}) => {
    let map = [];
    const [hitRow, setHitRow] = useState(-1);
    const [name, setName] = useState("");
    enemyField?.map.forEach((row, rowIndex) => {
        let cells = [];
        row.forEach((column, columnIndex) => {
            cells.push(<div key={columnIndex}>
                <p>{enemyField.map[rowIndex][columnIndex].value}</p>
                <p>{enemyField.map[rowIndex][columnIndex].isHit() ? "Hit" : "free"}</p>
            </div>);
        });
        map.push(<div key={rowIndex}>{cells}</div>);
    });

    return (
        <>
            <div className="App">
                {started && map}
                {!initialized &&
                <div>
                    <label>
                        {initializingPlayerIsAI ? "AI" : "Player"}
                        name
                        <input value={name} onChange={(e) => setName(e.target.value)}/>
                        <button>Set name</button>
                    </label>
                </div>
                }
                {
                    initialized && !started &&
                        <button>Start</button>
                }
                {
                    finished &&
                        <div>
                            <div>{winner.name} won!</div>
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
        initialized: gameState?.initialized,
        started: gameState?.started,
        finished: gameState?.finished,
        winner: gameState?.winner,
        initializingPlayerIsAI: state.game.initializingPlayer?.isAI,
    };
};

export default connect(mstp)(App);
