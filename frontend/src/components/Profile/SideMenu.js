import React, { Component } from 'react'
import './SideMenu.css'

import { BrowserRouter } from 'react-router-dom';
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
export default class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption : "",
        }
    }
    
    handleSelection = (name) => {
        this.setState = {
            selectedOption: name
        }
        console.log(name)
    }

    render() {
        return (
            <div className="mainContainer" >

                <div className="sideMenu">

                        <MDBBtn outline color="primary" onClick={() => this.handleSelection("myBookings")} className="buttonPadding">
                            <MDBIcon icon="magic" className="mr-1" /> My Bookings
                        </MDBBtn>

                
                        <MDBBtn outline color="primary" onClick={() => this.handleSelection("profile")} className="buttonPadding">
                            <MDBIcon icon="magic" className="mr-1" /> Profile 
                        </MDBBtn>

                </div>

            </div>








        )
    }
}