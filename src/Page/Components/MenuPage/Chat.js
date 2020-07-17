import React from 'react';
import './Chat.css'

function Chat(props) {
    let style = {
        backgroundImage: 'url(' + require('../../../images/maletomeet.jpg') + ')'             //非常值得注意的一点
    }
    return (

        props.currentSessionId === 1 ?
            <div class="flex" style={style}>
                <button class="inputbutton">去遇见</button>
            </div> : <div class="flex">
                <button class="inputbutton">去遇见</button>
            </div>

    )
}

export default Chat
