import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import loginpagedata from "../data/loginpagedata";
import InputCommonCard from "./InputCommonCard";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);

        navigate("/patient");
      }
    } catch (error) {
      setMessage("Invalid email or password, please try again.");
    }
  };

  return (
    <div className="  flex flex-col min-h-screen justify-center items-center ">
      <div className="flex flex-row justify-center items-center  pr-50 md:pr-80 py-2">
        <ArrowLeft className="text-green-600" />
        <a href="/" className="text-green-700">
          Back to Home
        </a>
      </div>

      <div className="border-2 rounded-2xl shadow-2xl border-green-400 flex flex-col  p-5 w-[95%] py-15 mx-auto max-w-lg bg-white">
        <div className="flex flex-col justify-center items-center">
          <img
            src="logo.png"
            alt="dental_iamge_rest here"
            className="size-25 "
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className=" text-4xl  font-sans">Login</h1>
          <h1 className="text-lg md:text-xl text-green-700">
            {" "}
            Access your patient portal to manage appointments
          </h1>
        </div>

        <div className=" ">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {loginpagedata.map((login_data, index) => (
              <InputCommonCard
                key={login_data.id}
                type={login_data.type}
                name={login_data.name}
                value={formData[login_data.name]}
                onChange={handleChange}
                label={login_data.label}
              />
            ))}

            {message && (
              <div className="text-red-500 text-center mt-2">{message}</div>
            )}

            <div className="flex flex-row justify-around pt-3">
              <div className="flex flex-row gap-x-3  ">
                <input type="checkbox" />
                <label className="pr-4 text-green-600 text-xl">
                  Remember Me
                </label>
              </div>

              <div>
                <a href="" className="hover:text-green-500">
                  Forget Password?
                </a>
              </div>
            </div>
            <div className="flex justify-around items-center pt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-green-600 rounded-2xl w-[90%] p-3 text-white mx-auto hover:bg-green-800"
              >
                Sign in
              </motion.button>
            </div>
            <div className="py-6">
              <hr />
            </div>
            <div className="flex flex-row justify-center gap-4">
              <h1 className="text-green-600 text-lg">Dont Have An Account?</h1>
              <a
                href="/register"
                className="text-green-600 hover:text-green-700"
              >
                <u>Register Here</u>
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="pt-10">
        <h1 className="text-green-900 font-light font-lg">
          For assistance, call us at (555) 123-4567
        </h1>
      </div>
    </div>
  );
};

export default MainLogin;
