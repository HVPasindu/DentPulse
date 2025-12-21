import { Calendar, Users, DollarSign, Package } from 'lucide-react'

const stats = [
  {
    name: "Today's Appointments",
    value: "18",
    change: "+12%",
    icon: Calendar,
    color: "teal",
  },
  {
    name: "Total Patients",
    value: "1,429",
    change: "+8%",
    icon: Users,
    color: "blue",
  },
  {
    name: "Pending Bills",
    value: "20560/=",
    change: "+23%",
    icon: DollarSign,
    color: "green",
  },
  {
    name: "Low Stock Items",
    value: "6",
    change: "-2",
    icon: Package,
    color: "orange",
  },
]

const colorClasses = {
  teal: 'bg-teal-100 text-teal-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  orange: 'bg-orange-100 text-orange-600',
}

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}