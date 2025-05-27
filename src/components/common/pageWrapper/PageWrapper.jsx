"use client";
import BackBtn from "@/components/backBtn";
import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <div className="bg-transparent container relative page-top-padding">
      <div className="relative">
        <div className="absolute top-0 left-0">
          <BackBtn />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageWrapper;
