import "./App.css";
import AddEvent from "./components/events/AddEvent";
import EventList from "./components/events/EventList";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import EventDetails from "./components/events/EventDetails";
import GuestList from './components/guests/GuestList'
import { Route, Switch } from "react-router-dom";
import { Component } from "react";
import Navbar from "./components/navbar/Navbar"
import GuestDetails from './components/guests/GuestDetails'
import Profile from  './components/profile/Profile'
import ProtectedRoute from "./components/auth/protected-route";

class App extends Component {
  state = {
    loggedInUser: null,
  };

  getTheUser = (userObj) => {
    console.log(this.state.loggedInUser)
    this.setState({
      loggedInUser: userObj,
    });
  };

  // getTotalGuestNumber = ( ) => {
  //   console.log('hello')
  //   // console.log(guestTotal)
  // }
  
  
  render() {

    //console.log(this.state?.loggedInUser)
    return (
      <div className="App">

    <Navbar userInSession={this.state?.loggedInUser} getUser={this.getTheUser} />

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
          />

        </Switch>
      </div>
    );
  }
}

export default App;
