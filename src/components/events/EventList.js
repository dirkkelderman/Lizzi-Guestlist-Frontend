// React or componnents import
import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventService from "../services/event-service";
import SearchBar from "../searchbar/SearchBar";
import AddEventModal from "./AddEventModal";
import "./EventList.css";

// Material UI import
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';



const styles = theme => ({
    root: {
      width: '100%',
    //   maxWidth: 360,
    },
    form: {
      backgroundColor: '#d2cfd2',
      marginBottom: '10px',
      borderRadius: '15px',
    },
    sortButton: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '10px',
    },
    addButton: {
        backgroundColor: '#fad974',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed', 
        bottom: 25,
        right: 25,
        fontSize: '40',
        color: 'black'

      },
  });


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
      sortDate: false,
      search: "",
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

  sortDate = () => {

    const currentDate = new Date()

    const filterDate = this.state.eventList.filter(event => event).map(event => {
        return event.date 
    }) 

    console.log(filterDate.sort())

    const statusSortDate = !this.state.sortDate;
        this.setState({
            sortDate: statusSortDate,
        })   
  };
  
  handleEventSearch = (value) => {
    this.setState({
      search: value,
    });
  };

  getTotalGuestNumber = (value) => {
    // console.log('hello')
    console.log(`This is the ${value}`);
    // console.log('hello')
  };

  render() {
    let filteredEvents = this.state.eventList.filter((event) => {
      return (
        event.eventName
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    const {classes} = this.props
    const currentDate = new Date()


    return (
        <Container  >

      <div className={classes.root}>
        <SearchBar filteredSearch={this.handleEventSearch} />
        <h2 className="event-list-text">Events</h2>
        
        {
                this.state.sortDate ? (
                <div className={classes.sortButton}>
                <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white", border: '1px solid white' }}
                onClick={this.sortDate}
              >
                Future
              </Button>
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "white", color: "black", border: '1px solid white' }}
                onClick={this.sortDate}
              >
                Past
              </Button>
              </div>) : (
                <div className={classes.sortButton}>
                  <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "white", color: "black", border: '1px solid white' }}
                onClick={this.sortDate}
              >
                Future
              </Button>
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white", border: '1px solid white' }}
                onClick={this.sortDate}
              >
                Past
              </Button>
              </div>)
            }

        {/* {
            this.state.sortDate ? filteredEvents.filter(event => (event < currentDate)).map(filteredEvent => {
                let date = new Date(filteredEvent.date);
                return (
                    <div>
                    <List className={classes.form} key={filteredEvent._id}>
                        <ListItem
                        
                        style={{ color: "black" }}
                        
                        component={Link}
                        to={`/events/${filteredEvent._id}/guestlist`}
                        >
                        <ListItemText
                            primary={filteredEvent.eventName}
                            secondary={date.toDateString()}
                        />
                        <ListItemAvatar>
                            <Avatar>
                            <EditOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        </ListItem>
                    </List>
                    </div>
                );
            }) : filteredEvents.map((event, index) => {
          let date = new Date(event.date);
          return (
            <div>
              <List className={classes.form} key={event._id}>
                <ListItem
                
                  style={{ color: "black" }}
                  
                  component={Link}
                  to={`/events/${event._id}/guestlist`}
                >
                  <ListItemText
                    primary={event.eventName}
                    secondary={date.toDateString()}
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <EditOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </List>
            </div>
          );
        })
        }   */}
        {
            filteredEvents.map((event, index) => {
          let date = new Date(event.date);
          return (
            <div>
              <List className={classes.form} key={event._id}>
                <ListItem
                
                  style={{ color: "black" }}
                  
                  component={Link}
                  to={`/events/${event._id}/guestlist`}
                >
                  <ListItemText
                    primary={event.eventName}
                    secondary={date.toDateString()}
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <EditOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              </List>
            </div>
          );
        })
        }
        

        {this.state.showAddForm ? (
          <AddEventModal
            getEvent={() => this.getEventList()}
            handleShow={this.showAddForm}
          />
        ) : null}

        <Fab className={classes.addButton} color="primary" aria-label="add" onClick={this.showAddForm}>
          <AddIcon />
        </Fab>
      </div>
      </Container>
    );
  }
}

export default withStyles(styles)(EventList);

