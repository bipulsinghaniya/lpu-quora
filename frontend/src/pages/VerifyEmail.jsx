import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // ✅ safe access

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // 🚨 handle direct access / refresh
  if (!email) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No email found</h2>
        <p>Please register again.</p>
        <button onClick={() => navigate("/register")}>
          Go to Register
        </button>
      </div>
    );
  }

  const handleVerify = async () => {
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Verify OTP</h2>
      <p>Email: {email}</p>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />

      <button onClick={handleVerify}>Verify</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}