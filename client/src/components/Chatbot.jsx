import { useState, useEffect, useRef } from "react";
import { MessageSquare, X } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", text: "Hello how can I help you?" },
  ]);
  const [inputText, setInputText] = useState("");
  const chatBoxRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `
      You are a chatbot designed to assist users with tasks related to Carpenter's Ease Life. You must provide role-based responses and follow these rules:
      - Role-Based Responses: Answer based on the user's role (Mistry, Plywood & Hardware Dealers, Carpenters, Clients).
      - Real-Time Updates: Notify users of new requests, approvals, and changes.
      - Security & Access Control: Ensure users can only access relevant data.
      - Friendly & Efficient: Keep responses clear and to the point.
      - Multi-Language Support (Optional): Provide responses in Hindi & English if needed.

      Example Queries and Responses:
      - Mistry (Site Manager):
        - "How do I create a new site?"
        - "Show me the plywood received for Site A."
        - "Mark Carpenter Raj as 'Half-day' for today."
      - Plywood & Hardware Dealers:
        - "How do I accept a site request?"
        - "List all pending plywood delivery requests."
        - "Update the status of hardware sent to Site B."
      - Carpenters:
        - "What is my attendance status this month?"
        - "Show me plywood details for my site."
      - Clients:
        - "How much plywood was used at Site X?"
        - "Show me the total expenses for this month."

      Example Conversation:
      - User (Mistry): "How do I add a plywood dealer to my site?"
      - Chatbot: "Go to ‘Manage Sites’ → Select your site → Click ‘Add Dealer’ → Enter dealer details and send a request. The dealer must accept before sending materials."
      - User (Dealer): "How do I send plywood to a site?"
      - Chatbot: "Go to ‘Site Requests’ → Accept the request → Click ‘Send Plywood’ → Enter quantity, type, and price → Confirm dispatch."

      Additional Features:
      - Notifications for material delivery, expense updates, and attendance records.
      - Guided Steps for complex actions like site creation and expense tracking.
      - Chat Support to connect users for real-time discussions.
    `,
  });

  const generationConfig = {
    temperature: 1.9,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const formatResponse = (response) => {
    return response
      .split('\n')
      .map(line => {
        if (line.trim().startsWith('*')) {
          const content = line.trim().substring(1).trim();
          const formattedContent = content
            .replace(/`([^`]+)`/g, '<code>$1</code>')  
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') 
            .replace(/\*([^*]+)\*/g, '<strong>$1</strong>'); 
          return `<li>${formattedContent}</li>`;
        }
        
        if (line.trim() === "") {
          return "<br/>";
        }

        const formattedLine = line
          .replace(/`([^`]+)`/g, '<code>$1</code>')  
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); 
        return `<p>${formattedLine}</p>`;
      })
      .join('');
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const userMessage = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      const chatHistory = messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        }));

      const chatSession = model.startChat({
        generationConfig,
        history: [...chatHistory, { role: "user", parts: [{ text: inputText }] }],
      });

      const result = await chatSession.sendMessage(inputText);

      if (result && result.response) {
        const responseText = await result.response.text();

        const formattedResponse = formatResponse(responseText);
        setMessages((prev) => [
          ...prev,
          { role: "model", text: formattedResponse },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "system", text: "Oops! Something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 max-w-[90%] sm:w-96 bg-white shadow-2xl rounded-lg border p-4">
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Chat Support</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="h-64 sm:h-72 overflow-y-auto p-2" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message mb-1 sm:mb-2 md:mb-3 p-1 sm:p-2 md:p-3 max-w-[80%] flex items-start ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-100 text-right max-w-fit"
                    : "mr-auto bg-gray-100 text-left max-w-fit flex items-start"
                }`}
              >
                <div>
                  <strong className="block font-semibold">
                    {msg.role === "user" ? "You" : "Chatbot"}:
                  </strong>
                  <div
                    className="message-content"
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <form onSubmit={sendMessage} className="mt-2 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
