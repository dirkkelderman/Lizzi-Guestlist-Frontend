import React, { Component } from "react";
import GuestService from "../services/guest-service";

export class AddGuest extends Component {
  service = new GuestService();

  state = {
    guestFirstName: "",
    guestLastName: "",
    contact: "",
    tag: "",
    ticketNumber: 1,
    // freeTickets: 0,
    showAdvancedForm: false,
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      guestFirstName,
      guestLastName,
      contact,
      tag,
      ticketNumber,
    //   freeTickets,
    } = this.state;
    const event = this.props.eventId;

    console.log(this.props.eventId);

    this.service
      .addGuest(
        event,
        guestFirstName,
        guestLastName,
        contact,
        tag,
        ticketNumber,
        // freeTickets
      )
      .then(
        (res) => {
          this.props.getGuest();
          console.log(res);
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: "",
            ticketNumber: 1,
            // freeTickets: 0,
            status: "Your guest is created",
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

  showAdvancedForm = () => {
    const statusAdvancedForm = !this.state.showAdvancedForm;
    this.setState({
      showAdvancedForm: statusAdvancedForm,
    });
  };

  render() {
    return (
      <div>
        <h1>Add Guest</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="guestFirstName"
            value={this.state.guestFirstName}
            onChange={this.handleChange}
          />
          {this.state.showAdvancedForm ? (
            <span>
              <label>Last name</label>
              <input
                type="text"
                name="guestLastName"
                value={this.state.guestLastName}
                onChange={this.handleChange}
              />
            </span>
          ) : null}

          <label>Number of tickets</label>
          <input
            type="number"
            name="ticketNumber"
            value={this.state.ticketNumber}
            onChange={this.handleChange}
          />

          {this.state.showAdvancedForm ? (
            <span>
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                value={this.state.contact}
                onChange={this.handleChange}
              />

              <label>Tag</label>
              <input
                type="text"
                name="tag"
                value={this.state.tag}
                onChange={this.handleChange}
              />
            </span>
          ) : null}

          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.showAdvancedForm}>Advanced Form</button>
      </div>
    );
  }
}

export default AddGuest;
