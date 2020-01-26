import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Visits />
      </header>
    </div>
  );
}

function Visits() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('http://localhost:9000/');
      const data = await response.text();
      setVisits(data);
    }

    loadData();
  }, []);

  return (
    <p className="visits">{visits}</p>
  );
}

export default App;
