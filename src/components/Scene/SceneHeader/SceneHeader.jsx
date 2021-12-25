import React from 'react';
import {connect} from 'react-redux';
import s from './SceneHeader.module.css';

const SceneHeader = ({playerMakingTurnName}) => {
    return (
        <div className={s.sceneHeader}>
            {playerMakingTurnName && (playerMakingTurnName + " makes turn")}
        </div>
    )
};

const mstp = (state) => ({
    playerMakingTurnName: state.game.gameState.playerMakingTurn?.name
});

export default connect(mstp)(SceneHeader);