import React from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

export default class Navbar extends React.Component {

    constructor(props){
        super(props);
        this.service = new AuthService();
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.props.getUser(null);
            })
    }

    render() {
        console.log(this.props)
        return (
            <>
                {
                    this.props.userInSession ?
                        <div>
                            <Link to='/'>
                                <button onClick={() => this.logoutUser()}> Logout </button>
                            </Link>
                            <Link to="/profile">Profile </Link>
                        </div> :
                        <div>
                            <Link to="/Signup">Register</Link>
                            <Link to="/Login">Login</Link>
                
                        </div>
                }

                <hr />
            </>
        )
    }
}
