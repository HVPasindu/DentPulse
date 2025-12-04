import { useState } from "react";
import InputField from "../component/InputField";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
      
      {/* Icon */}
      <div className="w-20 h-20 mx-auto bg-cyan-600 text-white rounded-full flex items-center justify-center text-4xl mb-4">
        😊
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-700">Admin Login</h2>
      <p className="text-gray-500 mb-8">
        Access your admin dashboard securely
      </p>

      {/* Username */}
      <InputField
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        icon="👤"
      />

      {/* Password */}
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon="🔒"
      />

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2 text-gray-600">
          <input type="checkbox" />
          Remember me
        </label>
        <a href="#" className="text-cyan-600 text-sm">
          Forgot password?
        </a>
      </div>

      {/* Button */}
      <button className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition">
        Sign In
      </button>

      {/* Register */}
      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <a className="text-cyan-600 cursor-pointer">Register here</a>
      </p>
    </div>
  );
}
