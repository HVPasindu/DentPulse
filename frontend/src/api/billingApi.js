import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/bills",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 📋 Fetch ALL bills
export const fetchInvoices = async () => {
  const res = await api.get("");
  return res.data.map((b) => ({
    id: b.id,
    invoiceId: b.billNumber,
    name: b.patientName,
    treatmentType: b.description,
    amount: b.amount,
    billingStatus: b.status,
    paymentMethod: b.paymentMethod,
    date: b.billDate,
  }));
};

// ➕ Create bill
export const createInvoice = async (invoice) => {
  const res = await api.post("", {
    patientName: invoice.name,
    description: invoice.treatmentType,
    amount: invoice.amount,
    billDate: invoice.date,
  });
  return res.data;
};

// 🗑️ Delete bill
export const deleteInvoice = async (id) => {
  await api.delete(`/${id}`);
};
// ✅ Mark bill as paid

