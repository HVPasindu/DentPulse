import React, { useState } from "react";

export const ResetPassword = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (password !== confirm) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSubmit = () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit(password);
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
            className="w-full px-4 py-3 border border-green-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-green-600"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-green-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
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

        {/* Extra */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Make sure your password is strong and secure
        </p>
      </div>
    </div>
  );
};