import { Package, AlertTriangle } from 'lucide-react'

export default function StatsCard({ title, value, icon: Icon, color, subtitle }) {
  const colorClasses = {
    blue: 'border-blue-400 bg-blue-200',
    red: 'border-red-400 bg-red-100',
    green: 'border-green-400 bg-green-200',
    gray: 'border-slate-400 bg-white'
  }

  const iconColorClasses = {
    blue: 'text-blue-500',
    red: 'text-red-500',
    green: 'text-green-500',
    gray: 'text-slate-400'
  }

  return (
    <div
      className={`rounded-xl border ${
        colorClasses[color] || colorClasses.blue
      } p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.75 backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wide uppercase text-slate-600">
          {title}
        </h3>
        <Icon
          className={`h-5 w-5 ${
            iconColorClasses[color] || iconColorClasses.gray
          }`}
        />
      </div>

      <div className="mt-3">
        <div
          className={`text-3xl font-bold leading-tight ${
            color === 'red' ? 'text-red-600' : 'text-slate-900'
          }`}
        >
          {value}
        </div>
        <p className="mt-1 text-xs text-black">{subtitle}</p>
      </div>
    </div>
  )
}
