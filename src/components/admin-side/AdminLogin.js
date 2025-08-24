"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebase"; // Adjust path to your Firebase config

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Fetch super-admin credentials from Firestore
      const adminDocRef = doc(db, "roles", "super-admin");
      const adminDoc = await getDoc(adminDocRef);

      if (!adminDoc.exists()) {
        setError("Admin configuration not found");
        setLoading(false);
        return;
      }

      const adminData = adminDoc.data();

      // Check if username and password match
      if (username === adminData.username && password === adminData.password) {
        // Store admin session
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminUsername", username);

        // Redirect to dashboard
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
      <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          required
          disabled={loading}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
