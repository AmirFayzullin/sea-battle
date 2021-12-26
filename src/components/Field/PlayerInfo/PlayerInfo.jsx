import React from 'react';
import s from './PlayerInfo.module.css';
import ShipInfo from "./ShipInfo/ShipInfo";

// renders player information(left ships, name)
// player = Player instance
const PlayerInfo = ({player}) => {
    let shipsData = []; // [{len, count}] len - ship length, count - amount of ships with "len" length

    // filling shipsData
    player.field.ships.forEach((ship) => {
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

    // creates ShipInfo basing on shipsData
    let shipsDataView = shipsData.map(
        (shipData, index) => <ShipInfo {...shipData} key={index}/>
        );

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