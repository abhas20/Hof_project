import React, { useState } from "react";

const FAQContactUs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", categories: [] });

  const faqs = [
    {
      question: "What is the purpose and objectives of the Grievance Redressal platform portal?", 
      answer: "The portal provides convenience to citizens by allowing them to lodge grievances online without physical visits."
    },
    {
      question: "What kind of grievances can I post?",
      answer: "Any grievances related to Government office functioning in the State can be filed."
    },
    {
      question: "Where can I track the grievances already submitted by me?",
      answer: "Log into your profile and check the 'Track Grievance Status' tab."
    },
    {
      question: "Is there any mechanism to provide feedback about the quality of resolution provided for my grievance?",
      answer: "Yes. You have the option to rate each grievance as either 'Satisfied' or 'Dissatisfied'. You can also provide comments to justify your rating."
    },
    {
      question: "I have a question that was not answered in this FAQ. What should I do?",
      answer: "You can get in touch with us through the 'Contact Us' section."
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) =>
      type === "checkbox"
        ? { ...prev, categories: checked ? [...prev.categories, value] : prev.categories.filter((cat) => cat !== value) }
        : { ...prev, [name]: value }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  return (
    <div className="font-sans bg-white min-h-screen pt-28">
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto p-6 bg-green-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-green-700 mb-6">FAQ's</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              className="w-full text-left py-3 px-4 text-lg font-semibold flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span className="text-green-500 text-2xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && <div className="px-4 pb-3 text-gray-700">{faq.answer}</div>}
          </div>
        ))}
      </div>

      {/* Contact Us Section */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white p-6 pt-10 w-11/12 md:w-4/5 lg:w-3/4 mx-auto">
        <div className="w-full md:w-1/3 bg-white p-6 md:p-8 rounded-lg text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold">Get in Touch</h2>
          <p className="mt-2 text-gray-600 text-lg">We are here to help. Let us know your concerns.</p>
          <div className="mt-6 space-y-4 text-left">
            <div className="flex items-center space-x-4">
              <span className="text-xl">📧</span>
              <p className="text-gray-700">support@samadhan.com</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xl">📍</span>
              <p className="text-gray-700">123 Street, Lucknow, UP, India</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xl">📞</span>
              <p className="text-gray-700">+91 9876543210</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex justify-center mt-6 md:mt-0">
          <div className="max-w-4xl mx-auto p-6 bg-green-100 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center text-green-800">Got Questions? Let’s Talk.</h2>
            <p className="mt-2 text-green-800 text-center">Tell us more about yourself and your concerns.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <textarea name="message" placeholder="Tell us about your issue..." value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-md" required></textarea>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-900">
                {["Technical Issue", "Feedback", "Grievance Tracking", "Other"].map((option) => (
                  <label key={option} className="flex items-center">
                    <input type="checkbox" value={option} onChange={handleChange} className="mr-2" /> {option}
                  </label>
                ))}
              </div>
              <button type="submit" className="bg-green-800 text-white px-6 py-3 mt-4 rounded-md w-full">Submit Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQContactUs;
