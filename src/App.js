import './App.css';
import AddEvent from './components/events/AddEvent'
import EventList from './components/events/EventList'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import EventDetails from './components/events/EventDetails'
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Switch>       
      {/* <Route exact path="/" /> */}
      <Route exact path="/signup" component={Signup} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/AddEvent'><AddEvent /></Route>
      <Route exact path='/events' component={EventList} />
      <Route exact path='/events/:id' component={EventDetails} />
     </Switch>
    </div>

  );
}

export default App;
