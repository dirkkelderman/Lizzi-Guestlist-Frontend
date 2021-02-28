import React, { Component } from 'react';
import AddEvent from './AddEvent';
import { Link } from 'react-router-dom';
import EventService from './event-service';
import SearchBar from './SearchBar';
export class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      filteredEvents: [],
      loggedInUser: null,
      showAddForm: false,
      theValue: '',
    };
  }
  service = new EventService();
  getEventList = () => {
    this.service.eventList().then(
      (eventsFromApi) => {
        this.setState({
          eventList: eventsFromApi,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  componentDidMount() {
    this.getEventList();
  }
  showAddForm = () => {
    const statusAddForm = !this.state.showAddForm;
    this.setState({
      showAddForm: statusAddForm,
    });
  };
  handleEventSearch = (value) => {
    this.setState({ theValue: value }, () => {
      const newEventList =
        value &&
        this.state.eventList.filter((item) => {
          return item.eventName
            .toLocaleUpperCase()
            .includes(value.toLocaleUpperCase());
        });
      this.setState({
        filteredEvents: newEventList,
      });
    });
  };
  render() {
    return (
      <div>
        <SearchBar filterEvent={this.handleEventSearch} />
        <h1>EventList</h1>
        {/* <h1>Hello user: {this.props.userInSession.username}</h1> */}
        <button onClick={this.showAddForm}>
          {this.state.showAddForm ? 'Hide add form' : 'Add event'}
        </button>
        {this.state.showAddForm ? (
          <AddEvent
            userinSession={this.props.userInSession}
            getEvent={() => this.getEventList()}
          />
        ) : null}
        {this.state.filteredEvents.length !== 0 &&
          this.state.filteredEvents.map((event) => {
            return (
              <div key={event._id}>
                <Link to={`/events/${event._id}/guestlist`}>
                  <h3>{event.eventName}</h3>
                  <p>{event.date}</p>
                </Link>
              </div>
            );
          })}
        {this.state.theValue === '' &&
          this.state.eventList.map((event) => {
            return (
              <div key={event._id}>
                <Link to={`/events/${event._id}/guestlist`}>
                  <h3>{event.eventName}</h3>
                  <p>{event.date}</p>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}
export default EventList;