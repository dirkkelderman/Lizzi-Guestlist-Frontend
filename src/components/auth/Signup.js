import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    rememberMe: false
  };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password, rememberMe } = this.state;

    // const username = this.state.username;
    // const password = this.state.password;

    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('email', rememberMe ? email : '');

    this.service
      .signup(email, password)
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
        <h3>Create your account:</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
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
          <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox" /> Remember me
        </label>

          <input type="submit" value="Signup" />
        </form>

        <p>
          Already have account?
          <Link to={"/Login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
