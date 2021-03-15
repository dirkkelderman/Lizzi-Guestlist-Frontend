import React from "react";
import LogoLizzi from "./lizzilogo groot geel.png";
import { Button, Container, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "313px",
  },
  input: {
    color: "white",
  },
});

class HomePage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="xs">
        <img src={LogoLizzi} style={{ width: "100%" }} alt="Lizzi Yellow" />
        <div className={classes.paper}>
          <Typography style={{ color: "#fad974" }} component="h1" variant="h5">
            Lizzi - Guest List Made Easy
          </Typography>
          <div noValidate className={classes.form}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#fad974",
                color: "black",
                border: "1px solid black",
              }}
              component={Link}
              to={`/login`}
            >
              Log In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "black",
                color: "white",
                border: "1px solid #fad974",
              }}
              component={Link}
              to={`/signup`}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(HomePage);
