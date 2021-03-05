import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../services/auth-service';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Navbar = (props) => {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={e => {
              history.push(`/events`)
          }}>
            <EventIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Lizzie
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={e => {
              history.push(`/profile/${props.userInSession._id}`)
          }}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    )
}
export default Navbar;

// export class Navbar extends React.Component {


//     render() {


//         console.log(this.props)
//         return (
//             <>                   
//                         <div >
//                             <Link to={`/profile/${this.props.userInSession._id}`}>Profile </Link>
//                             <Link to="/events">Events</Link>
//                         </div> 

//                 <hr />
//             </>
//         )
//     }
// }
