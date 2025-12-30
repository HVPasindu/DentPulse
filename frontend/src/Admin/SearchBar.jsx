import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = "Search items, SKU, or category..." }) {
  return (
    <div className="relative w-full sm:w-auto sm:min-w-[320px]">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}