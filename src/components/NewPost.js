import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import { handleErrors } from '../pages/Login';

function NewPost() {
  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [credentials,] = useContext(CredentialsContext);
  const [username,] = useState(credentials.username);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://urjournal-backend.herokuapp.com/journals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${username}:${credentials.password}`,
      },
    })
    .then((response) => response.json())
    .then((journals) => setJournals(journals));
  }, [])

  const post = (newJournals) => {
    fetch("https://urjournal-backend.herokuapp.com/journals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${username}:${credentials.password}`,
      },
      body: JSON.stringify(newJournals)
    })
      .then(handleErrors)
      .catch((error) => {
        setError(error.message);
      })
  };
  
  const addJournal = (e) => {
    e.preventDefault();
    if (!title || !content || !date) return;
    const newJournal = { title: title, content: content, date: date };
    const newJournals = [...journals, newJournal];
    setJournals(newJournals);
    setTitle("");
    setContent("");
    setDate("");
    post(newJournals);
  }
  

  return (
    <form id="journal-form" onSubmit={addJournal}>
      <label htmlFor="title-input">Title:</label>
      <input id="title-input" type="text" onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label htmlFor="content-input">Content:</label>
      <textarea id="content-input" type="text" onChange={(e) => setContent(e.target.value)} />
      <br />
      <input id="date-input" type="date" onChange={(e) => setDate(e.target.value)}></input>
      <br />
      <button id="save-btn" type="submit">Save</button>
    </form>
  )
}

export default NewPost
