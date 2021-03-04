// React or componnents import
import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import LogoLizzi from '../home/lizzilogo groot geel.png'

// Material UI import
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
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
    console.log(event)

    const { email, password, rememberMe } = this.state;

    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('email', rememberMe ? email : '');

    this.service
      .login(email, password)
      .then((response) => {
        console.log(response);
        this.props.getUser(response);
        this.props.history.push("/events");
        
      })
      .catch((error) => console.log(error));
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
        <form className={classes.form} noValidate>
          <TextField
            type="email"
            name="email"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            style={{backgroundColor: "white"}}
            value={this.state.email}
            onChange={this.handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{backgroundColor: "white"}}
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/signup"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>    
    );
  }
}

export default withStyles(styles)(Login);


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

