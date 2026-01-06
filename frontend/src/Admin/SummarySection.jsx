import React, { useEffect, useState } from "react";
import SummaryCard from "../Admin/SummaryCard";

const SummarySection = () => {
  const [summary, setSummary] = useState({
    total: 0,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("authToken"); // ✅ SAME KEY EVERYWHERE

      const res = await fetch(
        "http://localhost:8080/api/admin/appointments/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error("Summary fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading summary...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard icon="📅" title="Total Appointments" value={summary.total} color="blue" />
      <SummaryCard icon="🕙" title="Scheduled or Pending" value={summary.scheduled} color="green" />
      <SummaryCard icon="✅" title="Completed" value={summary.completed} color="yellow" />
      <SummaryCard icon="❌" title="Cancelled or No_Show" value={summary.cancelled} color="red" />
    </div>
  );
};

export default SummarySection;
