import React from 'react';
import s from './Button.module.css';
import controlS from './../formControl.module.css';
import cn from 'classnames';

const Button = ({onClick, className, disabled, children}) => {
    const style = cn(s.button, controlS.control, className, {
        [s.disabled]: disabled
    });
    return (
        <div onClick={(e) => !disabled && onClick(e)}
             className={style}
        >
            {children}
        </div>
    )
};

export default Button;