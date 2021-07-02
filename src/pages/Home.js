import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import "./Pages.css";

import Journals from './Journals';

function Home() {
  const [credentials, setCredentials] = useContext(CredentialsContext);

  return (
    <div id="page-div">
      {credentials? <h1>{credentials && credentials.username}'s Journal</h1> : <h1>Welcome!</h1> }
      {!credentials && <h3>Try <br />id: test<br />password: test</h3>}
      {!credentials && <Link to='/register'>Register</Link>}
      {!credentials && <Link to='/login'>Login</Link>}
      {credentials && <Journals />}
    </div>
  )
}

export default Home
