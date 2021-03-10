import React, { Component } from "react";
import axios from 'axios';
import ProfileService from "../services/profile-service"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  button: {
    backgroundColor: '#20111e',
    color: '#fad974',
    '&:hover': {
      backgroundColor: "#483745",
      color: '#c5a845'
  },
  border: "solid 1px black",
  },
  loadingAnimation:{
    color: '#20111e',
    display: 'flex',
    justifyContent: 'center'
  }
});
class EditProfileModal extends Component {
  
    constructor(props){
      super(props);
      this.state = {
        userId: props.user._id,
        firstName: props.user.firstName,
        lastName: props.user.lastName,
        email: props.user.email,
        imageUrl: props.user.imageUrl,
        loading: false
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
    const userId = this.state.userId;
    const url = process.env.REACT_APP_API_URL;
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
          console.log("successfully updated");
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          status: "Oops, something wrong",
        });
      }
      )
  };

  handleFileUpload = (event) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", event.target.files[0]);
    this.setState({ loading: true})
    axios
      .post(`${process.env.REACT_APP_API_URL}/upload`, uploadData)
      .then((response) => {
        console.log("response from the api: ", response);
        this.setState({ imageUrl: response.data.imageUrl, loading: false });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };



  render(){
    const {imageUrl} = this.props
    const {classes} = this.props


    return(
      <div className={classes.modal}>
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
         >
          <div className={classes.modalHeader}>
          <Button onClick={this.props.closeModal}>
          <span></span>
            <CloseIcon />
          </Button>
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

          {this.state.loading ? <CircularProgress 
            className={classes.loadingAnimation}
          /> :
            <Button
            className={classes.button}
            type="submit" 
            value="Submit"
            onClick={this.handleFormSubmit}
            >
              Submit
            </Button>
          }

          </FormControl>
          </div>
          </div>

        </div>
    )
  }
}

export default withStyles(styles)(EditProfileModal);