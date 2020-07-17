import React from 'react';
import './Robot.css'
import oppositeIcon from '../../../images/robot.png'
import selfIcon from '../../../images/3.png'


function RobotMessage(props) {
    return (
        <div>
            <div id="message" v-scroll-bottom="true">
                {
                    props.messages.map((message, index) => {
                        return (
                            <li key={index}>
                                {message.self ?
                                    <div className="main" className="self">
                                        <img className="avatar" src={props.icon.selfIcon} alt="" />
                                        <p className="text">{message.content}</p>
                                    </div>
                                    :
                                    <div className="main">
                                        <img className="avatar" src={props.icon.oppositeIcon} alt="" />
                                        <p className="text">{message.content}</p>
                                    </div>}
                            </li>)
                    })}
            </div>
        </div>
    )
}

// onClick={(event)=>{this.event.target.value = "";}}

class RobotText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isClear: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        if (this.isClear && event.target.value !== '') {
            this.isClear = false;
            event.target.value = '';
        }
        this.setState({
            value: event.target.value,
        })
    }

    render() {
        return (
            <div id="uesrtext">
                <textarea placeholder="按 Enter 发送" value={this.state.value} onChange={this.handleChange} onKeyPressCapture={(event) => {
                    // alert(event.charCode)
                    if (event.charCode === 13) {
                        this.props.handleEnterKey(event.target.value);
                        event.target.value = "";
                        this.isClear = true;
                    }
                }}></textarea>
            </div>
        )

    }


}

class Robot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{
                content: 'Hi，欢迎来到遇见',
                self: false
            }],
            icon: {
                selfIcon: selfIcon,
                oppositeIcon: oppositeIcon
            },
            textValue: '',
        }

        this.handleEnterKey = this.handleEnterKey.bind(this);
    }


    handleEnterKey(value) {
        console.log(value);

        // console.log(event.target.value);
        // event.target.value.replace('\n','')
        // // if(event.target.value===''||event.target.value[0]==='\n')
        // //     return '';
        let messages = [...this.state.messages, { content: value, self: true }];
        this.setState({ messages })
        // event.target.value.replace('\n','')
        // event.target.value = "";
        // console.log(this.state.a)


    }

    render() {
        return (
            <div className="main" >
                <div>
                    <RobotMessage messages={this.state.messages} icon={this.state.icon}></RobotMessage>
                    <RobotText handleEnterKey={this.handleEnterKey}></RobotText>
                </div>

            </div>
        )
    }
}


export default Robot