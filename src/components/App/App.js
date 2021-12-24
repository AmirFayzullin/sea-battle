import Field from "../../Game/Field";

let field = new Field();
function App() {
    let Map = [];
    field.map.forEach((row, rowIndex) => {
        let cells = [];
       row.forEach((column, columnIndex) => {
           cells.push(<div>{field.map[rowIndex][columnIndex]}</div>);
       });
        Map.push(<div>{cells}</div>);
    });
    return (
        <div className="App">
            {Map}
        </div>
    );
}

export default App;
