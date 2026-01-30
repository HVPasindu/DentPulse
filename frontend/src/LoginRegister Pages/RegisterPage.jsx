import { motion } from "framer-motion";
import { ArrowLeft,House } from "lucide-react";
import { registerpagedata } from "../data/registerpagedata";
import InputCommonCard from "./InputCommonCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    birthDate: "",
    address: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "*Full name is required";

    if (!formData.email) newErrors.email = "*Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "*Invalid email address";

    if (!formData.phone) newErrors.phone = "*Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "*Phone number must be exactly 10 digits";

    if (!formData.address) newErrors.address = "*Address is required";

    if (!formData.birthDate) newErrors.birthDate = "*Date of birth is required";

    if (!formData.gender) newErrors.gender = "*Please select gender";

    if (!formData.password) newErrors.password = "*Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "*Minimum 6 characters";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "*Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register-patient",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        localStorage.setItem("register_request_email", formData.email);
         await Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Please verify your account using the OTP sent to your email",
        confirmButtonText: "Continue",
        confirmButtonColor: "#16a34a",
      });
        navigate("/otp");
      }
    } catch (error) {
      Swal.fire({
      icon: "error",
      title: "Registration Failed ❌",
      text:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
      confirmButtonColor: "#dc2626",
    });
      console.error("Registration failed", error);
    }
  };

  return (
    <div
      className="relative  flex flex-col min-h-screen justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
       <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center  pr-50 md:pr-80 py-2">
        <ArrowLeft className="text-black text-xl" />
        <a href="/" className="text-black text-xl">
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
        <div className="flex flex-col items-center justify-center pb-10 text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl ">
            Create Patient Account
          </h1>

          <p className="mt-2 text-base sm:text-lg md:text-2xl text-green-500">
            Join us and start your journey to a healthier smile
          </p>
        </div>

        <div className=" ">
          <form onSubmit={handleSubmit} className="flex flex-col">
            {registerpagedata.map((registerpage_data) =>
              registerpage_data.type === "checkbox" ? (
                <div key={registerpage_data.id}>
                  <label className="text-green-600  font-semibold text-lg">
                    {registerpage_data.label}
                  </label>
                  <div>
                    {registerpage_data.genders.map((gender) => (
                      <label
                        key={gender}
                        className="text-green-500 p-1.5 text-xl"
                      >
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
                  label={registerpage_data.label}
                  onChange={handleChange}
                  error={errors[registerpage_data.name]}
                />
              )
            )}
            <div className="flex justify-center items-center p-5">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-green-600 rounded-2xl w-[90%] p-3 text-white mx-auto hover:bg-green-800"
              >
                Sign Up
              </motion.button>
            </div>
          </form>
        </div>

        <div className="py-6">
          <hr />
        </div>
        <div className="flex flex-row justify-center gap-4">
          <h1 className="text-green-500">Have An Account?</h1>
          <a
            href="/login"
            className="text-green-600 hover:text-green-700 text-lg"
          >
            <u>Login Here</u>
          </a>
        </div>
      </div>
      <div className="pt-10">
        <h1 className="text-green-900 font-light font-lg">
          For assistance, call us at (555) 123-4567
        </h1>
      </div>
      </div>
    </div>
  );
};
export default RegisterPage;
