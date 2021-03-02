import React, { Component } from "react";
import EventService from "../services/event-service";

class EditProject extends Component {
  service = new EventService();

  state = {
    eventName: this.props.theEvent.eventName,
    date: this.props.theEvent.date,
    guestNumber: this.props.theEvent.guestNumber,
    location: this.props.theEvent.location,
    description: this.props.theEvent.description,
    _id: this.props.theEvent._id,
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      eventName,
      date,
      guestNumber,
      location,
      description,
      _id,
    } = this.state;

    this.service
      .updateEvent(_id, eventName, date, guestNumber, location, description)
      .then(
        (res) => {
          console.log(res);
          this.props.history.push("/events");
        },
        (err) => {
          console.log(err);
        }
      );
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Event name</label>
          <input
            type="text"
            name="eventName"
            value={this.state.eventName}
            onChange={this.handleChange}
          />

          {/* <label>Date</label>
            <input type='date' name='date' value={this.state.date} onChange={this.handleChange} /> */}

          <label>Number of guests</label>
          <input
            type="number"
            name="guestNumber"
            value={this.state.guestNumber}
            onChange={this.handleChange}
          />

          <label>location</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />

          <label>description</label>
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditProject;
