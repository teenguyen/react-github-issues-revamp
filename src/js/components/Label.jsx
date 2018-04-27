import React from 'react';

export default function Label(props) {
    let onClickEvent = props.onClick || null;
    let style = {
        backgroundColor: `#${props.color}`
    };
    
    if (onClickEvent) {
        style = {
            backgroundColor: `#${props.color}`,
            cursor: 'pointer'
        }
    };

    function handleClick() {
        if (onClickEvent) {
            onClickEvent();
        }
    }

    return (
        <span className="label" style={style} onClick={() => handleClick()}>
            {props.name}
        </span>
    );
}