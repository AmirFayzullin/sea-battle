import React from 'react';
import Cell from "../Cell/Cell";
import cn from 'classnames';
import s from './Ship.module.css';

const Ship = ({ship, myShip, performHit}) => {
    const occupiedCells = ship._occupiedCells;
    const len = ship._occupiedCells.length;
    const cells = occupiedCells.map((cell, index) =>
        <Cell
            key={index}
            performHit={() => !myShip && performHit(cell.row, cell.column)}
            isHit={cell.isHit()}
            isShip={cell.isShip()}
            isMyCell={myShip}
        />
    );

    let horizontal;
    if (len === 1) horizontal = true;
    else horizontal = occupiedCells[0].column < occupiedCells[1].column;

    let style;
    if (horizontal) {
        style = {
            gridColumn: `${occupiedCells[0].column + 1} / ${occupiedCells[0].column + 1 + len}`,
            gridRow: `${occupiedCells[0].row + 1} / ${occupiedCells[0].row + 2}`
        }
    } else {
        style = {
            gridRow: `${occupiedCells[0].row + 1} / ${occupiedCells[0].row + 1 + len}`,
            gridColumn: `${occupiedCells[0].column + 1} / ${occupiedCells[0].column + 2}`
        }
    }

    return (
        <div style={style}
             className={cn(s.wrapper, {
                 [s.horizontal]: horizontal,
                 [s.vertical]: !horizontal
             })}
        >
            {cells}
        </div>
    )
};

export default Ship;