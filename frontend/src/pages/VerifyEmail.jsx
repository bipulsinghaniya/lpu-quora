import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify/${token}`);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Verifying your email...</h2>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-green-600">
          ✅ Email verified successfully
        </h2>
        <Link
          to="/login"
          className="mt-4 text-orange-600 font-semibold underline"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl font-semibold text-red-600">
        ❌ Invalid or expired verification link
      </h2>
    </div>
  );
}
