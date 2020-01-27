import React, { useState, useEffect } from 'react';
import './Note.css';

function Note() {
  const [note, setNote] = useState(0);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('http://localhost:9000/notes/1');
      const data = await response.json();
      setNote(data);
    }

    loadData();
  }, []);

  return (
    <div className="note">
      <p className="title">{note.title}</p>
      <p>{note.text}</p>
    </div>
  );
}

export default Note;