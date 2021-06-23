import React, { useState } from 'react';

import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);

  return (
    <div className="App">
      <Router>
        <CredentialsContext.Provider value={credentialsState}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </CredentialsContext.Provider>
      </Router>
    </div>
  );
}

export default App;
