import React, { Component } from "react";
import axios from "axios";
import EventService from "./event-service";

export class AddEvent extends Component {
  service = new EventService();

  state = {
    eventName: "",
    date: "",
    guestNumber: 0,
    location: "",
    description: "",
    status: "",
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const eventName = this.state.eventName;
    const date = this.state.date;
    const guestNumber = this.state.guestNumber;
    const location = this.state.location;
    const description = this.state.description;

    this.service
      .addEvent(eventName, date, guestNumber, location, description)
      .then(
        (res) => {
          this.props.getEvent();
          console.log(res);
          this.setState({
            eventName: "",
            date: "",
            guestNumber: "",
            location: "",
            description: "",
            status: "Your project is created",
          });
        },
        (err) => {
          console.log(err);
          this.setState({
            status: "Oops, something wrong",
          });
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
        <h1>Add Event</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Event name</label>
          <input
            type="text"
            name="eventName"
            value={this.state.eventName}
            onChange={this.handleChange}
          />

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />

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

export default AddEvent;
