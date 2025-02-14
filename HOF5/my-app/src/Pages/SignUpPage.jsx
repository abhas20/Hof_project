import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { postUserData } from "../api/Postapi";

const SignupPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text,setText]=useState('')
    const [formData, setFormData] = useState({
      name:'', 
      email:'', 
      password:''
    })

    const addData =async ()=>{
      const res=await postUserData(formData);
      console.log(res);
      setText("Signed Up Successfully !!!")
     
   };

    const handleSubmit = (e) => {
      e.preventDefault();
      addData();
      console.log("Form Submitted:", formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

  return (
    <div className="font-sans">

      {/* Main Container */}
      <div className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-6 mt-13">
      <p className="font-sans absolute text-2xl text-green-500 top-30">{text}</p>
        <div className="flex flex-col lg:flex-row w-full max-w-4xl rounded-lg bg-white shadow-xl overflow-hidden">
          {/* Left Section - Signup Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="mt-2 text-gray-600">Join us by creating a new account.</p>
            <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-600">Full Name</label>
              <input type="text" placeholder="name" name="name" value={formData.name} onChange={handleChange} className="mt-2 w-full rounded-md border px-4 py-2 focus:border-green-500 focus:ring-green-500" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">Email</label>
              <input type="email" placeholder="email" name="email" value={formData.email} onChange={handleChange} className="mt-2 w-full rounded-md border px-4 py-2 focus:border-green-500 focus:ring-green-500" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">Password</label>
              <input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} className="mt-2 w-full rounded-md border px-4 py-2 focus:border-green-500 focus:ring-green-500" />
            </div>
            <button className="mt-6 w-full rounded-md bg-green-500 py-2 text-white hover:bg-green-600">Sign up</button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="text-green-500 hover:underline">Sign in</Link></p>
          </div>
          {/* Right Section - Image */}
          <div className="hidden lg:flex w-1/2 p-10 flex-col items-center justify-center bg-green-50">
            <img src="https://plus.unsplash.com/premium_vector-1682302934485-6d593c4020c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGlkZWF8ZW58MHx8MHx8fDA%3D" alt="Samadhan 2.0" className="w-44 sm:w-64" />
            <h2 className="text-2xl font-bold text-gray-700 mt-4">Samadhan 2.0</h2>
            <p className="text-center text-gray-600 mt-2">Unleash Your Academic Success with Exam Mastery Hub’s Platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;