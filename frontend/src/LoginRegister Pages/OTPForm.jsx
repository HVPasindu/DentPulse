// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function OTPForm() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Use navigate for redirection

//   const handleConfirm = async () => {
//     if (!email || !email.includes('@')) {
//       setMessage('Please enter a valid email address');
//       return;
//     }
//     if (otp.length !== 6) {
//       setMessage('Please enter a 6-digit OTP');
//       return;
//     }

//     try {
//       // Send OTP verification request
//       const response = await axios.post('http://localhost:8080/api/v1/auth/verify-email', {
//         email: email,
//         otp: otp,
//       });

//       // If OTP is successfully verified
//       if (response.status === 200) {
//         setMessage('OTP verified successfully!');
//         // Redirect to login page
//         setTimeout(() => {
//           navigate('/login'); // Redirect after successful verification
//         }, 2000); // You can adjust the delay as per your requirement
//       }
//     } catch (error) {
//       // Handle error
//       setMessage(error.response?.data || 'OTP verification failed. Please try again.');
//     }
//   };

//   const handleOTPChange = (e) => {
//     const value = e.target.value.replace(/\D/g, '').slice(0, 6);
//     setOtp(value);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">DentPluse</h1>
//           <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Enter OTP</h2>
//             <p className="text-cyan-600 text-sm text-center mb-6">Check your email for the OTP</p>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your.email@example.com"
//                   className="w-full px-4 py-3 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-gray-700 placeholder-gray-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={handleOTPChange}
//                   placeholder="000000"
//                   maxLength="6"
//                   className="w-full px-4 py-3 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-gray-700 text-center text-2xl font-mono tracking-widest placeholder-gray-400"
//                 />
//                 <p className="text-xs text-gray-500 text-center mt-2">Enter 6-digit code</p>
//               </div>
//             </div>
//           </div>

//           {message && (
//             <p className={`text-sm text-center ${message.includes('valid') || message.includes('enter') ? 'text-red-500' : 'text-green-600'}`}>
//               {message}
//             </p>
//           )}

//           <button
//             onClick={handleConfirm}
//             className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

export default function OTPForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get email from localStorage when component mounts
    const savedEmail = localStorage.getItem('register_request_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleConfirm = async () => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      return;
    }
    if (otp.length !== 6) {
      setMessage('Please enter a 6-digit OTP');
      return;
    }

    try {
      // Send OTP verification request
      const response = await fetch('http://localhost:8080/api/v1/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });

      // If OTP is successfully verified
      if (response.ok) {
        setMessage('OTP verified successfully!');
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        const errorData = await response.text();
        setMessage(errorData || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      setMessage('OTP verification failed. Please try again.');
    }
  };

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">DentPluse</h1>
          <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">Enter OTP</h2>
            <p className="text-cyan-600 text-sm text-center mb-6">Check your email for the OTP</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={handleOTPChange}
                  placeholder="000000"
                  maxLength="6"
                  className="w-full px-4 py-3 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-gray-700 text-center text-2xl font-mono tracking-widest placeholder-gray-400"
                />
                <p className="text-xs text-gray-500 text-center mt-2">Enter 6-digit code</p>
              </div>
            </div>
          </div>

          {message && (
            <p className={`text-sm text-center ${message.includes('valid') || message.includes('enter') || message.includes('failed') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}

          <button
            onClick={handleConfirm}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}