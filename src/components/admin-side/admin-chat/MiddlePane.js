"use client";

import { useEffect, useState, useRef } from "react";
import firebaseSocket from "@/socket"; // Our new Firebase socket
import {
  HiDotsVertical,
  HiPaperClip,
  HiEmojiHappy,
  HiMicrophone,
  HiPaperAirplane,
  HiInformationCircle,
  HiPhone,
  HiVideoCamera,
  HiSearch,
  HiMenu,
} from "react-icons/hi";

const staticMessages = [
  {
    id: 1,
    senderId: "user123",
    senderName: "John Doe",
    text: "Hello! How can I help you today?",
    timestamp: "10:00 AM",
    type: "text",
    status: "delivered",
  },
  {
    id: 2,
    senderId: "admin",
    senderName: "You",
    text: "Hi! I have a question about my order.",
    timestamp: "10:01 AM",
    type: "text",
    status: "read",
  },
];

export default function MiddlePane({
  selectedChat,
  currentUser,
  onToggleInfoPane,
  onToggleLeftPane,
  isMobile,
  showToast,
}) {
  const [messages, setMessages] = useState(staticMessages);
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const chatEndRef = useRef(null);
  const currentUserId = currentUser?.uid || "admin";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize Firebase socket connection
  useEffect(() => {
    const initializeSocket = async () => {
      try {
        // Initialize with current user info
        firebaseSocket.init(currentUserId, currentUser?.name || "Admin");

        // Update online status
        await firebaseSocket.updateOnlineStatus(true);
        setConnected(true);

        console.log("Firebase socket initialized successfully");
      } catch (error) {
        console.error("Error initializing Firebase socket:", error);
        showToast?.("Failed to connect to chat service", "error");
      }
    };

    initializeSocket();

    // Cleanup on component unmount
    return () => {
      firebaseSocket.updateOnlineStatus(false);
      firebaseSocket.disconnect();
      setConnected(false);
    };
  }, [currentUserId, currentUser?.name, showToast]);

  // Join chat room when selectedChat changes
  useEffect(() => {
    if (!selectedChat?.id || !connected) {
      setMessages(staticMessages);
      return;
    }

    setLoading(true);
    console.log("Joining chat room:", selectedChat.id);

    // Join the chat room and listen for messages
    const unsubscribe = firebaseSocket.joinRoom(
      selectedChat.id,
      newMessages => {
        console.log("Received messages:", newMessages);

        if (newMessages.length > 0) {
          setMessages(newMessages);
        } else {
          console.log("No messages found, using static data");
          setMessages(staticMessages);
        }
        setLoading(false);
      },
    );

    // Cleanup when chat changes or component unmounts
    return () => {
      if (unsubscribe) {
        firebaseSocket.leaveRoom(selectedChat.id);
      }
    };
  }, [selectedChat?.id, connected]);

  const sendMessage = async () => {
    if (!input.trim() || !selectedChat?.id || !connected) {
      console.log("Cannot send message:", {
        input: input.trim(),
        chatId: selectedChat?.id,
        connected,
      });
      return;
    }

    try {
      setSending(true);
      const messageText = input.trim();
      setInput(""); // Clear input immediately for better UX

      console.log("Sending message:", messageText);

      const messageId = await firebaseSocket.sendMessage(
        selectedChat.id,
        messageText,
      );

      console.log("Message sent successfully with ID:", messageId);
      showToast?.("Message sent!", "success");
    } catch (error) {
      console.error("Error sending message:", error);
      showToast?.("Failed to send message. Please try again.", "error");
      setInput(messageText); // Restore the message text
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAvatarClick = () => {
    console.log("Avatar clicked, toggling info pane");
    onToggleInfoPane();
  };

  const handleInfoButtonClick = () => {
    console.log("Info button clicked, toggling info pane");
    onToggleInfoPane();
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <HiInformationCircle className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          {isMobile && (
            <button
              onClick={onToggleLeftPane}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors mr-2">
              <HiMenu className="w-5 h-5" />
            </button>
          )}

          <img
            src={selectedChat.avatar || "/placeholder.svg"}
            alt={selectedChat.name}
            className="w-10 h-10 rounded-full object-cover mr-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleAvatarClick}
          />
          <div>
            <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  connected ? "bg-green-500" : "bg-red-500"
                }`}></div>
              <p className="text-sm text-gray-500">
                {connected
                  ? selectedChat.online
                    ? "online"
                    : selectedChat.lastSeen
                    ? `last seen ${selectedChat.lastSeen}`
                    : "offline"
                  : "Connecting..."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <HiSearch className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <HiPhone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <HiVideoCamera className="w-5 h-5" />
          </button>
          <button
            onClick={handleInfoButtonClick}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <HiInformationCircle className="w-5 h-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <HiDotsVertical className="w-5 h-5" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleAvatarClick}>
                    View Profile
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Clear Chat
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Block User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 bg-gray-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading messages...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-w-4xl mx-auto">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}>
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-3 py-2 rounded-lg shadow-sm ${
                    msg.senderId === currentUserId
                      ? "bg-green-500 text-white rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                  }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end mt-1 space-x-1 ${
                      msg.senderId === currentUserId
                        ? "text-green-100"
                        : "text-gray-500"
                    }`}>
                    <span className="text-xs">{msg.timestamp}</span>
                    {msg.senderId === currentUserId && (
                      <div className="flex">
                        {msg.status === "sent" && (
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {msg.status === "delivered" && (
                          <div className="flex">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <svg
                              className="w-3 h-3 -ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                        {msg.status === "read" && (
                          <div className="flex text-blue-300">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <svg
                              className="w-3 h-3 -ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2 max-w-4xl mx-auto">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <HiPaperClip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={connected ? "Type a message" : "Connecting..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending || !connected}
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <HiEmojiHappy className="w-5 h-5" />
            </button>
          </div>
          {input.trim() ? (
            <button
              onClick={sendMessage}
              disabled={sending || !input.trim() || !connected}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {sending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <HiPaperAirplane className="w-5 h-5" />
              )}
            </button>
          ) : (
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <HiMicrophone className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
