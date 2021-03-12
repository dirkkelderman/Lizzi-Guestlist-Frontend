import React, { Component } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import EventService from "../services/event-service";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EditProject extends Component {
  service = new EventService();

  state = {
    eventName: this.props.theEvent.eventName,
    date: this.props.theEvent.date,
    guestNumber: this.props.theEvent.guestNumber,
    location: this.props.theEvent.location,
    description: this.props.theEvent.description,
    _id: this.props.theEvent._id,
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      eventName,
      date,
      guestNumber,
      location,
      description,
      _id,
    } = this.state;

    this.service
      .updateEvent(_id, eventName, date, guestNumber, location, description)
      .then(
        (res) => {
          console.log(res);
          this.props.history.push("/events");
        },
        (err) => {
          console.log(err);
        }
      );
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({[name]: value });
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
    const { selectedLocation} = this.state;
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Event name</label>
          <input
            type="text"
            name="eventName"
            value={this.state.eventName}
            onChange={this.handleChange}
          />

          {/* <label>Date</label>
            <input type='date' name='date' value={this.state.date} onChange={this.handleChange} /> */}

          <label>Number of guests</label>
          <input
            type="number"
            name="guestNumber"
            value={this.state.guestNumber}
            onChange={this.handleChange}
          />
            {/* <PlacesAutocomplete
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
      </PlacesAutocomplete>   */}

          {/* <label>location</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          /> */}

          <label>description</label>
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditProject;
