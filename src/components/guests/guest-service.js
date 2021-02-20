import axios from 'axios'

class GuestService {
    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.service = service
    }

    guestList(){
        return this.service.get('/guestlist')
        .then(respons => respons.data)
    }

    addGuest(guestFirstName, guestLastName, contact, tag){
        return this.service.post('/guestlist', {guestFirstName, guestLastName, contact, tag})
        .then(respons => respons.data)
    }

    updateGuest(_id, guestFirstName, guestLastName, contact, tag){
        return this.service.put(`/guestlist/${_id}`, {guestFirstName, guestLastName, contact, tag})
        .then(respons => respons.data)
    }

    eventGuest(params){
        return this.service.get(`/guestlist/${params}`)
        .then(respons => respons.data)
    }

    deleteGuest(params){
        return this.service.delete(`/guestlist/${params}`)
        .then(respons => respons.data)
    }
}

export default GuestService