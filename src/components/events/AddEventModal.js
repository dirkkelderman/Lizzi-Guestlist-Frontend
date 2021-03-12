import React, { Component } from "react";
import "./AddEventModal.css";
import EventService from "../services/event-service";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router-dom";
import { notify } from 'react-notify-toast'


const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'black'
    },
  });

class AddEventModal extends Component {
  service = new EventService();

  constructor(props) {
    super(props);

    this.state = {
      eventName: "",
      date: "",
      guestNumber: 0,
      location: "",
      selectedLocation: '',
      description: "",
      status: "",
      coOwner: ""
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {eventName, date, guestNumber, location, description, coOwner} = this.state

    this.service
      .addEvent(eventName, date, guestNumber, this.state.selectedLocation, description, coOwner)
      .then(
        (res) => {
          this.props.getEvent();
          this.setState({
            eventName: "",
            date: "",
            guestNumber: "",
            location: "",
            description: "",
            coOwner: "",
            status: "Your project is created",
          })
          notify.show(res.msg)
        //   this.props.history.push(`/events`);
        },
        (err) => {
          console.log(err);
          this.setState({
            status: "Oops, something wrong",
          });
        }
      )
      .then(() => this.props.handleShow());
      
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
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
  render() {
    const {classes} = this.props
    const { selectedLocation} = this.state;

    return (
        <Container>

      <div className="add-event-modal" >
        <div
          className="add-event-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-event-modal-header">
            <span></span>
            <CloseIcon onClick={this.props.handleShow}/>
          </div>
          
          <div className="add-event-modal-body">
            <FormControl onSubmit={this.handleFormSubmit}>
              <TextField required
              margin="normal"
                label="Event Name" 
                type="text"
                name="eventName"
                value={this.state.eventName}
                onChange={this.handleChange}    
                />



            <TextField required
                label="Event Date"
                margin="normal" 
                type="datetime-local"
                name="date"
                value={this.state.date}
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
                value={this.state.guestNumber}
                onChange={this.handleChange}    
                /> 

<PlacesAutocomplete
        value={this.state.location}
        onChange={this.handleChangeGeo}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          if(selectedLocation){
            return (

               <div><label> Location</label> <br></br>{selectedLocation}<Button onClick={e=>this.setState({selectedLocation:''})}>x</Button></div>
              
            )
          }
          return(
          
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
        )}}
      </PlacesAutocomplete>  

            <TextField
            margin="normal"
                label="Description" 
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}    
                /> 
                

            <TextField
                margin="normal"
                label="Add extra user" 
                type="text"
                name="coOwner"
                value={this.state.coOwner}
                onChange={this.handleChange}    
                /> 

              <div className={classes.modalFooter}>
                <Button
                    type="submit"
                    value="Submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={this.handleFormSubmit}
                  >
                    Add Event
                  </Button>
                </div>

            </FormControl>
          </div>
        </div>
      </div>
      </Container>
    );
  }
}

export default withStyles(styles)(AddEventModal);
