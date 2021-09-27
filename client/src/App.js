
import './App.css';
import Home from "./components/Home"
import Date from "./components/Date"
import AllDates from "./components/Alldates"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>

      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/date" component={Date} />
      <Route exact path="/alldates" component={AllDates} />

      
      </Switch>
    
  </Router>
  );
}

export default App;
