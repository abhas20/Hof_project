import React, { useState } from "react";
import {Link} from 'react-router-dom'
import { postLoginData } from "../api/Postapi";

const LoginPage = () => {
  const [isSucces, setIsSuccess] = useState(false);
  const [text,setText]=useState('');
   const [formData, setFormData] = useState({
        name:'',
        email:'', 
        password:''
      })
      
      const addData = async () => {
        try {
          const res = await postLoginData(formData);
          console.log(res);
          setIsSuccess(true);
          setText(res.data.message + "!!!");
        } catch (error) {
          console.error(error);
          if (error.response) {
            setIsSuccess(false);
            setText("Login failed: Try again !!!");
          } else if (error.request) {
            setText("Login failed: No response from server");
          } else {
            setText("Login failed: " + error.message);
          }
        }
      };
    setTimeout(() => {
          setText(""); // Clears the text
        }, 8000);
      
    const handleChange=(e)=>{
      const {name,value} = e.target;
      setFormData({...formData,[name]:value})
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        addData();
        console.log("Form Submitted:", formData);
      };

  return (
    <div className="font-sans">
      <div className=" bg-red-300 flex justify-center">
        <p className={`font-sans absolute text-2xl ${isSucces? 'text-green-500':'text-red-600'} top-30`}>{text}</p>
      </div>

      {/* Main Container */}
      <div className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-6 mt-12">
        <div className="flex flex-col lg:flex-row w-full max-w-4xl rounded-lg bg-white shadow-xl overflow-hidden">
          {/* Left Section - Hidden on Small Screens */}
          <div className="hidden lg:flex w-1/2 p-10 flex-col items-center justify-center bg-green-50">
            <img
              src="https://plus.unsplash.com/premium_vector-1682302934485-6d593c4020c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGlkZWF8ZW58MHx8MHx8fDA%3D"
              alt="Samadhan 2.0"
              className="w-44 sm:w-64"
            />
            <h2 className="text-2xl font-bold text-gray-700 mt-4">Samadhan 2.0</h2>
            <p className="text-center text-gray-600 mt-2">
              Unleash Your Academic Success with Exam Mastery Hub’s Platform.
            </p>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="mt-2 text-gray-600">Enter your credentials to access your account.</p>
            <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                type="text"
                placeholder="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border px-4 py-2 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="mt-4 text-right">
              <Link to="/" className="text-sm text-green-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button className="mt-6 w-full rounded-md bg-green-800 py-2 text-white hover:bg-green-600">
              Sign in
            </button>
            </form>

            <div className="mt-4 flex items-center justify-center">
              <div className="h-px w-full bg-gray-300"></div>
              <span className="px-4 text-gray-500">or</span>
              <div className="h-px w-full bg-gray-300"></div>
            </div>

            <button className="mt-4 flex w-full items-center justify-center rounded-md border py-2 hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                alt="Google Logo"
                className="mr-2 h-5 w-5"
              />
              Sign in with Google
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Are you new?{" "}
              <a href="#" className="text-green-800 hover:underline">
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;