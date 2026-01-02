import React, { useEffect, useState } from "react";
import { UserRoundPen } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaitentDetailCardComponent from "./PaitentDetailCardComponent";
import {paitentInputdata} from "../data/paitentInputsData";

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
  const [messageType, setMessageType] = useState("error"); // "success" | "error"
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

        // If backend returns ISO datetime, keep only YYYY-MM-DD for <input type="date" />
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
      <div className="bg-white border-2 border-cyan-400 rounded-2xl p-8">
        <p className="text-cyan-700">Loading patient details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-cyan-400 rounded-2xl p-8">
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
            className="rounded-lg border-2 border-cyan-400 bg-gray-200 p-2"
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
            className="rounded-lg border-2 border-cyan-400 bg-gray-200 p-2"
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
