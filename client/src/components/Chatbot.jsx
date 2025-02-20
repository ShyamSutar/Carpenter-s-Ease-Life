import { useState, useEffect, useRef } from "react";
import { MessageSquare, X } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", text: "Hello how can I help you?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const chatBoxRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const userRole = "mistry";

  const getSystemInstruction = (role) => {
    switch (role) {
      case "Mistry":
        return `
          You are assisting a **Mistry (Site Manager)**. Provide relevant responses:
          - "How do I create a new site?"
          - "Show me the plywood received for Site A."
          - "Mark Carpenter Raj as 'Half-day' for today."
        `;
      case "Dealer":
        return `
          You are assisting a **Plywood/Hardware Dealer**. Provide relevant responses:
          - "How do I accept a site request?"
          - "List all pending plywood delivery requests."
          - "Update the status of hardware sent to Site B."
        `;
      case "Carpenter":
        return `
          You are assisting a **Carpenter**. Provide relevant responses:
          - "What is my attendance status this month?"
          - "Show me plywood details for my site."
        `;
      case "Client":
        return `
          You are assisting a **Client**. Provide relevant responses:
          - "How much plywood was used at Site X?"
          - "Show me the total expenses for this month."
        `;
      default:
        return "You are a general assistant. Ask how you can help!";
    }
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: getSystemInstruction(userRole), // Dynamic instruction
  });

  const generationConfig = {
    temperature: 1.9,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  // useEffect(() => {
  //   if (chatBoxRef.current) {
  //     chatBoxRef.current.scrollTop = 0; // Changed from scrollHeight to 0
  //   }
  // }, [messages]);

  const formatResponse = (response) => {
    return response
      .split("\n")
      .map((line) => {
        if (line.trim().startsWith("*")) {
          const content = line.trim().substring(1).trim();
          const formattedContent = content
            .replace(/`([^`]+)`/g, "<code>$1</code>")
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
          return `<li>${formattedContent}</li>`;
        }

        if (line.trim() === "") {
          return "<br/>";
        }

        const formattedLine = line
          .replace(/`([^`]+)`/g, "<code>$1</code>")
          .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        return `<p>${formattedLine}</p>`;
      })
      .join("");
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) return; // Prevent empty messages

    const userMessage = { role: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Add "..." to indicate that the chatbot is typing
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "model", text: "..." }]);

    try {
      const chatHistory = messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        }));

      const chatSession = model.startChat({
        generationConfig,
        history: [
          ...chatHistory,
          { role: "user", parts: [{ text: inputText }] },
        ],
      });

      const result = await chatSession.sendMessage(inputText);

      if (result && result.response) {
        const responseText = await result.response.text();
        const formattedResponse = formatResponse(responseText);

        setMessages((prev) => [
          ...prev.slice(0, -1), // Remove "..."
          { role: "model", text: formattedResponse },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove "..."
        {
          role: "system",
          text: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false); // Stop loading
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
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
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
                  <div className="message-content">
                    {msg.text === "..." ? (
                      <span className="loading-dots">...</span> // Apply animation class
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      ></span>
                    )}
                  </div>
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
