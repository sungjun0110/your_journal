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
  }, [journals])

  const getJournals = () => {
    return journals;
  }

  const getKey = () => {
    setKey(key+1);
    return key;
  }

  const deleteJournal = (id) => {
    let temp = journals;
    for (let i = 0; i < temp.length; i++) {
      if ( temp[i]._id === id ) {
        temp.splice(i, 1);
        i--;
      }
    }
    setJournals(temp);
    post(journals);
  }

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

  return (
    <div id="journal-div">
      {currentMenu === "new" && <NewPost />}
      {currentMenu === "recent" && getJournals().map((journal) => (
        <div className="journal" key={getKey}>
          <h2>{journal.title}</h2>
          <p>{journal.content}</p>
          <div className="journal-btns">
            <button>Edit</button>
            <button onClick={() => deleteJournal(journal._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Journals
