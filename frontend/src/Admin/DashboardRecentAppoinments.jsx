const appointments = [
  {
    id: 1,
    patient: "Sarah Johnson",
    dentist: "Dr. Michael Chen",
    time: "09:00 AM",
    treatment: "Routine Checkup",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "James Wilson",
    dentist: "Dr. Emily Roberts",
    time: "10:30 AM",
    treatment: "Root Canal",
    status: "pending",
  },
  {
    id: 3,
    patient: "Maria Garcia",
    dentist: "Dr. Michael Chen",
    time: "02:00 PM",
    treatment: "Teeth Cleaning",
    status: "confirmed",
  },
  {
    id: 4,
    patient: "Robert Brown",
    dentist: "Dr. Sarah Lee",
    time: "03:30 PM",
    treatment: "Cavity Filling",
    status: "confirmed",
  },
]

export default function DashboardRecentAppointments() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
        <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{appointment.patient}</p>
              <p className="text-sm text-gray-600">{appointment.dentist}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                <p className="text-xs text-gray-600">{appointment.treatment}</p>
              </div>
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${appointment.status === "confirmed" 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
                }
              `}>
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}