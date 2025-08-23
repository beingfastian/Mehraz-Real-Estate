"use client";

import AdminChat from "@/components/admin-side/admin-chat/index.js";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function CustomerSupport() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("Connected to socket server");
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        console.log("Transport upgraded to:", transport.name);
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      console.log("Disconnected from socket server");
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="">
      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">Status: {isConnected ? "connected" : "disconnected"}</p>
        <p className="text-sm text-gray-600">Transport: {transport}</p>
      </div>
      <AdminChat isRecept={false} />
    </div>
  );
}

{
  /* Chat Section */
}
{
  /* <div className="flex-1 bg-white p-6 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">GROUP ID #456623</h2>
            <button className="text-blue-700 hover:text-blue-900">
              📞 Call
            </button>
          </div>
          <div className="bg-gray-100 rounded-md p-4 min-h-[300px] mb-4"></div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type here..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 mr-2"
            />
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
              ✏️
            </button>
            <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300 ml-2">
              📎
            </button>
          </div>
        </div> */
}

{
  /* Right Sidebar */
}
{
  /* <div className="bg-white w-[20%] min-w-[250px] p-4 rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Project Team</h2>
          <ul className="space-y-2 mb-6">
            {["A. Rahman", "M. Saqib"].map((member, i) => (
              <li key={i} className="text-sm">
                {i + 1}. {member}
              </li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mb-4">Files</h2>
          <ul className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => (
              <li
                key={i}
                className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 cursor-pointer"
              >
                File-{i + 1}.pdf
              </li>
            ))}
          </ul>
        </div> */
}
