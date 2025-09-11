import React, { createContext, useState, useEffect } from 'react';

export let LoginContext = createContext();

export let LoginProvider = ({ children }) => {
  // Initialize from localStorage to persist state across refreshes
  const getInitialLogged = () => {
    const savedLogged = localStorage.getItem('logged');
    return savedLogged === 'true'; // returns true or false
  };

  let [logged, setLog] = useState(getInitialLogged);

  useEffect(() => {
    // Sync logged state to localStorage on change
    localStorage.setItem('logged', logged);
  }, [logged]);

  function login() {
    setLog(true);
  }

  function logout() {
    setLog(false);
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('usertype');
    // Remove stored logged flag as well
    localStorage.removeItem('logged');
  }

  return (
    <LoginContext.Provider value={{ logged, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
