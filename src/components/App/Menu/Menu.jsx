import React from 'react';
import s from './Menu.module.css';
import Button from "../formControls/Button/Button";

const Menu = ({startNewGame}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.menu}>
                <div className={s.title}>Sea Battle</div>
                <div className={s.options}>
                    <Button className={s.option} onClick={() => startNewGame()}>Start Game</Button>
                </div>
            </div>
        </div>
    )
};

export default Menu;