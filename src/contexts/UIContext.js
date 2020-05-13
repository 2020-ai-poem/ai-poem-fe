import React, { useState, createContext } from 'react';

export const UIContext = createContext();

const initText = {
  isText: false,
  content: '～'
}

const UIContextProvider = (props) => {
  const [dimmer, setDimmer] = useState(false);
  const [text, setText] = useState(initText);

  const toggleDimmer = (value) => {
    setDimmer(value);
  }

  const toggleText = (value) => {
    setText(value);

    setTimeout(() => {
      setText(initText);
    }, 2000);
  }

  return (
    <UIContext.Provider value={{ dimmer, toggleDimmer, text, toggleText }}>
      { props.children }
    </UIContext.Provider>
  );
};

export default UIContextProvider;
