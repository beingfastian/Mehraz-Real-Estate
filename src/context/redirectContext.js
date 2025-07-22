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

// export const useRedirect = () => {
//   return useContext(RedirectContext);
// };

// Hook
export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error("useRedirect must be used within a RedirectProvider");
  }
  return context;
};
