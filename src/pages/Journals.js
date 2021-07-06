import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext, CurrentMenuContext } from '../App';
import './Journals.css';
import { handleErrors } from './Login';
import NewPost from '../components/NewPost';
import EditPost from '../components/EditPost';
import parse from 'html-react-parser';

function Journals() {
  const [journals, setJournals] = useState([]);
  const [update, setUpdate] = useState(false);
  const [credentials,] = useContext(CredentialsContext);
  const [currentMenu,] = useContext(CurrentMenuContext);
  const [username,] = useState(credentials.username);
  const [journalForEdit, setJournalForEdit] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    getJournals();
  }, [])

  useEffect(() => {
    if (update === true) {
      getJournals();
      setUpdate(false);
    }
  }, [update])

  const getJournals = () => {
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
    setJournalForEdit(id);
  }

  const deleteJournal = (id) => {
    if (window.confirm("Are you really going to delete this journal?")){
      let temp = journals;
      for (let i = 0; i < temp.length; i++) {
        if ( temp[i]._id === id ) {
          temp.splice(i, 1);
          i--;
        }
      }
      setJournals(temp);
      deleteOne(id);
      getJournals();
    } else {
      return;
    }
  }

  const deleteOne = (id) => {
    fetch("https://urjournal-backend.herokuapp.com/journals", {
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
        setUpdate(true);
      })
      .catch((error) => {
        setError(error.message);
      })
  };

  return (
    <div id="journal-div">
      {currentMenu === "new" && 
        <NewPost 
          setJournals={setJournals} 
          journals={journals}
          setUpdate={setUpdate} />
      }
      {currentMenu === "recent" && journals.map((journal) => {
        console.log(journal.content);
        if (journalForEdit === journal._id) {
          return <EditPost 
                    setJournalForEdit={setJournalForEdit}
                    setUpdate={setUpdate} 
                    title={journal.title}
                    content={journal.content}
                    id={journal._id}
                  />
        } else {
          return (
            <div className="journal" key={journal._id}>
              <h2>{journal.title}</h2>
              <p>{parse(journal.content.replaceAll('\n', "<br />"))}</p>
              <div className="journal-btns">
                <button onClick={() => editJournal(journal._id)}>Edit</button>
                <button onClick={() => deleteJournal(journal._id)}>Delete</button>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Journals
