import "./App.css";
import AddEvent from "./components/events/AddEvent";
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
import EditProfile from "./components/profile/EditProfile"
import Container from '@material-ui/core/Container';
import HomePage from "./components/home/HomePage";

class App extends Component {
  state = {
    loggedInUser: null,
    showSplashScreen: true,
  };

  getTheUser = (userObj) => {
    console.log(this.state.loggedInUser)
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
    // this.props.history.push(`/login`)
  }
  
  componentDidMount(){
    this.splashScreenTime()
  }
  // getTotalGuestNumber = ( ) => {
  //   console.log('hello')
  //   // console.log(guestTotal)
  // }
  
  
  render() {
    return (
      <Container  className='App-body'>

      {this.state.showSplashScreen ? <h1 style={{color: 'white'}} >HELLO</h1> : <Redirect to={{pathname: '/login' }}/>}

      <div className="App">
      { this.state?.loggedInUser  ? 
        <Navbar userInSession={this.state?.loggedInUser} getUser={this.getTheUser} />
      : null}


        <Switch>
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
            // totalGuestNumber={this.getTotalGuestNumber()}
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
