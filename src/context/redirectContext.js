"use client";
import { createContext, useContext, useState } from "react";

const RedirectContext = createContext();

export const RedirectProvider = ({ children }) => {
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);

  return (
    <RedirectContext.Provider value={{ isAcceptTerms, setIsAcceptTerms }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => {
  return useContext(RedirectContext);
};
