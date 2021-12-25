import React from 'react';
import {connect} from "react-redux";
import Button from "../formControls/Button/Button";
import s from './ResultsWidget.module.css';

const ResultsWidget = ({winnerName, startNewGame}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.widget}>
                <div className={s.title}>{"lool"} won!</div>
                <Button onClick={() => startNewGame()}>Play again!</Button>
            </div>
        </div>
    );
};

const mstp = (state) => ({
    winnerName: state.game.gameState.winner?.name
});

export default connect(mstp)(ResultsWidget);