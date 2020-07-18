import React, { Component } from 'react'
import logo from '../images/logo.png'
import './LoginPage.css'
import { loginApi, sendCodeApi,registApi, } from "../service/api" // 引入接口
import { withRouter } from 'react-router-dom';


export class LoginPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            active:'',
            loginPhoneNum:'',
            loginPassword:'',
            registPhoneNum:'',
            registCode:'',
            registPassword:'',
        }
        
        var sty2 = document.body.style;
        sty2.backgroundImage = "url('./bg-login.png')";
        sty2.backgroundRepeat = 'no-repeat';
        sty2.backgroundSize = 'cover';
        sty2.overflow="-Scroll";
        sty2.overflowY="hidden";


        this.handleCssChange = this.handleCssChange.bind(this);

        this.login = this.login.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.regist = this.regist.bind(this);
        this.handleLoginPhoneNumChange = this.handleLoginPhoneNumChange.bind(this);
        this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
        this.handleRegistPhoneNumChange = this.handleRegistPhoneNumChange.bind(this);
        this.handleRegistCodeChange = this.handleRegistCodeChange.bind(this);
        this.handleRegistPasswordChange = this.handleRegistPasswordChange.bind(this);
        
    }

    componentDidMount(){
        window._ROUTER_ = this.props.history;
    }

    handleCssChange() {
        let active = this.state.active ? '' : 's--signup';
        this.setState({active});
    }

    handleLoginPhoneNumChange(event){
        this.setState({
            loginPhoneNum:event.target.value
        });
    }
    handleLoginPasswordChange(event){
        this.setState({
            loginPassword:event.target.value
        });
    }

    handleRegistPhoneNumChange(event){
        this.setState({
            registPhoneNum:event.target.value
        });
    }
    handleRegistCodeChange(event){
        this.setState({
            registCode:event.target.value
        });
    }
    handleRegistPasswordChange(event){
        this.setState({
            registPassword:event.target.value
        });
    }

    login(){
        let parameters = {
            phoneNum:this.state.loginPhoneNum,
            password:this.state.loginPassword,
        }
        let res = loginApi(parameters);
    }

    sendCode(){
        let phoneNum = this.state.registPhoneNum;
        sendCodeApi(phoneNum);
    }
    regist(){
        let parameters = {
            phoneNum:this.state.registPhoneNum,
            password:this.state.registPassword,
            code:this.state.registCode,
        }
        registApi(parameters)

    }
    testFunction(){
        
    }
    render() {
        return (
            <div>
                <div>
                    <p className="tip" onClick={this.testFunction}><img className="logo" src={logo} alt="" /></p>
                    <div className= {`cont ${this.state.active}`}>
                        <div className="form sign-in">
                            <h2></h2>
                            <label className="loginlabel">
                                <span>手机号</span>
                                <input type="tel" className="newinput" value={this.state.loginPhoneNum} onChange={this.handleLoginPhoneNumChange} />
                            </label>
                            <label className="loginlabel">
                                <span>密码</span>
                                <input type="password" className="newinput" value={this.state.loginPassword} onChange={this.handleLoginPasswordChange} />
                            </label>
                            <p className="forgot-pass">忘记密码?</p>
                            <button type="button" className="submit" onClick={this.login}>登录</button>
                            <button type="button" className="qq-btn">用 <span>QQ</span> 登录</button>
                        </div>
                        <div className="sub-cont">
                            <div className="img">
                                <div className="img__text m--up">
                                    <h2>New here?</h2>
                                    <p>Sign up and discover great amount of new opportunities!</p>
                                </div>
                                <div className="img__text m--in">
                                    <h2>One of us?</h2>
                                    <p>If you already has an account, just sign in. We've missed you!</p>
                                </div>
                                <div className="img__btn" onClick={this.handleCssChange}>
                                    <span className="m--up">注册</span>
                                    <span className="m--in">登录</span>
                                </div>
                            </div>
                            <div className="form sign-up">
                                <h2 className="regist">注册，遇见</h2>
                                <label className="loginlabel">
                                    <span>手机号</span>
                                    <input type="tel" className="newinput" value={this.state.registPhoneNum} onChange={this.handleRegistPhoneNumChange} />
                                </label>
                                <label className="loginlabel">
                                    <span style={{textAlign: "center",display:"block"}}>验证码</span>
                                    <input type="number" className="newinput codeinput" value={this.state.registCode} onChange={this.handleRegistCodeChange} />
                                    <button className="logininputbutton" onClick={this.sendCode} >发送验证码</button>
                                </label>

                                <label className="loginlabel">
                                    <span>密码</span>
                                    <input type="password" className="newinput"  value={this.state.registPassword} onChange={this.handleRegistPasswordChange} />
                                </label>
                                <button type="button" className="submit" onClick={this.regist}>注册</button>
                                <button type="button" className="qq-btn">用 <span>QQ</span> 登录</button>
                            </div>
                        </div>
                    </div >
                    <p className="tip_floor">
                        <span><font className="tip_font">与君初相识，犹如故人归。</font></span><br />
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginPage)


