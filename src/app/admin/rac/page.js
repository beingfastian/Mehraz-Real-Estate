"use client";
import { useState } from "react";

export default function RoleManager() {
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState(["ADMIN", "ARCHITECT", "RECEPTIONIST"]);

  const handleAddRole = () => {
    if (role.trim() && !roles.includes(role.toUpperCase())) {
      setRoles([...roles, role.toUpperCase()]);
      setRole("");
    }
  };

  const handleRemoveRole = index => {
    const updatedRoles = [...roles];
    updatedRoles.splice(index, 1);
    setRoles(updatedRoles);
  };

  return (
    <div className="min-h-screen bg-[#d4d4d4] flex items-start p-10">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-4 border border-dashed border-purple-500 flex flex-col items-start space-y-4">
        <h1 className="text-sm font-bold text-purple-600">🟣 R.A.C</h1>

        <div className="flex space-x-16 w-full">
          {/* Left Sidebar */}
          <div className="flex flex-col space-y-4 text-black font-bold">
            <div>ROLES +</div>
            <div>CITY SELECTION +</div>
            <div>ANALYTICS +</div>
          </div>

          {/* Center Roles Section */}
          <div className="flex flex-col space-y-4">
            <div className="font-bold">ROLES -</div>

            <div className="space-y-2">
              {roles.map((r, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-dashed border-black px-4 py-2 w-64">
                  <span>{r}</span>
                  <button
                    onClick={() => handleRemoveRole(index)}
                    className="text-black hover:text-red-600 font-bold">
                    –
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter role"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="px-2 py-1 border border-black w-48"
              />
              <button
                onClick={handleAddRole}
                className="text-black font-bold hover:text-purple-700">
                ➤
              </button>
            </div>

            <div className="font-bold pt-2">ADD ROLE +</div>
          </div>

          {/* Right Placeholder (CITY SELECTION + and ANALYTICS + shown in image) */}
          <div className="flex flex-col font-bold text-black space-y-4">
            <div>CITY SELECTION +</div>
            <div>ANALYTICS +</div>
          </div>
          <div className="flex flex-col space-y-4">
            {/* City Selection */}
            <div className="font-bold">CITY SELECTION -</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between border border-dashed border-black px-4 py-2 w-64">
                <span>City Name</span>
                <button className="text-black hover:text-red-600 font-bold">
                  –
                </button>
              </div>
            </div>

            {/* Office Location */}
            <div className="font-bold">OFFICE LOCATION -</div>
            <div className="space-y-2">
              <div className="border border-dashed border-black p-4 w-64">
                <div>City: Lahore</div>
                <div>Location: Gulberg</div>
                <div>
                  Image:{" "}
                  <img
                    src="office.jpg"
                    alt="Office"
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  Link:{" "}
                  <a href="https://example.com" className="text-blue-600">
                    Visit
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Enter city"
                className="px-2 py-1 border border-black w-48"
              />
              <input
                type="text"
                placeholder="Enter location"
                className="px-2 py-1 border border-black w-48"
              />
              <input
                type="text"
                placeholder="Enter image URL"
                className="px-2 py-1 border border-black w-48"
              />
              <input
                type="text"
                placeholder="Enter link"
                className="px-2 py-1 border border-black w-48"
              />
              <button className="text-black font-bold hover:text-purple-700">
                ➤
              </button>
            </div>

            {/* Plot Section */}
            <div className="font-bold">PLOT -</div>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Enter area"
                className="px-2 py-1 border border-black w-48"
              />
              <input
                type="text"
                placeholder="Enter unit"
                className="px-2 py-1 border border-black w-48"
              />
              <button className="text-black font-bold hover:text-purple-700">
                ➤
              </button>
            </div>
          </div>

          <div className="flex flex-col font-bold text-black space-y-4">
            <div>CITY SELECTION +</div>
            <div>ANALYTICS +</div>
          </div>
          <div className="flex flex-col space-y-6 items-center p-6">
            {/* Chart Placeholder */}
            <div className="w-full md:w-[600px] h-[300px] bg-gray-100 border border-black flex items-center justify-center">
              {/* Replace this div with an actual chart component like Recharts or Chart.js */}
              <span className="text-gray-500">
                [Chart will be rendered here]
              </span>
            </div>

            {/* Below Chart Info Section */}
            <div className="w-full md:w-[600px] border border-dashed border-black p-4 bg-white space-y-4">
              <h2 className="text-lg font-bold text-black">City Insights</h2>

              {/* Selection */}
              <div className="flex items-center space-x-4">
                <label htmlFor="city-select" className="font-semibold">
                  Select City:
                </label>
                <select
                  id="city-select"
                  className="border border-black px-3 py-1 w-48">
                  <option value="lahore">Lahore</option>
                  <option value="karachi">Karachi</option>
                  <option value="islamabad">Islamabad</option>
                </select>
              </div>

              {/* Name Display */}
              <div className="flex items-center space-x-4">
                <label className="font-semibold">Selected Name:</label>
                <span className="px-3 py-1 border border-black bg-gray-100 text-black">
                  Gulberg
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
