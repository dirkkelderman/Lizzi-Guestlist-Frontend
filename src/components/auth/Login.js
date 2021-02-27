import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { 
      username: "", 
      password: "",
      rememberMe: false 
    };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password, rememberMe } = this.state;

    // const username = this.state.username;
    // const password = this.state.password;

    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('username', rememberMe ? username : '');

    this.service
      .login(username, password)
      .then((response) => {
        console.log(response);
        this.props.getUser(response);
        this.props.history.push("/events");
        
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    // const { name } = event.target;
    // const value = event.type === 'checkbox' ? event.checked : event.value;

    // this.setState({ [name]: value });
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
 
    this.setState({ [input.name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>TEST Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />

          <label>
        <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/> Remember me
      </label>

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
