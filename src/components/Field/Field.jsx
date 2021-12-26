import React from 'react';
import Map from "./Map/Map";
import s from './Field.module.css';
import PlayerInfo from "./PlayerInfo/PlayerInfo";

// renders player information(left ships, name)
// and map of player
// player = Player instance, isMyField = bool, performHit = callback
const Field = ({player, isMyField, performHit}) => {

    return (
        <div className={s.field}>
            <div className={s.info}>
                <PlayerInfo player={player}/>
            </div>
            <div className={s.map}>
                <Map map={player.field.map} ships={player.field.ships} isMyField={isMyField} performHit={performHit}/>
            </div>
        </div>
    )
};

export default Field;