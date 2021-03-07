import React, { Component } from "react";
import axios from 'axios';
// import "./EditProfile.css"
import ProfileService from "../services/profile-service"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
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
class EditProfileModal extends Component {
  
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
      <div className={classes.modal} onClick={this.props.handleShow}>
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
         >
          <div className={classes.modalHeader}>
            <CloseIcon onClick={this.props.handleShow}/>
          </div>


    <div className={classes.modalBody}>

        <FormControl onSubmit={this.handleFormSubmit}>
            <TextField
              id="filled-basic" 
              label="First Name"
              variant="filled" 
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <TextField
              id="filled-basic"
              label="Last Name" 
              variant="filled"
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <TextField
              id="filled-basic" 
              label="email"
              variant="filled"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            <div>
            <Button
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
           className="edit-profile-modal-footer"
          type="submit" 
          value="Submit"
          onClick={this.handleFormSubmit}
          >
            Submit
          </Button>

          </FormControl>
          </div>
          </div>

        </div>
    )
  }
}

export default withStyles(styles)(EditProfileModal);