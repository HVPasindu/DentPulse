import { useNavigate } from 'react-router-dom'
import { CalendarPlus, UserPlus, PackagePlus, FileText } from 'lucide-react'

const actions = [
  {
    name: "New Appointment",
    description: "Schedule a patient visit",
    icon: CalendarPlus,
    color: "teal",
    path: "/appointments/add",
  },
  {
    name: "Add Patient",
    description: "Register new patient",
    icon: UserPlus,
    color: "blue",
    path: "/patients/add",
  },
  {
    name: "Add Inventory",
    description: "Update stock items",
    icon: PackagePlus,
    color: "orange",
    path: "/inventory/add",
  },
  {
    name: "Add a Bill",
    description: "View bill details",
    icon: FileText,
    color: "purple",
    path: "/billing/add",
  },
]

const colorClasses = {
  teal: 'bg-teal-100 text-teal-600 hover:bg-teal-200',
  blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
  orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
  purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
}

export default function DashboardQuickActions() {
  const navigate = useNavigate()

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <button
              key={action.name}
              onClick={() => navigate(action.path)}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all text-left h-full"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${colorClasses[action.color]}`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="font-semibold text-gray-900">{action.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {action.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
