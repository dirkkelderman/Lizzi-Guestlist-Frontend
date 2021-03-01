import React, { Component } from 'react';
import axios from 'axios';
 
class EditProfile extends Component {
  state = { 
      username: "", 
      email: "",
      imageUrl: ""
    }
   
  // handleFormSubmit = (event) => {
  //   event.preventDefault();

  //   axios.patch('http://localhost:5000/api/upload', {
  //       username: this.state.username,
  //       email: this.state.email,
  //       imageUrl: this.state.imageUrl,

  //   }, {withCredentials:true})
  //   .then( (res) => {
  //       this.props.getData();
  //       this.setState({
  //           username: "",
  //           email: "",
  //           imageUrl: ""
  //       });
  //   }, (err) => {
  //       console.log(err);
  //       this.setState({
  //           status: "Oops, something went wrong"
  //       });
  //   });
  // }

  handleFormSubmit = ()=>{
    
    const user = localStorage.getItem('newUser')
    console.log(user)
     const userId = user._id
            const url ="http://localhost:5000/api"  
            fetch(`${url}/${userId}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json"
              },
              
              body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                // imageUrl: this.state.imageUrl
              })
            })
              .then(res => res.json())
              .then(res => {
                console.log('fetched', userId)
                if (res.success === true) {
                  // this.props.history.push("/Profile");   
                  console.log('successfully updated')
                }
              })
              .catch(err => console.log(err));
            }
          
    handleFileUpload = (event) => {
    
    //console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/projects' POST route
    uploadData.append("imageUrl", event.target.files[0]);

    axios.post('http://localhost:5000/api/upload', uploadData)
      .then(response => {
        // response.image_url --> this must be the same name than the property we receive from the api
        // if it doesn't work, try to console.log response we get from the api ;)
        console.log('response from the api: ', response);
        this.setState({ imageUrl: response.data.image_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
 
  render(){
    return(
      <React.Fragment>

        { this.state.status !== '' ? <div>{this.state.status}</div> : null }

        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          <label>Email:</label>
          <textarea name="email" value={this.state.email} onChange={ e => this.handleChange(e)} />
          
          {/* <label>Profile Image:</label>
          <input type="file" alt="Profile Image"onChange={ (e) => this.handleFileUpload(e) } /> */}

          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    )
  }
}

export default EditProfile;