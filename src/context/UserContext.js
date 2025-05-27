"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
let AuthContext = createContext();

const Auth = ({ children }) => {
  let [auth, setAuth] = useState({
    user: null,
    success: null,
    isLoading: true,
  });
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);
  async function getuser() {
    console.log("Context Hook Function Run!");
    try {
      const { data } = await axios.get(`/api/auth/getuser`, {
        withCredentials: true,
      });

      if (data?.success) {
        console.log("user detail is :", data);
        setAuth(prev => {
          return { ...prev, user: data.user, success: true, isLoading: false };
        });
      } else {
        console.log(data);
      }
      setAuth(prev => {
        return { ...prev, isLoading: false };
      });
    } catch (error) {
      setAuth(prev => {
        return { ...prev, user: false, success: false, isLoading: false };
      });
      console.log(error);
    }
  }
  useEffect(() => {
    getuser();
  }, []);
  return (
    <AuthContext.Provider
      value={[auth, setAuth, setIsAcceptTerms, isAcceptTerms]}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
let useAuth = () => useContext(AuthContext);

export { useAuth };
