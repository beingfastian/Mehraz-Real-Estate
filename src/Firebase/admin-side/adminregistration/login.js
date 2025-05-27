// components/AdminEmployeeLogin.js
import { useState } from "react";
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AdminEmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdminOrEmployee = async e => {
    e.preventDefault();
    try {
      // Log in with email and password using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Retrieve user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role; // Retrieve the user's role

        if (userRole === "admin" || userRole === "employee") {
          alert(`Logged in successfully as ${userRole}!`);
          // Handle successful login (e.g., redirect, set session, etc.)
        } else {
          alert("Access denied. You do not have admin or employee rights.");
        }
      } else {
        alert("User data not found in the database.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Error logging in. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={loginAdminOrEmployee}>
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
      <button type="submit">Login</button>
    </form>
  );
}
