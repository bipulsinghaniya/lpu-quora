



// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const [error, setError] = useState("");

//   const handleRegister = async () => {
//     setError("");

//     // 🔍 Frontend validation
//     if (!form.name || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       await api.post("/auth/register", form);
//       navigate("/login");
//     } catch (err) {
//       // ✅ SHOW BACKEND MESSAGE (IMPORTANT FIX)
//       setError(
//         err.response?.data?.message || "Registration failed"
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-80">
//         {error && (
//           <p className="text-red-500 mb-2 text-center">
//             {error}
//           </p>
//         )}

//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Name"
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//         />

//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Email"
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-2"
//           placeholder="Password"
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button
//           onClick={handleRegister}
//           className="bg-blue-600 text-white w-full p-2"
//         >
//           Register
//         </button>

//         <p className="text-sm mt-2 text-center">
//           Already registered?{" "}
//           <Link to="/login" className="text-blue-600">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80">
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="bg-blue-600 text-white w-full p-2"
        >
          Register
        </button>

        <p className="text-sm mt-2 text-center">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
