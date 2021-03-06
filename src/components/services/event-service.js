import axios from 'axios'

class EventService {
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        });
        this.service = service
    }

    eventList(){
        return this.service.get('/events')
        .then(respons => respons.data)
    }

    addEvent(eventName, date, guestNumber, location, description, coOwner, id, ){
        return this.service.post('/events', {eventName, date, guestNumber, location, description, coOwner, id, })
        .then(respons => respons.data)
    }

    updateEvent(_id, eventName, date, guestNumber, location, description){
        return this.service.put(`/events/${_id}`, {eventName, date, guestNumber, location, description})
        .then(respons => respons.data)
    }

    eventDetails(params){
        return this.service.get(`/events/${params}`)
        .then(respons => respons.data)
    }

    deleteEvent(params){
        return this.service.delete(`/events/${params}`)
        .then(respons => respons.data)
    }
}

export default EventService