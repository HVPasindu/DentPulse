import React from "react"



import { useState } from "react"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    console.log({ email, password, rememberMe })

    setTimeout(() => {
      setIsLoading(false)
      alert("Login functionality will be connected to backend")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
          placeholder="admin@dentpulse.com"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
           placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-teal-600 text-white rounded-lg"
      >
        {isLoading ? "Signing in..." : "Sign In "}
      </button>
    </form>
  )
}

