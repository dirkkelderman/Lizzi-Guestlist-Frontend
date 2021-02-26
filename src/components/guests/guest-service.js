import axios from 'axios'

class GuestService {
    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.service = service
    }

    guestList(eventId){
        return this.service.get(`/events/${eventId}/guestList/:guestId`)
        .then(respons => respons.data)
    }

    addGuest(event, guestFirstName, guestLastName, contact, tag, freeTickets, ticketNumber, ){
        return this.service.post('/guestlist', {event, guestFirstName, guestLastName, contact, tag, freeTickets, ticketNumber})
        .then(respons => respons.data)
    }

    updateGuest(_id, freeTickets, guestFirstName, guestLastName, contact, tag, ticketNumber ){
        return this.service.put(`/guestlist/${_id}`, {guestFirstName, guestLastName, contact, tag, freeTickets, ticketNumber})
        .then(respons => respons.data)
    }

    guestDetails(params){
        return this.service.get(`/guestlist/${params}`)
        .then(respons => respons.data)
    }

    deleteGuest(params){
        return this.service.delete(`/guestlist/${params}`)
        .then(respons => respons.data)
    }
}

export default GuestService