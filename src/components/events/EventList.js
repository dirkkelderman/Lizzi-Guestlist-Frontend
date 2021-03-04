// React or componnents import
import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventService from "../services/event-service";
import SearchBar from "../searchbar/SearchBar";
import AddEventModal from "./AddEventModal";
import "./EventList.css";

// Material UI import
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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
      <div className="event-list-body">
        <SearchBar filteredSearch={this.handleEventSearch} />
        <h1 className="event-list-text">EventList</h1>
        {/* <h1>Hello user: {this.props.userInSession.username}</h1> */}

        {filteredEvents.map((event, index) => {
          let date = new Date(event.date);
          return (
            <div>
              <List className="event-list">
                <ListItem
                  style={{ color: "black" }}
                  key={event._id}
                  component={Link}
                  to={`/events/${event._id}/guestlist`}
                >
                  <ListItemText
                    primary={event.eventName}
                    secondary={date.toDateString()}
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <EditOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </List>
              <p></p>
              <p></p>
            </div>
          );
        })}

        {this.state.showAddForm ? (
          <AddEventModal
            getEvent={() => this.getEventList()}
            handleShow={this.showAddForm}
          />
        ) : null}

        <Fab color="primary" aria-label="add" onClick={this.showAddForm}>
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
export default EventList;
