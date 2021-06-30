import React, { useState } from 'react';

import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const CredentialsContext = React.createContext();
export const CurrentMenuContext = React.createContext();

function App() {
  const credentialsState = useState(null);
  const currentMenu = useState("recent");

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <CurrentMenuContext.Provider value={currentMenu}>
          <Router>
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
          </Router>

          <Sidebar />
        </CurrentMenuContext.Provider>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
