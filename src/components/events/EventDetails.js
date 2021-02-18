import React, { Component } from "react";
import EventService from "./event-service";
import EditEvent from "./EditEvent";
import { Link } from "react-router-dom";

export class EventDetails extends Component {
  service = new EventService();

  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      date: "",
      guestNumber: 0,
      location: "",
      description: "",
      _id: "",
      status: "",
      showEditForm: false,
    };
  }

  componentDidMount() {
    this.getSingleEvent();
  }

  getSingleEvent() {
    const { params } = this.props.match;
    this.service.eventDetails(params.id).then(
      (responseFromApi) => {
        const {
          eventName,
          date,
          guestNumber,
          location,
          description,
          _id,
        } = responseFromApi;
        this.setState({
          eventName: eventName,
          date: date,
          guestNumber: guestNumber,
          location: location,
          description: description,
          status: "",
          _id: _id,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  renderEditForm = () => {
    if (!this.state.eventName) {
      this.getSingleEvent();
    } else {
      return (
        <EditEvent
          theEvent={this.state}
          getEvent={this.getSingleEvent}
          {...this.props}
        />
      );
    }
  };

  showEditForm = () => {
    const statusEditForm = !this.state.showEditForm;
    this.setState({
      showEditForm: statusEditForm,
    });
  };

  deleteEvent = () => {
    const { params } = this.props.match;

    this.service.deleteEvent(params.id)
    .then( () =>{
        this.props.history.push('/events');       
    }, (err)=>{
        console.log(err)
    })
  }

  render() {
    return (
      <div>
        <h1>Event Details</h1>
        <p>Event Name:{this.state.eventName}</p>
        <p>Date: {this.state.date}</p>
        <p>Number of guestes: {this.state.guestNumber}</p>
        <p>Location: {this.state.location}</p>
        <p>Description: {this.state.description}</p>

        <button onClick={this.showEditForm}>
          {this.state.showEditForm ? "Hide edit form" : "Edit event"}
        </button>

        <button onClick={this.deleteEvent}>
            Delete Event
        </button>

        <Link to='/events'>
            <button>
                Back to events
            </button>
        </Link>

        <div>
          {this.state.showEditForm ? <div>{this.renderEditForm()} </div> : null}
        </div>
      </div>
    );
  }
}

export default EventDetails;
