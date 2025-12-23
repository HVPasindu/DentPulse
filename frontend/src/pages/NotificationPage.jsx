import React, { useState } from 'react';
import { Send, Settings, Bell, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import NotificationItem from '../components/NotificationItem';
import FilterBar from '../components/FilterBar';
import { TemplatesModal, NotificationModal } from '../components/Modals';

const MOCK_DATA = [
  { id: 'NOT001', title: 'Appointment Reminder - Tomorrow', status: 'Sent', recipient: 'John Smith', channel: 'EMAIL', category: 'Appointment Reminder', message: 'This is a reminder for your dental appointment tomorrow at 9:00 AM with Dr. Sarah Johnson.', timestamp: '2024-12-22 at 10:30 AM' },
  { id: 'NOT002', title: 'Appointment Reminder - Today', status: 'Sent', recipient: 'Emma Wilson', channel: 'SMS', category: 'Appointment Reminder', message: 'Your appointment is today at 2:00 PM. We look forward to seeing you!', timestamp: '2024-12-23 at 08:45 AM' },
  { id: 'NOT005', title: 'Payment Reminder', status: 'Failed', recipient: 'Michael Johnson', channel: 'SMS', category: 'Billing Reminder', message: 'You have an outstanding balance of $850. Please make payment at your earliest convenience.', errorMessage: 'Invalid phone number', timestamp: '2024-12-21 at 11:00 AM' }
];

export default function NotificationsPage() {
  const [modals, setModals] = useState({ send: false, temp: false });
  const [filters, setFilters] = useState({ query: '', type: 'All', channel: 'All' });

  const filtered = MOCK_DATA.filter(log => 
    (filters.type === 'All' || log.status === filters.type) &&
    (filters.channel === 'All' || log.channel === filters.channel) &&
    (log.recipient.toLowerCase().includes(filters.query.toLowerCase()) || log.id.toLowerCase().includes(filters.query.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-10 bg-[#f8fafb] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">Notifications Center</h1>
            <p className="text-gray-500 text-sm">Manage logs and templates</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setModals({...modals, send: true})} className="flex-1 md:flex-none bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-teal-700 transition-all shadow-sm">
              <Send size={16}/> Send Notification
            </button>
            <button onClick={() => setModals({...modals, temp: true})} className="flex-1 md:flex-none bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-teal-700 transition-all shadow-sm">
              <Settings size={16}/> Configure Templates
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total" value="8" icon={Bell} colorClass="bg-teal-50 text-teal-600" borderColor="border-teal-500" />
          <StatCard title="Sent" value="5" icon={CheckCircle2} colorClass="bg-green-50 text-green-600" borderColor="border-green-500" />
          <StatCard title="Failed" value="3" icon={AlertCircle} colorClass="bg-red-50 text-red-600" borderColor="border-red-500" />
          <StatCard title="Today" value="4" icon={Clock} colorClass="bg-blue-50 text-blue-600" borderColor="border-blue-500" />
        </div>

        <FilterBar setFilters={setFilters} />

        <div className="space-y-4">
          {filtered.map(log => <NotificationItem key={log.id} data={log} />)}
        </div>

        <NotificationModal isOpen={modals.send} onClose={() => setModals({...modals, send: false})} />
        <TemplatesModal isOpen={modals.temp} onClose={() => setModals({...modals, temp: false})} />
      </div>
    </div>
  );
}