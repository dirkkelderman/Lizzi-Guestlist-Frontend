import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "./guest-service";
import EventService from "../events/event-service";
import AddGuest from "./AddGuest";
import SearchBar from "../searchbar/SearchBar";

export class GuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guestList: [],
      filteredGuests: [],
      theValue: ''
    };
  }

  service = new GuestService();
  eventService = new EventService();

  getGuestList = () => {
    const { params } = this.props.match;

    this.eventService.eventDetails(params.id).then((eventFromDb) => {
      console.log(eventFromDb);
      this.setState({
        guestList: eventFromDb.guest,
      });
    });
  };

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

    console.log("Guest checked-in");
  };

  handleGuestSearch = (value) => {
    this.setState({ theValue: value }, () => {
      const newGuestList =
        value &&
        this.state.guestList.filter((item) => {
          return item.guestFirstName
            .toLocaleUpperCase()
            .includes(value.toLocaleUpperCase());
        });
      this.setState({
        filteredGuests: newGuestList,
      });
    });
  };

  render() {
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

        <AddGuest eventId={params.id} getGuest={() => this.getGuestList()} />


        {this.state.filteredGuests.length !== 0 &&
          this.state.filteredGuests.map((guest, index) => {
            return (
              <div key={guest._id}>
          <p>Name: {guest.guestFirstName}</p>
          {
            guest.guestLastName ? <p>Last name: {guest.guestLastName}</p> : null
          }
          
          <p>No. of ticket: {guest.ticketNumber}</p>    
          <p>Guest Checked: {guest.ticketsCheckedIn}</p>

          <p>{guest.contact}</p>
          <p>{guest.tag}</p>

          <button>
            <Link to={`/events/${params.id}/guestlist/${guest._id}`}>Edit</Link>
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
            <button onClick={() => this.checkInGuest(index)}>Check-in</button>
          )}
        </div>
            );
          })}
        {this.state.theValue === '' &&
          this.state.guestList.map((guest, index) => {
            return (
              <div key={guest._id}>
          <p>Name: {guest.guestFirstName}</p>
          {
            guest.guestLastName ? <p>Last name: {guest.guestLastName}</p> : null
          }
          
          <p>No. of ticket: {guest.ticketNumber}</p>    
          <p>Guest Checked: {guest.ticketsCheckedIn}</p>

          <p>{guest.contact}</p>
          <p>{guest.tag}</p>

          <button>
            <Link to={`/events/${params.id}/guestlist/${guest._id}`}>Edit</Link>
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
            <button onClick={() => this.checkInGuest(index)}>Check-in</button>
          )}
        </div>
            );
          })}

      </div>
    );
  }
}

export default GuestList;
