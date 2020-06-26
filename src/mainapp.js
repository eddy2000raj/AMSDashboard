import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import App from './App';
import Report from './report';
import ManagerReport from './managerDashboard';


const API_URL=`${[process.env.REACT_APP_API_URL]}` ;

class MainApp extends Component {

  render(){
    return (
      <Router>
        <div>
            <Switch>
              <Route exact path="/report">
                <Report />
              </Route>
              <Route exact path="/managerDashboard">
                <ManagerReport />
              </Route>
              <Route exact path="/">
                <App />
              </Route>
            </Switch>
       </div>
      </Router>
            )
  }
  
}


export default MainApp ;