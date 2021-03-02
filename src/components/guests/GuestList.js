import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "../services/guest-service";
import EventService from "../services/event-service";
import AddGuest from "./AddGuest";
import SearchBar from "../searchbar/SearchBar";

export class GuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestList: [],
      totalGuests: 0,
      totalGuestsCheckedIn: 0,
      filteredGuests: [],
      search: "",
    };
  }

  service = new GuestService();
  eventService = new EventService();

  getGuestList = () => {
    const { params } = this.props.match;

    this.eventService.eventDetails(params.id).then((eventFromDb) => {
      // console.log(eventFromDb);
      this.setState({
        guestList: eventFromDb.guest,
      });

      this.getGuests();
    });
  };

  getGuests() {
    let guestChecked = 0;
    let guestTotal = 0;
    for (let key in this.state.guestList) {
      guestChecked += +this.state.guestList[key].ticketsCheckedIn;
      guestTotal += +this.state.guestList[key].ticketNumber;

      this.setState({
        totalGuestsCheckedIn: guestChecked,
        totalGuests: guestTotal,
      });
      // this.props.totalguestnumber(guestTotal)
    }
  }

  componentDidMount() {
    this.getGuestList();
  }

  checkInGuest = (index) => {
    const copyOfGuestList = [...this.state.guestList];

    copyOfGuestList[index].ticketsCheckedIn += 1;

    this.setState(
      {
        guestList: copyOfGuestList,
      },
      () => {
        this.service.updateGuest(
          copyOfGuestList[index]._id,
          copyOfGuestList[index].ticketsCheckedIn
        );
      }
    );
    this.getGuests();
  };

  handleGuestSearch = (value) => {
    this.setState({
      search: value,
    });
  };

  render() {
    let filteredGuests = this.state.guestList.filter((guest) => {
      return (
        guest.guestFirstName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    const { params } = this.props.match;
    return (
      <div>
        <button>
          <Link to={`/events`}>Back to events</Link>
        </button>

        <button>
          <Link to={`/events/${params.id}`}>Event Details</Link>
        </button>

        <SearchBar filteredSearch={this.handleGuestSearch} />

        <h1>It's the guestlist</h1>
        <h4>
          Guests: {this.state.totalGuestsCheckedIn}/{this.state.totalGuests}
        </h4>

        <AddGuest eventId={params.id} getGuest={() => this.getGuestList()} />

        {filteredGuests.map((guest, index) => {
          return (
            <div key={guest._id}>
              <p>Name: {guest.guestFirstName}</p>
              {guest.guestLastName ? (
                <p>Last name: {guest.guestLastName}</p>
              ) : null}

              <p>No. of ticket: {guest.ticketNumber}</p>
              <p>Guest Checked: {guest.ticketsCheckedIn}</p>

              <p>{guest.contact}</p>
              <p>{guest.tag}</p>

              <button>
                <Link to={`/events/${params.id}/guestlist/${guest._id}`}>
                  Edit
                </Link>
              </button>

              {guest.ticketsCheckedIn === guest.ticketNumber ? (
                <button
                  type="button"
                  disabled
                  onClick={() => this.checkInGuest(index)}
                >
                  Check-in
                </button>
              ) : (
                <button onClick={() => this.checkInGuest(index)}>
                  Check-in
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default GuestList;
