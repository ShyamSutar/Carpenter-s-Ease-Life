import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="h-64 sm:h-72 overflow-y-auto p-2">
            <p className="text-gray-500 text-sm">How can we help you?</p>
          </div>

          {/* Input Field */}
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
