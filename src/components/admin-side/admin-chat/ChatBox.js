"use client"

import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import { HiPaperAirplane, HiPaperClip, HiEmojiHappy, HiMicrophone } from "react-icons/hi"

export default function ChatBox({ group }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const socketRef = useRef(null)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        socketRef.current = io()
        socketRef.current.emit("join_group", group.id)

        socketRef.current.on("group_message", (message) => {
            setMessages((prev) => [...prev, message])
        })

        return () => {
            socketRef.current.emit("leave_group", group.id)
            socketRef.current.disconnect()
        }
    }, [group])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = () => {
        if (input.trim()) {
            const message = {
                text: input,
                sender: "admin",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                groupId: group.id,
            }

            socketRef.current.emit("group_message", message)
            setMessages((prev) => [...prev, message])
            setInput("")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">{group.name.charAt(0)}</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        <p className="text-sm text-gray-500">Group Chat</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}>
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg shadow-sm ${msg.sender === "admin"
                                ? "bg-green-500 text-white rounded-br-md"
                                : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.sender === "admin" ? "text-green-100" : "text-gray-500"}`}>
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <HiPaperClip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            <HiEmojiHappy className="w-5 h-5" />
                        </button>
                    </div>
                    {input.trim() ? (
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <HiPaperAirplane className="w-5 h-5" />
                        </button>
                    ) : (
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                            <HiMicrophone className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
