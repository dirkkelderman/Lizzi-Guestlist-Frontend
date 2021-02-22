import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuestService from './guest-service'
import AddGuest from './AddGuest'
import EditGuest from './EditGuest'

export class GuestList extends Component {

    constructor(props){
        super(props);
        this.state = {
            guestList: [],
            ticketNumber: 0
        }
    }

    service = new GuestService();

    getGuestList = () => {
        this.service.guestList()
        .then( guestsFromApi => {
            console.log(guestsFromApi)
            this.setState({
                guestList: guestsFromApi,
                ticketNumber: guestsFromApi.ticketNumber
            })
        })
    }

    componentDidMount(){
        this.getGuestList()
    }

    checkInGuest = () => {
        console.log('Guest checked-in')
    }

  render() {

    const { params } = this.props.match;
    const copyOfGuestList = [...this.state.guestList]

    const guestList = copyOfGuestList.map((guest) => {
        return (
            <div key={guest._id} >
                <p>Name: {guest.guestFirstName}</p>
                <p>Last name: {guest.guestLastName}</p>
                <p>No. of ticket: {guest.ticketNumber}</p>
                <p>{guest.contact}</p>
                <p>{guest.tag}</p>

                <button>
                    <Link to={`/events/${params.id}/guestlist/${guest._id}`}>
                        Edit
                    </Link>
                </button>
                <button onClick={this.checkInGuest}>
                    Check-in
                </button>
            </div>
        ) 
    
    })

    return ( 
        
      <div>
        <Link to={`/events/${params.id}`}>
          <h2>Details</h2>
        </Link>

        <h1>It's the guestlist</h1>

        <AddGuest getGuest={() => this.getGuestList()} />
        
        {guestList}

      </div>
    );
  }
}

export default GuestList;
