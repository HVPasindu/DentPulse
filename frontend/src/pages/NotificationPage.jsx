import React, { useState } from 'react';
import { Send, Settings } from 'lucide-react';
import Notification from '../Admin/Notification';
import FilterBar from '../Admin/FilterBar';
import { TemplatesModal, NotificationModal } from '../Admin/Modals';

const MOCK_DATA = [
  { id: 'NOT001', title: 'Appointment Reminder - Tomorrow', status: 'Sent', recipient: 'John Smith', channel: 'EMAIL', category: 'Appointment Reminder', message: 'This is a reminder for your dental appointment tomorrow at 9:00 AM...', timestamp: '2024-12-22 at 10:30 AM' },
  { id: 'NOT005', title: 'Payment Reminder', status: 'Failed', recipient: 'Michael Johnson', channel: 'SMS', category: 'Billing Reminder', message: 'You have an outstanding balance of $850...', errorMessage: 'Invalid phone number', timestamp: '2024-12-21 at 11:00 AM' }
];

export default function NotificationsPage() {
  const [modals, setModals] = useState({ send: false, temp: false });
  const [filters, setFilters] = useState({ query: '', type: 'All', channel: 'All' });

  const filtered = MOCK_DATA.filter(log => 
    (filters.type === 'All' || log.status === filters.type) &&
    (filters.channel === 'All' || log.channel === filters.channel) &&
    (log.recipient.toLowerCase().includes(filters.query.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-10 bg-[#f8fafb] min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">Notifications Center</h1>
            <p className="text-gray-500 text-sm">Manage notification logs and configure templates</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setModals({...modals, send: true})} className="flex-1 md:flex-none bg-teal-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-teal-700 transition-all shadow-sm">
              <Send size={16}/> Send Notification
            </button>
            <button onClick={() => setModals({...modals, temp: true})} className="flex-1 md:flex-none bg-teal-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold hover:bg-teal-700 transition-all shadow-sm">
              <Settings size={16}/> Configure Templates
            </button>
          </div>
        </header>

        
        <FilterBar setFilters={setFilters} />

       
        <div className="space-y-4">
          {filtered.map(log => <Notification key={log.id} data={log} />)}
        </div>

      
        <NotificationModal isOpen={modals.send} onClose={() => setModals({...modals, send: false})} />
        <TemplatesModal isOpen={modals.temp} onClose={() => setModals({...modals, temp: false})} />
      </div>
    </div>
  );
}