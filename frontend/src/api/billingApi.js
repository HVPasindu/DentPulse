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

/* ===================== FETCH ===================== */
export const fetchInvoices = async () => {
  const res = await api.get("");
  return res.data.map((b) => ({
    id: b.id,
    invoiceId: b.billNumber,
    name: b.patientName,
    treatmentType: b.description,
    amount: b.amount,
    date: b.billDate,
    paymentMethod: b.paymentMethod,
  }));
};

/* ===================== CREATE ===================== */
export const createInvoice = async (invoice) => {
  const res = await api.post("", {
    patientName: invoice.name,
    description: invoice.treatmentType,
    amount: invoice.amount,
    billDate: invoice.date, // only here
  });
  return res.data;
};

/* ===================== UPDATE (THIS WAS MISSING / WRONG) ===================== */
export const updateInvoice = async (id, payload) => {
  const res = await api.put(`/${id}`, payload);
  return res.data;
};

/* ===================== DELETE ===================== */
export const deleteInvoice = async (id) => {
  await api.delete(`/${id}`);
};
