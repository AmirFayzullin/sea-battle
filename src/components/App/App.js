import Field from "../../Game/Field";
import {useEffect, useState} from "react";
import {GameManager} from "../../Game/GameManager";
import {genId, genRandom} from "../../utils";

let game = new GameManager();
let field = game.players[1].field;
window.field = field;
window.game = game;
function App() {
    const [hitRow, setHitRow] = useState(-1);
    const [hitColumn, setHitColumn] = useState(-1);
    let Map = [];
    field.map.forEach((row, rowIndex) => {
        let cells = [];
        row.forEach((column, columnIndex) => {
            cells.push(<div onClick={() => game.players[0].performHit(rowIndex, columnIndex)}>
                <p>{field.map[rowIndex][columnIndex].value}</p>
                <p>{field.map[rowIndex][columnIndex].isHit() ? "Hit" : "free"}</p>
            </div>);
        });
        Map.push(<div>{cells}</div>);
    });

    useEffect(() => {
        game.subscribe(() => setHitRow(genId()));
    }, []);


    return (
        <>
            <div className="App">
                {Map}
            </div>
            <div>
                <label>Row:
                    <input type="number" onChange={(e) => setHitRow(e.target.value)} value={hitRow}/>
                </label>
                <label>Column:
                    <input type="number" onChange={(e) => setHitColumn(e.target.value)} value={hitColumn}/>
                </label>
                <button onClick={() => field.performHit(+hitRow, +hitColumn)}>Hit!</button>
            </div>
        </>
    );
}

export default App;
