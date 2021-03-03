import React, { Component } from "react";
import "./AddGuestModal.css"
import GuestService from "../services/guest-service";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

class AddGuestModal extends Component {
  service = new GuestService();

  constructor(props) {
    super(props);

    this.state = {
        guestFirstName: "",
        guestLastName: "",
        contact: "",
        tag: "",
        ticketNumber: 1,
        // freeTickets: 0,
        showAdvancedForm: false,
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('Guest created')
    const {
        guestFirstName,
        guestLastName,
        contact,
        tag,
        ticketNumber,
      //   freeTickets,
      } = this.state;
      const event = this.props.eventId;

    this.service
    .addGuest(
        event,
        guestFirstName,
        guestLastName,
        contact,
        tag,
        ticketNumber,
        // freeTickets
      )
      .then(
        (res) => {
          this.props.getGuest();
          console.log(res);
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: "",
            ticketNumber: 1,
            // freeTickets: 0,
            status: "Your guest is created",
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

  showAdvancedForm = () => {
    const statusAdvancedForm = !this.state.showAdvancedForm;
    this.setState({
      showAdvancedForm: statusAdvancedForm,
    });
  };


  render() {
    return (
      <div className="add-guest-modal" onClick={this.props.handleShow}>
        <div
          className="add-guest-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-guest-modal-header">
            <h4 className="add-guest-modal-title">Add Guest</h4>
            <button onClick={this.props.handleShow} className="button">
              Close
            </button>
            <button onClick={this.showAdvancedForm}>{ this.state.showAdvancedForm ? "Simple Form" : "Advanced Form"}</button>
          </div>
          
          <div className="add-guest-modal-body">
          {
            this.state.showAdvancedForm ? (
            <FormControl onSubmit={this.handleFormSubmit}>
              <TextField required
                label="guestFirstName" 
                type="text"
                name="guestFirstName"
                value={this.state.guestFirstName}
                onChange={this.handleChange}    
                />
            
            <TextField 
                label="guestLastName" 
                type="text"
                name="guestLastName"
                value={this.state.guestLastName}
                onChange={this.handleChange}    
                />

            <TextField
                label="Number of tickets" 
                type="number"
                name="ticketNumber"
                value={this.state.ticketNumber}
                onChange={this.handleChange}    
                /> 
 
            <TextField
                label="Contact" 
                type="text"
                name="contact"
                value={this.state.contact}
                onChange={this.handleChange}    
                /> 

            <TextField
                label="Tag" 
                type="text"
                name="tag"
                value={this.state.tag}
                onChange={this.handleChange}    
                /> 
                

              <div className="add-guest-modal-footer">
                <input type="submit" value="Submit" onClick={this.handleFormSubmit}/>
              </div>

            </FormControl>

            ) : (
            <FormControl onSubmit={this.handleFormSubmit}>
              <TextField required
                label="guestFirstName" 
                type="text"
                name="guestFirstName"
                value={this.state.guestFirstName}
                onChange={this.handleChange}    
                />

            <TextField
                label="Number of tickets" 
                type="number"
                name="ticketNumber"
                value={this.state.ticketNumber}
                onChange={this.handleChange}    
                /> 
 
                

              <div className="add-guest-modal-footer">
                <input type="submit" value="Submit" onClick={this.handleFormSubmit} />
              </div>

            </FormControl> 
            )
          }
            {/* <FormControl onSubmit={this.handleFormSubmit}>
              <TextField required
                label="guestFirstName" 
                type="text"
                name="guestFirstName"
                value={this.state.guestFirstName}
                onChange={this.handleChange}    
                />

            <TextField
                label="Number of tickets" 
                type="number"
                name="ticketNumber"
                value={this.state.ticketNumber}
                onChange={this.handleChange}    
                /> 
 
                

              <div className="add-guest-modal-footer">
                <input type="submit" value="Submit" />
              </div>

            </FormControl> */}
          </div>
        </div>
      </div>
    );
  }
}

export default AddGuestModal;
