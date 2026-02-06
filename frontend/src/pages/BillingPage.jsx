import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const BillingPage = () => {
  const today = new Date().toISOString().split("T")[0];

  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);
  
  // UI States
  const [activeMenu, setActiveMenu] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [activeAppt, setActiveAppt] = useState(null);

  const treatmentPrices = {
    "Routine Checkup": 2500,
    "Dental Cleaning & Checkup": 5500,
    "Root Canal Treatment": 15000,
    "Teeth Cleaning (Moderate)": 8000,
    "Teeth Cleaning (Severe)": 12000,
    "Wisdom Teeth Removal": 25000,
    "Cavity Filling": 4500,
  };

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("app_appointments");
      if (saved) {
        const data = JSON.parse(saved);
        const initializedData = data.map((appt) => ({
          ...appt,
          amount: appt.amount || 0,
          billingStatus: appt.billingStatus || "Unpaid",
          paymentMethod: appt.paymentMethod || "Cash",
          invoiceId: appt.invoiceId || `INV-2026-${appt.id.split('-')[1] || Math.floor(100 + Math.random() * 900)}`,
        }));
        setAppointments(initializedData);
      }
    };
    loadData();
    window.addEventListener('focus', loadData);
    return () => window.removeEventListener('focus', loadData);
  }, []);

  const updateLocalStorage = (updatedList) => {
    setAppointments(updatedList);
    localStorage.setItem("app_appointments", JSON.stringify(updatedList));
  };

  const toggleStatus = (id) => {
    const updated = appointments.map((appt) => {
      if (appt.id === id && appt.billingStatus === "Unpaid") {
        return { ...appt, billingStatus: "Paid" };
      }
      return appt;
    });
    updateLocalStorage(updated);
  };

  const toggleMethod = (id) => {
    const updated = appointments.map((appt) => {
      if (appt.id === id) {
        return { ...appt, paymentMethod: appt.paymentMethod === "Cash" ? "Card" : "Cash" };
      }
      return appt;
    });
    updateLocalStorage(updated);
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    if (!activeAppt) return;
    const exists = appointments.some((appt) => appt.id === activeAppt.id);
    if (exists) {
      const updated = appointments.map((appt) =>
        appt.id === activeAppt.id ? { ...activeAppt } : appt
      );
      updateLocalStorage(updated);
    } else {
      updateLocalStorage([...appointments, activeAppt]);
    }
    setIsModalOpen(false);
  };

  const totalInvoicesAllTime = appointments.length;
  const filteredInvoices = appointments.filter((appt) => {
    const matchesSearch = appt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          appt.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && (appt.date?.split("T")[0] === selectedDate);
  });

  const dailyPaidRevenue = filteredInvoices
    .filter(a => a.billingStatus === "Paid")
    .reduce((sum, appt) => sum + appt.amount, 0);

  const dailyPaidCount = filteredInvoices.filter(a => a.billingStatus === "Paid").length;
  const dailyPendingAmount = filteredInvoices
    .filter(a => a.billingStatus === "Unpaid")
    .reduce((sum, appt) => sum + appt.amount, 0);

  return (
    <div className="p-8 bg-green-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">Billing & Invoices</h1>
      <p className="text-slate-500 mb-8 text-sm font-medium">Manage patient invoices, payments, and financial records</p>

      {/* STATS CARDS - Icons updated with matching background colors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`LKR ${dailyPaidRevenue.toLocaleString()}`} symbol="💰" iconBg="bg-green-100" />
        <StatCard title="Total Invoices" value={totalInvoicesAllTime}  symbol="📄" iconBg="bg-purple-100" />
        <StatCard title="Paid Invoices" value={dailyPaidCount}  symbol="🕒" iconBg="bg-green-100" />
        <StatCard title="Pending Payments" value={`LKR ${dailyPendingAmount.toLocaleString()}`} isNegative symbol="⌛" iconBg="bg-orange-100" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-green-100">
        {/* SEARCH & FILTER BAR */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <span className="absolute left-3 top-2.5 text-green-600">🔍</span>
            <input 
              type="text" 
              placeholder="Search invoices, patients, or invoice number..." 
              className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-green-200 rounded-lg px-4 py-2 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-50/50 text-green-700 text-[12px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50">
              {filteredInvoices.map((appt) => (
                <tr key={appt.id} className="hover:bg-green-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{appt.invoiceId}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-bold">{appt.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {appt.treatmentType || (
                      <select 
                        className="bg-green-50/50 border border-green-100 rounded px-2 py-1 text-xs outline-none focus:border-green-500"
                        onChange={(e) => {
                          const price = treatmentPrices[e.target.value] || 0;
                          const updated = appointments.map(a => a.id === appt.id ? {...a, treatmentType: e.target.value, amount: price} : a);
                          updateLocalStorage(updated);
                        }}
                      >
                        <option value="">Select Treatment</option>
                        {Object.keys(treatmentPrices).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">LKR {appt.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(appt.id)}
                      disabled={appt.billingStatus === "Paid"}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-black transition-all uppercase tracking-tighter ${
                        appt.billingStatus === "Paid" 
                          ? "bg-green-500 text-white cursor-default" 
                          : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                      }`}
                    >
                      {appt.billingStatus}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleMethod(appt.id)}
                      className="px-2.5 py-1 rounded-md text-[10px] font-black bg-purple-100 text-purple-700 hover:bg-purple-200 uppercase tracking-tight transition-all border border-purple-200"
                    >
                      {appt.paymentMethod}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === appt.id ? null : appt.id)}
                      className="text-slate-400 hover:text-green-600 font-bold text-lg px-2"
                    >
                      •••
                    </button>
                    {activeMenu === appt.id && (
                      <div className="absolute right-6 top-12 w-48 bg-white border border-green-100 rounded-xl shadow-xl z-10 py-1 text-left overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                        <button onClick={() => { setActiveAppt(appt); setModalMode("view"); setIsModalOpen(true); setActiveMenu(null); }} className="w-full px-4 py-2 text-xs font-bold text-slate-600 hover:bg-green-50 flex items-center gap-2">👁️ View Details</button>
                        <button onClick={() => { setActiveAppt(appt); setModalMode("edit"); setIsModalOpen(true); setActiveMenu(null); }} className="w-full px-4 py-2 text-xs font-bold text-slate-600 hover:bg-green-50 flex items-center gap-2">✏️ Edit Invoice</button>
                        {appt.billingStatus === "Paid" && (
                           <button onClick={() => alert("Downloading PDF...")} className="w-full px-4 py-2 text-xs font-bold text-green-600 hover:bg-green-50 flex items-center gap-2">📥 Download PDF</button>
                        )}
                        <button className="w-full px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 border-t mt-1">🗑️ Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-green-100">
            <div className="p-6 border-b border-green-50 flex justify-between items-start bg-green-50/30">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{activeAppt.invoiceId}</h2>
                <p className="text-sm text-slate-500 mt-0.5 font-bold uppercase tracking-widest">{activeAppt.name}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 text-xl font-bold">✕</button>
            </div>

            <form onSubmit={handleUpdateDetails}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] mb-1">Invoice Date</p>
                    <p className="font-bold text-slate-800">{activeAppt.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] mb-1">Status</p>
                    {modalMode === "view" ? (
                      <span className={`px-2 py-0.5 rounded font-black text-[10px] uppercase ${activeAppt.billingStatus === 'Paid' ? 'bg-green-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                        {activeAppt.billingStatus}
                      </span>
                    ) : (
                      <select 
                        value={activeAppt.billingStatus}
                        onChange={(e) => setActiveAppt({...activeAppt, billingStatus: e.target.value})}
                        className="border border-green-200 rounded px-2 py-1 font-bold text-xs outline-none focus:border-green-500"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="bg-green-50/30 border border-green-100 rounded-xl p-5">
                  <h3 className="text-xs font-black text-green-700 uppercase tracking-widest mb-4">Service Details</h3>
                  <div className="flex justify-between items-center mb-4">
                    {modalMode === "view" ? (
                      <span className="text-sm font-bold text-slate-700">{activeAppt.treatmentType || "N/A"}</span>
                    ) : (
                      <select 
                        value={activeAppt.treatmentType || ""}
                        onChange={(e) => {
                          const price = treatmentPrices[e.target.value] || 0;
                          setActiveAppt({...activeAppt, treatmentType: e.target.value, amount: price});
                        }}
                        className="border border-green-200 rounded-lg p-2 text-sm w-full max-w-[250px] font-medium outline-none"
                      >
                        {Object.keys(treatmentPrices).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    )}
                    <span className="font-black text-slate-900 text-sm">LKR {activeAppt.amount?.toLocaleString()}</span>
                  </div>
                  
                  {modalMode === "edit" && (
                    <div className="mt-4 pt-4 border-t border-green-100 flex justify-between items-center">
                       <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Payment Method</p>
                       <select 
                        value={activeAppt.paymentMethod}
                        onChange={(e) => setActiveAppt({...activeAppt, paymentMethod: e.target.value})}
                        className="border border-green-200 rounded-lg p-2 text-sm font-bold"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                      </select>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t-2 border-dashed border-green-200 flex justify-between items-center">
                    <span className="font-black text-slate-800 text-base">Total Due</span>
                    <span className="font-black text-green-600 text-base">LKR {activeAppt.amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 flex gap-3 justify-end">
                {modalMode === "view" ? (
                  <>
                    <button type="button" className="flex-1 py-2.5 bg-green-600 text-white rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">📥 Download</button>
                    <button type="button" className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-slate-50">🖨️ Print</button>
                    <button type="button" className="px-6 py-2.5 bg-white border border-red-100 text-red-500 rounded-lg text-sm font-black hover:bg-red-50">🗑️</button>
                  </>
                ) : (
                  <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg font-black hover:bg-green-700 transition-colors shadow-lg shadow-green-100">Update Payment Records</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, change, isNegative, symbol, iconBg }) => (
  <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase mb-3">{title}</p>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">{value}</h3>
      </div>
      <div className={`${iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-lg`}>{symbol}</div>
    </div>
    <p className={`text-[11px] font-black mt-3 ${isNegative ? "text-red-500" : "text-green-500"}`}>
      {change}
    </p>
  </div>
);

export default BillingPage;