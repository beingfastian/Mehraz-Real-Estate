// "use client";
// import { useState } from "react";
// import { registerUser } from "../../../utilities/user-side/auth"; // Adjust the path

// export default function RegisterPage() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [role, setRole] = useState("client"); // Default role or you can add a selector

//   const handleSubmit = async event => {
//     event.preventDefault();
//     const response = await registerUser(phoneNumber, fullName, role);
//     console.log("reponse is:", response);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="phoneNumber">Phone Number</label>
//         <input
//           type="text"
//           id="phoneNumber"
//           value={phoneNumber}
//           onChange={e => setPhoneNumber(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="fullName">Full Name</label>
//         <input
//           type="text"
//           id="fullName"
//           value={fullName}
//           onChange={e => setFullName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="role">Role</label>
//         <select id="role" value={role} onChange={e => setRole(e.target.value)}>
//           <option value="client">Client</option>
//           <option value="general">General User</option>
//         </select>
//       </div>
//       {/* <!-- Add this somewhere in your HTML, e.g., in your main component or page --> */}
//       <div id="recaptcha-container"></div>

//       <button type="submit">Register</button>
//     </form>
//   );
// }

// 2nd code which also write for testing

// "use client";

// import { useState } from "react";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";
// import { auth, db } from "../../../Firebase/firebase"; // Adjust the path to your Firebase config

// export default function RegisterPage() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [role, setRole] = useState("client"); // Default role or you can add a selector
//   const [error, setError] = useState(""); // For error messages

//   const handleSubmit = async event => {
//     event.preventDefault();
//     setError(""); // Reset any previous error
//     try {
//       const recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: () => {
//             console.log("recaptcha resolved..");
//           },
//         },
//       );
//       // Wait for the reCAPTCHA to render
//       await recaptchaVerifier.render();

//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         phoneNumber,
//         recaptchaVerifier,
//       );
//       const verificationCode = prompt(
//         "Please enter the verification code that was sent to your phone",
//       );

//       if (!verificationCode) {
//         throw new Error("Verification code not provided");
//       }

//       const userCredential = await confirmationResult.confirm(verificationCode);
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         fullName: fullName,
//         role: role,
//         phoneNumber: phoneNumber,
//       });

//       console.log("User registered successfully:", user);
//     } catch (error) {
//       console.error("Error during user registration:", error);
//       console.log(error);
//       setError("Failed to register user: " + error.message);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="phoneNumber">Phone Number</label>
//           <input
//             type="text"
//             id="phoneNumber"
//             value={phoneNumber}
//             onChange={e => setPhoneNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="fullName">Full Name</label>
//           <input
//             type="text"
//             id="fullName"
//             value={fullName}
//             onChange={e => setFullName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="role">Role</label>
//           <select
//             id="role"
//             value={role}
//             onChange={e => setRole(e.target.value)}>
//             <option value="client">Client</option>
//             <option value="general">General User</option>
//           </select>
//         </div>
//         <div id="recaptcha-container"></div>
//         <button type="submit">Register</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../../Firebase/firebase.js";
import { useRouter } from "next/navigation";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  // const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    // Initialize RecaptchaVerifier when 'auth' changes
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: response => {},
        // Handle Recaptcha callback if needed
        "expired-callback": () => {},
        // Handle Recaptcha expiration if needed
      },
    );
    // Cleanup function for RecaptchaVerifier if you want you can add
    //return () => {
    //window.recaptchaVerifier.clear();
  }, [auth]); // Run this effect when 'auth' changes

  const handlePhoneNumberChange = e => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = e => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier,
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      alert("OTP has been sent");
    } catch (error) {
      console.error(error);
      console.log("error message is:", error.message);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!otpSent && <div id="recaptcha-container" className="w-full"></div>}

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Enter Phone Number with Country Code"
        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
      />

      {otpSent && (
        <input
          type="text"
          value={otp}
          onChange={handleOTPChange}
          placeholder="Enter OTP"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
        />
      )}

      <button
        onClick={otpSent ? handleOTPSubmit : handleSendOtp}
        className={`w-full bg-${
          otpSent ? "green" : "blue"
        }-500 text-white py-3 rounded-md`}
        style={{ backgroundColor: otpSent ? "green" : "blue" }}>
        {otpSent ? "Submit OTP" : "Send OTP"}
      </button>
    </div>
  );
}
