import React, { Component } from "react";
import ProfileService from "../services/profile-service";
import axios from "axios";

export class Profile extends Component {
  service = new ProfileService();
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      data: {},
      user: {},
      showForm: false,
      email: "",
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

  handleFormSubmit = (e) => {
    e.preventDefault();
    const user = this.state.user;
    //console.log(user._id)
    const userId = user._id;
    const url = "http://localhost:5000/api";
    fetch(`${url}/profile/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        email: this.state.email || this.state.user.email,
        imageUrl: this.state.imageUrl || this.state.user.imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("fetched", userId);
        if (res.success === true) {
          this.props.history.push(`/Profile/${userId}`);
          // window.location = "/Profile"
          console.log("successfully updated");
        }
      })
      .catch((err) => console.log(err));
  };

  handleFileUpload = (event) => {
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/projects' POST route
    uploadData.append("imageUrl", event.target.files[0]);

    axios
      .post("http://localhost:5000/api/upload", uploadData)
      .then((response) => {
        // response.image_url --> this must be the same name than the property we receive from the api
        // if it doesn't work, try to console.log response we get from the api ;)
        console.log("response from the api: ", response);
        this.setState({ imageUrl: response.data.imageUrl });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleChange = (event) => {
    console.log(this.state.user.email)
    let emailInput = event.target.value.length === 0 ? this.state.user.email : event.target.value
    console.log(emailInput)
    this.setState({ email: emailInput });
  };

  render() {
    // let email = this.state.user.email;
    return (
      <div>
        <h1>User Profile</h1>
        <img
          src={`${this.state.user.imageUrl}`}
          alt="Profile Pic"
          height="200px"
          width="180px"
          style={{ borderRadius: "50%", border: "solid 1px black" }}
        />
        <h2>{this.state.user.email}</h2>
        <div>
          <button
            onClick={() => this.setState({ showForm: !this.state.showForm })}
          >
            Edit Profile
          </button>
        </div>
        <br />
        {this.state.showForm && (
          <form onSubmit={this.handleFormSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={this.state.user.email}
              onChange={this.handleChange}
            />

            <div>
              <label>Profile Image:</label>
              <input
                type="file"
                alt="Profile Image"
                onChange={(e) => this.handleFileUpload(e)}
              />
              {/* <input type="file" name="existingImage" hidden id="" value="{{imageUrl}}" /> */}
            </div>
            <input type="submit" value="Submit" />
          </form>
        )}
      </div>
    );
  }
}

export default Profile;
