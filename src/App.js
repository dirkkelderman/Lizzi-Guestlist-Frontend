import logo from './logo.svg';
import './App.css';
import AddEvent from './components/events/AddEvent'
import EventList from './components/events/EventList'

function App() {
  return (
    <div className="App">
      <AddEvent />
      <EventList />
    </div>
  );
}

export default App;
