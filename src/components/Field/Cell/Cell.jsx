import React from 'react';
import cn from 'classnames';
import s from './Cell.module.css';

const Cell = ({isMyCell, value, isHit, performHit}) => {
    const style = cn(s.cell, {
        [s.hit]: isHit,
        [s.enemyCell]: !isMyCell,
        [s.ship]: value !== 0 && isMyCell || value !== 0 && isHit
    });

    return (
        <div onClick={() => performHit()} className={style}> </div>
    )
};

export default Cell;