import React, { Component } from 'react'
import Navbar2 from '../components/Navbar1/Navbar2/Navbar2'
import './Cart.css'
import CartRoom from '../components/CartRoom'

export default class Cart extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            cartItems : []
        }
        
    }

    componentDidMount = async () => {
        localStorage.getItem('cart')
    }

    removeFromCart = (id) => {
        let cart = localStorage.getItem('cartStorage')
        cart =  JSON.parse(cart) 
        delete cart[id]
        localStorage.setItem('cartStorage', JSON.stringify(cart))
    }
    render = () => {

        let cart
        if(!localStorage.cartStorage){

            return(

                <React.Fragment>
                    <Navbar2 source="cart"/>
                    <div className="CartSpacer" />
                    <div className="addToCart">
                        Your cart is empty
                </div>
                   
                </React.Fragment>
            )

        
        } else {
            let cart = localStorage.getItem('cartStorage')

            cart =  JSON.parse(cart)

            // let p = Object.keys(cart).map( x => {
            //     return <Room key={x} room={cart[x]}/>
            // })
            // console.log("p = " + p)

            return(
                <React.Fragment>
                    <Navbar2 source="cart" />
                    <div className="CartSpacer" />
                    {Object.keys(cart).map( x => {
                        return(
                            <div className="roomslist-center">
                                <CartRoom key={x} room={cart[x]} removeFromCart={(id) => this.removeFromCart(id)}/> 
                            </div>
                            
                        ) 
                    })}

                </React.Fragment> 
            )
        }
        
    }

    
}