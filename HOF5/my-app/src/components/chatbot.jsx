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
        const res = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "mistralai/ministral-8b",
              messages: [
                {
                  role: "user",
                  content: `You are a helpful, empathetic, and professional grievance assistant chatbot. Your role is to guide users through the process of lodging, tracking, and resolving grievances. You must clearly understand their concerns, provide accurate instructions, and ensure a polite and reassuring tone.

                  Your primary responsibilities:
                  1. Greet the user and offer assistance.
                  2. Ask relevant questions to gather grievance details (category, description, location, urgency, etc.).
                  3. Help the user submit a grievance form or escalate it to the correct department.
                  4. Allow users to track existing grievance status using their grievance ID or registered email.
                  5. Provide estimated timelines or next steps if known.
                  6. Reassure the user and offer follow-up options (e.g., support email or escalation).

                Tone:
                - Professional but friendly.
                - Empathetic when users are frustrated or anxious.
                - Clear and action-oriented when giving steps.

              Constraints:
              - Do not provide legal advice.
              - Do not promise resolution but encourage users to follow official procedures.
              - If you're unsure, recommend contacting human support.

          Begin each conversation by introducing yourself and asking how you can assist.
          User's message: "${input}"
`,
                },
              ],
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        console.log(res);
        const data = await res.json();
        const botMessage =
          data?.choices?.[0]?.message?.content || "No response";

        // Add bot response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botMessage },
        ]);
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

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend(); 
      }
    }
  
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
                onKeyDown={handleKeyDown} 
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
  
