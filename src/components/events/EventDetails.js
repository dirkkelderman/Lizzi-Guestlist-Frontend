// React or componnents import
import React, { Component } from "react";
import EventService from "../services/event-service";
import EditEvent from "./EditEvent";
import { Link } from "react-router-dom";

// Material UI import
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  detailsContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      height: 'auto',
      backgroundColor: '#fad974',
      borderRadius: '15px',
  },
  detailsHeader: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  detailsSubHeader: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  detailsBody: {
      padding: '10px',
      borderRadius: '15px',
  },
  detailsFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
  },
});

export class EventDetails extends Component {
  service = new EventService();

  constructor(props) {
    super(props);
    this.state = {
      eventObj: {
        eventName: "",
        date: "",
        guestNumber: 0,
        location: "",
        description: "",
        _id: "",
        status: "",
      },      
      showEditForm: false,
    };
  }

  componentDidMount() {
    this.getSingleEvent();
  }

  getSingleEvent() {
    const { params } = this.props.match;
    this.service.eventDetails(params.id).then(
      (responseFromApi) => {
        this.setState({
          eventObj: responseFromApi
        })
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      eventObj: Object.assign({}, this.state.eventObj, { [name]: value }),
    });

    const { params } = this.props.match;
    const {
      eventName,
      date,
      guestNumber,
      location,
      description,
      _id
    } = this.state.eventObj;

    this.service
      .updateEvent(
        _id,
        eventName,
      date,
      guestNumber,
      location,
      description,
      )
      .then(
        (res) => {
          console.log(res);
          this.setState({
            status: "Event updated",
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
      eventName,
      date,
      guestNumber,
      location,
      description,
      _id
    } = this.state.eventObj;

    this.service
      .updateEvent(
        _id,
        eventName,
      date,
      guestNumber,
      location,
      description,
      )
      .then(
        (res) => {
          console.log(res);
          this.setState({
            status: "Event updated",
          })
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

  deleteEvent = () => {
    const { params } = this.props.match;

    this.service.deleteEvent(params.id).then(
      () => {
        this.props.history.push("/events");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  render() {
    const {classes} = this.props
    const { params } = this.props.match;
    const { eventName, date, guestNumber, location, description} = this.state.eventObj;

    return (
    <Container>
      <div className={classes.details}>
        <div className={classes.detailsContent}>
        <div className={classes.detailsHeader}>
        <Avatar
            onClick={this.handleFormSubmit}
            component={Link}
            to={`/events/${params.id}/guestlist`}
          >
                        <CloseIcon/>

          </Avatar>


        </div>
        <div className={classes.detailsBody}>
          <FormControl>
          <TextField required
              margin="normal"
                label="Event Name" 
                type="text"
                name="eventName"
                value={eventName}
                onChange={this.handleChange}    
                />

            <TextField required
                // label="Date"
                margin="normal" 
                type="date"
                name="date"
                value={date}
                onChange={this.handleChange}    
                />   

            <TextField
            margin="normal"
                label="Max amount guests" 
                type="number"
                name="guestNumber"
                value={guestNumber}
                onChange={this.handleChange}    
                /> 

            <TextField
            margin="normal"
                label="Location" 
                type="text"
                name="location"
                value={location}
                onChange={this.handleChange}    
                />     

            <TextField
            margin="normal"
                label="Description" 
                type="text"
                name="description"
                value={description}
                onChange={this.handleChange}    
                /> 
          </FormControl>
        </div>
        <div className={classes.detailsFooter}>
                  <Button
                    type="submit"
                    value="Submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={this.deleteEvent}
                  >
                    Delete
                  </Button>
        <Button
                    type="submit"
                    value="Submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={this.handleFormSubmit}
                  >
                    Save
                  </Button>
        </div>
        </div>
        
      </div>
      </Container>
      
      

    );
  }
}

export default withStyles(styles)(EventDetails);

     