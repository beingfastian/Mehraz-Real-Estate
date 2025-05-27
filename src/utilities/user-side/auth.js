import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase"; // Adjust the path to your Firebase config
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export async function registerUser(phoneNumber, fullName, role) {
  try {
    console.log("resgister user function run!", phoneNumber, fullName, role);
    // Set up RecaptchaVerifier
    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (!recaptchaContainer) {
      console.log("recapta not found");
      //   throw new Error("ReCAPTCHA container not found");
    } else {
      console.log("recapta found", recaptchaContainer);
    }

    // const recaptchaVerifier = new RecaptchaVerifier(
    //   "recaptcha-container", // ID of the HTML element to hold the reCAPTCHA
    //   {
    //     size: "invisible", // Invisible reCAPTCHA
    //   },
    //   auth,
    // );
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      },
    );
    // Sign in with phone number
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier,
      //   recaptchaVerifier,
    );
    // Prompt user to enter the verification code
    const verificationCode = prompt(
      "Please enter the verification code that was sent to your phone",
    );

    // Confirm the code
    const userCredential = await confirmationResult.confirm(verificationCode);

    // Get user information
    const user = userCredential.user;

    // Store additional user information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      role: role,
      phoneNumber: phoneNumber,
    });

    console.log("User registered successfully:", user);
  } catch (error) {
    console.error("Error during user registration:", error);
  }
}

// Secret key used to sign your JWT tokens
const JWT_SECRET = "qwertyuioplkjhgfdsazxcvbnm";

export async function middleware(req) {
  console.log("middleware auth function run!");
  const { cookies } = req;
  const token = cookies.token;
  if (!token) {
    return NextResponse.json(
      { error: "Authentication token missing" },
      { status: 401 },
    );
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user to the request object (or context)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}

// Middleware configuration for specific routes
export const config = {
  matcher: ["/api/auth/getadmin", "/api/auth/protectedRoute/:path*"], // Apply middleware to these routes
};
