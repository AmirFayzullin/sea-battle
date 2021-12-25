import React from 'react';
import {connect} from "react-redux";

const ResultsWidget = ({winnerName, startNewGame}) => {
    return (
        <div>
            <div>{winnerName} won!</div>
            <div onClick={() => startNewGame()}>Play again!</div>
        </div>
    );
};

const mstp = (state) => ({
    winnerName: state.game.gameState.winner.name
});

export default connect(mstp)(ResultsWidget);