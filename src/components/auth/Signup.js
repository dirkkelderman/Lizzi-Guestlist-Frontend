// React or componnents import
import React, { Component } from "react";
import AuthService from "../services/auth-service";
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
  form: {
    //   backgroundColor: 'rgba(210, 207, 210, 0.644)',
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
  };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password, rememberMe, firstName, lastName } = this.state;

    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("email", rememberMe ? email : "");

    this.service
      .signup(email, password, firstName, lastName)
      .then((response) => {
        console.log(response);
        this.props.getUser(response);
        this.props.history.push("/events");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };

  render() {
    const {classes} = this.props

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
            Sign up
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

