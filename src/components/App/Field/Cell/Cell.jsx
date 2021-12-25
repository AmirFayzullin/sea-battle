import React from 'react';

const Cell = ({isMyCell, value, isHit, performHit}) => {
    return (
        <div onClick={() => performHit()}>
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