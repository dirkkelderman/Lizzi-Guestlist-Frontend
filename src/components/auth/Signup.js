// React or componnents import
import React, { Component } from "react";
import AuthService from "../services/auth-service";
import EmailService from "../services/auth-service";
import { Link } from "react-router-dom";
import LogoLizzi from '../home/lizzilogo groot geel.png'

// Material UI import
import {TextField, Grid, Typography, Container, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { notify } from 'react-notify-toast'


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
      borderLeft: '3px solid white',
      placeholder: 'white',
      marginBottom: '10px',
      borderRadius: '2px',
    },
    input: {
        color: "white"
      }
});

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rememberMe: false,
    sendingEmail: false

  };

  service = new AuthService();
  emailService = new EmailService()

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ sendingEmail: true})

    const { email, password, rememberMe, firstName, lastName } = this.state;

    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("email", rememberMe ? email : "");

    
    this.service
    .signup(email, password, firstName, lastName)
    .then((response) => {
      console.log(response);
      this.props.getUser(response);
      // this.props.history.push("/events");
    })
    .then(() => {
      this.emailService
        .confirmationEmail(email)
        .then(response => {
          this.setState({ sendingEmail: false})
          notify.show(response.msg)
        })

    })
    .catch((error) => console.log(error));

  };
  response
  handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };

  render() {
    const {classes} = this.props
    const { sendingEmail } = this.state

    return (
      <div>
      <Container component="main" maxWidth="xs">
      <img src={LogoLizzi} style={{width: "100%"}} alt="Lizzi Yellow"/>
      <div className={classes.paper}>
        <Typography style={{color: "#fad974"}} component="h1" variant="h5">
          Sign Up
        </Typography>
        <form noValidate>
        <TextField
            className={classes.form}
            placeholder="   First Name" 
            InputProps={{
                    className: classes.input
                }} 
            type="text"
            name="firstName"
            margin="normal"
            required
            fullWidth
            id="firstName"
            autoComplete="firstName"
            autoFocus
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <TextField
            className={classes.form}
            placeholder="   Last Name" 
            InputProps={{
                    className: classes.input
                }} 
            type="text"
            name="lastName"
            margin="normal"
            required
            fullWidth
            id="lastName"
            autoComplete="lastName"
            autoFocus
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <TextField
            className={classes.form}
            placeholder="   Email Address" 
            InputProps={{
                    className: classes.input
                }} 
            type="email"
            name="email"
            margin="normal"
            required
            fullWidth
            id="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            className={classes.form}
            placeholder="   Password" 
            InputProps={{
                    className: classes.input
                }} 
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            helperText=" Password must be 8 characters long"
            FormHelperTextProps={{ 
                    className: classes.input 
                    }}    
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange}

          />
          
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{backgroundColor: "#fad974"}}
            onClick={this.handleFormSubmit}
            disabled={sendingEmail}
          >
          {sendingEmail 
              ? "Email has been sent" 
              : "Let's Go!"
            }
          </Button>
          <Grid container>
            <Grid item>
              <Link to={"/Login"} variant="body2" style={{color: "#fad974"}}>
                {"Already have account?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

      </div>
    );
  }
}

export default withStyles(styles)(Signup);

