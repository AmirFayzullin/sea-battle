import React from 'react';
import Cell from "./Cell/Cell";

const Field = ({map, isMyField, performHit}) => {
     map = map.map((row, rowIndex) => {
         let r = row.map((cell, columnIndex) => {
             return <Cell
                 key={columnIndex}
                 performHit={() => isMyField && performHit(rowIndex, columnIndex)}
                 isHit={cell.isHit()}
                 value={cell.value}
                 isMyCell={isMyField}
             />
         });
         return <div>{r}</div>
     });

    return (
        <div>
            {map}
        </div>
    )
};

export default Field;