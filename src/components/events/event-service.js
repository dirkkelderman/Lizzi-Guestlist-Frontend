import axios from 'axios'

class EventService {
    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.service = service
    }

    eventList(){
        return this.service.get('/events')
        .then(respons => respons.data)
    }

    addEvent(){
        return this.service.post('/events', {})
        .then(respons => respons.data)
    }

    eventDetails(params){
        return this.service.get(`/events/${params}`)
        .then(respons => respons.data)
    }
}

export default EventService