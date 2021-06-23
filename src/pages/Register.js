import React, { useState, useContext } from 'react'
import { CredentialsContext } from '../App';
import { useHistory } from 'react-router-dom';

const handleError = (response) => {
  if (!response.ok) {
    const {message} = response.json();
    throw Error(message);
  }
  return response.json();
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const history = useHistory();

  const register = (e) => {
    e.preventDefault();
    fetch("https://urjournal-backend.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleError)
      .then(() => {
        setCredentials({
          username,
          password,
        })
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {!!error && (<span style={{color: 'red'}}>{error}</span>)}
      <form onSubmit={register}>
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="username" />
        <br />
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password" />
        <br />
        <button type="submit">Register</button>
      </form> 
    </div>
  )
}

export default Register
