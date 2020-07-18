import React from 'react';
import PersonalIcon from './Components/PersonalIcon'
import Menu from './Components/Menu'
import Chat from './Components/MenuPage/Chat'
import Music from './Components/MenuPage/Music'
import PersonalSpace from './Components/MenuPage/PersonalSpace'
import Robot from './Components/MenuPage/Robot'
import TreeHole from './Components/MenuPage/TreeHole'
import UserInfo from './Components/MenuPage/UserInfo'

import './MainPage.css'
import { getInfoApi} from "../service/api" // 引入接口
import { withRouter } from 'react-router-dom';


function ListPage(props) {

    if (props.currentSessionId === 1)
        return <Chat currentSessionId={props.currentSessionId} />;
    if (props.currentSessionId === 2)
        return <Music currentSessionId={props.currentSessionId} />;
    if (props.currentSessionId === 3)
        return <PersonalSpace currentSessionId={props.currentSessionId} />;
    if (props.currentSessionId === 4)
        return <TreeHole currentSessionId={props.currentSessionId} />;
    if (props.currentSessionId === 5)
        return <Robot />;
    if (props.currentSessionId === 6)
        return <UserInfo />;

    return (<div></div>)
}

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSessionId: 6,
            userInfo: {
                username: '',
                name: '杨博文',
                sex: '',
                academy: '',
                grade: ''
            },
        };

        var sty2 = document.body.style;
        sty2.backgroundImage = "url('./bg.jpg')";
        sty2.backgroundRepeat = 'no-repeat';
        sty2.backgroundSize = 'cover';

        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount(){
        window._ROUTER_ = this.props.history;

        getInfoApi();
    }

    handleClick(index) {
        this.setState({ currentSessionId: index });
    }

    render() {

        return (
            <div >
                <p className="tip"><img className="logo" src={require('../images/logo.png')} alt="" /></p>
                <div id="app">
                    <div className="sidebar">
                        <PersonalIcon name={this.state.userInfo.name}></PersonalIcon>
                        <Menu currentSessionId={this.state.currentSessionId} handleClick={this.handleClick}></Menu>
                    </div>
                    <ListPage currentSessionId={this.state.currentSessionId}></ListPage>
                </div>
            </div>
        )
    }
}




export default withRouter(MainPage)