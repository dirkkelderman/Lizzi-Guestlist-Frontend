import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Signup extends Component {

    state = { 
        username: '', 
        password: ''
    }

    service = new AuthService()

    // handleFormSubmit = (event) => {
    //     event.preventDefault();
    //     const username = this.state.username;
    //     const password = this.state.password;

    //     this.service.signup(username, password)
    //         .then(response => {
    //             console.log(response)
    //             this.setState({
    //                 username: "",
    //                 password: "",
    //             });
        
    //             // console.log(response)
                
    //             // this.props.history.push('./protected-route');
    //         })
    //         .catch(error => console.log(error))
    // }
    handleFormSubmit = event => {
        const url = 'http://localhost:5000/api'
      event.preventDefault();
      fetch(`${url}/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username:this.state.username,
            password:this.state.password
        })
      })
      .then(res=> res.json())
        .then(res => {
         console.log(res)
         this.setState({ username: "", password: "" });
        //  this.props.history.push('/Login');
        window.location= "/Login"
            })
        .catch(error => {
          console.log(error)
          
        })
      }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <h3>Create your account:</h3>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

                    <input type="submit" value="Signup" />
                </form>

                <p>Already have account?
                <Link to={"/Login"}> Login</Link>
                </p>

            </div>
        )
    }
}

export default Signup;