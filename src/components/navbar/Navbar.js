// React or componnents import
import React from 'react'
import {useHistory } from 'react-router-dom';
import LogoLizzi from '../home/lizzilogo groot geel.png'

// Material UI import
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from "@material-ui/core/Avatar";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    appBar: {
        backgroundColor: '#20111e',
        color: '#fad974'
    },
    logo:{
        backgroundColor: '#20111e',
        color: '#fad974'
    },
    lizzie:{
      textAlign: 'center',
      maxWidth: '50%',
      maxHeight: '70%',
    }
  }));



const Navbar = (props) => {
    const classes = useStyles();
    const history = useHistory()

    return (


        <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" onClick={e => {
              history.push(`/events`)
          }}>
            <EventIcon className={classes.logo} />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
          <Avatar className={classes.lizzie} src={LogoLizzi}/>
            Lizzi
          </Typography>
          <IconButton edge="end" className={classes.menuButton} color="secondary" aria-label="menu" onClick={e => {
              history.push(`/profile/${props.userInSession._id}`)
          }}>
            <AccountCircleIcon className={classes.logo} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    )
}
export default Navbar;

