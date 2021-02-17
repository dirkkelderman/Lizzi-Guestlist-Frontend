import './App.css';
import AddEvent from './components/events/AddEvent'
import EventList from './components/events/EventList'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import {Switch, Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Switch>       
     <Route exact path="/"><Signup/></Route>
      <Route exact path='/Login'><Login/></Route>
      <Route exact path='/AddEvent'><AddEvent /></Route>
      <Route exact path='/EventList'><EventList /></Route>
      
      </Switch>

    </div>

  );
}

export default App;
