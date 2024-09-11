import { useAuthControllerGetProfile } from "@/api/endpoints/auth/auth";
import React, { useContext, useEffect } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  login: () => void;
  // logout: () => void;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<string | null>(null);
  const [isLogged, setIsLogged] = React.useState(false);
  const isAuthenticated = Boolean(user);

  const { data } = useAuthControllerGetProfile({
    query: {
      retry: 1,
      enabled: isLogged,
    },
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
      localStorage.setItem("user", user);
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);
  useEffect(() => {
    if (data) {
      setUser(data.data.username);
      setIsLogged(true);
      localStorage.setItem("user", JSON.stringify(data.data));
    }
  }, [data, isLogged]);

  const login = () => {
    setIsLogged(true);
    
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        // logout: () => setIsAuthenticated(false),
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
