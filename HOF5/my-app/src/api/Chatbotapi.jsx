import axios from "axios";

const KEY=import.meta.env.SECRET_KEY;
const URL=import.meta.env.MODEL_URL;

export const chatBot = async (text) => {
    try {
      // Prepare the request body
      const requestBody = {
        model: "mistralai/ministral-8b",  
        messages: [
          {
            role: "user", 
            content: text, 
          },
        ],
      };
  
      // Send the POST request
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",  
        {
          headers: {
            "Authorization": `Bearer ${KEY}`, 
            "Content-Type": "application/json",
          },
        }
        ,requestBody
      );
  
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error during the chat request:", error);
      throw error; 
    }
  };