import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "../services/guest-service";
import EventService from "../services/event-service";
import AddGuest from "./AddGuest";
import SearchBar from "../searchbar/SearchBar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemLink from "@material-ui/core/Divider";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './GuestList.css'

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

        <h4>Event Name</h4>

        <button>
          <Link to={`/events/${params.id}`}>Event Details</Link>
        </button>
      <div>

      </div>
        

        <SearchBar filteredSearch={this.handleGuestSearch} />

        
        <h4>
          Guests: {this.state.totalGuestsCheckedIn}/{this.state.totalGuests}
        </h4>

        <AddGuest eventId={params.id} getGuest={() => this.getGuestList()} />

        {filteredGuests.map((guest, index) => {
          return (
            <div>
              <List className="guest-list">
                <ListItem key={guest._id} className="guest-list-item">
                  <ListItemText
                    primary={guest.guestFirstName}
                    secondary="CREW"
                  />
                  <ListItemText
                    primary={guest.ticketsCheckedIn}
                  />
                  <ListItemText
                    primary={guest.ticketNumber}
                  />
                  <ListItemAvatar>
                    <Avatar component={Link}
                  to={`/events/${params.id}/guestlist/${guest._id}`}>
                      <EditOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>

                  {guest.ticketsCheckedIn === guest.ticketNumber ? (
                    <ListItemAvatar>

                  </ListItemAvatar>

              ) : (
                <ListItemAvatar>
                    <Avatar onClick={() => this.checkInGuest(index)}>
                      <DoneOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
              )}

                </ListItem>
               </List>



              <p>{guest.contact}</p>
              <p>{guest.tag}</p> 

            </div>
          );
        })}
      </div>
    );
  }
}

export default GuestList;
