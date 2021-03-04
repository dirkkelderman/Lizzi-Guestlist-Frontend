import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
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
      <div>
      <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography style={{color: "#fad974"}} component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            // variant="outlined"
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
            onChange={(e) => this.handleChange(e)}
          />
          <TextField
            // variant="outlined"
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
            onChange={(e) => this.handleChange(e)}

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
              <Link href="/signup" variant="body2">
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


      
        {/* <form onSubmit={this.handleFormSubmit}>
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
        <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox"/> Remember me
      </label>

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p> */}
      </div>
    );
  }
}

// export default Login;

export default withStyles(styles)(Login);


// import React from 'react';


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

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
// }));

// export default function SignIn() {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <div className={classes.paper}>
//         <Typography style={{color: "#fad974"}} component="h1" variant="h5">
//           Log in
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             // variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             style={{backgroundColor: "white"}}
//           />
//           <TextField
//             // variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             style={{backgroundColor: "white"}}

//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" style={{color: "#fad974"}} />}
//             label="Remember me"
//             style={{color: "#fad974"}}

//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             className={classes.submit}
//             style={{backgroundColor: "#fad974"}}

//           >
//             Log In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }