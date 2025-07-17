import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  return (
    <GameContext.Provider value={{ users, setUsers, roles, setRoles }}>
      {children}
    </GameContext.Provider>
  );
};
