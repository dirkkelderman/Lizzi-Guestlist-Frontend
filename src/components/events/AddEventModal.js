import React, { Component } from "react";
import "./AddEventModal.css";
import EventService from "../services/event-service";

class AddEventModal extends Component {
  service = new EventService();

  constructor(props) {
    super(props);

    this.state = {
      eventName: "",
      date: "",
      guestNumber: 0,
      location: "",
      description: "",
      status: "",
    };
  }

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
      )
      .then(() => this.props.handleShow);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="add-event-modal" onClick={this.props.handleShow}>
        <div
          className="add-event-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-event-modal-header">
            <h4 className="add-event-modal-title">Add Event</h4>
            <button onClick={this.props.handleShow} className="button">
              Close
            </button>
          </div>
          <div className="add-event-modal-body">
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

              <div className="add-event-modal-footer">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEventModal;
