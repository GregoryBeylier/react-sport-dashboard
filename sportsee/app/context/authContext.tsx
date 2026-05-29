import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

    interface AuthContextType {
    authToken: string | null;
    login: (token: string) => void;
    logout: () => void;
    };

const AuthContext = createContext<AuthContextType | null>(null);



export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
}

export const getTokenFromCookie = () => {
  if (typeof document === "undefined") return "";
  
  const cookies = document.cookie.split(";");

  const token = cookies.find(cookie => cookie.startsWith("token"))

  let cookieToken = "";

  if (token) cookieToken = token.replace("token=", "");

  return cookieToken;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(getTokenFromCookie);
  
  const login = (token: string ) => {
    setAuthToken(token);
    document.cookie =`token=${token}; path=/`
  };

  const logout = () => {
    setAuthToken(null);
    document.cookie = "token=; max-age=0; path=/";
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



