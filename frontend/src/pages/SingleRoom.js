import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../Context";

import StyledHero from "../components/StyledHero";


import Navbar2 from '../components/Navbar1/Navbar2/Navbar2'
import FooterPage from './Footer';
import { MDBBtn } from "mdbreact";

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg: defaultBcg
        };
    }
    static contextType = RoomContext;

    // componentDidMount() {
    //   console.log(this.props);
    // }

    addToCart = () => {

        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);

        let id = room["id"]

        if(!localStorage.cartStorage){
            

            let cartObject = {}
            cartObject[id] = room
            //console.log(cartObject)

            localStorage.setItem('cartStorage', JSON.stringify(cartObject))
        } else {
            let cart = localStorage.getItem('cartStorage')
            console.log(cart)
            cart =  JSON.parse(cart)

            cart[id] = room

            localStorage.setItem('cartStorage', JSON.stringify(cart))

            
        }
    }

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);

        if (!room) {
            return (
                <div className="error">
                    <h3> no such room could be found...</h3>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
          </Link>
                </div>
            );
        }
        const {
            name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images
        } = room;
        const [main, ...defaultImages] = images;
        console.log(defaultImages);


        return (
            <>
            <Navbar2 source="SingleRoom"/>
                <StyledHero img={images[0] || this.state.defaultBcg}>
                    <Banner title={`${name} room`}>
                        <Link to="/rooms" className="btn-primary">
                            back to rooms
            </Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImages.map((item, index) => (
                            <img key={index} src={item} alt={name} />
                        ))}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <div dangerouslySetInnerHTML={{ __html: description }} />

                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>size : {size} SQFT</h6>
                            <h6>
                                max capacity :
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                            </h6>
                            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras </h6>
                    <ul className="extras">
                        {extras.map((item, index) => (
                            <li key={index}>- {item}</li>
                        ))}
                    </ul>
                </section>

               { localStorage.usertoken &&
                    (<div className="addToCart">
                        <MDBBtn color="primary" onClick={this.addToCart}>Add to Cart</MDBBtn>
                    </div>)
               }
                
                {/* <FooterPage /> */}
            </>
        );
    }
}
