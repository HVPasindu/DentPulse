import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getWeeklyRevenue } from "../api/revenueApi";

export default function WeeklyIncomeDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/revenue/weekly")
      .then(res => {
        const formatted = res.data.map(item => ({
          week: item.weekStartDate,
          revenue: item.revenue
        }));
        setData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  // last 4 weeks for summary boxes
  const recentWeeks = [...data].slice(-4).reverse();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-green-600">
        Weekly Dental Income
      </h1>

      {/* Weekly Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {recentWeeks.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-2xl shadow-lg"
          >
            <p className="text-sm opacity-90">Week starting</p>
            <p className="font-semibold">{item.week}</p>

            <p className="mt-3 text-xl font-bold">
              Rs. {item.revenue.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Weekly Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          Weekly Revenue (Mon – Sun)
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`Rs. ${value.toLocaleString()}`, "Revenue"]}
              labelFormatter={(label) => `Week starting: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={3}
              stroke="#22c55e"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
