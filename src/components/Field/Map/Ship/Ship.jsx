import React from 'react';
import Cell from "../Cell/Cell";
import cn from 'classnames';
import s from './Ship.module.css';

// renders ship
// ship = Ship instance, myShip = bool, performHit = callback
const Ship = ({ship, myShip, performHit}) => {
    const occupiedCells = ship.occupiedCells;
    const len = ship.occupiedCells.length;

    // filling cells of ship
    const cells = occupiedCells.map((cell, index) =>
        <Cell
            key={index}
            performHit={() => !myShip && performHit(cell.row, cell.column)}
            isHit={cell.isHit()}
            isShip={cell.isShip()}
            isMyCell={myShip}
            destroyedShip={ship.isDestroyed()}
        />
    );

    // tracking is it horizontal or not
    let horizontal;
    if (len === 1) horizontal = true;
    else horizontal = occupiedCells[0].column < occupiedCells[1].column;

    // placing ship according to its' orientation and position
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