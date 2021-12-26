import React from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import s from './SceneHeader.module.css';

const SceneHeader = ({playerMakingTurnId, me, enemy}) => {
    return (
        <div className={s.sceneHeader}>
            <div className={s.namesWrapper}>
                <p className={s.namePlaceholder}>
                    {
                        ((me.name.length > enemy.name.length) ? me.name : enemy.name) + ".."
                    }
                </p>

                <p className={cn(s.name, {[s.makingTurn]: playerMakingTurnId === me?.id})}>{me.name}</p>
                <p className={cn(s.name, {[s.makingTurn]: playerMakingTurnId === enemy?.id})}>{enemy.name}</p>
            </div>
            <p>makes turn</p>
        </div>
    )
};

const mstp = (state) => ({
    playerMakingTurnId: state.game.gameState.playerMakingTurn?.id,
    me: state.game.me,
    enemy: state.game.enemy,
});

export default connect(mstp)(SceneHeader);