// React or componnents import
import React, { Component } from "react";
import AuthService from "../services/auth-service";
import LogoLizzi from '../home/lizzilogo groot geel.png'

// Material UI import
import {Button, TextField, Typography, Container} from '@material-ui/core';
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
      password: "",
    };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { password } = this.state;
    const { params } = this.props.match;

    this.service
      .reset(params.token, password)
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
          Reset Password
        </Typography>
        <form noValidate>
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
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{backgroundColor: "#fad974"}}
            onClick={this.handleFormSubmit}
          >
            Reset Password
          </Button>
        </form>
      </div>
   </Container>    
    );
  }
}

export default withStyles(styles)(Login);



