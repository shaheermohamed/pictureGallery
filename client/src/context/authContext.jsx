/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: false });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthUser = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
