import React, { useState, createContext } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(localStorage.getItem('user'));

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user: JSON.parse(user), login, logout }}>
      { props.children }
    </UserContext.Provider>
  );
};

export default UserContextProvider;
