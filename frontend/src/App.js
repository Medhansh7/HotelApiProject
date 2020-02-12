import React from 'react';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Cart from './pages/Cart'
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Navbar from './components/Navbar';
import './App.css';
// import Navbar2 from './components/Navbar1/Navbar2/Navbar2'
// import FooterPage from './pages/Footer';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile'

import LoginPrad from './pages/LoginPrad'
import SignupPrad from './pages/SignupPrad'


function App() {
  return (
    <>
      {/* <Navbar2 /> */}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/rooms' component={Rooms} />
        <Route exact path='/rooms/:slug' component={SingleRoom} />
        {/* <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} /> */}
        <Route exact path='/login' component={LoginPrad} />
        <Route exact path='/signup' component={SignupPrad} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/cart' component={Cart} />
        <Route component={Error} />
      </Switch>
      {/* <FooterPage /> */}
    </>
  );
}

export default App;
