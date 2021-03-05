import React, { Component } from 'react';
import axios from 'axios';
import ProfileService from "../services/profile-service";

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
    return(
      <React.Fragment>

        <form onSubmit={this.handleFormSubmit}>
        <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            </div>
            <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            </div>

            <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            </div>

            <div>
              <label>Profile Image:</label>
              <input
                type="file"
                name="imageUrl"
                value ={imageUrl}
                alt="Profile Image"
                onChange={this.handleFileUpload}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
      </React.Fragment>
    )
  }
}

export default EditProfile;