// React or componnents import
import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from "../services/guest-service";

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

export class GuestDetails extends Component {
  service = new GuestService();

  constructor(props) {
    super(props);
    this.state = {
      guestObj: {
        guestFirstName: "",
        guestLastName: "",
        contact: "",
        tag: "",
        ticketNumber: 0,
      },
    };
  }

  componentDidMount() {
    this.getSingleGuest();
  }

  getSingleGuest() {
    const { params } = this.props.match;
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
            tag: "",
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
            tag: "",
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
    const { params } = this.props.match;

    this.service.deleteGuest(params.guestId).then(
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

    const { params } = this.props.match;
    const { classes } = this.props;

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
              <FormControl onSubmit={this.handleFormSubmit}>
                <TextField
                  margin="normal"
                  label="First name"
                  type="text"
                  name="guestFirstName"
                  value={guestFirstName}
                  onChange={this.handleChange}
                />

                <TextField
                  margin="normal"
                  label="Last name"
                  type="text"
                  name="guestLastName"
                  value={guestLastName}
                  onChange={this.handleChange}
                />

                <TextField
                  margin="normal"
                  label="Number of tickets"
                  type="number"
                  name="ticketNumber"
                  value={ticketNumber}
                  onChange={this.handleChange}
                />
                <TextField
                  margin="normal"
                  label="Contact"
                  type="text"
                  name="contact"
                  value={contact}
                  onChange={this.handleChange}
                />
                <TextField
                  margin="normal"
                  label="Tag"
                  type="text"
                  name="tag"
                  value={tag}
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

export default withStyles(styles)(GuestDetails);
