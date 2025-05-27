// components/AdminRegistration.js
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function AdminRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerAdmin = async e => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email,
        role: "admin",
      });
      alert("Admin registered successfully!");
    } catch (error) {
      console.error("Error registering admin:", error.message);
    }
  };

  return (
    <form onSubmit={registerAdmin}>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Register Admin</button>
    </form>
  );
}
