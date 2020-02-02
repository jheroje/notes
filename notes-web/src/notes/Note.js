import React, { useState } from 'react';
import './Note.css';

function Note({note}) {

  const [editable, setEditable] = useState(false);

  return (
    <div className="note">
      <button onClick={() => setEditable(!editable)}>click</button>

      { editable ? <input type="text" value={note.title}/> : <p className="title">{note.title}</p> }
      { editable ? <textarea value={note.text} /> : <p>{note.text}</p> }
    </div>
  );
}

export default Note;