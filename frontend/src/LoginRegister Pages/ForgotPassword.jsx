import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {forgotpw} from "../api/forgotpasswordApi"
import Swal from "sweetalert2";
export const ForgotPassword = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
    localStorage.setItem("email", email);
    console.log(localStorage.getItem("email"));

    const response = await forgotpw(email);

    console.log("response", response);

   
    navigate("/forgot-otp");

  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Failed to send reset link"
    );
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-green-700 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your email to receive a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition duration-300"
         >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <p className="text-sm text-center mt-6 text-gray-500">
          Remember your password?{" "}
          <span className="text-green-600 cursor-pointer hover:underline" onClick={()=>navigate("/login")}>
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};