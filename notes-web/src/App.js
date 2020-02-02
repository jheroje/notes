import React from 'react';
import List from './notes/List.js';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="header" />
      <div className="body">
        <List />
      </div>
    </div>
  );
}

export default App;