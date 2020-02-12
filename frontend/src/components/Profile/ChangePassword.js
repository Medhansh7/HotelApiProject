import React, { Component } from 'react'
import { MDBBtn, MDBAlert } from "mdbreact";
import axios from 'axios'

import './UserData.css'

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: [],
            currPass: "",
            newPass: "",
            cmfNewPass: "",
            success: false,
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSave = async () => {
        
        let arr = []
        
        if (this.state.currPass === "") {
            arr.push("Please Enter your Current Password")
        }

        if (this.state.newPass === "") {
            arr.push("Please Enter your New Password")
        }

        if (this.state.cmfNewPass === "") {
            arr.push("Please confirm your new Password")
        }

        if (this.state.newPass !== this.state.cmfNewPass) {
           arr.push("The passwords you provided do not match. Please check that you have typed both passwords correctly")
        }

        

        if ( arr.length === 0 ) {
            let res = await this.changePasswordRequest()
            if(res === true){
                console.log("successful")
                // this.props.handlePasswordChanged(true)
                // this.props.handleEdit(false)
                this.setState({success:true})
            } else {
                console.log("Request failed")
                arr.push('Wrong Password')
            }
        } 

        this.setState({
            errors: arr,
        })

        this.forceUpdate()
        console.log(this.state)
    }

    changePasswordRequest = async () => {
        try {
            let res = await axios.post('users/changePassword', {
                email: this.props.email,
                password: this.state.currPass,
                newPassword: this.state.newPass,
            })



            if(res.data==='Error: Wrong Password'){
                return false
            } 

            if( res.data === 'Success: Password Changed'){
                return true
            }


        } catch (e) {
            console.log("Error in ChangePassword post - "+ e)
            return false
        }
    }

    render() {

        const err = (

            <MDBAlert color="danger" >
                {this.state.errors.map((error, i) => (<p key={i}>{error}</p>)) }
            </MDBAlert>
        )

        const passwordChanged = (
            <MDBAlert color="success" >
                Password Changed Successfully
            </MDBAlert> 
        )


        let h=45
        if(this.state.errors.length===1){
            h+=5   
        }else if(this.state.errors.length===2){
            h+=10
        }else if(this.state.errors.length===3){
            h+=15
        }

        return (


            <div className="userDataCard" style={{ height: h+"vh" }}>
                { this.state.errors.length!==0 && err }
                { this.state.success && passwordChanged}

                <span className="heading">Current Password</span>
                <input name="currPass" className="textInput" onChange={this.handleChange} type="password" placeholder="Current Password" />

                <span className="heading">New Password</span>
                <input name="newPass" className="textInput" onChange={this.handleChange} type="password" placeholder="New Password" />

                <span className="heading">Confirm New Password</span>
                <input name="cmfNewPass" className="textInput" onChange={this.handleChange} type="password" placeholder="Confirm New Password" />


                <div>
                    <MDBBtn color="primary" className="saveButton" onClick={() => this.props.handleEdit(false)}>
                        Cancel
                </MDBBtn>
                    <MDBBtn color="primary" className="saveButton" onClick={this.handleSave}>
                        Save
                </MDBBtn>
                </div>



            </div>
        )
    }
}