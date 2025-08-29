import React, { useState, useRef, useEffect } from "react";
import {
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiX,
  FiPaperclip,
  FiImage,
  FiChevronRight,
} from "react-icons/fi";
import { CiChat1 } from "react-icons/ci";

// FAQ data organized by categories
const FAQ_CATEGORIES = {
  "Basic": [
    "What is Mehraz?",
    "I want to build a home. Which service should I use?"
  ],
  "Fast Homes (All In One Solution For a Home)": [
    "What do I get with Fast Homes?",
    "How does the Fast Homes process work on the site?",
    "Can I request changes to the design?",
    "Do I really get the materials and furniture with Fast Homes?",
    "How do I track progress and get my files?",
    "Do you help me build sustainably?"
  ],
  "Get Materials & Furniture": [
    "How do I order materials on Mehraz.pk?",
    "What kind of materials can I find here?",
    "Can I sort materials by price or quality?",
    "Do you deliver materials anywhere in Pakistan?",
    "What happens if my chosen material is out of stock?",
    "What if I need bulk quantities or wholesale rates?"
  ],
  "Find the Right Property": [
    "Can Fast Homes include property help?",
    "I only need property help. How does that work?"
  ],
  "Guidance & Support": [
    "I'm a homeowner—how do I get guided properly?",
    "How do I schedule a call?",
    "Do you use WhatsApp?",
    "Should I set my location?"
  ],
  "Work with Us": [
    "I supply materials. How do I partner with Mehraz?",
    "How do I earn as an architect / designer through Mehraz?",
    "I want to apply for a job or as a contractor/labour/sales/marketing/other. How?"
  ]
};

const FAQ_RESPONSES = {
  "What is Mehraz?": "Mehraz is an all-in-one platform for building a home in Pakistan. You can: Fast Homes (all-in-one, quickest path), Materials (order professionally rated construction materials), High Custom (for very different/unique projects), and Property (consultation to help find the right land/property).",
  "I want to build a home. Which service should I use?": "Use Fast Homes in almost all cases. It's the all-in-one quick solution: design → changes → blueprints → materials/furniture → (optional) construction → (optional) property help.",
  "What do I get with Fast Homes?": "You get: 1) 3D experience of your chosen home, 2) Final construction blueprints & technical plans, 3) Sustainability guideline, 4) High-quality materials & furniture, 5) Optional property assistance and/or construction with trusted teams.",
  "How does the Fast Homes process work on the site?": "1) Select your design (see it in 3D), 2) Tell us what you want included, 3) Payment: pay in full or advance, 4) Tracking: log in to see progress, 5) Delivery: download blueprints and proceed with materials/construction.",
  "Can I request changes to the design?": "Yes. Choose a design → Request changes (layout, rooms, finishes, facade) → We revise and show updated views → You confirm → We issue final construction-ready blueprints.",
  "Do I really get the materials and furniture with Fast Homes?": "Yes — you get to buy the best, high-quality materials and furniture matched to your design through Mehraz. They're professionally rated so what you build looks and performs like what you saw.",
  "How do I track progress and get my files?": "Use Already a Client → log in with name & number → Continue Project to view the timer, chat, payment status, and download your final blueprints when ready.",
  "Do you help me build sustainably?": "Yes. Every Fast Home includes a sustainability guideline—practical steps for energy efficiency, durability, and comfort for your family's long future.",
  "How do I order materials on Mehraz.pk?": "Go to Buy Materials button on homepage. The process is: 1) Confirm location, 2) Choose sorting, 3) Search/filter, 4) Pick materials, 5) Add to cart, 6) Confirm delivery, 7) Payment, 8) Track everything.",
  "What kind of materials can I find here?": "We cover everything: Construction Materials (cement, steel, bricks), Finishes (tiles, paint, doors, lighting), Furniture (indoor + outdoor), Landscape (plants, paving, accessories).",
  "Can I sort materials by price or quality?": "Yes. You can sort by price (Low → High, High → Low), rating colors, or by category. This way you're always in control of your budget and preferences.",
  "Do you deliver materials anywhere in Pakistan?": "Yes ✅. As long as you confirm your location at the start, we'll handle the logistics. You'll only see items available in your city.",
  "What happens if my chosen material is out of stock?": "We'll notify you immediately. You can: Switch to a close alternative, Wait for restock, or Cancel & refund that item. Your project is never left hanging.",
  "What if I need bulk quantities or wholesale rates?": "For large volumes, our team will contact you directly to ensure smooth delivery and rates. Standard rates appear on site but can be negotiated.",
  "Can Fast Homes include property help?": "Yes. When starting Fast Homes, tell us you also need property. We add property consultation to your project and coordinate with local agents.",
  "I only need property help. How does that work?": "Click Buy Property on homepage. Share your needs → pay consultation fee → we shortlist with trusted agents → meet (3+ days later) → proceed with property options.",
  "I'm a homeowner—how do I get guided properly?": "We provide clear guides on choosing designs, planning budgets, selecting materials, and building sustainably. Use Mehraz Blogs or our Fast Homes service for practical guidance.",
  "How do I schedule a call?": "Click the Meet icon (top bar), pick a time, submit details. For property, choose a slot 3+ days later so we can prepare.",
  "Do you use WhatsApp?": "Yes—please use a number with WhatsApp for faster updates. Alternatively, you can WhatsApp us at +92-325-8181842.",
  "Should I set my location?": "Yes—use the location icon (top bar) so services and deliveries align with your city.",
  "I supply materials. How do I partner with Mehraz?": "Go to Work With Us → Be a Material Supplier, read the details, then contact us as instructed there.",
  "How do I earn as an architect / designer through Mehraz?": "Go to Work With Us → Be a Partner Architect, read the details, and follow the submission steps there.",
  "I want to apply for a job or as a contractor/labour/sales/marketing/other. How?": "Go to Work With Us → Apply at Mehraz and submit your details."
};

// Utility function to format time consistently
const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

const AnimatedChatbot = ({ isOpen = false, onToggle }) => {
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [showFAQ, setShowFAQ] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const messagesEndRef = useRef(null);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

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
    setSelectedCategory(null);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Thank you for your message. Our team will get back to you shortly. Is there anything else I can help you with?";

      // Check if it's an FAQ question
      if (FAQ_RESPONSES[textToSend]) {
        botResponse = FAQ_RESPONSES[textToSend];
      } else {
        // Simple keyword matching for common queries
        const lowerText = textToSend.toLowerCase();
        if (lowerText.includes("price") || lowerText.includes("cost")) {
          botResponse = "Pricing varies based on your specific needs and requirements. We'd be happy to provide a customized quote after understanding your project better.";
        } else if (lowerText.includes("meeting") || lowerText.includes("schedule")) {
          botResponse = "You can schedule a meeting by clicking the 'SCHEDULE A CALL' button in the chat header. Our team will get back to you within 24 hours.";
        } else if (lowerText.includes("hours") || lowerText.includes("time")) {
          botResponse = "We're available Monday to Friday, 9:00 AM to 6:00 PM (EST). For urgent matters, you can leave a message and we'll respond as soon as possible.";
        } else if (lowerText.includes("support") || lowerText.includes("help")) {
          botResponse = "You can reach our support team through this chat, email us at support@mehraz.pk, or WhatsApp us at +92-325-8181842.";
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const toggleChat = () => {
    onToggle(!isOpen);
    if (!isOpen) {
      // Reset to show FAQ when opening
      setTimeout(() => {
        setShowFAQ(true);
        setSelectedCategory(null);
      }, 500);
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
    setSelectedCategory(null);
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
                className="text-white text-base border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-gray-800 transition-all duration-200">
                END CHAT
              </button>
            </div>

            {/* Right: Schedule + Icons */}
            <div className="flex items-center gap-4 text-lg">
              <span className="cursor-pointer text-white hover:underline font-medium">
                SCHEDULE A CALL
              </span>
              <FiPhone
                size={24}
                className="text-white cursor-pointer hover:text-blue-300 transition-colors"
                title="Call History"
              />
            </div>
          </div>

          {/* Messages Container */}
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
        {isClient ? formatTime(msg.timestamp) : ""}
      </div>
    </div>
  ))}

  {/* FAQ Quick Responses */}
  {showFAQ && messages.length === 1 && (
    <div className="space-y-3 mt-4">
      {!selectedCategory ? (
        // Show categories
        <div className="space-y-3">
          {Object.keys(FAQ_CATEGORIES).map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="w-3/5 text-left p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm flex items-center justify-between group">
              <span>{category}</span>
              <FiChevronRight
                className="text-gray-400 group-hover:text-blue-500 transition-colors"
                size={16}
              />
            </button>
          ))}
        </div>
      ) : (
        // Show questions for selected category
        <div className="space-y-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-blue-600 text-sm hover:text-blue-800 font-medium mb-2 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to categories
          </button>
          <div className="text-sm font-medium text-gray-600 px-2 mb-3">
            {selectedCategory}:
          </div>
          {FAQ_CATEGORIES[selectedCategory].map((question, index) => (
            <button
              key={index}
              onClick={() => handleFAQClick(question)}
              className="w-3/5 text-left p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm flex items-center justify-between group">
              <span>{question}</span>
              <FiChevronRight
                className="text-gray-400 group-hover:text-blue-500 transition-colors"
                size={16}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )}

  <div ref={messagesEndRef} />
</div>

{/* More Questions Footer (replacing delay message) */}
<div className="text-center">
  <button
    onClick={() => {
      setShowFAQ(true);
      setSelectedCategory(null);
    }}
    className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 mx-auto">
    More Questions
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  </button>
</div>

{/* Message Input */}
<div className="bg-transparent p-4">
  <div className="flex items-center gap-3">
    {/* Input Container */}
    <div className="relative bg-white flex-1 flex items-center border border-gray-300 rounded-full px-4 py-2 gap-3 shadow-sm">
      {/* Emoji - Larger, No Border */}
      <button
        className="text-gray-500 hover:text-blue-500 transition-colors text-2xl"
        title="Emoji">
        ☺
      </button>

      {/* Input Field */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="TYPE HERE..."
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
    </div>
    </div>



        </div>
      </div>
    </>
  );
};

export default AnimatedChatbot;