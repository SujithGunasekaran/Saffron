import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" exact component={Login} />
        <Route path="/Signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
