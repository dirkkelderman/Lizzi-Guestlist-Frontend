import axios from 'axios';
 
class EmailService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
    this.service = service;
  }
  
  confirmationEmail = (email) => {
    return this.service.post('email', {email})
    .then(response => response.data)
  }
  


}
 
export default EmailService;