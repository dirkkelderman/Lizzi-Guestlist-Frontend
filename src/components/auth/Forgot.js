// React or componnents import
import React, { Component } from "react";
import AuthService from "../services/auth-service";
import LogoLizzi from '../home/lizzilogo groot geel.png'
import { notify } from 'react-notify-toast'

// Material UI import
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;

    // localStorage.setItem('rememberMe', rememberMe);
    // localStorage.setItem('email', rememberMe ? email : '');

    this.service
      .forgot(email)
      .then((response) => {
        this.props.getUser(response);
        notify.show(response.message)        
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
          Forgot Password
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
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{backgroundColor: "#fad974"}}
            onClick={this.handleFormSubmit}
          >
            Send Reset Link
          </Button>
        </form>
      </div>
   </Container>    
    );
  }
}

export default withStyles(styles)(Login);



