import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App';
import './Journals.css';
import { handleErrors } from './Login';
import NewPost from '../components/NewPost';

function Journals() {
  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [credentials,] = useContext(CredentialsContext);
  const [username,] = useState(credentials.username);
  const [error, setError] = useState("");
  const [key, setKey] = useState(0);

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

  const getJournals = () => {
    return journals;
  }

  const getKey = () => {
    setKey(key+1);
    return key;
  }

  return (
    <div id="journal-div">
      {<NewPost />}
      {getJournals().map((journal) => (
        <div className="journal" key={getKey}>
          <h2>{journal.title}</h2>
          <p>{journal.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Journals
