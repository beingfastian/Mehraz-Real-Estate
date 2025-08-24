"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import firebaseSocket from "@/socket";
import {
  HiPaperAirplane,
  HiPaperClip,
  HiEmojiHappy,
  HiArrowLeft,
  HiDotsVertical,
} from "react-icons/hi";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/Firebase/firebase";

export default function ChatPageContent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: "user123", // TODO: Replace with actual user ID from your auth system
    name: "",
    fullname: "",
    phonenumber: "",
    avatar: "",
  });

  const chatEndRef = useRef(null);
  const searchParams = useSearchParams();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize Firebase socket and create/join chat
  useEffect(() => {
    const initializeChat = async () => {
      try {
        console.log("🚀 Initializing user chat for:", currentUser.id);

        // First, load current user data from your existing users collection
        const userDoc = await getDoc(doc(db, "users", currentUser.id));
        let userData = { fullname: "User" }; // Default

        if (userDoc.exists()) {
          userData = userDoc.data();
          console.log("📋 Loaded user data:", userData);

          const updatedUser = {
            ...currentUser,
            name: userData.fullname || "User",
            fullname: userData.fullname || "User",
            phonenumber: userData.phonenumber || "",
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userData.fullname || "User",
            )}&background=10b981&color=fff`,
          };
          setCurrentUser(updatedUser);
        }

        // Initialize Firebase socket with loaded user data
        console.log("🔌 Initializing Firebase socket...");
        firebaseSocket.init(currentUser.id, userData.fullname || "User");
        await firebaseSocket.updateOnlineStatus(true);
        setConnected(true);
        console.log("✅ Firebase socket connected");

        // Check if chatId is provided in URL params
        const urlChatId = searchParams.get("chatId");
        console.log("🔗 URL chatId:", urlChatId);

        let activeChatId = urlChatId;

        // If no chatId, create a new support chat
        if (!activeChatId) {
          console.log("📝 Creating new support chat...");
          activeChatId = await createNewSupportChat(userData);
        } else {
          console.log("🎯 Using existing chat:", activeChatId);
        }

        setChatId(activeChatId);

        // Load chat info
        const chatDoc = await getDoc(doc(db, "chats", activeChatId));
        if (chatDoc.exists()) {
          setChatInfo(chatDoc.data());
          console.log("📄 Loaded chat info:", chatDoc.data());
        }

        // Join the chat room - THIS IS CRITICAL!
        console.log("🏠 Joining chat room:", activeChatId);
        firebaseSocket.joinRoom(activeChatId, newMessages => {
          console.log("💬 Received messages:", newMessages);
          setMessages(newMessages);
          setLoading(false);
        });

        console.log("🎉 Chat initialization complete!");
      } catch (error) {
        console.error("❌ Error initializing chat:", error);
        setLoading(false);
      }
    };

    initializeChat();

    // Cleanup on component unmount
    return () => {
      console.log("🧹 Cleaning up chat...");
      firebaseSocket.updateOnlineStatus(false);
      if (chatId) {
        firebaseSocket.leaveRoom(chatId);
      }
    };
  }, [searchParams]); // Remove currentUser.id dependency to avoid infinite loops

  const createNewSupportChat = async (userData = {}) => {
    try {
      console.log("📝 Creating new support chat with data:", userData);

      const chatRef = await addDoc(collection(db, "chats"), {
        name: `Customer Support - ${userData.fullname || "User"}`,
        participants: ["admin", currentUser.id],
        type: "private",
        createdAt: serverTimestamp(),
        lastMessage: "",
        lastMessageTime: serverTimestamp(),
        lastMessageSenderId: currentUser.id,
        userInfo: {
          fullname: userData.fullname || "User",
          phonenumber: userData.phonenumber || "",
          role: userData.role || "user",
          id: currentUser.id,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            userData.fullname || "User",
          )}&background=10b981&color=fff`,
        },
      });

      // Add welcome message
      await addDoc(collection(db, "chats", chatRef.id, "messages"), {
        senderId: "system",
        senderName: "Customer Support",
        text: `Hello ${
          userData.fullname || "there"
        }! Welcome to customer support. How can we help you today?`,
        timestamp: serverTimestamp(),
        type: "text",
        status: "delivered",
      });

      console.log("✅ Created new support chat:", chatRef.id);
      return chatRef.id;
    } catch (error) {
      console.error("❌ Error creating support chat:", error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !chatId || !connected) {
      console.log("⚠️ Cannot send message:", {
        hasInput: !!input.trim(),
        hasChatId: !!chatId,
        connected,
      });
      return;
    }

    try {
      setSending(true);
      const messageText = input.trim();
      setInput("");

      console.log("📤 Sending message:", messageText);
      await firebaseSocket.sendMessage(chatId, messageText);
      console.log("✅ Message sent successfully");
    } catch (error) {
      console.error("❌ Error sending message:", error);
      setInput(messageText); // Restore message if failed
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

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Starting your chat...</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
            <div>User ID: {currentUser.id}</div>
            <div>Connected: {connected ? "✅" : "⏳"}</div>
            <div>Chat ID: {chatId || "Creating..."}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Debug Info - Remove in production */}
      <div className="bg-blue-50 p-2 text-xs text-blue-800 border-b">
        👤 User: {currentUser.id} | 💬 Chat: {chatId} | 🔌 Connected:{" "}
        {connected ? "✅" : "❌"} | 📨 Messages: {messages.length}
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={goBack}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
            <HiArrowLeft className="w-5 h-5" />
          </button>
          <div className="ml-3 flex items-center">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              CS
            </div>
            <div className="ml-3">
              <h1 className="font-semibold text-gray-900">Customer Support</h1>
              <p className="text-sm text-gray-500">
                {connected ? "Online" : "Connecting..."}
              </p>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <HiDotsVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="px-4 py-6 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            CS
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Welcome to Customer Support
          </h2>
          <p className="text-gray-600 text-sm">
            Hi {currentUser.fullname || currentUser.name || "there"}! How can we
            help you today? Our support team will respond shortly.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="space-y-3">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.senderId === currentUser.id
                    ? "bg-green-500 text-white rounded-br-md"
                    : msg.senderId === "system"
                    ? "bg-blue-100 text-blue-900 rounded-md border border-blue-200"
                    : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div
                  className={`flex items-center justify-between mt-1 ${
                    msg.senderId === currentUser.id
                      ? "text-green-100"
                      : msg.senderId === "system"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}>
                  <span className="text-xs">
                    {msg.senderName || msg.senderId}
                  </span>
                  <span className="text-xs">{msg.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <HiPaperClip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={connected ? "Type a message..." : "Connecting..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending || !connected}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
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
            <button
              disabled={!connected}
              className="p-2 text-gray-400 rounded-full">
              <HiPaperAirplane className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
