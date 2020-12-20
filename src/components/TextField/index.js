

import React, { useState } from 'react';
import './styles.scss';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const TextField = ({
    type,
    placeholder,
    value,
    onChange,
    isIconRequired,
    style,
    label,
    onKeyDown
}) => {

    const [passw, setPass] = useState(false);

    const textfieldtype = type === "text" ? "text" : passw ? "text" : "password";

    return (
        <div className="textFieldContainer">
            <p style={{fontSize: '0.6em', marginBottom: 0, marginLeft: 10, fontWeight: '200'}}>
                {label ? label : null} 
            </p>
            <input
                type={textfieldtype}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="textfield"
                style={{...style}}
                onKeyDown={ (e) => onKeyDown ? onKeyDown(e) : () => {}}
            />
            {
                isIconRequired && (
                    <div className="searchIcon" onClick={() => setPass(passw => !passw)}>
                        {
                            passw ? <Visibility style={{ color: 'black' }} fontSize="default" />
                            : <VisibilityOff style={{ color: 'black' }} fontSize="default" />
                        }
                    </div>
                )
            }
        </div>
    );
};

export default TextField;