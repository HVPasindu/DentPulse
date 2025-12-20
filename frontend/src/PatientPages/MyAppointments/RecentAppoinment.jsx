import React from "react";

const paitentdata = [
  {
    id: 1,
    name: "kalana",
    status: "Scheduled",
    date: "2025/05/26",
    time: "9.00am",
  },
  {},
  {},
  {},
];
export const RecentAppoinment = () => {
  return (
  

        <div className="bg-white rounded-lg  overflow-hidden border-2 border-cyan-400 ">
          <div>
            <h1 className="p-1.5 text-cyan-700">Upcoming Appoinments</h1>
            <h1 className="p-1.5 text-cyan-400">
              View your scheduled appointments
            </h1>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paitentdata.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{user.name}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`rounded-full px-2 py-1  text-xs inline-flex  ${
                        user.relationship == "Account Owner"
                          ? "bg-cyan-400 text-cyan-700"
                          : "bg-green-200 text-green-700"
                      }`}
                    >
                      {" "}
                      {user.status}{" "}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm  text-gray-900">{user.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="">
                      <button className="flex flex-row justify-evenly border-2 rounded-2xl text-red-400 hover:bg-red-300 border-red-400 bg-white p-2 ">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
    
  );
};
