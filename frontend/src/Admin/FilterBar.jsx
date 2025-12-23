import { Search } from 'lucide-react';

export default function FilterBar({ setFilters }) {
  return (
    <div className="bg-white p-3 rounded-xl border mb-6 flex flex-col md:flex-row gap-3 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          onChange={(e) => setFilters(f => ({...f, query: e.target.value}))} 
          type="text" 
          placeholder="Search by recipient, ID, or subject..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg outline-none text-sm border border-transparent focus:border-teal-200" 
        />
      </div>
      <div className="flex gap-2">
        <select onChange={(e) => setFilters(f => ({...f, type: e.target.value}))} className="border border-gray-200 p-2 rounded-lg text-xs bg-white font-semibold text-gray-600 outline-none cursor-pointer">
          <option value="All">All Types</option>
          <option value="Sent">Sent</option>
          <option value="Failed">Failed</option>
        </select>
        <select onChange={(e) => setFilters(f => ({...f, channel: e.target.value}))} className="border border-gray-200 p-2 rounded-lg text-xs bg-white font-semibold text-gray-600 outline-none cursor-pointer">
          <option value="All">All Channels</option>
          <option value="EMAIL">Email</option>
          <option value="SMS">SMS</option>
        </select>
      </div>
    </div>
  );
}