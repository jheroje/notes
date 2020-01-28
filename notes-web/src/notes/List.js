import React, { useState, useEffect } from 'react';
import Note from './Note.js'
import './List.css'

function List() {
  const [note, setNote] = useState(0);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('https://localhost:9000/notes/1');
      const data = await response.json();
      setNote(data);
    }

    loadData();
  }, []);

  return (
    <div className="list">
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
      <Note note={note}/>
    </div>
  );
}

export default List;