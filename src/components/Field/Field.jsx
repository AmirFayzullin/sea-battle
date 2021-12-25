import React from 'react';
import Cell from "./Cell/Cell";
import s from './Field.module.css';

const Field = ({map, isMyField, performHit}) => {
     map = map.map((row, rowIndex) => {
         let r = row.map((cell, columnIndex) => {
             return <Cell
                 key={columnIndex}
                 performHit={() => !isMyField && performHit(rowIndex, columnIndex)}
                 isHit={cell.isHit()}
                 isShip={cell.isShip()}
                 isMyCell={isMyField}
             />
         });
         return <div className={s.row} key={rowIndex}>{r}</div>
     });

    return (
        <div className={s.field}>
            {map}
        </div>
    )
};

export default Field;