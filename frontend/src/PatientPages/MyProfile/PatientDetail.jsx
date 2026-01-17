
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserRoundPen } from "lucide-react";
import { motion } from "motion/react";
import { paitentInputdata } from "../data/paitentinputs";
import PaitentDetailCardComponent from "./PaitentDetailCardComponent";

export const PatientDetail = ({ patient, setPatient }) => {
  const [formData, setFormData] = useState(patient);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    setFormData(patient);
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      await axios.put(
        "http://localhost:8080/api/v1/patient/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

     
      setPatient(formData);

      setMessageType("success");
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessageType("error");
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="bg-white border border-green-300 rounded-2xl p-8">
      <div className="flex items-center gap-2">
        <UserRoundPen />
        <h1 className="text-3xl font-serif text-green-700">Patient Details</h1>
      </div>

      {message && (
        <p
          className={`mt-2 text-center ${
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
            {...input}
            value={formData[input.name]}
            onChange={handleChange}
          />
        ))}

        <div className="flex flex-col p-2">
          <label className="font-bold text-green-800">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-green-400 rounded-lg p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-4 w-full bg-green-600 text-white p-2 rounded-xl"
        >
          Update Details
        </motion.button>
      </form>
    </div>
  );
};
