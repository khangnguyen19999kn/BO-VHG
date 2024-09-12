import { useAuthControllerGetProfile } from "@/api/endpoints/auth/auth";
import React, { useCallback, useContext, useEffect } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  login: () => void;
  isLoading: boolean;
  logout: () => void;
}
const key = "user";

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}
const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  const [isLogged, setIsLogged] = React.useState(false);
  const [isFirstLoad, setIsFirstLoad] = React.useState(true);
  const isAuthenticated = !!user;

  const { data, isSuccess, isLoading } = useAuthControllerGetProfile({
    query: {
      retry: 1,
      enabled: isLogged || isFirstLoad,
    },
  });
  const login = useCallback(() => {
    setIsLogged(true);
  }, []);
  const logout = () => {
    setIsLogged(false);
    setUser(null);
    setStoredUser(null);
  };
  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.username);
      login();
      setStoredUser(data.data.username);
      return;
    }
    logout();
  }, [data, login, isSuccess]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
