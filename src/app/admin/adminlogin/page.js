"use client";
// pages/login.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BackBtn from "@/components/backBtn";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form input
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/auth/loginadmin",
        { username, password },
        { withCredentials: true },
      );

      //    await fetch("/api/auth/loginadmin", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ username, password }),
      //   });
      //   const data = response;
      console.log("data response is:", data);

      //   const data = await response.json();
      if (data.success) {
        setSuccess("Login successful");
        // Redirect or handle post-login logic
        router.push("/dashboard"); // Redirect to a dashboard or any other page
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="relative admin-page-height container f-col items-center justify-evenly">
      <div className="absolute top-[5%] left-[2%] md:text-[3%] sm:text-[5%]">
        <BackBtn />
      </div>
      <h1 className="text-4xl md:text-3xl sm:text-2xl xs:text-xl font-bold text-center uppercase text-black">
        admin sign in
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <div className="flex flex-row md:flex-col gap-5 justify-between items-center">
          <label
            htmlFor="username"
            className="normal-text text-black font-bold">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            // style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            className="w-[457px] h-[46px]"
          />
        </div>
        <div className="flex flex-row md:flex-col gap-5 justify-between items-center">
          <label
            htmlFor="password"
            className="normal-text text-black font-bold">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-[457px] h-[46px]"
            // style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
      <button className="flex justify-center items-center w-[174px] h-10 relative gap-2.5 px-[66px] py-[19px] rounded bg-[#323232] shadow-btn-shadow">
        <p class="flex-grow-0 flex-shrink-0 text-[22px] text-center uppercase text-white">
          CONFIRM
        </p>
      </button>
    </div>
  );
}
