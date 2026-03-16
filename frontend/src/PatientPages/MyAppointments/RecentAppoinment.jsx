import React from "react";
import { CalendarClock } from "lucide-react";
import Swal from "sweetalert2";

export const RecentAppoinment = ({
  AppointmentList,
  OpenReviewCard,
  refreshAppointments,
  page,
  totalPages,
  setPage,
}) => {
  // Handle cancel appointment - DELETE request to backend
  const handleCancelAppointment = async (appointmentId) => {
    const confirmCancel = await Swal.fire({
      title: "Cancel Appointment?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#9ca3af",
    });

    if (!confirmCancel.isConfirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to cancel appointments",
          confirmButtonColor: "#16a34a",
        });
        return;
      }
      Swal.fire({
        title: "Canceling Appointment...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      console.log("🗑️ Canceling appointment:", appointmentId);

      // DELETE request to cancel appointment
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        console.log("✅ Appointment canceled successfully");
        Swal.fire({
          icon: "success",
          title: "Appointment Canceled",
          text: "Your appointment has been canceled successfully",
          confirmButtonColor: "#16a34a",
        });

        // Refresh appointments list after cancellation
        if (refreshAppointments) {
          refreshAppointments();
        }
      } else {
        const errorData = await response.text();

        Swal.fire({
          icon: "error",
          title: "Cancellation Failed",
          text: errorData || "Unable to cancel appointment",
          confirmButtonColor: "#dc2626",
        });
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
            <h1 className="p-1.5 text-green-700 text-2xl  font-stretch-125%">
              Upcoming Appoinments/Past Appoinments
            </h1>
          </div>
        </div>

        <h1 className="p-1.5 text-green-400 text-lg">
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
                    <button className="cursor-pointer p-3 rounded-2xl border-2 border-green-300 text-green-800 hover:text-black hover:border-black hover:bg-green-100">
                      Contact Us
                    </button>
                  ) : user.status === "PENDING" || user.status === "Pending" ? (
                    <button
                      onClick={() => handleCancelAppointment(user.id)}
                      className="cursor-pointer flex flex-row justify-evenly border-2 rounded-2xl text-red-500 hover:bg-red-200 border-red-400 bg-white p-2"
                    >
                      Cancel
                    </button>
                  ) : user.status === "COMPLETED" ||
                    user.status === "Completed" ? (
                    <button
                      onClick={() => OpenReviewCard(user)}
                      className="cursor-pointer flex flex-row justify-evenly border-2 rounded-2xl text-green-500 hover:bg-green-100 border-green-400 bg-white p-2"
                    >
                      {user.reviewId ? "Edit Review" : "Review Us"}
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-center gap-3 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className={`px-4 py-2 rounded text-white 
  ${page === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          Previous
        </button>

        <span className="px-3 py-2 font-semibold">
          Page {page + 1} / {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page + 1 === totalPages}
          className={`px-4 py-2 rounded text-white 
  ${page + 1 === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
