import React, { Component } from "react";
import GuestService from "./guest-service";

export class AddGuest extends Component {

  service = new GuestService();

  state = {
    guestFirstName: "",
    guestLastName: "",
    contact: "",
    tag: "",
    ticketNumber: 0
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {guestFirstName, guestLastName, contact, tag, ticketNumber} = this.state

    this.service
      .addGuest(guestFirstName, guestLastName, contact, tag, ticketNumber)
      .then(
        (res) => {
          this.props.getGuest();
          console.log(res);
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: "",
            ticketNumber: 0,
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

  render() {
    return (
      <div>
        <h1>Add Guest</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>First name</label>
          <input
            type="text"
            name="guestFirstName"
            value={this.state.guestFirstName}
            onChange={this.handleChange}
          />

          <label>Last name</label>
          <input
            type="text"
            name="guestLastName"
            value={this.state.guestLastName}
            onChange={this.handleChange}
          />

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

         <label>Number of tickets</label>
          <input
            type="number"
            name="ticketNumber"
            value={this.state.ticketNumber}
            onChange={this.handleChange}
          />


          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddGuest;
