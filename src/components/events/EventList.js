import React, { Component } from "react";
import AddEvent from "./AddEvent";
import { Link } from "react-router-dom";
import EventService from "./event-service";

export class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      loggedInUser: null,
      showAddForm: false,
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

  render() {
      console.log(this.props.userInSession)
    const eventList = this.state.eventList.map((event) => {
      return (
        <div key={event._id}>
          {/* <Link to={`/events/${event._id}`}>
            <h2>{event.eventName}</h2>
          </Link> */}
          <Link to={`/events/${event._id}/guestlist`}>
            <h2>{event.eventName}</h2>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h1>EventList</h1>
        <h1>Hello user: {this.props.userInSession.username}</h1>

        <button onClick={this.showAddForm}>
          {this.state.showAddForm ? "Hide add form" : "Add event"}
        </button>

        {
            this.state.showAddForm ? <AddEvent userinSession={this.props.userInSession} getEvent={() => this.getEventList()} /> : null
        }

        {eventList}
        
      </div>
    );
  }
}

export default EventList;
