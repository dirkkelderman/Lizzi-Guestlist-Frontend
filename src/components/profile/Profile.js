import React, { Component } from "react";
import ProfileService from "../services/profile-service";
import axios from "axios";
import EditProfile from './EditProfile'
import AuthService from "../services/auth-service";

// Material UI import
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';




const styles = theme => ({
  root: {
    backgroundColor: "#FAD974",
    color: '#20111f',
    display: 'center',
  },
  profileImage: {
    borderRadius: "50%", 
    border: "solid 1px black",
    height:"200px",
    width: "180px"
  },
  profileInfo: {
    backgroundColor: '#FEF7E3',
    color: '#20111f',
    borderRadius: "16px",
  },
  button: {
    backgroundColor: '#20111e',
    color: '#fad974',
    '&:hover': {
      backgroundColor: "#483745",
      color: '#c5a845'
  },
  border: "solid 1px black",

  }
});

export class Profile extends Component {
  service = new ProfileService();
  serviceAuth = new AuthService();

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      data: {},
      user: {},
      showForm: false,
      email: "",
      firstName:"",
      lastName:"",
      imageUrl: "",
    };
  }
  componentDidMount() {
    this.getSingleUser();
  }

  getSingleUser() {
    const { params } = this.props.match;

    this.service.profile(params.id).then(
      (responseFromApi) => {
        console.log("response from API", responseFromApi);
        this.setState({
          user: responseFromApi,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onEditProfileSubmit = (user) => {
    this.setState(state => {
      return {
        user: {
          ...state.user, ...user
        },
        showForm: false
      }
    })
  }

  logoutUser = () => {
    this.serviceAuth.logout()
        .then(() => {
            this.props.getUser(null);
        })
}

  render() {
    const {classes} = this.props
    return (
      <Container>
      <div className={classes.root}>
        <h1 >User Profile</h1>
        <img
          src={`${this.state.user.imageUrl}`}
          className={classes.profileImage}
          alt="Profile Pic"
        />
        <br></br>
        <div  display="flex" justifyContent="center">
          <Box className={classes.profileInfo} margin="Auto" justifyContent="center" width="50%">
            <Box >
              <Box component="h1" display="block" p={1} m={0}> {this.state.user.firstName}</Box>
              <Box component="h1" display="block" p={1} m={0}>{this.state.user.lastName}</Box>
            </Box>
            <Box >
            <Box  component="h1" display="block" p={1} m={0}>{this.state.user.email}</Box> 
            </Box>
          </Box>
        </div>
        <div>
        <br />
          <Button
            className={classes.button}
            onClick={() => this.setState({ showForm: !this.state.showForm })}
            variant="contained"
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button>
        </div>
        <br />
        {this.state.showForm && <EditProfile
             handleChange={this.handleChange}
             onSubmit={this.onEditProfileSubmit}
             handleFileUpload = {this.handleFileUpload}
             user = {this.state.user}
             parentProps = {this.props}
             getSingleUser = {this.getSingleUser}
        />}
        <div  >
        <br />

        <Button 
          className={classes.button} 
          onClick={this.logoutUser}
          variant="contained"
          startIcon={<MeetingRoomIcon />}
          >
           Logout
        </Button>
        </div>
      </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
