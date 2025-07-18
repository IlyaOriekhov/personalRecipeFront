import { useState, useEffect, ReactNode } from "react";
import api from "../services/api";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
