import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(null); // null ou { username, isAdmin }

  return (
    <AuthContext.Provider value={{ users, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
