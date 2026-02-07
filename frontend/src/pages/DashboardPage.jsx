import { useState, useEffect } from "react";

import DashboardQuickActions from "../Admin/DashboardQuickActions";
import DashboardRecentAppointments from "../Admin/DashboardRecentAppointments";

/*
====================================================
OLD VERSION (COMMENTED – DO NOT DELETE)
----------------------------------------------------
Previously this dashboard:
- Did NOT fetch backend data
- Rendered DashboardQuickActions and
  DashboardRecentAppointments without props
- Stats and appointments were calculated elsewhere

<DashboardQuickActions />
<DashboardRecentAppointments />
====================================================
*/

/*
====================================================
NEW VERSION (BACKEND-CONNECTED)
----------------------------------------------------
This dashboard now:
- Calls admin dashboard summary API ONCE
- Stores result in `summary` state
- Passes data down to child components
====================================================
*/

//import admin dashboard API
import { getAdminDashboardSummary } from "../api/adminDashboardApi";

export default function DashboardPage() {
  //const [sidebarOpen, setSidebarOpen] = useState(false);

  //state to hold backend dashboard summary
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH DASHBOARD SUMMARY ================= */
  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        //JWT token from localStorage (admin login)
        const token = localStorage.getItem("authToken");

        //Backend call
        const data = await getAdminDashboardSummary(token);

        setSummary(data);
      } catch (err) {
        console.error("Failed to load dashboard summary", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  return (
    <div className="min-h-screen flex bg-green-50">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-auto">
          <div>
            <h1 className="text-2xl font-bold text-green-600">Dashboard</h1>
            <p className="text-green-500 mt-1 font-medium">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* ================= LOADING STATE ================= */}
          {loading && (
            <div className="text-center py-10 text-gray-500">
              Loading dashboard data...
            </div>
          )}

          {/* ================= ERROR STATE ================= */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* ================= DASHBOARD CONTENT ================= */}
          {!loading && !error && summary && (
            <>
              {/*pass backend summary */}
              <DashboardQuickActions summary={summary} />

              {/*pass today's appointments from backend */}
              <DashboardRecentAppointments
                appointments={summary.todayAppointments}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}