import { Package, AlertTriangle } from 'lucide-react'

export default function StatsCard({ title, value, icon: Icon, color, subtitle }) {
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50',
    red: 'border-red-200 bg-red-50',
    green: 'border-green-200 bg-green-50',
    gray: 'border-slate-200 bg-white'
  }

  const iconColorClasses = {
    blue: 'text-blue-500',
    red: 'text-red-500',
    green: 'text-green-500',
    gray: 'text-slate-400'
  }

  return (
    <div className={`rounded-xl border ${colorClasses[color] || colorClasses.gray} p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        <Icon className={`h-5 w-5 ${iconColorClasses[color] || iconColorClasses.gray}`} />
      </div>
      <div className="mt-3">
        <div className={`text-3xl font-bold ${color === 'red' ? 'text-red-600' : 'text-slate-900'}`}>
          {value}
        </div>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
  )
}