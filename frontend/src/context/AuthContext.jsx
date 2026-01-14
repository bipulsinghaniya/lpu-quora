// import { createContext, useEffect, useState } from "react";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [auth, setAuth] = useState({ token: null, role: null });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     setAuth({ token, role });
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     const res = await api.post("/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", res.data.role);
//     setAuth({ token: res.data.token, role: res.data.role });
//   };

//   const logout = () => {
//     localStorage.clear();
//     setAuth({ token: null, role: null });
//   };

//   return (
//     <AuthContext.Provider value={{ auth, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }











import { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("auth")) || null
  );

  // const login = async (email, password) => {
  //   const res = await api.post("/auth/login", {
  //     email,
  //     password,
  //   });

  //   setAuth(res.data);
  //   localStorage.setItem("auth", JSON.stringify(res.data));
  // };



  const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

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
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

