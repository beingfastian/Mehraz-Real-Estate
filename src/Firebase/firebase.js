import {
  connectAuthEmulator,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
// ConfirmationResult,
import { getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJ_AmK8SVIY0s6sgV5W1kZVn8R923rRk0",
  authDomain: "mehraz-e8261.firebaseapp.com",
  projectId: "mehraz-e8261",
  storageBucket: "mehraz-e8261.appspot.com",
  messagingSenderId: "902392423874",
  appId: "1:902392423874:web:26c9218264d682ed0b625b",
  measurementId: "G-Y6VCNRRXKB",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];;

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

if (process.env.ENVIRONMENT === "development") {
  connectAuthEmulator(auth, "https://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export { db, auth, storage, RecaptchaVerifier, signInWithPhoneNumber };
// ConfirmationResult,
