import React from 'react';
import s from './Input.module.css';
import cn from "classnames";
import controlS from './../formControl.module.css';

const Input = ({value, onChange, className, type = "text"}) => {
    return <input type={type}
                  className={cn(s.input, controlS.control, className)}
                  value={value}
                  onChange={onChange}
    />
};

export default Input;