import React from "react"

import Icon from "../Admin/Icon"
import Form from "../Admin/Form" 

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 to-teal-800 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">DentPulse</h1>
              <p className="text-teal-200 text-sm">Admin Portal</p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Manage Your Dental<br />Practice with Ease
            </h2>
            <p className="text-teal-100 text-lg leading-relaxed">
              Access patient records, appointments, billing, and analytics all in one powerful dashboard.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold">2,500+</p>
            <p className="text-teal-200 text-sm">Patients Managed</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold">150+</p>
            <p className="text-teal-200 text-sm">Daily Appointments</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-3xl font-bold">99.9%</p>
            <p className="text-teal-200 text-sm">Uptime</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DentPulse</h1>
              <p className="text-teal-600 text-sm">Admin Portal</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full mb-4">
                ADMIN ACCESS ONLY
              </span>
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-500 mt-2">
                Sign in to access the admin dashboard
              </p>
            </div>

            <Form />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need help? Contact{" "}
                <a
                  href="mailto:support@dentpulse.com"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  IT Support
                </a>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            © 2025 DentPulse. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
