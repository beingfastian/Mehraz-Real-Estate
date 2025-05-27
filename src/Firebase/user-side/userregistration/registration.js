// components/UserRegistration.js
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const registerUser = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users"), {
        name,
        phone,
        role: "general",
      });
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  //   return (
  //     <form onSubmit={registerUser}>
  //       <input
  //         type="text"
  //         placeholder="Name"
  //         onChange={e => setName(e.target.value)}
  //       />
  //       <input
  //         type="text"
  //         placeholder="Phone Number"
  //         onChange={e => setPhone(e.target.value)}
  //       />
  //       <button type="submit">Register User</button>
  //     </form>
  //   );
}
