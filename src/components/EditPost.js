import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import { handleErrors } from '../pages/Login';
import './NewPost.css';

function EditPost( props ) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [credentials,] = useContext(CredentialsContext);
  const [username,] = useState(credentials.username);
  const [, setError] = useState("");

  useEffect (() => {
    setTitle(props.title);
    setContent(props.content);
  }, []);

  const put = (newJournal) => {
    fetch("https://urjournal-backend.herokuapp.com/journals", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${username}:${credentials.password}`,
      },
      body: JSON.stringify(newJournal)
    })
      .then(handleErrors)
      .catch((error) => {
        setError(error.message);
      })
  };
  
  const editJournal = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    const newJournal = { id: props.id, title: title, content: content };
    put(newJournal);
    setTitle("");
    setContent("");
    props.setJournalForEdit('');
    setTimeout(() => props.setUpdate(true), 1000);
  }

  return (
    <form id="journal-form" onSubmit={editJournal} key={props.id}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" type="text" onChange={(e) => setContent(e.target.value)} value={content} />
      <br />
      <button id="save-btn" type="submit">Save</button>
      <button id="cancel-btn" onClick={() => props.setJournalForEdit('')}>Cancel</button>
    </form>
  )
}

export default EditPost
