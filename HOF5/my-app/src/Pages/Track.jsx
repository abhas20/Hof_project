import React, { useState, useEffect } from "react";
import { getGrivenceData } from "../api/Postapi";

const TrackGrievance = () => {
  const [grievanceId, setGrievanceId] = useState("");
  const [contact, setContact] = useState("");
  const [grievance, setGrievance] = useState(null);
  const [pastGrievances, setPastGrievances] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pastGrievances.length > 0) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }, [pastGrievances]);

  const isValidContact = (input) => {
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(input) || emailRegex.test(input);
  };

  const getData = async (id) => {
    try {
      const res = await getGrivenceData(id); 
      return res; 
    } catch (error) {
      console.error("Error fetching grievance data:", error);
      throw new Error("Failed to fetch grievance data");
    }
  };
  
  // Fetch a grievance by ID
  const fetchGrievanceById = async () => {
    if (!grievanceId) {
      setError("Please enter a grievance ID.");
      return;
    }
  
    try {
      const res = await getData(grievanceId); 
  
      if (res && res.data) {
        console.log(res);
        setGrievance(res.data); 
        setError(""); 
      } else {
        setError("No grievance found with this ID.");
        setGrievance(null);
      }
    } catch (error) {
      setError("Failed to fetch grievance data.");
      setGrievance(null);
    }
  };

  // Fetch all grievances by contact (phone/email)
  const fetchGrievancesByContact = () => {
    if (!contact) {
      setError("Please enter your phone number or email.");
      return;
    }
    if (!isValidContact(contact)) {
      setError("Please enter a valid phone number or email.");
      return;
    }
    setPastGrievances(mockGrievances);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 overflow-auto pt-24">
      <div className="bg-green-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 text-center">
          Track Your Grievance
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your "Grievance ID" or "Phone Number/Email" to check status.
        </p>

        {/* Grievance ID Search */}
        <div className="mt-6 bg-white">
          <input
            type="text"
            placeholder="Enter Grievance ID"
            value={grievanceId}
            onChange={(e) => setGrievanceId(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <button
            onClick={fetchGrievanceById}
            className="mt-2 w-full bg-green-700 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-800"
          >
            Track Grievance
          </button>
        </div>

        {/* Contact-based Search */}
        <div className="mt-6 bg-white">
          <input
            type="text"
            placeholder="Enter Phone Number or Email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <button
            onClick={fetchGrievancesByContact}
            className="mt-2 w-full bg-green-700 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-800"
          >
            View All Grievances
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/* Grievance Status */}
        {grievance && (
          <div className="mt-6 p-4 border-l-4 border-green-700 bg-green-50 rounded-md">
            <h3 className="text-green-900 font-semibold">Grievance Found:</h3>
            <p><strong>ID:</strong> {grievance.id}</p>
            <p><strong>Name:</strong> {grievance.full_name}</p>
            <p><strong>Category:</strong> {grievance.category}</p>
            <p><strong>Description:</strong> {grievance.grievance_description}</p>
            <p><strong>Status:</strong> {grievance.status}</p>
            <p><strong>Contact:</strong> {grievance.mobile}</p>
          </div>
        )}

        {/* Past Grievances List */}
        {pastGrievances.length > 0 && (
          <div className="mt-6 overflow-auto max-h-96">
            <h3 className="text-xl font-semibold text-green-800">Past Grievances:</h3>
            {pastGrievances.map((g, index) => (
              <div key={index} className="mt-3 p-3 border border-gray-300 rounded-md bg-gray-50">
                <p><strong>ID:</strong> {g.id}</p>
                <p><strong>Category:</strong> {g.category}</p>
                <p><strong>Status:</strong> {g.grievance_description}</p>
                <p><strong>Date:</strong> {g.urgency_level}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackGrievance;
