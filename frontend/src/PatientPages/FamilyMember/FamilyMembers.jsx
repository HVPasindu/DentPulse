import React, { useEffect, useState } from "react";
import { IdCard, UserRoundPlus, Trash2, SquarePen, Users } from "lucide-react";
import { PopupForm } from "./PopupForm";
import { PatientIdCard } from "./PatientIdCard";
import axios from "axios";
import Swal from "sweetalert2";

import { motion } from "motion/react";

export const FamilyMembers = () => {
  const [Isopen, setIsOpen] = useState(false);
  const [FamilyDetail, setFamilyDetail] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [IsIdOpen, setIsIdOpen] = useState(false);
  const [SelectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    gender: "",
  });

  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/patient`;

  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchData = async () => {
    try {
      const headers = getAuthHeaders();

      const [meRes, famRes] = await Promise.all([
        axios.get(`${BASE_URL}/mefortable`, { headers }),
        axios.get(`${BASE_URL}/family`, { headers }),
      ]);

      const mapMember = (m) => ({
        id: m.patientId ?? m.id,

        name: m.fullName ?? m.name ?? "",

        phone: m.phone ?? "",
        email: m.email ?? "",
        gender: m.gender ?? "",
        address: m.address ?? "",

        birthDate: (m.birthDate || "").includes("T")
          ? m.birthDate.slice(0, 10)
          : m.birthDate || "",

        relationship: m.relationship ?? "Account Owner",
        accountOwner: m.accountOwner ?? false,
      });

      const owner = meRes?.data ? mapMember(meRes.data) : null;
      const familyArray = Array.isArray(famRes?.data) ? famRes.data : [];
      const family = familyArray.map(mapMember);

      const merged = owner ? [owner, ...family] : family;
      setFamilyDetail(merged);
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIdcard = (member) => {
    setSelectedMember({
      ...member,
      date: member.birthDate,
    });
    setIsIdOpen(true);
  };

  const closeIdModel = () => setIsIdOpen(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openModal = () => {
    setFormData({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
      date: "",
      gender: "",
    });
    setIsEditMode(false);
    setEditingId(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
      date: "",
      gender: "",
    });
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name || "",
      relationship: member.relationship || "",
      phone: member.phone || "",
      email: member.email || "",
      address: member.address || "",
      date: member.birthDate || "",

      gender: member.gender || "",
    });

    setEditingId(member.id); // ✅ important: patientId
    setIsEditMode(true);
    setIsOpen(true);
  };

  // ✅ DELETE (BACKEND + UI)
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Family Member?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#9ca3af",
    });

    if (!result.isConfirmed) return;

    try {
      const headers = getAuthHeaders();
      await axios.delete(`${BASE_URL}/family/${id}`, { headers });

      setFamilyDetail((prev) => prev.filter((m) => m.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Family member removed successfully",
        confirmButtonColor: "#16a34a",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Unable to delete family member",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  // ✅ SUBMIT (ADD / UPDATE) WITH AXIOS
  // PopupForm calls handleSubmit() without event (type="button"), so keep no e.preventDefault()
  const handleSubmit = async () => {
    try {
      const headers = getAuthHeaders();

      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        relationship: formData.relationship,
        birthDate: formData.date,
        address: formData.address,
        gender: (formData.gender || ""),
        hasNic: formData.nic === "With NIC",
        nic: formData.nic === "With NIC" ? formData.nicnumber : null,
      };

      Swal.fire({
        title: isEditMode ? "Updating..." : "Saving...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // UPDATE
      if (isEditMode && editingId) {
        await axios.put(`${BASE_URL}/family/${editingId}`, payload, {
          headers,
        });
        await fetchData();

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          text: "Family member details updated",
          confirmButtonColor: "#16a34a",
        });

        closeModal();
        return;
      }

      // ADD
      await axios.post(`${BASE_URL}/family`, payload, { headers });
      await fetchData();

      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        text: "New family member added",
        confirmButtonColor: "#16a34a",
      });

      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="p-8  min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg border border-green-400 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 p-4">
          <div>
            <div className="flex flex-row  gap-4 items-baseline">
              <div>
                <Users />
              </div>
              <div>
                <h1 className="text-xl  font-stretch-105% text-green-700   mb-2">
                  Family Members
                </h1>
              </div>
            </div>

            <h1 className="text-md  text-green-500">
              Manage family members and book appointments for them
            </h1>
          </div>
          <div className="">
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-lg bg-green-500 text-white hover:bg-green-700 p-1 hover:cursor-pointer"
            >
              <div className="flex flex-row items-center gap-2">
                {/* Icon micro-animation */}
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <UserRoundPlus className="size-5" />
                </motion.div>

                <h1 className="text-md">Add New Patient</h1>
              </div>
            </motion.button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-green-300 overflow-x-auto">
          <table className="min-w-[500px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-black ">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-black ">
                  Relationship
                </th>
                <th className="hidden md:table-cell px-3 py-2 text-left text-xs font-semibold">
                  Gender
                </th>
                <th className="hidden md:table-cell px-3 py-2 text-left text-xs font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-black ">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-black ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {FamilyDetail.map((user, idx) => (
                <tr
                  key={user.id ?? idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{user.name}</div>
                  </td>

                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={`rounded-full px-2 py-1  text-xs inline-flex  ${
                        user.relationship == "Account Owner"
                          ? "bg-green-400 text-green-700"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      {user.relationship}
                    </span>
                  </td>

                  <td className="hidden md:table-cell px-3 py-2 text-xs">
                    {user.gender}
                  </td>
                  <td className="hidden md:table-cell px-3 py-2 text-xs">
                    {user.email}
                  </td>
                  <td className="px-3 py-2 text-sm whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{user.phone}</div>
                  </td>

                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <div className="flex flex-col sm:flex-row gap-1">
                      <button
                        className="cursor-pointer flex flex-row  text-sm justify-evenly border-2 rounded-2xl text-green-700 hover:text-black border-green-300 bg-white p-1 hover:bg-green-100"
                        onClick={() => handleIdcard(user)}
                      >
                        <IdCard className="size-4" />
                        ID
                      </button>

                      {user.relationship !== "Account Owner" && (
                        <>
                          <div className="px-1">
                            <button
                              className="cursor-pointer border-2 rounded-lg text-sm border-green-400 flex flex-row justify-evenly text-green-700 p-1 hover:bg-green-300 hover:text-black"
                              onClick={() => handleEdit(user)}
                            >
                              <SquarePen className="size-4 pt-1" />
                              <span className="pl-1">Edit</span>
                            </button>
                          </div>

                          <div className="pt-1">
                            <button
                              className="cursor-pointer border-2 rounded-md p-1 border-red-300 text-red-500 hover:bg-red-200"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash2 className="size-3" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {Isopen && (
          <PopupForm
            closeModal={closeModal}
            handleChange={handleChange}
            handleSubmit={handleSubmit} // ✅ axios POST/PUT
            formData={formData}
            isEditMode={isEditMode}
            editId={editingId}
          />
        )}
      </div>

      <div>
        {IsIdOpen && SelectedMember && (
          <PatientIdCard
            FormData={SelectedMember}
            closeIdModel={closeIdModel}
          />
        )}
      </div>
    </div>
  );
};
