import React, { Component } from "react";
import "./AddEventModal.css";
import EventService from "../services/event-service";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

class AddEventModal extends Component {
  service = new EventService();

  constructor(props) {
    super(props);

    this.state = {
      eventName: "",
      date: "",
      guestNumber: 0,
      location: "",
      description: "",
      status: "",
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const eventName = this.state.eventName;
    const date = this.state.date;
    const guestNumber = this.state.guestNumber;
    const location = this.state.location;
    const description = this.state.description;

    this.service
      .addEvent(eventName, date, guestNumber, location, description)
      .then(
        (res) => {
          this.props.getEvent();
          console.log(res);
          this.setState({
            eventName: "",
            date: "",
            guestNumber: "",
            location: "",
            description: "",
            status: "Your project is created",
          });
        },
        (err) => {
          console.log(err);
          this.setState({
            status: "Oops, something wrong",
          });
        }
      )
      .then(() => this.props.handleShow);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="add-event-modal" onClick={this.props.handleShow}>
        <div
          className="add-event-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-event-modal-header">
            <h4 className="add-event-modal-title">Add Event</h4>
            <button onClick={this.props.handleShow} className="button">
              Close
            </button>
          </div>
          
          <div className="add-event-modal-body">
            <FormControl onSubmit={this.handleFormSubmit}>
              <TextField required
                label="eventName" 
                type="text"
                name="eventName"
                value={this.state.eventName}
                onChange={this.handleChange}    
                />

            <TextField required
                // label="Date" 
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}    
                />   

            <TextField
                label="Max amount guests" 
                type="number"
                name="guestNumber"
                value={this.state.guestNumber}
                onChange={this.handleChange}    
                /> 

            <TextField
                label="Location" 
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}    
                />     

            <TextField
                label="Description" 
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}    
                /> 
                

              <div className="add-event-modal-footer">
                <input type="submit" value="Submit" />
              </div>

            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEventModal;
