import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    try {
      await login(email, password); // 🔥 API call
      navigate("/", { replace: true }); // 🔥 redirect to home
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-80">
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2"
        >
          Login
        </button>

        <p className="text-sm mt-2">
          New user? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}



// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");

//     if (!email || !password) {
//       setError("Email and password required");
//       return;
//     }

//     try {
//       await login(email, password); // ✅ token saved inside context
//       navigate("/", { replace: true });
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-80">
//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 w-full mb-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 w-full mb-2"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           className="bg-blue-600 text-white w-full p-2"
//         >
//           Login
//         </button>

//         <p className="text-sm mt-2">
//           New user? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }
