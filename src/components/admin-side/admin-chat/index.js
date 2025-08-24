// Update your index.js (AdminChatPage) to accept and pass the props

"use client";

import { useState, useEffect } from "react";
import LeftPane from "./LeftPane";
import MiddlePane from "./MiddlePane";
import RightPane from "./RightPane";
import { HiMenu, HiX } from "react-icons/hi";

export default function AdminChatPage({
  isRecept,
  chats = [],
  selectedChat = null,
  onSelectChat,
  currentUser,
  messages = [],
  loading = false,
  error = null,
}) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLeftPaneOpen, setIsLeftPaneOpen] = useState(false);

  useEffect(() => {
    console.log("AdminChatPage mounted");
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsLeftPaneOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSelectChat = chat => {
    console.log("Selected chat:", chat);
    if (onSelectChat) {
      onSelectChat(chat);
    }
    if (isMobile) {
      setIsLeftPaneOpen(false);
    }
    if (isMobile) {
      setIsInfoOpen(false);
    }
  };

  const toggleInfoPane = () => {
    console.log("Toggling info pane, current state:", isInfoOpen);
    setIsInfoOpen(!isInfoOpen);
  };

  const toggleLeftPane = () => {
    setIsLeftPaneOpen(!isLeftPaneOpen);
  };

  const showToast = (message, type) => {
    // Simple toast implementation - you can replace with your preferred toast library
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  console.log(
    "AdminChatPage render - selectedChat:",
    selectedChat,
    "isInfoOpen:",
    isInfoOpen,
    "isLeftPaneOpen:",
    isLeftPaneOpen,
    "chats count:",
    chats.length,
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {isMobile && (
        <button
          onClick={toggleLeftPane}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          {isLeftPaneOpen ? (
            <HiX className="w-5 h-5" />
          ) : (
            <HiMenu className="w-5 h-5" />
          )}
        </button>
      )}

      <div
        className={`
          ${
            isMobile
              ? `fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
                  isLeftPaneOpen ? "translate-x-0" : "-translate-x-full"
                }`
              : "relative"
          }
          ${
            isMobile ? "w-full" : "w-80"
          } flex-shrink-0 bg-white border-r border-gray-200
        `}>
        {isMobile && isLeftPaneOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsLeftPaneOpen(false)}
          />
        )}

        <div className="h-full z-40 bg-white max-w-80">
          <LeftPane
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChat?.id}
            chats={chats}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <MiddlePane
          selectedChat={selectedChat}
          currentUser={currentUser}
          onToggleInfoPane={toggleInfoPane}
          onToggleLeftPane={toggleLeftPane}
          isMobile={isMobile}
          showToast={showToast}
        />
      </div>

      {isInfoOpen && (
        <>
          {isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsInfoOpen(false)}
            />
          )}

          <div
            className={`
              ${
                isMobile
                  ? "fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out"
                  : "relative"
              }
              w-full sm:w-80 lg:w-96 xl:w-[400px] 2xl:w-[450px] flex-shrink-0 bg-white border-l border-gray-200 shadow-lg lg:shadow-none
            `}>
            <RightPane
              selectedChat={selectedChat}
              onClose={() => setIsInfoOpen(false)}
              showToast={showToast}
            />
          </div>
        </>
      )}
    </div>
  );
}
