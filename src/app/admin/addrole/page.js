"use client";
import { useState } from "react";

export default function AddRole() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  const handleAddRole = () => {
    if (role.trim() && !roles.includes(role)) {
      setRoles([...roles, role]);
      setRole("");
    }
  };

  const handleRemoveRole = index => {
    const newRoles = [...roles];
    newRoles.splice(index, 1);
    setRoles(newRoles);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ name, phoneNumber, roles });
    // Here you would typically send data to your backend
    alert("Role information submitted!");
    setName("");
    setPhoneNumber("");
    setRoles([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">ADD ROLE</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NAME
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ROLE
            </label>
            <div className="flex gap-2">
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
                <option value="Manager">Manager</option>
              </select>
              <button
                type="button"
                onClick={handleAddRole}
                className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                +
              </button>
            </div>
          </div>

          <div className="mb-6">
            {roles.map((r, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2">
                <span>{r}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRole(index)}
                  className="text-red-500 hover:text-red-700">
                  -
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}
