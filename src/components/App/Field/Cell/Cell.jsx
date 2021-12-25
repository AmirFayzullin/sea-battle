import React from 'react';
import s from './Cell.module.css';

const Cell = ({isMyCell, value, isHit, performHit}) => {
    return (
        <div onClick={() => performHit()} className={s.cell}>
            {
                isHit &&
                <p>{value + " hit"}</p>
            }
            {
                !isHit && !isMyCell &&
                <p>{value}</p>
            }
            {
                !isHit && isMyCell &&
                <p>{-1}</p>
            }
        </div>
    )
};

export default Cell;