// React or componnents import
import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "../services/guest-service";
import EventService from "../services/event-service";
import SearchBar from "../searchbar/SearchBar";
import './GuestList.css'
import AddGuestModal from './AddGuestModal'
import GuestDetailsModal from './GuestDetailsModal'

// Material UI import
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  form: {
    backgroundColor: '#d2cfd2',
    marginBottom: '10px',
    borderRadius: '15px',
  },
  bottomView: {
    // width: '100%',
    // height: 50,
    backgroundColor: '#fad974',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});

export class GuestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      guestList: [],
      totalGuests: 0,
      totalGuestsCheckedIn: 0,
      filteredGuests: [],
      search: "",
      showAddForm: false,
      showDetailsForm: false,
      isLoading: true,
    };
  }

  service = new GuestService();
  eventService = new EventService();

  showAddForm = () => {
    const statusAddForm = !this.state.showAddForm;
    this.setState({
      showAddForm: statusAddForm,
    });
  };

  showDetailsForm = () => {
    const statusDetailsForm = !this.state.showDetailsForm;
    this.setState({
      showDetailsForm: statusDetailsForm,
    });
  };


  getGuestList = () => {
    const { params } = this.props.match;

    this.eventService.eventDetails(params.id).then((eventFromDb) => {
      this.setState({
        event: eventFromDb,
        guestList: eventFromDb.guest,
        isLoading: false
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
    
    const {classes} = this.props
    const { params } = this.props.match;

    return (
      <div className={classes.root}>

        <div className="guest-list-submenu">
        <Avatar component={Link}
                  to={`/events`}>
                      <ArrowBackIosOutlinedIcon />
                    </Avatar>
 
          <h4 className="guest-list-text">{this.state.event.eventName}</h4>
          <Avatar component={Link}
                  to={`/events/${params.id}`}>
                      <EditOutlinedIcon />
                    </Avatar>

        </div>

      
        <SearchBar filteredSearch={this.handleGuestSearch} />

        
        <h4 className="guest-list-text">
          Guests: {this.state.totalGuestsCheckedIn}/{this.state.totalGuests}
        </h4>

        {
          this.state.isLoading ? <h1>LOADING </h1> : null
        }

        {filteredGuests.map((guest, index) => {
          return (
            <div>
              <List className={classes.form} key={guest._id}>
                <ListItem  className="guest-list-item">
                  <ListItemText
                    primary={guest.guestFirstName + ' ' + guest.guestLastName}
                    secondary={guest.tag}
                  />
                  <ListItemText
                    primary={guest.ticketsCheckedIn + '/' + guest.ticketNumber}
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
            </div>
          );
        })}

        {
            this.state.showAddForm ? <AddGuestModal eventId={params.id} getGuest={() => this.getGuestList()} handleShow={this.showAddForm}/> : null
        }

        {
            this.state.showDetailsForm ? <GuestDetailsModal eventId={params.id} getGuest={() => this.getGuestList()} handleShow={this.showDetailsForm}/> : null
        }
        
        <Fab className={classes.bottomView} color="primary" aria-label="add" onClick={this.showAddForm} >
        <AddIcon style={{ fontSize: 40 }} />
        </Fab>

      </div>
    );
  }
}

export default withStyles(styles)(GuestList);
