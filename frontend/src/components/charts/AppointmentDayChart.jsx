import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentDayChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/stats/appointments-by-day`)
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 border border-slate-100 box-border">
      
      {/* Title color eka green-600 kala */}
      <h3 className="m-0 mb-6 text-slate-800 text-lg font-semibold font-sans">
        Appointments by Day
      </h3>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            
            {/* Lassanata Gradient eka hadana thana */}
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={1}/> {/* Lighter green/teal top */}
                <stop offset="95%" stopColor="#059669" stopOpacity={1}/> {/* Darker green bottom */}
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 13 }} 
              dy={10} 
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 13 }} 
            />
            
            <Tooltip 
              cursor={{ fill: '#F8FAFC' }} 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: '#1E293B',
                padding: '10px 15px'
              }}
              itemStyle={{ color: '#059669', fontWeight: '600' }} 
            />
            
            {/* fill ekata kalin hadapu gradient ID eka damma */}
            <Bar 
              dataKey="count" 
              name="Appointments"
              fill="url(#colorCount)" 
              radius={[6, 6, 0, 0]} 
              barSize={40} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default AppointmentDayChart;