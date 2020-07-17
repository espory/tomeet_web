import React from 'react';
import './PersonalIcon.css'

function PersonalIcon(props) {
    return (
        <div id="card">
            <div>
                <img className="avatar" src={require('../../images/1.png')}></img>
                <p className="name">{props.name}</p>
            </div>
        </div>

    );
}

export default PersonalIcon 
