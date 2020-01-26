import React, { useState, useEffect } from 'react';

function Note() {
  const [note, setNote] = useState(0);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('http://localhost:9000/notes/1');
      const data = await response.text();
      setNote(data);
    }

    loadData();
  }, []);

  return (
    <p className="note">{note}</p>
  );
}

export default Note;