import React from 'react';
import s from './ShipInfo.module.css';
import Cell from "../../Map/Cell/Cell";

// renders information about left ships with certain length
// len = number, count = number
const ShipInfo = ({len, count}) => {

    let shipModel = [];
    for (let i = 0; i < len; i++)
        shipModel.push(
            <Cell key={i} performHit={() => {}} isMyCell={true} isHit={false} isShip={true}/>
        );


    return (
        <div className={s.wrapper}>
            <div className={s.shipModel}>
                {shipModel}
            </div>
            <div className={s.count}>
                {"x" + count}
            </div>
        </div>
    )
};

export default ShipInfo;