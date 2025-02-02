import React, { Component } from 'react'
import { connect } from 'react-redux'

import { message,Button } from 'antd';
import oppositeIcon from '../../../images/robot.png'
import selfIcon from '../../../images/3.png'

import { sendRobotMsg } from '../../../service/api'

import './Robot.css'

class Message extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        message.destroy();
    }

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
                            ref={(el) => { this.messagesEnd=el }}>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


// onClick={(event)=>{this.event.target.value = "";}}

class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleEnterKey = this.handleEnterKey.bind(this);
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

        let robotPageMessage = { content: value, self: true };
        setTimeout(()=>{this.props.addRobotPageMessage(robotPageMessage)},0);

        this.setState({
            value: '',
        })

        let parameters = {
            text: value,
            id: this.props.userInfo.id
        }

        sendRobotMsg(parameters).then((res) => {
            let robotPageMessage = { content: res, self: false };
            this.props.addRobotPageMessage(robotPageMessage)
        })

    }



    render() {
        return (
            <div id="uesrtext">
                <textarea
                    placeholder="按 Enter 发送, 发送 To-Espory 触发彩蛋"
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
        let { robotPageMessage, addRobotPageMessage, userInfo, } = this.props;
        return (
            <div className="main" >
                <div>
                    <Message
                        messages={robotPageMessage}
                        icon={this.state.icon}></Message>
                    <Text
                        addRobotPageMessage={addRobotPageMessage}
                        userInfo={userInfo}>
                    </Text>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    userInfo: state.mainPageReducer.userInfo,
    robotPageMessage: state.robotPageReducer.robotPageMessage,
})

const mapDispatchToProps = (dispatch) => ({
    addRobotPageMessage(robotPageMessage) {
        let action = {
            type: 'ADD_ROBOTPAGE_MESSAGE',
            robotPageMessage
        }
        dispatch(action);
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
