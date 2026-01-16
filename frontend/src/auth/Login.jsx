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
//       await login(email, password); // 🔥 API call
//       navigate("/", { replace: true }); // 🔥 redirect to home
//     } catch {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-orange-600">LPU Quora</h1>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-10 shadow-lg">
            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to continue to LPU Quora
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-400 text-red-800 px-5 py-4 rounded-lg mb-6">
                <p className="font-semibold text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-4 rounded-lg"
              >
                Login
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700">
                New user?{" "}
                <Link
                  to="/register"
                  className="text-orange-600 hover:text-orange-700 font-bold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}