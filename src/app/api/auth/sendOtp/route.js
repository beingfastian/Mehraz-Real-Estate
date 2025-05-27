// import { NextResponse } from "next/server";
// import firebase from "firebase/app";
// import { auth } from "@/Firebase/firebase";
// import "firebase/auth";

// // Initialize Firebase (use your own config here)
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: 'YOUR_API_KEY',
//     authDomain: 'YOUR_AUTH_DOMAIN',
//     projectId: 'YOUR_PROJECT_ID',
//     storageBucket: 'YOUR_STORAGE_BUCKET',
//     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//     appId: 'YOUR_APP_ID',
//   });
// }

// const auth = firebase.auth();

// export async function POST(request) {
//   const { phoneNumber } = await request.json();

//   try {
//     const appVerifier = new firebase.auth.RecaptchaVerifier(
//       "recaptcha-container",
//       {
//         size: "invisible",
//       },
//     );
//     const confirmationResult = await auth.signInWithPhoneNumber(
//       phoneNumber,
//       appVerifier,
//     );
//     return NextResponse.json({ success: true, confirmationResult });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@/Firebase/firebase";

export async function POST(request) {
  const { phoneNumber } = await request.json();

  try {
    // Create a RecaptchaVerifier instance
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth,
    );

    // Sign in with phone number
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier,
    );

    return NextResponse.json({ success: true, confirmationResult });
  } catch (error) {
    console.log("error is:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function GET(request, resp) {
  // const { phoneNumber } = await request.json();

  try {
    return NextResponse.status(200).json({ success: true });
  } catch (error) {
    console.log("error is:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
