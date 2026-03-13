import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationManager() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/reminders/logs?page=${page}&size=20`).then((res) => {
      setLogs(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  }, [page]);

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold  mb-6">Notification Manager</h1>
      <p className="text-lg  text-gray-600 pb-3.5">Show Reminder Logs</p>
      <div className="overflow-hidden rounded-xl border border-green-400 shadow-lg bg-white">
        <table className="w-full  ">
          <thead className="bg-green-50 ">
            <tr>
              <th className="">Customer</th>
              <th className="">Phone</th>
              <th className="">Email</th>
              <th className="">Type</th>
              <th className="">Appointment</th>
              <th className="">Sent Time</th>
            </tr>
          </thead>

          <tbody className="text-center items-center">
            {logs?.map((log) => (
              <tr key={log.id} className="border-b-gray-600 hover:bg-green-50">
                <td className="p-3 ">{log.customerName}</td>
                <td className="p-3">{log.phoneNumber}</td>
                <td className="p-3">{log.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 font-semibold  ${log.reminderType === "EMAIL" ? "  text-white rounded-full bg-green-500" : "text-white rounded-full bg-blue-500"}`}
                  >
                    {log.reminderType}
                  </span>
                </td>
                <td className="p-3">{log.appointmentDate}</td>
                <td className="p-3">{new Date(log.sentAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Previous
          </button>

          <span className="px-3 py-2 font-semibold">
            Page {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page + 1 === totalPages}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
