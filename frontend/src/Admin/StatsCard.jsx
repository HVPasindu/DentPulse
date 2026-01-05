import { Package, AlertTriangle } from 'lucide-react'

export default function StatsCard({ title, value, icon: Icon, color, subtitle }) {
  const iconBgClasses = {
    blue: 'bg-cyan-50 text-cyan-500',
    red: 'bg-red-50 text-red-500',
    green: 'bg-emerald-50 text-emerald-500',
    gray: 'bg-slate-50 text-slate-400'
  }

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="flex flex-col items-start">
        <div className={`p-2 rounded-lg mb-3 ${iconBgClasses[color] || iconBgClasses.blue}`}>
          <Icon className="h-5 w-5" />
        </div>
        
        <h3 className="text-base font-semibold text-slate-800">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold text-slate-900">
          {value}
        </div>
      </div>
    </div>
  )
}