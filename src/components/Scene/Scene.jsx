import React from 'react';
import Field from "../Field/Field";
import {connect} from 'react-redux';
import {performHit} from "../../store/gameReducer";
import SceneHeader from "./SceneHeader/SceneHeader";
import s from './Scene.module.css';

const Scene = ({enemyField, myField, performHit}) => {
    return (
        <div className={s.scene}>
            <header className={s.header}>
                <SceneHeader/>
            </header>
            <div className={s.fields}>
                <Field map={myField.map} performHit={() => {}} isMyField={true}/>
                <Field map={enemyField.map} performHit={(row, column) => performHit(row, column)} isMyField={false}/>
            </div>
        </div>
    )
};

const mstp = (state) => ({
    enemyField: state.game.enemyField,
    myField: state.game.myField,
});

export default connect(mstp, {performHit})(Scene);