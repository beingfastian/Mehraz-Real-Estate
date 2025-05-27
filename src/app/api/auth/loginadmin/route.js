// app/api/login/route.js
import { NextResponse } from "next/server";
import { db } from "../../../../Firebase/firebase"; // Adjust the path if needed
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { serialize } from "cookie";
// const JWT_SECRET = process.env.JWT_SECRET; // Make sure to set this in your environment variables
const JWT_SECRET = "qwertyuioplkjhgfdsazxcvbnm";
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

    // Query Firebase to find the user
    const userQuery = query(
      collection(db, "users"),
      where("username", "==", username),
    );
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 },
      );
    }
    // Assuming only one user with this username
    const userDoc = userSnapshot.docs[0].data();
    // console.log("user doc is:", userDoc);
    const hashedPassword = userDoc.password;
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 },
      );
    }
    // Create a JWT token
    const token = jwt.sign(
      { username: userDoc.username, role: userDoc.role },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Set a cookie with the token
    const response = NextResponse.json({
      success: true,
      user: userDoc,
      message: "Login successful",
    });
    response.cookies.set("token", token, {
      // Optional: Configure cookie options
      httpOnly: true, // Cookie is not accessible via JavaScript (increased security)
      secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
      maxAge: 60 * 60 * 24, // Cookie expires in 24 hours
      path: "/", // Cookie is accessible on the entire site
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to log in", error: error.message },
      { status: 500 },
    );
  }
}
