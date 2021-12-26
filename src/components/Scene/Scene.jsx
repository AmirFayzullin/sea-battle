import React from 'react';
import Field from "../Field/Field";
import {connect} from 'react-redux';
import {performHit} from "../../store/gameReducer";
import SceneHeader from "./SceneHeader/SceneHeader";
import s from './Scene.module.css';

// renders scene, where Fields are rendered
// me = Player instance, enemy = Player instance, performHit = callback
const Scene = ({me, enemy, performHit}) => {
    return (
        <div className={s.scene}>
            <header className={s.header}>
                <SceneHeader/>
            </header>
            <div className={s.fields}>
                <Field player={me} performHit={() => {}} isMyField={true}/>
                <Field player={enemy} performHit={(row, column) => performHit(row, column)} isMyField={false}/>
            </div>
        </div>
    )
};

const mstp = (state) => ({
    me: state.game.me,
    enemy: state.game.enemy,
});

export default connect(mstp, {performHit})(Scene);