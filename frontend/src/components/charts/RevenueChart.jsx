import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/stats/monthly-revenue`)
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 border border-slate-100 box-border">
      <h3 className="m-0 mb-6 text-slate-800 text-lg font-semibold font-sans">
        Monthly Revenue
      </h3>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#047857" stopOpacity={0.9} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 13 }}
              dy={10}
            />

            <YAxis
              width={60}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 13 }}
              tickFormatter={(value) => `LKR ${value}`}
            />

            <Tooltip
              cursor={{ fill: "#F8FAFC" }}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                color: "#1E293B",
                padding: "10px 15px",
              }}
              itemStyle={{ color: "#10B981", fontWeight: "600" }}
              formatter={(value) => [
                `LKR ${value.toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="url(#revenueGradient)"
              radius={[6, 6, 0, 0]}
              barSize={26}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
