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

  useEffect(() => {
    getJouranls();
  }, [])

  const getJouranls = () => {
    fetch("https://urjournal-backend.herokuapp.com/journals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${username}:${credentials.password}`,
      },
    })
    .then((response) => response.json())
    .then((journals) => setJournals(journals));
  }

  const editJournal = (id) => {

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
    deleteOne(id);
    getJouranls();
  }

  const deleteOne = (id) => {
    fetch("http://localhost:8001/journals", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${username}:${credentials.password}`,
        "id": id,
      },
    })
      .then(handleErrors)
      .then((journals) => {
        setJournals(journals);
      })
      .catch((error) => {
        setError(error.message);
      })
  };

  return (
    <div id="journal-div">
      {currentMenu === "new" && <NewPost />}
      {currentMenu === "recent" && journals.map((journal) => (
        <div className="journal" key={journal._id}>
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
