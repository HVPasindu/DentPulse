import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const COLORS = ['#0F9D58', '#3B82F6', '#14B8A6', '#F59E0B', '#8B5CF6', '#F43F5E'];

function TreatmentChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/stats/treatment-stats`)
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] p-6 border border-slate-100 box-border">
      
      <h3 className="m-0 mb-6 text-slate-800 text-lg font-semibold font-sans">
        Treatment Distribution
      </h3>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="count" 
              nameKey="treatment" 
              cx="40%" 
              cy="50%" 
              innerRadius={85} 
              outerRadius={120} 
              paddingAngle={5} 
              stroke="none" 
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: '#1E293B',
                padding: '10px 15px',
                fontWeight: '500'
              }}
              itemStyle={{ color: '#64748B' }}
            />

            
            <Legend 
              layout="vertical"   
              verticalAlign="middle" 
              align="right"          
              iconType="circle" 
              wrapperStyle={{ 
                fontSize: '13px', 
                color: '#64748B',
                fontFamily: "'Inter', sans-serif",
                paddingLeft: '20px'  
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default TreatmentChart;