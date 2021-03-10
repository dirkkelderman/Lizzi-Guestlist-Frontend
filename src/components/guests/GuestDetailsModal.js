import React, { Component } from "react";
import "./AddGuestModal.css"
import GuestService from "../services/guest-service";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Link } from "react-router-dom";
import ChipInput from "material-ui-chip-input";


class GuestDetailsModal extends Component {
  service = new GuestService();

  constructor(props) {
    super(props);
    this.state = {
      guestObj: {
        guestFirstName: "",
        guestLastName: "",
        contact: "",
        tag: [],
        ticketNumber: 0,
        freeTickets: 0,
      },
    };
  }

  componentDidMount() {
    this.getSingleGuest();
  }

  getSingleGuest() {
    const { params } = this.props.eventId;
    this.service.guestDetails(params.guestId).then((responseFromApi) => {
      this.setState({
        guestObj: responseFromApi,
      });
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      guestObj: Object.assign({}, this.state.guestObj, { [name]: value }),
    });

    const { params } = this.props.match;
    const {
      freeTickets,
      guestFirstName,
      guestLastName,
      contact,
      tag,
      ticketNumber,
    } = this.state.guestObj;

    this.service
      .updateGuest(
        params.guestId,
        freeTickets,
        guestFirstName,
        guestLastName,
        contact,
        tag,
        ticketNumber
      )
      .then(
        (res) => {
          console.log(res);
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: [],
            ticketNumber: 0,
            freeTickets: 0,
            status: "Your guest is editted",
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
      freeTickets,
      guestFirstName,
      guestLastName,
      contact,
      tag,
      ticketNumber,
    } = this.state.guestObj;

    this.service
      .updateGuest(
        params.guestId,
        freeTickets,
        guestFirstName,
        guestLastName,
        contact,
        tag,
        ticketNumber
      )
      .then(
        (res) => {
          console.log(res);
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: [],
            ticketNumber: 0,
            freeTickets: 0,
            status: "Your guest is editted",
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

  deleteGuest = () => {
    const { params } = this.props.guestId;

    this.service.deleteGuest(this.props.guestId).then(
      () => {
        this.props.history.push(`/events/${params.id}/guestlist`);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  

  render() {
    const {
      guestFirstName,
      guestLastName,
      contact,
      tag,
      ticketNumber,
    } = this.state.guestObj;

    const { params } = this.props.eventId;

    return (
      <div className="add-guest-modal" onClick={this.props.handleShow}>
        <div
          className="add-guest-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="add-guest-modal-header">
            <h4 className="add-guest-modal-title">Guest Details</h4>
            <button onClick={this.props.handleShow} className="button">
              Close
            </button>
          </div>
          
          <div className="add-guest-modal-body">
        
            <FormControl onSubmit={this.handleFormSubmit}>
              <TextField required
                label="guestFirstName" 
                type="text"
                name="guestFirstName"
                value={guestFirstName}
                onChange={this.handleChange}    
                />
            
            <TextField 
                label="guestLastName" 
                type="text"
                name="guestLastName"
                value={guestLastName}
                onChange={this.handleChange}    
                />

            <TextField
                label="Number of tickets" 
                type="number"
                name="ticketNumber"
                value={ticketNumber}
                onChange={this.handleChange}    
                /> 
 
            <TextField
                label="Contact" 
                type="text"
                name="contact"
                value={contact}
                onChange={this.handleChange}    
                /> 

            {/* <TextField
                label="Tag" 
                type="text"
                name="tag"
                value={tag}
                onChange={this.handleChange}    
                />  */}

            <ChipInput
                    label="Guest Tags"
                    value={tag}
                    onAdd={(chip) => this.handleAddChip(chip)}
                    onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                />
                

              <div className="add-guest-modal-footer">
                <input type="submit" value="Submit" onClick={this.handleFormSubmit}/>
              </div>

              <button onClick={this.deleteGuest}>Delete Guest</button>


            </FormControl>

           
          </div>
        </div>
      </div>
    );
  }
}

export default GuestDetailsModal;
