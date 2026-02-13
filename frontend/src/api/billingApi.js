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
    patientId: b.patientId,                // ADD
    treatmentServiceId: b.treatmentServiceId, // ADD
    name: b.patientName,
    treatmentType: b.treatmentDescription,
    amount: b.amount,
    date: b.billDate,
    paymentMethod: b.paymentMethod,
  }));
};




export const createInvoice = async (invoice) => {
  const res = await api.post("", {
    patientId: invoice.patientId,
    billDate: invoice.date,
    treatmentServiceId: invoice.treatmentServiceId,
  });
  return res.data;
};


export const updateInvoice = async (id, payload) => {
  const res = await api.put(`/${id}`, payload);
  return res.data;
};

/* ===================== DELETE ===================== */
export const deleteInvoice = async (id) => {
  await api.delete(`/${id}`);
};