import React from 'react';
import {connect} from "react-redux";
import Button from "../formControls/Button/Button";
import s from './ResultsWidget.module.css';

const ResultsWidget = ({winner, startNewGame}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.widget}>
                <div className={s.title}>
                    { winner?.name + " won!" }
                </div>
                <Button onClick={() => startNewGame()}>Play again!</Button>
            </div>
        </div>
    );
};

const mstp = (state) => ({
    winner: state.game.gameState?.winner
});

export default connect(mstp)(ResultsWidget);