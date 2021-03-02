import React, { Component } from 'react';
import AddEvent from './AddEvent';
import { Link } from 'react-router-dom';
import EventService from './event-service';
import SearchBar from '../searchbar/SearchBar';

export class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      filteredEvents: [],
      totalGuests: 0,
      totalGuestsCheckedIn: 0,
      loggedInUser: null,
      showAddForm: false,
      search: ''
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
        this.setState({
            search: value
        }) 

  };

    getTotalGuestNumber = (value) => {
    // console.log('hello')
    console.log(`This is the ${value}`)
    // console.log('hello')

  }
  
  
  render() {

      let filteredEvents = this.state.eventList.filter(
          (event => {
              return event.eventName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          })
      )


    return (
      <div>
        <SearchBar filteredSearch={this.handleEventSearch} />
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

        {
            filteredEvents.map((event) => {
            let date =  new Date(event.date)
            return (
              <div key={event._id}>
                <Link to={`/events/${event._id}/guestlist`} totalguestnumber={this.getTotalGuestNumber()} >
                  <h3>{event.eventName}</h3>
                  <p>{date.toDateString()}</p>
                </Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}
export default EventList;