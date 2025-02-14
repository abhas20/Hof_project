import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[85%] bg-green-100 shadow-lg rounded-full px-6 py-2 flex justify-between items-center z-50">
      {/* ✅ Logo */}
      <h1 className="text-green-700 text-2xl font-bold whitespace-nowrap">
        SAMADHAN 2.0
      </h1>

      {/* ✅ Desktop Menu (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
        <Link to="/lodgeg" className="text-gray-700 hover:text-green-600">Lodge Grievance</Link>
        <Link to="/track" className="text-gray-700 hover:text-green-600">Track Grievance</Link>
        <Link to="/faq" className="text-gray-700 hover:text-green-600">FAQ's</Link>
        <Link to="/feedback" className="text-gray-700 hover:text-green-600">Feedback</Link>
      </div>

      {/* ✅ Login & Signup (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-4">
        <Link to="/login" className="px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-200">Login</Link>
        <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">Sign up</Link>
      </div>

      {/* ✅ Mobile Menu Button (Visible on Small Screens) */}
      <button 
        className="text-green-700 text-2xl md:hidden focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* ✅ Mobile Menu (Only visible when isOpen is true) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-100 shadow-lg py-4 flex flex-col items-center space-y-4 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-green-600">Home</Link>
          <Link to="/lodgeg" className="text-gray-700 hover:text-green-600">Lodge Grievance</Link>
          <Link to="/track" className="text-gray-700 hover:text-green-600">Track Grievance</Link>
          <Link to="/faq" className="text-gray-700 hover:text-green-600">FAQ's</Link>
          <Link to="/contactus" className="text-gray-700 hover:text-green-600">Contact Us</Link>
          <Link to="/login" className="px-4 py-2 border rounded-xl text-gray-700 hover:bg-gray-200">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800">Sign up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;