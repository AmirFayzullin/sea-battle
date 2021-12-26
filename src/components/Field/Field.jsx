import React from 'react';
import Map from "./Map/Map";
import s from './Field.module.css';
import PlayerInfo from "./PlayerInfo/PlayerInfo";

const Field = ({map, player, field, isMyField, performHit}) => {

    return (
        <div className={s.field}>
            <div className={s.info}>
                <PlayerInfo player={player}/>
            </div>
            <div className={s.map}>
                <Map map={map} field={field} isMyField={isMyField} performHit={performHit}/>
            </div>
        </div>
    )
};

export default Field;