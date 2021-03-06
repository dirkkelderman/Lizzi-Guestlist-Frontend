import React, { Component } from 'react';
import axios from 'axios';
import ProfileService from "../services/profile-service";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

const styles = theme => ({
  root: {
    backgroundColor: "#FAD974",
    color: '#20111f',
    display: 'center',
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

class EditProfile extends Component {
  
    constructor(props){
      super(props);
      this.state = {
        userId: props.user._id,
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        imageUrl: props.user.imageUrl
      }
    }


  handleChange = (event) => {
    const {value, name} = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', this.state.user);
    //console.log(user._id)
    const userId = this.state.userId;
    const url = "http://localhost:5000/api";
    const saveUser = {
      firstName: this.state.firstName || this.state.user.firstName,
      lastName: this.state.lastName || this.state.user.lastName,
      email: this.state.email || this.state.user.email,
      imageUrl: this.state.imageUrl || this.state.user.imageUrl,
    };
    fetch(`${url}/profile/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(saveUser),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("fetched", this);
        if (res.success === true) {
          this.props.onSubmit(saveUser);
          this.props.parentProps.history.push(`/Profile/${userId}`);
          // window.location = "/Profile"
          console.log("successfully updated");
          // this.props.getSingleUser()
        }
      })
      .catch((err) => console.log(err));
  };

  handleFileUpload = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);

    axios
      .post("http://localhost:5000/api/upload", uploadData)
      .then((response) => {
        console.log("response from the api: ", response);
        this.setState({ imageUrl: response.data.imageUrl });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render(){
    const {imageUrl} = this.props
    const {classes} = this.props
    return(
      <React.Fragment>

        <form onSubmit={this.handleFormSubmit}>
        <div>
            <TextField
              id="filled-basic" 
              label="First Name"
              variant="filled" 
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            </div>
            <div>
            <TextField
              id="filled-basic"
              label="Last Name" 
              variant="filled"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            </div>

            <div>
            <TextField
              id="filled-basic" 
              label="email"
              variant="filled"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            </div>
            <br />
            <div>
            <Button
              className={classes.button}
              variant="contained"
              component="label"
              startIcon={<PhotoCameraIcon />}
            >Upload
            <input
                type="file"
                name="imageUrl"
                value ={imageUrl}
                alt="Profile Image"
                onChange={this.handleFileUpload}
                hidden
              />
          </Button>
          </div>
          <br />
          <Button
          className={classes.button} 
          type="submit" 
          value="Submit"
          >
            Submit
          </Button>
          </form>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(EditProfile);