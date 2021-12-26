import React from 'react';
import Field from "../Field/Field";
import {connect} from 'react-redux';
import {performHit} from "../../store/gameReducer";
import SceneHeader from "./SceneHeader/SceneHeader";
import s from './Scene.module.css';

const Scene = ({enemyField, me, enemy, myField, performHit}) => {
    return (
        <div className={s.scene}>
            <header className={s.header}>
                <SceneHeader/>
            </header>
            <div className={s.fields}>
                <Field map={myField.map} player={me} field={myField} performHit={() => {}} isMyField={true}/>
                <Field map={enemyField.map} player={enemy} field={enemyField} performHit={(row, column) => performHit(row, column)} isMyField={false}/>
            </div>
        </div>
    )
};

const mstp = (state) => ({
    enemyField: state.game.enemyField,
    myField: state.game.myField,
    me: state.game.me,
    enemy: state.game.enemy,
});

export default connect(mstp, {performHit})(Scene);