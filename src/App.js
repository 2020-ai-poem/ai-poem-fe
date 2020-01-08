import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/public/Navbar';
import Router from './tools/Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
