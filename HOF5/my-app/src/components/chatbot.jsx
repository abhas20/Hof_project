import React, { useState } from "react";
import { chatBot } from "../api/Chatbotapi";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
      { sender: "bot", text: "Hello! How can I help you?" },
    ]);
    const [input, setInput] = useState("");
    const KEY=import.meta.env.VITE_SECRET_KEY;
  
    const toggleChatbot = () => setIsOpen(!isOpen);
  
    const handleSend = async () => {
      if (input.trim() === "") return;
  
      // Add user message to the chat
      setMessages(prevMessages => [...prevMessages, { sender: "user", text: input }]);
      setInput(""); // Clear input field
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "mistralai/ministral-8b",
            "messages": [
              {
                "role": "user",
                "content": input
              }
            ]
          })
        });
  
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log(res.status);
        const data = await res.json();
        const botMessage = data?.choices?.[0]?.message?.content || "No response";
        
        // Add bot response to the chat
        setMessages(prevMessages => [...prevMessages, { sender: "bot", text: botMessage }]);
      } catch (error) {
        // Log error for debugging
        console.error("Error fetching from OpenRouter API", error);
  
        // Handle the API error by showing a default error message
        setMessages(prevMessages => [
          ...prevMessages,
          {
            sender: "bot",
            text: "Sorry, there was an issue with processing your request. Please try again later.",
          },
        ]);
      }
    };
  
    return (
      <div className="fixed bottom-4 right-4">
        {/* Chatbot Button */}
        <button
          onClick={toggleChatbot}
          className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          {isOpen ? "Close Chat" : "Chat with Us"}
        </button>
  
        {/* Chatbot Box */}
        {isOpen && (
          <div className="w-80 h-96 bg-white shadow-lg rounded-lg mt-2 p-4 flex flex-col border border-gray-300">
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 ${msg.sender === "bot" ? "text-left text-green-700" : "text-right text-blue-700"}`}
                >
                  <span className={`inline-block p-2 rounded-md ${msg.sender === "bot" ? "bg-green-200" : "bg-blue-200"}`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border rounded-l-md focus:outline-none"
                placeholder="Type a message..."
              />
              <button onClick={handleSend} className="bg-green-600 text-white px-4 py-2 rounded-r-md">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Chatbot;
  
