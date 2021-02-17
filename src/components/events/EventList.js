import React, { Component } from 'react'
import axios from 'axios'
import AddEvent from './AddEvent'
import { Link } from 'react-router-dom';
import EventService from './event-service'

export class EventList extends Component {

    state ={
        eventList: []
    }

    service = new EventService()

    getEventList = () => {
        this.service.eventList()
        .then(eventsFromApi => {
            console.log(eventsFromApi)
            this.setState({
                eventList: eventsFromApi
            })
        }, err => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getEventList();
      }


    render() {
        const eventList = this.state.eventList.map(event => {
            return (
                <div key={event._id}>
                    <Link to={`/events/${event._id}`}>
                        <h2>{event.eventName}</h2>
                    </Link>
                </div>
            )
        })
        return (
            <div>
                <h1>EventList</h1>
                {eventList}
                <AddEvent getEvent={() => this.getEventList()}/>
            </div>
        )
    }
}

export default EventList
