// "use client";
// import React from "react";
// // import { useSelector } from "react-redux";
// import { useAuth } from "@/context/UserContext";
// // import { Navigate } from "react-router-dom";
// import { useRouter } from "next/navigation";
// // import Loader from "./components/Layout/Loader";
// import Spinner from "./Spinner";

// const ProtectedRoute = ({ children }) => {
//   const [auth, setAuth] = useAuth();
//   //   const { isAuthenticated, isLoading } = useSelector(state => state.user);
//   if (isLoading === false) {
//     if (auth.success) {
//       return children;
//     } else {
//       return <Navigate to="/login" replace />;
//     }
//   } else {
//     return <Spinner />;
//   }
// };

// export default ProtectedRoute;

"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation"; // For navigation in Next.js 13+
import Spinner from "./Spinner"; // Loading spinner

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useAuth();
  const router = useRouter();

  // Simulating the loading state (you should get this from your auth state or context)
  const isLoading = auth.success === null;

  useEffect(() => {
    // If not loading and the user is not authenticated, redirect to login
    if (!isLoading && auth.success === false) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [isLoading, auth.success, router]);

  // If loading, display a spinner
  if (isLoading) {
    return <Spinner />;
  }

  // If authenticated, render the protected content
  if (auth.success) {
    return children;
  }

  // Return null in case of any fallback, as redirect will occur inside useEffect
  return null;
};

export default ProtectedRoute;
