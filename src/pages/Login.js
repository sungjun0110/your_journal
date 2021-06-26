import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CredentialsContext } from '../App';

export const handleErrors = async (response) => {
  if (!response.ok) {
      const {message} = await response.json();
      throw Error(message);
  }
  return response.json();
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    fetch("https://urjournal-backend.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      })
  };

  return (
    <div id="page-div">
      <h1>Login</h1>
      {!!error && (<span style={{color: 'red'}}>{error}</span>)}
      <form id="id-form" onSubmit={login}>
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="username" />
        <br />
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
