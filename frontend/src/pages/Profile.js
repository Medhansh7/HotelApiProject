import React, { Component, Fragment } from 'react'
import Navbar2 from './../components/Navbar1/Navbar2/Navbar2'
import SideMenu from './../components/Profile/SideMenu'
import UserData from './../components/Profile/UserData'



import './Profile.css'
export default class Profile extends Component {

    constructor(props) {
        super(props)
        if(!localStorage.usertoken){
            this.props.history.push(`/`)
        }
     
    }

    // logout()

    render = () => {
        return (
            <div className="ccontainer">
                <Navbar2 source="profile" />
                <div style={{ height: 65 }} />
                <div className="flewRow">
                    <SideMenu />
                    <UserData />
                </div>
            </div>
        )
    }
}