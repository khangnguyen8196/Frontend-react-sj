import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import  { handleLoginApi }  from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            errMessage:'',
            isShowPassword: false,
        }
    }

    handleOnchangeUsername = (e) =>{
        console.log(e.target.value);
        this.setState({
            username:e.target.value
        })
    }

    handleOnchangePassword = (e) => {
        console.log(e.target.value);
        this.setState({
            password:e.target.value
        })
    }

    handleLogin = async() => {
        this.setState({
            errMessage:''
        })
        try{
           let data = await handleLoginApi(this.state.username, this.state.password);
           if (data && data.errCode !== 0) {
            this.setState({
                errMessage:data.message
            })
           }
           if (data && data.errCode === 0) {
            this.props.userLoginSuccess(data.user)
            console.log('login success')
           }


        } catch(error){
            if (error.response){
                if (error.response.data){
                    this.setState({
                        errMessage:error.response.data.message
                    })
                }
            }
            console.log('hoi dan ai ti', error.response)
        }
    }

    handleShowHidePassword = () => {
       this.setState({
            isShowPassword:!this.state.isShowPassword,
       })
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13 || e.key === "Enter"){
            this.handleLogin();
        }
    }
    render() {
           return (
            
            <div className ="login-background">
                <div className ="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(e) =>this.handleOnchangeUsername(e)}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className ="custom-input-password">
                                <span 
                                    onClick ={()=> this.handleShowHidePassword()}
                                >
                                    <i className={this.state.isShowPassword ? "fa fa-eye" : "fa fa-eye-slash" }></i>
                                </span>
                                <input 
                                    type={this.state.isShowPassword ? "text" : "password" } 
                                    className="form-control" 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnchangePassword(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                    />
                            </div>
                           
                        </div>
                        <div className ="col-12" style ={{ color:'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                         <button 
                            className="btn-login"
                            onClick={() => this.handleLogin()}
                            >Login
                         </button>
                        </div>
                        <div className ="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span > Or Login with </span>
                        </div>
                        <div className="col-12 social-login ">
                            <i className="icon-google fab fa-google-plus-g"></i>
                            <i className="icon-facebook fab fa-facebook-f"></i>
                        </div>
                    </div>

                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess : (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
