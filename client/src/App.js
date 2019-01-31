import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Dashboard}/>
        </Switch>        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
