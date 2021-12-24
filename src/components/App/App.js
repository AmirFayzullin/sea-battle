import Field from "../../Game/Field";
import {useState} from "react";

let field = new Field();

function App() {
    const [hitRow, setHitRow] = useState(-1);
    const [hitColumn, setHitColumn] = useState(-1);
    let Map = [];
    field.map.forEach((row, rowIndex) => {
        let cells = [];
        row.forEach((column, columnIndex) => {
            cells.push(<div>{field.map[rowIndex][columnIndex].value}</div>);
        });
        Map.push(<div>{cells}</div>);
    });


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
