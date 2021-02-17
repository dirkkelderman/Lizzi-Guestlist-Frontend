import React, { Component } from 'react'
import axios from 'axios'

export class EventList extends Component {

    state ={
        eventList: []
    }

    getEventList = () => {
        axios.get('http://localhost:5000/api/events', {withCredentials: true})
        .then(eventsFromApi => {
            console.log(eventsFromApi)
            this.setState({
                eventList: eventsFromApi.data
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
                <div>
                    <h2>{event.eventName}</h2>
                </div>
            )
        })
        return (
            <div>
                <h1>EventList</h1>
                {eventList}
            </div>
        )
    }
}

export default EventList
