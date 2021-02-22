import React, { Component } from 'react'
import GuestService from './guest-service';

export class GuestDetails extends Component {
    service = new GuestService()

    constructor(props){
        super(props);
        this.state = {
            guestObj: {            
                guestFirstName:'', 
                guestLastName:'', 
                contact:'', 
                tag:'', 
                ticketNumber:0
            }
        }
    }

    componentDidMount(){
        this.getSingleGuest();
    }

    getSingleGuest(){
        const {params} = this.props.match;
        this.service.guestDetails(params.guestId)
            .then( (responseFromApi) => {
                this.setState({
                    guestObj: responseFromApi
                })
            })
    }

    render() {
        const {guestFirstName, guestLastName, contact, tag, ticketNumber} = this.state.guestObj
        return (
            <div>
<form onSubmit={this.handleFormSubmit}>
          <label>First name</label>
          <input
            type="text"
            name="guestFirstName"
            value={guestFirstName}
            onChange={this.handleChange}
          />

          <label>Last name</label>
          <input
            type="text"
            name="guestLastName"
            value={guestLastName}
            onChange={this.handleChange}
          />

          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={this.handleChange}
          />

          <label>Tag</label>
          <input
            type="text"
            name="tag"
            value={tag}
            onChange={this.handleChange}
          />

         <label>Number of tickets</label>
          <input
            type="number"
            name="ticketNumber"
            value={ticketNumber}
            onChange={this.handleChange}
          />


          <input type="submit" value="Submit" />
        </form>
            </div>
        )
    }
}

export default GuestDetails
