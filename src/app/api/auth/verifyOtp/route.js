import { NextResponse } from "next/server";
import firebase from "firebase/app";
import { db } from "@/Firebase/firebase";



// Initialize Firebase (use your own config here)
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

export async function POST(request) {
  const { verificationCode, confirmationResult, name, role } =
    await request.json();

  try {
    const userCredential = await confirmationResult.confirm(verificationCode);
    const user = userCredential.user;

    // Save user info to Firestore (initialize Firestore similarly)
    const firestore = db.firestore();
    await firestore.collection("users").doc(user.uid).set({
      name,
      role,
      phoneNumber: user.phoneNumber,
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
