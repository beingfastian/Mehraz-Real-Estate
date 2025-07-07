"use client";

import { FiMessageSquare, FiSend, FiPhone, FiX, FiPaperclip, FiImage } from "react-icons/fi";
import { useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import Image from "next/image";

export default function ChatSupportPage() {
  const [messages, setMessages] = useState([
    { from: "recipient", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] w-full overflow-hidden">
      {/* Left : Homepage Hero */}
      <div className="w-1/2 bg-white p-8 overflow-hidden pt-[2rem]">
        <HeroBanner />
        {/* Rounded Image below Hero */}
        <div className="mt-12 rounded-2xl overflow-hidden shadow-md relative w-full h-[250px]">
          <Image
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80"
            alt="Decorative"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right : Chat support */}
      <div className="w-1/2 bg-gray-50 flex flex-col border-l border-gray-300">
        {/* Header */}
{/* Header */}
<div className="flex items-center justify-between px-4 py-3 border-b bg-white">
  <div className="flex items-center gap-2">
    <FiMessageSquare size={20} className="text-gray-700" />
    <h2 className="text-lg font-semibold text-gray-800">Chat Support</h2>
    <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Online</span>
  </div>
  <div className="flex gap-2">
    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2">
      <FiPhone size={16} />
    </button>
    <button className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2">
      <FiX size={16} />
    </button>
  </div>
</div>


        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                msg.from === "user"
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-gray-200 self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <button className="text-gray-500 hover:text-blue-500">
            <span role="img" aria-label="emoji">😊</span>
          </button>
          <button className="text-gray-500 hover:text-blue-500">
            <FiPaperclip size={18} />
          </button>
          <button className="text-gray-500 hover:text-blue-500">
            <FiImage size={18} />
          </button>
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
