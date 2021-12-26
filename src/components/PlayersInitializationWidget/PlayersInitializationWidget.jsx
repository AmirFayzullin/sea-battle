import React, {useState} from 'react';
import {connect} from 'react-redux';
import {initializeNextPlayer} from "../../store/gameReducer";
import s from './PlayersInitializationWidget.module.css';
import Input from "../formControls/Input/Input";
import Button from "../formControls/Button/Button";

// renders widget which is used to initialize players' names
// isAI = bool, initializeNextPlayer = callback
const PlayersInitializationWidget = ({isAI, initializeNextPlayer}) => {
    const [name, setName] = useState("");

    const initializePlayer = () => {
        initializeNextPlayer(name);
        setName("");
    };

    return (
        <div className={s.wrapper}>
            <div className={s.widget}>
                <div className={s.title}>{isAI ? "AI player name: " : "Player name: "}</div>
                <div className={s.form}>
                    <Input value={name} onChange={(e) => setName(e.target.value)}/>
                    <Button onClick={() => initializePlayer()}
                            disabled={name.length === 0}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
};

const mstp = (state) => ({
    isAI: state.game.initializingPlayer?.isAI
});

export default connect(mstp, {
    initializeNextPlayer
})(PlayersInitializationWidget);