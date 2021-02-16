import React, { Component } from 'react'
import axios from 'axios'

export class AddEvent extends Component {

    state = {
        eventName: '',
        date: '',
        guestNumber: 0,
        location: '',
        description: '',
        status: ''
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5001/api/events', {
            eventName: this.state.eventName,
            date: this.state.date,
            guestNumber: this.state.guestNumber,
            location: this.state.location,
            description: this.state.description,
        }, {withCredentials: true})
        .then( (res) => {
                // this.props.getData();
                    this.setState({
                        eventName: '',
                        date: '',
                        guestNumber: '',
                        location: '',
                        description: '',
                        status: 'Your project is created'
                    })
                }, (err) => {
                    console.log(err)
                    this.setState({
                        status: 'Oops, something wrong'
                    })
                })
    }


    handleChange = (e) => {  
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div>
                <h1>Add Event</h1>

                <form onSubmit={this.handleFormSubmit}>
                    <label>Event name</label>
                    <input type='text' name='eventName' value={this.state.eventName} onChange={this.handleChange} />

                    <label>Date</label>
                    <input type='text' name='date' value={this.state.date} onChange={this.handleChange} />

                    <label>Number of guests</label>
                    <input type='number' name='guestNumber' value={this.state.guestNumber} onChange={this.handleChange} />

                    <label>location</label>
                    <input type='text' name='location' value={this.state.location} onChange={this.handleChange} />

                    <label>description</label>
                    <textarea type='text' name='description' value={this.state.description} onChange={this.handleChange} />

                    <input type="submit" value="Submit" />
                </form>

            </div>
        )
    }
}

export default AddEvent
