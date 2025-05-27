// app/api/users/route.js
import { NextResponse } from "next/server";
import { db } from "../../../../Firebase/firebase"; // Adjust the path if needed
import { collection, addDoc, getDocs, query } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Parse the request body
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 },
      );
    }
    // check if user exist
    const usersCollection = collection(db, "users");
    // Query to check if the username already exists
    const usernameQuery = query(
      usersCollection,
      where("username", "==", username),
    );
    // Execute the query
    const querySnapshot = await getDocs(usernameQuery);
    if (!querySnapshot.empty) {
      throw new Error("Username already exists");
    }
    // end of user existance check
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Add role to the user data
    const userData = {
      username,
      password: hashedPassword, // Store hashed password
      role: "admin",
    };
    // Add the user data to Firebase
    await addDoc(collection(db, "users"), userData);
    return NextResponse.json({
      success: true,
      message: "User added successfully",
    });
  } catch (error) {
    // console.error("Error adding document: ", error);
    return NextResponse.json(
      { success: false, message: "Failed to add user" },
      { status: 500 },
    );
  }
}
