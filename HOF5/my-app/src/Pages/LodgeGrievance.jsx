import React, { useState } from "react";
import { postData } from "../api/Postapi";

const GrievanceForm = () => {
  const [formData, setFormData] = useState({
    officeType: "",
    directorate: "",
    fullName: "",
    gender: "",
    category: "Water Supply",
    line1: "",
    country: "India",
    state: "Uttar Pradesh",
    mobile: "",
    email: "",
    grievanceDescription: "",
    previousGrievance: "No",
  });

   const [text,setText]=useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.size <= 250 * 1024) {
  //     setFormData({ ...formData, uploadedFile: file });
  //   } else {
  //     alert("File size must be 250KB or less.");
  //   }
  // };

  const addData =async ()=>{
    const res=await postData(formData);
    console.log(res);
    alert("Thanks for submitting the form. Your Grievance id is "+res.data.id)
    setText("Thanks for submitting the form!!! Your Grievance id is "+res.data.id)
 };


  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-30 bg-green-100 p-6 shadow-lg rounded-lg">
        <p className="text-green-700 text-2xl text-center pb-2 font-bold">{text}</p>
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
        Lodge Grievance
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Office Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Select Office Type</label>
            <select
              name="officeType"
              value={formData.officeType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option>Select</option>
              <option>Office A</option>
              <option>Office B</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600">
              Select Directorate/Commissionerate
            </label>
            <select
              name="directorate"
              value={formData.directorate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option>Select</option>
              <option>Directorate 1</option>
              <option>Directorate 2</option>
            </select>
          </div>
        </div>

        {/* Personal Details */}
        <div>
          <label className="block text-gray-600">* Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600">* Gender</label>
          <div className="flex gap-4">
            {["Male", "Female", "Others"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-600">Complainant Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
        <option value="Water Supply">Water Supply</option>
        <option value="Urban Planning">Urban Planning</option>
        <option value="Transportation">Transportation</option>
        <option value="Traffic & Law-enforcement">Traffic & Law Enforcement</option>
        <option value="Technology & Connectivity">Technology & Connectivity</option>
        <option value="Social Welfare">Social Welfare</option>
        <option value="Sanitation">Sanitation</option>
        <option value="Public Safety">Public Safety</option>
        <option value="Public Amenities">Public Amenities</option>
        <option value="Noise Pollution">Noise Pollution</option>
        <option value="Law Order">Law & Order</option>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Housing">Housing</option>
        <option value="Heritage Culture">Heritage & Culture</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Governance">Governance</option>
        <option value="Environment">Environment</option>
        <option value="Employment">Employment</option>
        <option value="Emergency Services">Emergency Services</option>
        <option value="Electricity">Electricity</option>
        <option value="Education">Education</option>
        <option value="Disaster Management">Disaster Management</option>
        <option value="Banking">Banking</option>
        <option value="Agriculture">Agriculture</option>
        <option value="Accessibility">Accessibility</option>
          </select>
        </div>

{/* Address Details */}
<div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Address Details</h3>

          <div>
            <label className="block text-gray-600">* Address Line 1</label>
            <input
              type="text"
              name="line1"
              value={formData.line1}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">* State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div> 

          <div>
            <label className="block text-gray-600">* Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        {/* Complaint Details */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Complaint Details
          </h3>

          <div>
            <label className="block text-gray-600">* Grievance Description</label>
            <textarea
              name="grievanceDescription"
              value={formData.grievanceDescription}
              onChange={handleChange}
              placeholder="Please describe your grievance"
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-600">Remedial Action (Optional)</label>
            <textarea
              name="remedialAction"
              value={formData.remedialAction}
              onChange={handleChange}
              placeholder="Remedial Action (If Any)"
              className="w-full p-2 border rounded"
            ></textarea>
          </div>


          <div>
            <label className="block text-gray-600">
              * Have you earlier lodged the grievance to the above Department on the same subject?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="previousGrievance"
                    value={option}
                    checked={formData.previousGrievance === option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full bg-green-800 text-white py-2 rounded mt-6 hover:bg-green-900">
          Submit Grievance
        </button>
      </form>
    </div>
  );
};

export default GrievanceForm;