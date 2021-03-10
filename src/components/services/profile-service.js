import axios from 'axios'

class ProfileService {
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        });
        this.service = service
    }


    updateProfile(params, firstName, lastName, imageUrl, email){
        return this.service.patch(`/profile/${params}`)
        .then(respons => respons.data, {firstName, lastName, imageUrl, email })
    }

    profile(params){
        return this.service.get(`/profile/${params}`)
        .then(respons => respons.data)
    }


}

export default ProfileService
