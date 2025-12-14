import React from "react";
import { paitentdata } from "../data/paitentdata";
import { IdCard, UserRoundPlus } from "lucide-react";
import { PopupForm } from "./PopupForm";
import { useState } from "react";

export const FamilyMembers = () => {
  // table data in the data/patientdata

  const [Isopen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("form submitted!", formData);
    setIsOpen(false);
    setFormData({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-8 bg-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row justify-between p-4">
          <div>
            <h1 className="text-lg text-cyan-700   mb-6">Family Members</h1>
            <h1 className="text-md text-cyan-500">
              Manage family members and book appointments for them
            </h1>
          </div>
          <div className="">
            <button
              className=" rounded-lg bg-cyan-500 text-white hover:bg-cyan-700 p-2 "
              onClick={openModal}
            >
              <div className="flex flex-row">
                <UserRoundPlus className="size-5" />
                <h1 className="text-sm">Add New Paitent</h1>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg  overflow-hidden border-2 border-cyan-400">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Relationship
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paitentdata.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{user.name}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`rounded-full px-2 py-1  text-xs inline-flex  ${
                        user.relationship == "Account Owner"
                          ? "bg-cyan-400 text-cyan-700"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      {" "}
                      {user.relationship}{" "}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="">
                      <button className="flex flex-row justify-evenly border-2 rounded-2xl text-cyan-700 hover:text-black border-cyan-300 bg-white p-1 hover:bg-cyan-100">
                        <div className="pt-0.5 pr-2">
                          <IdCard className="size-6" />
                        </div>
                        <div className="pt-0.5">Id card</div>
                      </button>
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
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};
