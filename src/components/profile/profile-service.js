import axios from 'axios'

class ProfileService {
    constructor(){
        let service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        });
        this.service = service
    }


    updateProfile(params){
        return this.service.patch(`/profile/${params}`)
        .then(respons => respons.data)
    }

    profile(params){
        return this.service.get(`/profile/${params}`)
        .then(respons => respons.data)
    }


}

export default ProfileService
