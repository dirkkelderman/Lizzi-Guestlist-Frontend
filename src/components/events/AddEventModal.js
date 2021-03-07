import React, { Component } from "react";
import "./AddEventModal.css";
import EventService from "../services/event-service";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from "react-router-dom";


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
          this.props.history.push(`/events`);
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

  render() {
    const {classes} = this.props

    return (
        <Container>
        <div className={classes.paper}>

            <h2>Testing</h2>

        </div>
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
                // label="Date"
                margin="normal" 
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}    
                />   

            <TextField
            margin="normal"
                label="Max amount guests" 
                type="number"
                name="guestNumber"
                value={this.state.guestNumber}
                onChange={this.handleChange}    
                /> 

            <TextField
            margin="normal"
                label="Location" 
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleChange}    
                />     

            <TextField
            margin="normal"
                label="Description" 
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}    
                /> 
                

              <div className="add-event-modal-footer">
              <Button
              cursor= 'pointer'
            type="submit"
            value="Submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: "black", color: 'white', cursor: 'pointer'}}
            onClick={this.handleFormSubmit}
          >
            Add event
          </Button>

                {/* <input type="submit" value="Submit" /> */}
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
// export default AddEventModal;
