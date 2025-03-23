import { createContext, useContext, useEffect, useState } from "react";
import userService from "../Services/userService";
const UserContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ statusCode: 400 });
  useEffect(() => {
    userService
      .isAuthenticated()
      .then((user) => setUser(user))
      .catch(() => {
        setUser({ statusCode: 401 });
      });
  }, []);
  async function logout() {
    setUser({ statusCode: 401, message: "Not authenticated" });
  }
  async function login(authUser) {
    setUser(authUser);
  }
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
