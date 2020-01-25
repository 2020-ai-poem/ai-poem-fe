import React, { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../tools/api';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(localStorage.getItem('user'));

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    history.push('/');
  };

  const update = (user) => {
    console.log(user);
    // update directly
  };

  return (
    <UserContext.Provider value={{ user: JSON.parse(user), login, logout, update }}>
      { props.children }
    </UserContext.Provider>
  );
};

export default UserContextProvider;
