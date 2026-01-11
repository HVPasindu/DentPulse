// import React from "react";

// // id: "apt_001",
// // patientId: "owner_001",
// // patientName: "John Doe",
// // date: "2024-12-28",
// // time: "10:00 AM",
// // status: "Confirmed",
// // type: "Checkup",
// // notes: "Regular dental checkup",

// export const RecentAppoinment = ({ AppointmentList,OpenReviewCard}) => {
//   return (
//     <div className="bg-white rounded-lg  overflow-hidden border-2 border-green-400 ">
//       <div>
//         <h1 className="p-1.5 text-green-700">
//           Upcoming Appoinments/Past Appoinments
//         </h1>
//         <h1 className="p-1.5 text-green-400">
//           View your scheduled appointments
//         </h1>
//       </div>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//               Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//               Date
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//               Time
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//               Type
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
//               Action
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {AppointmentList.map((user) => (
//             <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm  text-gray-900">{user.patientName}</div>
//               </td>

//               <td className="px-6 py-4 whitespace-nowrap">
//                 {user.status == "Confirmed" ? (
//                   <span className="bg-blue-200 rounded-2xl p-1.5 text-sm">
//                     {" "}
//                     {user.status}{" "}
//                   </span>
//                 ) : user.status == "Completed" ? (
//                   <span className="bg-green-200 rounded-2xl p-1.5 text-sm">
//                     {" "}
//                     {user.status}{" "}
//                   </span>
//                 ) : user.status == "Pending" ? (
//                   <span className="bg-yellow-200 rounded-2xl p-1.5 text-sm">
//                     {" "}
//                     {user.status}{" "}
//                   </span>
//                 ) : null}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.date}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <div className="text-sm  text-gray-900">{user.time}</div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">{user.type}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {user.status == "Confirmed" ? (
//                   <button className="p-3 rounded-2xl border-2 border-green-300 text-green-800 hover:text-black hover:border-black hover:bg-green-100">
//                     Contact Us{" "}
//                   </button>
//                 ) : user.status == "Pending" ? (
//                   <button className="flex flex-row justify-evenly border-2 rounded-2xl text-red-500 hover:bg-red-200 border-red-400 bg-white p-2 ">
//                     Cancel
//                   </button>
//                 ) : user.status == "Completed" ? (
//                   <button className="flex flex-row justify-evenly border-2 rounded-2xl text-green-500 hover:bg-green-100 border-green-400 bg-white p-2 " onClick={OpenReviewCard}>
//                     Review Us!
//                   </button>
//                 ) : null}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
import React from "react";
import { CalendarClock } from "lucide-react";

export const RecentAppoinment = ({
  AppointmentList,
  OpenReviewCard,
  refreshAppointments,
}) => {
  // Handle cancel appointment - DELETE request to backend
  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Please login to cancel appointments");
        return;
      }

      console.log("🗑️ Canceling appointment:", appointmentId);

      // DELETE request to cancel appointment
      const response = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("✅ Appointment canceled successfully");
        alert("Appointment canceled successfully!");

        // Refresh appointments list after cancellation
        if (refreshAppointments) {
          refreshAppointments();
        }
      } else {
        const errorData = await response.text();
        console.error("❌ Failed to cancel appointment:", errorData);
        alert(`Failed to cancel appointment: ${errorData}`);
      }
    } catch (error) {
      console.error("❌ Error canceling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-green-400 p-7">
      <div>
        <div className="flex flex-row items-baseline gap-x-2">
          <div>
            <CalendarClock />
          </div>
          <div>
            <h1 className="p-1.5 text-green-700 text-4xl font-serif font-stretch-125%">
              Upcoming Appoinments/Past Appoinments
            </h1>
          </div>
        </div>

        <h1 className="p-1.5 text-green-400 text-xl">
          View your scheduled appointments
        </h1>
      </div>

      {AppointmentList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No appointments found</p>
          <p className="text-gray-400 text-sm mt-2">
            Book your first appointment to get started
          </p>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-bold text-black uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-black uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-black uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-black uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-black uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-lg font-bold text-black uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {AppointmentList.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {user.patientName}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {user.status === "CONFIRMED" ||
                  user.status === "Confirmed" ? (
                    <span className="bg-blue-200 rounded-2xl p-1.5 text-sm">
                      Confirmed
                    </span>
                  ) : user.status === "COMPLETED" ||
                    user.status === "Completed" ? (
                    <span className="bg-green-200 rounded-2xl p-1.5 text-sm">
                      Completed
                    </span>
                  ) : user.status === "PENDING" || user.status === "Pending" ? (
                    <span className="bg-yellow-200 rounded-2xl p-1.5 text-sm">
                      Pending
                    </span>
                  ) : user.status === "SCHEDULED" ? (
                    <span className="bg-purple-200 rounded-2xl p-1.5 text-sm">
                      Scheduled
                    </span>
                  ) : (
                    <span className="bg-gray-200 rounded-2xl p-1.5 text-sm">
                      {user.status}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{user.date}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.time}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{user.type}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {user.status === "CONFIRMED" ||
                  user.status === "Confirmed" ||
                  user.status === "SCHEDULED" ? (
                    <button className="p-3 rounded-2xl border-2 border-green-300 text-green-800 hover:text-black hover:border-black hover:bg-green-100">
                      Contact Us
                    </button>
                  ) : user.status === "PENDING" || user.status === "Pending" ? (
                    <button
                      onClick={() => handleCancelAppointment(user.id)}
                      className="flex flex-row justify-evenly border-2 rounded-2xl text-red-500 hover:bg-red-200 border-red-400 bg-white p-2"
                    >
                      Cancel
                    </button>
                  ) : user.status === "COMPLETED" ||
                    user.status === "Completed" ? (
                    <button
                      onClick={OpenReviewCard}
                      className="flex flex-row justify-evenly border-2 rounded-2xl text-green-500 hover:bg-green-100 border-green-400 bg-white p-2"
                    >
                      Review Us!
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
