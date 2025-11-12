import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm ChemLearn AI — Ask me anything about chemistry!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages([...messages, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "🤖 Sorry, I didn’t understand that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ AI server is unavailable. Try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white p-4 rounded-full shadow-lg hover:shadow-xl z-50"
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl border border-[#90e0ef]/50 flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
              <span className="font-semibold">ChemLearn AI Assistant</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ✖
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-gray-800 self-end ml-auto"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="text-blue-500 text-sm italic">Thinking...</div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-3 flex">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:ring-1 focus:ring-[#00b4d8] outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white px-3 py-2 rounded-full text-sm hover:shadow-md"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
