import React from 'react';
import './TreeHole.css'
function TreeHole(props){
    let style = {
        backgroundImage: 'url(' + require('../../../images/tree.png') + ')' 
    }  
    return(
        props.currentSessionId===4?
        <div className="main" style={style} /> : <div className="main" /> 
    )
}

export default TreeHole