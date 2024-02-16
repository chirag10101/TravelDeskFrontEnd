import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState();

  return (
    <UserContext.Provider value={{ decodedToken, setDecodedToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};


