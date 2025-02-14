import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaFileAlt,
  FaChartBar,
  FaClipboardCheck,
  FaRobot,
  FaUniversity,
  FaCheckCircle,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    { title: "Register/Login", icon: <FaUser className="text-green-600 text-5xl mx-auto" aria-label="Register/Login" /> },
    { title: "Submit Grievance", icon: <FaFileAlt className="text-blue-600 text-5xl mx-auto" aria-label="Submit Grievance" /> },
    { title: "AI Categorization", icon: <FaRobot className="text-purple-600 text-5xl mx-auto" aria-label="AI Categorization" /> },
    { title: "Govt Action", icon: <FaUniversity className="text-yellow-600 text-5xl mx-auto" aria-label="Govt Action" /> },
    { title: "Track & Resolve", icon: <FaCheckCircle className="text-red-600 text-5xl mx-auto" aria-label="Track & Resolve" /> },
  ];

  return (
    <div className="font-sans">
      <div className="pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16 flex items-center">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 flex justify-center">
              <img src="/image copy.png" alt="Hero" className="w-4/5 max-w-3xl" loading="lazy" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-green-800">Fast & Efficient Grievance Redressal</h2>
              <p className="mt-4 text-gray-700">
                Submit your grievances and track them seamlessly with our AI-powered system.
              </p>
              <Link to="/lodgeg" className="mt-6 inline-block bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800">
                Submit a Grievance
              </Link>
            </div>
          </div>
        </section>

        {/* Process Flow Section */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-800 text-center">Grievance Redressal Process</h3>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  {step.icon}
                  <h4 className="text-lg font-semibold mt-2">{step.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800">Platform Insights</h3>
          <div className="flex justify-center mt-6 space-x-8">
            <div className="text-center">
              <FaChartBar className="text-green-700 text-5xl mx-auto"/>
              <h4 className="text-xl font-semibold mt-2">10,000+</h4>
              <p className="text-gray-600">Grievances Resolved</p>
            </div>
            <div className="text-center">
              <FaClipboardCheck className="text-green-700 text-5xl mx-auto"/>
              <h4 className="text-xl font-semibold mt-2">5,000+</h4>
              <p className="text-gray-600">Cases in Progress</p>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p>Email: <a href="mailto:support@igrs.com" className="underline">support@igrs.com</a></p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 GovTech Street, City, Country</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/lodge" className="hover:underline">Lodge Grievance</Link></li>
              <li><Link to="/track" className="hover:underline">Track Grievance</Link></li>
              <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            </ul>
          </div>
          <div className="flex justify-center space-x-4">
            <FaFacebookF className="text-2xl hover:text-gray-300" />
            <FaTwitter className="text-2xl hover:text-gray-300" />
            <FaInstagram className="text-2xl hover:text-gray-300" />
            <FaLinkedinIn className="text-2xl hover:text-gray-300" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;