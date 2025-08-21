import { BuyMaterialsPage, UserProtectedRoute } from "@/components";
import React from "react";

const page = () => {
  return (
    <>
      <UserProtectedRoute>
        <BuyMaterialsPage />
      </UserProtectedRoute>
    </>
  );
};

export default page;
