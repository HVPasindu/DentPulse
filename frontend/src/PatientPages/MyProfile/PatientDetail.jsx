import React from "react";
import { paitentInputdata } from "../data/paitentinputs";
import PaitentDetailCardComponent from "./PaitentDetailCardComponent";
import { UserRoundPen } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

export const PatientDetail = () => {

  const navigate = useNavigate();

  const [patientData, setPatientData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    gender: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); 
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:8080/api/v1/patient/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

     
        const data = res.data;
        const birthDate = data.birthDate ? String(data.birthDate).slice(0, 10) : "";

        setPatientData({
          fullName: data.fullName ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          birthDate,
          address: data.address ?? "",
          gender: data.gender ?? "",
        });

        setMessage("");
      } catch (err) {
        setMessageType("error");
        setMessage("Failed to fetch patient details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.put("http://localhost:8080/api/v1/patient/update", patientData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessageType("success");
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessageType("error");
      setMessage("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-cyan-300 rounded-2xl p-8">
        <p className="text-cyan-700">Loading patient details...</p>
      </div>
    );
  }


  return (
  <div className="bg-white border border-cyan-300 rounded-2xl p-8">
      <div className="flex flex-row items-center">
        <UserRoundPen />
        <h1 className="p-1.5 text-cyan-700">Patient Details</h1>
      </div>
      <h2 className="p-1.5 text-cyan-400">Update your personal information</h2>

      {message && (
        <p
          className={`text-center mt-2 ${
            messageType === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
          {paitentInputdata.map((input) => (
            <PaitentDetailCardComponent
              key={input.id}  
              type={input.type}
              name={input.name}
              label={input.label}
              value={patientData[input.name]}
              onChange={handleChange}
            />
          ))}
        <div className="flex flex-col p-2">
          <label className="font-light text-cyan-600">Gender</label>
          <select
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            className="rounded-lg border border-cyan-300 bg-gray-50 p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex flex-col p-2">
          <label className="font-light text-cyan-600">Address</label>
          <textarea
            name="address"
            value={patientData.address}
            onChange={handleChange}
            className="rounded-lg border border-cyan-300 bg-gray-50 p-2"
            placeholder="Address"
            rows={3}
          />
        </div>

        <div className="flex justify-center mt-3">
          <button
            type="submit"
            className="p-2 w-[90%] text-white bg-cyan-600 hover:bg-cyan-800 rounded-2xl"
          >
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};




//  <div>
//               {inputs.map((input) => (
//                 <div className="p-2.5" key={input.id}>
//                   {input.type === "select" ? (
//                     <div className="p-2">
//                       <label className="font-medium text-cyan-700 py-2.5">
//                         {input.name}
//                       </label>
//                       <br />
//                       <select
//                         className="border-2 border-cyan-500 rounded-md p-1"
//                         onChange={handleChange}
//                         name={input.label}
//                         value={formData[input.label] || ""}
//                       >
//                         <option value="">Select A Relationship</option>
//                         {input.options.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   ) : input.type === "radio" ? (
//                     <div className="p-2">
//                       <label className="font-medium text-cyan-700 py-2.5">
//                         {input.name}
//                       </label>
//                       <br />
//                       <div className="flex flex-row gap-4 pt-2">
//                         {input.options.map((option) => (
//                           <label key={option} className="flex items-center gap-2 cursor-pointer">
//                             <input
//                               type="radio"
//                               name={input.label}
//                               value={option}
//                               checked={formData[input.label] === option}
//                               onChange={handleChange}
//                               className="w-4 h-4 text-cyan-500 border-cyan-500 focus:ring-cyan-500"
//                             />
//                             <span className="text-cyan-700">{option}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="">
//                       <label className="p-2 font-medium text-cyan-700 py-1.5">
//                         {input.name}
//                       </label>
//                       <br />
//                       <input
//                         type={input.type}
//                         className="border-2 border-cyan-500 w-[95%] rounded-md p-0.5"
//                         placeholder={input.name}
//                         onChange={handleChange}
//                         name={input.label}
//                         value={formData[input.label] || ""}
//                       />
//                     </div>
//                   )}
//                 </div>