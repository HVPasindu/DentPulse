import React, { useState, useEffect } from "react";
import { createInvoice } from "../api/billingApi";
import { fetchInvoices } from "../api/billingApi";
import { deleteInvoice } from "../api/billingApi";
import { updateInvoice } from "../api/billingApi";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  // Add Invoice modal state
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    name: "",
    treatmentType: "",
    date: today,
    amount: 0,
  });

  const treatmentPrices = {
    "Routine Checkup": 2500,
    "Dental Cleaning & Checkup": 5500,
    "Root Canal Treatment": 15000,
    "Teeth Cleaning (Moderate)": 8000,
    "Teeth Cleaning (Severe)": 12000,
    "Wisdom Teeth Removal": 25000,
    "Cavity Filling": 4500,
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    if (
      !newInvoice.name ||
      !newInvoice.treatmentType ||
      newInvoice.amount <= 0
    ) {
      alert("Please fill all required fields");
      return;
    }
    try {
      await createInvoice(newInvoice);
      setIsAddInvoiceOpen(false);

      const data = await fetchInvoices();
      setAppointments(data);

      setNewInvoice({
        name: "",
        treatmentType: "",
        date: today,
        amount: 0,
      });
    } catch (err) {
      alert("Failed to add invoice");
    }
  };

  const InvoicePdf = (invoice) => {
    const doc = new jsPDF();

    // ===== COLORS =====
    const green = "#16a34a";
    const gray = "#6b7280";

    // ===== HEADER =====
    doc.setFillColor(22, 163, 74);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor("#ffffff");
    doc.setFontSize(18);
    doc.text("DentPulse Dental Clinic", 14, 18);

    doc.setFontSize(10);
    doc.text("Professional Dental Care", 14, 24);

    // ===== INVOICE META =====
    doc.setTextColor("#000000");
    doc.setFontSize(11);

    doc.text(`Invoice No:`, 140, 38);
    doc.text(invoice.invoiceId, 170, 38);

    doc.text(`Date:`, 140, 45);
    doc.text(invoice.date, 170, 45);

    // ===== PATIENT INFO =====
    doc.setFontSize(12);
    doc.text("Bill To:", 14, 45);

    doc.setFontSize(11);
    doc.text(`Patient Name: ${invoice.name}`, 14, 53);

    // ===== LINE =====
    doc.setDrawColor(200);
    doc.line(14, 58, 196, 58);

    // ===== TABLE =====
    autoTable(doc, {
      startY: 65,
      head: [["Description", "Amount (LKR)"]],
      body: [
        [
          invoice.treatmentType || "Dental Service",
          `LKR ${invoice.amount.toLocaleString()}`,
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [22, 163, 74],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fontSize: 11,
        cellPadding: 6,
      },
      columnStyles: {
        1: { halign: "right" },
      },
    });

    const finalY = doc.lastAutoTable.finalY;

    // ===== TOTAL BOX =====
    doc.setFillColor(240, 253, 244);
    doc.rect(120, finalY + 10, 76, 15, "F");

    doc.setFontSize(12);
    doc.text("Total", 125, finalY + 20);
    doc.setFont(undefined, "bold");
    doc.text(`LKR ${invoice.amount.toLocaleString()}`, 165, finalY + 20, {
      align: "right",
    });

    // ===== FOOTER =====
    doc.setFont(undefined, "normal");
    doc.setFontSize(10);
    doc.setTextColor(gray);

    doc.text(
      "Thank you for trusting DentPulse with your smile 🦷",
      14,
      finalY + 40,
    );

    doc.text("Authorized Signature:", 14, finalY + 55);
    doc.line(60, finalY + 55, 120, finalY + 55);

    // ===== SAVE =====
    return doc;
  };

  const downloadInvoicePdf = (invoice) => {
    const doc = InvoicePdf(invoice);
    doc.save(`${invoice.invoiceId}.pdf`);
  };
  const printInvoicePdf = (invoice) => {
    const doc = InvoicePdf(invoice);

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);

    const printWindow = window.open(blobUrl);
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setAppointments(data);
      } catch (err) {
        console.error("Failed to load invoices", err);
      }
    };

    loadInvoices();
  }, []);

  const totalInvoicesAllTime = appointments.length;
  const filteredInvoices = appointments.filter((appt) => {
    const matchesSearch =
      appt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && appt.date?.split("T")[0] === selectedDate;
  });

  const dailyPaidRevenue = filteredInvoices.reduce(
    (sum, appt) => sum + appt.amount,
    0,
  );

  const dailyPaidCount = filteredInvoices.length;

  return (
    <div className="p-8 bg-green-50 min-h-screen font-sans">
      <div className="flex flex-row items-baseline justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-1">
            Billing & Invoices
          </h1>
        </div>
        <div>
          <button
            onClick={() => setIsAddInvoiceOpen(true)}
            className="p-4 bg-green-600 text-white rounded-lg text-lg font-black hover:bg-green-700 hover:scale-110 duration-400 transition"
          >
            + Add Invoice
          </button>
        </div>
      </div>

      <p className="text-slate-500 mb-8 text-sm font-medium">
        Manage patient invoices, payments, and financial records
      </p>

      {/* STATS CARDS - Icons updated with matching background colors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`LKR ${dailyPaidRevenue.toLocaleString()}`}
          symbol="💰"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Total Invoices"
          value={totalInvoicesAllTime}
          symbol="📄"
          iconBg="bg-purple-100"
        />
        <StatCard
          title="Paid Invoices"
          value={dailyPaidCount}
          symbol="🕒"
          iconBg="bg-green-100"
        />
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

                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50">
              {filteredInvoices.map((appt) => (
                <tr
                  key={appt.id}
                  className="hover:bg-green-50/50 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">
                    {appt.invoiceId}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 font-bold">
                    {appt.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {appt.treatmentType || (
                      <select
                        className="bg-green-50/50 border border-green-100 rounded px-2 py-1 text-xs outline-none focus:border-green-500"
                        onChange={(e) => {
                          const price = treatmentPrices[e.target.value] || 0;
                          setAppointments((prev) =>
                            prev.map((a) =>
                              a.id === appt.id
                                ? {
                                    ...a,
                                    treatmentType: e.target.value,
                                    amount: price,
                                  }
                                : a,
                            ),
                          );
                        }}
                      >
                        <option value="">Select Treatment</option>
                        {Object.keys(treatmentPrices).map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">
                    LKR {appt.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* View */}
                      <button
                        onClick={() => {
                          setActiveAppt(appt);
                          setModalMode("view");
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 text-xs font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        View
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => {
                          setActiveAppt(appt);
                          setModalMode("edit");
                          setIsModalOpen(true);
                        }}
                        className="px-3 py-1 text-xs font-bold text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-50"
                      >
                        Edit
                      </button>

                      {/* Download */}
                      <button
                        onClick={() => downloadInvoicePdf(appt)}
                        className="px-3 py-1 text-xs font-bold text-green-600 border border-green-200 rounded-lg hover:bg-green-50"
                      >
                        PDF
                      </button>

                      {/* Print */}
                      <button
                        onClick={() => printInvoicePdf(appt)}
                        className="px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-100"
                      >
                        Print
                      </button>

                      {/* Delete */}
                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete this invoice?")) return;
                          await deleteInvoice(appt.id);
                          setAppointments(await fetchInvoices());
                        }}
                        className="px-3 py-1 text-xs font-bold text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isAddInvoiceOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-green-100">
              {/* Header */}
              <div className="p-5 border-b border-green-100 flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-800">
                  Add New Invoice
                </h2>
                <button
                  onClick={() => setIsAddInvoiceOpen(false)}
                  className="text-xl font-bold text-slate-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAddInvoice} className="p-6 space-y-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter patient name"
                    value={newInvoice.name}
                    onChange={(e) =>
                      setNewInvoice({ ...newInvoice, name: e.target.value })
                    }
                    className="w-full border border-green-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-400/20"
                  />
                </div>

                {/* Treatment Type */}
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase mb-1">
                    Treatment Type
                  </label>
                  <select
                    value={newInvoice.treatmentType}
                    onChange={(e) => {
                      const price = treatmentPrices[e.target.value] || 0;
                      setNewInvoice({
                        ...newInvoice,
                        treatmentType: e.target.value,
                        amount: price,
                      });
                    }}
                    className="w-full border border-green-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-400/20"
                  >
                    <option value="">Select treatment</option>
                    {Object.keys(treatmentPrices).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Invoice Date */}
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase mb-1">
                    Invoice Date
                  </label>
                  <input
                    type="date"
                    value={newInvoice.date}
                    onChange={(e) =>
                      setNewInvoice({ ...newInvoice, date: e.target.value })
                    }
                    className="w-full border border-green-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-400/20"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase mb-1">
                    Amount (LKR)
                  </label>
                  <input
                    type="number"
                    value={newInvoice.amount}
                    onChange={(e) =>
                      setNewInvoice({ ...newInvoice, amount: e.target.value })
                    }
                    className="w-full border border-green-200 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-400/20"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-black hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
                >
                  Save Invoice
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* VIEW/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-green-100">
            <div className="p-6 border-b border-green-50 flex justify-between items-start bg-green-50/30">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {activeAppt.invoiceId}
                </h2>
                {modalMode === "view" ? (
                  <p className="text-sm text-slate-500 mt-0.5 font-bold uppercase tracking-widest">
                    {activeAppt.name}
                  </p>
                ) : (
                  <input
                    type="text"
                    value={activeAppt.name}
                    onChange={(e) =>
                      setActiveAppt({ ...activeAppt, name: e.target.value })
                    }
                    className="mt-1 w-full border border-green-200 rounded-lg p-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-green-400/20"
                  />
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-red-500 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] mb-1">
                      Invoice Date
                    </p>
                    <p className="font-bold text-slate-800">
                      {activeAppt.date}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50/30 border border-green-100 rounded-xl p-5">
                  <h3 className="text-xs font-black text-green-700 uppercase tracking-widest mb-4">
                    Service Details
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    {modalMode === "view" ? (
                      <span className="text-sm font-bold text-slate-700">
                        {activeAppt.treatmentType || "N/A"}
                      </span>
                    ) : (
                      <select
                        value={activeAppt.treatmentType || ""}
                        onChange={(e) => {
                          const price = treatmentPrices[e.target.value] || 0;
                          setActiveAppt({
                            ...activeAppt,
                            treatmentType: e.target.value,
                            amount: price,
                          });
                        }}
                        className="border border-green-200 rounded-lg p-2 text-sm w-full max-w-[250px] font-medium outline-none"
                      >
                        {Object.keys(treatmentPrices).map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    )}
                    <span className="font-black text-slate-900 text-sm">
                      LKR {activeAppt.amount?.toLocaleString()}
                    </span>
                  </div>

                  {modalMode === "edit" && (
                    <div className="mt-4 pt-4 border-t border-green-100 flex justify-between items-center">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Payment Method
                      </p>
                      <select
                        value={activeAppt.paymentMethod}
                        onChange={(e) =>
                          setActiveAppt({
                            ...activeAppt,
                            paymentMethod: e.target.value,
                          })
                        }
                        className="border border-green-200 rounded-lg p-2 text-sm font-bold"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                      </select>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t-2 border-dashed border-green-200 flex justify-between items-center">
                    <span className="font-black text-slate-800 text-base">
                      Total Due
                    </span>
                    <span className="font-black text-green-600 text-base">
                      LKR {activeAppt.amount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 flex gap-3 justify-end">
                {modalMode === "view" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => downloadInvoicePdf(activeAppt)}
                      className="flex-1 p-2.5 bg-green-600 text-white rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                    >
                      📥 Download
                    </button>
                    <button
                      type="button"
                      className="flex-1 p-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-black flex items-center justify-center gap-2 hover:bg-slate-50"
                      onClick={() => printInvoicePdf(activeAppt)}
                    >
                      🖨️ Print
                    </button>
                    <button
                      onClick={async () => {
                        if (!window.confirm("Delete this invoice?")) return;
                        await deleteInvoice(activeAppt.id);
                        setIsModalOpen(false);
                        setAppointments(await fetchInvoices());
                      }}
                      className="w-full px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                    >
                      🗑️ Delete
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await updateInvoice(activeAppt.id, {
                          patientName: activeAppt.name,
                          description: activeAppt.treatmentType,
                          amount: activeAppt.amount,
                        });

                        setAppointments(await fetchInvoices());
                        setIsModalOpen(false);
                      } catch (err) {
                        alert("Failed to update invoice");
                      }
                    }}
                    className="w-full py-3 bg-green-600 text-white rounded-lg font-black hover:bg-green-700"
                  >
                    Update Invoice
                  </button>
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
        <p className="text-slate-400 text-xs font-bold uppercase mb-3">
          {title}
        </p>
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">
          {value}
        </h3>
      </div>
      <div
        className={`${iconBg} w-10 h-10 rounded-xl flex items-center justify-center text-lg`}
      >
        {symbol}
      </div>
    </div>
    <p
      className={`text-[11px] font-black mt-3 ${isNegative ? "text-red-500" : "text-green-500"}`}
    >
      {change}
    </p>
  </div>
);

export default BillingPage;
