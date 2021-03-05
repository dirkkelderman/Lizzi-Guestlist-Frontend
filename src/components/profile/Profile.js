import React, { Component } from "react";
import ProfileService from "../services/profile-service";
import axios from "axios";
import EditProfile from './EditProfile'
import AuthService from "../services/auth-service";

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
        <h2>{this.state.user.firstName}</h2>
        <h2>{this.state.user.lastName}</h2>
        <h2>{this.state.user.email}</h2>

        <div>
        <button onClick={this.logoutUser}>
          Logout 
        </button>
        </div>
        <div>
          <button
            onClick={() => this.setState({ showForm: !this.state.showForm })}
          >
            Edit Profile
          </button>
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
      </div>
    );
  }
}

export default Profile;
