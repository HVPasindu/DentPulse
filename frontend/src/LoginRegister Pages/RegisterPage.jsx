// import dental_logo from "../assets/headerLogo.png";
// import { ArrowLeft } from "lucide-react";
// import { registerpagedata } from "../data/registerpagedata";
// import InputCommonCard from "./InputCommonCard";
// import { useState } from "react";  // Import useState
// import axios from 'axios';  // Import axios
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     gender: "",
//     birthDate: "",
//     address: ""
//   });

//   const navigate = useNavigate();  // Initialize navigation hook

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/v1/auth/register-patient", formData);
//       if (response.status === 200) {
//         // On success, navigate to login page
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Registration failed", error);
//     }
//   };

//   return (
//     <div className=" bg-cyan-50 flex flex-col min-h-screen justify-center items-center ">
//       <div className="flex flex-row justify-center items-center bg-cyan-50 pr-80 py-2">
//         <ArrowLeft className="text-cyan-600" />
//         <a href="/" className="text-cyan-700">Back to Home</a>
//       </div>

//       <div className="border-2 rounded-2xl shadow-2xl border-cyan-400 flex flex-col p-5 w-[95%] py-15 mx-auto max-w-lg bg-white">
//         <div className="flex flex-col justify-center items-center">
//           <img src={dental_logo} alt="dental_logo" className="size-25" />
//         </div>
//         <div className="flex flex-col justify-center items-center">
//           <h1 className=" text-2xl ">Create Patient Account</h1>
//           <h1 className="text-lg text-cyan-500">Join us and start your journey to a healthier smile</h1>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col">
//           {registerpagedata.map((registerpage_data) =>
//             registerpage_data.type === "checkbox" ? (
//               <div key={registerpage_data.id}>
//                 <label className="text-cyan-500 text-sm">{registerpage_data.name}</label>
//                 <div>
//                   {registerpage_data.genders.map((gender) => (
//                     <label key={gender} className="text-cyan-500 p-1.5 text-lg">
//                       <input
//                         type="radio"
//                         name="gender"
//                         value={gender}
//                         onChange={handleChange}
//                         className="gap-x-1.5"
//                       />
//                       {gender}
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <InputCommonCard
//                 key={registerpage_data.id}
//                 type={registerpage_data.type}
//                 name={registerpage_data.name}
//                 value={formData[registerpage_data.name]}
//                 onChange={handleChange}
//               />
//             )
//           )}
//           <div className="flex justify-center items-center p-5">
//             <button type="submit" className="bg-cyan-600 rounded-2xl w-[90%] p-3 text-white mx-auto hover:bg-cyan-800">
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <div className="py-6">
//           <hr />
//         </div>
//         <div className="flex flex-row justify-center gap-4">
//           <h1 className="text-cyan-500">Have An Account?</h1>
//           <a href="/login" className="text-cyan-600 hover:text-cyan-700">
//             <u>Login Here</u>
//           </a>
//         </div>
//       </div>

//       <div className="pt-10">
//         <h1 className="text-cyan-900 font-light font-lg">For assistance, call us at (555) 123-4567</h1>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


import dental_logo from "../assets/headerLogo.png";
import { ArrowLeft } from "lucide-react";
import { useState } from "react"; // Import useState
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import InputCommonCard from "./InputCommonCard";
import { registerpagedata } from "../data/registerpagedata";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    birthDate: "",
    address: "",
    confirmPassword: "", // Add confirmPassword to state
  });

  const navigate = useNavigate(); // Initialize navigation hook

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add confirmPassword check here if needed
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register-patient", formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        // On success, navigate to login page
        localStorage.setItem("register_request_email", formData.email); // Optional: set a flag in localStorage
        navigate("/otp");
      }
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="bg-cyan-50 flex flex-col min-h-screen justify-center items-center">
      <div className="flex flex-row justify-center items-center bg-cyan-50 pr-80 py-2">
        <ArrowLeft className="text-cyan-600" />
        <a href="/" className="text-cyan-700">Back to Home</a>
      </div>

      <div className="border-2 rounded-2xl shadow-2xl border-cyan-400 flex flex-col p-5 w-[95%] py-15 mx-auto max-w-lg bg-white">
        <div className="flex flex-col justify-center items-center">
          <img src={dental_logo} alt="dental_logo" className="size-25" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl">Create Patient Account</h1>
          <h1 className="text-lg text-cyan-500">Join us and start your journey to a healthier smile</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {registerpagedata.map((registerpage_data) =>
            registerpage_data.type === "checkbox" ? (
              <div key={registerpage_data.id}>
                <label className="text-cyan-500 text-sm">{registerpage_data.label}</label>
                <div>
                  {registerpage_data.genders.map((gender) => (
                    <label key={gender} className="text-cyan-500 p-1.5 text-lg">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        onChange={handleChange}
                        className="gap-x-1.5"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <InputCommonCard
                key={registerpage_data.id}
                type={registerpage_data.type}
                name={registerpage_data.name}
                value={formData[registerpage_data.name]}
                onChange={handleChange}
              />
            )
          )}
          <div className="flex justify-center items-center p-5">
            <button type="submit" className="bg-cyan-600 rounded-2xl w-[90%] p-3 text-white mx-auto hover:bg-cyan-800">
              Sign Up
            </button>
          </div>
        </form>

        <div className="py-6">
          <hr />
        </div>
        <div className="flex flex-row justify-center gap-4">
          <h1 className="text-cyan-500">Have An Account?</h1>
          <a href="/login" className="text-cyan-600 hover:text-cyan-700">
            <u>Login Here</u>
          </a>
        </div>
      </div>

      <div className="pt-10">
        <h1 className="text-cyan-900 font-light font-lg">For assistance, call us at (555) 123-4567</h1>
      </div>
    </div>
  );
};

export default RegisterPage;
