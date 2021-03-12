// React or componnents import
import React, { Component } from "react";
import EventService from "../services/event-service";
import EditEvent from "./EditEvent";
import { Link } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


// Material UI import
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  detailsContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    backgroundColor: "#fad974",
    borderRadius: "15px",
  },
  detailsHeader: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  detailsSubHeader: {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  detailsBody: {
    padding: "10px",
    borderRadius: "15px",
  },
  detailsFooter: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
});

export class EventDetails extends Component {
  service = new EventService();

  constructor(props) {
    super(props);
    this.state = {
      //eventObj: {
      eventName: "",
      date: "",
      guestNumber: 0,
      location: "",
      selectedLocation: "",
      description: "",
      _id: "",
      status: "",
      //},
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
          ...responseFromApi,
          selectedLocation: responseFromApi.location,
          location: '',
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      //eventObj: Object.assign({}, this.state.eventObj, { [name]: value }),
      //eventObj: {...this.state.eventObj, { [name]: value }),
      [name] : value
    });
  }

    /*this.setState(state => {
      return {
        eventObj: {...eventObj, { [name]: value }}
      }
    })*/
    

  //   const {
  //     eventName,
  //     date,
  //     guestNumber,
  //     selectedLocation,
  //     description,
  //     _id,
  //   } = this.state;

  //   this.service
  //     .updateEvent(_id, eventName, date, guestNumber, selectedLocation, description)
  //     .then(
  //       (res) => {
  //         console.log(res);
  //         this.setState({
  //           status: "Event updated",
  //         });
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.setState({
  //           status: "Oops, something wrong",
  //         });
  //       }
  //     );
  // };


  handleChangeGeo = location => {
    this.setState({ location });
  };

  handleSelect = location => {
    console.log('Selected location:', location);
    this.setState({selectedLocation: location})
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { params } = this.props.match;
    const {
      eventName,
      date,
      guestNumber,
      selectedLocation,
      description,
      _id,
    } = this.state;

    this.service
      .updateEvent(_id, eventName, date, guestNumber, selectedLocation, description)
      .then(
        (res) => {
          this.setState({
            status: "Event updated",
          });
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

  deleteLocation = () => {
    this.setState({selectedLocation:''})
  }

  render() {
    console.log(this.state.location)
    const { classes } = this.props;
    const { params } = this.props.match;
    const {
      eventName,
      date,
      guestNumber,
      location,
      selectedLocation,
      description,
    } = this.state 
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
                <CloseIcon />
              </Avatar>
            </div>
            <div className={classes.detailsBody}>
              <FormControl>
                <TextField
                  required
                  margin="normal"
                  label="Event Name"
                  type="text"
                  name="eventName"
                  value={eventName}
                  onChange={this.handleChange}
                />

                <TextField required
                label="Event Date"
                margin="normal" 
                type="datetime-local"
                name="date"
                value={date}
                onChange={this.handleChange}
                InputLabelProps={{
                    shrink: true,
                    }}    
                />   


                <TextField
                  margin="normal"
                  label="Max amount guests"
                  type="number"
                  name="guestNumber"
                  value={guestNumber}
                  onChange={this.handleChange}
                />
{/* 
                <TextField
                  margin="normal"
                  label="Location"
                  type="text"
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                /> */}

                <PlacesAutocomplete
        value={this.state.location}
        onChange={this.handleChangeGeo}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          if(selectedLocation){
            return (

               <div><label> Location</label> <br></br>{selectedLocation}<Button onClick={this.deleteLocation}>x</Button></div>
              
            )
          } else {return (
          
          <div>
            <TextField
            margin="normal"
                label="Location" 
                type="text"
                name="location"
              {...getInputProps({
                placeholder: 'Select Location ...',
                className: 'location-search-input',
              })}

            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fad974', cursor: 'pointer' }
                  : { backgroundColor: '#fad974', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
      )}
          }}
      </PlacesAutocomplete>  

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
