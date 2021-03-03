import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "../services/guest-service";
import Modal from './Modal'

export class GuestDetails extends Component {
  service = new GuestService();

  constructor(props) {
    super(props);
    this.state = {
      guestObj: {
        guestFirstName: "",
        guestLastName: "",
        contact: "",
        tag: "",
        ticketNumber: 0,
        freeTickets: 0,
      },
    };
  }

  componentDidMount() {
    this.getSingleGuest();
  }

  getSingleGuest() {
    const { params } = this.props.match;
    this.service.guestDetails(params.guestId).then((responseFromApi) => {
      this.setState({
        guestObj: responseFromApi,
      });
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      guestObj: Object.assign({}, this.state.guestObj, { [name]: value }),
    });

    const { params } = this.props.match;
    const {
      freeTickets,
      guestFirstName,
      guestLastName,
      contact,
      tag,
      ticketNumber,
    } = this.state.guestObj;

    this.service
      .updateGuest(
        params.guestId,
        freeTickets,
        guestFirstName,
        guestLastName,
        contact,
        tag,
        ticketNumber
      )
      .then(
        (res) => {
          console.log(res);
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: "",
            ticketNumber: 0,
            freeTickets: 0,
            status: "Your guest is editted",
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

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { params } = this.props.match;
    const {
      freeTickets,
      guestFirstName,
      guestLastName,
      contact,
      tag,
      ticketNumber,
    } = this.state.guestObj;

    this.service
      .updateGuest(
        params.guestId,
        freeTickets,
        guestFirstName,
        guestLastName,
        contact,
        tag,
        ticketNumber
      )
      .then(
        (res) => {
          console.log(res);
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: "",
            ticketNumber: 0,
            freeTickets: 0,
            status: "Your guest is editted",
          });
          this.props.history.push(`/events/${params.id}/guestlist`);
        },
        (err) => {
          console.log(err);
          this.setState({
            status: "Oops, something wrong",
          });
        }
      );
  };

  deleteGuest = () => {
    const { params } = this.props.match;

    this.service.deleteGuest(params.guestId).then(
      () => {
        this.props.history.push(`/events/${params.id}/guestlist`);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  render() {
    const {
      guestFirstName,
      guestLastName,
      contact,
      tag,
      ticketNumber,
      freeTickets,
    } = this.state.guestObj;

    const { params } = this.props.match;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>First name</label>
          <input
            type="text"
            name="guestFirstName"
            value={guestFirstName}
            onChange={this.handleChange}
          />

          <label>Last name</label>
          <input
            type="text"
            name="guestLastName"
            value={guestLastName}
            onChange={this.handleChange}
          />

          <label>Number of tickets</label>
          <input
            type="number"
            name="ticketNumber"
            value={ticketNumber}
            onChange={this.handleChange}
          />

          <label>Free tickets</label>
          <input
            type="number"
            name="freeTickets"
            value={freeTickets}
            onChange={this.handleChange}
          />

          {this.state.showAdvancedForm ? (
            <div>
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                value={contact}
                onChange={this.handleChange}
              />

              <label>Tag</label>
              <input
                type="text"
                name="tag"
                value={tag}
                onChange={this.handleChange}
              />
            </div>
          ) : null}

          <span>
            <input type="submit" value="Close" />
            <Link to={`/events/${params.id}/guestlist`} />
          </span>
        </form>
        <button onClick={this.deleteGuest}>Delete Guest</button>
      </div>
    );
  }
}

export default GuestDetails;
