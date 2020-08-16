import React from 'react';
import PersonalIcon from './Components/PersonalIcon'
import Menu from './Components/Menu'
import Chat from './Components/MenuPage/Chat/Chat'
import Music from './Components/MenuPage/Music'
import PersonalSpace from './Components/MenuPage/PersonalSpace'
import Robot from './Components/MenuPage/Robot'
import TreeHole from './Components/MenuPage/TreeHole'
import UserInfo from './Components/MenuPage/UserInfo'
import io from 'socket.io-client';

import './MainPage.css'
import { getInfoApi } from "../service/api" // 引入接口
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';

// const socket = io('http://127.0.0.1:7001');


function ListPage(props) {
    let { currentPageId } = props;
    console.log(props)
    if (currentPageId === 1)
        return <Chat />;
    if (currentPageId === 2)
        return <Music />;
    if (currentPageId === 3)
        return <PersonalSpace />;
    if (currentPageId === 4)
        return <TreeHole />;
    if (currentPageId === 5)
        return <Robot />;
    if (currentPageId === 6)
        return <UserInfo />;

    return (<div></div>)
}

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        var sty2 = document.body.style;
        sty2.backgroundImage = "url('./bg.jpg')";
        sty2.backgroundRepeat = 'no-repeat';
        sty2.backgroundSize = 'cover';

        // this.changeToMeet = this.changeToMeet.bind(this);
        this.toUserInfoPage = this.toUserInfoPage.bind(this);
    }

    componentWillMount() {
        window._ROUTER_ = this.props.history;
        window._SOCKET_ = io('http://127.0.0.1:7001')

        //Chat Page 匹配成功 和 断开连接 事件处理
        window._SOCKET_.on('toMeet-Suceess', (res) => {
            console.log(res);
            this.props.changeChatPageToMeet(2);
            message.destroy();
            message.success('匹配成功');
            this.props.saveToMeetUserId(res.toMeetUserId);
            this.props.clearChatPageMessage();

            console.log(this.props.userInfo)

            let { academy, gender, nickName, grade } = this.props.userInfo;
            let msg = `Hi , 我是来自${academy + grade + '的' + gender + (nickName === '未命名' ? '' : nickName)}`
            window._SOCKET_.emit('sendMessage', { 'message': msg })
            // this.props.addChatPageMessage(ChatPageMessage)

        })
        window._SOCKET_.on('toMeet-Disconnection', () => {
            window._SOCKET_.close();
            message.destroy();
            message.warning('对方选择了离开');
            this.props.changeChatPageToMeet(0);
        })

        window._SOCKET_.on('getMessage', (res) => {
            message.destroy();
            if (this.props.currentPageId !== 1) {
                message.warning('您有一条新的消息')
            }

            let ChatPageMessage = {
                content: res.message,
                self: false
            }
            this.props.addChatPageMessage(ChatPageMessage)
        })


        getInfoApi().then(info => {
            let userInfo = {
                id: info.id,
                nickName:info.nickName,
                academy:info.academy,
                grade:info.grade,
                gender:info.gender
            }
            this.props.saveUserInfo(userInfo)
        })
    }


    //跳转到个人设置页面
    toUserInfoPage() {
        this.props.changeCurrentPageId(6)
    }


    render() {
        let { currentPageId, changeCurrentPageId, userInfo } = this.props
        return (
            <div >
                <p className="tip"><img className="logo" src={require('../images/logo.png')} alt="" /></p>
                <div id="app">
                    <div className="sidebar">
                        <div onClick={this.toUserInfoPage}>
                            <PersonalIcon name={userInfo.nickName}></PersonalIcon>
                        </div>
                        <Menu currentPageId={currentPageId} handleClick={(PageId) => { changeCurrentPageId(PageId) }}></Menu>
                    </div>
                    <ListPage currentPageId={currentPageId} />
                </div>
            </div>
        )
    }
}




const mapStateToProps = (state) => ({
    userInfo: state.mainPageReducer.userInfo,
    currentPageId: state.mainPageReducer.currentPageId,
})

const mapDispatchToProps = (dispatch) => ({
    saveUserInfo(userInfo) {
        let action = {
            type: 'SAVE_USER_INFO',
            userInfo
        }
        dispatch(action);
    },
    changeCurrentPageId(PageId) {
        let action = {
            type: 'CHANGE_CURRENT_PAGE_ID',
            PageId
        }
        dispatch(action);
    },
    changeChatPageToMeet(chatPageToMeet) {
        let action = {
            type: 'CHANGE_CHATPAGE_TOMEET',
            chatPageToMeet
        }
        dispatch(action);
    },
    saveToMeetUserId(toMeetUserId) {
        let action = {
            type: 'SAVE_TOMEET_USER_ID',
            toMeetUserId
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
    clearChatPageMessage() {
        let action = {
            type: 'CLEAR_CHATPAGE_MESSAGE'
        }
        dispatch(action);
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage))
