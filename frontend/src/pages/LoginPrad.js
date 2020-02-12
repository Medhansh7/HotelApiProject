import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MDBAlert } from 'mdbreact'
import './LoginPrad.css'

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import Navbar2 from '../components/Navbar1/Navbar2/Navbar2'
import FooterPage from './Footer';

const responseGoogle = (response) => {
    console.log(response);
}
const responseFacebook = (response) => {
    console.log(response);
}
  
class LoginPrad extends Component {

    constructor (props) {
        super(props)

        if(localStorage.usertoken){
            this.props.history.push(`/`)
        }
        this.state = {
            email: "",
            password: "",
            errors:[],
        }

    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
    
        
        try {
            axios.post('users/login', {
                    email: this.state.email,
                    password: this.state.password,
                })
                .then(response => {
                    
                    console.log("ress - "+response.message)
                
                     if (response.data === 'Error: Wrong Email/Password') {

                        console.log("Login failed")
                        let arr=[]
                        arr.push(response.data)

                        this.setState({
                            errors: arr
                        })
    
                        
                    } else if(response.data){
                        console.log(response.data.message)
                        localStorage.setItem('usertoken', response.data.token)
                        this.props.history.push(`/`)

                    } 
                    
                })
                  .catch(err => {
                    console.log(err)
                  })
            } catch (e) {
                console.log("Error in Login")
                console.log(e)
            }
    }

    render(){

        let success=false

        if(this.props.location.state && this.props.location.state.success){
            success=true
        } 

        const successMessage = (
            <MDBAlert color="success">
                Registration successful
            </MDBAlert>
        )

        const err = (

            <MDBAlert color="danger" >
                {this.state.errors.map((error, i) => (<p key={i}>{error}</p>)) }
            </MDBAlert>
        )

        return(
            <React.Fragment>
                <Navbar2 source="login"/>
                <div className="spacer" />

                
                <div className="main">

                    <div className="detailsform">
                        
                        <div className="select">
                            <Link to="/signup"  style={{ textDecoration: 'none' }}>
                                <div className="LoginTopSignUpButton" > 
                                    Sign Up
                                </div>
                            </Link>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <div className="LoginTopLoginButton">
                                    Log In
                                </div>
                            </Link>

                        </div>

                        
                        {success && successMessage}
                        { this.state.errors.length!==0 ? err :(<div style={{height: "5vh"}} />)}

                        {/* <div style={{height: "5vh"}} /> */}

                        <form>
                            <input className="inputBox" type="email" placeholder="Your Address" onChange={this.handleEmail}/>
                            <br />
                            <br />
                            <input className="inputBox" type="password" placeholder="Your Password" onChange={this.handlePassword}/>
                            <br />
                            <br />
                            <div className="remember">
                                <input type="checkbox" id="rememberme"/>
                                <label for="rememberme" className="align">Remember Me</label>
                                {/* <span className="align"></span> */}
                                <span>Forgot your password?</span>
                            </div>
                            <br />

                            <div className="loginContainer">
                                <div className="loginButton" onClick={this.handleSubmit}>
                                    Log In
                                </div>
                            </div>

                            <br />
                            <br />

                            {/* <div className="or">
                                <div className="line" />
                                <span>or connect with</span>
                                <div className="line" />
                            </div> */}
                           
                            
                            
                        </form>


                        {/* <div className="connectWith">
                            <GoogleLogin
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                // buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />

                            <FacebookLogin
                                appId="1088597931155576"

                                fields="name,email,picture"
                                callback={responseFacebook}
                                // cssClass="my-facebook-button-class"
                                icon="fa-facebook"
                            />

                        </div> */}


                    </div>
                    
                </div>
                {/* <FooterPage /> */}
            </React.Fragment>
           
        )
    }
}

export default LoginPrad

