import React, { Component } from 'react';
import ProfileService from "./profile-service"
import EditProfile from "./EditProfile"
import AddProfile from "./AddProfile"

export class Profile extends Component {
  service = new ProfileService()
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser:null,
      data: {},
      user: {}
      
    };
  }
  componentDidMount() {
    this.getSingleUser();
  }

  getSingleUser() {
    const { params } = this.props.match;

    this.service.profile(params.id).then(
      // console.log('works')
      (responseFromApi) => {
          this.setState({
          user: responseFromApi,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
    render() {
      return (
          <div >
            <h1>User Profile</h1>
            <img src={`${this.state.user.imageUrl}`} alt="Profile Pic" height="200px" width="180px" style={{borderRadius: "50%", border: "solid 1px black"}}/>
            <h2>
            {this.state.user.username}
            </h2>
            <h2>
              {this.state.user.email}
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
  