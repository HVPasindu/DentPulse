import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentTimeChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/stats/appointment-times`)
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 border border-slate-100 box-border">
      
      <h3 className="m-0 mb-6 text-slate-800 text-lg font-semibold font-sans">
        Appointments by Time
      </h3>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            
            <XAxis 
              dataKey="time" 
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
              cursor={{ stroke: '#CBD5E1', strokeWidth: 1, strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: '#1E293B',
                padding: '10px 15px'
              }}
              itemStyle={{ color: '#3B82F6', fontWeight: '600' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="count" 
              name="Appointments"
              stroke="#3B82F6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#FFFFFF', stroke: '#3B82F6', strokeWidth: 2 }} 
              activeDot={{ r: 6, fill: '#3B82F6', stroke: '#FFFFFF', strokeWidth: 2 }} 
              
              /* --- Animation Props Added Here --- */
              isAnimationActive={true}
              animationBegin={200}      
              animationDuration={1500}   
              animationEasing="ease-out" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default AppointmentTimeChart;