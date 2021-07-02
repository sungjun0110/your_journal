import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import { handleErrors } from '../pages/Login';
import './NewPost.css';

function NewPost( props ) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [credentials,] = useContext(CredentialsContext);
  const [username,] = useState(credentials.username);
  const [, setError] = useState("");

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
    const newJournals = [...props.journals, newJournal];
    props.setJournals(newJournals);
    setTitle("");
    setContent("");
    setDate("");
    post(newJournals);
    setTimeout(() => props.setUpdate(true), 1000);
  }

  return (
    <form id="journal-form" onSubmit={addJournal}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" type="text" onChange={(e) => setContent(e.target.value)} value={content} />
      <br />
      <input id="date-input" type="date" onChange={(e) => setDate(e.target.value)} />
      <br />
      <button id="save-btn" type="submit">Save</button>
    </form>
  )
}

export default NewPost
