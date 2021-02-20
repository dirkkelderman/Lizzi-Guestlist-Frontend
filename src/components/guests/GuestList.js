import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from './guest-service'

export class GuestList extends Component {

    constructor(props){
        super(props);
        this.state = {
            guestList: []
        }
    }

    service = new GuestService();

    getGuestList = () => {
        this.service.guestList()
        .then( guestsFromApi => {
            this.setState({
                guestList: guestsFromApi
            })
        })
    }

    componentDidMount(){
        this.getGuestList()
    }

  render() {

    const { params } = this.props.match;

    // guestFirstName, guestLastName, contact, tag

    const guestList = this.state.guestList.map((guest) => {
        return (
            <div key={guest._id} >
                <p>Name: {guest.guestFirstName}</p>
                <p>Last name: {guest.guestLastName}</p>
                <p>{guest.contact}</p>
                <p>{guest.tag}</p>
            </div>
        )        
    })

    return ( 
        
      <div>
        <Link to={`/events/${params.id}`}>
          <h2>Details</h2>
        </Link>

        <h1>It's the guestlist</h1>
        
        {guestList}

      </div>
    );
  }
}

export default GuestList;
