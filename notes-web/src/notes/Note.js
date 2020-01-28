import React from 'react';
import './Note.css';

function Note({note}) {

  return (
    <div className="note">
      <p className="title">{note.title}</p>
      <p>{note.text}</p>
    </div>
  );
}

export default Note;