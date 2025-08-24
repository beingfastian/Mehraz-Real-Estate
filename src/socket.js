// Example functions you'll need in your firebaseSocket.js
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/Firebase/firebase";

class FirebaseSocket {
  constructor() {
    this.currentUser = null;
    this.currentRoom = null;
    this.messageUnsubscribe = null;
  }

  init(userId, userName) {
    this.currentUser = { id: userId, name: userName };
    console.log("Firebase socket initialized for:", userName);
  }

  async updateOnlineStatus(isOnline) {
    if (!this.currentUser) return;

    try {
      // You can implement user presence tracking here if needed
      console.log(
        `${this.currentUser.name} is now ${isOnline ? "online" : "offline"}`,
      );
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  }

  joinRoom(chatId, onMessagesUpdate) {
    if (this.messageUnsubscribe) {
      this.messageUnsubscribe();
    }

    console.log("Joining chat room:", chatId);
    this.currentRoom = chatId;

    // Listen to messages subcollection
    const messagesRef = collection(db, "chats", chatId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    this.messageUnsubscribe = onSnapshot(
      messagesQuery,
      snapshot => {
        const messages = [];
        snapshot.forEach(doc => {
          const messageData = doc.data();

          // Safely convert timestamp to avoid React serialization errors
          let timestampString = "Now";
          try {
            if (
              messageData.timestamp &&
              typeof messageData.timestamp.toMillis === "function"
            ) {
              timestampString = new Date(
                messageData.timestamp.toMillis(),
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            }
          } catch (error) {
            console.error("Error converting message timestamp:", error);
          }

          messages.push({
            id: doc.id,
            senderId: messageData.senderId || messageData.userId,
            senderName:
              messageData.senderName || messageData.userName || "Unknown",
            text: messageData.text || messageData.message,
            timestamp: timestampString,
            type: messageData.type || "text",
            status: messageData.status || "sent",
            // Don't spread messageData to avoid timestamp objects
          });
        });

        console.log(`Loaded ${messages.length} messages for chat ${chatId}`);
        onMessagesUpdate(messages);
      },
      error => {
        console.error("Error loading messages:", error);
        onMessagesUpdate([]);
      },
    );
  }

  leaveRoom(chatId) {
    if (this.messageUnsubscribe) {
      this.messageUnsubscribe();
      this.messageUnsubscribe = null;
    }
    console.log("Left chat room:", chatId);
    this.currentRoom = null;
  }

  async sendMessage(chatId, messageText) {
    if (!this.currentUser || !chatId || !messageText.trim()) {
      throw new Error("Missing required data for sending message");
    }

    try {
      // Add message to subcollection
      const messagesRef = collection(db, "chats", chatId, "messages");
      const messageData = {
        senderId: this.currentUser.id,
        senderName: this.currentUser.name,
        text: messageText.trim(),
        timestamp: serverTimestamp(),
        type: "text",
        status: "sent",
      };

      const docRef = await addDoc(messagesRef, messageData);

      // Update the parent chat document with last message info
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        lastMessage: messageText.trim(),
        lastMessageTime: serverTimestamp(),
        lastMessageSenderId: this.currentUser.id,
      });

      console.log("Message sent successfully:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  disconnect() {
    if (this.messageUnsubscribe) {
      this.messageUnsubscribe();
    }
    this.currentRoom = null;
    this.currentUser = null;
  }
}

const firebaseSocket = new FirebaseSocket();
export default firebaseSocket;
