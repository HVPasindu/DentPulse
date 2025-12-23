import { CheckCircle, AlertCircle, Mail, MessageSquare } from 'lucide-react';

export default function Notification({ data }) {
  const isFail = data.status === 'Failed';
  return (
    <div className={`bg-white border rounded-xl border-l-4 ${isFail ? 'border-red-500' : 'border-teal-600'} p-5 shadow-sm transition-all hover:shadow-md`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {isFail ? <AlertCircle className="text-red-500" size={18}/> : <CheckCircle className="text-teal-600" size={18}/>}
          <h3 className="font-bold text-gray-800">{data.title}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isFail ? 'bg-red-100 text-red-600' : 'bg-teal-100 text-teal-600'}`}>{data.status}</span>
        </div>
        <div className="flex gap-2">
            <button className="text-teal-600 text-xs font-bold border border-teal-600 px-3 py-1.5 rounded-lg hover:bg-teal-50">View Details</button>
            {isFail && <button className="bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-teal-700">Resend</button>}
        </div>
      </div>
      <div className="flex gap-4 text-[11px] text-gray-400 mb-3 font-medium uppercase tracking-tight">
        <span>👤 {data.recipient}</span>
        <span>{data.channel === 'EMAIL' ? '📧 EMAIL' : '📱 SMS'}</span>
        <span className="bg-gray-100 px-2 rounded">{data.category}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{data.message}</p>
      {isFail && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs mb-4 border border-red-100 font-medium">Error: {data.errorMessage}</div>}
      <div className="text-[10px] text-gray-300 flex gap-4 border-t pt-3 font-medium tracking-wide">
        <span>🕒 {data.timestamp}</span>
        <span>ID: {data.id}</span>
      </div>
    </div>
  );
}