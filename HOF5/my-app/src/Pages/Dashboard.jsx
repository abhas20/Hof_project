import React, { useState } from "react";
import { FaChartBar, FaClipboardCheck, FaCheckCircle, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Sample data for grievances
  const [grievances, setGrievances] = useState([
    { id: 1, title: "Road Repair Delay", category: "Infrastructure", status: "Pending", urgency: "High" },
    { id: 2, title: "Water Supply Issue", category: "Utilities", status: "In Progress", urgency: "Medium" },
    { id: 3, title: "Pension Delay", category: "Government Services", status: "Resolved", urgency: "Low" },
    { id: 4, title: "Power Outage", category: "Electricity", status: "Pending", urgency: "High" },
  ]);

  return (
    <div className="font-sans bg-white min-h-screen pt-28">

      {/* Statistics Section */}
      <section className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaClipboardCheck className="text-green-700 text-5xl" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Total Grievances</h3>
              <p className="text-gray-600 text-lg">4</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaClock className="text-yellow-500 text-5xl" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Pending</h3>
              <p className="text-gray-600 text-lg">2</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaChartBar className="text-blue-600 text-5xl" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">In Progress</h3>
              <p className="text-gray-600 text-lg">1</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaCheckCircle className="text-green-500 text-5xl" />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Resolved</h3>
              <p className="text-gray-600 text-lg">1</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grievance Table */}
      <section className="container mx-auto px-6 py-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Grievance List</h2>
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-100 text-gray-800">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Urgency</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map((grievance) => (
                <tr key={grievance.id} className="text-center border-b border-gray-300">
                  <td className="px-4 py-2">{grievance.id}</td>
                  <td className="px-4 py-2">{grievance.title}</td>
                  <td className="px-4 py-2">{grievance.category}</td>
                  <td className={`px-4 py-2 font-semibold ${
                    grievance.status === "Pending" ? "text-yellow-600" :
                    grievance.status === "In Progress" ? "text-blue-600" :
                    "text-green-600"
                  }`}>
                    {grievance.status}
                  </td>
                  <td className="px-4 py-2">{grievance.urgency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;