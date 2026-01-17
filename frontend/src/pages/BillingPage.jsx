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

  // Status can only change from Unpaid to Paid once via table click
  const toggleStatus = (id) => {
    const updated = appointments.map((appt) => {
      if (appt.id === id && appt.billingStatus === "Unpaid") {
        return { ...appt, billingStatus: "Paid" };
      }
      return appt;
    });
    updateLocalStorage(updated);
  };

  // NEW: Toggle Method between Cash and Card
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

  // Calculations
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
    <div className="p-8 bg-cyan-50 min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Billing & Invoices</h1>
      <p className="text-gray-500 mb-8 text-sm">Manage patient invoices, payments, and financial records</p>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`LKR ${dailyPaidRevenue.toLocaleString()}`} symbol="💰" />
        <StatCard title="Total Invoices" value={totalInvoicesAllTime}  symbol="📄" />
        <StatCard title="Paid Invoices" value={dailyPaidCount}  symbol="🕒" />
        <StatCard title="Pending Payments" value={`LKR ${dailyPendingAmount.toLocaleString()}`} isNegative symbol="⌛" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* SEARCH & FILTER BAR */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search invoices, patients, or invoice number..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 text-gray-500 text-[12px] font-semibold uppercase tracking-wider">
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
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{appt.invoiceId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{appt.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {appt.treatmentType || (
                      <select 
                        className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-xs outline-none"
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
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">LKR {appt.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(appt.id)}
                      disabled={appt.billingStatus === "Paid"}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        appt.billingStatus === "Paid" 
                          ? "bg-green-100 text-green-600 cursor-default" 
                          : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                      }`}
                    >
                      {appt.billingStatus}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleMethod(appt.id)}
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 uppercase tracking-tight transition-all"
                    >
                      {appt.paymentMethod}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === appt.id ? null : appt.id)}
                      className="text-gray-400 hover:text-gray-900 font-bold text-lg px-2"
                    >
                      •••
                    </button>
                    {activeMenu === appt.id && (
                      <div className="absolute right-6 top-12 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10 py-1 text-left">
                        <button onClick={() => { setActiveAppt(appt); setModalMode("view"); setIsModalOpen(true); setActiveMenu(null); }} className="w-full px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-2">👁️ View Details</button>
                        <button onClick={() => { setActiveAppt(appt); setModalMode("edit"); setIsModalOpen(true); setActiveMenu(null); }} className="w-full px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-2">✏️ Edit Invoice</button>
                        {appt.billingStatus === "Paid" && (
                           <button onClick={() => alert("Downloading PDF...")} className="w-full px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-2">📥 Download PDF</button>
                        )}
                        <button className="w-full px-4 py-2 text-xs text-red-500 hover:bg-red-50 flex items-center gap-2 border-t mt-1">🗑️ Delete</button>
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
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{activeAppt.invoiceId}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{activeAppt.name}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <form onSubmit={handleUpdateDetails}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Invoice Date</p>
                    <p className="font-bold text-gray-900">{activeAppt.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Status</p>
                    {modalMode === "view" ? (
                      <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded font-bold text-[10px]">{activeAppt.billingStatus}</span>
                    ) : (
                      <select 
                        value={activeAppt.billingStatus}
                        onChange={(e) => setActiveAppt({...activeAppt, billingStatus: e.target.value})}
                        className="border border-gray-200 rounded px-2 py-1 font-bold text-xs"
                      >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Service Details</h3>
                  <div className="flex justify-between items-center mb-4">
                    {modalMode === "view" ? (
                      <span className="text-sm font-medium text-gray-700">{activeAppt.treatmentType || "N/A"}</span>
                    ) : (
                      <select 
                        value={activeAppt.treatmentType || ""}
                        onChange={(e) => {
                          const price = treatmentPrices[e.target.value] || 0;
                          setActiveAppt({...activeAppt, treatmentType: e.target.value, amount: price});
                        }}
                        className="border border-gray-200 rounded-lg p-2 text-sm w-full max-w-[250px]"
                      >
                        {Object.keys(treatmentPrices).map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    )}
                    <span className="font-bold text-gray-900 text-sm">LKR {activeAppt.amount?.toLocaleString()}</span>
                  </div>
                  
                  {modalMode === "edit" && (
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Method</p>
                       <select 
                        value={activeAppt.paymentMethod}
                        onChange={(e) => setActiveAppt({...activeAppt, paymentMethod: e.target.value})}
                        className="border border-gray-200 rounded-lg p-2 text-sm"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                      </select>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-base">Total</span>
                    <span className="font-bold text-gray-900 text-base">LKR {activeAppt.amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 flex gap-3 justify-end">
                {modalMode === "view" ? (
                  <>
                    <button type="button" className="flex-1 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">📥 Download PDF</button>
                    <button type="button" className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-bold flex items-center justify-center gap-2">🖨️ Print</button>
                    <button type="button" className="px-6 py-2.5 bg-white border border-red-100 text-red-500 rounded-lg text-sm font-bold">🗑️ Delete</button>
                  </>
                ) : (
                  <button type="submit" className="w-full py-3 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 transition-colors">Update Payment Records</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, change, isNegative, symbol }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-xs font-semibold mb-3">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{value}</h3>
      </div>
      <div className="bg-gray-50 w-10 h-10 rounded-xl flex items-center justify-center text-lg">{symbol}</div>
    </div>
    <p className={`text-[11px] font-bold mt-3 ${isNegative ? "text-red-500" : "text-green-500"}`}>
      {change}
    </p>
  </div>
);

export default BillingPage;