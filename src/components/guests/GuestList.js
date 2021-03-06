// React or componnents import
import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "../services/guest-service";
import EventService from "../services/event-service";
import SearchBar from "../searchbar/SearchBar";
import AddGuestModal from "./AddGuestModal";

// Material UI import
import {List, ListItem, ListItemText, ListItemAvatar, Avatar, Fab, Container, Button, Grid} from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  form: {
    backgroundColor: "#d2cfd2",
    marginBottom: "10px",
    borderRadius: "15px",
  },
  addButton: {
    backgroundColor: "#fad974",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 25,
    right: 25,
    fontSize: "40",
    color: 'black'
  },
  checkIn: {
    backgroundColor: "#fad974",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    borderRadius: "15px",

  },
  guestListHeading: {
    color: "#fad974"
  }
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
        isLoading: false,
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
        || guest.guestLastName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
  
      );
    });

    const { classes } = this.props;
    const { params } = this.props.match;

    return (
      <Container>
        <div className={classes.root}>
          <div>
            <h2 className={classes.guestListHeading}>{this.state.event.eventName}</h2>
            <Button
              variant="contained"
              className={classes.submit}
              style={{ backgroundColor: "#fad974" }}
              component={Link}
              to={`/events/${params.id}`}
            >
              Edit Event
            </Button>
          </div>

          <SearchBar filteredSearch={this.handleGuestSearch} />

          <h4 className="guest-list-text">
            Guests: {this.state.totalGuestsCheckedIn}/{this.state.totalGuests}
          </h4>

          {this.state.isLoading ? (
            <img src="../home/lizzilogo groot geel.png" alt="loading" />
          ) : null}

          {filteredGuests.map((guest, index) => {
            return (
              <div>
            { guest.ticketsCheckedIn === guest.ticketNumber ? (
              <Grid container>
              <Grid item xs={12} className={classes.form}>
              <List>
                <ListItem>
                  <ListItemText 
                      primary={guest.guestFirstName + " " + guest.guestLastName}
                      secondary={guest.tag}
                  />
                  <ListItemText
                      primary={
                        guest.ticketsCheckedIn + "/" + guest.ticketNumber
                      }
                    />
                  <ListItemAvatar>
                    <Avatar
                      component={Link}
                      to={`/events/${params.id}/guestlist/${guest._id}`}
                      style={{ backgroundColor: "black" }}
                      guestId={guest._id}
                    >
                      <EditOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </List>
            </Grid>
            
            
            </Grid>) : 
            <Grid container>
        
            <Grid item xs={10} className={classes.form}>
              <List>
                <ListItem>
                  <ListItemText 
                      primary={guest.guestFirstName + " " + guest.guestLastName}
                      secondary={guest.tag}
                  />
                  <ListItemText
                      primary={
                        guest.ticketsCheckedIn + "/" + guest.ticketNumber
                      }
                    />
                  <ListItemAvatar>
                    <Avatar
                      component={Link}
                      to={`/events/${params.id}/guestlist/${guest._id}`}
                      style={{ backgroundColor: "black" }}
                    >
                      <EditOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </List>
            </Grid>
            <Grid
              item
              xs={2}
              className={classes.checkIn}
              container
              justify="center"
              alignItems="center"
            >
              <Avatar
                style={{ backgroundColor: "black" }}
                onClick={() => this.checkInGuest(index)}
              >
                <DoneOutlinedIcon />
              </Avatar>
            </Grid>
          </Grid>
            
            }
            </div>
            );
          })}

          

          {this.state.showAddForm ? (
            <AddGuestModal
              eventId={params.id}
              getGuest={() => this.getGuestList()}
              handleShow={this.showAddForm}
            />
          ) : null}
        </div>

        <Fab
          className={classes.addButton}
          color="primary"
          aria-label="add"
          onClick={this.showAddForm}
        >
          <AddIcon />
        </Fab>
      </Container>
    );
  }
}

export default withStyles(styles)(GuestList);
