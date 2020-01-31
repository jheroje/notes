import React, { useState, useEffect } from 'react';
import Note from './Note.js'
import './List.css'

function List() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('https://localhost:9000/notes');
      const data = await response.json();
      setNotes(data);
    }

    loadData();
  }, []);

  return (
    <div className="list">
      { notes.map((note) => <Note note={note}/>) }
    </div>
  );
}

export default List;