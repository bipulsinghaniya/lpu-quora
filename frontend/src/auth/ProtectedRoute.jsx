// import { useContext } from "react";          // ✅ ADD THIS
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children, adminOnly = false }) {
//   const { auth, loading } = useContext(AuthContext);

//   if (loading) return <div className="p-10">Loading...</div>;
//   if (!auth.token) return <Navigate to="/login" replace />;
//   if (adminOnly && auth.role !== "admin") return <Navigate to="/" replace />;

//   return children;
// }



import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);

  // ✅ if NOT logged in
  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
