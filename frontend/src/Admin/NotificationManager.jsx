import { useEffect, useState } from "react";
import axios from "axios";

export default function NotificationManager() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/reminders/logs")
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold  mb-6">Notification Manager</h1>
      <p className="text-lg  text-gray-600 pb-3.5">
        Show  Reminder  Logs
      </p>
      <div className="overflow-hidden rounded-xl border border-green-400 shadow-lg bg-white">
        <table className="w-full  ">
          <thead className="bg-green-50 ">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Type</th>
              <th className="p-3">Appointment</th>
              <th className="p-3">Sent Time</th>
            </tr>
          </thead>

          <tbody className="text-center items-center">
            {logs.map((log) => (
              <tr key={log.id} className="border-b-gray-600 hover:bg-green-50">
                <td className="p-3 ">{log.customerName}</td>
                <td className="p-3">{log.phoneNumber}</td>
                <td className="p-3">{log.email}</td>
                <td className="p-3">{log.reminderType}</td>
                <td className="p-3">{log.appointmentDate}</td>
                <td className="p-3">
                 
                 {new Date(log.sentAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
