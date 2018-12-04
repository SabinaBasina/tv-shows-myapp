import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import "./App.css";
import Home from './Home';
import Menu from './Menu';
import Login from './Login';
import Profile from './Profile';
import TvShowDetails from './TvShowDetails';

import { redirectToLogin, authConfig } from './authentication/helpers'

class App extends Component {
  render() {
    return (
        <Router>
          <Security issuer={authConfig.issuer}
                    client_id={authConfig.clientId}
                    redirect_uri={authConfig.redirectUri}
                    onAuthRequired={redirectToLogin}>
              
              <Menu/>

              <Route path='/' exact={true} component={Home}/>
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/login" component={Login} />
              <Route path="/tvShowDetails/:id" 
                     render={(props)=> <TvShowDetails id={props.match.params.id}/> }/>
              <SecureRoute path="/profile" component={Profile} />
          </Security>
        </Router>
    );
  }
}

export default App;