import React from 'react';
import Cell from "./Cell/Cell";
import s from './Map.module.css';
import Ship from "./Ship/Ship";

const Map = ({map, field, isMyField, performHit}) => {
    let totalShipsLen = 0;
    let ships = field._ships.map((ship, index) => {
        totalShipsLen += ship.len;
        return <Ship key={index} ship={ship} performHit={performHit} myShip={isMyField}/>;
    });

    let emptyCells = [];
    map.flat().forEach((cell, index) => {
        if (cell.isShip()) return;

        emptyCells.push(
            <Cell key={index}
                  performHit={() => !isMyField && performHit(cell.row, cell.column)}
                  isHit={cell.isHit()}
                  isShip={cell.isShip()}
                  isMyCell={isMyField}
            />
        )
    });

    return (
        <div className={s.map}>
            {ships}
            {emptyCells}
        </div>
    )
};

export default Map;