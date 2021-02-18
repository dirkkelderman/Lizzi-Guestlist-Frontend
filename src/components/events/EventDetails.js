import axios from 'axios';
import React, { Component } from 'react'
import EventService from './event-service'

export class EventDetails extends Component {

    service = new EventService()

    constructor(props){
        super(props);
        this.state = {
            eventName: '',
            date: '',
            guestNumber: 0,
            location: '',
            description: '',
            status: ''
        }
    }

    componentDidMount(){
        this.getSingleEvent()
    }

    getSingleEvent(){
        const {params} = this.props.match
        this.service.eventDetails(params.id)
            .then( responseFromApi => {
                console.log(responseFromApi)

                const {eventName, date, guestNumber, location, description} = responseFromApi
                this.setState({
                    eventName: eventName,
                    date: date,
                    guestNumber: guestNumber,
                    location: location,
                    description: description,
                    status: ''
                })
            }, err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <h1>Event Details</h1>
                <p>Event Name:{this.state.eventName}</p>
                <p>Date: {this.state.date}</p>
                <p>Number of guestes: {this.state.guestNumber}</p>
                <p>Location: {this.state.location}</p>
                <p>Description: {this.state.description}</p>
            </div>
        )
    }
}

export default EventDetails
