import React, {useEffect, useState} from "react";
import {GameManager} from "../../Game/GameManager";
import {genId} from "../../utils";

let game = new GameManager();
let field = game.players[1].field;
window.field = field;
window.game = game;
function App() {
    let Map = [];
    const [hitRow, setHitRow] = useState(-1);
    const [name, setName] = useState("");
    field.map.forEach((row, rowIndex) => {
        let cells = [];
        row.forEach((column, columnIndex) => {
            cells.push(<div key={columnIndex} onClick={() => game.players[0].performHit(rowIndex, columnIndex)}>
                <p>{field.map[rowIndex][columnIndex].value}</p>
                <p>{field.map[rowIndex][columnIndex].isHit() ? "Hit" : "free"}</p>
            </div>);
        });
        Map.push(<div key={rowIndex}>{cells}</div>);
    });

    useEffect(() => {
        game.subscribe(() => setHitRow(genId()));
    }, []);


    return (
        <>
            <div className="App">
                {game.state.started && Map}
                {!game.state.initialized &&
                <div>
                    <label>
                        {game.players.find((player) => player.id === game.state.currentInitializingPlayerId).isAI ? "AI" : "Player"}
                        name
                        <input value={name} onChange={(e) => setName(e.target.value)}/>
                        <button onClick={() => game.initializeNextPlayer(name)}>Set name</button>
                    </label>
                </div>
                }
                {
                    game.state.initialized && !game.state.started &&
                        <button onClick={() => game.startGame()}>Start</button>
                }
                {
                    game.state.finished &&
                        <div>{game.state.winner.name} won!</div>
                }
            </div>
        </>
    );
}

export default App;
