import React, { Component } from 'react';
import axios from 'axios';
 
class AddProfile extends Component {
  state = { 
      title: "", 
      description: "",
      status: "",
      imageUrl: ""
    }
   
  handleFormSubmit = (event) => {
    event.preventDefault();

    axios.get('http://localhost:5000/api/profile/:id', {
        username: this.state.username,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
    }, {withCredentials:true})
    .then( (res) => {
        this.props.getData();
        this.setState({
            username: "",
            email: "",
            status: "your pprofile was created"
        });
    }, (err) => {
        console.log(err);
        this.setState({
            status: "Oops, something went wrong"
        });
    });
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
                 
          <label>Email:</label>
          <textarea name="email" value={this.state.email} onChange={ e => this.handleChange(e)} />
          
          <label>Profile Image:</label>
          <input type="file" alt="Profile Image"onChange={ (e) => this.handleFileUpload(e) } />

          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    )
  }
}

export default AddProfile;