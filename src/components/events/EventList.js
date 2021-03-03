import React, { Component } from "react";
import AddEvent from "./AddEvent";
import { Link } from "react-router-dom";
import EventService from "../services/event-service";
import SearchBar from "../searchbar/SearchBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemLink from "@material-ui/core/Divider";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";

export class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      filteredEvents: [],
      totalGuests: 0,
      totalGuestsCheckedIn: 0,
      loggedInUser: null,
      showAddForm: false,
      search: "",
    };
  }
  service = new EventService();
  getEventList = () => {
    this.service.eventList().then(
      (eventsFromApi) => {
        this.setState({
          eventList: eventsFromApi,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  componentDidMount() {
    this.getEventList();
  }

  showAddForm = () => {
    const statusAddForm = !this.state.showAddForm;
    this.setState({
      showAddForm: statusAddForm,
    });
  };

  handleEventSearch = (value) => {
    this.setState({
      search: value,
    });
  };

  getTotalGuestNumber = (value) => {
    // console.log('hello')
    console.log(`This is the ${value}`);
    // console.log('hello')
  };

  render() {
    let filteredEvents = this.state.eventList.filter((event) => {
      return (
        event.eventName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <div>
        <SearchBar filteredSearch={this.handleEventSearch} />
        <h1>EventList</h1>
        {/* <h1>Hello user: {this.props.userInSession.username}</h1> */}
        <button onClick={this.showAddForm}>
          {this.state.showAddForm ? "Hide add form" : "Add event"}
        </button>
        {this.state.showAddForm ? (
          <AddEvent
            userinSession={this.props.userInSession}
            getEvent={() => this.getEventList()}
          />
        ) : null}

        {filteredEvents.map((event) => {
          let date = new Date(event.date);
          return (
            <List key={event._id}>
              <ListItem
                button
                component={Link}
                to={`/events/${event._id}/guestlist`}
              >
                <ListItemText
                  primary={event.eventName}
                  secondary={date.toDateString()}
                />
              </ListItem>
              <Divider />
            </List>
          );
        })}
      </div>
    );
  }
}
export default EventList;
