import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/billing";


const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ===================== APIs ===================== */


export const fetchInvoices = async (date) => {
  const res = date
    ? await api.get(`?date=${date}`)
    : await api.get();
  return res.data;
};

// ➕ Add invoice
export const createInvoice = async (invoice) => {
  const res = await api.post("", {
    name: invoice.name,
    treatmentType: invoice.treatmentType,
    amount: invoice.amount,
    date: invoice.date,
  });
  return res.data;
};

// ✏️ Update invoice
export const updateInvoice = async (id, invoice) => {
  const res = await api.put(`/${id}`, invoice);
  return res.data;
};

// 🗑️ Delete invoice
export const deleteInvoice = async (id) => {
  await api.delete(`/${id}`);
};

// ✅ Mark as paid
export const markInvoicePaid = async (id) => {
  const res = await api.put(`/${id}/pay`);
  return res.data;
};
