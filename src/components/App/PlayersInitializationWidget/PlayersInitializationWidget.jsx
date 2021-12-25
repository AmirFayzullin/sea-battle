import React, {useState} from 'react';
import {connect} from 'react-redux';
import {initializeNextPlayer} from "../../../store/gameReducer";

const PlayersInitializationWidget = ({isAI, initializeNextPlayer}) => {
    const [name, setName] = useState("");

    const initializePlayer = () => {
        initializeNextPlayer(name);
        setName("");
    };

    return (
        <div>
            <div>{isAI ? "AI player name: " : "Player name: "}</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={() => initializePlayer()}>Continue</button>
        </div>
    )
};

const mstp = (state) => ({
    isAI: state.game.initializingPlayer?.isAI
});

export default connect(mstp, {
    initializeNextPlayer
})(PlayersInitializationWidget);