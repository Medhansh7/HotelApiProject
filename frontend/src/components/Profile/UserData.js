import React, { Component } from 'react'
import './UserData.css'
import ChangePassword from './ChangePassword'
import jwt_decode from 'jwt-decode'
export default class UserData extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            changePass: false,
        }
    }


    componentDidMount = () => {
        try {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            console.log(decoded)
            this.setState({
                name: decoded.name,
                email: decoded.email,
            })
        } catch (err) {
            console.log("Error in Profile - Component Did Mount - "+err)
        }

    }
    handleEdit = (state, passChanged=false) => {
       
        this.setState({ changePass:state })

        
    }



    render(){

        const showPass = (
            <div className="passwordContainer" >

                <div className="userDataCard" style={{ width: "50vw", marginRight: 0 }}>
                    <span className="heading">Password</span>

                    <span>●●●●●●●●●●</span>
                </div>
                <div className="editOption">
                    <button className="editButton" onClick={() => this.handleEdit(true)}>Edit</button>

                </div>
            </div>
        )



        return (
            <div className="userDataContainer">
                <div className="mainHeading">
                    <div>
                        User Data
                    </div>
                </div>                

                <div className="userDataCard">
                    <span className="heading">Name</span>

                    <span>{this.state.name}</span>
                </div>

                <div className="userDataCard">
                    <span className="heading">Email</span>

                    <span>{this.state.email}</span>
                </div>
                
                {this.state.changePass ? (
                    <ChangePassword
                        handleEdit={this.handleEdit}
                        email={this.state.email}
                        handlePasswordChanged={this.handlePasswordChanged}
                    />) :
                    showPass}




                
            </div>
        )
    }
}