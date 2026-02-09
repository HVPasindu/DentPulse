import { Users, Calendar, Package, TrendingUp } from "lucide-react";

/*
====================================================
OLD VERSION (COMMENTED – DO NOT DELETE)
----------------------------------------------------
This version calculated stats from multiple arrays
(patients, appointments, inventoryItems, billings).
We keep it commented for reference and comparison.
====================================================

const DashboardQuickActions = ({ patients = [], appointments = [], inventoryItems = [], billings = [] }) => {
  const totalPatients = patients.length || 0;

  const todayAppointments = appointments.filter(appt => {
    const today = new Date().toISOString().split('T')[0];
    return appt.date && appt.date.split('T')[0] === today;
  }).length || 0;

  const totalInventoryItems = [...new Set(inventoryItems.map(item => item.name))].length || 0;

  const dailyRevenue = billings
    .filter(bill => {
      const today = new Date().toISOString().split('T')[0];
      return bill.date && bill.date.split('T')[0] === today;
    })
    .reduce((sum, bill) => sum + (bill.amount || 0), 0) || 0;
};
*/

/*
====================================================
NEW VERSION (BACKEND-DRIVEN)
----------------------------------------------------
Now this component receives ONE `summary` object
directly from backend endpoint:

GET /api/v1/admin/dashboard/summary

This removes duplicate calculations and keeps
frontend simple and reliable.
====================================================
*/

const DashboardQuickActions = ({ summary }) => {
  if (!summary) return null;

  const stats = [
    {
      name: "Total Patients",
      value: summary.totalPatients,
      description: "Active patients",
      icon: Users,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      name: "Today's Appointments",
      value: summary.todayAppointmentCount,
      description: "Scheduled today",
      icon: Calendar,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      name: "Inventory Items",
      value: summary.inventoryItems,
      description: "Total item types",
      icon: Package,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      name: "Daily Revenue",
      value: `LKR ${summary.todayRevenue.toFixed(2)}`,
      description: "Today's earnings",
      icon: TrendingUp,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}
                >
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
              <p className="text-xs text-gray-500 mt-2">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardQuickActions;