
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

//     if (!form.name || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       await api.post("/auth/register", form);
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-80">
//         {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Name"
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input
//           className="border p-2 w-full mb-2"
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           className="border p-2 w-full mb-2"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           onClick={handleRegister}
//           className="bg-blue-600 text-white w-full p-2"
//         >
//           Register
//         </button>

//         <p className="text-sm mt-2 text-center">
//           Already registered? <Link to="/login">Login</Link>
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-orange-600">LPU Quora</h1>
        </div>
      </header>

      {/* Register Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-10 shadow-lg">
            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Join LPU Quora community today
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
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <button
                onClick={handleRegister}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-4 rounded-lg"
              >
                Register
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-orange-600 hover:text-orange-700 font-bold"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}