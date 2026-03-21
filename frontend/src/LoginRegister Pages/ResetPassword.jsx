import React, { useState } from "react";
import { resetpassword } from "../api/resetpasswordApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const ResetPassword = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      alert("Session expired. Please start again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setError("");
      if (!email) {
        alert("Session expired. Please start again.");
        navigate("/forgot-password");
        return;
      }
      const response = await resetpassword(email, password);
      console.log("successfully resetted password!", response);
      alert("Password resetting Successful!");
      localStorage.removeItem("email");
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-2">
          Set New Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your new password below
        </p>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="w-full px-4 py-3 pr-12 border border-green-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Show/Hide */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-green-600 text-sm"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Reset Password
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Use a strong password for better security
        </p>
      </div>
    </div>
  );
};
