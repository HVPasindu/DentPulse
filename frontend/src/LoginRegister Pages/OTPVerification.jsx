import React, { useState, useRef } from "react";
import { confirmotp } from "../api/confrimotpApi";
import { useNavigate } from "react-router-dom";
import { otpresend } from "../api/otpresendApi";
export const OTPVerification = ({ onVerify }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  // Handle typing
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });
  };
  const email = localStorage.getItem("email");
  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    console.log("Entered OTP:", finalOtp);

    if (finalOtp.length === 6) {
      try {
        const response = await confirmotp(email, finalOtp);
        console.log("response", response);
        navigate("/reset");
      }catch (error) {
  console.error(error);

  alert(
    error?.response?.data?.message ||
    "Invalid OTP"
  );
}
    } else {
      alert("Please enter complete OTP");
    }
  };

  const resendotp = async (email) => {
    try {
      const response = await otpresend(email);
      alert(response?.message || "OTP resent successfully");
     }catch (error) {
  console.error(error);

  alert(
    error?.response?.data?.message ||
    "OTP Sent Failed!"
  );
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-2">Verify OTP</h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              data-testid="otp-input"
              className="w-12 h-12 text-center text-xl border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Verify OTP
        </button>

        {/* Resend */}
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <span
            className="text-green-600 cursor-pointer hover:underline"
            onClick={() => resendotp(email)}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};
