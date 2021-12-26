import React from 'react';
import cn from 'classnames';
import s from './Cell.module.css';

const Cell = ({isMyCell, isShip, isHit, performHit, destroyedShip = false}) => {
    const style = cn(s.cell, {
        [s.hit]: isHit,
        [s.enemyCell]: !isMyCell,
        [s.ship]: isShip && (isMyCell || isHit),
        [s.destroyed]: destroyedShip
    });

    return (
        <div onClick={() => performHit()} className={style}>
        </div>
    )
};

export default Cell;