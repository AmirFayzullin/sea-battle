import React from 'react';
import s from './PlayerInfo.module.css';
import ShipInfo from "./ShipInfo/ShipInfo";

const PlayerInfo = ({player}) => {
    const shipsLeft = player.field._ships.reduce(
        (prev, current) => prev + (current.isDestroyed() ? 0 : current.len),
        0
    );

    let shipsData = []; // [{len, count}]

    player.field._ships.forEach((ship) => {
        let existingShipsData = shipsData.find(shipData => shipData.len === ship.len);

        if (!existingShipsData) {
            shipsData.push({
                len: ship.len,
                count: ship.isDestroyed() ? 0 : 1
            });
        } else {
            existingShipsData.count += ship.isDestroyed() ? 0 : 1;
        }
    });

    let shipsDataView = shipsData.map((shipData, index) => <ShipInfo {...shipData} key={index}/>);

    return (
        <div className={s.wrapper}>
            <p className={s.name}>{player.name}</p>
            <p className={s.ships}>
                {shipsDataView}
            </p>
        </div>
    )
};

export default PlayerInfo;