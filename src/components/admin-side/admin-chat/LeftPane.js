"use client";

import { useState } from "react";
import { HiSearch, HiChat, HiDotsVertical } from "react-icons/hi";

export default function LeftPane({
  onSelectChat,
  selectedChatId,
  chats = [],
  loading = false,
  error = null,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter(
    chat =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChatClick = chat => {
    console.log("Chat clicked:", chat);
    onSelectChat(chat);
  };

  const truncateMessage = (message, maxLength = 35) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  const formatTimestamp = timestamp => {
    if (timestamp === "Yesterday") return "Yesterday";
    return timestamp;
  };

  const getChatStatus = chat => {
    if (chat.participants?.includes("admin")) return "joined";
    return chat.status || "pending";
  };

  const formatLastMessage = chat => {
    const message = chat.lastMessage || "No messages yet";
    const senderId = chat.lastMessageSenderId;

    if (senderId === "admin") {
      return `You: ${message}`;
    } else if (senderId && chat.userInfo?.fullname) {
      return `${chat.userInfo.fullname}: ${message}`;
    }
    return message;
  };

  const getStatusColor = status => {
    switch (status) {
      case "joined":
        return "bg-blue-100 text-blue-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              All Chats
            </h1>
            <div className="flex items-center space-x-1 lg:space-x-2">
              <button className="p-1.5 lg:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <HiDotsVertical className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search chats"
              disabled
              className="block w-full pl-9 lg:pl-10 pr-3 py-2 lg:py-2.5 border border-gray-300 rounded-lg leading-5 bg-gray-100 placeholder-gray-500 text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading chats...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              All Chats
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 mb-2">Error loading chats</p>
            <p className="text-xs text-gray-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="p-3 lg:p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
            All Chats
          </h1>
          <div className="flex items-center space-x-1 lg:space-x-2">
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              {chats.length} Total
            </span>
            <button className="p-1.5 lg:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <HiDotsVertical className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiSearch className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search chats by name, message, or ID"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="block w-full pl-9 lg:pl-10 pr-3 py-2 lg:py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <HiChat className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-1">
                {chats.length === 0
                  ? "No chats found"
                  : "No chats match your search"}
              </p>
              <p className="text-xs text-gray-400">
                {chats.length === 0
                  ? "Chats will appear here when created"
                  : "Try a different search term"}
              </p>
            </div>
          </div>
        ) : (
          filteredChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              className={`flex items-center p-2.5 lg:p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 ${
                selectedChatId === chat.id
                  ? "bg-blue-50 border-r-4 border-blue-500"
                  : ""
              }`}>
              <div className="relative mr-2.5 lg:mr-3 flex-shrink-0">
                <img
                  src={chat.avatar || "/placeholder.svg"}
                  alt={chat.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <h3 className="text-sm lg:text-sm font-semibold text-gray-900 truncate">
                      {chat.name}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {formatTimestamp(chat.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    {chat.unreadCount > 0 && (
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full mr-1.5 lg:mr-2 flex-shrink-0"></div>
                    )}
                    <p
                      className={`text-xs lg:text-sm truncate ${
                        chat.unreadCount > 0
                          ? "font-semibold text-gray-900"
                          : "text-gray-600"
                      }`}>
                      {truncateMessage(formatLastMessage(chat))}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <span className="ml-1.5 lg:ml-2 inline-flex items-center justify-center px-1.5 lg:px-2 py-0.5 lg:py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full flex-shrink-0 min-w-[16px] lg:min-w-[20px]">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-gray-400">
                      ID: {chat.id.substring(0, 8)}...
                    </p>
                    <p className="text-xs text-gray-400">{chat.type}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                      getChatStatus(chat),
                    )}`}>
                    {getChatStatus(chat)}
                  </span>
                </div>
                {chat.userInfo && (
                  <div className="mt-1">
                    <p className="text-xs text-gray-400">
                      {chat.userInfo.fullname} ({chat.userInfo.id})
                      {chat.userInfo.phonenumber
                        ? ` • ${chat.userInfo.phonenumber}`
                        : ""}
                      {chat.participants &&
                        ` • ${chat.participants.length} participants`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
