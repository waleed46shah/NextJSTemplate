// app/context/AuthContext.tsx
"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { verifyToken } from "../(pages)/api/auth/api";
interface AuthContextValue {
  isAuthenticated: boolean;
  user: { username: string; role: "admin" | "user" } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    username: string;
    role: "admin" | "user";
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        setUser(decoded);
      }
    }
  }, []);

  const login = (token: string) => {
    const decoded = verifyToken(token);
    if (decoded) {
      setUser(decoded);
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
