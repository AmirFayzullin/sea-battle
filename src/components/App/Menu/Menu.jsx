import React from 'react';
import s from './Menu.module.css';

const Menu = ({startNewGame}) => {
    return (
        <div className={s.menu}>
            <div onClick={() => startNewGame()}>Start Game</div>
        </div>
    )
};

export default Menu;