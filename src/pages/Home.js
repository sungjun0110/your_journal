import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import "./Pages.css";

import Journals from './Journals';

function Home() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  
  const logout = () => {
    setCredentials(null);
  }

  return (
    <div id="page-div">
      <h1>Hi! {credentials && credentials.username}</h1>
      {credentials && <button onClick={logout}>Logout</button>}
      {!credentials && <Link to='/register'>Register</Link>}
      <br />
      {!credentials && <Link to='/login'>Login</Link>}
      <br />
      {credentials && <Journals />}
    </div>
  )
}

export default Home
