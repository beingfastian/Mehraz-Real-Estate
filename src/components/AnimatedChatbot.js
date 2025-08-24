import React, { useState, useRef, useEffect } from "react";
import {
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiX,
  FiPaperclip,
  FiImage,
} from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";

// FAQ data
const FAQ_RESPONSES = {
  "How can I schedule a meeting?":
    "You can schedule a meeting by clicking the 'SCHEDULE A CALL' button in the chat header or by visiting our booking page. Our team will get back to you within 24 hours.",
  "What are your business hours?":
    "We're available Monday to Friday, 9:00 AM to 6:00 PM (EST). For urgent matters, you can leave a message and we'll respond as soon as possible.",
  "How do I contact support?":
    "You can reach our support team through this chat, email us at support@company.com, or call us at (555) 123-4567.",
  "What services do you offer?":
    "We offer a comprehensive range of services including consultation, development, design, and ongoing support. Please let us know what specific service you're interested in.",
  "How much does it cost?":
    "Pricing varies based on your specific needs and requirements. We'd be happy to provide a customized quote after understanding your project better.",
  "Can I get a demo?":
    "Absolutely! We offer free demos for all potential clients. Click 'SCHEDULE A CALL' to book your personalized demo session.",
};

const FAQ_QUESTIONS = Object.keys(FAQ_RESPONSES);

const AnimatedChatbot = ({ isOpen = false, onToggle }) => {
  // isOpen is now controlled by parent component
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [showFAQ, setShowFAQ] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (messageText = input) => {
    const textToSend = messageText || input.trim();
    if (textToSend === "") return;

    // Add user message
    const userMessage = {
      from: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setShowFAQ(false);

    // Simulate bot response
    setTimeout(() => {
      let botResponse =
        "Thank you for your message. Our team will get back to you shortly. Is there anything else I can help you with?";

      // Check if it's an FAQ question
      if (FAQ_RESPONSES[textToSend]) {
        botResponse = FAQ_RESPONSES[textToSend];
      } else {
        // Simple keyword matching for common queries
        const lowerText = textToSend.toLowerCase();
        if (lowerText.includes("price") || lowerText.includes("cost")) {
          botResponse = FAQ_RESPONSES["How much does it cost?"];
        } else if (
          lowerText.includes("meeting") ||
          lowerText.includes("schedule")
        ) {
          botResponse = FAQ_RESPONSES["How can I schedule a meeting?"];
        } else if (lowerText.includes("hours") || lowerText.includes("time")) {
          botResponse = FAQ_RESPONSES["What are your business hours?"];
        } else if (
          lowerText.includes("support") ||
          lowerText.includes("help")
        ) {
          botResponse = FAQ_RESPONSES["How do I contact support?"];
        }
      }

      const botMessage = {
        from: "bot",
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleFAQClick = question => {
    handleSend(question);
  };

  const toggleChat = () => {
    onToggle(!isOpen);
    if (!isOpen) {
      // Reset to show FAQ when opening
      setTimeout(() => setShowFAQ(true), 500);
    }
  };

  const handleEndChat = () => {
    setMessages([
      {
        from: "bot",
        text: "Hi! How can I help you today?",
        timestamp: new Date(),
      },
    ]);
    setShowFAQ(true);
    onToggle(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => onToggle(false)}
        />
      )}

      {/* Chat Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="h-full flex flex-col bg-gray-100 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 bg-gray-800 text-white">
            {/* Left: Back Arrow + End Chat */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggle(false)}
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                onClick={handleEndChat}
                className="text-white text-sm border border-white px-4 py-1 rounded-md font-medium hover:bg-white hover:text-gray-800 transition-all duration-200">
                END CHAT
              </button>
            </div>

            {/* Right: Schedule + Icons */}
            <div className="flex items-center gap-4 text-sm">
              <span className="cursor-pointer text-white hover:underline font-medium">
                SCHEDULE A CALL
              </span>
              <FiPhone
                size={18}
                className="text-white cursor-pointer hover:text-blue-300 transition-colors"
                title="Call History"
              />
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-transparent">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                  msg.from === "user"
                    ? "bg-blue-500 text-white self-end ml-auto rounded-br-md"
                    : "bg-white text-gray-800 self-start mr-auto rounded-bl-md border"
                }`}>
                <div>{msg.text}</div>
                <div
                  className={`text-xs mt-1 opacity-70 ${
                    msg.from === "user" ? "text-blue-100" : "text-gray-500"
                  }`}>
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}

            {/* FAQ Quick Responses */}
            {showFAQ && messages.length === 1 && (
              <div className="space-y-2 mt-4">
                <div className="text-sm font-medium text-gray-600 px-2">
                  Quick Questions:
                </div>
                <div className="grid gap-2">
                  {FAQ_QUESTIONS.slice(0, 4).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleFAQClick(question)}
                      className="text-left p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm">
                      {question}
                    </button>
                  ))}
                  {FAQ_QUESTIONS.length > 4 && (
                    <button
                      onClick={() => setShowFAQ(false)}
                      className="text-center p-2 text-blue-600 text-sm hover:text-blue-800 font-medium">
                      More questions...
                    </button>
                  )}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-transparent p-4">
            <div className="flex items-center gap-3">
              {/* Input Container */}
              <div className="relative bg-white flex-1 flex items-center border border-gray-300 rounded-full px-4 py-2 gap-3 bg-white shadow-sm">
                {/* Emoji */}
                <button
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  title="Emoji">
                  😊
                </button>

                {/* Input Field */}
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 text-sm border-none outline-none bg-transparent text-gray-800 placeholder-gray-400"
                />

                {/* Attachment Icons */}
                <button
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  title="Attach File">
                  <FiPaperclip size={16} />
                </button>

                <button
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                  title="Attach Image">
                  <FiImage size={16} />
                </button>
              </div>

              {/* Send/Mic Button */}
              {input.trim() ? (
                <button
                  onClick={() => handleSend()}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors shadow-md"
                  title="Send Message">
                  <FiSend size={16} />
                </button>
              ) : (
                <button
                  className="text-gray-600 hover:text-blue-600 border border-gray-300 rounded-full p-2 transition-colors bg-white shadow-sm"
                  title="Voice Message">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14a4 4 0 004-4V7a4 4 0 00-8 0v3a4 4 0 004 4zm0 0v4m0 0H9m3 0h3"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedChatbot;
