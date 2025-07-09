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
<div className="w-1/2 flex flex-col" style={{ backgroundColor: "#f4f4f4" }}>
  {/* Header */}
  <div
    className="flex items-center justify-between px-4 py-3"
    style={{ backgroundColor: "#2d2d2d", color: "#fff" }}
  >
    {/* Left: Arrow + End Chat */}
    <div className="flex items-center gap-3">
      <button className="bg-[#3A3A3A] p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <button className="text-white text-sm border border-white px-4 py-1 rounded-md font-medium hover:bg-white hover:text-black transition">
        END CHAT
      </button>
    </div>

    {/* Right: Schedule + Icons */}
    <div className="flex items-center gap-4 text-sm">
      <span className="cursor-pointer text-white hover:underline">SCHEDULE A CALL</span>
      <FiPhone size={18} className="text-white cursor-pointer" title="Call History" />
      <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 12c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
      </svg>
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
            : "bg-white self-start mr-auto"
        }`}
      >
        {msg.text}
      </div>
    ))}
  </div>

  {/* Message Input */}
{/* Message Input */}
<div className="bg-white p-3 flex items-center justify-between gap-2 rounded-t-xl shadow-inner">
  {/* Input Container with Emoji, Input, Attachments & Camera */}
  <div className="relative flex-1 flex items-center border border-gray-300 rounded-full px-3 py-2 gap-2">
    {/* Emoji (left inside input) */}
    <button className="text-gray-500 hover:text-blue-500" title="Emoji">
      😊
    </button>

    {/* Typing Field */}
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      placeholder="Type here..."
      className="flex-1 text-sm border-none outline-none bg-transparent"
    />

    {/* Attachment Icon (inside input) */}
    <button className="text-gray-500 hover:text-blue-500" title="Attach File">
      <FiPaperclip size={18} />
    </button>

    {/* Image Icon (inside input) */}
    <button className="text-gray-500 hover:text-blue-500" title="Attach Image">
      <FiImage size={18} />
    </button>
  </div>

  {/* Mic Icon (outside input) */}
  <button
    className="text-gray-700 hover:text-blue-600 border border-gray-400 rounded-full p-2"
    title="Voice Message"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-[16px] w-[16px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a4 4 0 004-4V7a4 4 0 00-8 0v3a4 4 0 004 4zm0 0v4m0 0H9m3 0h3" />
    </svg>
  </button>
</div>

</div>

    </div>
  );
}
