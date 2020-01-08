import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './tools/Router';

function App() {
  return (
    <div className="App">
      <h1>ai-poem</h1>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
