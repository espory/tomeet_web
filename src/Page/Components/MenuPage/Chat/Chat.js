
import './Chat.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChatEntrance from './ChatEntrance'
import ChatTrans from './ChatTrans'
import ChatPage from './ChatPage'


export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameIpt: '',//login 的用户名
            userSay: '',//聊天室里的input
            hide: true,//隐藏聊天室
            userName: '',//进入聊天室之后保存的用户名
            wordList: [],//聊天记录

            toMeet: 0,
        }
    }

    render() {
        let {chatPageToMeet} =  this.props

        if (chatPageToMeet === 0) {
            return (<ChatEntrance />)
        }
        else if (chatPageToMeet === 1) {
            return (<ChatTrans />)
        } else if (chatPageToMeet === 2) {
            return (<ChatPage  />)
        }

    }
}

const mapStateToProps = (state) => ({
    chatPageToMeet: state.chatPageReducer.chatPageToMeet,
})

const mapDispatchToProps = (dispatch)=> ({
    changeChatPageToMeet(chatPageToMeet) {
        let action = {
            type: 'CHANGE_CHATPAGE_TOMEET',
            chatPageToMeet
        }
        dispatch(action);
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Chat)

