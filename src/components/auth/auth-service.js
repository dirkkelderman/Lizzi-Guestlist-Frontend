import axios from 'axios';
 
class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
    this.service = service;
  }
  
  signup = (email, password) => {
    return this.service.post('/signup', {email, password})
    .then(response => response.data)
  }
  login = (email, password) => {
    return this.service.post('/login', {email, password})
    .then(response => response.data)
  }
  profile = () => {
    return this.service.get('/login')
    .then(response => response.data)
  }
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }

}
 
export default AuthService;