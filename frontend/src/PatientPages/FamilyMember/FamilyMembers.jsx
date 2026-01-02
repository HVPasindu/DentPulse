// import React, { useEffect } from "react";
// import { paitentdata } from "../data/paitentdata";
// import { IdCard, UserRoundPlus, Trash2, SquarePen } from "lucide-react";
// import { PopupForm } from "./PopupForm";
// import { useState } from "react";
// import { PatientIdCard } from "./PatientIdCard";

// export const FamilyMembers = () => {
//   // table data in the data/patientdata

//   const [Isopen, setIsOpen] = useState(false);
//   const [FamilyDetail, setFamilyDetail] = useState(paitentdata);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [IsIdOpen, setIsIdOpen] = useState(false);
//   const [SelectedMember, setSelectedMember] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     relationship: "",
//     phone: "",
//     email: "",
//     address: "",
//     date: "",
//     gender: "",
//   });

  
  

//   const handleIdcard = (member) => {
//     setSelectedMember(member);
//     setIsIdOpen(true);
//   };

//   const closeIdModel = () => {
//     setIsIdOpen(false);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isEditMode) {
//       setFamilyDetail(
//         FamilyDetail.map((member) =>
//           member.id === editingId
//             ? {
//                 ...member,
//                 name: formData.name,
//                 email: formData.email,
//                 phone: formData.phone,
//                 relationship: formData.relationship,
//                 address: formData.address,
//                 date: formData.date,
//                 gender: formData.gender,
//               }
//             : member
//         )
//       );
//     } else {
//       const new_member = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         relationship: formData.relationship,
//         gender: formData.gender,
//       };
//       setFamilyDetail([...FamilyDetail, new_member]);

//       setIsOpen(false);
//       setIsEditMode(false);
//       setEditingId(null);
//       setFormData({
//         name: "",
//         relationship: "",
//         phone: "",
//         email: "",
//         address: "",
//         date: "",
//         gender: "",
//       });
//     }
//   };

//   const handleEdit = (member) => {
//     setFormData({
//       name: member.name,
//       relationship: member.relationship,
//       phone: member.phone,
//       email: member.email,
//       address: member.address,
//       date: member.date,
//       gender: member.gender,
//     });

//     setEditingId(member.id);
//     setIsEditMode(true);
//     setIsOpen(true);
//   };

//   const openModal = () => {
//     setFormData({
//       name: "",
//       relationship: "",
//       phone: "",
//       email: "",
//       address: "",
//       date: "",
//     });
//     setIsEditMode(false);
//     setEditingId(null);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setIsEditMode(false);
//     setEditingId(null);
//     setFormData({
//       name: "",
//       relationship: "",
//       phone: "",
//       email: "",
//       address: "",
//       date: "",
//       gender: "",
//     });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are u Sure Want to Delete this Record?")) {
//       setFamilyDetail(FamilyDetail.filter((member) => member.id !== id));
//     }
//   };

//   return (
//     <div className="p-8 bg-cyan-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-row justify-between p-4">
//           <div>
//             <h1 className="text-lg text-cyan-700   mb-6">Family Members</h1>
//             <h1 className="text-md text-cyan-500">
//               Manage family members and book appointments for them
//             </h1>
//           </div>
//           <div className="">
//             <button
//               className=" rounded-lg bg-cyan-500 text-white hover:bg-cyan-700 p-2 "
//               onClick={openModal}
//             >
//               <div className="flex flex-row">
//                 <UserRoundPlus className="size-5" />
//                 <h1 className="text-sm">Add New Paitent</h1>
//               </div>
//             </button>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg  overflow-hidden border-2 border-cyan-400">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//                   Relationship
//                 </th>
//                   <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//                   Gender
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//                   Phone Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {FamilyDetail.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm  text-gray-900">{user.name}</div>
//                   </td>

//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`rounded-full px-2 py-1  text-xs inline-flex  ${
//                         user.relationship == "Account Owner"
//                           ? "bg-cyan-400 text-cyan-700"
//                           : "bg-green-200 text-green-700"
//                       }`}
//                     >
//                       {" "}
//                       {user.relationship}{" "}
//                     </span>
//                   </td>
//                    <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm  text-gray-900">{user.phone}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex flex-row justify-around px-1">
//                       <div></div>
//                       <button
//                         className="flex flex-row  text-sm justify-evenly border-2 rounded-2xl text-cyan-700 hover:text-black border-cyan-300 bg-white p-1 hover:bg-cyan-100"
//                         onClick={() => {
//                           handleIdcard(user);
//                         }}
//                       >
//                         <div className=" pr-2">
//                           <IdCard className="size-6" />
//                         </div>
//                         <div className="pt-1">
//                           <h1>Id card</h1>
//                         </div>
//                       </button>
//                       {user.relationship !== "Account Owner" && (
//                         <>
//                           <div className="px-1">
//                             <button
//                               className="border-2 rounded-lg text-sm border-cyan-400 flex flex-row justify-evenly text-cyan-700 p-1 hover:bg-cyan-300 hover:text-black"
//                               onClick={() => handleEdit(user)}
//                             >
//                               <SquarePen className="size-3" />
//                               <span className="pl-1">Edit</span>
//                             </button>
//                           </div>

//                           <div className="pt-1">
//                             <button
//                               className="border-2 rounded-md p-1 border-red-300 text-red-500 hover:bg-red-200"
//                               onClick={() => handleDelete(user.id)}
//                             >
//                               <Trash2 className="size-3" />
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div>
//         {Isopen && (
//           <PopupForm
//             closeModal={closeModal}
//             handleChange={handleChange}
//             handleSubmit={handleSubmit}
//             formData={formData}
//             isEditMode={isEditMode}
//             editId={editingId}
//           />
//         )}
//       </div>
//       <div>
//         {IsIdOpen && SelectedMember && (
//           <PatientIdCard
//             FormData={SelectedMember}
//             closeIdModel={closeIdModel}
//           />
//         )}
//       </div>
//     </div>
//   );
// };



import React, { useEffect } from "react";
// import { paitentdata } from "../data/paitentdata"; // (optional fallback) now using API
import { IdCard, UserRoundPlus, Trash2, SquarePen } from "lucide-react";
import { PopupForm } from "./PopupForm";
import { useState } from "react";
import { PatientIdCard } from "./PatientIdCard";
import axios from "axios";

export const FamilyMembers = () => {
  const [Isopen, setIsOpen] = useState(false);
  const [FamilyDetail, setFamilyDetail] = useState([]); // API data will fill this
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

  // ✅ Fetch both endpoints at once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [meRes, famRes] = await Promise.all([
          axios.get("http://localhost:8080/api/v1/patient/mefortable", { headers }),
          axios.get("http://localhost:8080/api/v1/patient/family", { headers }),
        ]);

        // Map API -> UI format (id, name, etc.)
        const mapMember = (m) => ({
          id: m.patientId,                 // backend: patientId
          name: m.fullName,                // backend: fullName
          email: m.email,
          phone: m.phone,
          relationship: m.relationship,
          gender: m.gender,
          address: m.address || "",
          date: m.birthDate || m.date || "",
          accountOwner: m.accountOwner || false,
        });

        const owner = meRes?.data ? mapMember(meRes.data) : null;
        const familyArray = Array.isArray(famRes?.data) ? famRes.data : [];
        const family = familyArray.map(mapMember);

        // Put Account Owner first + family after
        const merged = owner ? [owner, ...family] : family;

        setFamilyDetail(merged);
      } catch (error) {
        console.log("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleIdcard = (member) => {
    setSelectedMember(member);
    setIsIdOpen(true);
  };

  const closeIdModel = () => {
    setIsIdOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      setFamilyDetail(
        FamilyDetail.map((member) =>
          member.id === editingId
            ? {
                ...member,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                relationship: formData.relationship,
                address: formData.address,
                date: formData.date,
                gender: formData.gender,
              }
            : member
        )
      );
    } else {
      const new_member = {
        id: Date.now(), // ✅ add temp id for table key + delete/edit
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        relationship: formData.relationship,
        gender: formData.gender,
        address: formData.address,
        date: formData.date,
      };
      setFamilyDetail([...FamilyDetail, new_member]);

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
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      relationship: member.relationship,
      phone: member.phone,
      email: member.email,
      address: member.address,
      date: member.date,
      gender: member.gender,
    });

    setEditingId(member.id);
    setIsEditMode(true);
    setIsOpen(true);
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

  const handleDelete = (id) => {
    if (window.confirm("Are u Sure Want to Delete this Record?")) {
      setFamilyDetail(FamilyDetail.filter((member) => member.id !== id));
    }
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
                  Gender
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
              {FamilyDetail.map((user) => (
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

                  <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{user.phone}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-row justify-around px-1">
                      <div></div>
                      <button
                        className="flex flex-row  text-sm justify-evenly border-2 rounded-2xl text-cyan-700 hover:text-black border-cyan-300 bg-white p-1 hover:bg-cyan-100"
                        onClick={() => {
                          handleIdcard(user);
                        }}
                      >
                        <div className=" pr-2">
                          <IdCard className="size-6" />
                        </div>
                        <div className="pt-1">
                          <h1>Id card</h1>
                        </div>
                      </button>

                      {user.relationship !== "Account Owner" && (
                        <>
                          <div className="px-1">
                            <button
                              className="border-2 rounded-lg text-sm border-cyan-400 flex flex-row justify-evenly text-cyan-700 p-1 hover:bg-cyan-300 hover:text-black"
                              onClick={() => handleEdit(user)}
                            >
                              <SquarePen className="size-3" />
                              <span className="pl-1">Edit</span>
                            </button>
                          </div>

                          <div className="pt-1">
                            <button
                              className="border-2 rounded-md p-1 border-red-300 text-red-500 hover:bg-red-200"
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
            handleSubmit={handleSubmit}
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
