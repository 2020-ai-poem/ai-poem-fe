import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UIContextProvider from './contexts/UIContext';
import UserContextProvider from './contexts/UserContext';
import Navbar from './components/public/Navbar';
import Router from './tools/Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UIContextProvider>
          <UserContextProvider>
            <Navbar />
            <Router />
          </UserContextProvider>
        </UIContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
