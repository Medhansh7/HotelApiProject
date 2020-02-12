import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import RoomsContainer from "../components/RoomsContainer";

import Navbar2 from '../components/Navbar1/Navbar2/Navbar2'
import FooterPage from './Footer';
const Rooms = () => {
    return (
        <>
        <Navbar2 source="Rooms"/>
            <Hero hero="roomsHero">
                <Banner title="our rooms">
                    <Link to="/" className="btn-primary">
                        return home
          </Link>
                </Banner>
            </Hero>
            <RoomsContainer />
            {/* <FooterPage /> */}
        </>
    );
};

export default Rooms;
