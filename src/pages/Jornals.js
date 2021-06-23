import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import './Journals.css';
import { handleErrors } from './Login';

function Jornals() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [credentials,] = useContext(CredentialsContext);
  const [username,] = useState(credentials.username);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(date);
  }, [date])

  const post = (e) => {
    e.preventDefault();
    fetch("http://localhost:8001/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        title,
        content,
        date,
      }),
    })
      .then(handleErrors)
      .catch((error) => {
        setError(error.message);
      })
  }

  const addJournal = (e) => {
    e.preventDefault();
    
  }

  return (
    <div>
      <form id="journal-form" onSubmit={addJournal}>
        <label htmlFor="title-input">Title:</label>
        <input id="title-input" type="text" onChange={(e) => setTitle(e.target.value)} />
        <br />
        <label htmlFor="content-input">Content:</label>
        <textarea id="content-input" type="text" onChange={(e) => setContent(e.target.value)} />
        <br />
        <input type="date" onChange={(e) => setDate(e.target.value)}></input>
        <br />
        <button id="save-btn" type="submit">Save</button>
      </form>
    </div>
  )
}

export default Jornals
