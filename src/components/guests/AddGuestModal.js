import React, { Component } from "react";
import "./AddGuestModal.css"
import GuestService from "../services/guest-service";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'black'
    },
    modal:{
        position: 'fixed',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '95%',
        height: 'auto',
        backgroundColor: '#fad974',
        borderRadius: '15px',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalSubHeader: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBody: {
        padding: '10px',
        borderRadius: '15px',
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
    },
  });

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
      )
      .then(
        (res) => {
          this.props.getGuest();
          this.setState({
            guestFirstName: "",
            guestLastName: "",
            contact: "",
            tag: "",
            ticketNumber: 1,
            status: "Your guest is created",
          })
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
    const {classes} = this.props

    return (
      <div className={classes.modal} onClick={this.props.handleShow}>
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
         >
          <div className={classes.modalHeader}>
          <span></span>
            <CloseIcon onClick={this.props.handleShow}/>


          </div>

          <div className={classes.modalBody}>
            
            {
                this.state.showAdvancedForm ? (
                <div className={classes.modalSubHeader}>
                <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={this.showAdvancedForm}
              >
                Simple
              </Button>
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={this.showAdvancedForm}
              >
                Advanced
              </Button>
              </div>) : (
                <div className={classes.modalSubHeader}>
                  <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "white", color: "black" }}
                onClick={this.showAdvancedForm}
              >
                Simple
              </Button>
              <Button
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={this.showAdvancedForm}
              >
                Advanced
              </Button>
              </div>)
            }

            {this.state.showAdvancedForm ? (
              <FormControl onSubmit={this.handleFormSubmit}>
                <TextField
                  required
                  label="Guest name"
                  type="text"
                  name="guestFirstName"
                  value={this.state.guestFirstName}
                  onChange={this.handleChange}
                />

                <TextField
                  label="Last name"
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

                <div className={classes.modalFooter}>
                <Button
                    type="submit"
                    value="Submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={this.handleFormSubmit}
                  >
                    Add Guest
                  </Button>
                </div>
              </FormControl>
            ) : (
              <FormControl onSubmit={this.handleFormSubmit}>
                <TextField
                  required
                  label="Guest name"
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

                <div className={classes.modalFooter}>
                  <Button
                    cursor= 'pointer'
                    type="submit"
                    value="Submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={this.handleFormSubmit}
                  >
                    Add Guest
                  </Button>
                </div>
              </FormControl>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddGuestModal);

