import React, { Component } from 'react';
import './App.css';
//Auth Header
import setAuthToken from './utils/setAuthToken';
//Decoder
import jwt_decode from 'jwt-decode';
//Comonent Layout
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
//Components Authentications
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
//Search Result components
import Results from './components/searchresults/Results';
//Actions
import { setCurrentUser } from './actions/authAction';
import { logoutUser } from './actions/authAction';
//Get Store
import store from './store';
//ROUTER Components
import { BrowserRouter as Router, Route } from 'react-router-dom';
//Check if user is logged in or not

if (localStorage.jwtToken) {
  //Set auth header
  setAuthToken(localStorage.jwtToken)
  //decode token and get info
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticatted
  store.dispatch(setCurrentUser(decoded));
  //Check if time has required for token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //TODO Clear Current User
    //Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Navbar/>
          <Route exact path="/" component={Landing}/>
          <div className="container">
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/results" component={Results}/>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
