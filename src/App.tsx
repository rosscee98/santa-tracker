import React from 'react';
import './App.css';
import { findTimeUntilNextDestination } from './utils/findTimeUntilNextDestination';

function App() {
  const label = findTimeUntilNextDestination();

  return (
    <div className="App">
      <p>{label}</p>
    </div>
  );
}

export default App;
