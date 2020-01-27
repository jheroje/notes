import React, { useState, useEffect } from 'react';

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
    <div>
      <h1>{note.title}</h1>
      <p className="note">{note.text}</p>
    </div>
  );
}

export default Note;