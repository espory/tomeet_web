

import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Chat.css'


export class ChatTrans extends Component {
    constructor(props) {
        super(props);
        this.handleLeaveClick = this.handleLeaveClick.bind(this);
    }

    // componentWillMount(){
    //     window._SOCKET_.on('creatconnect', (res) => {console.log(res) })
    // }

    handleLeaveClick(){
        window._SOCKET_.close();
        console.log('ChatTrans组件关闭socket:',window._SOCKET_)
        this.props.changeChatPageToMeet(0)
    }

    render() {

        return (
            <div className="main">
                <div className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <button className="inputbutton" style={{ float: "none", marginTop: "450px", padding: "0 0 0 0", width: "100px", height: "35px" }} onClick={this.handleLeaveClick}>离开</button>
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    changeChatPageToMeet(chatPageToMeet) {
        let action = {
            type: 'CHANGE_CHATPAGE_TOMEET',
            chatPageToMeet
        }
        dispatch(action);
    }
})


export default connect(null, mapDispatchToProps)(ChatTrans)
