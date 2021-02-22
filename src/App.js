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

class App extends Component {
  state = {
    loggedInUser: null,
  };

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    return (
      <div className="App">

      <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
        <Switch>
          {/* <Route exact path="/" /> */}
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
          <Route exact path="/AddEvent">
            <AddEvent />
          </Route>

          <Route
            exact
            path="/events"
            render={(props) => (
              <EventList {...props} userInSession={this.state.loggedInUser} />
            )}
          />
          <Route exact path="/events/:id" component={EventDetails} />
          <Route exact path="/events/:id/guestlist" component={GuestList} />
          <Route exact path="/events/:id/guestlist/:guestId" component={GuestDetails} />

          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile {...props} userInSession={this.state.loggedInUser} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
