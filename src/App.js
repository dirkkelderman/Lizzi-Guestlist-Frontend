import logo from './logo.svg';
import './App.css';
import AddEvent from './components/events/AddEvent'
import EventList from './components/events/EventList'
import EventDetails from './components/events/EventDetails'
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <AddEvent /> */}

      <Switch>

        <Route exact path='/events' component={EventList} />
        <Route exact path='/events/:id' component={EventDetails} />

      </Switch>
    </div>
  );
}

export default App;
