// React or componnents import

import "./App.css";
import EventList from "./components/events/EventList";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import EventDetails from "./components/events/EventDetails";
import GuestList from './components/guests/GuestList'
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { Component } from "react";
import Navbar from "./components/navbar/Navbar"
import GuestDetails from './components/guests/GuestDetails'
import Profile from  './components/profile/Profile'
import ProtectedRoute from "./components/auth/protected-route";
import Forgot  from './components/auth/Forgot'
import Reset from './components/auth/Reset'
import Confirm from './components/email/Confirm'
import HomePage from "./components/home/HomePage";

// Material UI import
import Container from '@material-ui/core/Container';

//Mail confirmation imports
import Notifications from 'react-notify-toast'

class App extends Component {
  state = {
    loggedInUser: null,
    showSplashScreen: true,
    loading: true

  };

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  splashScreenTime(){
    setTimeout(() => {
      this.setState({
        showSplashScreen: false
      })
    }, 3000)
  }
  
  componentDidMount = () => {
    this.splashScreenTime()

  }
  
  
  render() {
    return (
      <Container  className='App-body'>

        <Notifications />

      <div className="App">
      
      { this.state?.loggedInUser  ? 
        <Navbar userInSession={this.state?.loggedInUser} getUser={this.getTheUser} />
      : null}


        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/confirm/:id' component={Confirm} />
            <Route exact path='/forgot' component={Forgot} />
            <Route exact path='/reset/:token' component={Reset} />


          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} getUser={this.getTheUser} />}
          />

          <ProtectedRoute
            user={this.state.loggedInUser}
            exact path="/events"
            component={EventList}
          />

          <ProtectedRoute
            user={this.state.loggedInUser}
            exact path="/events/:id"
            component={EventDetails}
          />

          <ProtectedRoute
            user={this.state.loggedInUser}
            exact path="/events/:id/guestlist"
            component={GuestList}
          />

          <ProtectedRoute
            user={this.state.loggedInUser}
            exact path="/events/:id/guestlist/:guestId"
            component={GuestDetails}
            
          />

          <ProtectedRoute
            user={this.state.loggedInUser}
            exact path="/profile/:id"
            component={Profile}  
            getUser={this.getTheUser}
          />


        </Switch>
      </div>
      </Container>
    );
  }
}

export default withRouter(App);
