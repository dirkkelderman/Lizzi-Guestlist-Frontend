import React, { Component } from 'react';
import AuthService from "../auth/auth-service"
import EditProfile from "./EditProfile"
import AddProfile from "./AddProfile"

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser:null,
      data: {},
    };
  }

    render() {
      console.log(this.props.userInSession)
      return (
          <div >
            <h1>User Profile</h1>
            <img src={this.props.userInSession.imageUrl} alt="Profile Pic" height="200px" width="180px" style={{borderRadius: "50%", border: "solid 1px black"}}/>
            <h2>
            {this.props.userInSession}
            </h2>
            <h2>
              {this.props.userInSession.email}
            </h2>
            <div>
                            <div>
                                <AddProfile theProfile={this.state} {...this.props} />
                                <EditProfile theProfile={this.state} {...this.props} />
                            </div> : 
            </div>
          </div>
      );}
}
  
  export default Profile;
  