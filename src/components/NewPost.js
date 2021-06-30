import React from 'react'

function NewPost() {
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
