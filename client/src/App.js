import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ViewData from './Components/ViewData'
import DashBoard from './Components/DashBoard'
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={DashBoard}/>
          <Route exact path="/view" component={ViewData}/>
        </Switch>        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
