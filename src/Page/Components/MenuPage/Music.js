import React from 'react';
import './Music.css'
function Music(props) {
    let style = {
        backgroundImage: 'url(' + require('../../../images/music.png') + ')'             //非常值得注意的一点
    }


    return (
        props.currentSessionId === 2 ?
            <div className="main" style={style} /> : <div className="main" />
    )
}

export default Music

