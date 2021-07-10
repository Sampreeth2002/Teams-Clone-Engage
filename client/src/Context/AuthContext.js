import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";

export const AuthContext = createContext();

// "import/no-anonymous-default-export": ["error", {
//   "allowArray": false,
//   "allowArrowFunction": false,
//   "allowAnonymousClass": false,
//   "allowAnonymousFunction": false,
//   "allowCallExpression": true, // The true value here is for backward compatibility
//   "allowLiteral": false,
//   "allowObject": false
// }]

const AuthContextFunction = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
      console.log(data);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthContextFunction;
