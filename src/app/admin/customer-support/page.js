"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminChatPage from "@/components/admin-side/admin-chat";
import firebaseSocket from "@/socket";
import { db } from "@/Firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

export default function CustomerSupport() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [allChats, setAllChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  // Check authentication and load admin data
  useEffect(() => {
    const checkAuthAndLoadAdmin = async () => {
      const isAdmin = localStorage.getItem("isAdmin");
      const adminUsername = localStorage.getItem("adminUsername");

      if (!isAdmin || !adminUsername) {
        router.push("/admin/login");
        return;
      }

      try {
        const adminDocRef = doc(db, "roles", "super-admin");
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          const adminInfo = adminDoc.data();
          setAdminData({
            id: "admin",
            username: adminInfo.username,
            name: `Admin (${adminInfo.username})`,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              adminInfo.username,
            )}&background=dc2626&color=fff`,
            role: "admin",
          });
          console.log("Admin authenticated:", adminInfo.username);
        }
      } catch (error) {
        console.error("Error loading admin data:", error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadAdmin();
  }, [router]);

  // Initialize socket and listen for all chats
  useEffect(() => {
    if (!adminData) return;

    const initSocket = async () => {
      try {
        console.log("Initializing admin socket...");
        firebaseSocket.init(adminData.id, adminData.name);
        await firebaseSocket.updateOnlineStatus(true);
        setConnected(true);

        // Listen for ALL chats in the chats collection
        const q = query(
          collection(db, "chats"),
          orderBy("lastMessageTime", "desc"),
        );

        const unsubscribe = onSnapshot(q, snapshot => {
          const chats = [];
          snapshot.forEach(doc => {
            const chatData = doc.data();
            const isUserChat =
              chatData.userInfo?.id && chatData.userInfo.id !== "admin";

            // Safely convert timestamps to avoid React serialization errors
            let timestampString = "Now";
            let fullTimestampString = "Unknown";
            let createdAtString = "Unknown";

            try {
              if (
                chatData.lastMessageTime &&
                typeof chatData.lastMessageTime.toMillis === "function"
              ) {
                const lastMsgTime = new Date(
                  chatData.lastMessageTime.toMillis(),
                );
                timestampString = lastMsgTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                fullTimestampString = lastMsgTime.toLocaleString();
              }

              if (
                chatData.createdAt &&
                typeof chatData.createdAt.toMillis === "function"
              ) {
                createdAtString = new Date(
                  chatData.createdAt.toMillis(),
                ).toLocaleString();
              }
            } catch (error) {
              console.error("Error converting timestamp:", error);
            }

            chats.push({
              id: doc.id,
              name:
                chatData.name ||
                `${chatData.userInfo?.fullname || "Unknown User"} Chat`,
              lastMessage: chatData.lastMessage || "No messages yet",
              lastMessageSenderId: chatData.lastMessageSenderId || null,
              timestamp: timestampString,
              fullTimestamp: fullTimestampString,
              unreadCount: 0, // We can implement this later
              type: chatData.type || "private",
              avatar:
                chatData.userInfo?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  chatData.userInfo?.fullname || "User",
                )}&background=10b981&color=fff`,
              online: true, // We can implement presence later
              lastSeen: "Now",
              status: chatData.status || "open",
              adminJoined: chatData.participants?.includes("admin") || false,
              userInfo: { ...chatData.userInfo } || {}, // Spread to avoid reference issues
              createdAtString: createdAtString,
              participants: [...(chatData.participants || [])], // Spread array to avoid reference issues
              isUserChat,
              // Don't spread the entire chatData to avoid timestamp objects
            });
          });

          console.log("All chats found:", chats.length);
          setAllChats(chats);

          // Auto-select first chat if none selected
          if (chats.length > 0 && !selectedChatId) {
            handleSelectChat(chats[0]);
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    };

    initSocket();

    return () => {
      if (adminData?.id) {
        firebaseSocket.updateOnlineStatus(false);
        if (selectedChatId) {
          firebaseSocket.leaveRoom(selectedChatId);
        }
      }
    };
  }, [adminData]);

  const handleSelectChat = async chat => {
    try {
      // Leave current chat if any
      if (selectedChatId && selectedChatId !== chat.id) {
        console.log("Admin leaving chat:", selectedChatId);
        firebaseSocket.leaveRoom(selectedChatId);
      }

      console.log("Admin selecting chat:", chat.id);
      setSelectedChatId(chat.id);

      // Update chat to show admin has joined
      if (!chat.adminJoined) {
        await updateDoc(doc(db, "chats", chat.id), {
          adminJoined: true,
          adminJoinedAt: serverTimestamp(),
          adminId: adminData.id,
          adminName: adminData.name,
        });
      }

      // Join the chat room
      firebaseSocket.joinRoom(chat.id, newMessages => {
        console.log("Admin received messages:", newMessages.length);
        setMessages(newMessages);
      });
    } catch (error) {
      console.error("Error selecting chat:", error);
    }
  };

  const handleLogout = () => {
    if (selectedChatId && adminData?.id) {
      firebaseSocket.leaveRoom(selectedChatId);
      firebaseSocket.updateOnlineStatus(false);
    }

    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminUsername");
    router.push("/admin/login");
  };

  if (loading || !adminData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Find the selected chat object
  const selectedChat =
    allChats.find(chat => chat.id === selectedChatId) || null;

  return (
    <div className="h-screen">
      {/* Status Bar */}
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-green-600 font-medium">
              Logged in as: {adminData.username}
            </span>
            <span className="text-gray-600">
              Socket: {connected ? "Connected" : "Disconnected"}
            </span>
            <span className="text-gray-600">
              Total Chats: {allChats.length}
            </span>
            {selectedChatId && (
              <span className="text-blue-600">
                Current: {selectedChat?.name || selectedChatId.substring(0, 8)}
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Use your existing AdminChatPage but pass the managed data */}
      <AdminChatPage
        isRecept={false}
        // Pass all chats to LeftPane
        chats={allChats}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
        // Pass admin data
        currentUser={adminData}
        // Pass socket messages
        messages={messages}
        loading={false}
        error={null}
      />
    </div>
  );
}
