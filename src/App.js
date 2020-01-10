import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './contexts/UserContext';
import Navbar from './components/public/Navbar';
import Router from './tools/Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserContextProvider>
          <Navbar />
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
