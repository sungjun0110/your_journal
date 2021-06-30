import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext, CurrentMenuContext } from '../App';
import './Journals.css';
import { handleErrors } from './Login';
import NewPost from '../components/NewPost';

function Journals() {
  const [journals, setJournals] = useState([]);
  const [credentials,] = useContext(CredentialsContext);
  const [currentMenu,] = useContext(CurrentMenuContext);
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

  const getJournals = () => {
    return journals;
  }

  const getKey = () => {
    setKey(key+1);
    return key;
  }

  return (
    <div id="journal-div">
      {currentMenu === "new" && <NewPost />}
      {currentMenu === "recent" && getJournals().map((journal) => (
        <div className="journal" key={getKey}>
          <h2>{journal.title}</h2>
          <p>{journal.content}</p>
          <div className="journal-btns">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Journals
