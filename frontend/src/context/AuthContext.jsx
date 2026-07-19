import { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );




const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  const data = {
    token: res.data.token,
    user: res.data.user,
  };

  localStorage.setItem("auth", JSON.stringify(data));
  setAuth(data);
};


  const googleLogin = async (token) => {
    const res = await api.post("/auth/google", { token });
    const data = {
      token: res.data.token,
      user: res.data.user,
    };
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

