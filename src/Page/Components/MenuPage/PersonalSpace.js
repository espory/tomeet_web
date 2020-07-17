import React from 'react';
import './PersonalSpace.css'

function PersonalSpace(props) {
    let style = {
        backgroundImage: 'url(' + require('../../../images/space.png') + ')'             //非常值得注意的一点
    }
    return (
        props.currentSessionId === 3 ?
            <div className="main" style={style} /> : <div className="main" />
    )
}

export default PersonalSpace
