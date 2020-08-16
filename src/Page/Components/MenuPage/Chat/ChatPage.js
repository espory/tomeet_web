import React, { Component } from 'react'
import { connect } from 'react-redux'

import { message } from 'antd';
import oppositeIcon from '../../../../images/2.png'
import selfIcon from '../../../../images/3.png'

import '../Robot.css'


class Message extends Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        return (
            <div>
                <div id="message" className="MessageContainer" >
                    <div className="MessagesList">
                        {
                            this.props.messages.map((message, index) => {
                                return (
                                    <li key={index}>
                                        {message.self ?
                                            <div className="main" className="self">
                                                <img className="avatar" src={this.props.icon.selfIcon} alt="" />
                                                <p className="text">{message.content}</p>
                                            </div>
                                            :
                                            <div className="main">
                                                <img className="avatar" src={this.props.icon.oppositeIcon} alt="" />
                                                <p className="text">{message.content}</p>
                                            </div>}
                                    </li>)
                            })
                        }
                        <div style={{ float: "left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el }}>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this)
    }

    handleTextChange(event) {
        if (event.target.value !== '\n') {
            this.setState({
                value: event.target.value,
            })
        }
    }

    handleEnterKey() {
        let value = this.state.value;
        if (value === '')
            return;
        if (value === "goodbye") {
            window._SOCKET_.close();
            message.warning('你选择了离开')
            this.props.changeChatPageToMeet(0);

        } else {
            window._SOCKET_.emit('sendMessage', { message: value })
        }
        let chatPageMessage = { content: value, self: true };
        setTimeout(()=>{this.props.addChatPageMessage(chatPageMessage)},0)
        
        this.setState({
            value: '',
        })
    }

    render() {
        return (
            <div id="uesrtext">
                <textarea
                    placeholder="按 Enter 发送, 发送 goodbye 离开"
                    value={this.state.value}
                    onChange={this.handleTextChange}
                    onKeyPressCapture={(event) => {
                        if (event.charCode === 13 && this.state.value) {
                            this.handleEnterKey();

                        }
                    }}></textarea>
            </div>
        )

    }


}

export class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: {
                selfIcon: selfIcon,
                oppositeIcon: oppositeIcon
            },
        }

    }


    render() {
        let { chatPageMessage, changeChatPageToMeet, addChatPageMessage, clearChatPageMessage } = this.props;
        return (
            <div className="main" >
                <div>
                    <Message
                        messages={chatPageMessage}
                        icon={this.state.icon}>
                    </Message>
                    <Text
                        changeChatPageToMeet={changeChatPageToMeet}
                        addChatPageMessage={addChatPageMessage}
                    >
                    </Text>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    chatPageMessage: state.chatPageReducer.chatPageMessage,
})

const mapDispatchToProps = (dispatch) => ({
    changeChatPageToMeet(chatPageToMeet) {
        let action = {
            type: 'CHANGE_CHATPAGE_TOMEET',
            chatPageToMeet
        }
        dispatch(action);
    },
    addChatPageMessage(chatPageMessage) {
        let action = {
            type: 'ADD_CHATPAGE_MESSAGE',
            chatPageMessage
        }
        dispatch(action);
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
