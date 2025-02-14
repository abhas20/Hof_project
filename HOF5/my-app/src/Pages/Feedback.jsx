import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { postfeedbackData } from "../api/Postapi";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState({ text: "",category: "" });

  const categories = ["User Experience", "Technical Issue", "Resolution Quality", "Feature Request"];

  const feedbacks = [
    { name: "Amit Sharma", review: "The grievance redressal process was seamless and very efficient!" },
    { name: "Priya Verma", review: "Really helpful platform. My issue was resolved within a few days." },
    { name: "Rahul Mehta", review: "User-friendly interface and quick response from authorities." },
    { name: "Sneha Kapoor", review: "A great initiative! Transparency and accountability at its best." },
  ];
  const addData=async()=>{
    const res=await postfeedbackData(feedback)
    console.log(res)

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
    alert("Feedback Submitted Successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 ">
      <div className="w-full max-w-2xl bg-green-100 shadow-lg rounded-lg p-6 mt-20">
        <h2 className="text-3xl font-bold text-green-800 text-center">We Value Your Feedback</h2>
        <p className="text-center text-gray-600">Help us improve by sharing your thoughts.</p>
        
        {/* Rating Section */}
        <div className="flex justify-center space-x-2 mt-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} size={30} className={star <= rating ? "text-yellow-500" : "text-gray-300"} onClick={() => setRating(star)} />
          ))}
        </div>
        
        {/* Category Selection */}
        <label className="block mt-4 text-gray-700 font-semibold">Select Category:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={feedback.category}
          onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
        >
          <option value="">-- Choose a category --</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
        
        {/* Feedback Text */}
        <label className="block mt-4 text-gray-700 font-semibold">Your Feedback:</label>
        <textarea
          className="w-full p-3 border rounded-md"
          placeholder="Tell us more..."
          value={feedback.text}
          onChange={(e) => setFeedback({ ...feedback, text: e.target.value })}
          required
        ></textarea>
        
        {/* Follow-Up Option */}
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={feedback.followUp}
              onChange={() => setFeedback({ ...feedback, followUp: !feedback.followUp })}
              className="mr-2"
            />
            Would you like us to follow up?
          </label>
        </div>
        
        {feedback.followUp && (
          <input
            type="email"
            className="w-full p-2 border rounded-md mt-2"
            placeholder="Enter your email"
            
          />
        )}
        
        {/* Submit Button */}
        <button className="w-full bg-green-800 text-white p-3 mt-4 rounded-md" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>

      {/* Feedback Carousel */}
      <div className="max-w-3xl w-full mt-10">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">What Users Say About Us</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="rounded-lg shadow-lg"
        >
          {feedbacks.map((feedback, index) => (
            <SwiperSlide key={index} className="bg-green-100 p-6 rounded-lg text-center">
              <p className="text-gray-800 text-lg italic">"{feedback.review}"</p>
              <h3 className="mt-4 text-green-700 font-semibold">{feedback.name}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeedbackPage;
