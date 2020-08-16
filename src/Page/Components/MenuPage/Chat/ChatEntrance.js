
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd';
import './Chat.css'

export class ChatEntrance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // phoneNum: sessionStorage.getItem('phoneNum'),
            // name: sessionStorage.getItem('name'),
            // id: sessionStorage.getItem('id'),
        }
        this.handleToMeetClick = this.handleToMeetClick.bind(this)
    }

    componentDidMount() {
        // window._SOCKET_.on('creatconnect', (res) => { console.log(res) })
    }

    handleToMeetClick() {


        window._SOCKET_.connect('http://127.0.0.1:7001');
        
        console.log('ChatEntrance组件开启socket:',window._SOCKET_)
        
        
        //发出配对请求
        window._SOCKET_.emit('tomeet',{'userInfo':this.props.userInfo});
        this.props.changeChatPageToMeet(1);
        message.success('正在匹配，请耐心等候')
    }



    render() {
        return (
            <div className="flex chatbackgroundimage">
                <button className="inputbutton" onClick={this.handleToMeetClick}>去遇见</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    userInfo: state.mainPageReducer.userInfo,
})

const mapDispatchToProps = (dispatch) => ({
    changeChatPageToMeet(chatPageToMeet) {
        let action = {
            type: 'CHANGE_CHATPAGE_TOMEET',
            chatPageToMeet
        }
        dispatch(action);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatEntrance)
