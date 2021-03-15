// React or componnents import
import React, { Component } from "react";
import AuthService from "../services/auth-service";
import { Link } from "react-router-dom";
import LogoLizzi from '../home/lizzilogo groot geel.png'
import { notify } from 'react-notify-toast'

// Material UI import
import {Button, TextField, FormControlLabel, Checkbox, Grid, Typography, Container} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

class Login extends Component {
  state = { 
      email: "", 
      password: "",
      rememberMe: false 
    };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password, rememberMe } = this.state;

    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('email', rememberMe ? email : '');

    this.service
      .login(email, password)
      .then((response) => {
        this.props.getUser(response);
        this.props.history.push("/events");
        notify.show(`Welcome ${response.firstName}`)
      })
      .catch((error) => {
        notify.show(error.message)
        console.log(error)
      });
  };

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
 
    this.setState({ [input.name]: value });
  };

  render() {

    const {classes} = this.props

    return (      
      <Container  maxWidth="xs">
      <img src={LogoLizzi} style={{width: "100%"}} alt="Lizzi Yellow"/>
      <div className={classes.paper}>
        <Typography style={{color: "#fad974"}} component="h1" variant="h5">
          Log in
        </Typography>
        <form noValidate>
          <TextField
            className={classes.form}
            placeholder="   Email Address" 
            InputProps={{
                    className: classes.input
                }}             type="email"
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
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChange}

          />
          <FormControlLabel
            control={<Checkbox  value="remember" style={{color: "#fad974"}} />}
            label="Remember me"
            style={{color: "#fad974"}}
            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{backgroundColor: "#fad974"}}
            onClick={this.handleFormSubmit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={"/forgot"} variant="body2" style={{color: "#fad974"}}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/signup"} variant="body2" style={{color: "#fad974"}}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
   </Container>    
    );
  }
}

export default withStyles(styles)(Login);



