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
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Notification Manager
      </h1>

      <table className="w-full bg-white shadow-lg rounded-xl">
        <thead className="bg-green-100">
          <tr>
            <th className="p-3">Customer</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Email</th>
            <th className="p-3">Type</th>
            <th className="p-3">Appointment</th>
            <th className="p-3">Sent Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b hover:bg-green-50">
              <td className="p-3">{log.customerName}</td>
              <td className="p-3">{log.phoneNumber}</td>
              <td className="p-3">{log.email}</td>
              <td className="p-3">{log.reminderType}</td>
              <td className="p-3">{log.appointmentDate}</td>
              <td className="p-3">{log.sentAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}