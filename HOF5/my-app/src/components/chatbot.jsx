import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hello! How can I help you?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simple bot response (You can integrate an AI later)
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Thank you for your query! Our team will assist you soon.", sender: "bot" }]);
    }, 1000);
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
              <div key={index} className={`p-2 ${msg.sender === "bot" ? "text-left text-green-700" : "text-right text-blue-700"}`}>
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
