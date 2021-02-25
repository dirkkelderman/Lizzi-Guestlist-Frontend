import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "./guest-service";
import AddGuest from "./AddGuest";
import EditGuest from "./EditGuest";

export class GuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestList: [],
      checkedTickets: 0,
      // ticketNumber: 0
    };
  }

  service = new GuestService();

  getGuestList = () => {
    const { params } = this.props.match;

    this.service.guestList(params.id).then((guestList) => {
      console.log(params.id);

      console.log(guestList);
      this.setState({
        guestList,
        // ticketNumber: guestList.ticketNumber
      });
      // console.log(guestList[12].ticketNumber)
    });
  };

  componentDidMount() {
    this.getGuestList();
  }

  checkInGuest = (index) => {
    const copyOfGuestList = [...this.state.guestList];

    copyOfGuestList[index].freeTickets -= 1;

    this.setState(
      {
        guestList: copyOfGuestList,
      },
      () => {
        this.service.updateGuest(
          copyOfGuestList[index]._id,
          copyOfGuestList[index].freeTickets
        );
      }
    );

    console.log("Guest checked-in");
  };

  render() {
    const { params } = this.props.match;
    const copyOfGuestList = [...this.state.guestList];

    const guestList = copyOfGuestList.map((guest, index) => {
      return (
        <div key={guest._id}>
          <p>Name: {guest.guestFirstName}</p>
          <p>Last name: {guest.guestLastName}</p>
          <p>No. of ticket: {guest.ticketNumber}</p>
          <p>Tickets left: {guest.freeTickets}</p>

          <p>{guest.contact}</p>
          <p>{guest.tag}</p>

          <button>
            <Link to={`/events/${params.id}/guestlist/${guest._id}`}>Edit</Link>
          </button>

          {guest.freeTickets <= 0 ? (
            <button
              type="button"
              disabled
              onClick={() => this.checkInGuest(index)}
            >
              Check-in
            </button>
          ) : (
            <button onClick={() => this.checkInGuest(index)}>Check-in</button>
          )}
        </div>
      );
    });

    return (
      <div>
        <button>
          <Link to={`/events`}>Back to events</Link>
        </button>

        <button>
          <Link to={`/events/${params.id}`}>Event Details</Link>
        </button>

        <h1>It's the guestlist</h1>

        <AddGuest eventId={params.id} getGuest={() => this.getGuestList()} />

        {guestList}
      </div>
    );
  }
}

export default GuestList;
